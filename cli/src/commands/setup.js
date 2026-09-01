import path from 'node:path'
import os from 'node:os'
import { packagedAgentDir, agentHome, packageRoot, guardarCredentialsHome, credentialsHome } from '../lib/paths.js'
import { existe } from '../lib/fsx.js'
import { comprobarPrerrequisitos, primerFalloObligatorio } from '../lib/prereq.js'
import { instalarCuerpo } from '../lib/install.js'
import { generarConfigGlobal } from '../lib/config.js'
import { instalarCredenciales } from '../lib/credentials.js'
import { versionPaquete, versionInstalada } from '../lib/manifest.js'
import { ejecutarInteractivo, resolverOpencode } from '../lib/proc.js'
import { titulo, paso, ok, aviso, nota, linea, preguntar, esperarEnter, ErrorDeUsuario } from '../lib/ui.js'

function localizarCredenciales (args) {
  const i = args.indexOf('--credenciales')
  if (i >= 0 && args[i + 1]) return path.resolve(args[i + 1])
  for (const c of [path.join(process.cwd(), 'credenciales'), path.join(os.homedir(), 'credenciales')]) {
    if (existe(c)) return c
  }
  return null
}

async function pedirRutaCredenciales () {
  linea()
  aviso('No encontre la carpeta de credenciales que entrega el administrador.')
  nota('Esa carpeta contiene los archivos para conectar Gmail, Calendar, Chat y Metabase.')
  linea()
  console.log('  Opciones:')
  nota('a) Si la tienes en tu computador: arrastrala a esta ventana y pulsa Enter.')
  nota('b) Si no la tienes: pulsa Enter para continuar y pidele a Raul que te la envie.')
  nota('   Cuando la recibas, vuelve a ejecutar el instalador (macos.sh / windows.bat).')
  linea()
  const ruta = await preguntar('Ruta de la carpeta (o Enter para saltar)')
  return ruta ? path.resolve(ruta.trim().replace(/^'|'$/g, '').replace(/^"|"$/g, '')) : null
}

export default async function setup (args) {
  const sinAutenticar = args.includes('--sin-autenticar')

  titulo('Instalacion de Vorkan-PM')
  const previa = versionInstalada()
  if (previa) nota(`Ya hay una instalacion (version ${previa}); se reparara sin duplicar nada.`)

  // --- 1. Prerrequisitos ---
  paso('Comprobando prerrequisitos')
  const checks = comprobarPrerrequisitos()
  for (const c of checks) c.ok ? ok(`${c.nombre} — ${c.detalle}`) : aviso(`${c.nombre} — ${c.detalle}`)
  const fallo = primerFalloObligatorio(checks)
  if (fallo) throw new ErrorDeUsuario(`Falta un prerrequisito: ${fallo.nombre}`, fallo.remedio)

  // --- 2. Cuerpo del agente ---
  linea()
  paso('Instalando el agente')
  const version = versionPaquete()
  const r = instalarCuerpo(packagedAgentDir(), version)
  ok(`Agente ${version} instalado en ${r.destino}`)
  nota(`${r.copiados} archivos; opencode lo descubrira en cualquier carpeta.`)

  // --- 3. Configuracion ---
  paso('Generando la configuracion')
  ok(`Configuracion escrita en ${generarConfigGlobal()}`)

  // --- 4. Carpeta de credenciales (silenciosa) ---
  // El PM no necesita elegir esto: siempre se usa el valor guardado o el defecto.
  const dirCred = credentialsHome()
  guardarCredentialsHome(dirCred)
  nota(`Tus tokens se guardaran en: ${dirCred}`)

  // --- 5. Instalar credenciales desde la carpeta del administrador ---
  linea()
  paso('Instalando las credenciales de la organizacion')
  let carpeta = localizarCredenciales(args)
  if (!carpeta && !sinAutenticar && process.stdout.isTTY) {
    carpeta = await pedirRutaCredenciales()
  }
  let credenciales = []
  if (!carpeta) {
    aviso('Sin credenciales de la organizacion.')
    nota('El agente queda instalado. Cuando tengas la carpeta, vuelve a ejecutar el instalador.')
  } else {
    credenciales = instalarCredenciales(carpeta)
    for (const c of credenciales) {
      c.instalada ? ok(`${c.servicio}${c.detalle ? ' — ' + c.detalle : ''}`) : aviso(`${c.servicio} — ${c.detalle}`)
    }
  }

  // --- 6. Conexion de cuentas ---
  const pendientes = []
  if (sinAutenticar) {
    linea()
    nota('Se omite la conexion de cuentas (--sin-autenticar).')
  } else {
    linea()
    titulo('Conectar tus cuentas de Google')
    console.log('  Se abrira el navegador una vez por cada cuenta.')
    nota('En cada ventana que se abra:')
    nota('  1. Elige tu correo de VortexBird (@vortexbird.com)')
    nota('  2. Si aparece una advertencia de Google (pantalla con texto rojo o naranja):')
    nota('       haz clic en "Configuracion avanzada" (texto gris, parte inferior)')
    nota('       luego haz clic en "Ir a Vorkan PM"')
    nota('  3. Haz clic en "Continuar" o "Permitir"')
    linea()
    await esperarEnter('Pulsa ENTER cuando estes listo para empezar')

    paso('Iniciando sesion en opencode (da acceso al modelo de IA)')
    if (!await ejecutarInteractivo(resolverOpencode() || 'opencode', ['auth', 'login'])) {
      pendientes.push({ servicio: 'opencode' })
      aviso('No se completo el inicio de sesion en opencode.')
    } else ok('Sesion de opencode iniciada')

    const entrada = path.join(packageRoot(), 'cli', 'bin', 'vorkanpm.js')

    const autorizar = async (servidor, etiqueta, instalada) => {
      if (!instalada) return
      paso(`Conectando ${etiqueta}`)
      nota(`Se abrira el navegador. Elige tu correo de VortexBird y pulsa Permitir.`)
      const bien = await ejecutarInteractivo(process.execPath, [entrada, 'mcp', servidor, '--auth'])
      if (bien) { ok(`${etiqueta} conectado`); return }

      aviso(`${etiqueta} no quedo conectado.`)
      if (process.stdout.isTTY) {
        const reintentar = await preguntar('¿Intentarlo de nuevo? (s/N)')
        if (reintentar.toLowerCase().startsWith('s')) {
          nota(`Se abre el navegador otra vez. Elige tu correo de VortexBird y pulsa Permitir.`)
          const bien2 = await ejecutarInteractivo(process.execPath, [entrada, 'mcp', servidor, '--auth'])
          if (bien2) { ok(`${etiqueta} conectado`); return }
          aviso(`${etiqueta} sigue sin conectar.`)
        }
      }
      pendientes.push({ servicio: etiqueta })
    }

    const tiene = (s) => credenciales.some((c) => c.servicio === s && c.instalada)
    await autorizar('gmail', 'Gmail', tiene('Gmail'))
    await autorizar('google-calendar', 'Google Calendar', tiene('Google Calendar'))
    await autorizar('google-chat', 'Google Chat', tiene('Google Chat'))
  }

  // --- 7. Resumen ---
  linea()
  titulo('Instalacion terminada')
  ok(`Vorkan-PM ${version} listo en ${agentHome()}`)
  if (pendientes.length) {
    linea()
    aviso('Quedaron estas integraciones sin conectar:')
    for (const p of pendientes) nota(`${p.servicio}`)
    nota('Para conectarlas: vuelve a ejecutar el instalador (macos.sh / windows.bat).')
    nota('El agente funciona normalmente con las integraciones que si quedaron conectadas.')
  }
  linea()
  console.log('  Para crear tu primer proyecto:')
  nota('1. Crea una carpeta con el nombre del proyecto')
  nota('2. Entra en ella y ejecuta: vorkanpm init')
  nota('3. Abre el agente con: opencode')
  linea()
  if (!resolverOpencode()) aviso('Recuerda reiniciar el equipo si opencode aun no responde.')
}

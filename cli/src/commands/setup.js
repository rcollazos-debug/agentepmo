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

  // --- 4. Carpeta de credenciales ---
  linea()
  paso('Carpeta de credenciales')
  const defaultCred = credentialsHome()
  let dirCred
  if (sinAutenticar) {
    // En modo no interactivo se usa el valor ya guardado o el defecto
    dirCred = defaultCred
    nota(`Carpeta de credenciales: ${dirCred}`)
  } else {
    console.log('  Aqui se guardaran TODAS las credenciales (tokens OAuth, claves de API).')
    nota('Elige una carpeta fuera del repo y de la nube — solo tu equipo la ve.')
    dirCred = await preguntar('Carpeta de credenciales', { porDefecto: defaultCred })
  }
  guardarCredentialsHome(dirCred)
  ok(`Carpeta de credenciales: ${dirCred}`)

  // --- 5. Instalar credenciales desde la carpeta del administrador ---
  linea()
  paso('Instalando las credenciales de la organizacion')
  const carpeta = localizarCredenciales(args)
  let credenciales = []
  if (!carpeta) {
    aviso('No encontre la carpeta "credenciales".')
    nota('El agente queda instalado, pero sin conexion a Gmail, Calendar, Chat ni Metabase.')
    nota('Pidesela al administrador y vuelve a ejecutar: vorkanpm setup --credenciales <ruta>')
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
    titulo('Conectar tus cuentas')
    console.log('  Se abrira el navegador varias veces. En cada una:')
    nota('1. Elige tu correo de VortexBird')
    nota('2. Si aparece "Google no verifico esta app": Configuracion avanzada -> Ir a...')
    nota('3. Pulsa PERMITIR')
    linea()
    await esperarEnter('Pulsa ENTER cuando estes listo')

    paso('Iniciando sesion en opencode (da acceso al modelo de IA)')
    if (!await ejecutarInteractivo(resolverOpencode() || 'opencode', ['auth', 'login'])) {
      pendientes.push({ servicio: 'opencode', remedio: 'opencode auth login' })
      aviso('No se completo el inicio de sesion en opencode.')
    } else ok('Sesion de opencode iniciada')

    const entrada = path.join(packageRoot(), 'cli', 'bin', 'vorkanpm.js')
    const autorizar = async (servidor, etiqueta, instalada) => {
      if (!instalada) return
      paso(`Conectando ${etiqueta}`)
      const bien = await ejecutarInteractivo(process.execPath, [entrada, 'mcp', servidor, '--auth'])
      if (bien) ok(`${etiqueta} conectado`)
      else {
        aviso(`${etiqueta} no quedo conectado.`)
        pendientes.push({ servicio: etiqueta, remedio: `vorkanpm mcp ${servidor} --auth` })
      }
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
    aviso('Quedaron cosas pendientes:')
    for (const p of pendientes) nota(`${p.servicio} — reintenta con: ${p.remedio}`)
    nota('El agente funciona con las integraciones que si conectaron.')
  }
  linea()
  console.log('  Para crear tu primer proyecto:')
  nota('1. Crea una carpeta con el nombre del proyecto')
  nota('2. Entra en ella y ejecuta: vorkanpm init')
  nota('3. Abre el agente con: opencode')
  linea()
  if (!resolverOpencode()) aviso('Recuerda reiniciar el equipo si opencode aun no responde.')
}

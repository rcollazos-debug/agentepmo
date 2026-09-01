import path from 'node:path'
import { spawnSync } from 'node:child_process'
import { packagedAgentDir, packageRoot } from '../lib/paths.js'
import { existe, leerJson } from '../lib/fsx.js'
import { instalarCuerpo } from '../lib/install.js'
import { generarConfigGlobal } from '../lib/config.js'
import { versionInstalada, versionPaquete } from '../lib/manifest.js'
import { titulo, paso, ok, aviso, nota, linea, ErrorDeUsuario } from '../lib/ui.js'

const PAQUETE = '@vortexbird/vorkanpm'

function valorDe (args, bandera) {
  const i = args.indexOf(bandera)
  return i >= 0 && args[i + 1] && !args[i + 1].startsWith('--') ? args[i + 1] : null
}

/** ¿El CLI corre desde una copia de trabajo enlazada con `npm link`? */
function esCopiaDeTrabajo () {
  return existe(path.join(packageRoot(), '.git'))
}

/** ¿Esta configurado el registry privado para el scope en esta maquina? */
function registryConfigurado () {
  const npm = process.platform === 'win32' ? 'npm.cmd' : 'npm'
  const scope = PAQUETE.split('/')[0]
  const r = spawnSync(npm, ['config', 'get', `${scope}:registry`], {
    encoding: 'utf8', shell: process.platform === 'win32'
  })
  const valor = (r.stdout || '').trim()
  return valor && valor !== 'undefined' && !valor.includes('registry.npmjs.org')
}

/** Descarga la version pedida y devuelve el directorio del cuerpo recien instalado. */
function descargar (destinoVersion) {
  const npm = process.platform === 'win32' ? 'npm.cmd' : 'npm'
  const r = spawnSync(npm, ['install', '-g', `${PAQUETE}@${destinoVersion}`], {
    stdio: 'inherit', shell: process.platform === 'win32'
  })
  if (r.status !== 0) {
    // Un 404 no es un problema de conexion. Mandar al usuario a mirar la red
    // cuando el paquete no existe o el registry no esta configurado le hace
    // perder el tiempo en el sitio equivocado.
    const remedios = []
    if (!registryConfigurado()) {
      remedios.push('Este equipo no tiene configurado el repositorio privado de VortexBird, asi que npm lo busco en el publico. Pide al administrador el instalador, que lo configura.')
    }
    if (esCopiaDeTrabajo()) {
      remedios.push('Estas usando una instalacion enlazada al repositorio de codigo. Para aplicar los cambios que ya tienes en disco: vorkanpm update --solo-local')
    }
    if (!remedios.length) {
      remedios.push('Comprueba tu conexion. Si el acceso caduco, pide al administrador un instalador con el token renovado.')
    }
    throw new ErrorDeUsuario('No se pudo descargar la version nueva del agente.', remedios.join('\n\n      '))
  }
  const raizGlobal = spawnSync(npm, ['root', '-g'], { encoding: 'utf8', shell: process.platform === 'win32' }).stdout.trim()
  const paquete = path.join(raizGlobal, ...PAQUETE.split('/'))
  if (!existe(paquete)) {
    throw new ErrorDeUsuario('No encuentro el paquete recien instalado.', 'Reintenta con: npm install -g ' + PAQUETE)
  }
  return {
    agentDir: path.join(paquete, 'agent'),
    version: leerJson(path.join(paquete, 'package.json'), { version: destinoVersion }).version
  }
}

export default async function update (args) {
  const soloLocal = args.includes('--solo-local')
  const forzar = args.includes('--forzar')
  const pedida = valorDe(args, '--version') || 'latest'

  titulo('Actualizar Vorkan-PM')
  if (soloLocal) nota('Modo local: se instala el cuerpo que ya tienes en disco, sin descargar nada.')
  const anterior = versionInstalada()
  if (!anterior) {
    throw new ErrorDeUsuario('No hay ninguna instalacion que actualizar.', 'Ejecuta primero: vorkanpm setup')
  }
  nota(`Version instalada: ${anterior}`)

  let origen = packagedAgentDir()
  let nueva = versionPaquete()

  if (!soloLocal) {
    paso(`Descargando la version ${pedida}`)
    const bajada = descargar(pedida)
    origen = bajada.agentDir
    nueva = bajada.version
  }

  // En modo local no se comprueba la version: el objetivo es aplicar lo que hay
  // en disco, y editar un skill sin subir la version es lo normal mientras se
  // desarrolla. Negarse ahi vaciaria de sentido la opcion.
  if (nueva === anterior && !forzar && !soloLocal) {
    linea()
    ok(`Ya estas en la ultima version (${anterior}). No hay nada que actualizar.`)
    return
  }

  paso(soloLocal && nueva === anterior ? 'Reinstalando el cuerpo del agente' : 'Reemplazando el cuerpo del agente')
  nota('Tus proyectos no se tocan: solo se reescribe la instalacion global.')
  const r = instalarCuerpo(origen, nueva)
  ok(`${r.copiados} archivos instalados`)

  paso('Regenerando la configuracion')
  generarConfigGlobal()
  ok('Configuracion al dia')
  nota('Tus credenciales y autorizaciones se conservan intactas.')

  linea()
  titulo(nueva === anterior ? `Reinstalado (${nueva})` : `Actualizado: ${anterior} -> ${nueva}`)
  nota('El cambio se aplica la proxima vez que abras el agente con `opencode`.')
  linea()
}

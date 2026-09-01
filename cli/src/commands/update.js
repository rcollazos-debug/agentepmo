import path from 'node:path'
import { spawnSync } from 'node:child_process'
import { packagedAgentDir } from '../lib/paths.js'
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

/** Descarga la version pedida y devuelve el directorio del cuerpo recien instalado. */
function descargar (destinoVersion) {
  const npm = process.platform === 'win32' ? 'npm.cmd' : 'npm'
  const r = spawnSync(npm, ['install', '-g', `${PAQUETE}@${destinoVersion}`], {
    stdio: 'inherit', shell: process.platform === 'win32'
  })
  if (r.status !== 0) {
    throw new ErrorDeUsuario(
      'No se pudo descargar la version nueva del agente.',
      'Comprueba tu conexion y que el acceso al registry privado sigue vigente. Si caduco, pide al administrador un token nuevo.'
    )
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

  if (nueva === anterior && !forzar) {
    linea()
    ok(`Ya estas en la ultima version (${anterior}). No hay nada que actualizar.`)
    return
  }

  paso('Reemplazando el cuerpo del agente')
  nota('Tus proyectos no se tocan: solo se reescribe la instalacion global.')
  const r = instalarCuerpo(origen, nueva)
  ok(`${r.copiados} archivos instalados`)

  paso('Regenerando la configuracion')
  generarConfigGlobal()
  ok('Configuracion al dia')
  nota('Tus credenciales y autorizaciones se conservan intactas.')

  linea()
  titulo(`Actualizado: ${anterior} -> ${nueva}`)
  nota('El cambio se aplica la proxima vez que abras el agente con `opencode`.')
  linea()
}

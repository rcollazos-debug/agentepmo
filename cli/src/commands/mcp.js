import fs from 'node:fs'
import os from 'node:os'
import path from 'node:path'
import { spawn, spawnSync } from 'node:child_process'
import { credentialTargets, PROJECT_MARKER } from '../lib/paths.js'
import { existe, leerJson } from '../lib/fsx.js'

const HOME = os.homedir()

/** Un fallo aqui lo lee opencode, no una persona: se responde en JSON-RPC. */
function fallar (mensaje) {
  process.stderr.write(JSON.stringify({
    jsonrpc: '2.0', id: 1, error: { code: -32000, message: mensaje }
  }) + '\n')
  process.exit(1)
}

function relevar (cmd, args, env = {}) {
  const p = spawn(cmd, args, {
    stdio: 'inherit',
    env: { ...process.env, ...env },
    shell: process.platform === 'win32'
  })
  p.on('close', (code) => process.exit(code ?? 0))
  p.on('error', (e) => fallar(`No se pudo arrancar el servidor MCP: ${e.message}`))
}

const npx = () => (process.platform === 'win32' ? 'npx.cmd' : 'npx')

function cargarEnv (archivo) {
  const env = {}
  if (!existe(archivo)) return env
  for (const linea of fs.readFileSync(archivo, 'utf8').split('\n')) {
    const m = linea.match(/^\s*([A-Za-z_][A-Za-z0-9_]*)\s*=\s*(.*)\s*$/)
    if (m) env[m[1]] = m[2].replace(/^["']|["']$/g, '')
  }
  return env
}

const servidores = {
  gmail (modo) {
    const t = credentialTargets()
    if (!existe(t.gmail)) fallar('Falta la credencial de Gmail. Ejecuta: vorkanpm setup')
    if (modo !== 'auth' && !existe(t.gmailToken)) {
      fallar('Gmail no esta autorizado en este equipo. Ejecuta: vorkanpm mcp gmail --auth')
    }
    // El servidor busca ~/.gmail-mcp/ relativo a HOME; apuntamos HOME a la
    // carpeta de credenciales para que todo quede en un solo lugar.
    relevar(npx(), ['-y', '@gongrzhe/server-gmail-autoauth-mcp', ...(modo === 'auth' ? ['auth'] : [])], {
      HOME: t.base
    })
  },

  'google-calendar' (modo) {
    const t = credentialTargets()
    if (!existe(t.calendar)) fallar('Falta la credencial de Google Calendar. Ejecuta: vorkanpm setup')
    if (modo !== 'auth' && !existe(t.calendarTokens)) {
      fallar('Google Calendar no esta autorizado en este equipo. Ejecuta: vorkanpm mcp google-calendar --auth')
    }
    relevar(npx(), ['-y', '@cocal/google-calendar-mcp', ...(modo === 'auth' ? ['auth'] : [])], {
      GOOGLE_OAUTH_CREDENTIALS: t.calendar,
      GOOGLE_CALENDAR_MCP_TOKEN_PATH: t.calendarTokens
    })
  },

  /**
   * google-chat-mcp no arranca bien via npx y su flujo OAuth usa el
   * `registeredUri` sin puerto, lo que produce un error 400 de Google.
   * Se instala una copia cacheada y se corrige el redirect antes de arrancar.
   */
  'google-chat' (modo) {
    const t = credentialTargets()
    if (!existe(t.chat)) fallar('Falta la credencial de Google Chat. Ejecuta: vorkanpm setup')

    // Sin token, el servidor abre el navegador para autorizar. Al arrancarlo
    // opencode en cada sesion, eso secuestra el arranque del agente con una
    // pantalla de Google. Una integracion opcional sin autorizar debe
    // degradar en silencio, no interrumpir.
    if (modo !== 'auth' && !existe(t.chatToken)) {
      fallar('Google Chat no esta autorizado en este equipo. Ejecuta: vorkanpm mcp google-chat --auth')
    }

    const cache = path.join(HOME, '.cache', 'google-chat-mcp-vorkanpm')
    const entrada = path.join(cache, 'node_modules', 'google-chat-mcp', 'dist', 'index.js')
    const auth = path.join(cache, 'node_modules', 'google-chat-mcp', 'dist', 'auth.js')

    if (!existe(entrada)) {
      fs.mkdirSync(cache, { recursive: true })
      const r = spawnSync(process.platform === 'win32' ? 'npm.cmd' : 'npm',
        ['install', '--prefix', cache, '--no-save', 'google-chat-mcp'],
        { stdio: 'ignore', shell: process.platform === 'win32' })
      if (r.status !== 0 || !existe(entrada)) fallar('No se pudo instalar google-chat-mcp en la cache local')
    }

    if (existe(auth)) {
      const src = fs.readFileSync(auth, 'utf8')
      const fijo = src.replace(/const redirectUri = registeredUri \?\? /g, 'const redirectUri = ')
      if (fijo !== src) fs.writeFileSync(auth, fijo)
    }

    relevar(process.execPath, [entrada, '--credentials-path', t.chat, '--token-path', t.chatToken])
  },

  /** El servidor de Metabase declara `z.array(z.any())`, que rompe el esquema. */
  metabase () {
    const t = credentialTargets()
    const env = cargarEnv(t.metabaseEnv)

    const buscar = path.join(HOME, '.npm', '_npx')
    const parchear = (dir, prof = 0) => {
      if (prof > 6 || !existe(dir)) return
      for (const e of fs.readdirSync(dir, { withFileTypes: true })) {
        const p = path.join(dir, e.name)
        if (e.isDirectory()) parchear(p, prof + 1)
        else if (e.name === 'database-tools.js' && p.includes('metabase-mcp-server')) {
          const src = fs.readFileSync(p, 'utf8')
          const fijo = src.split('z.array(z.any())').join('z.array(z.unknown())')
          if (fijo !== src) fs.writeFileSync(p, fijo)
        }
      }
    }
    try { parchear(buscar) } catch { /* el parche es oportunista */ }

    relevar(npx(), ['-y', '@cognitionai/metabase-mcp-server', '--all'], env)
  },

  /**
   * Trilium: servidor propio sobre la ETAPI con las 19 herramientas.
   * El ambito del proyecto se aplica dentro de cada herramienta, porque
   * Trilium no tiene permisos por nota y el token abre todo el arbol.
   */
  async trilium () {
    const { Trilium, configTrilium } = await import('../lib/trilium.js')
    const { crearHerramientas } = await import('../lib/trilium-tools.js')
    const { servirMcp } = await import('../lib/mcp-server.js')
    const { versionPaquete } = await import('../lib/manifest.js')

    const cfg = configTrilium()
    if (!cfg.url || !cfg.token) fallar('Falta la configuracion de Trilium (URL o token). Ejecuta: vorkanpm setup')

    const marca = leerJson(path.join(process.cwd(), PROJECT_MARKER), null)
    const proyectoId = marca?.trilium_note_id || null

    servirMcp({
      nombre: 'vorkanpm-trilium',
      version: versionPaquete(),
      herramientas: crearHerramientas({
        proyectoId,
        trilium: new Trilium(cfg),
        registrarLectura: (id) => process.stderr.write(`[trilium] lectura ${id}\n`)
      })
    })
  },

  notebooklm () {
    const candidatos = [
      path.join(HOME, '.local', 'bin', 'notebooklm-mcp'),
      'notebooklm-mcp'
    ]
    const elegido = candidatos.find((c) => c === 'notebooklm-mcp' || existe(c))
    if (!elegido) fallar('notebooklm-mcp no esta instalado. Ejecuta: uv tool install notebooklm-mcp-cli')
    relevar(elegido, [])
  }
}

export default async function mcp (args) {
  const nombre = args[0]
  const modo = args.includes('--auth') ? 'auth' : 'serve'
  const servidor = servidores[nombre]
  if (!servidor) fallar(`Servidor MCP desconocido: ${nombre}`)
  servidor(modo)
}

export const SERVIDORES_DISPONIBLES = Object.keys(servidores)

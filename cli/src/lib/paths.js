import fs from 'node:fs'
import os from 'node:os'
import path from 'node:path'
import { fileURLToPath } from 'node:url'

/**
 * Base del perfil del usuario. VORKANPM_HOME permite dirigir toda la
 * instalacion a otro arbol: es lo que hace verificable el instalador sin
 * escribir en el perfil real de nadie.
 */
const HOME = process.env.VORKANPM_HOME || os.homedir()

export function home () {
  return HOME
}

/** Raiz del paquete instalado (donde viven `agent/` y `cli/`). */
export function packageRoot () {
  return path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..', '..', '..')
}

/** Cuerpo del agente tal como viaja en el paquete. */
export function packagedAgentDir () {
  return path.join(packageRoot(), 'agent')
}

/**
 * Directorio global de opencode: es donde se instala el cuerpo del agente y
 * el valor con el que se sustituye {{AGENT_HOME}}.
 * opencode lo descubre en toda carpeta, sin symlinks ni copias por proyecto.
 */
export function agentHome () {
  if (process.platform === 'win32') {
    const appData = process.env.VORKANPM_HOME
      ? path.join(HOME, 'AppData', 'Roaming')
      : (process.env.APPDATA || path.join(HOME, 'AppData', 'Roaming'))
    return path.join(appData, 'opencode')
  }
  const xdg = process.env.VORKANPM_HOME
    ? path.join(HOME, '.config')
    : (process.env.XDG_CONFIG_HOME || path.join(HOME, '.config'))
  return path.join(xdg, 'opencode')
}

/** Carpetas del cuerpo que `setup`/`update` instalan y sobrescriben por completo. */
export const BODY_DIRS = ['agents', 'skills', 'commands', 'vorkan']

export function globalConfigFile () {
  return path.join(agentHome(), 'opencode.json')
}

export function manifestFile () {
  return path.join(agentHome(), 'vorkan', '.manifest.json')
}

/**
 * Carpeta permanente donde el PM guarda todas sus credenciales.
 * Se elige una vez durante `vorkanpm setup` y se persiste en
 * agentHome()/vorkan/.cred-home para que todos los comandos la lean.
 * Por defecto: ~/credenciales-vorkan
 */
const CRED_HOME_FILE = path.join(agentHome(), 'vorkan', '.cred-home')

export function credentialsHome () {
  try {
    const saved = fs.readFileSync(CRED_HOME_FILE, 'utf8').trim()
    if (saved) return saved
  } catch { /* aún no se ha configurado */ }
  return path.join(HOME, 'credenciales-vorkan')
}

export function guardarCredentialsHome (dir) {
  fs.mkdirSync(path.dirname(CRED_HOME_FILE), { recursive: true })
  fs.writeFileSync(CRED_HOME_FILE, dir, 'utf8')
}

/**
 * Rutas de todas las credenciales — todas dentro de credentialsHome().
 *
 * Estructura:
 *   <credDir>/
 *   ├── .gmail-mcp/          ← gmail server usa HOME=credDir, busca aquí
 *   │   ├── gcp-oauth.keys.json
 *   │   └── credentials.json
 *   ├── calendar/
 *   │   ├── gcp-oauth.keys.json
 *   │   └── tokens.json
 *   ├── chat/
 *   │   ├── credentials.json
 *   │   └── token.json
 *   ├── metabase.env
 *   └── trilium.env
 */
export function credentialTargets () {
  const base = credentialsHome()
  return {
    base,
    gmail: path.join(base, '.gmail-mcp', 'gcp-oauth.keys.json'),
    gmailToken: path.join(base, '.gmail-mcp', 'credentials.json'),
    calendar: path.join(base, 'calendar', 'gcp-oauth.keys.json'),
    calendarTokens: path.join(base, 'calendar', 'tokens.json'),
    chat: path.join(base, 'chat', 'credentials.json'),
    chatToken: path.join(base, 'chat', 'token.json'),
    metabaseEnv: path.join(base, 'metabase.env'),
    triliumEnv: path.join(base, 'trilium.env')
  }
}

/** Nombres aceptados dentro de la carpeta `credenciales/` del administrador. */
export const CREDENTIAL_SOURCES = {
  gmail: 'gmail-oauth.keys.json',
  calendar: 'calendar-oauth.keys.json',
  chat: 'chat-credentials.json',
  metabaseEnv: 'metabase.env',
  triliumEnv: 'trilium.env'
}

export const PROJECT_MARKER = '.vorkanpm.json'
export const PROJECT_FILE = 'project.md'
export const PROJECT_DIRS = ['context', 'memory', 'metrics', 'data', 'risks', 'scope']

import path from 'node:path'
import { agentHome, globalConfigFile, packageRoot } from './paths.js'
import { escribirJson, leerJson } from './fsx.js'

const MODELO_POR_DEFECTO = 'anthropic/claude-sonnet-4-5'
const SCHEMA = 'https://opencode.ai/config.json'

/**
 * Los servidores MCP se invocan a traves del propio CLI: la logica que antes
 * vivia duplicada en wrappers .sh y .cmd ahora es un solo camino de codigo.
 * Se resuelve la ruta absoluta del ejecutable de Node y del CLI para no
 * depender del PATH de la sesion en la que opencode arranque el servidor.
 */
function comandoMcp (servidor) {
  const entrada = path.join(packageRoot(), 'cli', 'bin', 'vorkanpm.js')
  return [process.execPath, entrada, 'mcp', servidor]
}

export const SERVIDORES_MCP = {
  gmail: { obligatorio: true, etiqueta: 'Gmail' },
  'google-calendar': { obligatorio: false, etiqueta: 'Google Calendar' },
  'google-chat': { obligatorio: false, etiqueta: 'Google Chat' },
  trilium: { obligatorio: false, etiqueta: 'Trilium (repositorio de proyectos)' },
  notebooklm: { obligatorio: false, etiqueta: 'NotebookLM' }
}

/** Configuracion global: modelo y servidores MCP, con rutas ya resueltas. */
export function generarConfigGlobal ({ modelo = MODELO_POR_DEFECTO } = {}) {
  const mcp = {}
  for (const nombre of Object.keys(SERVIDORES_MCP)) {
    mcp[nombre] = { type: 'local', command: comandoMcp(nombre), environment: {} }
  }
  const config = { $schema: SCHEMA, model: modelo, mcp }
  escribirJson(globalConfigFile(), config)
  return globalConfigFile()
}

/**
 * Configuracion del proyecto.
 *
 * Desactiva los agentes generales de opencode dentro de la carpeta del
 * proyecto. Sin esto, el PM abre `opencode` y habla con el agente por defecto
 * — que responde "soy tu asistente de IA" — en vez de con Vorkan-PM, y tendria
 * que saber que hay que cambiar de agente con la tecla Tab.
 *
 * Solo afecta a esta carpeta: fuera de ella opencode sigue como siempre.
 */
export function generarConfigProyecto (dir) {
  const archivo = path.join(dir, 'opencode.json')
  escribirJson(archivo, {
    $schema: SCHEMA,
    agent: {
      build: { disable: true },
      plan: { disable: true }
    }
  })
  return archivo
}

/** ¿La configuracion del proyecto deja a Vorkan-PM como unico agente? */
export function configProyectoAlDia (dir) {
  const c = leerJson(path.join(dir, 'opencode.json'), null)
  return Boolean(c?.agent?.build?.disable)
}

export function configGlobalExiste () {
  return leerJson(globalConfigFile(), null) !== null
}

export { agentHome }

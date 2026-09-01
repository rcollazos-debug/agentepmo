import fs from 'node:fs'
import path from 'node:path'
import { agentHome, BODY_DIRS } from './paths.js'
import { copiarArbol, existe, asegurarDir } from './fsx.js'
import { leerManifiesto, escribirManifiesto } from './manifest.js'

/** Elimina solo lo que instalo una version anterior, nunca lo ajeno. */
function limpiarInstalacionPrevia () {
  const raiz = agentHome()
  const previo = leerManifiesto()
  if (!previo) return 0
  let borrados = 0
  for (const rel of Object.keys(previo.archivos || {})) {
    const p = path.join(raiz, rel)
    if (existe(p)) { fs.rmSync(p, { force: true }); borrados++ }
  }
  // Retirar los directorios que quedaron vacios, de mas profundo a mas somero.
  for (const d of BODY_DIRS) {
    const dir = path.join(raiz, d)
    if (!existe(dir)) continue
    const vaciar = (p) => {
      for (const e of fs.readdirSync(p, { withFileTypes: true })) {
        if (e.isDirectory()) vaciar(path.join(p, e.name))
      }
      if (fs.readdirSync(p).length === 0) fs.rmdirSync(p)
    }
    vaciar(dir)
  }
  return borrados
}

/**
 * Instala el cuerpo del agente en el directorio global de opencode,
 * sustituyendo el marcador {{AGENT_HOME}} por la ruta real de esta maquina.
 * Nunca toca datos de proyecto: solo escribe dentro del directorio global.
 */
export function instalarCuerpo (origenAgentDir, version) {
  const raiz = agentHome()
  asegurarDir(raiz)
  const borrados = limpiarInstalacionPrevia()

  let copiados = 0
  for (const d of BODY_DIRS) {
    const origen = path.join(origenAgentDir, d)
    if (!existe(origen)) continue
    copiados += copiarArbol(origen, path.join(raiz, d), { agentHome: raiz })
  }
  const registrados = escribirManifiesto(version)
  return { borrados, copiados, registrados, destino: raiz }
}

/** Comprueba que el cuerpo quedo donde opencode lo descubre. */
export function cuerpoInstalado () {
  const raiz = agentHome()
  return existe(path.join(raiz, 'agents', 'vorkan-pm.md')) &&
         existe(path.join(raiz, 'skills')) &&
         existe(path.join(raiz, 'vorkan'))
}

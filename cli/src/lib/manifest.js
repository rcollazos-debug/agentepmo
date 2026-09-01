import fs from 'node:fs'
import path from 'node:path'
import crypto from 'node:crypto'
import { agentHome, manifestFile, BODY_DIRS, packageRoot, PROJECT_MARKER } from './paths.js'
import { leerJson, escribirJson, existe } from './fsx.js'

/** Version del paquete instalado, leida de su propio package.json. */
export function versionPaquete () {
  return leerJson(path.join(packageRoot(), 'package.json'), { version: '0.0.0' }).version
}

function huella (archivo) {
  return crypto.createHash('sha256').update(fs.readFileSync(archivo)).digest('hex').slice(0, 16)
}

function recorrer (dir, raiz, acc) {
  if (!existe(dir)) return acc
  for (const e of fs.readdirSync(dir, { withFileTypes: true })) {
    const p = path.join(dir, e.name)
    if (e.isDirectory()) recorrer(p, raiz, acc)
    else if (e.name !== '.manifest.json') acc[path.relative(raiz, p)] = huella(p)
  }
  return acc
}

/** Registra que version quedo instalada y con que contenido, para que doctor lo compruebe. */
export function escribirManifiesto (version) {
  const raiz = agentHome()
  const archivos = {}
  for (const d of BODY_DIRS) recorrer(path.join(raiz, d), raiz, archivos)
  escribirJson(manifestFile(), {
    version,
    instaladoEl: new Date().toISOString(),
    plataforma: process.platform,
    archivos
  })
  return Object.keys(archivos).length
}

export function leerManifiesto () {
  return leerJson(manifestFile(), null)
}

/** Version del cuerpo instalado, o null si no hay instalacion. */
export function versionInstalada () {
  return leerManifiesto()?.version ?? null
}

/** Archivos del cuerpo instalado que fueron modificados a mano. */
export function archivosModificados () {
  const m = leerManifiesto()
  if (!m) return []
  const raiz = agentHome()
  const sucios = []
  for (const [rel, esperado] of Object.entries(m.archivos || {})) {
    const p = path.join(raiz, rel)
    if (!existe(p)) sucios.push({ archivo: rel, motivo: 'falta' })
    else if (huella(p) !== esperado) sucios.push({ archivo: rel, motivo: 'modificado' })
  }
  return sucios
}

/** Marca de proyecto: identidad y version del cuerpo con la que se creo. */
export function leerMarcaProyecto (dir = process.cwd()) {
  return leerJson(path.join(dir, PROJECT_MARKER), null)
}

export function escribirMarcaProyecto (dir, datos) {
  escribirJson(path.join(dir, PROJECT_MARKER), datos)
}

import fs from 'node:fs'
import path from 'node:path'
import crypto from 'node:crypto'
import { PROJECT_DIRS, PROJECT_MARKER } from './paths.js'
import { existe, leerJson, escribirJson } from './fsx.js'

/**
 * Estado de vinculacion y sincronizacion de una carpeta de proyecto.
 *
 * `sync` guarda, por cada direccion logica, lo que se sabia la ultima vez que
 * local y Trilium coincidieron: el hash del archivo local y el blobId de la
 * nota. Con esos dos datos se distingue quien cambio — o si cambiaron los dos,
 * que es el unico caso que necesita una politica.
 */

export const hashTexto = (t) => crypto.createHash('sha256').update(t ?? '').digest('hex').slice(0, 16)

export function leerVinculo (dir = process.cwd()) {
  return leerJson(path.join(dir, PROJECT_MARKER), null)
}

export function escribirVinculo (dir, datos) {
  escribirJson(path.join(dir, PROJECT_MARKER), datos)
}

export function estaVinculado (dir = process.cwd()) {
  return Boolean(leerVinculo(dir)?.trilium_note_id)
}

/** Direcciones logicas de los archivos que hay en la carpeta del proyecto. */
export function archivosLocales (dir = process.cwd()) {
  const salida = []
  for (const carpeta of PROJECT_DIRS) {
    const ruta = path.join(dir, carpeta)
    if (!existe(ruta)) continue
    for (const nombre of fs.readdirSync(ruta)) {
      if (!nombre.endsWith('.md')) continue
      salida.push(`${carpeta}/${nombre.replace(/\.md$/, '')}`)
    }
  }
  return salida.sort()
}

export const rutaDe = (dir, direccion) => path.join(dir, `${direccion}.md`)

export function leerLocal (dir, direccion) {
  const p = rutaDe(dir, direccion)
  return existe(p) ? fs.readFileSync(p, 'utf8') : null
}

/** Fecha real de modificacion del archivo local, no la de la ultima sincronizacion. */
export function modificadoLocal (dir, direccion) {
  const p = rutaDe(dir, direccion)
  return existe(p) ? fs.statSync(p).mtime.toISOString() : null
}

export function escribirLocal (dir, direccion, contenido) {
  const p = rutaDe(dir, direccion)
  fs.mkdirSync(path.dirname(p), { recursive: true })
  fs.writeFileSync(p, contenido)
}

const rutaBase = (dir, direccion) => path.join(dir, '.vorkanpm', 'base', `${direccion}.md`)

/** Contenido con el que local y repositorio coincidieron por ultima vez. */
export function leerBase (dir, direccion) {
  const p = rutaBase(dir, direccion)
  return existe(p) ? fs.readFileSync(p, 'utf8') : null
}

/**
 * Marca que una direccion quedo sincronizada, guardando ademas el contenido.
 *
 * El hash dice que algo cambio; el contenido dice QUIEN lo cambio. Sin base no
 * se puede distinguir a quien corrigio una entrada de quien solo arrastraba
 * una copia antigua, y acaba ganando el que publica mas tarde.
 */
export function marcarSincronizado (dir, direccion, { contenido, blobId }) {
  const v = leerVinculo(dir) || {}
  v.sync = v.sync || {}
  v.sync[direccion] = { hashLocal: hashTexto(contenido), blobId, fecha: new Date().toISOString() }
  escribirVinculo(dir, v)
  const p = rutaBase(dir, direccion)
  fs.mkdirSync(path.dirname(p), { recursive: true })
  fs.writeFileSync(p, contenido ?? '')
}

export function baseDe (dir, direccion) {
  return leerVinculo(dir)?.sync?.[direccion] || null
}

/**
 * Compara los tres estados de una direccion y dice quien cambio.
 * Es la base de todo lo demas: sin esto no se puede saber si publicar,
 * descargar o reconciliar.
 */
export function situacion ({ local, remoto, base }) {
  const hayLocal = local !== null && local !== undefined
  const hayRemoto = remoto !== null && remoto !== undefined

  if (!hayLocal && !hayRemoto) return 'ninguno'
  if (hayLocal && !hayRemoto) return base ? 'borrado-remoto' : 'solo-local'
  if (!hayLocal && hayRemoto) return base ? 'borrado-local' : 'solo-remoto'

  const localCambio = !base || hashTexto(local) !== base.hashLocal
  const remotoCambio = !base || remoto.blobId !== base.blobId

  if (!localCambio && !remotoCambio) return 'iguales'
  if (localCambio && !remotoCambio) return 'cambio-local'
  if (!localCambio && remotoCambio) return 'cambio-remoto'
  return 'ambos'
}

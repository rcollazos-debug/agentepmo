import fs from 'node:fs'
import { credentialTargets } from './paths.js'
import { existe } from './fsx.js'

/** Lee TRILIUM_URL y TRILIUM_TOKEN del archivo de credenciales instalado. */
export function configTrilium () {
  const archivo = credentialTargets().triliumEnv
  const env = {}
  if (existe(archivo)) {
    for (const linea of fs.readFileSync(archivo, 'utf8').split('\n')) {
      const m = linea.match(/^\s*([A-Za-z_][A-Za-z0-9_]*)\s*=\s*(.*)\s*$/)
      if (m) env[m[1]] = m[2].replace(/^["']|["']$/g, '')
    }
  }
  const url = process.env.TRILIUM_URL || env.TRILIUM_URL
  const token = process.env.TRILIUM_TOKEN || env.TRILIUM_TOKEN
  return { url: url ? url.replace(/\/+$/, '') : null, token: token || null }
}

export class ErrorTrilium extends Error {
  constructor (mensaje, estado) {
    super(mensaje)
    this.estado = estado
  }
}

/** Cliente minimo de la ETAPI. Solo lo que el agente necesita. */
export class Trilium {
  constructor ({ url, token } = configTrilium()) {
    if (!url || !token) {
      throw new ErrorTrilium('Falta la configuracion de Trilium (URL o token). Ejecuta: vorkanpm setup')
    }
    this.url = url
    this.token = token
  }

  async pedir (metodo, ruta, { cuerpo, tipo = 'application/json', texto = false } = {}) {
    let r
    try {
      r = await this.enviar(metodo, ruta, { cuerpo, tipo })
    } catch (e) {
      // Un fallo de conexion NO es una nota inexistente. Distinguirlos es
      // critico: confundirlos hace que un servidor caido parezca un proyecto
      // borrado entero.
      throw new ErrorTrilium(`No hay conexion con el repositorio (${e.message})`, 0)
    }
    if (!r.ok) {
      const detalle = await r.text().catch(() => '')
      throw new ErrorTrilium(`${metodo} ${ruta} respondio ${r.status}: ${detalle.slice(0, 200)}`, r.status)
    }
    if (r.status === 204) return null
    return texto ? r.text() : r.json()
  }

  enviar (metodo, ruta, { cuerpo, tipo }) {
    return fetch(this.url + ruta, {
      method: metodo,
      headers: {
        Authorization: this.token,
        ...(cuerpo !== undefined ? { 'Content-Type': tipo } : {})
      },
      body: cuerpo === undefined ? undefined : (tipo === 'application/json' ? JSON.stringify(cuerpo) : cuerpo)
    })
  }

  infoApp () { return this.pedir('GET', '/app-info') }

  obtenerNota (noteId) { return this.pedir('GET', `/notes/${noteId}`) }

  leerContenido (noteId) { return this.pedir('GET', `/notes/${noteId}/content`, { texto: true }) }

  escribirContenido (noteId, contenido) {
    return this.pedir('PUT', `/notes/${noteId}/content`, { cuerpo: contenido, tipo: 'text/plain' })
  }

  /**
   * Crea una nota. Por defecto es contenedora (`text`): cliente, anio, proyecto
   * y carpetas son ramas del arbol, no documentos.
   */
  async crearNota (parentNoteId, title, content = '', { contenedor = true } = {}) {
    const cuerpo = contenedor
      ? { parentNoteId, title, type: 'text', content }
      : { parentNoteId, title, type: 'code', mime: 'text/x-markdown', content }
    const r = await this.pedir('POST', '/create-note', { cuerpo })
    return r.note
  }

  /**
   * Los archivos del proyecto se guardan como Markdown sin convertir: Trilium
   * no renderiza Markdown en ningun tipo de nota, y convertir a HTML metia una
   * transformacion con perdida justo en el camino de vuelta.
   */
  crearNotaDocumento (parentNoteId, title, content = '') {
    return this.crearNota(parentNoteId, title, content, { contenedor: false })
  }

  borrarNota (noteId) { return this.pedir('DELETE', `/notes/${noteId}`) }

  /** La busqueda acepta ancestorNoteId, que es lo que permite acotar por proyecto. */
  async buscar (search, { ancestorNoteId, limit } = {}) {
    const q = new URLSearchParams({ search })
    if (ancestorNoteId) q.set('ancestorNoteId', ancestorNoteId)
    if (limit) q.set('limit', String(limit))
    const r = await this.pedir('GET', `/notes?${q}`)
    return r.results || []
  }

  ponerAtributo (noteId, name, value, { inheritable = false } = {}) {
    return this.pedir('POST', '/attributes', {
      cuerpo: { noteId, type: 'label', name, value: String(value), isInheritable: inheritable }
    })
  }

  async atributos (noteId) {
    const nota = await this.obtenerNota(noteId)
    return nota.attributes || []
  }

  /** Sustituye el valor de una etiqueta, o la crea si no existia. */
  async fijarAtributo (noteId, name, value) {
    for (const a of await this.atributos(noteId)) {
      if (a.type === 'label' && a.name === name) {
        await this.pedir('DELETE', `/attributes/${a.attributeId}`)
      }
    }
    return this.ponerAtributo(noteId, name, value)
  }

  /** Busca un hijo por titulo exacto; lo crea si no existe. Idempotente. */
  async hijoPorTitulo (parentNoteId, title) {
    const padre = await this.obtenerNota(parentNoteId)
    for (const hijoId of padre.childNoteIds || []) {
      const hijo = await this.obtenerNota(hijoId)
      if (hijo.title === title) return hijo
    }
    return null
  }

  async asegurarHijo (parentNoteId, title, content = '') {
    return (await this.hijoPorTitulo(parentNoteId, title)) || this.crearNota(parentNoteId, title, content)
  }

  actualizarNota (noteId, campos) { return this.pedir('PATCH', `/notes/${noteId}`, { cuerpo: campos }) }

  // --- revisiones ---
  revisiones (noteId) { return this.pedir('GET', `/notes/${noteId}/revisions`) }
  crearRevision (noteId) { return this.pedir('POST', `/notes/${noteId}/revision`) }

  // --- adjuntos ---
  adjuntos (noteId) { return this.pedir('GET', `/notes/${noteId}/attachments`) }
  crearAdjunto (ownerId, { title, role = 'file', mime = 'text/plain', content = '' }) {
    return this.pedir('POST', '/attachments', { cuerpo: { ownerId, title, role, mime, content } })
  }
  escribirAdjunto (attachmentId, contenido) {
    return this.pedir('PUT', `/attachments/${attachmentId}/content`, { cuerpo: contenido, tipo: 'text/plain' })
  }
  borrarAdjunto (attachmentId) { return this.pedir('DELETE', `/attachments/${attachmentId}`) }
  obtenerAdjunto (attachmentId) { return this.pedir('GET', `/attachments/${attachmentId}`) }

  // --- ramas: mover y clonar ---
  rama (branchId) { return this.pedir('GET', `/branches/${branchId}`) }
  crearRama (noteId, parentNoteId) {
    return this.pedir('POST', '/branches', { cuerpo: { noteId, parentNoteId } })
  }
  borrarRama (branchId) { return this.pedir('DELETE', `/branches/${branchId}`) }

  // --- notas de calendario (dia, mes, anio; las semanas no existen en 0.105.0) ---
  notaEspecial (tipo, valor) {
    const rutas = { dia: 'days', mes: 'months', anio: 'years' }
    if (!rutas[tipo]) throw new ErrorTrilium(`Tipo de nota especial desconocido: ${tipo}`)
    return this.pedir('GET', `/calendar/${rutas[tipo]}/${valor}`)
  }

  borrarAtributo (attributeId) { return this.pedir('DELETE', `/attributes/${attributeId}`) }

  /** Arbol de notas hasta cierta profundidad, para orientarse sin traerlo todo. */
  async arbol (noteId, profundidad = 2) {
    const n = await this.obtenerNota(noteId)
    const nodo = { noteId: n.noteId, title: n.title, hijos: [] }
    if (profundidad > 0) {
      for (const hijoId of n.childNoteIds || []) {
        nodo.hijos.push(await this.arbol(hijoId, profundidad - 1))
      }
    }
    return nodo
  }

  /** Cadena de ancestros, base de la comprobacion de ambito. */
  async esDescendienteDe (noteId, raizId, visitados = new Set()) {
    if (noteId === raizId) return true
    if (visitados.has(noteId) || noteId === 'root' || visitados.size > 64) return false
    visitados.add(noteId)
    const n = await this.obtenerNota(noteId)
    for (const padre of n.parentNoteIds || []) {
      if (await this.esDescendienteDe(padre, raizId, visitados)) return true
    }
    return false
  }

  /** Identificador de contenido, para detectar escrituras ajenas. */
  async huella (noteId) {
    const n = await this.obtenerNota(noteId)
    return { blobId: n.blobId, modificado: n.utcDateModified }
  }
}

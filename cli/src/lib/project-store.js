import path from 'node:path'
import { Trilium } from './trilium.js'
import { PROJECT_DIRS } from './paths.js'
import { enParalelo } from './fsx.js'

/**
 * Traduce las direcciones logicas del contenido del agente a notas de Trilium.
 * `{project_path}/memory/historial.md` es la nota `historial` dentro de la nota
 * `memory` del proyecto de la sesion. Gracias a esto, las 284 referencias del
 * contenido siguen sirviendo sin tocarlas.
 */
export function partirDireccion (direccion) {
  const limpia = String(direccion).replace(/^\.\//, '').replace(/^\{project_path\}\//, '')
  const trozos = limpia.split('/').filter(Boolean)
  if (trozos.length !== 2) return null
  const [carpeta, archivo] = trozos
  if (!PROJECT_DIRS.includes(carpeta)) return null
  return { carpeta, nota: archivo.replace(/\.md$/i, '') }
}

export class RepositorioProyecto {
  constructor (trilium = new Trilium()) {
    this.t = trilium
  }

  /**
   * Resuelve (creando si hace falta) Cliente / Anio de inicio / Proyecto.
   * Es idempotente: dos proyectos del mismo cliente y anio no duplican padres.
   */
  async asegurarProyecto ({ cliente, anioInicio, nombreProyecto }) {
    const notaCliente = await this.t.asegurarHijo('root', cliente)
    const notaAnio = await this.t.asegurarHijo(notaCliente.noteId, String(anioInicio))
    const notaProyecto = await this.t.asegurarHijo(notaAnio.noteId, nombreProyecto)
    return {
      clienteId: notaCliente.noteId,
      anioId: notaAnio.noteId,
      proyectoId: notaProyecto.noteId
    }
  }

  /** Crea las seis notas de carpeta bajo el proyecto. */
  async asegurarCarpetas (proyectoId) {
    const ids = {}
    for (const d of PROJECT_DIRS) {
      ids[d] = (await this.t.asegurarHijo(proyectoId, d)).noteId
    }
    return ids
  }

  /**
   * Indice de todas las direcciones del proyecto en una sola pasada.
   *
   * Sin esto, resolver 47 direcciones re-pedia la carpeta y todos sus hijos
   * cada vez: miles de peticiones contra el servidor y una publicacion que no
   * terminaba. Aqui son 1 + 6 + 47.
   */
  async indice (proyectoId) {
    const mapa = new Map()
    const proyecto = await this.t.obtenerNota(proyectoId)
    const carpetas = (await enParalelo(proyecto.childNoteIds || [], (id) => this.t.obtenerNota(id)))
      .filter((c) => PROJECT_DIRS.includes(c.title))
    for (const carpeta of carpetas) {
      const hijos = await enParalelo(carpeta.childNoteIds || [], (id) => this.t.obtenerNota(id))
      for (const hijo of hijos) {
        mapa.set(`${carpeta.title}/${hijo.title}`, {
          noteId: hijo.noteId,
          blobId: hijo.blobId,
          utcDateModified: hijo.utcDateModified,
          carpetaId: carpeta.noteId
        })
      }
    }
    return mapa
  }

  /** Localiza la nota de una direccion logica dentro de un proyecto. */
  async notaDeDireccion (proyectoId, direccion, { crear = false } = {}) {
    const partes = partirDireccion(direccion)
    if (!partes) return null
    const carpeta = crear
      ? await this.t.asegurarHijo(proyectoId, partes.carpeta)
      : await this.t.hijoPorTitulo(proyectoId, partes.carpeta)
    if (!carpeta) return null
    return crear
      ? this.t.asegurarHijo(carpeta.noteId, partes.nota)
      : this.t.hijoPorTitulo(carpeta.noteId, partes.nota)
  }

  /** Atributos consultables de la nota raiz del proyecto. */
  async sellarProyecto (proyectoId, { cliente, anioInicio, projectId, pmTitular, estado }) {
    const sellos = {
      cliente,
      anioInicio: String(anioInicio),
      projectId,
      pmTitular,
      estado
    }
    for (const [k, v] of Object.entries(sellos)) {
      if (v !== undefined && v !== null) await this.t.fijarAtributo(proyectoId, k, v)
    }
    return sellos
  }

  /** Autoria: creador, ultimo editor y validador son campos distintos a proposito. */
  async sellarAutoria (noteId, { creadoPor, ultimaEdicion, validadoPor } = {}) {
    const ahora = new Date().toISOString().slice(0, 10)
    const atributos = await this.t.atributos(noteId)
    const yaTiene = (n) => atributos.some((a) => a.type === 'label' && a.name === n)

    if (creadoPor && !yaTiene('creadoPor')) {
      await this.t.ponerAtributo(noteId, 'creadoPor', creadoPor)
      await this.t.ponerAtributo(noteId, 'creadoEl', ahora)
    }
    if (ultimaEdicion) {
      await this.t.fijarAtributo(noteId, 'ultimaEdicion', ultimaEdicion)
      await this.t.fijarAtributo(noteId, 'ultimaEdicionEl', ahora)
    }
    if (validadoPor) {
      await this.t.fijarAtributo(noteId, 'validadoPor', validadoPor)
      await this.t.fijarAtributo(noteId, 'validadoEl', ahora)
    }
  }
}

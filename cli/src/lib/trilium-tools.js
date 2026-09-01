import { Trilium } from './trilium.js'
import { partirDireccion } from './project-store.js'

/**
 * Las diecinueve herramientas de Trilium, sobre la ETAPI.
 *
 * El ambito NO lo vigila un intermediario: lo aplica cada herramienta que
 * escribe, comprobando que su destino cuelga de la nota raiz del proyecto de
 * la sesion. Trilium no tiene permisos por nota, asi que esta comprobacion es
 * la unica barrera real entre los proyectos de dos PMs.
 */

export class FueraDeAmbito extends Error {
  constructor (noteId) {
    super(`La nota ${noteId} no pertenece al proyecto de esta sesion. Solo se puede escribir dentro del proyecto abierto.`)
  }
}

export class SinProyecto extends Error {
  constructor () {
    super('Esta sesion no esta vinculada a ningun proyecto de Trilium. Ejecuta `vorkanpm init` o `vorkanpm join` en la carpeta del proyecto.')
  }
}

export function crearHerramientas ({ proyectoId, trilium = new Trilium(), registrarLectura = () => {} }) {
  const t = trilium

  const exigirProyecto = () => { if (!proyectoId) throw new SinProyecto() }

  /** Puerta de escritura: el destino tiene que colgar del proyecto. */
  const exigirDentro = async (noteId) => {
    exigirProyecto()
    if (!(await t.esDescendienteDe(noteId, proyectoId))) throw new FueraDeAmbito(noteId)
    return noteId
  }

  /** Acepta un noteId o una direccion logica del tipo "memory/historial". */
  const resolver = async (referencia, { crear = false } = {}) => {
    exigirProyecto()
    const partes = partirDireccion(referencia)
    if (!partes) return referencia
    const carpeta = crear
      ? await t.asegurarHijo(proyectoId, partes.carpeta)
      : await t.hijoPorTitulo(proyectoId, partes.carpeta)
    if (!carpeta) throw new Error(`El proyecto no tiene la carpeta ${partes.carpeta}`)
    const nota = crear
      ? await t.asegurarHijo(carpeta.noteId, partes.nota)
      : await t.hijoPorTitulo(carpeta.noteId, partes.nota)
    if (!nota) throw new Error(`No existe ${referencia} en este proyecto`)
    return nota.noteId
  }

  return {
    // ---------------- NOTAS (5) ----------------
    get_note: {
      escribe: false,
      descripcion: 'Lee una nota y su contenido. Acepta un noteId o una direccion como "memory/historial".',
      esquema: { note: { tipo: 'string', requerido: true } },
      async ejecutar ({ note }) {
        const id = await resolver(note)
        registrarLectura(id)
        const n = await t.obtenerNota(id)
        return { ...n, content: await t.leerContenido(id) }
      }
    },
    create_note: {
      escribe: true,
      descripcion: 'Crea una nota hija dentro del proyecto.',
      esquema: { parent: { tipo: 'string', requerido: true }, title: { tipo: 'string', requerido: true }, content: { tipo: 'string' } },
      async ejecutar ({ parent, title, content = '' }) {
        const padre = await exigirDentro(await resolver(parent))
        return t.crearNotaDocumento(padre, title, content)
      }
    },
    write_note: {
      escribe: true,
      descripcion: 'Reemplaza el contenido de una nota del proyecto.',
      esquema: { note: { tipo: 'string', requerido: true }, content: { tipo: 'string', requerido: true } },
      async ejecutar ({ note, content }) {
        const id = await exigirDentro(await resolver(note, { crear: true }))
        await t.escribirContenido(id, content)
        return { noteId: id, ...(await t.huella(id)) }
      }
    },
    update_note: {
      escribe: true,
      descripcion: 'Cambia el titulo o el tipo de una nota del proyecto.',
      esquema: { note: { tipo: 'string', requerido: true }, title: { tipo: 'string' }, type: { tipo: 'string' } },
      async ejecutar ({ note, title, type }) {
        const id = await exigirDentro(await resolver(note))
        const campos = {}
        if (title !== undefined) campos.title = title
        if (type !== undefined) campos.type = type
        return t.actualizarNota(id, campos)
      }
    },
    delete_note: {
      escribe: true,
      descripcion: 'Borra una nota del proyecto y su subarbol.',
      esquema: { note: { tipo: 'string', requerido: true } },
      async ejecutar ({ note }) {
        const id = await exigirDentro(await resolver(note))
        await t.borrarNota(id)
        return { borrada: id }
      }
    },

    // ---------------- BUSQUEDA (2) ----------------
    search_notes: {
      escribe: false,
      descripcion: 'Busca notas. Por defecto en este proyecto; con alcance "todos" consulta el repositorio entero.',
      esquema: { query: { tipo: 'string', requerido: true }, alcance: { tipo: 'string' }, limit: { tipo: 'number' } },
      async ejecutar ({ query, alcance = 'proyecto', limit = 50 }) {
        const ancestro = alcance === 'todos' ? undefined : proyectoId
        registrarLectura(ancestro || 'TODO_EL_REPOSITORIO')
        return t.buscar(query, { ancestorNoteId: ancestro, limit })
      }
    },
    get_note_tree: {
      escribe: false,
      descripcion: 'Devuelve el arbol de notas bajo una nota, hasta cierta profundidad.',
      esquema: { note: { tipo: 'string' }, depth: { tipo: 'number' } },
      async ejecutar ({ note, depth = 2 }) {
        const id = note ? await resolver(note) : proyectoId
        if (!id) throw new SinProyecto()
        registrarLectura(id)
        return t.arbol(id, depth)
      }
    },

    // ---------------- ORGANIZACION (1) ----------------
    organize_note: {
      escribe: true,
      descripcion: 'Mueve o clona una nota dentro del proyecto. Origen y destino deben estar en el proyecto.',
      esquema: { note: { tipo: 'string', requerido: true }, newParent: { tipo: 'string', requerido: true }, modo: { tipo: 'string' } },
      async ejecutar ({ note, newParent, modo = 'mover' }) {
        const id = await exigirDentro(await resolver(note))
        const destino = await exigirDentro(await resolver(newParent))
        const nota = await t.obtenerNota(id)
        await t.crearRama(id, destino)
        if (modo === 'mover') {
          for (const branchId of nota.parentBranchIds || []) {
            if (!branchId.endsWith(`${destino}_${id}`)) await t.borrarRama(branchId).catch(() => {})
          }
        }
        return { noteId: id, nuevoPadre: destino, modo }
      }
    },

    // ---------------- ATRIBUTOS (3) ----------------
    get_attributes: {
      escribe: false,
      descripcion: 'Lista los atributos de una nota.',
      esquema: { note: { tipo: 'string', requerido: true } },
      async ejecutar ({ note }) {
        const id = await resolver(note)
        registrarLectura(id)
        return t.atributos(id)
      }
    },
    set_attribute: {
      escribe: true,
      descripcion: 'Fija una etiqueta en una nota del proyecto, sustituyendo la anterior si existia.',
      esquema: { note: { tipo: 'string', requerido: true }, name: { tipo: 'string', requerido: true }, value: { tipo: 'string' } },
      async ejecutar ({ note, name, value = '' }) {
        const id = await exigirDentro(await resolver(note))
        return t.fijarAtributo(id, name, value)
      }
    },
    delete_attribute: {
      escribe: true,
      descripcion: 'Borra un atributo de una nota del proyecto.',
      esquema: { note: { tipo: 'string', requerido: true }, name: { tipo: 'string', requerido: true } },
      async ejecutar ({ note, name }) {
        const id = await exigirDentro(await resolver(note))
        const borrados = []
        for (const a of await t.atributos(id)) {
          if (a.name === name) { await t.borrarAtributo(a.attributeId); borrados.push(a.attributeId) }
        }
        return { borrados }
      }
    },

    // ---------------- CALENDARIO (1) ----------------
    get_special_note: {
      escribe: false,
      descripcion: 'Nota de calendario: dia (AAAA-MM-DD), mes (AAAA-MM) o anio (AAAA). Solo lectura: viven fuera del proyecto. Las semanas no existen en esta version de Trilium.',
      esquema: { tipo: { tipo: 'string', requerido: true }, valor: { tipo: 'string', requerido: true } },
      async ejecutar ({ tipo, valor }) {
        const n = await t.notaEspecial(tipo, valor)
        registrarLectura(n.noteId)
        return { ...n, soloLectura: true }
      }
    },

    // ---------------- ADJUNTOS (4) ----------------
    list_attachments: {
      escribe: false,
      descripcion: 'Lista los adjuntos de una nota.',
      esquema: { note: { tipo: 'string', requerido: true } },
      async ejecutar ({ note }) {
        const id = await resolver(note)
        registrarLectura(id)
        return t.adjuntos(id)
      }
    },
    create_attachment: {
      escribe: true,
      descripcion: 'Adjunta un archivo a una nota del proyecto.',
      esquema: { note: { tipo: 'string', requerido: true }, title: { tipo: 'string', requerido: true }, content: { tipo: 'string' }, mime: { tipo: 'string' } },
      async ejecutar ({ note, title, content = '', mime = 'text/plain' }) {
        const id = await exigirDentro(await resolver(note))
        return t.crearAdjunto(id, { title, content, mime })
      }
    },
    write_attachment: {
      escribe: true,
      descripcion: 'Reemplaza el contenido de un adjunto de una nota del proyecto.',
      esquema: { attachmentId: { tipo: 'string', requerido: true }, content: { tipo: 'string', requerido: true } },
      async ejecutar ({ attachmentId, content }) {
        const a = await t.obtenerAdjunto(attachmentId)
        await exigirDentro(a.ownerId)
        await t.escribirAdjunto(attachmentId, content)
        return { attachmentId }
      }
    },
    delete_attachment: {
      escribe: true,
      descripcion: 'Borra un adjunto de una nota del proyecto.',
      esquema: { attachmentId: { tipo: 'string', requerido: true } },
      async ejecutar ({ attachmentId }) {
        const a = await t.obtenerAdjunto(attachmentId)
        await exigirDentro(a.ownerId)
        await t.borrarAdjunto(attachmentId)
        return { borrado: attachmentId }
      }
    },

    // ---------------- REVISIONES (2) ----------------
    get_revisions: {
      escribe: false,
      descripcion: 'Historial de revisiones de una nota: permite ver que cambio y recuperar versiones anteriores.',
      esquema: { note: { tipo: 'string', requerido: true } },
      async ejecutar ({ note }) {
        const id = await resolver(note)
        registrarLectura(id)
        return t.revisiones(id)
      }
    },
    create_revision: {
      escribe: true,
      descripcion: 'Congela una revision de una nota del proyecto antes de modificarla.',
      esquema: { note: { tipo: 'string', requerido: true } },
      async ejecutar ({ note }) {
        const id = await exigirDentro(await resolver(note))
        await t.crearRevision(id)
        return { revisionCreada: id }
      }
    },

    // ---------------- SISTEMA (1) ----------------
    app_info: {
      escribe: false,
      descripcion: 'Version y estado del servidor Trilium. Solo lectura: la creacion de respaldos es una tarea de administracion y no se expone al agente.',
      esquema: {},
      async ejecutar () { return t.infoApp() }
    }
  }
}

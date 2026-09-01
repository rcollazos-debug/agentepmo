import { RepositorioProyecto } from './project-store.js'
import { politicaDe } from './reconcile.js'

/**
 * Roles del proyecto.
 *
 * El titular arbitra la linea base y valida; los colaboradores aportan. No es
 * una jerarquia: es que cambiar el cronograma o el presupuesto sin acuerdo es
 * riesgo contractual, y alguien tiene que responder por ello.
 */

export const TITULAR = 'titular'
export const COLABORADOR = 'colaborador'

const etiqueta = (atributos, nombre) =>
  atributos.find((a) => a.type === 'label' && a.name === nombre)?.value ?? null

export async function resolverRol ({ trilium, proyectoId, correo }) {
  const atributos = await trilium.atributos(proyectoId)
  const titular = etiqueta(atributos, 'pmTitular')
  return {
    titular,
    rol: !titular || titular === correo ? TITULAR : COLABORADOR,
    esTitular: !titular || titular === correo
  }
}

/**
 * Por donde entra un aporte segun su naturaleza. Un hecho no ensucia nada y
 * debe estar disponible al instante; la linea base espera al titular.
 */
export function viaDeAporte ({ direccion, esTitular }) {
  if (esTitular) return 'directo'
  const politica = politicaDe(direccion)
  if (politica === 'unir' || politica === 'mas-reciente') return 'directo-sin-validar'
  return 'propuesta'
}

// --- marcado de aportes ---

export async function marcarSinValidar (trilium, noteId, correo) {
  await trilium.ponerAtributo(noteId, 'sinValidar', correo)
  await trilium.fijarAtributo(noteId, 'aportadoPor', correo)
  await trilium.fijarAtributo(noteId, 'aportadoEl', new Date().toISOString().slice(0, 10))
}

/** Valida un aporte conservando quien lo hizo: corregir no borra la autoria. */
export async function validarAporte (trilium, noteId, correo) {
  for (const a of await trilium.atributos(noteId)) {
    if (a.type === 'label' && a.name === 'sinValidar') await trilium.borrarAtributo(a.attributeId)
  }
  await trilium.fijarAtributo(noteId, 'validadoPor', correo)
  await trilium.fijarAtributo(noteId, 'validadoEl', new Date().toISOString().slice(0, 10))
}

/**
 * Una propuesta es una nota hija de aquella a la que afecta: queda al lado del
 * dato que quiere cambiar, visible, sin tocar la linea base.
 */
export async function crearPropuesta (trilium, notaDestinoId, { correo, contenido, direccion }) {
  const fecha = new Date().toISOString().slice(0, 10)
  const titulo = `propuesta ${fecha} - ${correo}`
  const nota = await trilium.crearNotaDocumento(notaDestinoId, titulo, contenido)
  await trilium.ponerAtributo(nota.noteId, 'propuestaPendiente', correo)
  await trilium.fijarAtributo(nota.noteId, 'proponeSobre', direccion)
  await trilium.fijarAtributo(nota.noteId, 'propuestaEl', fecha)
  return nota
}

/** Lo que el titular tiene sin revisar, tanto aportes como propuestas. */
export async function pendientes ({ trilium, proyectoId }) {
  const repo = new RepositorioProyecto(trilium)
  const indice = await repo.indice(proyectoId)
  const aportes = []
  const propuestas = []

  for (const [direccion, meta] of indice) {
    const atributos = await trilium.atributos(meta.noteId)
    const sinValidar = atributos.filter((a) => a.type === 'label' && a.name === 'sinValidar')
    if (sinValidar.length) {
      aportes.push({
        direccion,
        noteId: meta.noteId,
        de: [...new Set(sinValidar.map((a) => a.value))],
        desde: etiqueta(atributos, 'aportadoEl')
      })
    }
    const nota = await trilium.obtenerNota(meta.noteId)
    for (const hijoId of nota.childNoteIds || []) {
      const attrs = await trilium.atributos(hijoId)
      const p = attrs.find((a) => a.type === 'label' && a.name === 'propuestaPendiente')
      if (p) {
        propuestas.push({
          direccion,
          noteId: hijoId,
          de: p.value,
          fecha: etiqueta(attrs, 'propuestaEl')
        })
      }
    }
  }
  return { aportes, propuestas }
}

// --- titularidad ---

export async function cederTitularidad ({ trilium, proyectoId, de, a }) {
  await trilium.fijarAtributo(proyectoId, 'pmTitular', a)
  await trilium.fijarAtributo(proyectoId, 'pmTitularAnterior', de)
  await trilium.fijarAtributo(proyectoId, 'titularidadDesde', new Date().toISOString().slice(0, 10))
  return { de, a, modo: 'cedida' }
}

/**
 * Tomarla sin cesion previa es legitimo — un titular ausente no puede bloquear
 * el proyecto — pero nunca en silencio: queda marcado de forma destacada.
 */
export async function tomarTitularidad ({ trilium, proyectoId, quien, anterior }) {
  await trilium.fijarAtributo(proyectoId, 'pmTitular', quien)
  await trilium.fijarAtributo(proyectoId, 'pmTitularAnterior', anterior || 'sin titular')
  await trilium.fijarAtributo(proyectoId, 'titularidadDesde', new Date().toISOString().slice(0, 10))
  await trilium.fijarAtributo(proyectoId, 'titularidadTomadaSinCesion', quien)
  return { de: anterior, a: quien, modo: 'tomada' }
}

/** Entrada para memory/historial.md, que es donde vive la memoria del proyecto. */
export function entradaHistorial ({ skill, texto }) {
  const ahora = new Date().toISOString().slice(0, 16).replace('T', ' ')
  return `[${ahora}] ${skill} — ${texto}`
}

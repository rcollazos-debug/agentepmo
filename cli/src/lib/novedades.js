import { RepositorioProyecto } from './project-store.js'
import { leerVinculo } from './project-link.js'

const etiqueta = (atributos, nombre) =>
  atributos.find((a) => a.type === 'label' && a.name === nombre)?.value ?? null

/**
 * Qué escribieron otros PM desde tu última sincronización.
 *
 * Es la señal que dispara la revisión de consistencia: no tiene sentido
 * auditar un proyecto que solo has tocado tú, y sí lo tiene en cuanto otra
 * persona ha metido mano.
 */
export async function escritoPorOtros ({ trilium, proyectoId, correo, dir = process.cwd() }) {
  const repo = new RepositorioProyecto(trilium)
  const indice = await repo.indice(proyectoId)
  const sync = leerVinculo(dir)?.sync ?? {}
  const novedades = []

  for (const [direccion, meta] of indice) {
    const base = sync[direccion]
    // Sin base no se puede saber si es nuevo para ti; con base, un blobId
    // distinto significa que alguien escribio despues de tu ultima visita.
    if (base && meta.blobId === base.blobId) continue

    const atributos = await trilium.atributos(meta.noteId)
    const autor = etiqueta(atributos, 'ultimaEdicion') || etiqueta(atributos, 'creadoPor')
    if (!autor || autor === correo) continue

    novedades.push({
      direccion,
      noteId: meta.noteId,
      autor,
      cuando: etiqueta(atributos, 'ultimaEdicionEl') || meta.utcDateModified?.slice(0, 10),
      sinValidar: atributos.some((a) => a.type === 'label' && a.name === 'sinValidar')
    })
  }
  return novedades
}

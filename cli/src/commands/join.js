import path from 'node:path'
import { PROJECT_DIRS, PROJECT_MARKER } from '../lib/paths.js'
import { existe, asegurarDir, enParalelo } from '../lib/fsx.js'
import { Trilium } from '../lib/trilium.js'
import { RepositorioProyecto } from '../lib/project-store.js'
import { escribirVinculo, escribirLocal, marcarSincronizado, estaVinculado, leerVinculo } from '../lib/project-link.js'
import { versionInstalada } from '../lib/manifest.js'
import { generarConfigProyecto } from '../lib/config.js'
import { titulo, paso, ok, nota, aviso, linea, preguntar, ErrorDeUsuario } from '../lib/ui.js'

function valorDe (args, bandera) {
  const i = args.indexOf(bandera)
  return i >= 0 && args[i + 1] && !args[i + 1].startsWith('--') ? args[i + 1] : null
}

/**
 * Vincula una carpeta local a un proyecto que ya existe en Trilium y descarga
 * su contenido. Es como se suma un colaborador al proyecto de otro PM.
 */
export default async function join (args) {
  const dir = process.cwd()

  if (estaVinculado(dir)) {
    const v = leerVinculo(dir)
    throw new ErrorDeUsuario(
      `Esta carpeta ya esta vinculada al proyecto "${v.project_id}".`,
      'Usa una carpeta vacia, o abre esta con `opencode`.'
    )
  }
  if (existe(path.join(dir, PROJECT_MARKER))) {
    throw new ErrorDeUsuario(
      'Esta carpeta ya es un proyecto de Vorkan-PM sin vincular.',
      'Usa una carpeta vacia para unirte a un proyecto de Trilium.'
    )
  }

  const t = new Trilium()
  const repo = new RepositorioProyecto(t)

  titulo('Unirse a un proyecto existente')

  let proyectoId = valorDe(args, '--note-id')
  if (!proyectoId) {
    const busqueda = valorDe(args, '--buscar') || args.find((a) => !a.startsWith('--')) ||
      await preguntar('Nombre del proyecto a buscar')
    paso(`Buscando "${busqueda}" en el repositorio`)
    const encontrados = await t.buscar(busqueda, { limit: 15 })
    const candidatos = []
    for (const r of encontrados) {
      const atributos = await t.atributos(r.noteId)
      if (atributos.some((a) => a.type === 'label' && a.name === 'projectId')) candidatos.push({ r, atributos })
    }
    if (!candidatos.length) {
      throw new ErrorDeUsuario(
        `No encontre ningun proyecto que coincida con "${busqueda}".`,
        'Comprueba el nombre, o pide al PM titular el identificador de la nota del proyecto y usa: vorkanpm join --note-id <id>'
      )
    }
    if (candidatos.length === 1) {
      proyectoId = candidatos[0].r.noteId
      ok(`Encontrado: ${candidatos[0].r.title}`)
    } else {
      linea()
      candidatos.forEach((c, i) => console.log(`   ${i + 1}. ${c.r.title}`))
      const elegido = await preguntar('¿Cual? (numero)', { porDefecto: '1' })
      proyectoId = candidatos[Number(elegido) - 1]?.r.noteId
      if (!proyectoId) throw new ErrorDeUsuario('Seleccion no valida.')
    }
  }

  const proyecto = await t.obtenerNota(proyectoId).catch(() => null)
  if (!proyecto) throw new ErrorDeUsuario(`No existe ninguna nota con el identificador ${proyectoId}.`)

  const atributos = await t.atributos(proyectoId)
  const etiqueta = (n) => atributos.find((a) => a.type === 'label' && a.name === n)?.value || null
  const projectId = etiqueta('projectId') || proyecto.title.toLowerCase().replace(/[^a-z0-9]+/g, '-')
  const titular = etiqueta('pmTitular')

  paso('Descargando el proyecto')
  for (const d of PROJECT_DIRS) asegurarDir(path.join(dir, d))

  const repo2 = new RepositorioProyecto(t)
  const indice = await repo2.indice(proyectoId)
  const entradas = [...indice.entries()]
  const descargados = await enParalelo(entradas, async ([direccion, meta]) => {
    const contenido = await t.leerContenido(meta.noteId)
    escribirLocal(dir, direccion, contenido)
    return { direccion, contenido, blobId: meta.blobId }
  })
  ok(`${descargados.length} archivos descargados`)

  escribirVinculo(dir, {
    project_id: projectId,
    trilium_note_id: proyectoId,
    pmTitular: titular,
    creadoEl: new Date().toISOString().slice(0, 10),
    versionAgente: versionInstalada(),
    sync: {}
  })
  // Registrar la base de sincronizacion de lo recien descargado.
  for (const d of descargados) {
    marcarSincronizado(dir, d.direccion, { contenido: d.contenido, blobId: d.blobId })
  }
  ok(`${PROJECT_MARKER} escrito y vinculado`)

  generarConfigProyecto(dir)

  linea()
  titulo(`Te uniste a "${proyecto.title}"`)
  if (titular) nota(`PM titular: ${titular}. Tus aportes quedaran marcados para que los valide.`)
  else aviso('El proyecto no declara PM titular.')
  linea()
  console.log('  Para trabajar en el:')
  nota('opencode')
  linea()
}

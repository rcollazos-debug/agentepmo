import { RepositorioProyecto } from './project-store.js'
import { ErrorTrilium } from './trilium.js'
import { enParalelo } from './fsx.js'
import { marcarSinValidar, crearPropuesta } from './roles.js'
import { reconciliar, politicaDe, partirEnEntradas } from './reconcile.js'
import {
  archivosLocales, leerLocal, escribirLocal, baseDe, situacion,
  marcarSincronizado, modificadoLocal, hashTexto, leerBase
} from './project-link.js'

/**
 * Como se le cuenta al PM lo que va a publicar. El resumen habla del proyecto,
 * no de archivos: un PM no tiene por que saber que existe `memory/compromisos.md`.
 */
const ETIQUETAS = {
  'memory/historial': 'el historial',
  'memory/compromisos': 'los compromisos',
  'memory/decisiones': 'las decisiones',
  'memory/correo': 'las comunicaciones con el cliente',
  'memory/emails': 'el indice de correos',
  'memory/riesgo': 'resumen de riesgos',
  'memory/lecciones': 'las lecciones aprendidas',
  'memory/actasdeentrega': 'las actas de entrega',
  'metrics/dashboard': 'el tablero de indicadores',
  'metrics/financiero': 'el control financiero',
  'metrics/cronograma': 'el avance del cronograma',
  'metrics/calidad': 'los indicadores de calidad',
  'metrics/capacidad': 'la capacidad del equipo',
  'metrics/delivery': 'la velocidad de entrega',
  'data/cronograma': 'el cronograma comprometido',
  'data/presupuesto': 'el presupuesto',
  'data/backlog': 'el backlog',
  'data/sprint-actual': 'el sprint actual',
  'data/cambios': 'los cambios (CR)',
  'data/dependencias': 'las dependencias externas',
  'data/proveedores': 'los proveedores',
  'data/acta-inicio': 'el acta de inicio',
  'data/alcance-detallado': 'el alcance detallado',
  'risks/risk-register': 'el registro de riesgos',
  'risks/technical-risks': 'los riesgos tecnicos',
  'context/proyecto-base': 'la ficha del proyecto',
  'context/stakeholders': 'los interesados',
  'context/vortexbird': 'las condiciones comerciales',
  'context/restricciones': 'las restricciones',
  'scope/alcancedetallado': 'el alcance',
  'scope/exclusionesalcance': 'las exclusiones del alcance'
}

const etiqueta = (d) => ETIQUETAS[d] || d.split('/')[1].replace(/-/g, ' ')

/** Cuenta entradas o filas nuevas, para que el resumen diga cuanto y no solo que. */
function cuantificar (direccion, antes, ahora) {
  if (politicaDe(direccion) === 'unir') {
    const a = partirEnEntradas(antes).bloques.length
    const b = partirEnEntradas(ahora).bloques.length
    return b - a
  }
  if (politicaDe(direccion) === 'fusionar-filas') {
    const filas = (t) => (t || '').split('\n').filter((l) => /^\s*\|/.test(l) && !/^\s*\|[\s:|-]+\|\s*$/.test(l)).length
    return filas(ahora) - filas(antes)
  }
  return null
}

/**
 * Compara la carpeta local con el proyecto en Trilium y decide que hacer con
 * cada direccion. No escribe nada: planificar y aplicar estan separados a
 * proposito, porque entre medias tiene que decidir una persona.
 */
export async function planificar ({ dir, proyectoId, trilium }) {
  const repo = new RepositorioProyecto(trilium)
  const plan = []
  const indice = await repo.indice(proyectoId)

  for (const direccion of archivosLocales(dir)) {
    const local = leerLocal(dir, direccion)
    const base = baseDe(dir, direccion)

    const nota = indice.get(direccion) ?? null
    let remoto = null
    if (nota) {
      // Solo se descarga el contenido de lo que pudo cambiar: comparar el
      // blobId del indice evita traerse las 47 notas en cada publicacion.
      const sinCambioRemoto = base && nota.blobId === base.blobId
      const sinCambioLocal = base && hashTexto(local) === base.hashLocal
      if (sinCambioRemoto && sinCambioLocal) continue
      remoto = { contenido: await trilium.leerContenido(nota.noteId), blobId: nota.blobId, modificado: nota.utcDateModified }
    }

    const estado = situacion({ local, remoto, base })
    if (estado === 'iguales' || estado === 'ninguno') continue

    if (estado === 'solo-local' || estado === 'cambio-local') {
      plan.push({ direccion, accion: 'publicar', local, noteId: nota?.noteId ?? null, cuanto: cuantificar(direccion, remoto?.contenido ?? '', local) })
      continue
    }
    if (estado === 'solo-remoto' || estado === 'cambio-remoto') {
      plan.push({ direccion, accion: 'descargar', remoto, noteId: nota.noteId, cuanto: cuantificar(direccion, local ?? '', remoto.contenido) })
      continue
    }
    if (estado === 'ambos') {
      const r = reconciliar({
        direccion,
        local,
        remoto: remoto.contenido,
        remotoModificado: remoto.modificado,
        // La fecha del archivo, no la de la ultima sincronizacion: usar esta
        // ultima hacia ganar siempre al remoto y perdia la medicion mas nueva.
        localModificado: modificadoLocal(dir, direccion),
        base: leerBase(dir, direccion)
      })
      plan.push({
        direccion,
        accion: r.accion === 'parar' ? 'decidir' : 'reconciliar',
        resultado: r.contenido,
        motivo: r.motivo,
        politica: r.accion,
        corregidas: r.corregidas ?? [],
        noteId: remoto ? nota.noteId : null,
        local,
        remoto,
        cuanto: cuantificar(direccion, local, r.contenido ?? local)
      })
      continue
    }
    plan.push({ direccion, accion: 'decidir', motivo: `el archivo fue borrado en un lado (${estado})`, local, remoto, noteId: nota?.noteId ?? null })
  }
  return plan
}

/** El resumen que ve el PM antes de aprobar. Nada de rutas ni de notas. */
export function resumirEnNegocio (plan, { primeraVez = false } = {}) {
  // En la primera publicacion sube el proyecto entero: enumerar los 47
  // elementos no informa, abruma. Se resume en una linea.
  if (primeraVez) {
    return {
      sube: [`el proyecto completo (${plan.length} elementos)`],
      baja: [],
      paran: [],
      vacio: plan.length === 0
    }
  }
  const sube = plan.filter((p) => p.accion === 'publicar' || p.accion === 'reconciliar')
  const baja = plan.filter((p) => p.accion === 'descargar')
  const paran = plan.filter((p) => p.accion === 'decidir')

  // Sin concordancia forzada: la etiqueta ya lleva su articulo, y anadir
  // "actualizado" produce cosas como "la ficha del proyecto actualizado".
  // La etiqueta lleva su articulo, asi que la cantidad va con un sustantivo
  // propio: "1 anotacion nueva en el historial", no "1 el historial".
  const frase = (p) => {
    const q = p.cuanto
    if (!q) return etiqueta(p.direccion)
    const pol = politicaDe(p.direccion)
    const unidad = pol === 'fusionar-filas'
      ? (Math.abs(q) === 1 ? 'fila nueva' : 'filas nuevas')
      : (Math.abs(q) === 1 ? 'anotacion nueva' : 'anotaciones nuevas')
    if (q > 0) return `${q} ${unidad} en ${etiqueta(p.direccion)}`
    return `${Math.abs(q)} elemento(s) menos en ${etiqueta(p.direccion)}`
  }

  const propuestas = sube.filter((p) => p.via === 'propuesta')
  const aportes = sube.filter((p) => p.via === 'directo-sin-validar')
  const directos = sube.filter((p) => !p.via || p.via === 'directo')

  return {
    sube: directos.map(frase),
    aportes: aportes.map(frase),
    propuestas: propuestas.map((p) => etiqueta(p.direccion)),
    baja: baja.map(frase),
    paran: paran.map((p) => ({ que: etiqueta(p.direccion), porque: p.motivo })),
    // Una entrada corregida desplaza a la anterior: conviene decirlo, aunque
    // la version antigua siga en las revisiones de Trilium.
    corregidas: plan.flatMap((p) => (p.corregidas ?? []).map((c) => ({ que: etiqueta(p.direccion), entrada: c }))),
    vacio: plan.length === 0
  }
}

/**
 * Aplica un plan ya aprobado. Las direcciones marcadas para decidir se
 * quedan como estan: nunca se resuelven solas.
 */
export async function aplicar ({ dir, proyectoId, trilium, plan, autor }) {
  const repo = new RepositorioProyecto(trilium)
  const hecho = { publicadas: [], descargadas: [], pendientes: [] }

  // Las carpetas se aseguran una vez, antes de repartir el trabajo: si cada
  // tarea las creara por su cuenta, seis en paralelo crearian duplicados.
  const carpetas = {}
  if (plan.some((p) => p.accion === 'publicar' || p.accion === 'reconciliar')) {
    Object.assign(carpetas, await repo.asegurarCarpetas(proyectoId))
  }

  const resultados = await enParalelo(plan, async (p) => {
    if (p.accion === 'decidir') return { tipo: 'pendiente', direccion: p.direccion }

    if (p.accion === 'descargar') {
      escribirLocal(dir, p.direccion, p.remoto.contenido)
      return { tipo: 'descargada', direccion: p.direccion, contenido: p.remoto.contenido, blobId: p.remoto.blobId }
    }

    const contenido = p.accion === 'reconciliar' ? p.resultado : p.local
    const [carpeta, titulo] = p.direccion.split('/')

    // Un colaborador no mueve la linea base: su cambio queda como propuesta
    // junto al dato que quiere cambiar, y decide el titular.
    if (p.via === 'propuesta') {
      const destino = p.noteId ?? (await repo.notaDeDireccion(proyectoId, p.direccion, { crear: true })).noteId
      await crearPropuesta(trilium, destino, { correo: autor, contenido, direccion: p.direccion })
      return { tipo: 'propuesta', direccion: p.direccion }
    }

    if (!p.noteId) {
      // Nota nueva: se crea con su contenido en una sola llamada y sin
      // revision previa, porque no hay nada anterior que conservar.
      const nueva = await trilium.crearNotaDocumento(carpetas[carpeta], titulo, contenido)
      if (autor) await repo.sellarAutoria(nueva.noteId, { creadoPor: autor, ultimaEdicion: autor })
      if (p.via === 'directo-sin-validar') await marcarSinValidar(trilium, nueva.noteId, autor)
      return { tipo: 'publicada', direccion: p.direccion, contenido, blobId: nueva.blobId }
    }

    // Comprobacion final contra escrituras ajenas: si la nota cambio entre
    // el plan y este momento, no se pisa.
    const ahora = await trilium.huella(p.noteId)
    const esperado = p.remoto?.blobId ?? baseDe(dir, p.direccion)?.blobId
    if (esperado && ahora.blobId !== esperado) return { tipo: 'pendiente', direccion: p.direccion }

    await trilium.crearRevision(p.noteId).catch(() => {})
    await trilium.escribirContenido(p.noteId, contenido)
    if (autor) await repo.sellarAutoria(p.noteId, { ultimaEdicion: autor })
    if (p.via === 'directo-sin-validar') await marcarSinValidar(trilium, p.noteId, autor)
    if (p.accion === 'reconciliar') escribirLocal(dir, p.direccion, contenido)
    const huella = await trilium.huella(p.noteId)
    return { tipo: 'publicada', direccion: p.direccion, contenido, blobId: huella.blobId }
  })

  // El estado de sincronizacion se escribe al final, en serie: son escrituras
  // sobre el mismo archivo y en paralelo se pisarian.
  hecho.propuestas = []
  for (const r of resultados) {
    if (r.tipo === 'pendiente') { hecho.pendientes.push(r.direccion); continue }
    if (r.tipo === 'propuesta') { hecho.propuestas.push(r.direccion); continue }
    marcarSincronizado(dir, r.direccion, { contenido: r.contenido, blobId: r.blobId })
    if (r.tipo === 'publicada') hecho.publicadas.push(r.direccion)
    else hecho.descargadas.push(r.direccion)
  }
  return hecho
}

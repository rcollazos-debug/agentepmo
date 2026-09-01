/**
 * Politica de reconciliacion por naturaleza de la carpeta.
 *
 * La taxonomia de CONVENCIONES.md no es documentacion: es la politica. Una
 * carpeta append-only se une, una de mediciones se sustituye por la mas
 * reciente, una tabla se fusiona por identificador, y la linea base no se
 * resuelve sola porque cambiarla sin acuerdo es riesgo contractual.
 */

export const POLITICA = {
  memory: 'unir',
  metrics: 'mas-reciente',
  risks: 'fusionar-filas',
  scope: 'fusionar-filas',
  data: 'parar',
  context: 'parar'
}

export const politicaDe = (direccion) => POLITICA[String(direccion).split('/')[0]] || 'parar'

// --- append-only: unir entradas ---

const RE_ENTRADA = /^\[(\d{4}-\d{2}-\d{2})[ T](\d{2}:\d{2})\]\s*([A-ZÁÉÍÓÚÑ_]+)?/

/** Parte un historial en bloques: una entrada y sus lineas de detalle. */
export function partirEnEntradas (texto) {
  const lineas = (texto || '').split('\n')
  const cabecera = []
  const bloques = []
  let actual = null
  for (const linea of lineas) {
    if (RE_ENTRADA.test(linea)) {
      if (actual) bloques.push(actual)
      const m = linea.match(RE_ENTRADA)
      actual = {
        marca: m.slice(1, 3).join(' '),
        // Fecha, hora y skill identifican el EVENTO. Dos bloques con la misma
        // clave son el mismo hecho: si su texto difiere, uno es una correccion
        // del otro, no una entrada nueva.
        clave: `${m[1]} ${m[2]} ${m[3] ?? ''}`,
        lineas: [linea]
      }
    } else if (actual) {
      actual.lineas.push(linea)
    } else {
      cabecera.push(linea)
    }
  }
  if (actual) bloques.push(actual)
  return { cabecera, bloques }
}

/**
 * Une dos versiones de un archivo append-only sin perder ni duplicar entradas.
 *
 * Una entrada corregida conserva su fecha y su skill, asi que por texto parece
 * nueva y acabarian conviviendo las dos versiones. Se resuelve por clave de
 * evento: gana el lado indicado en `preferir`, y la version desplazada sigue
 * recuperable en las revisiones que Trilium guarda antes de cada escritura.
 */
export function unirEntradas (local, remoto, { preferir = 'local', base = null } = {}) {
  const mapa = (texto) => {
    const m = new Map()
    for (const b of partirEnEntradas(texto).bloques) m.set(b.clave, { marca: b.marca, texto: b.lineas.join('\n').trimEnd() })
    return m
  }
  const aL = mapa(local)
  const aR = mapa(remoto)
  const aB = base === null ? null : mapa(base)

  const porClave = new Map()
  const corregidas = []
  for (const clave of new Set([...aL.keys(), ...aR.keys()])) {
    const l = aL.get(clave)
    const r = aR.get(clave)
    if (!r) { porClave.set(clave, l); continue }
    if (!l) { porClave.set(clave, r); continue }
    if (l.texto === r.texto) { porClave.set(clave, l); continue }

    // Los dos lados tienen la entrada con texto distinto: gana quien la
    // cambio respecto a la base. Publicar mas tarde no es haber corregido.
    const enBase = aB?.get(clave)?.texto
    let gana
    if (enBase !== undefined) {
      const cambioLocal = l.texto !== enBase
      const cambioRemoto = r.texto !== enBase
      if (cambioLocal && !cambioRemoto) gana = l
      else if (cambioRemoto && !cambioLocal) gana = r
    }
    if (!gana) gana = preferir === 'remoto' ? r : l
    porClave.set(clave, gana)
    corregidas.push(clave)
  }
  const todas = [...porClave.values()]
  todas.sort((x, y) => (x.marca < y.marca ? -1 : x.marca > y.marca ? 1 : 0))
  unirEntradas.ultimasCorregidas = [...new Set(corregidas)]
  const cabL = partirEnEntradas(local).cabecera
  const cabR = partirEnEntradas(remoto).cabecera
  const cabecera = (cabL.join('\n').trim() ? cabL : cabR).join('\n').trimEnd()
  const cuerpo = todas.map((t) => t.texto).join('\n\n')
  return [cabecera, cuerpo].filter(Boolean).join('\n\n') + '\n'
}

// --- tablas con identificador de fila ---

const esFilaTabla = (l) => /^\s*\|/.test(l)
const esSeparador = (l) => /^\s*\|[\s:|-]+\|\s*$/.test(l)
const idDeFila = (l) => (l.split('|')[1] || '').trim()

/**
 * Fusiona tablas markdown por el identificador de la primera columna.
 * Una fila que existe en los dos lados y difiere se queda con la version
 * local y se anota como divergencia, para que el titular decida.
 */
export function fusionarFilas (local, remoto) {
  const filas = new Map()
  const divergencias = []
  let plantilla = null

  const absorber = (texto, origen) => {
    const lineas = (texto || '').split('\n')
    const bloque = []
    for (const l of lineas) {
      if (esFilaTabla(l)) bloque.push(l)
    }
    if (!plantilla && bloque.length) plantilla = { antes: lineas.slice(0, lineas.indexOf(bloque[0])) }
    for (const fila of bloque) {
      if (esSeparador(fila)) continue
      const id = idDeFila(fila)
      if (!id) continue
      if (!filas.has(id)) filas.set(id, { fila, origen })
      else if (filas.get(id).fila.trim() !== fila.trim() && filas.get(id).origen !== origen) {
        divergencias.push(id)
      }
    }
  }
  absorber(local, 'local')
  absorber(remoto, 'remoto')

  const lineas = (local || remoto || '').split('\n')
  const encabezados = lineas.filter((l) => esFilaTabla(l)).slice(0, 2)
  const cuerpo = [...filas.values()].map((f) => f.fila)
  const antes = lineas.slice(0, lineas.findIndex(esFilaTabla)).join('\n').trimEnd()
  const tabla = [...encabezados, ...cuerpo.filter((f) => !encabezados.includes(f))].join('\n')
  return { texto: [antes, tabla].filter(Boolean).join('\n\n') + '\n', divergencias }
}

/**
 * Resuelve una direccion segun su politica.
 * Devuelve el contenido resultante, o una parada que exige decision humana.
 */
export function reconciliar ({ direccion, local, remoto, remotoModificado, localModificado, base = null }) {
  const politica = politicaDe(direccion)

  if (politica === 'unir') {
    // Ante una correccion de la misma entrada, gana el lado modificado mas
    // tarde: es el mismo criterio que en las mediciones.
    const preferir = remotoModificado && localModificado
      ? (new Date(remotoModificado) > new Date(localModificado) ? 'remoto' : 'local')
      : 'local'
    const contenido = unirEntradas(local, remoto, { preferir, base })
    const corregidas = unirEntradas.ultimasCorregidas ?? []
    return { accion: 'unir', contenido, corregidas }
  }

  if (politica === 'mas-reciente') {
    const ganaRemoto = remotoModificado && localModificado
      ? new Date(remotoModificado) > new Date(localModificado)
      : Boolean(remotoModificado)
    return { accion: ganaRemoto ? 'gana-remoto' : 'gana-local', contenido: ganaRemoto ? remoto : local }
  }

  if (politica === 'fusionar-filas') {
    const { texto, divergencias } = fusionarFilas(local, remoto)
    return divergencias.length
      ? { accion: 'parar', motivo: `filas divergentes: ${divergencias.join(', ')}`, contenido: texto }
      : { accion: 'fusionar', contenido: texto }
  }

  return {
    accion: 'parar',
    motivo: 'linea base: cambiarla sin acuerdo formal es riesgo contractual',
    contenido: local
  }
}

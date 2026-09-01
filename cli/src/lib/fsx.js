import fs from 'node:fs'
import path from 'node:path'

export const existe = (p) => fs.existsSync(p)

export function asegurarDir (dir) {
  fs.mkdirSync(dir, { recursive: true })
}

/** Extensiones cuyo contenido se procesa como texto al instalar. */
const TEXTO = new Set(['.md', '.json', '.txt', '.py', '.yaml', '.yml', '.env'])

/**
 * Copia un arbol sustituyendo el marcador {{AGENT_HOME}} por la ruta real.
 * Los binarios (imagenes) se copian sin tocar.
 */
export function copiarArbol (origen, destino, { agentHome } = {}) {
  asegurarDir(destino)
  let archivos = 0
  for (const entrada of fs.readdirSync(origen, { withFileTypes: true })) {
    const desde = path.join(origen, entrada.name)
    const hasta = path.join(destino, entrada.name)
    if (entrada.isDirectory()) {
      archivos += copiarArbol(desde, hasta, { agentHome })
    } else {
      if (agentHome && TEXTO.has(path.extname(entrada.name).toLowerCase())) {
        const texto = fs.readFileSync(desde, 'utf8').split('{{AGENT_HOME}}').join(agentHome)
        fs.writeFileSync(hasta, texto)
      } else {
        fs.copyFileSync(desde, hasta)
      }
      archivos++
    }
  }
  return archivos
}

export function borrarDir (dir) {
  fs.rmSync(dir, { recursive: true, force: true })
}

export function leerJson (archivo, porDefecto = null) {
  try {
    return JSON.parse(fs.readFileSync(archivo, 'utf8'))
  } catch {
    return porDefecto
  }
}

export function escribirJson (archivo, datos) {
  asegurarDir(path.dirname(archivo))
  fs.writeFileSync(archivo, JSON.stringify(datos, null, 2) + '\n')
}

export function copiarArchivo (origen, destino) {
  asegurarDir(path.dirname(destino))
  fs.copyFileSync(origen, destino)
}

/**
 * Ejecuta tareas con un limite de concurrencia. Contra un servidor remoto, la
 * diferencia entre secuencial y seis en paralelo es la que hay entre noventa
 * segundos y quince.
 */
export async function enParalelo (elementos, tarea, limite = 6) {
  const salida = new Array(elementos.length)
  let siguiente = 0
  const trabajador = async () => {
    while (siguiente < elementos.length) {
      const i = siguiente++
      salida[i] = await tarea(elementos[i], i)
    }
  }
  await Promise.all(Array.from({ length: Math.min(limite, elementos.length) }, trabajador))
  return salida
}

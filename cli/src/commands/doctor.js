import path from 'node:path'
import { agentHome, globalConfigFile, PROJECT_FILE } from '../lib/paths.js'
import { configProyectoAlDia, generarConfigProyecto } from '../lib/config.js'
import { existe } from '../lib/fsx.js'
import { comprobarPrerrequisitos } from '../lib/prereq.js'
import { cuerpoInstalado } from '../lib/install.js'
import { estadoCredenciales } from '../lib/credentials.js'
import { versionInstalada, archivosModificados, leerMarcaProyecto } from '../lib/manifest.js'
import { titulo, ok, aviso, error, nota, linea } from '../lib/ui.js'

export default async function doctor () {
  const bloqueantes = []
  const degradaciones = []

  titulo('Revision de la instalacion')

  for (const c of comprobarPrerrequisitos()) {
    if (c.ok) ok(`${c.nombre} — ${c.detalle}`)
    else { error(`${c.nombre} — ${c.detalle}`); bloqueantes.push(c) }
  }

  const version = versionInstalada()
  if (cuerpoInstalado() && version) ok(`Agente ${version} instalado en ${agentHome()}`)
  else {
    error('El agente no esta instalado donde opencode lo busca')
    bloqueantes.push({ nombre: 'agente', remedio: 'Ejecuta: vorkanpm setup' })
  }

  if (existe(globalConfigFile())) ok('Configuracion global presente')
  else {
    error('Falta la configuracion global de opencode')
    bloqueantes.push({ nombre: 'configuracion', remedio: 'Ejecuta: vorkanpm setup' })
  }

  linea()
  titulo('Integraciones')
  for (const c of estadoCredenciales()) {
    const obligatoria = c.servicio === 'Gmail'
    if (c.instalada && c.autorizada) ok(`${c.servicio} — conectado`)
    else if (obligatoria) {
      error(`${c.servicio} — sin conectar (necesario para identificarte)`)
      bloqueantes.push({ nombre: c.servicio, remedio: 'Ejecuta: vorkanpm mcp gmail --auth' })
    } else {
      aviso(`${c.servicio} — sin conectar`)
      degradaciones.push(c.servicio)
    }
  }

  const sucios = archivosModificados()
  if (sucios.length) {
    linea()
    aviso(`${sucios.length} archivo(s) del agente instalado fueron modificados a mano`)
    for (const s of sucios.slice(0, 5)) nota(`${s.archivo} (${s.motivo})`)
    nota('La proxima actualizacion los sobrescribira: el agente instalado es de solo lectura.')
  }

  const marca = leerMarcaProyecto()
  if (marca) {
    linea()
    titulo('Este proyecto')
    nota(`Identificador: ${marca.project_id}`)
    if (!existe(path.join(process.cwd(), PROJECT_FILE))) {
      error(`Falta ${PROJECT_FILE}: el agente no podra identificar el proyecto`)
      bloqueantes.push({ nombre: PROJECT_FILE, remedio: 'Restaura el archivo o vuelve a crear el proyecto' })
    }
    if (!configProyectoAlDia(process.cwd())) {
      // Se regenera sin preguntar: es un archivo generado, no del usuario.
      generarConfigProyecto(process.cwd())
      ok('Configuracion del proyecto regenerada: al abrir `opencode` hablaras con Vorkan-PM')
    } else ok('Vorkan-PM es el agente de esta carpeta')

    if (marca.versionAgente && version && marca.versionAgente !== version) {
      aviso(`Creado con la version ${marca.versionAgente}; ahora tienes la ${version}`)
      nota('No requiere ninguna accion: el agente instalado es el que manda.')
    } else if (version) ok(`Alineado con la version ${version}`)
  }

  linea()
  if (bloqueantes.length === 0) {
    titulo('Todo en orden')
    if (degradaciones.length) {
      nota(`Sin conectar (opcional): ${degradaciones.join(', ')}. El agente es utilizable.`)
    }
    linea()
    return
  }

  titulo('Hay que resolver esto')
  for (const b of bloqueantes) nota(`${b.nombre} — ${b.remedio || 'revisa el mensaje anterior'}`)
  linea()
  process.exitCode = 1
}

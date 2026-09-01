import fs from 'node:fs'
import path from 'node:path'
import { PROJECT_DIRS, PROJECT_FILE, PROJECT_MARKER, agentHome } from '../lib/paths.js'
import { existe, copiarArbol, asegurarDir } from '../lib/fsx.js'
import { escribirMarcaProyecto, versionInstalada } from '../lib/manifest.js'
import { generarConfigProyecto } from '../lib/config.js'
import { cuerpoInstalado } from '../lib/install.js'
import { titulo, paso, ok, nota, linea, preguntar, ErrorDeUsuario } from '../lib/ui.js'

const ID_VALIDO = /^[a-z0-9-]+$/

function valorDe (args, bandera) {
  const i = args.indexOf(bandera)
  return i >= 0 && args[i + 1] && !args[i + 1].startsWith('--') ? args[i + 1] : null
}

export default async function init (args) {
  const dir = process.cwd()

  if (!cuerpoInstalado()) {
    throw new ErrorDeUsuario(
      'El agente no esta instalado en este equipo.',
      'Ejecuta primero: vorkanpm setup'
    )
  }

  // Nunca sobrescribir datos.
  if (existe(path.join(dir, PROJECT_MARKER))) {
    throw new ErrorDeUsuario(
      'Esta carpeta ya es un proyecto de Vorkan-PM.',
      'Abrelo con `opencode`, o crea el proyecto nuevo en otra carpeta.'
    )
  }
  const chocan = [PROJECT_FILE, 'opencode.json', ...PROJECT_DIRS].filter((f) => existe(path.join(dir, f)))
  if (chocan.length) {
    throw new ErrorDeUsuario(
      `La carpeta ya contiene: ${chocan.join(', ')}.`,
      'Usa una carpeta vacia para no sobrescribir nada.'
    )
  }

  titulo('Nuevo proyecto de Vorkan-PM')

  const posicional = args.find((a) => !a.startsWith('--'))
  let id = valorDe(args, '--id') || posicional || await preguntar('Identificador (minusculas, sin espacios)')
  id = String(id || '').trim()
  if (!ID_VALIDO.test(id)) {
    throw new ErrorDeUsuario(
      `Identificador no valido: "${id}".`,
      'Usa solo letras minusculas, numeros y guiones. Ejemplo: bancoomeva-wms'
    )
  }
  const nombre = valorDe(args, '--nombre') || await preguntar('Nombre completo del proyecto', { porDefecto: id })
  const cliente = valorDe(args, '--cliente') || await preguntar('Cliente', { porDefecto: 'Por definir' })
  const anioActual = String(new Date().getFullYear())
  const anioInicio = valorDe(args, '--anio') || await preguntar('Anio de inicio del proyecto', { porDefecto: anioActual })

  paso('Creando la estructura del proyecto')
  const plantilla = path.join(agentHome(), 'vorkan', 'project-template')
  let archivos = 0
  if (existe(plantilla)) {
    archivos = copiarArbol(plantilla, dir)
  } else {
    for (const d of PROJECT_DIRS) asegurarDir(path.join(dir, d))
  }
  for (const d of PROJECT_DIRS) asegurarDir(path.join(dir, d))
  ok(`${archivos} archivos base en ${PROJECT_DIRS.length} carpetas`)

  paso('Escribiendo la identificacion del proyecto')
  const hoy = new Date().toISOString().slice(0, 10)
  fs.writeFileSync(path.join(dir, PROJECT_FILE), [
    '# Proyecto',
    '',
    `project_id: ${id}`,
    `project_name: ${nombre}`,
    `client: ${cliente}`,
    `start_year: ${anioInicio}`,
    'pm: Por definir',
    'start_date: Por definir',
    'end_date: Por definir',
    'bac: Por definir',
    'status: VERDE',
    '',
    '> El proyecto es esta carpeta. El agente solo lee y escribe aqui dentro.',
    ''
  ].join('\n'))

  escribirMarcaProyecto(dir, {
    project_id: id,
    project_name: nombre,
    cliente,
    anioInicio,
    creadoEl: hoy,
    versionAgente: versionInstalada(),
    trilium_note_id: null,
    sync: {}
  })
  ok(`${PROJECT_FILE} y ${PROJECT_MARKER} escritos`)

  paso('Generando la configuracion de opencode')
  ok(path.basename(generarConfigProyecto(dir)))

  linea()
  titulo(`Proyecto "${nombre}" listo`)
  console.log('  Para trabajar en el:')
  nota('opencode')
  linea()
  nota('El agente te pedira los datos que faltan (PM, fechas, presupuesto) al abrirlo.')
  nota(`Cuando quieras subirlo al repositorio: vorkanpm publish (quedara en ${cliente} / ${anioInicio})`)
  linea()
}

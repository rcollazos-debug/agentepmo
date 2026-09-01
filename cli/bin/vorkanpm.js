#!/usr/bin/env node
import { error, nota, linea } from '../src/lib/ui.js'
import { ErrorDeUsuario } from '../src/lib/ui.js'
import { versionPaquete } from '../src/lib/manifest.js'

const AYUDA = `
  vorkanpm — instalador y gestor de Vorkan-PM

  Uso:
    vorkanpm setup [--credenciales <ruta>]   Deja este equipo listo (una vez por maquina)
    vorkanpm init [id]                       Convierte la carpeta actual en un proyecto
    vorkanpm join [nombre]                   Se une a un proyecto que ya existe en el repositorio
    vorkanpm publish                         Publica en el repositorio, tras aprobar el resumen
    vorkanpm estado [--json]                 Situacion del proyecto: rol, sin publicar, pendientes
    vorkanpm whoami                          Tu identidad verificada contra Google
    vorkanpm revisar [--validar]             Aportes de otros PM pendientes de validar
    vorkanpm titularidad [--ceder <correo>]  Consulta o cambia el PM titular
    vorkanpm update [--version <v>]          Actualiza el agente sin tocar tus proyectos
    vorkanpm doctor                          Revisa la instalacion y dice como arreglarla

  Opciones:
    --version, -v    Muestra la version
    --help,    -h    Muestra esta ayuda
`

const COMANDOS = {
  setup: () => import('../src/commands/setup.js'),
  init: () => import('../src/commands/init.js'),
  join: () => import('../src/commands/join.js'),
  publish: () => import('../src/commands/publish.js'),
  publicar: () => import('../src/commands/publish.js'),
  revisar: () => import('../src/commands/revisar.js'),
  estado: () => import('../src/commands/estado.js'),
  whoami: () => import('../src/commands/whoami.js'),
  titularidad: () => import('../src/commands/titularidad.js'),
  update: () => import('../src/commands/update.js'),
  doctor: () => import('../src/commands/doctor.js'),
  mcp: () => import('../src/commands/mcp.js')
}

const [, , comando, ...args] = process.argv

async function main () {
  if (!comando || comando === '--help' || comando === '-h' || comando === 'help') {
    console.log(AYUDA)
    return
  }
  if (comando === '--version' || comando === '-v') {
    console.log(versionPaquete())
    return
  }
  const cargar = COMANDOS[comando]
  if (!cargar) {
    error(`Comando desconocido: ${comando}`)
    console.log(AYUDA)
    process.exitCode = 1
    return
  }
  const modulo = await cargar()
  await modulo.default(args)
}

main().catch((e) => {
  linea()
  if (e instanceof ErrorDeUsuario) {
    error(e.message)
    if (e.remedio) { linea(); nota('Que hacer: ' + e.remedio) }
  } else {
    error('Error inesperado: ' + e.message)
    nota('Si se repite, envia esta pantalla al administrador.')
  }
  linea()
  process.exit(1)
})

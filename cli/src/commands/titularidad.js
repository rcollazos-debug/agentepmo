import { Trilium, configTrilium } from '../lib/trilium.js'
import { leerVinculo } from '../lib/project-link.js'
import { resolverIdentidad, MOTIVOS } from '../lib/identity.js'
import { resolverRol, cederTitularidad, tomarTitularidad, entradaHistorial } from '../lib/roles.js'
import { RepositorioProyecto } from '../lib/project-store.js'
import { titulo, ok, aviso, nota, linea, preguntar, ErrorDeUsuario } from '../lib/ui.js'

function valorDe (args, bandera) {
  const i = args.indexOf(bandera)
  return i >= 0 && args[i + 1] && !args[i + 1].startsWith('--') ? args[i + 1] : null
}

/** Deja constancia del cambio de titular en la memoria del proyecto. */
async function anotarEnHistorial (t, proyectoId, texto) {
  const repo = new RepositorioProyecto(t)
  const nota = await repo.notaDeDireccion(proyectoId, 'memory/historial', { crear: true })
  const actual = await t.leerContenido(nota.noteId).catch(() => '')
  const entrada = entradaHistorial({ skill: 'TITULARIDAD', texto })
  await t.escribirContenido(nota.noteId, `${actual.trimEnd()}\n\n${entrada}\n`)
}

export default async function titularidad (args) {
  const vinculo = leerVinculo(process.cwd())
  if (!vinculo?.trilium_note_id) {
    throw new ErrorDeUsuario('Esta carpeta no esta vinculada a un proyecto del repositorio.', 'Publica el proyecto o unete a uno con `vorkanpm join`.')
  }
  const cfg = configTrilium()
  if (!cfg.url || !cfg.token) throw new ErrorDeUsuario('Falta la configuracion de Trilium.', 'Ejecuta: vorkanpm setup')

  const identidad = await resolverIdentidad()
  if (!identidad.ok) throw new ErrorDeUsuario('No puedo verificar quien eres.', MOTIVOS[identidad.motivo])

  const t = new Trilium(cfg)
  const proyectoId = vinculo.trilium_note_id
  const papel = await resolverRol({ trilium: t, proyectoId, correo: identidad.correo })

  titulo('Titularidad del proyecto')
  nota(`PM titular actual: ${papel.titular || 'sin definir'}`)

  const ceder = valorDe(args, '--ceder')
  const tomar = args.includes('--tomar')

  if (!ceder && !tomar) {
    linea()
    nota('Para cederla:  vorkanpm titularidad --ceder <correo>')
    nota('Para tomarla:  vorkanpm titularidad --tomar')
    linea()
    return
  }

  if (ceder) {
    if (!papel.esTitular) {
      throw new ErrorDeUsuario(
        `Solo el PM titular puede ceder la titularidad, y ahora es ${papel.titular}.`,
        'Si no esta disponible, puedes tomarla con `vorkanpm titularidad --tomar`; quedara registrado.'
      )
    }
    const r = await cederTitularidad({ trilium: t, proyectoId, de: identidad.correo, a: ceder })
    await anotarEnHistorial(t, proyectoId, `${r.de} cedio la titularidad del proyecto a ${r.a}`)
    linea(); ok(`Titularidad cedida a ${ceder}`); nota('Queda registrado en el historial del proyecto.'); linea()
    return
  }

  if (papel.esTitular) {
    linea(); ok('Ya eres el PM titular de este proyecto.'); linea()
    return
  }

  linea()
  aviso(`Vas a tomar la titularidad que ahora tiene ${papel.titular}, sin que te la haya cedido.`)
  nota('Es legitimo cuando el titular no esta disponible, pero quedara marcado de forma destacada.')
  linea()
  const r = (await preguntar('¿Confirmas? (si/no)', { porDefecto: 'no' })).toLowerCase()
  if (r !== 'si' && r !== 's' && r !== 'sí') { linea(); ok('No se cambio nada.'); linea(); return }

  const res = await tomarTitularidad({ trilium: t, proyectoId, quien: identidad.correo, anterior: papel.titular })
  await anotarEnHistorial(t, proyectoId, `${res.a} TOMO la titularidad del proyecto sin cesion previa de ${res.de}`)
  linea(); ok(`Ahora eres el PM titular`); aviso('Registrado como toma sin cesion, visible para todos.'); linea()
}

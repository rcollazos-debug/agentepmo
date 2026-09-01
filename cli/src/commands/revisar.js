import { Trilium, configTrilium } from '../lib/trilium.js'
import { leerVinculo, leerLocal, escribirLocal, marcarSincronizado } from '../lib/project-link.js'
import { resolverIdentidad, MOTIVOS } from '../lib/identity.js'
import { resolverRol, pendientes, validarAporte } from '../lib/roles.js'
import { escritoPorOtros } from '../lib/novedades.js'
import { titulo, paso, ok, aviso, nota, linea, preguntar, ErrorDeUsuario } from '../lib/ui.js'

/**
 * Lo que el PM titular tiene sin revisar. La auditoria de este comando no
 * corrige nada por su cuenta: muestra, y decide una persona.
 */
export default async function revisar (args) {
  const dir = process.cwd()
  const vinculo = leerVinculo(dir)
  if (!vinculo?.trilium_note_id) {
    throw new ErrorDeUsuario(
      'Esta carpeta no esta vinculada a un proyecto del repositorio.',
      'Ejecuta `vorkanpm publish` para publicarlo, o `vorkanpm join` para unirte a uno.'
    )
  }
  const cfg = configTrilium()
  if (!cfg.url || !cfg.token) throw new ErrorDeUsuario('Falta la configuracion de Trilium.', 'Ejecuta: vorkanpm setup')

  const identidad = await resolverIdentidad()
  if (!identidad.ok) {
    throw new ErrorDeUsuario('No puedo verificar quien eres.', MOTIVOS[identidad.motivo])
  }

  const t = new Trilium(cfg)
  const proyectoId = vinculo.trilium_note_id
  const papel = await resolverRol({ trilium: t, proyectoId, correo: identidad.correo })

  titulo('Aportes por revisar')
  paso('Consultando el repositorio')
  const { aportes, propuestas } = await pendientes({ trilium: t, proyectoId })
  const novedades = await escritoPorOtros({ trilium: t, proyectoId, correo: identidad.correo, dir })

  if (novedades.length) {
    linea()
    console.log(`  Otros PM escribieron ${novedades.length} cosa(s) desde tu ultima visita:`)
    for (const n of novedades.slice(0, 8)) nota(`· ${n.direccion} — ${n.autor}${n.cuando ? ` (${n.cuando})` : ''}`)
    if (novedades.length > 8) nota(`  ...y ${novedades.length - 8} mas`)
    linea()
    // Auditar un proyecto que solo has tocado tu no tiene sentido; en cuanto
    // ha entrado otra persona, si lo tiene.
    aviso('Conviene revisar la consistencia del proyecto.')
    nota('Abre el agente con `opencode` y ejecuta /consistencia')
  }

  if (!aportes.length && !propuestas.length) {
    linea()
    ok('No hay aportes ni propuestas pendientes de validar.')
    linea()
    return
  }

  linea()
  if (aportes.length) {
    console.log('  Aportes sin validar:')
    for (const a of aportes) nota(`· ${a.direccion} — de ${a.de.join(', ')}${a.desde ? ` (${a.desde})` : ''}`)
  }
  if (propuestas.length) {
    linea()
    console.log('  Propuestas sobre la linea base:')
    for (const p of propuestas) nota(`· ${p.direccion} — de ${p.de}${p.fecha ? ` (${p.fecha})` : ''}`)
  }

  if (!papel.esTitular) {
    linea()
    nota(`El PM titular es ${papel.titular}; es quien valida.`)
    linea()
    return
  }

  if (!args.includes('--validar')) {
    linea()
    nota('Para validar los aportes: vorkanpm revisar --validar')
    if (propuestas.length) nota('Las propuestas se aceptan editando el archivo y publicando el cambio tu mismo.')
    linea()
    return
  }

  linea()
  let validados = 0
  for (const a of aportes) {
    const contenido = await t.leerContenido(a.noteId)
    const local = leerLocal(dir, a.direccion)
    if (local !== contenido) {
      escribirLocal(dir, a.direccion, contenido)
      const huella = await t.huella(a.noteId)
      marcarSincronizado(dir, a.direccion, { contenido, blobId: huella.blobId })
    }
    const r = (await preguntar(`¿Validas ${a.direccion} (de ${a.de.join(', ')})? (si/no)`, { porDefecto: 'no' })).toLowerCase()
    if (r === 'si' || r === 's' || r === 'sí') {
      await validarAporte(t, a.noteId, identidad.correo)
      validados++
    }
  }

  linea()
  if (validados) ok(`${validados} aporte(s) validado(s) como ${identidad.correo}`)
  else nota('No validaste ninguno; siguen disponibles y marcados como no validados.')
  if (aportes.length - validados > 0) {
    nota(`${aportes.length - validados} siguen sin validar. No bloquean nada: se consultan igual.`)
  }
  linea()
}

import { Trilium, configTrilium, ErrorTrilium } from '../lib/trilium.js'
import { leerVinculo, archivosLocales, leerLocal } from '../lib/project-link.js'
import { planificar, resumirEnNegocio, aplicar } from '../lib/publish.js'
import { resolverIdentidad, MOTIVOS } from '../lib/identity.js'
import { resolverRol, viaDeAporte, pendientes } from '../lib/roles.js'
import { RepositorioProyecto } from '../lib/project-store.js'
import { escribirVinculo } from '../lib/project-link.js'
import { titulo, paso, ok, aviso, nota, linea, preguntar, ErrorDeUsuario } from '../lib/ui.js'

/**
 * Publica en Trilium lo que se ha trabajado en local. Nada sube sin que el PM
 * vea un resumen y lo apruebe: la publicacion es un acto deliberado, y eso
 * ademas hace raras las escrituras simultaneas de dos PMs.
 */
export default async function publish (args) {
  const dir = process.cwd()
  const vinculo = leerVinculo(dir)

  if (!vinculo) {
    throw new ErrorDeUsuario(
      'Esta carpeta no es un proyecto de Vorkan-PM.',
      'Ejecuta `vorkanpm init` para crearlo, o `vorkanpm join` para unirte a uno existente.'
    )
  }

  const cfg = configTrilium()
  if (!cfg.url || !cfg.token) {
    throw new ErrorDeUsuario('Falta la configuracion de Trilium.', 'Ejecuta: vorkanpm setup --credenciales <ruta>')
  }

  titulo('Publicar en el repositorio')

  // --- identidad: sin firma verificada no se publica ---
  paso('Comprobando tu identidad')
  const identidad = await resolverIdentidad()
  if (!identidad.ok) {
    throw new ErrorDeUsuario(
      'No puedo verificar quien eres, asi que no publico nada.',
      `${MOTIVOS[identidad.motivo] || 'Vuelve a autorizar tu cuenta de Google.'} Tu trabajo local queda intacto.`
    )
  }
  ok(`Publicaras como ${identidad.correo}`)

  const t = new Trilium(cfg)
  const primeraVez = !vinculo.trilium_note_id
  if (primeraVez && (!vinculo.cliente || !vinculo.anioInicio)) {
    throw new ErrorDeUsuario(
      'Falta saber a que cliente y anio pertenece este proyecto.',
      'Anade `cliente` y `anioInicio` a .vorkanpm.json, o vuelve a crear el proyecto con `vorkanpm init`.'
    )
  }

  // --- plan ---
  let plan
  try {
    paso('Comparando tu carpeta con el repositorio')
    plan = primeraVez
      ? archivosLocales(dir).map((direccion) => ({ direccion, accion: 'publicar', local: leerLocal(dir, direccion), noteId: null, cuanto: null }))
      : await planificar({ dir, proyectoId: vinculo.trilium_note_id, trilium: t })
  } catch (e) {
    if ((e instanceof ErrorTrilium && (e.estado === 0 || e.estado >= 500)) || /fetch|ECONN|ENOTFOUND|timeout/i.test(e.message)) {
      linea()
      aviso('El repositorio no responde ahora mismo.')
      nota('Tu trabajo esta guardado en esta carpeta y no se ha perdido nada.')
      nota('Vuelve a ejecutar `vorkanpm publish` cuando tengas conexion.')
      linea()
      return
    }
    throw e
  }

  // El rol decide por donde entra cada cosa: el titular publica directo, un
  // colaborador aporta hechos y propone cambios de linea base.
  let papel = { rol: 'titular', esTitular: true, titular: identidad.correo }
  if (!primeraVez) {
    papel = await resolverRol({ trilium: t, proyectoId: vinculo.trilium_note_id, correo: identidad.correo })
    for (const p of plan) {
      if (p.accion === 'publicar' || p.accion === 'reconciliar') {
        p.via = viaDeAporte({ direccion: p.direccion, esTitular: papel.esTitular })
      }
    }
    if (!papel.esTitular) nota(`Colaboras en este proyecto; el PM titular es ${papel.titular}.`)
  }

  const resumen = resumirEnNegocio(plan, { primeraVez })
  if (resumen.vacio) {
    linea()
    ok('No hay nada nuevo que publicar: el repositorio ya esta al dia.')
    linea()
    return
  }

  // --- resumen para una persona, no para un tecnico ---
  linea()
  if (primeraVez) {
    console.log(`  Es la primera publicacion. Creare el proyecto en el repositorio, en:`)
    nota(`${vinculo.cliente} / ${vinculo.anioInicio} / ${vinculo.project_name || vinculo.project_id}`)
    linea()
  }
  if (resumen.sube.length) {
    console.log('  Voy a subir al repositorio:')
    for (const f of resumen.sube) nota('· ' + f)
  }
  if (resumen.aportes?.length) {
    linea()
    console.log('  Como aporte, para que lo valide el PM titular:')
    for (const f of resumen.aportes) nota('· ' + f)
  }
  if (resumen.propuestas?.length) {
    linea()
    console.log('  Como propuesta, sin tocar la linea base:')
    for (const f of resumen.propuestas) nota('· ' + f)
  }
  if (resumen.baja.length) {
    linea()
    console.log('  Y a traerme del repositorio (lo aporto otra persona):')
    for (const f of resumen.baja) nota('· ' + f)
  }
  if (resumen.corregidas?.length) {
    linea()
    console.log('  Corrijo entradas que ya existian (la version anterior queda en el historial de Trilium):')
    for (const c of resumen.corregidas) nota(`· ${c.entrada} en ${c.que}`)
  }
  if (resumen.paran.length) {
    linea()
    aviso('Esto no lo toco, necesita tu decision:')
    for (const p of resumen.paran) nota(`· ${p.que} — ${p.porque}`)
  }

  // --plan deja ver que se subiria sin subir nada: es lo que el agente
  // enseña al PM antes de pedirle permiso en la conversacion.
  if (args.includes('--plan')) {
    linea()
    nota('Solo es una previsualizacion: no se ha publicado nada.')
    linea()
    return
  }

  linea()
  if (args.includes('--si')) {
    nota('Aprobado por la opcion --si')
  } else {
    const r = (await preguntar('¿Lo publico? (si/no)', { porDefecto: 'no' })).toLowerCase()
    if (r !== 'si' && r !== 's' && r !== 'sí') {
      linea()
      ok('No he publicado nada. Tu trabajo sigue guardado aqui.')
      linea()
      return
    }
  }

  // --- aplicar ---
  let proyectoId = vinculo.trilium_note_id
  if (primeraVez) {
    paso('Creando el proyecto en el repositorio')
    const repo = new RepositorioProyecto(t)
    const creado = await repo.asegurarProyecto({
      cliente: vinculo.cliente,
      anioInicio: vinculo.anioInicio,
      nombreProyecto: vinculo.project_name || vinculo.project_id
    })
    await repo.asegurarCarpetas(creado.proyectoId)
    await repo.sellarProyecto(creado.proyectoId, {
      cliente: vinculo.cliente,
      anioInicio: vinculo.anioInicio,
      projectId: vinculo.project_id,
      pmTitular: identidad.correo,
      estado: 'VERDE'
    })
    proyectoId = creado.proyectoId
    escribirVinculo(dir, { ...leerVinculo(dir), trilium_note_id: proyectoId, pmTitular: identidad.correo })
    ok(`Proyecto creado. Eres el PM titular.`)
  }

  paso('Publicando')
  const hecho = await aplicar({ dir, proyectoId, trilium: t, plan, autor: identidad.correo })

  linea()
  titulo('Publicado')
  if (hecho.publicadas.length) ok(`${hecho.publicadas.length} elemento(s) subido(s), firmados como ${identidad.correo}`)
  if (hecho.descargadas.length) ok(`${hecho.descargadas.length} elemento(s) traido(s) del repositorio`)
  if (hecho.propuestas?.length) ok(`${hecho.propuestas.length} propuesta(s) dejada(s) para el titular`)
  if (hecho.pendientes.length) {
    aviso(`${hecho.pendientes.length} quedaron sin publicar porque necesitan tu decision`)
    nota('Revisalos con el agente y vuelve a ejecutar `vorkanpm publish`.')
  }

  // Si eres el titular, saber que hay esperandote es mas util que el resumen
  // de lo que acabas de subir.
  if (papel.esTitular && !primeraVez) {
    const p = await pendientes({ trilium: t, proyectoId: vinculo.trilium_note_id }).catch(() => null)
    const total = (p?.aportes.length ?? 0) + (p?.propuestas.length ?? 0)
    if (total) {
      linea()
      aviso(`Tienes ${total} cosa(s) sin revisar de otros PM.`)
      nota('Veelas con: vorkanpm revisar')
    }
  }
  linea()
}

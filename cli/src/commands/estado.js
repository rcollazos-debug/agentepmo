import { Trilium, configTrilium, ErrorTrilium } from '../lib/trilium.js'
import { leerVinculo } from '../lib/project-link.js'
import { planificar, resumirEnNegocio } from '../lib/publish.js'
import { resolverIdentidad, MOTIVOS, nombreParaMostrar } from '../lib/identity.js'
import { resolverRol, viaDeAporte, pendientes } from '../lib/roles.js'
import { escritoPorOtros } from '../lib/novedades.js'
import { titulo, ok, aviso, nota, linea } from '../lib/ui.js'

/**
 * Todo lo que el agente necesita saber al abrir una sesion, en una sola
 * llamada y en JSON. Sin esto el agente tendria que interpretar prosa de
 * varios comandos, que es fragil y lento.
 */
export async function reunirEstado (dir = process.cwd()) {
  const estado = {
    proyecto: null,
    identidad: { verificada: false },
    repositorio: { configurado: false, disponible: false },
    rol: null,
    sinPublicar: [],
    aportesPendientes: [],
    propuestasPendientes: [],
    escritoPorOtros: [],
    avisos: []
  }

  const vinculo = leerVinculo(dir)
  if (!vinculo) {
    estado.avisos.push('Esta carpeta no es un proyecto de Vorkan-PM. Se crea con: vorkanpm init')
    return estado
  }
  estado.proyecto = {
    id: vinculo.project_id,
    nombre: vinculo.project_name ?? null,
    cliente: vinculo.cliente ?? null,
    anioInicio: vinculo.anioInicio ?? null,
    publicado: Boolean(vinculo.trilium_note_id)
  }

  const identidad = await resolverIdentidad()
  if (identidad.ok) {
    estado.identidad = {
      verificada: true,
      correo: identidad.correo,
      nombre: nombreParaMostrar(identidad.correo)
    }
  } else {
    estado.identidad = { verificada: false, motivo: MOTIVOS[identidad.motivo] }
    estado.avisos.push('Sin identidad verificada no se puede publicar. ' + MOTIVOS[identidad.motivo])
  }

  const cfg = configTrilium()
  estado.repositorio.configurado = Boolean(cfg.url && cfg.token)
  if (!estado.repositorio.configurado) {
    estado.avisos.push('El repositorio no esta configurado en este equipo. Ejecuta: vorkanpm setup')
    return estado
  }
  if (!vinculo.trilium_note_id) {
    estado.avisos.push('El proyecto todavia no esta en el repositorio. Se publica con: vorkanpm publish')
    return estado
  }

  const t = new Trilium(cfg)
  try {
    const proyectoId = vinculo.trilium_note_id
    const papel = estado.identidad.verificada
      ? await resolverRol({ trilium: t, proyectoId, correo: estado.identidad.correo })
      : { rol: null, titular: null, esTitular: false }
    estado.rol = { rol: papel.rol, titular: papel.titular, esTitular: papel.esTitular }
    estado.repositorio.disponible = true

    const plan = await planificar({ dir, proyectoId, trilium: t })
    for (const p of plan) {
      if (p.accion === 'publicar' || p.accion === 'reconciliar') {
        p.via = viaDeAporte({ direccion: p.direccion, esTitular: papel.esTitular })
      }
    }
    const resumen = resumirEnNegocio(plan)
    estado.sinPublicar = [...resumen.sube, ...resumen.aportes, ...resumen.propuestas]
    estado.requierenDecision = resumen.paran
    estado.porDescargar = resumen.baja

    if (papel.esTitular) {
      const p = await pendientes({ trilium: t, proyectoId })
      estado.aportesPendientes = p.aportes.map((a) => ({ que: a.direccion, de: a.de }))
      estado.propuestasPendientes = p.propuestas.map((x) => ({ que: x.direccion, de: x.de }))
    }
    if (estado.identidad.verificada) {
      estado.escritoPorOtros = (await escritoPorOtros({ trilium: t, proyectoId, correo: estado.identidad.correo, dir }))
        .map((n) => ({ que: n.direccion, quien: n.autor, cuando: n.cuando }))
    }
  } catch (e) {
    // El repositorio caido no impide trabajar: solo limita lo que se sabe.
    if (e instanceof ErrorTrilium && (e.estado === 0 || e.estado >= 500)) {
      estado.repositorio.disponible = false
      estado.avisos.push('El repositorio no responde. Puedes trabajar con normalidad; la publicacion queda pendiente.')
    } else throw e
  }
  return estado
}

export default async function estado (args) {
  const e = await reunirEstado()

  if (args.includes('--json')) {
    console.log(JSON.stringify(e, null, 2))
    return
  }

  titulo('Estado del proyecto')
  if (!e.proyecto) { aviso(e.avisos[0]); linea(); return }
  nota(`${e.proyecto.nombre ?? e.proyecto.id}${e.proyecto.cliente ? ` — ${e.proyecto.cliente}` : ''}`)
  if (e.identidad.verificada) ok(`Identificado como ${e.identidad.correo}`)
  else aviso(e.identidad.motivo)
  if (e.rol) nota(`Tu rol: ${e.rol.rol}${e.rol.titular ? ` (titular: ${e.rol.titular})` : ''}`)

  linea()
  if (e.sinPublicar.length) {
    console.log('  Sin publicar:')
    for (const s of e.sinPublicar) nota('· ' + s)
  } else if (e.repositorio.disponible) ok('Todo publicado')

  if (e.aportesPendientes?.length) {
    linea(); console.log('  Aportes por validar:')
    for (const a of e.aportesPendientes) nota(`· ${a.que} — de ${a.de.join(', ')}`)
  }
  if (e.escritoPorOtros?.length) {
    linea(); console.log('  Otros PM escribieron:')
    for (const n of e.escritoPorOtros) nota(`· ${n.que} — ${n.quien}`)
  }
  for (const a of e.avisos) { linea(); aviso(a) }
  linea()
}

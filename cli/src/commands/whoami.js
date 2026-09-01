import { resolverIdentidad, MOTIVOS, nombreParaMostrar, guardarNombreParaMostrar } from '../lib/identity.js'
import { titulo, ok, nota, linea, preguntar, ErrorDeUsuario } from '../lib/ui.js'

/**
 * Quien eres, segun Google y no segun lo que digas. El nombre para mostrar es
 * una etiqueta legible que se pregunta una vez; la atribucion usa el correo.
 */
export default async function whoami (args) {
  const identidad = await resolverIdentidad()
  if (!identidad.ok) {
    throw new ErrorDeUsuario('No puedo verificar tu identidad.', MOTIVOS[identidad.motivo])
  }

  let nombre = nombreParaMostrar(identidad.correo)
  if (!nombre && !args.includes('--json')) {
    nombre = await preguntar('¿Como te llamas? (solo para mostrar)', { porDefecto: identidad.correo.split('@')[0] })
    guardarNombreParaMostrar(identidad.correo, nombre)
  }

  if (args.includes('--json')) {
    console.log(JSON.stringify({ correo: identidad.correo, nombre: nombre ?? null }, null, 2))
    return
  }
  titulo('Tu identidad')
  ok(identidad.correo)
  nota(`Nombre para mostrar: ${nombre}`)
  nota('El correo lo verifica Google y es lo que firma todo lo que publicas.')
  linea()
}

import { credentialTargets } from './paths.js'
import { leerJson, existe, escribirJson } from './fsx.js'
import path from 'node:path'
import { agentHome } from './paths.js'

const TOKEN_URL = 'https://oauth2.googleapis.com/token'
const PERFIL_URL = 'https://gmail.googleapis.com/gmail/v1/users/me/profile'

/**
 * Resuelve la identidad del usuario contra Google.
 *
 * Es deliberado que esto lo haga el CLI y no el agente: el modelo es
 * sugestionable y una conversacion podria convencerlo de atribuir a otra
 * persona. El correo que devuelve Google no se puede discutir.
 *
 * Usa el endpoint de perfil de Gmail, que funciona con los scopes que el
 * agente ya tiene concedidos: no requiere volver a pedir consentimiento.
 */
export async function resolverIdentidad () {
  const t = credentialTargets()
  const claves = leerJson(t.gmail, null)
  const sesion = leerJson(t.gmailToken, null)

  if (!claves || !sesion) {
    return { ok: false, motivo: 'sin_sesion' }
  }

  const app = claves.installed || claves.web || {}
  let accessToken = sesion.access_token

  const caducado = !sesion.expiry_date || sesion.expiry_date <= Date.now() + 60_000
  if (caducado) {
    if (!sesion.refresh_token || !app.client_id || !app.client_secret) {
      return { ok: false, motivo: 'sin_refresco' }
    }
    const r = await fetch(TOKEN_URL, {
      method: 'POST',
      headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
      body: new URLSearchParams({
        client_id: app.client_id,
        client_secret: app.client_secret,
        refresh_token: sesion.refresh_token,
        grant_type: 'refresh_token'
      })
    })
    if (!r.ok) return { ok: false, motivo: 'refresco_rechazado', detalle: r.status }
    const nuevo = await r.json()
    accessToken = nuevo.access_token
    escribirJson(t.gmailToken, {
      ...sesion,
      access_token: accessToken,
      expiry_date: Date.now() + (nuevo.expires_in ?? 3600) * 1000
    })
  }

  const perfil = await fetch(PERFIL_URL, { headers: { Authorization: `Bearer ${accessToken}` } })
  if (!perfil.ok) return { ok: false, motivo: 'perfil_rechazado', detalle: perfil.status }

  const { emailAddress } = await perfil.json()
  if (!emailAddress) return { ok: false, motivo: 'sin_correo' }

  return { ok: true, correo: emailAddress, nombre: nombreParaMostrar(emailAddress) }
}

const archivoPerfil = () => path.join(agentHome(), 'vorkan', 'perfil.json')

/**
 * El nombre para mostrar es una etiqueta legible, no una identidad: se pregunta
 * una vez y se guarda. Que sea declarado da igual, porque la atribucion usa
 * siempre el correo verificado.
 */
export function nombreParaMostrar (correo) {
  const guardado = leerJson(archivoPerfil(), {})
  return guardado[correo]?.nombre || null
}

export function guardarNombreParaMostrar (correo, nombre) {
  const guardado = leerJson(archivoPerfil(), {})
  guardado[correo] = { nombre, actualizado: new Date().toISOString() }
  escribirJson(archivoPerfil(), guardado)
}

export const MOTIVOS = {
  sin_sesion: 'No hay sesion de Google en este equipo. Ejecuta: vorkanpm setup',
  sin_refresco: 'La sesion de Google caduco y no se puede renovar. Ejecuta: vorkanpm mcp gmail --auth',
  refresco_rechazado: 'Google rechazo renovar la sesion. Vuelve a autorizar con: vorkanpm mcp gmail --auth',
  perfil_rechazado: 'Google no acepto la consulta de identidad. Vuelve a autorizar con: vorkanpm mcp gmail --auth',
  sin_correo: 'Google no devolvio una direccion de correo para esta cuenta.'
}

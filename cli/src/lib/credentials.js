import { credentialTargets, CREDENTIAL_SOURCES } from './paths.js'
import { existe, copiarArchivo } from './fsx.js'
import path from 'node:path'

/**
 * Resuelve la ruta de una credencial dentro de la carpeta del administrador.
 * Acepta dos formatos:
 *   - Plano:   carpeta/gmail-oauth.keys.json
 *   - Anidado: carpeta/.gmail-mcp/gcp-oauth.keys.json
 * Devuelve la primera ruta que existe, o null.
 */
function buscarCredencial (carpeta, nombre, alternativas = []) {
  const candidatos = [path.join(carpeta, nombre), ...alternativas.map(a => path.join(carpeta, a))]
  return candidatos.find(c => existe(c)) || null
}

/**
 * Instala las credenciales OAuth de la organizacion desde la carpeta que
 * entrega el administrador. Acepta tanto archivos planos como subdirectorios.
 * Una credencial ausente degrada su integracion, nunca aborta la instalacion.
 */
export function instalarCredenciales (carpeta) {
  const destino = credentialTargets()
  const resultado = []

  const gmailOrigen = buscarCredencial(carpeta, CREDENTIAL_SOURCES.gmail, [
    '.gmail-mcp/gcp-oauth.keys.json'
  ])
  const calendarOrigen = buscarCredencial(carpeta, CREDENTIAL_SOURCES.calendar, [
    'calendar/gcp-oauth.keys.json'
  ])

  if (gmailOrigen) {
    copiarArchivo(gmailOrigen, destino.gmail)
    resultado.push({ servicio: 'Gmail', instalada: true, detalle: 'credencial propia' })
  } else if (calendarOrigen) {
    copiarArchivo(calendarOrigen, destino.gmail)
    resultado.push({ servicio: 'Gmail', instalada: true, detalle: 'reutiliza la de Calendar' })
  } else {
    resultado.push({ servicio: 'Gmail', instalada: false, detalle: 'falta la credencial' })
  }

  if (calendarOrigen) {
    copiarArchivo(calendarOrigen, destino.calendar)
    resultado.push({ servicio: 'Google Calendar', instalada: true })
  } else {
    resultado.push({ servicio: 'Google Calendar', instalada: false, detalle: 'falta la credencial' })
  }

  const chatOrigen = buscarCredencial(carpeta, CREDENTIAL_SOURCES.chat, [
    'chat/credentials.json'
  ])
  if (chatOrigen) {
    copiarArchivo(chatOrigen, destino.chat)
    resultado.push({ servicio: 'Google Chat', instalada: true })
  } else {
    resultado.push({ servicio: 'Google Chat', instalada: false, detalle: 'falta la credencial' })
  }

  const triliumOrigen = buscarCredencial(carpeta, CREDENTIAL_SOURCES.triliumEnv)
  if (triliumOrigen) {
    copiarArchivo(triliumOrigen, destino.triliumEnv)
    resultado.push({ servicio: 'Trilium', instalada: true })
  } else {
    resultado.push({ servicio: 'Trilium', instalada: false, detalle: 'sin URL ni token' })
  }

  return resultado
}

export function estadoCredenciales () {
  const t = credentialTargets()
  return [
    { servicio: 'Gmail', instalada: existe(t.gmail), autorizada: existe(t.gmailToken) },
    { servicio: 'Google Calendar', instalada: existe(t.calendar), autorizada: existe(t.calendarTokens) },
    { servicio: 'Google Chat', instalada: existe(t.chat), autorizada: existe(t.chatToken) },
    { servicio: 'Trilium', instalada: existe(t.triliumEnv), autorizada: existe(t.triliumEnv) }
  ]
}

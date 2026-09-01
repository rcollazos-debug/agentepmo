import { credentialTargets, CREDENTIAL_SOURCES } from './paths.js'
import { existe, copiarArchivo } from './fsx.js'
import path from 'node:path'

/**
 * Instala las credenciales OAuth de la organizacion desde la carpeta que
 * entrega el administrador. Una credencial ausente degrada su integracion,
 * nunca aborta la instalacion.
 */
export function instalarCredenciales (carpeta) {
  const destino = credentialTargets()
  const resultado = []

  const gmailOrigen = path.join(carpeta, CREDENTIAL_SOURCES.gmail)
  const calendarOrigen = path.join(carpeta, CREDENTIAL_SOURCES.calendar)

  if (existe(gmailOrigen)) {
    copiarArchivo(gmailOrigen, destino.gmail)
    resultado.push({ servicio: 'Gmail', instalada: true, detalle: 'credencial propia' })
  } else if (existe(calendarOrigen)) {
    copiarArchivo(calendarOrigen, destino.gmail)
    resultado.push({ servicio: 'Gmail', instalada: true, detalle: 'reutiliza la de Calendar' })
  } else {
    resultado.push({ servicio: 'Gmail', instalada: false, detalle: 'falta la credencial' })
  }

  if (existe(calendarOrigen)) {
    copiarArchivo(calendarOrigen, destino.calendar)
    resultado.push({ servicio: 'Google Calendar', instalada: true })
  } else {
    resultado.push({ servicio: 'Google Calendar', instalada: false, detalle: 'falta la credencial' })
  }

  const chatOrigen = path.join(carpeta, CREDENTIAL_SOURCES.chat)
  if (existe(chatOrigen)) {
    copiarArchivo(chatOrigen, destino.chat)
    resultado.push({ servicio: 'Google Chat', instalada: true })
  } else {
    resultado.push({ servicio: 'Google Chat', instalada: false, detalle: 'falta la credencial' })
  }

  const triliumOrigen = path.join(carpeta, CREDENTIAL_SOURCES.triliumEnv)
  if (existe(triliumOrigen)) {
    copiarArchivo(triliumOrigen, destino.triliumEnv)
    resultado.push({ servicio: 'Trilium', instalada: true })
  } else {
    resultado.push({ servicio: 'Trilium', instalada: false, detalle: 'sin URL ni token' })
  }

  const metabaseOrigen = path.join(carpeta, CREDENTIAL_SOURCES.metabaseEnv)
  if (existe(metabaseOrigen)) {
    copiarArchivo(metabaseOrigen, destino.metabaseEnv)
    resultado.push({ servicio: 'Metabase', instalada: true })
  } else {
    resultado.push({ servicio: 'Metabase', instalada: false, detalle: 'sin API key' })
  }

  return resultado
}

export function estadoCredenciales () {
  const t = credentialTargets()
  return [
    { servicio: 'Gmail', instalada: existe(t.gmail), autorizada: existe(t.gmailToken) },
    { servicio: 'Google Calendar', instalada: existe(t.calendar), autorizada: existe(t.calendarTokens) },
    { servicio: 'Google Chat', instalada: existe(t.chat), autorizada: existe(t.chatToken) },
    { servicio: 'Metabase', instalada: existe(t.metabaseEnv), autorizada: existe(t.metabaseEnv) },
    { servicio: 'Trilium', instalada: existe(t.triliumEnv), autorizada: existe(t.triliumEnv) }
  ]
}

#!/usr/bin/env node
/**
 * Falla si el paquete a publicar contiene datos de proyecto, credenciales o
 * configuracion local. Se ejecuta solo antes de publicar (prepublishOnly).
 */
import { execFileSync } from 'node:child_process'

const PROHIBIDO = [
  { patron: /^legacy\//, motivo: 'datos del PM y respaldo de la instalacion anterior' },
  { patron: /^\.claude\//, motivo: 'configuracion local con secretos' },
  { patron: /(^|\/)credenciales\//, motivo: 'credenciales de la organizacion' },
  { patron: /(^|\/)brain\//, motivo: 'datos de proyecto' },
  { patron: /(^|\/)projects\//, motivo: 'datos de proyecto' },
  { patron: /(^|\/)output\//, motivo: 'documentos generados' },
  { patron: /(^|\/)node_modules\//, motivo: 'dependencias instaladas' },
  { patron: /credentials\.json$/, motivo: 'credencial OAuth' },
  { patron: /tokens?\.json$/, motivo: 'token de sesion' },
  { patron: /gcp-oauth\.keys\.json$/, motivo: 'credencial OAuth' },
  { patron: /oauth.*\.json$/i, motivo: 'credencial OAuth' },
  { patron: /(^|\/)\.env$/, motivo: 'variables de entorno con secretos' },
  { patron: /\.env$/, motivo: 'variables de entorno con secretos' }
]

const salida = execFileSync('npm', ['pack', '--dry-run', '--json'], { encoding: 'utf8' })
const archivos = JSON.parse(salida)[0].files.map((f) => f.path)

const infracciones = []
for (const archivo of archivos) {
  for (const { patron, motivo } of PROHIBIDO) {
    if (patron.test(archivo)) infracciones.push({ archivo, motivo })
  }
}

if (infracciones.length) {
  console.error('\n  El paquete NO se puede publicar: contiene contenido excluido.\n')
  for (const i of infracciones) console.error(`    ${i.archivo}  <-- ${i.motivo}`)
  console.error('\n  Corrige el campo "files" de package.json o retira esos archivos.\n')
  process.exit(1)
}

const marcadores = archivos.filter((f) => f.startsWith('agent/')).length
console.log(`  Paquete limpio: ${archivos.length} archivos (${marcadores} del cuerpo del agente).`)

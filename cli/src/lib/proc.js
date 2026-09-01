import { spawn, spawnSync } from 'node:child_process'
import fs from 'node:fs'
import os from 'node:os'
import path from 'node:path'

/** Localiza un ejecutable en el PATH de la sesion actual. */
export function existeComando (cmd) {
  const buscador = process.platform === 'win32' ? 'where' : 'which'
  const r = spawnSync(buscador, [cmd], { stdio: 'ignore', shell: process.platform === 'win32' })
  return r.status === 0
}

export function salidaDe (cmd, args = []) {
  const r = spawnSync(cmd, args, { encoding: 'utf8', shell: process.platform === 'win32' })
  return (r.stdout || '').trim()
}

/** Ejecuta un comando dejando que el usuario interactue (login OAuth, etc.). */
export function ejecutarInteractivo (cmd, args = [], opciones = {}) {
  return new Promise((resolve) => {
    const p = spawn(cmd, args, {
      stdio: 'inherit',
      shell: process.platform === 'win32',
      ...opciones
    })
    p.on('close', (code) => resolve(code === 0))
    p.on('error', () => resolve(false))
  })
}

/**
 * Localiza el ejecutable de opencode. Ademas del PATH, mira dentro de la
 * aplicacion de escritorio de macOS, que trae su propio CLI y no lo publica
 * en el PATH: sin esto, un Mac con opencode instalado se rechaza como si no
 * lo tuviera.
 */
export function resolverOpencode () {
  if (existeComando('opencode')) return 'opencode'
  const candidatos = [
    '/Applications/opencode.app/Contents/MacOS/opencode-cli',
    path.join(os.homedir(), 'Applications', 'opencode.app', 'Contents', 'MacOS', 'opencode-cli')
  ]
  for (const c of candidatos) {
    try { if (fs.existsSync(c)) return c } catch { /* siguiente */ }
  }
  return null
}

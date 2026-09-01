/** Salida de consola en español, uniforme para los cuatro comandos. */
const ESC = String.fromCharCode(27)
const useColor = process.stdout.isTTY && !process.env.NO_COLOR
const paint = (code, text) => (useColor ? `${ESC}[${code}m${text}${ESC}[0m` : text)

export const titulo = (t) => {
  console.log('')
  console.log(paint('36;1', '  ' + t))
  console.log(paint('36', '  ' + '-'.repeat(Math.max(t.length, 10))))
}
export const paso = (t) => console.log('  ' + paint('37;1', '> ') + t)
export const ok = (t) => console.log('  ' + paint('32', 'OK') + '  ' + t)
export const aviso = (t) => console.log('  ' + paint('33', '!') + '   ' + t)
export const error = (t) => console.error('  ' + paint('31', 'X') + '   ' + t)
export const nota = (t) => console.log('      ' + paint('90', t))
export const linea = () => console.log('')

/** Detiene el comando con un mensaje y, cuando la hay, la acción que lo resuelve. */
export class ErrorDeUsuario extends Error {
  constructor (mensaje, remedio) {
    super(mensaje)
    this.remedio = remedio
  }
}

export function preguntar (texto, { porDefecto = '' } = {}) {
  return new Promise((resolve) => {
    const sufijo = porDefecto ? ` (${porDefecto})` : ''
    process.stdout.write(`  ${texto}${sufijo}: `)
    process.stdin.resume()
    process.stdin.setEncoding('utf8')
    process.stdin.once('data', (d) => {
      process.stdin.pause()
      resolve(String(d).trim() || porDefecto)
    })
  })
}

export async function esperarEnter (texto = 'Pulsa ENTER para continuar') {
  await preguntar(texto)
}

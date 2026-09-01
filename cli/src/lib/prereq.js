import { salidaDe, resolverOpencode } from './proc.js'

const NODE_MINIMO = 20

/**
 * Comprueba los prerrequisitos. Distingue el caso de Windows en el que un
 * programa acaba de instalarse y todavia no es visible en esta sesion:
 * es el fallo mas frecuente del instalador antiguo.
 */
export function comprobarPrerrequisitos () {
  const resultados = []

  const mayor = Number(process.versions.node.split('.')[0])
  resultados.push({
    nombre: 'Node.js',
    ok: mayor >= NODE_MINIMO,
    detalle: `v${process.versions.node}`,
    obligatorio: true,
    remedio: `Vorkan-PM necesita Node.js ${NODE_MINIMO} o superior. Instala la version LTS desde nodejs.org y vuelve a ejecutar el comando.`
  })

  const opencode = resolverOpencode()
  const hayOpencode = Boolean(opencode)
  resultados.push({
    nombre: 'opencode',
    ok: hayOpencode,
    detalle: hayOpencode ? (salidaDe(opencode, ['--version']) || 'instalado') : 'no encontrado',
    ruta: opencode,
    obligatorio: true,
    remedio: process.platform === 'win32'
      ? 'No encuentro opencode en esta sesion. Si acabas de instalarlo, REINICIA el computador y vuelve a ejecutar este comando. Si nunca se instalo: npm install -g opencode-ai'
      : 'Instala opencode con: npm install -g opencode-ai'
  })

  return resultados
}

export function primerFalloObligatorio (resultados) {
  return resultados.find((r) => r.obligatorio && !r.ok) || null
}

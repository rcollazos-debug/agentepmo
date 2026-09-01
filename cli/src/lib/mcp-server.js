import readline from 'node:readline'

const PROTOCOLO = '2024-11-05'

/** Traduce el esquema abreviado de las herramientas a JSON Schema. */
function aJsonSchema (esquema) {
  const properties = {}
  const required = []
  for (const [nombre, def] of Object.entries(esquema || {})) {
    properties[nombre] = { type: def.tipo === 'number' ? 'number' : 'string' }
    if (def.requerido) required.push(nombre)
  }
  return { type: 'object', properties, ...(required.length ? { required } : {}) }
}

/**
 * Servidor MCP minimo sobre stdio: JSON-RPC por lineas.
 * Solo implementa lo que opencode necesita para usar herramientas.
 */
export function servirMcp ({ nombre, version, herramientas }) {
  const enviar = (mensaje) => process.stdout.write(JSON.stringify(mensaje) + '\n')
  const responder = (id, result) => enviar({ jsonrpc: '2.0', id, result })
  const fallar = (id, code, message) => enviar({ jsonrpc: '2.0', id, error: { code, message } })

  const rl = readline.createInterface({ input: process.stdin, terminal: false })

  // Las peticiones se atienden en paralelo y pueden responder desordenadas
  // (JSON-RPC lo permite: cada respuesta lleva su id). Hay que llevar la
  // cuenta de las que estan en vuelo para no salir dejandolas sin respuesta.
  const enVuelo = new Set()

  const atender = async (linea) => {
    if (!linea.trim()) return
    let peticion
    try { peticion = JSON.parse(linea) } catch { return }
    const { id, method, params } = peticion

    try {
      if (method === 'initialize') {
        return responder(id, {
          protocolVersion: PROTOCOLO,
          capabilities: { tools: {} },
          serverInfo: { name: nombre, version }
        })
      }

      if (method === 'notifications/initialized' || method === 'initialized') return

      if (method === 'tools/list') {
        return responder(id, {
          tools: Object.entries(herramientas).map(([n, h]) => ({
            name: n,
            description: h.escribe ? `[escribe] ${h.descripcion}` : `[lectura] ${h.descripcion}`,
            inputSchema: aJsonSchema(h.esquema)
          }))
        })
      }

      if (method === 'tools/call') {
        const herramienta = herramientas[params?.name]
        if (!herramienta) return fallar(id, -32602, `Herramienta desconocida: ${params?.name}`)
        try {
          const salida = await herramienta.ejecutar(params.arguments || {})
          return responder(id, {
            content: [{ type: 'text', text: JSON.stringify(salida, null, 2) }]
          })
        } catch (e) {
          // El rechazo por ambito no es un fallo del servidor: es la respuesta
          // correcta, y el agente debe poder leerla y explicarsela al PM.
          return responder(id, {
            content: [{ type: 'text', text: e.message }],
            isError: true
          })
        }
      }

      if (id !== undefined) fallar(id, -32601, `Metodo no soportado: ${method}`)
    } catch (e) {
      if (id !== undefined) fallar(id, -32603, e.message)
    }
  }

  rl.on('line', (linea) => {
    const trabajo = atender(linea).catch(() => {})
    enVuelo.add(trabajo)
    trabajo.finally(() => enVuelo.delete(trabajo))
  })

  rl.on('close', async () => {
    while (enVuelo.size) await Promise.all([...enVuelo])
    process.exit(0)
  })
}

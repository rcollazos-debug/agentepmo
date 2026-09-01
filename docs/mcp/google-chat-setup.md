# Configuración Google Chat MCP (local)

> **Importante:** se usa un MCP **local** (`google-chat-mcp`), NO el servidor remoto
> `chatmcp.googleapis.com`. El servidor remoto de Google no es compatible con opencode
> porque Google no soporta *dynamic client registration* (RFC 7591). El MCP local maneja
> su propio OAuth por navegador y cachea el token — igual que Gmail y Calendar.

## Cómo funciona

```
opencode → google-chat-wrapper.sh → npx google-chat-mcp
                                       ↓ (primera vez)
                                     abre browser → autorizas → token cacheado
```

Credenciales y token viven en `~/.config/google-chat-mcp/` (fuera del repo).

## Setup único (solo la primera vez)

### 1. Habilitar Google Chat API
- Ir a: https://console.cloud.google.com/apis/library/chat.googleapis.com
- Habilitar **Google Chat API**

### 1b. Configurar la "Chat app" (OBLIGATORIO)
> Sin esto, cualquier llamada a la API devuelve `Error 404: Google Chat app not found`,
> aunque el OAuth esté correcto.

- Google Cloud → **Google Chat API → pestaña Configuration**
- Llenar los campos mínimos:
  - **App name:** `Vorkan PM`
  - **Avatar URL:** cualquier imagen (ej. `https://developers.google.com/chat/images/quickstart-app-avatar.png`)
  - **Description:** `Asistente PMO`
  - **Functionality:** marcar "Receive 1:1 messages" (mínimo)
  - **Connection settings:** App URL / HTTP endpoint con cualquier URL (ej. `https://example.com`)
  - **Visibility:** restringido a tu usuario
- **Save**

### 2. Configurar pantalla de consentimiento OAuth
- Google Cloud → APIs & Services → OAuth consent screen
- Tipo: **Internal** (cuenta Workspace VortexBird)
- Agregar scopes:
  - `chat.spaces`
  - `chat.messages`
  - `chat.memberships`
  - `chat.messages.reactions`
  - `userinfo.profile`
  - `directory.readonly`

### 3. Crear credenciales OAuth (tipo Web application — con puerto fijo)
- Google Cloud → Credentials → Create Credentials → OAuth client ID
- Tipo: **Web application** (NO Desktop)
- Nombre: `Google Chat MCP opencode`
- **Authorized redirect URIs → Add URI:**
  ```
  http://localhost:9090/callback
  ```
- Crear → Descargar el JSON

> ¿Por qué Web app y no Desktop? La credencial Desktop solo registra `http://localhost`
> (sin puerto) y Google exige coincidencia exacta → da `redirect_uri_mismatch` porque el
> server local usa un puerto. La credencial Web permite registrar el puerto fijo `9090`,
> que coincide exacto con el redirect que envía el paquete.

### 4. Guardar las credenciales fuera del repo
```bash
mkdir -p ~/.config/google-chat-mcp
mv ~/Downloads/client_secret_*.json ~/.config/google-chat-mcp/credentials.json
```

> Si hay varios `client_secret_*.json` en Downloads, identifica el nuevo con:
> `ls -lt ~/Downloads/client_secret_*.json` y mueve el correcto por su nombre completo.
> Verifica que el JSON contenga `"redirect_uris":["http://localhost:9090/callback"]`.

### 5. Autorizar por primera vez (a través del wrapper)
```bash
bash agents/chatpm/mcp/google-chat-wrapper.sh
```
> Usar el **wrapper**, no `npx google-chat-mcp` directo. El wrapper instala una copia
> cacheada y le aplica un parche que fuerza el redirect a `http://localhost:9090/callback`
> (puerto + path), evitando el bug del paquete que omite el puerto.

Se abre el navegador → apruebas el acceso → el token queda en `~/.config/google-chat-mcp/token.json`.
Cuando veas "Authentication successful!", cierra la pestaña y corta el proceso con `Ctrl+C`.

### 6. Reiniciar opencode
El MCP `google-chat` conecta directo usando el wrapper.

## Configuración en opencode.json (ya aplicada)
```json
"google-chat": {
  "type": "local",
  "command": ["agents/chatpm/mcp/google-chat-wrapper.sh"],
  "environment": {}
}
```

## Herramientas disponibles

| Herramienta | Descripción |
|---|---|
| `list_spaces` | Lista todos los espacios de Chat del usuario |
| `list_messages` | Lista mensajes de un espacio (por `spaceName`) |
| `get_message` | Detalle de un mensaje |
| `get_user_info` | Resuelve nombre de un usuario por ID |
| `find_dm` | Ubica conversación directa con una persona |
| `send_message` | Envía un mensaje a un espacio |
| `reply_to_thread` | Responde dentro de un hilo |

> No existe búsqueda global de mensajes — se filtra localmente sobre `list_spaces` + `list_messages`.

## Referencia
https://www.npmjs.com/package/google-chat-mcp

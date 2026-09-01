# Configuración Google Calendar MCP

## Setup único (solo la primera vez)

### 1. Habilitar Google Calendar API

- Ir a: https://console.cloud.google.com/apis/library/calendar-json.googleapis.com
- Habilitar **Google Calendar API** en tu proyecto de Google Cloud

### 2. Crear credenciales OAuth (tipo Desktop — importante)

- Google Cloud → APIs & Services → Credentials → Create Credentials → OAuth 2.0 Client ID
- Tipo: **Desktop app** (NO Web Application)
- Nombre: "Google Calendar MCP"
- Descargar el JSON de credenciales

### 3. Agregar tu email como usuario de prueba

- Google Cloud → APIs & Services → OAuth consent screen → Audience
- Agregar tu email de VortexBird como Test user
- Esperar ~2 minutos antes de continuar

### 4. Guardar las credenciales fuera del repo

```bash
mkdir -p ~/.config/google-calendar-mcp
mv ~/Downloads/client_secret_*.json ~/.config/google-calendar-mcp/gcp-oauth.keys.json
```

### 5. Autorizar por primera vez (abre el browser)

```bash
npx @cocal/google-calendar-mcp auth
```

Esto abre el browser, pides autorización con tu cuenta de Google Workspace, y guarda el token localmente. Solo se hace una vez.

### 6. Reiniciar opencode

Después del paso 5, reiniciar opencode. El MCP de Calendar debería conectar directamente sin pedir auth de nuevo.

## Notas

- Las credenciales viven en `~/.config/google-calendar-mcp/` — fuera del repo, no se sube a git
- El token generado por el paso 5 también se guarda ahí automáticamente
- En modo test, el token expira en 7 días — repetir el paso 5 si deja de funcionar
- Para producción, publicar la app en Google Cloud para tokens de larga duración

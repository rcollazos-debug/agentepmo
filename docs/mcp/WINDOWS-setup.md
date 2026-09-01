# Instalación del agente Vorkan-PM en Windows

Guía completa para correr el agente y todos sus MCP en **Windows nativo** (sin WSL).

Todos los comandos van en **PowerShell** salvo que se indique lo contrario.

---

## 1. Prerrequisitos (instalar una vez)

| Software | Para qué | Cómo instalar |
|---|---|---|
| **Node.js LTS** | gmail, calendar, metabase, google-chat | https://nodejs.org → instalador .msi (marca "Add to PATH") |
| **Python 3.11+** | notebooklm | https://www.python.org/downloads → marca "Add python.exe to PATH" |
| **uv** | instalar el MCP de notebooklm | `powershell -c "irm https://astral.sh/uv/install.ps1 | iex"` |
| **Git** | clonar el repo | https://git-scm.com/download/win |
| **opencode** | el agente | `npm install -g opencode-ai` (o el instalador oficial de Windows) |

Verifica que todo quedó en PATH (cierra y reabre PowerShell):
```powershell
node --version ; npm --version ; npx --version ; python --version ; uv --version ; opencode --version
```
Todos deben responder con una versión. Si alguno falla, reinstala marcando "Add to PATH".

---

## 2. Obtener el proyecto

```powershell
cd $HOME\Documents
git clone <URL-del-repo> PlantillaAgente
cd PlantillaAgente
```

### Activar la configuración de Windows
opencode lee `opencode.json`. Reemplázalo por la versión Windows:
```powershell
Copy-Item opencode.windows.json opencode.json -Force
```
> La versión Windows usa los wrappers `.cmd` en vez de los `.sh`.

---

## 3. Configurar cada MCP

Las credenciales viven en `%USERPROFILE%\.config\` (igual que en Mac pero bajo tu carpeta de usuario de Windows). Crea la base:
```powershell
mkdir $HOME\.config -Force
```

### 3.1 Gmail (obligatorio)
No necesita wrapper. Autoriza una vez:
```powershell
npx -y @gongrzhe/server-gmail-autoauth-mcp auth
```
Se abre el navegador → apruebas → el token queda guardado automáticamente.

### 3.2 Google Calendar
```powershell
mkdir $HOME\.config\google-calendar-mcp -Force
```
1. Crea credencial OAuth **Desktop app** para Calendar (ver `google-calendar-setup.md`).
2. Guarda el JSON como:
   ```
   %USERPROFILE%\.config\google-calendar-mcp\gcp-oauth.keys.json
   ```
3. Autoriza:
   ```powershell
   $env:GOOGLE_OAUTH_CREDENTIALS="$HOME\.config\google-calendar-mcp\gcp-oauth.keys.json"
   npx -y @cocal/google-calendar-mcp auth
   ```

### 3.3 Google Chat
Sigue `google-chat-setup.md` para crear la Chat app y la credencial **Web application** con redirect `http://localhost:9090/callback`.
```powershell
mkdir $HOME\.config\google-chat-mcp -Force
```
Guarda el JSON descargado como:
```
%USERPROFILE%\.config\google-chat-mcp\credentials.json
```
Autoriza a través del wrapper (instala la copia cacheada + aplica el parche OAuth):
```powershell
cmd /c agents\chatpm\mcp\google-chat-wrapper.cmd
```
Se abre el navegador → apruebas → cuando el proceso quede corriendo, ciérralo con `Ctrl+C`.

> Si ya tienes el `credentials.json` y `token.json` funcionando en Mac, puedes copiarlos tal cual
> a `%USERPROFILE%\.config\google-chat-mcp\` y saltarte la autorización.

### 3.4 Metabase (opcional)
Crea el archivo de credenciales:
```powershell
notepad agents\chatpm\mcp\.env
```
Contenido:
```
METABASE_URL=https://tu-metabase-real.com
METABASE_API_KEY=tu-api-key
```

### 3.5 NotebookLM
```powershell
uv tool install notebooklm-mcp-cli
```
Esto crea `notebooklm-mcp.exe` en `%USERPROFILE%\.local\bin`. Asegúrate de que esa carpeta esté en PATH:
```powershell
$env:Path += ";$HOME\.local\bin"
```
Para dejarlo permanente: Panel de Control → Editar variables de entorno → agregar `%USERPROFILE%\.local\bin` al PATH del usuario.

Autoriza (abre navegador para login de Google/NotebookLM):
```powershell
notebooklm-mcp login
```

---

## 4. Copiar credenciales existentes desde Mac (atajo)

Si ya tienes todo funcionando en Mac, en vez de reautorizar puedes copiar estas carpetas del Mac a Windows (a `%USERPROFILE%\.config\`):
- `.config\google-calendar-mcp\` (gcp-oauth.keys.json + tokens.json)
- `.config\google-chat-mcp\` (credentials.json + token.json)
- La config de Gmail: `%USERPROFILE%\.gmail-mcp\` (o donde el paquete guarde el token)

Los tokens OAuth son portables entre máquinas mientras no expiren.

---

## 5. Arrancar el agente

```powershell
cd $HOME\Documents\PlantillaAgente
opencode
```

En el primer arranque, el agente ejecuta su Protocolo de Inicio: verifica los MCP, te identifica por Gmail y te saluda por tu nombre.

---

## 6. Verificar que los MCP cargaron

Dentro de opencode, pídele al agente: *"verifica las conexiones MCP"*. Debe reportar OK en:
- ✅ Gmail
- ✅ Google Calendar
- ✅ Google Chat
- ✅ NotebookLM
- ⚠️/✅ Metabase (según tu URL)

---

## Diferencias clave Mac vs Windows

| | Mac | Windows |
|---|---|---|
| Wrappers | `.sh` (bash) | `.cmd` (batch + PowerShell) |
| Config opencode | `opencode.json` | `opencode.windows.json` → copiar a `opencode.json` |
| Rutas credenciales | `~/.config/...` | `%USERPROFILE%\.config\...` |
| Patch metabase | `sed` | PowerShell `-replace` |
| Patch google-chat | `perl` | PowerShell `-replace` |
| Cache npx | `~/.npm/_npx` | `%LOCALAPPDATA%\npm-cache\_npx` |

---

## Solución de problemas

**"npx no encontrado" al arrancar un MCP**
Node no está en PATH del proceso que lanza opencode. Reinstala Node.js marcando "Add to PATH" y reinicia el equipo.

**Google Chat: "Error 400: redirect_uri_mismatch"**
La credencial debe ser **Web application** con `http://localhost:9090/callback` registrado exacto. Ver `google-chat-setup.md`.

**Google Chat: "Error 404: Google Chat app not found"**
Falta configurar la Chat app en Google Cloud → Google Chat API → Configuration. Ver `google-chat-setup.md` paso 1b.

**notebooklm-mcp no se reconoce**
`%USERPROFILE%\.local\bin` no está en PATH. Agrégalo (ver 3.5).

**Un `.cmd` no ejecuta / permisos**
Los `.cmd` no necesitan permiso de ejecución como en Unix. Si opencode no los encuentra, verifica que la ruta en `opencode.json` use `\\` (backslash) y sea relativa a la raíz del proyecto.

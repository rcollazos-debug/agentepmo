# Guía del administrador — Distribución de Vorkan-PM

> Solo para quien administra el agente. Los PMs **no** leen esto.

## Cómo se distribuye ahora

Vorkan-PM se publica como paquete privado en **GitHub Packages** y se instala con un CLI.
Ya no se arma un ZIP a mano, y una corrección de un skill llega a todos los PMs con un comando.

```
  Tú publicas                          El PM instala
  ┌──────────────────────┐             ┌──────────────────────────┐
  │ npm publish          │──registry──▶│ bootstrap (1 vez)        │
  │ (GitHub Packages)    │   privado   │   └─ vorkanpm setup      │
  └──────────────────────┘             │ vorkanpm init (x proyecto)│
                                       │ vorkanpm update (mejoras) │
                                       └──────────────────────────┘
```

## Qué le entregas a cada PM

Una sola carpeta, por **canal privado** (Drive restringido o USB — nunca correo masivo):

```
Vorkan-PM/
├── windows.bat          ← con el token de npm ya sustituido
├── macos.sh             ← con el token de npm ya sustituido
└── credenciales/
    ├── gmail-oauth.keys.json      (opcional si Gmail y Calendar comparten cliente OAuth)
    ├── calendar-oauth.keys.json
    ├── chat-credentials.json
    ├── trilium.env                ← URL del repositorio + token ETAPI de ESE PM
    └── metabase.env               (opcional)
```

El `trilium.env` es **distinto para cada PM**, porque lleva su propio token:

```
TRILIUM_URL=https://trilium.vortexbird.com/etapi
TRILIUM_TOKEN=<token ETAPI emitido para esa persona>
```

Los bootstrap están en `bootstrap/` de este repositorio. **Antes de repartirlos**, sustituye
`TOKEN_DE_LECTURA` por el token vigente (ver abajo).

### De dónde sale cada credencial

```
~/.gmail-mcp/gcp-oauth.keys.json                   →  credenciales/gmail-oauth.keys.json
~/.config/google-calendar-mcp/gcp-oauth.keys.json  →  credenciales/calendar-oauth.keys.json
~/.config/google-chat-mcp/credentials.json         →  credenciales/chat-credentials.json
(API key de Metabase)                              →  credenciales/metabase.env
```

> Si Gmail y Calendar usan el **mismo** cliente OAuth, puedes omitir `gmail-oauth.keys.json`:
> el instalador reutiliza `calendar-oauth.keys.json` para Gmail y lo dice al hacerlo.

> ⚠️ **Nunca incluyas** `token.json`, `tokens.json` ni el `credentials.json` de `.gmail-mcp` —
> esos son **tus** sesiones personales. Cada PM genera las suyas al autorizar con su cuenta.

## El token de lectura

El paquete es privado, así que la máquina del PM necesita poder leer del registry. El bootstrap
escribe ese acceso en su `~/.npmrc`; el PM nunca teclea nada.

**Cómo emitirlo:** un **fine-grained personal access token** de GitHub con **únicamente** el
permiso `read:packages` sobre la organización, y **con fecha de caducidad**.

**Qué expone si se filtra:** la capacidad de descargar el paquete del agente. No da acceso al
código fuente, ni a datos de clientes, ni a las cuentas de Google de nadie.

**Rotación:** al caducar, los PMs verán *"No se pudo descargar Vorkan-PM"* al actualizar.
Emite uno nuevo, regenera los bootstrap y repártelos. Es el precio de mantener el contenido
privado, y es deliberado.

## El repositorio de proyectos (Trilium)

### Estructura del árbol

```
root
├── Bancoomeva                    ← nota de cliente
│   ├── 2025
│   │   └── Proyecto cerrado
│   └── 2026
│       ├── Célula Modernización  ← nota raíz del proyecto
│       │   ├── context   memory   metrics
│       │   └── data      risks    scope
│       └── WMS
└── UAO
    └── 2026
        └── Ciudad UAO
```

El año es el de **inicio del proyecto**, no el del calendario: un proyecto que cruza diciembre
se queda donde empezó. Los nodos de cliente y año **los crea el CLI solo** la primera vez que
se publica un proyecto suyo; no hay que prepararlos a mano, aunque puedes crearlos por
adelantado si quieres el árbol ordenado desde el principio.

Cada nota de proyecto lleva atributos consultables: `cliente`, `anioInicio`, `projectId`,
`pmTitular`, `estado`. Con eso se pueden hacer búsquedas como `#estado=AMARILLO #anioInicio=2026`.

Los 47 archivos de cada proyecto se guardan como notas de tipo **`code` con mime
`text/x-markdown`**: Markdown sin convertir. Se lee como fuente, no como tabla renderizada, a
cambio de que el dato no se deforme nunca y de que quien corrija algo en Trilium esté editando
exactamente lo que el agente entiende.

### Tokens ETAPI: uno por PM

Trilium **no tiene multiusuario**: una instancia es de un usuario y no hay permisos por nota.
Cualquier token lee y escribe todo el árbol. Por eso:

- **Emite un token por persona**, desde *Options → ETAPI* o con `POST /etapi/auth/login`
  (requiere la contraseña de la instancia). Así puedes revocar a una persona sin tocar al resto.
- **La barrera entre proyectos la pone el agente**, no el servidor: el servidor MCP propio
  rechaza toda escritura fuera del proyecto de la sesión. La lectura sí es libre, y es
  deliberado: consultar el histórico de otros proyectos es el motivo de tener repositorio.
- **La autoría no depende del token**: la resuelve el CLI contra Google. Si el token de la
  instalación y la cuenta de Google no coinciden, se avisa y manda Google.

### Rotación

Al revocar un token, ese PM verá un error al publicar. Emite uno nuevo, actualiza su
`trilium.env` y entrégaselo por el canal privado. Conviene rotarlos con la misma cadencia que
el token de npm.

### Pendiente de infraestructura

El servidor responde hoy por **HTTP sin TLS**: el token viaja en claro en cada petición.
Poner HTTPS con proxy inverso es condición previa a repartir tokens a los PMs.

## Publicar una versión nueva

```bash
npm version patch          # o minor / major
npm publish                # verify-package.js corre solo y aborta si algo no debe salir
```

`scripts/verify-package.js` falla si en el paquete aparece `legacy/`, `.claude/`, credenciales,
tokens, `.env` o datos de proyecto. **No lo desactives**: es lo único que impide repetir el
accidente de empaquetar datos reales.

Después, avisa a los PMs de que ejecuten:

```bash
vorkanpm update
```

## Qué se actualiza y qué no

| Se reemplaza por completo | Nunca se toca |
|---|---|
| `agents/`, `skills/`, `commands/`, `vorkan/` del directorio global de opencode | Las carpetas de proyecto de los PMs |
| La configuración global generada | Las credenciales instaladas y las autorizaciones OAuth |
| | El repositorio de Trilium |

El cuerpo instalado es **de solo lectura** para el PM. `vorkanpm doctor` avisa si alguien lo
editó a mano, porque la siguiente actualización lo sobrescribe.

## Estructura del repositorio

```
PlantillaAgente/
├── package.json          ← manifiesto del paquete (@vortexbird/vorkanpm)
├── agent/                ← CUERPO: lo que se instala en cada máquina
│   ├── agents/vorkan-pm.md
│   ├── skills/           (26)
│   ├── commands/         (30)
│   └── vorkan/           playbooks (18), knowledge, templates, assets, project-template
├── cli/                  ← el CLI: bin/ y src/{commands,lib}
├── bootstrap/            ← windows.bat y macos.sh (llevan el token)
├── scripts/              ← verify-package.js
├── docs/mcp/             ← guías de configuración de cada servidor MCP
├── openspec/             ← especificaciones de cambios
└── legacy/               ← datos y respaldo local — NUNCA se versiona ni se empaqueta
```

## Comandos que usan los PM

```
vorkanpm setup        una vez por máquina          vorkanpm publish      publica, tras aprobar
vorkanpm init         crea un proyecto             vorkanpm revisar      aportes por validar
vorkanpm join         se une a uno existente       vorkanpm titularidad  cede o toma el rol
vorkanpm estado       situación del proyecto       vorkanpm update       actualiza el agente
vorkanpm whoami       identidad verificada         vorkanpm doctor       diagnóstico
```

## Tarea de seguridad pendiente

`.claude/settings.local.json` contenía en texto plano una contraseña de Metabase, una API key y un
token de sesión, dentro de la carpeta que se empaquetaba. Ya está excluido del paquete y de git,
pero **esas credenciales deben rotarse**: pueden haber viajado en algún ZIP ya distribuido.

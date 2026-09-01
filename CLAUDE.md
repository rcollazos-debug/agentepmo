# CLAUDE.md

<!-- kaicoldev:contexto -->

## Qué es y para qué existe

`PlantillaAgente` es el **repositorio fuente y el instalador** de **Vorkan-PM**, el agente digital de
gestión de proyectos de VortexBird SAS (Cali, Colombia). No es una aplicación: es un paquete de
*prompts, skills, comandos y playbooks* en Markdown que se ejecuta sobre el CLI **opencode**, más los
scripts que dejan ese paquete funcionando en el computador de un Project Manager.

Existe porque los PMs de VortexBird no pueden instalar un agente a mano, y porque el conocimiento de
un proyecto no puede morir en la carpeta de una persona. Se publica como paquete privado
(`@vortexbird/vorkanpm`) en GitHub Packages y se instala con el CLI `vorkanpm`.

El modelo de trabajo tiene dos mitades: **cada proyecto es una carpeta local** donde el agente
escribe siempre, y **la verdad del proyecto vive en una instancia compartida de Trilium**
(`Cliente / Año de inicio / Proyecto`) donde los PMs publican con su visto bueno. Publicar es un acto
deliberado: el CLI enseña un resumen en lenguaje de negocio y espera aprobación. Cada proyecto tiene
un PM titular que valida y arbitra la línea base; los colaboradores aportan hechos, que entran
marcados como no validados, y proponen cambios de línea base sin moverla.

El agente tiene dos mandatos declarados en `agents/chatpm/agents/vorkan-pm/AGENT.md`: entregar el
proyecto al cliente con éxito y sostener el margen de VortexBird (≥ 30%). Trabaja sobre archivos
Markdown por proyecto, no sobre una base de datos, y esos archivos son el estado real del sistema.

## Quién lo usa y qué hace cada rol

- **Project Manager de VortexBird (usuario final, 6 hoy).** No es técnico. Ejecuta el bootstrap una
  vez, conecta sus cuentas de Google, y desde entonces trabaja con `vorkanpm init` o `join` y
  `opencode` dentro de la carpeta del proyecto. Le pide estado, riesgos, informes, kick-off, minutas.
  Cada PM ve **solo sus propios** correos, chats y calendario, pero **todos ven todos los proyectos**
  del repositorio: Trilium no tiene permisos por nota y la instancia es compartida a propósito.
  Consecuencia de diseño: cualquier cosa que exija terminal, PATH o editar JSON es un fallo de producto,
  no una molestia menor.
- **Administrador (Raúl Collazos, autor del repo).** Edita los skills y el `AGENT.md`, regenera el ZIP,
  arma y reparte la carpeta `credenciales/` con los clientes OAuth (pantalla de consentimiento
  *Internal* → solo cuentas `@vortexbird.com`), y da soporte. Es el único rol que lee `LEEME-ADMIN.md`.
- **El agente mismo** escribe los `.md` del proyecto dentro de la carpeta desde la que se abrió la
  sesión. Esa carpeta **es** el almacén de datos del PM, y el agente no escribe fuera de ella.

## Qué NO es

- **No es una app ni un servicio.** No hay build, ni servidor, ni tests, ni código de aplicación: hoy no
  existe un solo archivo `.js`/`.ts`/`.py` de producto fuera de generadores puntuales de PPTX.
- **No es multiusuario ni tiene backend.** Una instalación = un PM = una carpeta local. No hay sync
  entre PMs; lo único compartido son las credenciales de *cliente* OAuth, no las sesiones.
- **No es multiproyecto por conmutación.** No existe `active-project.md` ni un comando `/proyecto`:
  el proyecto es el directorio de trabajo, y para cambiar de proyecto se abre otra sesión en otra
  carpeta. Ese aislamiento es lo que hace segura la instancia compartida de Trilium.
- **No depende del servidor para funcionar.** Sin Trilium se trabaja igual; solo queda pendiente la
  publicación. El agente nunca bloquea el trabajo del PM.
- **No renderiza tablas en Trilium.** Las notas se guardan como Markdown sin convertir
  (`code` + `text/x-markdown`), a cambio de que el dato no se deforme en ningún viaje.
- **No es público.** El paquete vive en un registry privado; el contenido metodológico no sale de
  la organización.

## Stack, construcción y prueba

| Pieza | Qué es |
|---|---|
| CLI | Node.js ≥20, ESM, **sin dependencias**: `cli/bin/vorkanpm.js` + `cli/src/{commands,lib}` |
| Repositorio | Trilium (ETAPI) — servidor propio. Servidor MCP propio con 19 herramientas acotadas al proyecto de la sesión |
| Identidad | Resuelta por código contra el perfil de Gmail; el correo firma toda publicación |
| Runtime del agente | CLI **opencode**, con configuración generada por el instalador |
| Descubrimiento del agente | Directorio global de opencode (`~/.config/opencode`, `%AppData%\opencode`), que opencode fusiona con la configuración de cada proyecto |
| Contenido | Markdown en `agent/`: 26 skills, 30 comandos, 18 playbooks, plantillas y `knowledge/` |
| Modelo | `anthropic/claude-sonnet-4-5` en la configuración global generada |
| Integraciones (MCP) | Gmail, Google Calendar, Google Chat, Metabase, NotebookLM — un solo camino de código en `cli/src/commands/mcp.js` |
| Dependencias externas | Node.js ≥20 y opencode (obligatorios); Python y `uv` + `notebooklm-mcp-cli` solo para PPTX y NotebookLM |
| Generación de documentos | Python (`python-pptx`) en `skills/presentacion-kickoff/generator.py` y `templates/` |

Verificación: `node scripts/verify-package.js` comprueba que el paquete no lleva datos ni secretos.
El instalador se prueba de extremo a extremo apuntando `VORKANPM_HOME` a un directorio desechable,
lo que evita escribir en el perfil real:

```bash
VORKANPM_HOME=/tmp/prueba node cli/bin/vorkanpm.js setup --sin-autenticar --credenciales <ruta>
```

`VORKANPM_HOME` redirige **toda** la instalación —incluidas las rutas de credenciales— a un árbol
desechable. Usarlo no es opcional al probar: sin él, las pruebas escriben en el perfil real.

No hay suite de pruebas unitarias. La verificación contra Trilium y contra un `opencode` real se
hace a mano, con proyectos de usar y tirar prefijados `__ZZ` que se borran al terminar.

Estándar de trabajo: **estandar-dev v2**. Aplica de forma parcial — no hay Java/Spring ni Angular aquí —
pero sí rigen sus reglas de configuración por entorno con *fail-fast*, catálogo de variables y
prohibición de secretos y rutas absolutas en el árbol versionado.

## Restricciones conocidas

- **El PM final no tiene perfil técnico ni, en muchos casos, permisos de administrador en su equipo.**
  El instalador usa `winget` y `npm -g`; si `winget` falta, la instalación degrada a instrucciones
  manuales. Cualquier diseño nuevo debe asumir Windows 10/11 sin herramientas de desarrollo.
- **Los secretos no pueden viajar en el paquete.** Las credenciales OAuth se entregan aparte
  (`credenciales/`) y los tokens de sesión los genera cada PM. Un futuro paquete público en npm no puede
  incluirlas bajo ninguna circunstancia.
- **Ninguna ruta absoluta puede vivir en el árbol versionado.** El contenido usa el marcador
  `{{AGENT_HOME}}`, que el instalador sustituye por la ruta real de cada máquina.
- **Riesgo de seguridad abierto:** `.claude/settings.local.json` (no versionado, pero presente en la
  carpeta que se empaqueta) contiene en texto plano una contraseña de Metabase, una API key y un token
  de sesión. Debe excluirse explícitamente de cualquier empaquetado y rotarse.
- **Datos de clientes reales en `legacy/`** (respaldo de la instalación anterior). Está fuera de git y
  fuera del paquete, y `scripts/verify-package.js` falla si alguna vez se cuela.

### Pendiente de responder (no consta en ningún archivo)

1. Nombre definitivo del scope y del repositorio en GitHub Packages (`@vortexbird/vorkanpm` es la
   suposición de trabajo, ya escrita en `package.json`).
2. Si `setup` debe seguir garantizando Python: hoy solo lo usa la generación de PPTX del kick-off.
3. Política de datos sensibles del cliente dentro de las carpetas de proyecto respecto a respaldos y
   sincronización en la nube.
4. Qué clientes y años sembrar en el árbol de Trilium antes de que los PMs empiecen a publicar.

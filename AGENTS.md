# AGENTS.md — vorkan-pm · VortexBird PMO Agent

## Qué es esto

Repositorio fuente del agente de gestión de proyectos de **VortexBird**, y del CLI `vorkanpm` que
lo instala. El agente opera como **Director PMO Senior Digital** y acompaña a cada Project Manager
en la ejecución, monitoreo y control de proyectos tecnológicos.

**Doble misión:**
1. Garantizar la entrega exitosa del proyecto al cliente.
2. Maximizar la rentabilidad de VortexBird en cada proyecto.

---

## Modelo de trabajo

**El cuerpo del agente se instala una vez por máquina. Cada proyecto es una carpeta local, y
la verdad del proyecto vive en el repositorio compartido de Trilium.**

```
   Trilium (servidor de VortexBird)          <- repositorio: lo ven todos los PM
   └── Cliente / Anio de inicio / Proyecto
              ^                    |
     publicas |                    | descargas
     (con tu  |                    v
      visto   |        Carpeta local del PM  <- copia de trabajo; el agente escribe aqui
      bueno)  +------------------------------   y nunca sale de ella
```

El agente **escribe siempre en archivos locales**. Publicar es un acto aparte que requiere la
aprobación del PM, y queda firmado con su correo verificado contra Google. Si el servidor no
responde, se trabaja igual y la publicación queda pendiente.

Cada proyecto tiene un **PM titular** y puede tener colaboradores: los colaboradores aportan
hechos y mediciones, que entran marcados como no validados; sus cambios a la línea base entran
como propuesta y no la mueven.

### Cómo se instala

```
Directorio global de opencode                Carpeta del proyecto
(~/.config/opencode en macOS,                (una por proyecto, creada con vorkanpm init)
 %AppData%\opencode en Windows)
  agents/vorkan-pm.md                          project.md
  skills/  commands/                           .vorkanpm.json
  vorkan/  playbooks knowledge                 opencode.json
           templates assets                    context/ memory/ metrics/
           project-template                    data/ risks/ scope/
  opencode.json  (generado)
```

opencode fusiona ambas configuraciones y descubre el agente en cualquier carpeta, sin symlinks ni
copias por proyecto. **El directorio de trabajo es la frontera de escritura**: el agente no lee ni
escribe datos fuera de la carpeta desde la que se abrió la sesión.

---

## Estructura del repositorio

```
PlantillaAgente/
├── package.json          ← manifiesto de @vortexbird/vorkanpm
├── agent/                ← cuerpo redistribuible
│   ├── agents/vorkan-pm.md   ← definición del agente
│   ├── skills/               ← 26 skills
│   ├── commands/             ← 30 comandos
│   └── vorkan/               ← playbooks (18), knowledge, templates, assets, project-template
├── cli/                  ← bin/vorkanpm.js + src/{commands,lib}
├── bootstrap/            ← windows.bat, macos.sh
├── scripts/              ← verify-package.js
├── docs/mcp/             ← guías de los servidores MCP
├── openspec/             ← especificaciones de cambios
└── legacy/               ← datos locales y respaldo (nunca versionado ni empaquetado)
```

---

## Cómo actualizar el agente

| Qué quieres cambiar | Dónde |
|---|---|
| Comportamiento del agente | `agent/agents/vorkan-pm.md` |
| Un skill | `agent/skills/<nombre>/SKILL.md` |
| Un comando | `agent/commands/<nombre>.md` |
| Un playbook | `agent/vorkan/playbooks/<nombre>.md` |
| Estructura de un proyecto nuevo | `agent/vorkan/project-template/` |
| Servidores MCP | `cli/src/lib/config.js` y `cli/src/commands/mcp.js` |

Al terminar: `npm version patch && npm publish`, y los PMs corren `vorkanpm update`.
Ver `LEEME-ADMIN.md`.

### Reglas de rutas dentro del contenido

- Datos del proyecto → siempre `{project_path}/...`, que vale `.` (el directorio actual).
  **Nunca** `brain/` ni `projects/` ni rutas absolutas.
- Material compartido del cuerpo → `{{AGENT_HOME}}/vorkan/...`. El instalador sustituye el
  marcador por la ruta real de cada máquina.
- Recurso propio de un skill → relativo a su propio directorio, sin marcador.

---

## El CLI

```
vorkanpm setup [--credenciales <ruta>]   Deja el equipo listo (una vez por máquina)
vorkanpm init [id]                       Convierte la carpeta actual en un proyecto
vorkanpm join [nombre]                   Se une a un proyecto del repositorio
vorkanpm publish [--plan] [--si]         Publica tras aprobar el resumen
vorkanpm estado [--json]                 Situación del proyecto — lo que lee el agente al iniciar
vorkanpm whoami                          Identidad verificada contra Google
vorkanpm revisar [--validar]             Aportes de otros PM pendientes de validar
vorkanpm titularidad [--ceder|--tomar]   Consulta o cambia el PM titular
vorkanpm update [--version <v>]          Actualiza el agente sin tocar los proyectos
vorkanpm doctor                          Revisa la instalación y dice cómo arreglarla
vorkanpm mcp <servidor>                  Arranca un servidor MCP (lo invoca opencode)
```

### Reconciliación entre PMs

La naturaleza de la carpeta decide qué pasa cuando dos personas cambiaron lo mismo:
`memory/` se une por evento a tres bandas — gana quien se apartó de la base, no quien publicó
después —, `metrics/` gana la medición más reciente, `risks/` y `scope/` se fusionan por ID de
fila, y `data/` y `context/` **se paran** y decide el titular.

La base de comparación se guarda en `.vorkanpm/base/` dentro de cada carpeta de proyecto: el
hash dice que algo cambió, el contenido dice quién lo cambió.

### Formato de las notas

Los archivos se publican como notas de tipo `code` con mime `text/x-markdown`: Markdown sin
convertir. Trilium no renderiza Markdown en ningún tipo de nota, y convertir a HTML metía una
transformación con pérdida justo en el camino de vuelta — cuando el titular corrige un dato.

`VORKANPM_HOME` redirige toda la instalación a otro árbol: es lo que permite verificar el
instalador sin escribir en el perfil real de nadie.

---

## Servidores MCP

| MCP | Rol | Obligatorio |
|---|---|---|
| `gmail` | Identidad del usuario y correos del proyecto | Sí |
| `google-calendar` | Reuniones y agenda | No |
| `google-chat` | Conversaciones del equipo | No |
| `metabase` | Dashboards y métricas | No |
| `notebooklm` | Documentos del proyecto | No |
| `trilium` | Repositorio de proyectos — 19 herramientas acotadas al proyecto de la sesión | No |

Toda la lógica de arranque (PATH, credenciales, parches de los servidores) vive en
`cli/src/commands/mcp.js`, en un único camino de código para Windows y macOS.

---

*VortexBird PMO Agent — vorkan-pm*

# AGENTS.md — vorkan-pm · VortexBird PMO Agent

## Qué es esto

Repositorio del agente inteligente de gestión de proyectos de **VortexBird**. El agente opera como **Director PMO Senior Digital** y acompaña a los Project Managers en la ejecución, monitoreo y control de proyectos tecnológicos.

**Doble misión:**
1. Garantizar la entrega exitosa del proyecto al cliente.
2. Maximizar la rentabilidad de VortexBird en cada proyecto.

---

## Estructura del repositorio

```
PlantillaAgente/
├── .gitignore                        ← archivos ignorados (DS_Store, node_modules, .env)
├── AGENTS.md                         ← este archivo
├── opencode.json                     ← config de opencode (modelo + MCP servers)
├── .opencode → agents/chatpm         ← symlink para que opencode descubra el agente
│
└── agents/
    └── chatpm/                       ← directorio de trabajo del agente
        ├── CONVENCIONES.md           ← reglas de paths, data/ vs metrics/, historial
        ├── active-project.md         ← proyecto activo (cambia entre proyectos)
        │
        ├── agents/
        │   └── vorkan-pm/
        │       └── AGENT.md          ← definición del agente (identidad, protocolos, comandos)
        │
        ├── skills/                   ← 23 skills especializados
        ├── commands/                 ← 33 comandos del agente
        ├── playbooks/                ← 18 protocolos de respuesta a crisis
        ├── templates/                ← plantillas de documentos
        ├── knowledge/                ← frameworks.md, evm-guide.md
        ├── assets/                   ← logo, iconos
        ├── mcp/                      ← metabase-wrapper.sh + .env (no subir al git)
        ├── projects/                 ← un subdirectorio por proyecto activo
        └── output/                   ← archivos generados (PPTX, DOCX — gitignored)
```

---

## Cómo actualizar el agente

### Cambiar el comportamiento del agente
Editar: `agents/chatpm/agents/vorkan-pm/AGENT.md`

### Agregar o editar un skill
Editar: `agents/chatpm/skills/<nombre>/SKILL.md`

### Agregar un playbook nuevo
Crear: `agents/chatpm/playbooks/<nombre>.md`

### Agregar un comando nuevo
Crear: `agents/chatpm/commands/<nombre>.md`
Registrar el comando en: `agents/chatpm/agents/vorkan-pm/AGENT.md` (tabla de comandos)

### Cambiar el proyecto activo
Editar: `agents/chatpm/active-project.md`

### Cambiar la configuración de MCP servers
Editar: `opencode.json` (raíz del repo)

---

## MCP Servers configurados

| MCP | Herramienta | Config |
|---|---|---|
| `gmail` | Correos del proyecto | `opencode.json` |
| `google-calendar` | Reuniones y agenda | `opencode.json` |
| `metabase` | Dashboards y métricas | `opencode.json` + `mcp/metabase-wrapper.sh` |
| `notebooklm` | Documentos del proyecto | `opencode.json` |

> **Credenciales Metabase:** guardar en `agents/chatpm/mcp/.env` (nunca en git).

---

## Skills disponibles (23)

| Skill | Propósito |
|---|---|
| `recoleccion-contexto` | Cosecha automática: Gmail, Calendar, Metabase, NotebookLM |
| `analisis-contexto` | Orquestador de inicio de proyecto — entrevista + workers |
| `seguimiento-proyecto` | Monitoreo EVM y semáforo RAG |
| `gestion-riesgos` | Registro, análisis y respuesta a riesgos |
| `cronograma-control` | Control de cronograma y ruta crítica |
| `informes-ejecutivos` | Reportes para sponsors y comités |
| `control-cambios` | Gestión de CRs (Change Requests) |
| `interesados-comunicacion` | Stakeholders y plan de comunicaciones |
| `presentacion-kickoff` | Generar PPTX + DOCX de lanzamiento |
| `financiero-control` | EVM, CPI, margen VortexBird |
| `backlog-management` | Product Backlog, DoR, DoD, MoSCoW |
| `calidad-software` | QA gates, defectos, cobertura |
| `scrum-ceremonies` | Planning, Daily, Review, Retrospectiva |
| `kanban-flow` | WIP, Lead Time, Throughput |
| `cierre-proyecto` | Cierre formal y lecciones aprendidas |
| `gestion-correos` | Búsqueda, etiquetado y persistencia de correos |
| `notebooklm-knowledge` | Extrae compromisos y condiciones de documentos |
| `metabase-dashboard` | Dashboards en Metabase |
| `gestion-proveedores` | Vendors, SLA, escalación |
| `capacity-planning` | Capacidad real del equipo |
| `negociacion-cambios` | Negociación PRE-decisión de un CR |
| `deuda-tecnica` | Inventario y estrategia de deuda técnica |
| `email-intelligence` | Detección de señales débiles en emails |

---

## Comandos disponibles (33)

`/status` `/sprint` `/riesgos` `/kpis` `/cronograma` `/cambios` `/forecast`
`/comite` `/plan` `/recovery` `/atrasos` `/blockers` `/actualizar`
`/kick-off-docs` `/timeline` `/margen` `/calidad` `/backlog` `/cierre`
`/lecciones` `/dashboard` `/release` `/escalar` `/comunica`
`/daily` `/minuta` `/buscar` `/validar-proyecto` `/retro` `/1on1`
`/proyecto` `/nuevo-proyecto` `/scrum-ceremonies`

---

*VortexBird PMO Agent — vorkan-pm*

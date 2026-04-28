# AGENTS.md — ChatPM · VortexBird PMO Agent System

## Sistema de Agente PMO de VortexBird

Este repositorio contiene el sistema de agente inteligente de gestión de proyectos de **VortexBird**, empresa de desarrollo de software. El agente opera como **Director PMO Senior Digital** dentro de **ChatPM** para asistir a los Project Managers en la ejecución, monitoreo y control de proyectos tecnológicos.

**Doble misión del agente:**
1. Garantizar la entrega exitosa del proyecto al cliente.
2. Maximizar la rentabilidad de VortexBird en cada proyecto.

---

## Agentes Disponibles

| Agente | Ruta | Propósito |
|---|---|---|
| `gestion-proyectos` | `agents/chatpm/agents/gestion-proyectos/` | Director PMO Senior — gestión integral de proyectos de software |

---

## Estructura del Sistema

> El directorio de trabajo de ChatPM es `agents/chatpm/`.

```
agents/
└── chatpm/                           ← Directorio de trabajo de ChatPM
    ├── active-project.md             ← Selector de proyecto activo (project_id, project_path)
    ├── agents/
    │   └── gestion-proyectos/
    │       └── AGENT.md              ← Definición del agente (identidad, protocolos, comandos)
    ├── knowledge/                    ← Documentación de marcos (cargada bajo demanda)
    │   ├── frameworks.md             ← PMBOK 8, Scrum, Kanban, DA, SAFe
    │   └── evm-guide.md              ← Fórmulas EVM y umbrales VortexBird
    ├── playbooks/                    ← Protocolos de respuesta a situaciones críticas (compartidos)
    ├── templates/                    ← Plantillas de documentos (compartidas)
    ├── projects/
    │   └── {project_id}/             ← Un directorio por proyecto
    │       ├── context/              ← Contexto permanente del proyecto
    │       ├── memory/               ← Memoria persistente del agente
    │       ├── metrics/              ← Métricas y dashboard ejecutivo
    │       ├── risks/                ← Registro de riesgos y análisis
    │       ├── scope/                ← Gestión del alcance
    │       └── data/                 ← Datos del proyecto (cronograma, backlog, etc.)
    ├── commands/                     ← Comandos ejecutables por el usuario
    └── skills/                       ← Skills especializados del agente
```

---

## Carpetas Detalladas

### `/context/` — Contexto del Proyecto
| Archivo | Propósito |
|---|---|
| `proyecto-base.md` | Ficha técnica del proyecto — datos de identificación, fechas, presupuesto, alcance, tecnología |
| `contextocliente.md` | Contexto del cliente (espejo de proyecto-base.md) |
| `vortexbird.md` | Contexto de VortexBird — modelo de negocio, márgenes, reglas comerciales |
| `stakeholders.md` | Mapa de interesados, plan de comunicaciones |
| `restricciones.md` | Restricciones, supuestos, dependencias externas |
| `contrato.md` | Modelo contractual, condiciones de pago, penalizaciones |
| `propuesta-economica.md` | Propuesta económica del proyecto |
| `alcance-altonivel.md` | Alcance resumido de alto nivel |
| `capacidaddelequipo.md` | Capacidad disponible del equipo |
| `equipodetrabajodev.md` | Equipo de desarrollo — roles y disponibilidad |
| `equipodetrabajopm.md` | Equipo de gestión (PM) |
| `equipodetrabajoqa.md` | Equipo de QA |
| `equipodetrabajoro.md` | Roles de operaciones |

### `/memory/` — Memoria del Agente
| Archivo | Propósito |
|---|---|
| `historial.md` | Línea de tiempo del proyecto — eventos, decisiones, cambios |
| `compromisos.md` | Todos los compromisos activos con fecha y responsable |
| `decisiones.md` | Decisiones formales tomadas en el proyecto |
| `riesgo.md` | Resumen de riesgos activos para acceso rápido |
| `actasdeentrega.md` | Entregables formalmente aceptados por el cliente |
| `actasdereunion.md` | Minutas de reuniones |
| `correo.md` | Registro de correos relevantes y sus decisiones |
| `contextoclienteproyecto.md` | Contexto acumulado del cliente durante el proyecto |
| `lecciones.md` | Lecciones aprendidas del proyecto |

### `/metrics/` — Métricas del Proyecto
| Archivo | Propósito |
|---|---|
| `dashboard.md` | Panel de control consolidado — semáforo RAG + KPIs principales |
| `cronograma.md` | SPI, SV, variaciones de cronograma, tendencias |
| `financiero.md` | CPI, CV, EAC, VAC, TCPI, margen VortexBird |
| `calidad.md` | Defectos, cobertura, retrabajo, CSAT |
| `delivery.md` | Velocidad, throughput, burndown, lead time |
| `capacidad.md` | Utilización del equipo por rol |
| `riesgos.md` | KPIs de gestión de riesgos |

### `/playbooks/` — Protocolos de Respuesta a Crisis
| Archivo | Activador |
|---|---|
| `atraso-cronograma.md` | SPI < 0.85 |
| `recuperacion-proyecto.md` | Crisis sostenida — SPI < 0.75 / semáforo rojo > 1 mes |
| `crisis-produccion.md` | Incidente en producción |
| `cliente-ausente.md` | Cliente no responde / bloquea decisiones |
| `cambio-alcance.md` | Scope creep o CR mayor |
| `proveedor-incumplido.md` | Proveedor falla en compromisos |
| `qa-colapsado.md` | QA en colapso — cola de defectos insostenible |
| `conflicto-stakeholders.md` | Conflicto entre interesados del proyecto |
| `realese-riesgo.md` | Release de alto riesgo a producción |
| `steering-committe.md` | Preparación de comité directivo |
| `deuda-tecnica.md` | Deuda técnica bloqueante que reduce velocidad |
| `presupuesto-critico.md` | CPI < 0.85 — margen VortexBird en riesgo |
| `recursos-criticos.md` | Pérdida o crisis de recurso clave del equipo |
| `gestion-riesgos.md` | Riesgo Score ≥ 0.40 sin plan de respuesta |

### `/risks/` — Gestión de Riesgos
| Archivo | Propósito |
|---|---|
| `risk-register.md` | Registro central de riesgos con P×I scoring |
| `top-risks.md` | Top 5-10 riesgos activos para visibilidad ejecutiva |
| `risk-heatmap.md` | Mapa de calor de riesgos |
| `assumptions.md` | Supuestos que si fallan se convierten en riesgos |
| `technical-risks.md` | Riesgos técnicos específicos del proyecto |
| `delivery-risks.md` | Riesgos de entrega y cronograma |
| `stakeholder-risks.md` | Riesgos asociados a interesados |
| `vendor-risks.md` | Riesgos de proveedores externos |
| `security-risks.md` | Riesgos de seguridad del sistema |
| `opportunities.md` | Oportunidades identificadas (riesgos positivos) |

### `/scope/` — Gestión del Alcance
| Archivo | Propósito |
|---|---|
| `alcancedetallado.md` | Alcance detallado y validado del proyecto |
| `alcancetecnico.md` | Alcance técnico — arquitectura, componentes, integraciones |
| `exclusionesalcance.md` | Exclusiones formales del alcance |

### `/templates/` — Plantillas de Documentos
| Archivo | Propósito |
|---|---|
| `acta-inicio.md` | Plantilla de Acta de Constitución del Proyecto |
| `status-report.md` | Plantilla de Status Report ejecutivo |
| `informe-semanal.md` | Plantilla de informe semanal operativo |
| `plan-trabajo.md` | Plantilla de plan de trabajo |
| `steering-committee.md` | Plantilla de presentación de comité directivo |
| `cronograma-cliente.md` | Plantilla de cronograma para el cliente |
| `presentacion-kickoff.md` | Plantilla de presentación de Kick-off |
| `generar_kickoff_pptx.py` | Script Python para generar presentación PPTX |

### `/data/` — Datos del Proyecto
| Archivo | Propósito |
|---|---|
| `acta-inicio.md` | Acta de inicio del proyecto completada |
| `backlog.md` | Product Backlog con historias de usuario |
| `sprint-actual.md` | Sprint en curso — plan, compromisos, burndown |
| `velocidad.md` | Historial de velocidad del equipo por sprint |
| `cronograma.md` | Cronograma maestro del proyecto |
| `presupuesto.md` | Presupuesto detallado con consumo real |
| `cambios.md` | Log de solicitudes de cambio (CRs) |
| `dependencias.md` | Dependencias externas del proyecto |
| `recursos.md` | Recursos del equipo y disponibilidad |
| `proveedores.md` | Registro de proveedores externos |
| `realeses.md` | Plan y historial de releases |
| `riesgos-iniciales.md` | Riesgos identificados en el Risk Workshop inicial |
| `alcance-detallado.md` | Alcance detallado negociado |
| `minutas.md` | Minutas de reuniones |

### `/commands/` — Comandos del Agente
| Comando | Propósito |
|---|---|
| `/status` | Estado integral del proyecto con semáforo RAG |
| `/sprint` | Planning, review o retrospectiva del sprint |
| `/riesgos` | Análisis y actualización del registro de riesgos |
| `/kpis` | Dashboard de métricas clave |
| `/cronograma` | Revisión del cronograma y variaciones |
| `/cambios` | Gestión de solicitudes de cambio (CR) |
| `/forecast` | Proyección de entrega y fin del proyecto |
| `/comite` | Preparar agenda y presentación de comité directivo |
| `/plan` | Generar o actualizar el plan de trabajo |
| `/recovery` | Plan de recuperación de proyecto en crisis |
| `/atrasos` | Análisis y plan de acción para atrasos |
| `/blockers` | Revisar y desbloquear impedimentos activos |
| `/actualizar` | Registrar novedades y actualizar la memoria |
| `/kick-off-docs` | Generar presentación PPTX y Acta de Inicio DOCX |
| `/timeline` | Generar línea de tiempo visual del proyecto |
| `/margen` | Análisis financiero y margen VortexBird |
| `/calidad` | Gate de calidad — estado de defectos y DoD |
| `/backlog` | Gestionar y priorizar el backlog del producto |
| `/cierre` | Proceso de cierre formal del proyecto |
| `/lecciones` | Generar o revisar lecciones aprendidas |
| `/proyecto [nombre]` | Cambiar el proyecto activo en `active-project.md` |

### `/skills/` — Skills del Agente
| Skill | Propósito |
|---|---|
| `analisis-contexto` | Recopilar y estructurar el contexto completo del proyecto |
| `seguimiento-proyecto` | Monitoreo integral con EVM y semáforo RAG |
| `gestion-riesgos` | Identificación, análisis y gestión de riesgos |
| `cronograma-control` | Control del cronograma, ruta crítica, opciones de recuperación |
| `informes-ejecutivos` | Generar reportes para sponsors, clientes y comités |
| `control-cambios` | Gestión formal de solicitudes de cambio (CR) |
| `interesados-comunicacion` | Gestión de stakeholders y plan de comunicaciones |
| `presentacion-kickoff` | Generar PPTX y DOCX de lanzamiento del proyecto |
| `financiero-control` | Control financiero, EVM, margen VortexBird |
| `backlog-management` | Gestión del Product Backlog, DoR, DoD, MoSCoW |
| `calidad-software` | QA gates, defectos, cobertura, release checks |
| `scrum-ceremonies` | Facilitar Planning, Daily, Review y Retrospectiva |
| `kanban-flow` | Gestión de flujo Kanban, WIP, Lead Time, Throughput |
| `cierre-proyecto` | Cierre formal, actas de entrega, lecciones aprendidas |

---

## MCP Servers Configurados

| MCP | Propósito | Estado |
|---|---|---|
| `gmail` | Acceso a Gmail — búsqueda y lectura de correos del proyecto | Auto-auth OAuth |
| `notebooklm` | NotebookLM — síntesis de documentos, conocimiento del proyecto | Ver setup abajo |
| `metabase` | Metabase — consultas a dashboards y datos analíticos | Credenciales en `mcp/.env` |
| `google-calendar` | Google Calendar — reuniones y agenda del proyecto | OAuth PKCE |

### NotebookLM MCP Setup

El MCP de NotebookLM usa [`notebooklm-mcp-cli`](https://github.com/jacob-bd/notebooklm-mcp-cli) — integración Python nativa sin browser automation.

**Instalación (primera vez):**
```bash
# Requiere uv (instalador de Python moderno)
curl -LsSf https://astral.sh/uv/install.sh | sh

# Instalar notebooklm-mcp-cli con Python 3.12
uv tool install notebooklm-mcp-cli --python 3.12
```

**Autenticación:**
```bash
# Autenticar con cuenta Google (abre browser real, no automation)
nlm login
```

**Re-autenticación (si el MCP falla con error de auth):**
```bash
nlm login
# Reiniciar la sesión de ChatPM después
```

**Binario:** `/Users/rcollazos/.local/bin/notebooklm-mcp`

---

## Flujo de Trabajo Recomendado

### Al inicio de un proyecto nuevo:
1. Llenar `context/proyecto-base.md` con los datos del proyecto
2. Completar `context/vortexbird.md` con el modelo de negocio acordado
3. Llenar `context/stakeholders.md` con los interesados
4. Ejecutar command `/kick-off-docs` para generar Acta y Kick-off PPTX
5. Completar `data/backlog.md` con el backlog inicial (épicas e historias)
6. Generar `data/cronograma.md` con el plan de trabajo
7. Ejecutar Risk Workshop → `risks/risk-register.md`

### Cada semana de ejecución:
1. Ejecutar command `/status` para el reporte semanal
2. Si hay novedades → command `/actualizar`
3. Revisar riesgos activos → command `/riesgos`
4. Si hay CRs → command `/cambios`
5. Revisar margen → command `/margen`

### Cada sprint (si usa Scrum):
1. Sprint Planning → command `/sprint` (modo Planning)
2. Mid-sprint → command `/sprint` (modo Review)
3. Fin de sprint → command `/sprint` (modo Retrospectiva)

### Ante una crisis:
1. Determinar el playbook aplicable
2. Activar el playbook correspondiente
3. Ejecutar command `/recovery` si es crisis sostenida

### Al cierre del proyecto:
1. Command `/calidad` → verificar gate de calidad final
2. Command `/cierre` → proceso completo de cierre
3. Command `/lecciones` → documentar aprendizajes
4. Command `/margen` → margen final del proyecto

---

*VortexBird PMO Agent System — Entregamos tecnología, construimos relaciones.*

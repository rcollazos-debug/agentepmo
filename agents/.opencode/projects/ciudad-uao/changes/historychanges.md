# HISTORIAL DE CAMBIOS DEL AGENTE

> Registro de todas las modificaciones estructurales al sistema del agente PMO.

---

## v2.0 — 16 de abril de 2026 — Restructuración Mayor

**Ejecutado por:** Raul Collazos (VortexBird)

### Archivos NUEVOS creados

- `context/proyecto-base.md` — alias de contextocliente.md para resolver referencias rotas en skills
- `context/vortexbird.md` — contexto completo de VortexBird: modelo de negocio, márgenes, reglas comerciales
- `skills/financiero-control/SKILL.md` — control financiero y protección del margen VortexBird
- `skills/backlog-management/SKILL.md` — gestión del backlog con DoR, DoD, MoSCoW, WSJF
- `skills/calidad-software/SKILL.md` — QA gates, gestión de defectos, cobertura, pipeline DEV→QA→UAT→PROD
- `skills/scrum-ceremonies/SKILL.md` — facilitar Planning, Daily, Review y Retrospectiva
- `skills/kanban-flow/SKILL.md` — WIP limits, Lead Time, Cycle Time, CFD, priorización WSJF
- `skills/cierre-proyecto/SKILL.md` — cierre formal, acta de entrega, lecciones, propuesta continuidad
- `commands/margen.md` — análisis financiero y margen VortexBird
- `commands/calidad.md` — gate de calidad del proyecto
- `commands/cierre.md` — proceso de cierre formal
- `commands/lecciones.md` — generación de lecciones aprendidas
- `commands/backlog.md` — gestión del product backlog
- `playbooks/deuda-tecnica.md` — protocolo para deuda técnica bloqueante
- `playbooks/presupuesto-critico.md` — protocolo para CPI < 0.85 / margen en riesgo
- `playbooks/recursos-criticos.md` — protocolo para pérdida de recurso clave
- `memory/lecciones.md` — registro de lecciones aprendidas del proyecto
- `data/sprint-actual.md` — sprint en curso con plan, burndown y compromisos
- `data/velocidad.md` — historial de velocidad del equipo por sprint

### Archivos REESCRITOS completamente

- `AGENT.md` — VortexBird focus, profit mandate, SAFe, Disciplined Agile, Kanban, 21 commands, 14 skills, playbooks expandidos
- `skills/analisis-contexto/SKILL.md` — reescrito de cero como skill experto completo con protocolo detallado
- `AGENTS.md` (raíz) — documentación completa del sistema: 112 archivos, estructura detallada, flujos de trabajo

### Resultado final del sistema v2.0

| Componente | v1.0 | v2.0 |
|---|---|---|
| Archivos totales | ~90 | 112 |
| Skills | 6 (1 roto) | 14 operativos |
| Commands | 14 | 21 |
| Playbooks | 10 | 13 |
| Contexto | Sin VortexBird | Con VortexBird + modelo negocio |
| Margen VortexBird | No monitoreado | Monitoreo activo en todo el sistema |
| Frameworks | PMBOK + Scrum básico | PMBOK 8 + Scrum + Kanban + SAFe + DA |
| Archivos de datos | Sin sprint-actual ni velocidad | sprint-actual.md + velocidad.md completos |

---

## v1.0 — 15 de abril de 2026 — Configuración inicial

**Ejecutado por:** Raul Collazos (VortexBird)

Configuración inicial del agente con proyecto Conde.
Base: PMBOK 8 + Scrum + 6 skills + 14 commands + 10 playbooks.
Proyecto Conde: Java/Spring Boot + Angular, microservicios, go-live 30-sep-2026.

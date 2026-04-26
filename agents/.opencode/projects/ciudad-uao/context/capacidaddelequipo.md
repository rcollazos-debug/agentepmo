# CAPACIDAD DISPONIBLE DEL EQUIPO

> Registro de horas semanales disponibles por persona para este proyecto.
> El agente usa este archivo para calcular la capacidad real de cada sprint y detectar riesgos de sobrecarga.
> Proyecto: **Conde**
> Actualizado: [fecha]

---

## Reglas de Capacidad VortexBird

- **Jornada laboral estándar:** 8 horas/día × 5 días = 40 horas brutas por semana
- **Factor de eficiencia (tiempo efectivo de desarrollo):** 70% → 28 horas efectivas/semana
- **Horas descontadas por ceremonias Scrum (sprint 2 semanas):** ~6 horas/sprint (~3h/semana)
- **Horas efectivas de desarrollo neto por sprint:** Capacidad real × 2 semanas − ceremonias

---

## Equipo Asignado al Proyecto

| Nombre | Rol | % Dedicación a este proyecto | Horas brutas/semana | Horas efectivas/semana | Horas netas disponibles/semana |
|---|---|---|---|---|---|
| [Nombre] | Tech Lead | [X]% | [N h] | [N × 0.70 h] | [Neto tras ceremonias] |
| [Nombre] | Backend Developer | [X]% | [N h] | [N × 0.70 h] | |
| [Nombre] | Backend Developer | [X]% | [N h] | [N × 0.70 h] | |
| [Nombre] | Frontend Developer | [X]% | [N h] | [N × 0.70 h] | |
| [Nombre] | QA Engineer | [X]% | [N h] | [N × 0.70 h] | |
| [Nombre] | Project Manager | [X]% | [N h] | [N × 0.70 h] | |
| [Nombre] | Analista de Reqs | [X]% | [N h] | [N × 0.70 h] | |
| **TOTAL EQUIPO** | | | **[N h/sem]** | **[N h/sem]** | **[N h/sem]** |

---

## Capacidad por Sprint (2 semanas)

| Nombre | Rol | Horas disponibles/sprint | SP estimados/sprint | Observaciones |
|---|---|---|---|---|
| [Nombre] | Tech Lead | [N h] | [N SP] | |
| [Nombre] | Backend | [N h] | [N SP] | |
| [Nombre] | Backend | [N h] | [N SP] | |
| [Nombre] | Frontend | [N h] | [N SP] | |
| [Nombre] | QA | [N h] | [N SP] | |
| **TOTAL** | | **[N h/sprint]** | **[N SP/sprint]** | |

**Velocidad inicial estimada del equipo:** [N] Story Points por sprint
**Referencia de calibración:** 1 SP ≈ [N] horas de trabajo efectivo

---

## Ajustes de Capacidad por Periodo

> Registrar aquí las variaciones de disponibilidad por vacaciones, licencias, festivos, etc.

| Persona | Periodo | Reducción de capacidad | Motivo | Impacto en sprint |
|---|---|---|---|---|
| [Nombre] | [fecha inicio] - [fecha fin] | -[N] h/sem | [Vacaciones / Licencia / Festivos] | Sprint [N]: -[N] SP |
| [Nombre] | [fecha inicio] - [fecha fin] | -[N] h/sem | | |

---

## Capacidad Total del Proyecto (Resumen)

| Métrica | Valor |
|---|---|
| Total semanas de proyecto | [N semanas] |
| Total sprints planificados | [N sprints] |
| Capacidad total disponible del proyecto | [N horas totales] |
| Story Points totales disponibles | [N SP] |
| Story Points del backlog (estimados) | [N SP] |
| Holgura / Déficit de capacidad | [+N SP holgura / −N SP déficit] |

---

## Reglas de Alerta de Capacidad

| Alerta | Condición | Acción del PM |
|---|---|---|
| 🟡 Sobrecarga individual | Persona > 100% dedicación planificada | Redistribuir tareas o negociar con gerencia |
| 🔴 Pérdida de recurso clave | Ausencia no planificada > 5 días | Activar playbook `recursos-criticos` |
| 🟡 Capacidad del sprint < 80% de la nominal | Múltiples ausencias en sprint | Reducir alcance del sprint en Planning |
| 🔴 Capacidad total < Story Points del backlog | Déficit estructural de capacidad | Renegociar alcance o cronograma con cliente |

---

## Notas del PM

[Observaciones sobre disponibilidad real del equipo, restricciones de dedicación, compromisos en paralelo con otros proyectos, etc.]

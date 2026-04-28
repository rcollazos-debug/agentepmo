# CRONOGRAMA DEL PROYECTO

> Plan de hitos y actividades del proyecto con fechas baseline.
> Actualizar cuando se aprueban cambios de cronograma (CR formal).
> El agente lee este archivo para calcular desviaciones y generar proyecciones.

---

## Línea Base (Baseline)

| Campo | Valor |
|---|---|
| Versión del cronograma | [1.0] |
| Fecha de aprobación del baseline | [Fecha] |
| Fecha inicio del proyecto | [Fecha] |
| Fecha fin planificada | [Fecha] |
| Duración total | X días hábiles / X semanas |
| Última modificación | [Fecha] |
| Motivo de última modificación | [Descripción o CR-XXX] |

---

## Hitos del Proyecto

| ID | Hito | Fase | Fecha plan | Fecha real | Variación | Estado | Aprobador |
|---|---|---|---|---|---|---|---|
| M01 | Kick-off realizado | Inicio | [fecha] | [fecha] | 0 días | ✓ | PM |
| M02 | Acta firmada | Inicio | [fecha] | — | — | Planificado | Sponsor |
| M03 | Backlog aprobado | Planificación | [fecha] | — | — | Planificado | PO |
| M04 | Arquitectura aprobada | Planificación | [fecha] | — | — | Planificado | Tech Lead |
| M05 | MVP / Primer release | Construcción | [fecha] | — | — | Planificado | Cliente |
| M06 | Inicio UAT | Pruebas | [fecha] | — | — | Planificado | PM |
| M07 | UAT aprobado | Pruebas | [fecha] | — | — | Planificado | Cliente |
| M08 | Go-live | Entrega | [fecha] | — | — | Planificado | Sponsor |
| M09 | Cierre formal | Cierre | [fecha] | — | — | Planificado | Sponsor |

---

## Plan de Sprints

| Sprint | Inicio | Fin | Objetivo | SP comprometidos | SP completados | Estado |
|---|---|---|---|---|---|---|
| Sprint 1 | [fecha] | [fecha] | [Sprint goal] | X SP | X SP | [Estado] |
| Sprint 2 | [fecha] | [fecha] | [Sprint goal] | X SP | — | Planificado |
| Sprint 3 | [fecha] | [fecha] | [Sprint goal] | X SP | — | Planificado |

---

## Actividades por Fase

### FASE 1: INICIO
| Actividad | Inicio | Fin | Responsable | Dependencias | Estado |
|---|---|---|---|---|---|
| Elaborar acta de constitución | [fecha] | [fecha] | PM | — | [Estado] |
| Identificar stakeholders | [fecha] | [fecha] | PM | Acta | [Estado] |
| Kick-off con el cliente | [fecha] | [fecha] | PM | Acta firmada | [Estado] |

### FASE 2: PLANIFICACIÓN
| Actividad | Inicio | Fin | Responsable | Dependencias | Estado |
|---|---|---|---|---|---|
| Refinamiento del backlog | [fecha] | [fecha] | PM + PO | Kick-off | [Estado] |
| Definición de arquitectura | [fecha] | [fecha] | Tech Lead | Backlog | [Estado] |
| Plan de proyecto completo | [fecha] | [fecha] | PM | Backlog | [Estado] |

### FASE 3: CONSTRUCCIÓN
| Sprint | Actividad | Inicio | Fin | Responsable | Estado |
|---|---|---|---|---|---|
| Sprint 1 | [Descripción] | [fecha] | [fecha] | [Nombre] | [Estado] |

### FASE 4: PRUEBAS Y ENTREGA
| Actividad | Inicio | Fin | Responsable | Dependencias | Estado |
|---|---|---|---|---|---|
| UAT con el cliente | [fecha] | [fecha] | PM + Cliente | Construcción | Planificado |
| Correcciones UAT | [fecha] | [fecha] | Equipo | UAT | Planificado |
| Go-live / Despliegue | [fecha] | [fecha] | DevOps + PM | UAT aprobado | Planificado |

---

## Ruta Crítica

```
[Actividad A] → [Actividad B] → [Actividad C] → [Hito final]
Holgura total: X días
```

Tareas de la ruta crítica (holgura = 0):
| Tarea | Duración | Responsable | Riesgo |
|---|---|---|---|
| [Tarea] | X días | [Nombre] | [Descripción] |

---

## Historial de Cambios del Cronograma

| Versión | Fecha | Motivo | CR | Nueva fecha fin | Aprobado por |
|---|---|---|---|---|---|
| 1.0 | [fecha] | Baseline inicial | — | [fecha] | Sponsor |

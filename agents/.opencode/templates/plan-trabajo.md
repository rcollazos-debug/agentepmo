# PLAN DE TRABAJO - PROYECTO CONDE

> Plan de trabajo estructurado para la ejecución del proyecto.
> Basado en metodología híbrida (Scrum + Kanban).
> Versión: 1.0
> Fecha de creación: 15 de abril de 2026
> Actualizado por: Monge (PM)

---

## INFORMACIÓN GENERAL

| Campo | Valor |
|---|---|
| Proyecto | Conde |
| Cliente | Externo |
| PM | Monge |
| Tech Lead | Camilo José Delgado |
| PO/Interlocutor | Raul Collazos |
| Fecha inicio | 01-may-2026 |
| Fecha entrega | 30-sep-2026 |
| Duración | 5 meses (153 días) |
| Semáforo inicial | 🟡 AMARILLO |

---

## RESUMEN DE HITOS

| Fase | Inicio | Fin | Hito clave |
|---|---|---|---|
| Inicio | 01-may-2026 | 15-may-2026 | Acta de constitución firmada |
| Planificación | 16-may-2026 | 31-may-2026 | Backlog Refinado v1.0 |
| Construcción | 01-jun-2026 | 14-ago-2026 | MVP entregado |
| Pruebas (UAT) | 15-ago-2026 | 22-sep-2026 | Aprobación UAT |
| Cierre | 23-sep-2026 | 15-oct-2026 | Go-live + Cierre formal |

---

## FASE 1: INICIO (01-may-2026 al 15-may-2026)

### Objetivo
Establecer bases del proyecto, confirmar equipo y obtener compromisos formales.

### Actividades

| # | Actividad | Responsable | Fecha límite | Entregable | Estado |
|---|---|---|---|---|---|
| 1.1 | Reunión de kick-off con sponsor y equipo | Monge | 02-may-2026 | Acta de reunión | ⏳ |
| 1.2 | Formalizar compromiso de entrega de reqs con cliente | Raul Collazos | 05-may-2026 | Correo/Doc firmado | ⚠️ CRÍTICO |
| 1.3 | Definir canales de comunicación y horarios | Monge | 03-may-2026 | Plan de comunicaciones v1 | ⏳ |
| 1.4 | Configurar herramientas de gestión (Jira/Trello/Other) | Camilo José Delgado | 05-may-2026 | Herramientas operativas | ⏳ |
| 1.5 | Completar requisitos del cliente | Raul Collazos | 10-may-2026 | Documento de requisitos | ⏳ |
| 1.6 | Sesión de arquitectura inicial | Camilo José Delgado | 12-may-2026 | Propuesta arquitectónica | ⏳ |
| 1.7 | Definir Definition of Done (DoD) | Camilo José Delgado | 14-may-2026 | DoD documentado | ⏳ |
| 1.8 | Firmar acta de constitución del proyecto | Valeria Rivera | 15-may-2026 | Acta firmada | ⏳ |

### Dependencias
- 1.2 debe completarse antes de 1.5

### Criterio de salida
- Requisitos recibidos del cliente
- Arquitectura validada
- Equipo configurado y operativo

---

## FASE 2: PLANIFICACIÓN (16-may-2026 al 31-may-2026)

### Objetivo
Detallar alcance, crear backlog y planificar primer sprint.

### Actividades

| # | Actividad | Responsable | Fecha límite | Entregable | Estado |
|---|---|---|---|---|---|
| 2.1 | Refinamiento de requisitos | Monge + Camilo José Delgado | 20-may-2026 | Requisitos refinados | ⏳ |
| 2.2 | Crear WBS / EDT del proyecto | Monge | 22-may-2026 | WBS documentado | ⏳ |
| 2.3 | Definir épicas y features | Monge + Raul Collazos | 24-may-2026 | Backlog épico | ⏳ |
| 2.4 | Creación de historias de usuario | Equipo | 26-may-2026 | User Stories | ⏳ |
| 2.5 | Estimación de historias (Story Points) | Equipo | 28-may-2026 | Historias estimadas | ⏳ |
| 2.6 | Priorización del backlog | Raul Collazos | 29-may-2026 | Product Backlog priorizado | ⏳ |
| 2.7 | Planificar Sprint 1 | Monge + Camilo José Delgado | 31-may-2026 | Sprint 1 planificado | ⏳ |

### Dependencias
- Requiere: Requisitos completos (1.5 de Fase 1)
- Sprint 1 plan debe estar listo antes de iniciar construcción

### Criterio de salida
- Backlog priorizado con mínimo 2 sprints de historias
- Sprint 1 comprometido

---

## FASE 3: CONSTRUCCIÓN (01-jun-2026 al 14-ago-2026)

### Objetivo
Desarrollar funcionalidades del MVP de forma iterativa.

### Sprint Plan

| Sprint | Período | Objetivo | Historias objetivo | Estado |
|---|---|---|---|---|
| Sprint 1 | 01-jun al 14-jun | Setup + Core Backend | 10-15 SP | ⏳ |
| Sprint 2 | 15-jun al 28-jun | Autenticación + Módulo 1 | 15-20 SP | ⏳ |
| Sprint 3 | 29-jun al 12-jul | Módulo 2 + Integraciones | 15-20 SP | ⏳ |
| Sprint 4 | 13-jul al 26-jul | Módulo 3 + Frontend Core | 15-20 SP | ⏳ |
| Sprint 5 | 27-jul al 09-ago | Módulos restantes + QA | 15-20 SP | ⏳ |
| **MVP** | **15-jul-2026** | **Entrega MVP** | **里程碑** | ⏳ |

### Actividades transversales de construcción

| # | Actividad | Frecuencia | Responsable | Estado |
|---|---|---|---|---|
| 3.1 | Daily Standup | Diaria | Monge | ⏳ |
| 3.2 | Refinamiento | Quincenal | Monge + Camilo José Delgado | ⏳ |
| 3.3 | Sprint Review | Fin de Sprint | Monge + Equipo | ⏳ |
| 3.4 | Retrospectiva | Fin de Sprint | Monge | ⏳ |
| 3.5 | Integración continua | Diaria | Camilo José Delgado | ⏳ |
| 3.6 | Code Review | Por cada PR | Camilo José Delgado | ⏳ |
| 3.7 | Testing automatizado | Continuo | Maria + Sofia | ⏳ |

### Criterio de salida de cada sprint
- Historias en "Done" según DoD
- Pruebas unitarias passing (>80% coverage)
- Code review aprobado
- BUILD exitoso

---

## FASE 4: PRUEBAS (UAT) (15-ago-2026 al 22-sep-2026)

### Objetivo
Validar que el sistema cumple requisitos y está listo para producción.

### Actividades

| # | Actividad | Responsable | Fecha límite | Entregable | Estado |
|---|---|---|---|---|---|
| 4.1 | Preparar ambiente de UAT | Camilo José Delgado | 18-ago-2026 | Ambiente UAT listo | ⏳ |
| 4.2 | Crear casos de prueba UAT | Maria + Sofia | 20-ago-2026 | Casos de prueba | ⏳ |
| 4.3 | Ejecutar pruebas UAT | Raul Collazos (UAT) | 01-sep-2026 | Resultados UAT | ⏳ |
| 4.4 | Reportar y rastrear defectos | Monge | Continuo | Bitácora de defectos | ⏳ |
| 4.5 | Corrección de defectos críticos | Camilo José Delgado | 10-sep-2026 | Defectos críticos resueltos | ⏳ |
| 4.6 | Aprobación formal de UAT | Raul Collazos | 22-sep-2026 | Acta de aprobación UAT | ⏳ |

### Criterio de salida
- 0 defectos críticos abiertos
- Defectos menores documentados y aceptados
- Aprobación formal del cliente

---

## FASE 5: CIERRE (23-sep-2026 al 15-oct-2026)

### Objetivo
Entregar formalmente el sistema y documentar lecciones aprendidas.

### Actividades

| # | Actividad | Responsable | Fecha límite | Entregable | Estado |
|---|---|---|---|---|---|
| 5.1 | Preparar ambiente de producción | Camilo José Delgado | 25-sep-2026 | Ambiente producción listo | ⏳ |
| 5.2 | Documentación técnica | Camilo José Delgado | 27-sep-2026 | Manuales y docs | ⏳ |
| 5.3 | Capacitación al cliente | Monge | 29-sep-2026 | Sesiones de training | ⏳ |
| 5.4 | Go-Live / Deploy | Camilo José Delgado | 30-sep-2026 | Sistema en producción | ⏳ |
| 5.5 | Estabilización post-go-live | Equipo | 07-oct-2026 | Estabilización completada | ⏳ |
| 5.6 | Recopilar lecciones aprendidas | Monge | 10-oct-2026 | Documento lecciones aprendidas | ⏳ |
| 5.7 | Acta de entrega formal | Monge + Valeria Rivera | 12-oct-2026 | Acta de entrega firmada | ⏳ |
| 5.8 | Cierre administrativo | Monge | 15-oct-2026 | Cierre completo | ⏳ |

### Criterio de cierre
- Sistema funcionando en producción
- Acta de entrega firmada
- Lecciones aprendidas documentadas
- Cierre administrativo completado

---

## ACTIVIDADES CRÍTICAS - MONITOREO ESPECIAL

| # | Actividad | Responsable | Frecuencia | Observación |
|---|---|---|---|---|
| C1 | Seguimiento riesgo R-001 (retraso reqs) | Monge + Raul Collazos | Semanal | ⚠️ CRÍTICO |
| C2 | Revisión de alcance vs presupuesto | Monge | Quincenal | Evitar scope creep |
| C3 | Validación de dependencies | Camilo José Delgado | Sprint | Microservicios |
| C4 | Checkpoint con sponsor | Monge + Valeria Rivera | Quincenal | Status y decisiones |

---

## PRÓXIMAS ACCIONES INMEDIATAS

| # | Acción | Responsable | Fecha límite | Prioridad |
|---|---|---|---|---|
| 1 | Reunión kick-off | Monge | 02-may-2026 | 🔴 URGENTE |
| 2 | Solicitar compromiso formal de reqs al cliente | Raul Collazos | 05-may-2026 | 🔴 URGENTE |
| 3 | Configurar herramientas de gestión | Camilo José Delgado | 05-may-2026 | Alta |
| 4 | Definir horarios de standup | Monge | 03-may-2026 | Alta |

---

## HISTORIAL DE CAMBIOS

| Fecha | Versión | Cambio | Autor |
|---|---|---|---|
| 15-abr-2026 | 1.0 | Creación inicial del plan | Monge (PM) |

---

**Próxima revisión:** 01-may-2026 (post kick-off)

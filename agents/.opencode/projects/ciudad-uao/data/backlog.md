# PRODUCT BACKLOG — Ciudad UAO

> Proyecto: Ciudad UAO | Cliente: UAO | PM: Raul Collazos
> Actualizado: 19-abr-2026 | Metodología: Scrum 2 semanas

---

## Épicas

| ID | Épica | Descripción | Prioridad |
|---|---|---|---|
| EP-001 | Gestión Académica | Módulos core de gestión académica (matrículas, notas, pensum) | Must Have |
| EP-002 | Gestión Administrativa | Módulos administrativos (usuarios, roles, permisos) | Must Have |
| EP-003 | Reportes y Dashboard | Visualización de datos e indicadores para directivos | Should Have |
| EP-004 | Integraciones | APIs con sistemas externos UAO (por definir con cliente) | Could Have |

---

## User Stories — Backlog General

| ID | Historia | Épica | SP | MoSCoW | Criterios de Aceptación | Estado |
|---|---|---|---|---|---|---|
| US-001 | Como administrador, quiero gestionar usuarios del sistema | EP-002 | 5 | Must Have | CRUD completo, roles asignables, validación de email | Backlog |
| US-002 | Como administrador, quiero gestionar roles y permisos | EP-002 | 8 | Must Have | Matriz de permisos configurable, auditoría de cambios | Backlog |
| US-003 | Como coordinador, quiero gestionar matrículas de estudiantes | EP-001 | 8 | Must Have | Flujo completo matrícula, validación de cupos, notificación | Backlog |
| US-004 | Como docente, quiero registrar notas por período | EP-001 | 5 | Must Have | Ingreso de notas, validación de rango, cierre de período | Backlog |
| US-005 | Como estudiante, quiero consultar mi historial académico | EP-001 | 3 | Must Have | Vista historial, exportar PDF, filtros por período | Backlog |
| US-006 | Como director, quiero ver dashboard de indicadores académicos | EP-003 | 8 | Should Have | KPIs: deserción, promedio notas, % graduación | Backlog |
| US-007 | Como coordinador, quiero gestionar el pensum de programas | EP-001 | 5 | Must Have | CRUD pensum, validación de créditos, versionamiento | Backlog |
| US-008 | Como administrador, quiero gestionar la facturación estudiantil | EP-002 | 8 | Must Have | Generación de facturas, estados de pago, reportes | Backlog |

---

## DoR — Definition of Ready

Una historia está lista para el sprint cuando:
- [ ] Criterios de aceptación definidos y aprobados por PO
- [ ] Estimada en story points por el equipo
- [ ] Sin dependencias bloqueantes conocidas
- [ ] Diseño UX aprobado (si aplica)
- [ ] Acceso a datos de prueba disponibles

## DoD — Definition of Done

Una historia está terminada cuando:
- [ ] Código en rama feature, PR creado y aprobado (code review)
- [ ] Tests unitarios con coverage ≥ 80%
- [ ] Tests de integración pasando
- [ ] Deployed y verificado en ambiente DEV
- [ ] QA sign-off (pruebas funcionales completadas)
- [ ] Documentación técnica actualizada (si aplica)
- [ ] Sin bugs críticos abiertos relacionados

# CRONOGRAMA DEL PROYECTO CONDE

> Cronograma oficial para presentación al cliente.
> Versión: 1.0
> Fecha: 15 de abril de 2026
> Preparado por: Monge - Project Manager

---

## INFORMACIÓN GENERAL

| Campo | Valor |
|---|---|
| **Proyecto** | Conde |
| **Cliente** | [Nombre del Cliente] |
| **Fecha de inicio** | 01 de mayo de 2026 |
| **Fecha de entrega** | 30 de septiembre de 2026 |
| **Duración total** | 5 meses (153 días hábiles) |
| **Metodología** | Híbrida (Scrum + Kanban) |

---

## LÍNEA DE TIEMPO GENERAL

```
ABR        MAY                    JUN                    JUL
   |--------|----------------------|----------------------|--
   |                        |                        |
01-may                      01-jun                   01-jul
INICIO                      Sprint 1                  Sprint 3
                         + Construcción
   |                        |                        |
   |------------------------|------------------------|--
15-may                      14-jun                   28-jul
Fin Inicio                  Sprint 2                  Sprint 4
                             |
                             |------------------------|--
                             15-jul                  09-ago
                             MVP                      Sprint 5
                                |
                                |----------------------|--
                                15-ago                22-sep
                                UAT Start             Fin UAT
                                    |
                                    |------------------|--
                                    30-sep            15-oct
                                    GO-LIVE           CIERRE
```

---

## DESGLOSE POR FASES

### FASE 1: INICIO
**Período:** 01-may-2026 al 15-may-2026 (15 días)

| Semana | Actividades | Entregables |
|---|---|---|
| Semana 1 (01-07 May) | Kick-off, configuración de equipo, compromiso de reqs | Acta de kick-off, Plan de comunicaciones |
| Semana 2 (08-15 May) | Arquitectura inicial, definición DoD, requisitos | Propuesta arquitectónica, Documento de requisitos |

**Hito de fase:** Acta de constitución firmada (15-may-2026)

---

### FASE 2: PLANIFICACIÓN
**Período:** 16-may-2026 al 31-may-2026 (16 días)

| Semana | Actividades | Entregables |
|---|---|---|
| Semana 3 (16-21 May) | Refinamiento, WBS, definición de épicas | WBS, Backlog épico |
| Semana 4 (22-31 May) | Historias de usuario, estimación, Sprint 1 planning | User Stories, Sprint 1 planificado |

**Hito de fase:** Backlog Refinado v1.0 (31-may-2026)

---

### FASE 3: CONSTRUCCIÓN
**Período:** 01-jun-2026 al 14-ago-2026 (75 días)

#### Sprint 1: Setup y Core Backend
**Período:** 01-jun-2026 al 14-jun-2026 (2 semanas)
- Configuración de ambiente de desarrollo
- Setup de microservicios base
- Configuración de CI/CD
- Core del backend (frameworks, seguridad base)

#### Sprint 2: Autenticación y Módulo 1
**Período:** 15-jun-2026 al 28-jun-2026 (2 semanas)
- Implementación de autenticación (JWT)
- Módulo 1 backend y frontend

#### Sprint 3: Módulo 2 e Integraciones
**Período:** 29-jun-2026 al 12-jul-2026 (2 semanas)
- Módulo 2 desarrollo completo
- Integraciones con sistemas externos
- Testing de integraciones

#### Sprint 4: Módulo 3 y Frontend Core
**Período:** 13-jul-2026 al 26-jul-2026 (2 semanas)
- Módulo 3 desarrollo completo
- Frontend core (layout, navegación, componentes)
- Integración frontend-backend

#### Sprint 5: Módulos Restantes y QA
**Período:** 27-jul-2026 al 09-ago-2026 (2 semanas)
- Módulos restantes
- QA y testing
- Correcciones

**🎯 HITO IMPORTANTE: MVP (15-jul-2026)**

---

### FASE 4: PRUEBAS DE ACEPTACIÓN (UAT)
**Período:** 15-ago-2026 al 22-sep-2026 (39 días)

| Semana | Actividades | Entregables |
|---|---|---|
| Semana 11 (15-21 Ago) | Setup UAT, pruebas de regresión | Ambiente UAT listo |
| Semana 12 (22-28 Ago) | Pruebas UAT por usuario | Casos de prueba ejecutados |
| Semana 13 (29 Ago-04 Sep) | Reporte de defectos, correcciones | Bitácora de defectos |
| Semana 14 (05-11 Sep) | Correcciones, re-pruebas | Defectos resueltos |
| Semana 15 (12-18 Sep) | Pruebas finales, firma de aprobación | Aprobación formal |
| Semana 16 (19-22 Sep) | Ajustes finales | Acta de aprobación |

**Hito de fase:** Aprobación UAT (22-sep-2026)

---

### FASE 5: CIERRE
**Período:** 23-sep-2026 al 15-oct-2026 (23 días)

| Semana | Actividades | Entregables |
|---|---|---|
| Semana 16 (23-25 Sep) | Deploy a producción | Sistema en producción |
| Semana 17 (26 Sep-02 Oct) | Documentación, capacitación | Manuales, training |
| Semana 18 (03-09 Oct) | Estabilización post-go-live | Estabilización completada |
| Semana 19 (10-15 Oct) | Lecciones aprendidas, cierre formal | Acta de entrega |

**🎯 HITO FINAL: GO-LIVE (30-sep-2026)**

---

## RESUMEN DE HITOS PRINCIPALES

| # | Hito | Fecha | Entregable |
|---|---|---|---|
| 1 | Firma de acta de constitución | 15-may-2026 | Acta firmada |
| 2 | Backlog Refinado v1.0 | 31-may-2026 | Backlog priorizado |
| 3 | MVP - Entrega parcial | 15-jul-2026 | Release MVP |
| 4 | Inicio UAT | 15-ago-2026 | Ambiente UAT |
| 5 | Aprobación UAT | 22-sep-2026 | Acta de aprobación |
| 6 | **GO-LIVE** | **30-sep-2026** | **Sistema en producción** |
| 7 | Cierre formal | 15-oct-2026 | Acta de entrega |

---

## CEREMONIAS SCRUM

| Ceremonia | Frecuencia | Duración | Participantes |
|---|---|---|---|
| Daily Standup | Diaria | 15 min | Equipo |
| Sprint Planning | Inicio de Sprint | 2 horas | Equipo + PO |
| Refinamiento | Quincenal | 1 hora | Equipo + PO |
| Sprint Review | Fin de Sprint | 1 hora | Equipo + PO + Cliente |
| Retrospectiva | Fin de Sprint | 1 hora | Equipo |

---

## REUNIONES CON EL CLIENTE

| Reunión | Frecuencia | Formato | Contenido |
|---|---|---|---|
| Sprint Review | Cada 2 semanas | Demo | Avance del sprint |
| Status Report | Quincenal | Documento | Estado general del proyecto |
| Comité Directivo | Mensual | Reunión | Revisón ejecutiva |
| Reuniones ad-hoc | Según necesidad | — | Decisiones, cambios |

---

## NOTAS IMPORTANTES

1. **Entrega de Requisitos:** El cliente se compromete a entregar los requisitos completos antes del 10-may-2026.

2. **Disponibilidad para UAT:** El cliente debe garantizar disponibilidad para pruebas UAT a partir del 15-ago-2026.

3. **Cambios de Alcance:** Cualquier cambio de alcance será gestionado mediante Control de Cambios formal.

4. **Contingencia:** Se ha reservado 10% del presupuesto para riesgos identificados.

---

**Preparado por:**

Monge
Project Manager

**Fecha:** 15 de abril de 2026

**Aprobación:**

_________________________________
Raul Collazos
Product Owner / Interlocutor

_________________________________
Valeria Rivera
Sponsor


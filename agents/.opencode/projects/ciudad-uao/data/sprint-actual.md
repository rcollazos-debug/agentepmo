# TABLERO DE SEGUIMIENTO POR SPRINT — Ciudad UAO

> Tablero Kanban/Sprint para seguimiento del proyecto
> Metodología: Híbrido (Scrum + Kanban)
> Actualizado: 18-abr-2026

---

## CONFIGURACIÓN DEL TABLERO

### team
| Rol | Nombre | Capacidad/sprint |
|---|---|---|
| PM | Raul Collazos | 1 |
| Tech Lead | Pedro | 1 |
| Desarrollador | Maria | 1 |
| Desarrollador | Sofia | 1 |
| QA | Juan | 1 |

**Total capacidad:** 5 historias/sprint

### SPRINTS PLANIFICADOS

| Sprint | Fechas | Duración | Meta |
|---|---|---|---|
| Sprint 1 | 18-abr - 02-may | 2 semanas | Setup + Requisitos |
| Sprint 2 | 03-may - 17-may | 2 semanas | Diseño + Arquitectura |
| Sprint 3 | 18-may - 31-may | 2 semanas | Desarrollo MVP |
| Sprint 4 | 01-jun - 14-jun | 2 semanas | Desarrollo MVP |
| Sprint 5 | 15-jun - 28-jun | 2 semanas | Testing MVP |
| Sprint 6 | 29-jun - 12-jul | 2 semanas | UAT + Fixes |
| Sprint 7 | 13-jul - 26-jul | 2 semanas | Mejoras |
| Sprint 8 | 27-jul - 09-ago | 2 semanas | Testing final |
| Sprint 9 | 10-ago - 23-ago | 2 semanas | UAT final |
| Sprint 10 | 24-ago - 31-ago | 1 semana | Release + Cierre |

**Total:** 10 sprints (19 semanas)

---

## TABLERO KANBAN ACTUAL

### SPRINT EN CURSO: Sprint 1

**Período:** 18-abr - 02-may-2026
**Estado:** 🔄 En curso
**Fecha:** 18-abr-2026

```
┌─────────────────────────────────────────────────────────────────────────────────┐
│                         SPRINT 1 — CIUDAD UAO                                   │
├─────────────────────────────────────────────────────────────────────────────────┤
│                                                                             │
│  BACKLOG        │  TO DO         │  IN PROGRESS   │  CODE REVIEW  │  DONE         │
│  ═════════    │  ═══════      │  ══════════    │  ══════════   │  ═════       │
│               │               │               │              │              │
│  ┌─────────┐  │  ┌─────────┐  │  ┌─────────┐  │  ┌───────┐  │  ┌─────┐  │
│  │ [PENDING]│  │  │         │  │  │         │  │        │  │      │  │
│  │Reqs     │  │  │         │  │  │         │  │        │  │      │  │
│  └─────────┘  │  └─────────┘  │  └─────────┘  │  └───────┘  │  └─────┘  │
│               │               │               │              │              │
│  WIP: ∞       │  WIP: 3       │  WIP: 3       │  WIP: 2      │            │
│               │               │               │              │              │
│  [Entrar]     │  [En progreso]│  [Activo]     │  [Revisión] │  [Hecho]    │
│               │               │               │              │              │
└─────────────────────────────────────────────────────────────────────────────────┘
```

---

## WIP LIMITS

| Columna | WIP Máximo | Justificación |
|---|---|---|
| TO DO | 3 | 1 por miembro del equipo |
| IN PROGRESS | 3 | 1 por desarrollador |
| CODE REVIEW | 2 | 1 Tech Lead, 1 Developer |
| QA | 2 | 1 QA, 1 Developer |
| DONE | ∞ | Sin límite |

---

## MÉTRICAS DEL SPRINT

### Sprint 1 (18-abr - 02-may)

| Métrica | Valor | Meta | Estado |
|---|---|---|---|
| Capacidad | 5 | — | ✅ |
| Stories comprometidas | 3 | 3-5 | ⏳ |
| Stories completadas | 0 | — | — |
| velocity | — | 3-5 | — |
| Burndown | 0% | 100% | 🔴 |

---

## SPRINTS FUTUROS

### Sprint 2 (03-may - 17-may)

```
┌─────────────────────────────────────────────────┐
│  SPRINT 2 — DISEÑO + ARQUITECTURA                │
├─────────────────────────────────────────────────┤
│  Meta: Arquitectura definida, BD diseñada       │
│  Stories: 4 programadas                       │
│  Estado: ⏳ Pendiente                         │
└─────────────────────────────────────────────────┘
```

### Sprint 3-4 (18-may - 14-jun)

```
┌─────────────────────────────────────────────────┐
│  SPRINT 3-4 — DESARROLLO MVP                    │
├─────────────────────────────────────────────────┤
│  Meta: MVP funcional                           │
│  Stories: 10 programadas                      │
│  Estado: ⏳ Pendiente                         │
└─────────────────────────────────────────────────┘
```

### Sprint 5-6 (15-jun - 12-jul)

```
┌─────────────────────────────────────────────────┐
│  SPRINT 5-6 — TESTING + UAT                     │
├─────────────────────────────────────────────────┤
│  Meta: MVP en pruebas de usuario                │
│  Stories: 8 programadas                        │
│  Estado: ⏳ Pendiente                         │
└─────────────────────────────────────────────────┘
```

### Sprint 7-10 (13-jul - 31-ago)

```
┌─────────────────────────────────────────────────┐
│  SPRINT 7-10 — MEJORAS + RELEASE                │
├─────────────────────────────────────────────────┤
│  Meta: Go-live                                │
│  Stories:剩余 historias                      │
│  Estado: ⏳ Pendiente                         │
└─────────────────────────────────────────────────┘
```

---

## LEYENDA

| Símbolo | Significado |
|---|---|
| ⏳ | Pendiente |
| 🔄 | En progreso |
| ✅ | Completado |
| ⚠️ | Bloqueado |
| 🔴 | Crítico |
| 🟡 | Advertencia |
| 🟢 | OK |

---

## PRÓXIMAS ACCIONES

| # | Acción | Responsable | Fecha |
|---|---|---|
| 1 | Definir stories del Sprint 1 | Raul Collazos | 20-abr |
| 2 | Obtener requisitos del cliente | Raul Collazos | 25-abr |
| 3 | Setup ambiente de desarrollo | Pedro | 25-abr |
| 4 | Iniciar desarrollo | Equipo | 27-abr |

---

*Tablero actualizado: 18-abr-2026*
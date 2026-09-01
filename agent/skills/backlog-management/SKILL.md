---
name: backlog-management
description: Construye, prioriza y mantiene el Product Backlog garantizando que el equipo siempre trabaje en lo que genera mayor valor al cliente y maximiza la eficiencia de cada sprint o iteración.
---

# SKILL: Gestión del Backlog del Producto

## Propósito

Construir, priorizar y mantener el Product Backlog como el motor del delivery del proyecto. Un backlog bien gestionado garantiza que el equipo siempre trabaje en lo que genera mayor valor al cliente y maximiza la eficiencia de cada sprint o iteración.

---

## Base PMBOK 8 + Marcos Ágiles

- **Dominio:** Entrega (Delivery Performance Domain) + Planificación
- **Marcos:** Scrum, Disciplined Agile, SAFe
- **Principios aplicados:**
  - Enfocarse en el valor
  - Construir calidad en los procesos
  - Adaptar el enfoque según el contexto
  - Habilitar el cambio para lograr el estado futuro previsto

---

## Cuándo Activar este Skill

- Se necesita crear o priorizar el backlog inicial
- Antes de una sesión de Sprint Planning
- Se requiere una sesión de Backlog Refinement (grooming)
- El backlog tiene historias ambiguas o sin criterios de aceptación
- El cliente solicita una nueva funcionalidad (evaluar y ubicar en el backlog)
- Command `/backlog` activado

---

## Protocolo de Ejecución

### Paso 1 — Leer fuentes de información

```
{project_path}/data/backlog.md
{project_path}/data/sprint-actual.md
{project_path}/context/proyecto-base.md
{project_path}/context/restricciones.md
{project_path}/data/cronograma.md
{project_path}/memory/compromisos.md
```

---

### Paso 2 — Estructura del Backlog

#### Jerarquía de requerimientos

**Modo Scrum / DA:**
```
Épica (Epic) → Feature → Historia de Usuario (User Story) → Tarea Técnica
```

**Modo SAFe:**
```
Epic → Feature → Story → Task
(Portfolio → Program → Team)
```

**Modo Kanban:**
```
Item de trabajo → Subtarea
(Sin jerarquía rígida — flujo continuo)
```

#### Formato de Historia de Usuario

```
ID: US-[NNN]
Como [rol de usuario],
quiero [acción o funcionalidad],
para [beneficio o valor de negocio].

Criterios de Aceptación:
- Dado [contexto], cuando [acción], entonces [resultado esperado]
- Dado [contexto], cuando [acción], entonces [resultado esperado]
- [...]

Módulo: [nombre del módulo o épica]
Prioridad: [Must / Should / Could / Won't] (MoSCoW)
Estimación: [X Story Points]
Estado: [Sin refinar / Listo / En Sprint / Completada]
Sprint: [N o Backlog]
Dependencias: [US-XXX o N/A]
```

---

### Paso 3 — Priorización con MoSCoW

Clasificar cada historia:

| Prioridad | Definición | Acción |
|---|---|---|
| **Must Have** | Sin esto, el proyecto fracasa. No negociable. | Sprint lo antes posible |
| **Should Have** | Importante pero hay workaround temporal | Sprint siguiente si Must está cubierto |
| **Could Have** | Deseable pero no crítico — entra si hay capacidad | Backlog - entrada condicional al sprint |
| **Won't Have (this time)** | Fuera del alcance actual — posible Fase 2 | Documentar para propuesta futura |

**Regla de composición del sprint:**
- 70% Must Have
- 20% Should Have
- 10% Could Have (si la capacidad lo permite)

---

### Paso 4 — Definition of Ready (DoR)

Una historia está **Ready para entrar al sprint** cuando:

- [ ] Está escrita en formato "Como [rol], quiero [funcionalidad], para [beneficio]"
- [ ] Tiene al menos 2 criterios de aceptación verificables
- [ ] Fue estimada por el equipo (Planning Poker o T-shirt sizing)
- [ ] Las dependencias están identificadas y resueltas (o planificadas)
- [ ] El PO la ha priorizado en el backlog
- [ ] El Tech Lead validó la viabilidad técnica
- [ ] No tiene ambigüedades que requieran conversación adicional

Si una historia no cumple el DoR → **no puede entrar al sprint**. Vuelve a refinamiento.

---

### Paso 5 — Definition of Done (DoD)

Una historia está **Done** cuando:

- [ ] Código completo y funcional según los criterios de aceptación
- [ ] Code review aprobado por otro desarrollador
- [ ] Pruebas unitarias escritas y pasando (cobertura ≥ meta del proyecto)
- [ ] Pruebas de integración ejecutadas y pasando
- [ ] QA funcional completado sin defectos críticos ni altos abiertos
- [ ] Documentación técnica actualizada (si aplica)
- [ ] Desplegado en ambiente de staging
- [ ] Criterios de aceptación validados por PO o representante del cliente
- [ ] No genera deuda técnica nueva sin documentación

Si no cumple el DoD → **no se puede cerrar la historia**. Se devuelve al desarrollador.

---

### Paso 6 — Estimación del Backlog

#### Técnicas de estimación

**Planning Poker** (Scrum - sprints):
- Todo el equipo estima independientemente con Fibonacci: 1, 2, 3, 5, 8, 13, 21
- Si hay dispersión alta → discutir y re-votar
- Story Point = esfuerzo relativo (no horas)

**T-Shirt Sizing** (backlog sin refinar / SAFe features):
- XS, S, M, L, XL, XXL
- Conversión rough: XS=1SP, S=2SP, M=5SP, L=8SP, XL=13SP, XXL=21SP+

**Three-Point Estimation / PERT** (para tareas críticas):
- Optimista (O), Más Probable (M), Pesimista (P)
- Estimación PERT = (O + 4M + P) / 6

#### Velocidad del equipo

```
Velocidad promedio = SP completados / número de sprints medidos
Recomendación: usar promedio de últimos 3 sprints
Sprint 0: usar estimación inicial conservadora (ajustar después)
```

---

### Paso 7 — Refinamiento del Backlog (Backlog Grooming)

Frecuencia: **1 vez por sprint** (mitad del sprint en curso)
Duración: máximo 10% de la duración del sprint (ej: sprint de 2 semanas = 1-2h de grooming)
Participantes: PO + PM + Tech Lead + equipo

Agenda tipo de una sesión de Refinamiento:
1. Revisar las top 5-10 historias del backlog (próximas a entrar al sprint)
2. Verificar DoR de cada una
3. Refinar criterios de aceptación si están ambiguos
4. Estimar las que no tienen estimación
5. Confirmar priorización con el PO
6. Identificar dependencias bloqueantes

---

### Paso 8 — Gestión de Épicas

Para proyectos con múltiples módulos o funcionalidades grandes:

```
ÉPICA: [nombre]
ID: EP-[NNN]
Descripción: [qué resuelve para el negocio]
Módulo: [nombre del sistema o componente]
Historias asociadas: [US-001, US-002, ...]
SP estimados: [X SP]
SP completados: [X SP]
% completado: [X%]
Sprint de inicio estimado: [N]
Sprint de cierre estimado: [N]
Estado: [Pendiente / En curso / Completada]
```

---

### Paso 9 — Alertas del Backlog

El agente debe alertar cuando:

| Situación | Alerta | Acción |
|---|---|---|
| Backlog vacío o < 2 sprints de trabajo refinado | 🔴 | Convocar refinamiento urgente |
| Más del 30% de historias sin estimar | 🟡 | Sesión de estimación antes del próximo planning |
| Historias con SP > 13 sin descomponer | 🟡 | Descomponer antes de entrar al sprint |
| Velocidad cayendo > 20% en 2 sprints | 🔴 | Investigar causa raíz |
| Backlog creciendo sin fecha de entrega | 🟡 | Revisar alcance con PM y PO |
| PO no ha aprobado el backlog en > 1 semana | 🔴 | Escalar — cliente ausente |

---

### Paso 10 — Actualizar Archivos

- `{project_path}/data/backlog.md` — historias actualizadas
- `{project_path}/data/sprint-actual.md` — si hay cambios en el sprint en curso
- `{project_path}/data/velocidad.md` — actualizar velocidad si es post-sprint
- `{project_path}/metrics/delivery.md` — métricas de entrega actualizadas
- `{project_path}/memory/historial.md` — si se hizo un refinamiento o planning

---

## Formato de Reporte del Backlog

```
ESTADO DEL BACKLOG — [PROYECTO] — [FECHA]

RESUMEN
Total historias: X | SP totales: X | SP completados: X | % completado: X%
Velocidad promedio: X SP/sprint | Sprints estimados para completar: X
Sprint actual: N | Sprint Goal: [descripción]

DISTRIBUCIÓN POR PRIORIDAD
Must Have: X historias (X SP) — X% completadas
Should Have: X historias (X SP) — X% completadas
Could Have: X historias (X SP)
Won't Have: X historias (archivadas para Fase 2)

SPRINT ACTUAL — Sprint [N]
SP comprometidos: X | SP completados: X | % del sprint: X%
Historias en riesgo: [lista]
Bloqueos activos: [lista]

PENDIENTES DE REFINAMIENTO
[Historias que necesitan criterios de aceptación o estimación]

ALERTAS
[Lista de alertas del backlog]
```

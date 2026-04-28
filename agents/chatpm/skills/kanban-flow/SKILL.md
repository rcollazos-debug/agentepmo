---
name: kanban-flow
description: Optimiza el flujo de trabajo del equipo usando principios Kanban — WIP limits, detección de cuellos de botella y métricas de flujo para equipos en modo continuo, soporte o mantenimiento.
---

# SKILL: Gestión de Flujo Kanban

## Propósito

Aplicar los principios de Kanban para optimizar el flujo de trabajo del equipo, identificar cuellos de botella, controlar el trabajo en progreso (WIP) y mejorar la predictibilidad de las entregas. Kanban es el enfoque preferido para trabajo continuo, soporte, mantenimiento y equipos con prioridades dinámicas.

---

## Base PMBOK 8 + Kanban Method

- **Dominio:** Enfoque de Desarrollo + Entrega + Medición
- **Principios aplicados:**
  - Enfocarse en el valor
  - Abrazar adaptabilidad y resiliencia
  - Navegar la complejidad
  - Optimizar respuestas a riesgos

---

## Cuándo Activar este Skill

- El equipo trabaja en modo soporte / mantenimiento / mejoras continuas
- No hay iteraciones fijas (sprints) — el trabajo fluye continuamente
- Se necesita analizar el flujo de trabajo del equipo
- Se detectan cuellos de botella o trabajo bloqueado
- Se solicita análisis de Kanban o métricas de flujo

---

## Los 6 Principios de Kanban

1. **Visualizar el flujo de trabajo** — todo el trabajo debe ser visible
2. **Limitar el WIP (Work In Progress)** — menos tareas en paralelo = más velocidad de completado
3. **Gestionar el flujo** — medir y optimizar el tiempo que tarda una tarea en completarse
4. **Hacer las políticas explícitas** — las reglas del tablero deben ser claras y visibles
5. **Implementar feedback loops** — reuniones de revisión regulares para mejorar el sistema
6. **Mejorar colaborativamente** — el equipo decide cómo mejorar, con datos, no intuición

---

## Protocolo de Ejecución

### Paso 1 — Diseño del Tablero Kanban

Columnas estándar para proyectos de software:

```
BACKLOG → REFINADO → TO DO → IN PROGRESS → CODE REVIEW → QA → UAT → DONE
```

Simplificado para soporte / mantenimiento:
```
BACKLOG → IN PROGRESS → EN QA → DONE
```

SAFe / DA con múltiples equipos:
```
BACKLOG → ANALIZADO → SPRINT (por equipo) → QA → STAGING → PRODUCCIÓN → DONE
```

**Para cada columna definir:**
- Definición de entrada (cuándo pasa un item a esta columna)
- Definición de salida (cuándo puede pasar a la siguiente)
- Límite de WIP
- Responsable de mover el item

---

### Paso 2 — Límites de WIP (Work In Progress)

El WIP es la cantidad máxima de items que pueden estar simultáneamente en una columna.

**Regla general de WIP:** WIP = número de personas en la columna + 1

Ejemplo para equipo de 5 personas:
| Columna | WIP sugerido |
|---|---|
| In Progress | 5 (1 por persona) |
| Code Review | 3 |
| QA | 3 |
| UAT | 2 |

**Señales de WIP mal configurado:**
- WIP muy alto → demasiadas cosas en paralelo, nada se termina → aumenta Lead Time
- WIP muy bajo → personas bloqueadas esperando → subutilización del equipo

**Ley de Little:** `Lead Time = WIP / Throughput`
- Reducir el WIP reduce el Lead Time sin necesidad de trabajar más rápido

---

### Paso 3 — Métricas de Flujo Kanban

#### Lead Time
**Definición:** Tiempo desde que el cliente solicita el item hasta que está entregado en producción.
**Fórmula:** Fecha DONE - Fecha de solicitud
**Objetivo:** Reducirlo consistentemente.
**Uso:** Compromiso con el cliente ("cualquier item estará listo en X días en promedio")

#### Cycle Time
**Definición:** Tiempo desde que el equipo EMPIEZA a trabajar en el item hasta que lo termina.
**Fórmula:** Fecha DONE - Fecha IN PROGRESS
**Objetivo:** Predecirlo para comprometer fechas.
**Uso:** Identificar qué tipos de items tardan más y por qué.

#### Throughput
**Definición:** Número de items completados por unidad de tiempo.
**Fórmula:** Items DONE / semana (o / sprint)
**Objetivo:** Mantenerlo estable o creciente.
**Uso:** Planificar cuánto trabajo puede asumir el equipo.

#### Flow Efficiency
**Definición:** Porcentaje del tiempo en que el item estaba siendo trabajado activamente vs. tiempo total.
**Fórmula:** Tiempo activo / Lead Time × 100
**Objetivo:** ≥ 40% (en muchos equipos es < 15% por esperas y bloqueos)
**Uso:** Identificar dónde el sistema pierde tiempo (esperas, aprobaciones, revisiones)

---

### Paso 4 — Cumulative Flow Diagram (CFD)

El CFD muestra el flujo acumulado de trabajo por columna a lo largo del tiempo.

**Cómo leerlo:**
- Banda ancha y constante en "Done" → buen throughput
- Banda que se expande mucho en una columna → cuello de botella ahí
- Banda plana por varios días en una columna → bloqueo (items sin moverse)
- Convergencia de bandas → el trabajo se está terminando (fin de proyecto/release)

**Signos de alerta en el CFD:**
- La banda de "In Progress" crece pero "Done" no crece → el equipo está empezando más de lo que termina
- Brecha creciente entre "Backlog" y "Done" → acumulación de trabajo sin terminar
- "UAT" se estanca → cliente no está disponible para validar → activar playbook `cliente-ausente`

---

### Paso 5 — Daily Kanban Stand-up

Diferente al Daily Scrum — en Kanban se revisa el tablero, no a las personas:

1. **Revisar el tablero de derecha a izquierda** (desde DONE hasta BACKLOG)
2. Identificar items bloqueados o sin movimiento > 2 días
3. Verificar que el WIP no excede los límites
4. Identificar quien puede "tirar" del trabajo bloqueado

**Preguntas guía:**
- ¿Hay items que llevan más de X días sin moverse?
- ¿Alguna columna está en WIP excedido?
- ¿Hay bloqueadores que resolver hoy?
- ¿Qué item del backlog entra al flujo hoy?

---

### Paso 6 — Reuniones de Revisión Kanban

**Replenishment Meeting (semanal o bisemanal):**
- Seleccionar nuevos items del backlog para entrar al flujo
- Priorizar según valor de negocio
- Verificar capacidad antes de agregar más trabajo

**Throughput Review (quincenal o mensual):**
- Revisar métricas de flujo (Lead Time, Cycle Time, Throughput)
- Identificar tendencias y cuellos de botella recurrentes
- Decidir ajustes al proceso o WIP limits

**Retrospectiva de flujo (mensual):**
- ¿El sistema está funcionando mejor que el mes pasado?
- ¿Las políticas del tablero son claras y se cumplen?
- ¿Qué mejora podemos implementar el próximo mes?

---

### Paso 7 — Priorización en Kanban

Sin sprints, la priorización es continua. Criterios para ordenar el backlog:

| Criterio | Descripción |
|---|---|
| **Valor de negocio** | ¿Cuánto valor genera para el cliente? |
| **Urgencia** | ¿Hay una fecha límite? ¿Qué pasa si se retrasa? |
| **Riesgo** | ¿Es mejor hacerlo ahora o puede volverse más difícil después? |
| **Costo de retraso (CoD)** | ¿Cuánto cuesta cada día que no se entrega? |
| **Dependencias** | ¿Bloquea otros items si no se completa pronto? |

**Priorización con Cost of Delay / WSJF (Weighted Shortest Job First — SAFe):**
```
WSJF = (Valor de negocio + Urgencia + Riesgo/oportunidad) / Tamaño del trabajo
El item con mayor WSJF tiene mayor prioridad
```

---

### Paso 8 — Señales de Alerta Kanban

| Señal | Alerta | Acción |
|---|---|---|
| Lead Time aumentando 2+ semanas consecutivas | 🔴 | Analizar CFD, identificar cuello de botella |
| WIP excedido en 2+ columnas simultáneamente | 🟡 | Terminar antes de empezar más |
| Item bloqueado > 3 días sin acción | 🔴 | Escalar bloqueo — activar PM |
| Throughput cayendo 20%+ en 2 semanas | 🟡 | Retrospectiva de flujo urgente |
| Backlog sin priorizar > 1 semana | 🟡 | Replenishment meeting urgente |
| Columna UAT parada > 5 días | 🔴 | Cliente ausente — activar playbook |

---

### Paso 9 — Actualizar Archivos

- `{project_path}/metrics/delivery.md` — Lead Time, Cycle Time, Throughput actualizados
- `{project_path}/data/backlog.md` — backlog repriorizado
- `{project_path}/memory/historial.md` — estado del flujo registrado
- `{project_path}/metrics/dashboard.md` — semáforo de delivery actualizado

---

## Formato de Reporte de Flujo Kanban

```
ESTADO DEL FLUJO — [PROYECTO] — [FECHA]

ESTADO: [🟢 VERDE / 🟡 AMARILLO / 🔴 ROJO]

MÉTRICAS DE FLUJO
Lead Time promedio: X días (tendencia: ↑↓→)
Cycle Time promedio: X días (tendencia: ↑↓→)
Throughput: X items/semana (tendencia: ↑↓→)
Flow Efficiency: X% (meta: ≥ 40%)

ESTADO DEL WIP
| Columna | WIP actual | WIP límite | Estado |
|---|---|---|---|

ITEMS BLOQUEADOS
| ID | Descripción | Columna | Bloqueado desde | Razón | Acción |
|---|---|---|---|---|---|

CUELLOS DE BOTELLA DETECTADOS
[Análisis del CFD — columnas con acumulación]

ALERTAS
[Lista de alertas con acción requerida]

BACKLOG TOP 5 (próximos a entrar al flujo)
| ID | Descripción | Prioridad | Estimación | Dependencias |
|---|---|---|---|---|
```

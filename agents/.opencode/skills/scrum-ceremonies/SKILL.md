---
name: scrum-ceremonies
description: Facilita las cuatro ceremonias fundamentales de Scrum orientadas a resultados concretos — Sprint Planning, Daily, Review y Retrospectiva — mejorando alineación del equipo y valor entregado.
---

# SKILL: Ceremonias Scrum

## Propósito

Facilitar las cuatro ceremonias fundamentales de Scrum con un enfoque orientado a resultados, no a rituales. Cada ceremonia debe producir un output concreto que mejore la calidad del trabajo, la alineación del equipo y el valor entregado al cliente.

---

## Base PMBOK 8 + Scrum Guide

- **Dominio:** Enfoque de Desarrollo + Equipo + Entrega
- **Principios aplicados:**
  - Crear un entorno colaborativo para el equipo
  - Enfocarse en el valor
  - Abrazar adaptabilidad y resiliencia
  - Construir calidad en procesos y entregables

---

## Cuándo Activar este Skill

- Se va a iniciar un sprint (planning)
- Conducción de Daily Standup estructurado
- Cierre de sprint (Review + Retrospectiva)
- El usuario solicita "sprint planning", "daily", "review" o "retro"
- Se necesita rediseñar alguna ceremonia que no está funcionando

---

## Las Cuatro Ceremonias

---

## 1. SPRINT PLANNING

### Propósito
Comprometer el sprint: definir el Sprint Goal, seleccionar las historias del backlog y crear el plan de trabajo del sprint.

### Cuándo
- Inicio de cada sprint (primera mañana del sprint)
- Duración recomendada: 1 hora por semana de sprint (sprint 2 semanas = 2 horas)

### Participantes
- Product Owner (obligatorio)
- Scrum Master / PM
- Todo el equipo de desarrollo
- Tech Lead

### Agenda

**Parte 1 — El QUÉ (30% del tiempo)**
1. PO presenta el Sprint Goal propuesto
2. PO presenta las historias priorizadas del backlog (top N según velocidad)
3. Equipo hace preguntas de clarificación sobre criterios de aceptación
4. PO confirma o ajusta el Sprint Goal
5. Equipo confirma que las historias están en DoR

**Parte 2 — El CÓMO (70% del tiempo)**
1. Equipo descompone historias en tareas técnicas
2. Se estima el esfuerzo de cada tarea (en horas si aplica)
3. Se verifica que la carga cabe en la capacidad del sprint
4. Se identifican dependencias y riesgos del sprint
5. Equipo confirma compromiso voluntario con el sprint

### Cálculo de Capacidad

```
Capacidad total del sprint =
  Σ (días disponibles por persona × horas efectivas por día)

Horas efectivas por día = 8h × factor de dedicación (0.70 recomendado)
(El 30% restante se consume en standups, email, code reviews, reuniones)

Velocidad comprometida = Velocidad promedio últimos 3 sprints
Regla: no comprometer más del 85-90% de la velocidad promedio
```

### Formato de Salida Sprint Planning

```
SPRINT [N] — PLAN COMPROMETIDO
Proyecto: [nombre]
Inicio: [fecha] | Fin: [fecha] | Duración: X semanas

SPRINT GOAL: [Una oración clara sobre qué valor entrega este sprint]

CAPACIDAD DEL EQUIPO
| Nombre | Rol | Días disponibles | Horas efectivas |
|---|---|---|---|

HISTORIAS COMPROMETIDAS
| ID | Historia | Módulo | SP | Responsable | Criterios de Aceptación |
|---|---|---|---|---|---|

TOTAL: X SP comprometidos de X SP de capacidad (X%)

DEPENDENCIAS Y RIESGOS DEL SPRINT
| # | Descripción | Tipo | Acción |
|---|---|---|---|

DEFINICIÓN DE DONE (DoD) aplicable:
[Lista de criterios del proyecto]
```

### Señales de un Planning disfuncional

- Equipo acepta todas las historias sin preguntar → no hay entendimiento real
- Sprint Goal genérico ("terminar historias del backlog") → falta de foco
- Estimaciones hechas solo por el Tech Lead → no hay compromiso del equipo
- Planning de más de 4 horas para sprint de 2 semanas → reducir y refinar previamente

---

## 2. DAILY STANDUP

### Propósito
Sincronizar al equipo, detectar impedimentos y ajustar el plan del sprint diariamente. NO es un reporte de estado al PM — es una reunión del equipo para el equipo.

### Cuándo
- Diariamente a la misma hora
- Duración máxima: 15 minutos
- De pie (o sin compartir pantalla) para fomentar brevedad

### Participantes
- Todo el equipo de desarrollo
- Scrum Master / PM (facilita, no domina)
- PO (opcional — solo observa, no interroga)

### Las 3 Preguntas Clásicas

1. **¿Qué hice ayer** que avanzó hacia el Sprint Goal?
2. **¿Qué haré hoy** que avance hacia el Sprint Goal?
3. **¿Qué impedimentos** me están bloqueando?

### Variante orientada al tablero

En lugar de las 3 preguntas individuales, revisar el board de izquierda a derecha:
1. Revisar las historias "In Progress" — ¿siguen avanzando?
2. Revisar las historias "Done" del día anterior — confirmar completadas
3. Identificar historias bloqueadas o sin movimiento > 2 días
4. Asegurar que el burndown del sprint es coherente con el avance

### Reglas de Facilitación

- Si un tema necesita más de 2 minutos → "parking lot" — se resuelve después
- Las conversaciones técnicas no ocurren en el Daily — se agendan por separado
- El PM no hace el reporte — el equipo habla entre sí
- Si alguien no tiene bloqueos ni novedades → "sin novedades, avanzando" (OK)
- Si la misma persona tiene bloqueos 3 días seguidos → PM interviene para resolver

### Registro post-Daily (memoria del agente)

El agente puede registrar en `projects/gestion-proyectos/memory/historial.md`:
```
[FECHA] — Daily Standup
Bloqueos activos: [lista]
Compromisos del día: [lista]
Novedades: [si las hay]
```

---

## 3. SPRINT REVIEW (DEMO)

### Propósito
Mostrar al cliente y al PO el trabajo completado durante el sprint. Recoger feedback y ajustar el backlog. Es la ceremonia de validación de valor entregado.

### Cuándo
- Último día del sprint (o penúltimo si hay retrospectiva el mismo día)
- Duración: 1 hora para sprint de 2 semanas (máximo 2 horas)

### Participantes
- Equipo de desarrollo (presenta el trabajo)
- Product Owner (valida y acepta)
- Sponsor / cliente (retroalimenta)
- PM (facilita)
- Stakeholders interesados (opcionales)

### Agenda

1. **Contexto del sprint** (5 min) — PM recuerda el Sprint Goal y los compromisos
2. **Demo funcional** (50% del tiempo) — cada desarrollador demuestra sus historias
3. **Feedback del PO/cliente** (20% del tiempo) — ¿cumple los criterios? ¿hay observaciones?
4. **Ajuste del backlog** (15% del tiempo) — nuevas historias surgidas del feedback
5. **Próximo sprint — preview** (10% del tiempo) — qué viene en el próximo sprint

### Reglas de una buena Demo

- Demostrar en ambiente QA o UAT (nunca en DEV local del desarrollador)
- Mostrar datos realistas, no de prueba
- Seguir el flujo del usuario final, no el flujo técnico
- No demostrar código ni arquitectura (a menos que el cliente sea técnico y lo pida)
- Si una historia no está done → no se demuestra (transparencia)
- El equipo demuestra — no el PM

### Formato de Salida Sprint Review

```
SPRINT [N] — REVIEW
Proyecto: [nombre] | Fecha: [fecha]
Participantes: [lista]

SPRINT GOAL: [descripción]
RESULTADO: [Alcanzado / Parcialmente alcanzado / No alcanzado]
Razón si no alcanzado: [descripción]

HISTORIAS COMPLETADAS (DONE)
| ID | Historia | SP | Validado por PO |
|---|---|---|---|

HISTORIAS INCOMPLETAS (no entran a Done)
| ID | Historia | SP | % avance | Razón | Acción |
|---|---|---|---|---|---|

MÉTRICAS DEL SPRINT
SP comprometidos: X | SP completados: X | Velocidad: X SP/sprint
Velocidad promedio actualizada: X SP/sprint

FEEDBACK DEL CLIENTE
[Puntos de retroalimentación recibidos]

BACKLOG AJUSTADO POST-REVIEW
[Nuevas historias o cambios de prioridad derivados del feedback]

DEUDA TÉCNICA GENERADA
[Si aplica — registrar para planificación futura]
```

---

## 4. RETROSPECTIVA

### Propósito
Mejorar continuamente el proceso del equipo. La retro es un espacio seguro donde el equipo identifica qué funcionó, qué no funcionó y compromete acciones concretas de mejora.

### Cuándo
- Fin de cada sprint (idealmente el mismo día que la Review o el día siguiente)
- Duración: 45-90 minutos para sprint de 2 semanas

### Participantes
- Todo el equipo de desarrollo
- Scrum Master / PM (facilita)
- PO (opcional — solo si el equipo lo decide)
- Sin cliente ni stakeholders externos

### Formatos de Retrospectiva

**Formato 1 — Clásico (Barco / Viento / Ancla)**
- ⛵ Viento en las velas (qué nos impulsa — seguir haciendo)
- ⚓ Ancla (qué nos frena — dejar de hacer)
- 🗺️ Isla (destino — qué queremos lograr — empezar a hacer)

**Formato 2 — Start / Stop / Continue**
- START: Qué deberíamos empezar a hacer
- STOP: Qué deberíamos dejar de hacer
- CONTINUE: Qué está funcionando y debemos mantener

**Formato 3 — 4Ls (Liked / Learned / Lacked / Longed For)**
- Liked: Qué nos gustó
- Learned: Qué aprendimos
- Lacked: Qué faltó
- Longed For: Qué desearíamos que hubiera pasado

**Formato 4 — Mad / Sad / Glad**
- Mad: Qué nos frustró
- Sad: Qué nos entristece que no funcionó
- Glad: Qué nos alegra que funcionó

### Proceso de Facilitación

1. **Ambientación** (5 min) — Contexto de seguridad psicológica
2. **Recolección de ideas** (10-15 min) — Cada persona escribe sus puntos (post-its / Miro / pizarra)
3. **Agrupación y priorización** (10 min) — Identificar los temas más recurrentes
4. **Análisis de causa raíz** (15 min) — Para los top 2-3 problemas: ¿Por qué ocurrió?
5. **Compromisos de mejora** (10 min) — Acciones específicas: qué, quién, cuándo
6. **Revisión de acciones del sprint anterior** (5 min) — ¿Se cumplieron?

### Reglas de la Retro

- Lo que se dice en la retro se queda en la retro (salvo los compromisos formales)
- Hablar de situaciones y procesos, no de personas
- Máximo 3 acciones de mejora por sprint (más que eso no se implementa)
- Las acciones deben ser SMART y tener dueño
- El PM NO domina la retro — facilita y escucha

### Formato de Salida Retrospectiva

```
RETROSPECTIVA — SPRINT [N]
Proyecto: [nombre] | Fecha: [fecha]
Equipo: [lista de participantes]

QUÉ SALIÓ BIEN (seguir haciendo)
- [lista]

QUÉ MEJORAR (dejar de hacer / hacer diferente)
- [lista con causa raíz cuando se identifica]

ACCIONES DE MEJORA PARA EL PRÓXIMO SPRINT
| Acción | Responsable | Fecha | Medición del éxito |
|---|---|---|---|

REVISIÓN ACCIONES DEL SPRINT ANTERIOR
| Acción | Estado | Resultado |
|---|---|---|

ESTADO GENERAL DEL EQUIPO: [🟢 Motivado / 🟡 Con fricción / 🔴 En tensión]
```

---

## Actualizar Archivos post-Ceremonias

- `projects/gestion-proyectos/data/sprint-actual.md` — resultado del sprint
- `projects/gestion-proyectos/data/velocidad.md` — velocidad actualizada
- `projects/gestion-proyectos/data/backlog.md` — backlog ajustado post-Review
- `projects/gestion-proyectos/metrics/delivery.md` — métricas de entrega
- `projects/gestion-proyectos/memory/historial.md` — cierre de sprint registrado
- `projects/gestion-proyectos/memory/compromisos.md` — compromisos de mejora de la retro

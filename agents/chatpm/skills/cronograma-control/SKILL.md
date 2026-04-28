---
name: cronograma-control
description: Controla el cronograma del proyecto aplicando técnicas PMBOK 8, detectando desviaciones de la línea base, calculando impacto en la ruta crítica y proponiendo acciones de recuperación.
---

# SKILL: Control de Cronograma

## Propósito

Controlar el cronograma del proyecto aplicando técnicas de gestión del tiempo del PMBOK 8. Detectar desviaciones de la línea base, calcular impacto en la ruta crítica y proponer acciones de recuperación.

---

## Base PMBOK 8

- **Dominio:** Planificación (Planning Performance Domain) + Medición (Measurement)
- **Principios aplicados:**
  - Enfocarse en el valor
  - Navegar complejidad
  - Optimizar respuestas a riesgos
  - Abrazar adaptabilidad y resiliencia

---

## Cuándo activar este skill

- Se detecta un atraso en cronograma
- Se solicita revisión del timeline
- Hay cambios que pueden impactar la ruta crítica
- Antes de un comité o steering committee
- Se incorpora un recurso nuevo o se pierde uno

---

## Protocolo de ejecución

### Paso 1 — Leer estado del cronograma

Fuentes a consultar:
1. `{project_path}/data/cronograma.md` — plan base con fechas y hitos
2. `{project_path}/metrics/cronograma.md` — variaciones actuales
3. `{project_path}/data/dependencias.md` — dependencias entre tareas
4. `{project_path}/memory/compromisos.md` — compromisos con fecha
5. `{project_path}/data/recursos.md` — capacidad del equipo
6. `{project_path}/memory/historial.md` — eventos recientes

### Paso 2 — Calcular variaciones

| Métrica | Fórmula | Interpretación |
|---|---|---|
| SV (Schedule Variance) | EV - PV | Positivo = adelantado |
| SPI (Schedule Performance Index) | EV / PV | > 1 = adelantado, < 1 = atrasado |
| Días de atraso estimados | (1 - SPI) × duración restante | Días adicionales proyectados |
| % completado real | EV / BAC × 100 | Avance real ponderado |

### Paso 3 — Análisis de ruta crítica

Revisar:
- Tareas en la ruta crítica con holgura = 0
- Tareas con holgura negativa (ya en retraso)
- Impacto en cascada de retrasos detectados
- Dependencias FS, FF, SS, SF afectadas

Preguntas de diagnóstico:
1. ¿Qué tarea está causando el retraso?
2. ¿Está en la ruta crítica?
3. ¿Cuántos días de holgura quedan?
4. ¿Cuál es el impacto en la fecha de entrega final?
5. ¿Hay dependencias bloqueadas aguas abajo?

### Paso 4 — Opciones de recuperación

Evaluar en este orden:

**Crashing (compresión por recursos):**
- Agregar recursos a tareas de la ruta crítica
- Costo: mayor (overtime, contratación temporal)
- Riesgo: coordinación, calidad
- Aplicar cuando: hay presupuesto disponible y la tarea es paralelizable

**Fast Tracking (paralelización):**
- Ejecutar en paralelo tareas que estaban en secuencia
- Costo: mayor riesgo de retrabajo
- Aplicar cuando: hay capacidad y las tareas tienen baja dependencia técnica

**Reducción de alcance:**
- Mover funcionalidades a una fase posterior
- Requiere: aprobación del cliente y sponsor
- Aplicar cuando: la fecha es inamovible y el alcance es negociable

**Reasignación de recursos:**
- Mover recursos de tareas no críticas a la ruta crítica
- Costo: retraso en tareas secundarias
- Aplicar cuando: los recursos existen pero están mal distribuidos

**Extensión de cronograma:**
- Renegociar fecha con cliente
- Aplicar cuando: ninguna otra opción es viable sin comprometer calidad

### Paso 5 — Construir nuevo cronograma

Si se requiere replanificación:
1. Fijar nueva baseline con aprobación del sponsor
2. Documentar la causa del cambio
3. Identificar las acciones de recuperación acordadas
4. Establecer puntos de control intermedios más frecuentes
5. Actualizar todos los hitos dependientes

### Paso 6 — Visualizar en Metabase

**Activar el skill `metabase-dashboard` con tipo `CRONOGRAMA`.**

Los datos ya están disponibles de los pasos anteriores. Usar directamente:
- `[SPI]`, `[SV]`, `[PCT_REAL]`, `[PCT_TIEMPO]`
- Tabla de hitos con fechas plan/real/estado
- Tabla de fases con períodos y estados
- `[DIAS_RESTANTES]` y `[FECHA_FIN]`

Al finalizar, responder con:
```
📊 Dashboard de cronograma actualizado en Metabase:
🔗 http://localhost:3000/dashboard/[ID]

SPI: [X] | Avance real: [X]% vs [X]% planificado
[Impacto en fecha de entrega o confirmación de que está en plan]
```

### Paso 7 — Actualizar archivos

- `{project_path}/data/cronograma.md` — cronograma actualizado
- `{project_path}/metrics/cronograma.md` — métricas actualizadas
- `{project_path}/memory/historial.md` — evento registrado con URL del dashboard
- `{project_path}/memory/compromisos.md` — nuevos compromisos generados

---

## Umbrales de acción

| Condición | Acción requerida |
|---|---|
| SPI < 0.95 | Investigar causa y documentar plan de recuperación |
| SPI < 0.85 | Escalar a sponsor, activar plan de recuperación formal |
| SPI < 0.75 | Activar playbook `recuperacion-proyecto` |
| Holgura crítica <= 0 | Revisar ruta crítica inmediatamente |
| Retraso > 10% duración total | Replanning formal con aprobación ejecutiva |

---

## Formato de reporte de atraso

```
ANÁLISIS DE ATRASO — [PROYECTO] — [FECHA]

Causa raíz identificada: [descripción]
Tareas afectadas: [lista]
Impacto en fecha final: +X días
Nueva fecha proyectada: [fecha]

Opciones evaluadas:
1. [Opción] → Costo: [X] | Riesgo: [X] | Recuperación: [X días]
2. [Opción] → Costo: [X] | Riesgo: [X] | Recuperación: [X días]

Opción recomendada: [número y justificación]
Acciones inmediatas:
- [Acción] | Responsable: [nombre] | Fecha: [fecha]
```

# COMMAND: /timeline

## Propósito

Generar una vista clara del cronograma del proyecto: línea de tiempo con hitos, fases, estado actual y proyección. Mostrar el pasado (cumplido), el presente (en ejecución) y el futuro (planificado) en un formato visual y ejecutivo.

## Cuándo usar

- Cuando el cliente o sponsor pregunta por el roadmap
- Para actualizar la vista del cronograma en reuniones
- Al inicio de cada fase del proyecto
- Cuando hay cambios en el plan que requieren comunicar el nuevo timeline

---

## Instrucciones de ejecución

### 1. Leer fuentes

```
data/cronograma.md
data/dependencias.md
metrics/cronograma.md
memory/historial.md
memory/compromisos.md
context/proyecto-base.md
```

### 2. Extraer estructura del cronograma

Identificar:
- Fases del proyecto con fechas de inicio y fin
- Hitos por fase con fecha planificada y fecha real (si ya ocurrió)
- Tareas de ruta crítica
- Dependencias entre fases o hitos
- Fecha de inicio real del proyecto
- Fecha de entrega comprometida

### 3. Clasificar estado de cada hito

| Estado | Símbolo | Criterio |
|---|---|---|
| Completado | [✓] | Fecha real <= fecha plan |
| Completado con retraso | [✓-] | Fecha real > fecha plan |
| En ejecución | [→] | Dentro del período actual |
| En riesgo | [!] | Holgura < 5 días o bloqueo activo |
| Planificado | [ ] | Futuro sin señal de riesgo |
| Vencido sin completar | [✗] | Fecha plan pasada, no completado |

### 4. Construir la línea de tiempo

Formato de texto estructurado (Gantt simplificado):

```
LÍNEA DE TIEMPO — [PROYECTO]
Inicio: [fecha] | Entrega comprometida: [fecha]
Estado actual: Semana [X] de [Y] | [X]% completado

═══════════════════════════════════════════════
FASE 1: INICIO [fecha inicio] → [fecha fin]
═══════════════════════════════════════════════

  [✓] Hito 1.1 — Acta de constitución firmada           [fecha real]
  [✓] Hito 1.2 — Kick-off realizado                     [fecha real]
  [✓] Hito 1.3 — Equipo conformado                      [fecha real]

═══════════════════════════════════════════════
FASE 2: PLANIFICACIÓN [fecha inicio] → [fecha fin]
═══════════════════════════════════════════════

  [✓] Hito 2.1 — Backlog inicial aprobado                [fecha real]
  [✓-] Hito 2.2 — Arquitectura definida (3 días tarde)  [fecha real]
  [→] Hito 2.3 — Plan de releases aprobado               [en curso]

═══════════════════════════════════════════════
FASE 3: CONSTRUCCIÓN [fecha inicio] → [fecha fin]
═══════════════════════════════════════════════

  [→] Sprint 1 — MVP core features                       [en curso]
  [!] Sprint 2 — Integraciones (riesgo: API externa)     [en riesgo]
  [ ] Sprint 3 — Módulo reportes                         [planificado]
  [ ] Sprint 4 — Ajustes UAT                             [planificado]

═══════════════════════════════════════════════
FASE 4: PRUEBAS Y ENTREGA [fecha inicio] → [fecha fin]
═══════════════════════════════════════════════

  [ ] UAT con cliente                                     [planificado]
  [ ] Go-live / Producción                                [planificado]
  [ ] Cierre formal                                       [planificado]

═══════════════════════════════════════════════
FECHA DE ENTREGA: [fecha]
Estado: [Confirmada / En riesgo / Requiere ajuste]
═══════════════════════════════════════════════
```

### 5. Mostrar ruta crítica simplificada

```
RUTA CRÍTICA
[Tarea A] → [Tarea B] → [Tarea C] → [Entrega final]
Holgura total: X días
```

### 6. Señalar riesgos en el cronograma

```
ALERTAS EN EL CRONOGRAMA
! [Hito/Tarea] — [motivo del riesgo] — Impacto: X días
! [Hito/Tarea] — [motivo del riesgo] — Impacto: X días
```

### 7. Proyección de cierre

```
PROYECCIÓN
- Si tendencia actual continúa: entrega el [fecha proyectada]
- Variación vs plan: [+/-X días]
- Acción recomendada: [descripción]
```

### 8. Actualizar memoria

Si hay cambios en fechas:
- `data/cronograma.md` — actualizar hitos y fechas
- `memory/historial.md` — registrar actualización del timeline

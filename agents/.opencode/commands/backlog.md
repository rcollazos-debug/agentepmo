# COMMAND: /backlog

## Propósito

Gestionar, priorizar y mantener el Product Backlog del proyecto. Incluye refinamiento de historias, estimación, priorización MoSCoW, verificación del DoR y análisis del estado de la entrega.

## Cuándo usar

- Antes de un Sprint Planning (preparar el backlog)
- Sesión de Backlog Refinement / Grooming
- El cliente solicita una nueva funcionalidad
- El backlog está desactualizado o sin priorizar
- Análisis del estado general de la entrega del proyecto

---

## Instrucciones de ejecución

### 1. Leer fuentes (en orden)

```
data/backlog.md
data/sprint-actual.md
data/velocidad.md
context/proyecto-base.md
context/restricciones.md
data/cronograma.md
metrics/delivery.md
memory/compromisos.md
```

### 2. Activar SKILL: backlog-management

Ejecutar el protocolo del skill de gestión de backlog:
- Revisar el estado actual del backlog (SP totales, completados, pendientes)
- Verificar priorización MoSCoW vigente
- Identificar historias sin estimar o sin DoR completo
- Calcular velocidad promedio y proyección de sprints restantes
- Detectar épicas en riesgo de no terminar a tiempo
- Generar alertas del backlog

### 3. Modo de ejecución

**Modo REVISIÓN** (solo análisis):
- Reportar estado actual sin modificar el backlog
- Identificar problemas y recomendar acciones

**Modo REFINAMIENTO** (con el usuario):
- Revisar historias candidatas al próximo sprint
- Verificar criterios de aceptación y DoR
- Estimar historias no estimadas
- Actualizar prioridades con el PO

**Modo PLANNING** (generar plan del sprint):
- Calcular capacidad disponible del equipo
- Seleccionar historias del backlog según velocidad
- Generar Sprint Goal propuesto
- Producir el plan del sprint

### 4. Actualizar archivos

- `data/backlog.md` — backlog actualizado
- `data/sprint-actual.md` — si se genera un nuevo sprint plan
- `data/velocidad.md` — si se actualiza la velocidad
- `metrics/delivery.md` — métricas de delivery
- `memory/historial.md` — si se hizo refinamiento o planning

---

## Output esperado

Reporte del backlog con:
- Total SP: X | Completados: X | Pendientes: X | % avance: X%
- Velocidad promedio: X SP/sprint | Sprints estimados: X
- Sprint actual: estado y SP en riesgo
- Próximas 5-10 historias listas para el sprint (DoR ✓)
- Historias que necesitan refinamiento
- Alertas del backlog (épicas en riesgo, backlog vacío, etc.)

# COMMAND: /calidad

## Propósito

Realizar el gate de calidad del proyecto. Revisar el estado de defectos, cobertura de pruebas, tasa de retrabajo y validar si el proyecto cumple los estándares para pasar a producción o continuar al siguiente sprint.

## Cuándo usar

- Antes de un release o despliegue a producción
- Al finalizar un sprint (como parte de la Review)
- Cuando se detecta alta tasa de defectos
- Revisión semanal de calidad del producto
- El cliente reporta problemas de calidad

---

## Instrucciones de ejecución

### 1. Leer fuentes (en orden)

```
metrics/calidad.md
data/backlog.md
data/sprint-actual.md
context/proyecto-base.md
memory/historial.md
```

### 2. Activar SKILL: calidad-software

Ejecutar el protocolo completo del skill de calidad:
- Verificar KPIs de calidad vs metas
- Revisar defectos críticos y altos abiertos
- Calcular tasa de retrabajo y CSAT
- Ejecutar gate de release (si aplica)
- Identificar causa raíz de defectos (Pareto)
- Generar semáforo de calidad

### 3. Determinar acción

| Condición | Decisión |
|---|---|
| Todos los gates pasan | ✅ APROBADO para release / siguiente sprint |
| Defectos críticos abiertos > 0 | 🚫 BLOQUEADO — corregir antes de avanzar |
| Defectos altos > 2 | ⚠️ CONDICIONADO — plan de corrección requerido |
| Retrabajo > 20% | 🔴 Análisis de causa raíz urgente |

### 4. Actualizar archivos

- `metrics/calidad.md` — KPIs actualizados
- `memory/historial.md` — resultado del gate de calidad registrado
- Si hay alertas → `memory/riesgo.md`

---

## Output esperado

Gate de calidad con:
- Estado de cada KPI vs meta
- Lista de defectos críticos/altos abiertos
- Veredicto del gate de release (✅ Aprobado / 🚫 Bloqueado / ⚠️ Condicionado)
- Acciones de mejora con responsable y fecha
- Semáforo de calidad

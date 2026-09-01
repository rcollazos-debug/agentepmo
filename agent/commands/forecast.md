# COMMAND: /forecast

## Propósito

Generar proyecciones hacia adelante del proyecto aplicando técnicas de valor ganado y análisis de tendencias del PMBOK 8. Proyectar fecha de entrega, costo final y calidad si se mantienen las condiciones actuales.

## Cuándo usar

- Revisión mensual de proyecciones
- Cuando el cliente pregunta si la fecha se mantiene
- Cuando el CPI o SPI varían significativamente
- Antes de presentación ejecutiva o comité
- Para evaluar si se requiere plan de recuperación

---

## Instrucciones de ejecución

### 1. Leer fuentes

```
metrics/cronograma.md
metrics/financiero.md
metrics/delivery.md
metrics/capacidad.md
data/cronograma.md
data/presupuesto.md
data/recursos.md
memory/historial.md
```

### 2. Proyecciones de Valor Ganado (EAC — Estimate at Completion)

Calcular con diferentes supuestos:

**EAC Optimista (eficiencia futura = 1.0):**
EAC = AC + (BAC - EV)
*Supuesto: lo que queda se hará según lo planificado.*

**EAC Realista (eficiencia actual continúa):**
EAC = BAC / CPI
*Supuesto: el CPI actual se mantiene hasta el fin.*

**EAC Pesimista (ambas ineficiencias continúan):**
EAC = AC + [(BAC - EV) / (SPI × CPI)]
*Supuesto: tanto el SPI como el CPI actuales persisten.*

**ETC (Estimate to Complete):**
ETC = EAC - AC

**VAC (Variance at Completion):**
VAC = BAC - EAC (negativo = sobre presupuesto)

**TCPI (To-Complete Performance Index):**
TCPI = (BAC - EV) / (BAC - AC)
*Si TCPI > 1.10 → la meta es muy difícil de alcanzar.*

### 3. Proyección de fechas

**Fecha proyectada optimista:**
Duración restante = Duración planificada restante × 1.0
Fecha = Hoy + duración restante optimista

**Fecha proyectada realista:**
Duración restante = Duración planificada restante / SPI
Fecha = Hoy + duración restante / SPI

**Fecha proyectada pesimista:**
Duración restante = Duración planificada restante / (SPI × 0.90)
Fecha = Hoy + duración restante pesimista

### 4. Proyección de calidad

Tendencia de calidad basada en:
- Tasa de defectos actual vs histórico del proyecto
- Cobertura de pruebas actual
- % de retrabajo en los últimos 2 sprints
- QA integrado o al final del ciclo

Proyección:
- Si tasa de defectos aumenta → calidad en riesgo
- Si retrabajo > 15% → entrega comprometida
- Si QA solo al final → riesgo alto de defectos tardíos

### 5. Análisis de escenarios

Presentar 3 escenarios:

```
ESCENARIO OPTIMISTA
- Supuesto: el equipo mejora eficiencia y se eliminan bloqueos
- EAC: $[monto]
- Fecha entrega: [fecha]
- Condiciones necesarias: [lista]

ESCENARIO BASE (tendencia actual)
- Supuesto: condiciones actuales se mantienen
- EAC: $[monto]
- Fecha entrega: [fecha]
- Probabilidad estimada: [%]

ESCENARIO PESIMISTA
- Supuesto: riesgos actuales se materializan
- EAC: $[monto]
- Fecha entrega: [fecha]
- Señales de alerta a vigilar: [lista]
```

### 6. Recomendación ejecutiva

Basado en el escenario base:
- ¿La fecha de entrega original es alcanzable? [Sí / En riesgo / No]
- ¿El presupuesto es suficiente? [Sí / Ajustado / Insuficiente]
- ¿Se recomienda activar plan de recuperación? [Sí / No / Preventivo]
- Acción prioritaria recomendada: [descripción]

---

## Output esperado

```
FORECAST DEL PROYECTO — [NOMBRE] — [FECHA]

ESTADO ACTUAL
- % completado: X%
- SPI: X.XX | CPI: X.XX
- Días transcurridos: X de X planificados

PROYECCIÓN DE FECHA
| Escenario | Fecha proyectada | Variación vs plan |
|---|---|---|
| Optimista | [fecha] | [+/-X días] |
| Base (tendencia) | [fecha] | [+/-X días] |
| Pesimista | [fecha] | [+/-X días] |

PROYECCIÓN DE COSTO
| Escenario | EAC | Variación vs BAC |
|---|---|---|
| Optimista | $X | [+/-X%] |
| Base | $X | [+/-X%] |
| Pesimista | $X | [+/-X%] |

TCPI: X.XX
Interpretación: [Alcanzable / Difícil / Muy difícil]

PROYECCIÓN DE CALIDAD
Tendencia: [Mejorando / Estable / Deteriorando]
Riesgo principal: [descripción]

CONCLUSIÓN EJECUTIVA
[2-3 líneas directas con recomendación]

DECISIÓN REQUERIDA
[Si aplica: qué necesita decidir el sponsor basado en este forecast]
```

# COMMAND: /status

## Propósito

Generar el reporte de estado integral del proyecto en el momento de ejecución. Consolida métricas, avance, riesgos, bloqueos y compromisos en un solo informe ejecutivo con semáforo RAG.

## Cuándo usar

- Inicio de semana / fin de semana
- Antes de reunión con cliente o sponsor
- Cuando el equipo pregunta cómo va el proyecto
- Cuando el PM necesita una vista rápida consolidada

---

## Instrucciones de ejecución

### 1. Leer los siguientes archivos en orden

```
context/proyecto-base.md
metrics/dashboard.md
metrics/cronograma.md
metrics/financiero.md
metrics/calidad.md
metrics/delivery.md
data/cronograma.md
memory/compromisos.md
memory/riesgo.md
memory/historial.md
```

### 2. Calcular indicadores

- **SPI** = EV / PV (si < 0.95 → alerta)
- **CPI** = EV / AC (si < 0.95 → alerta)
- **% avance real** = EV / BAC × 100
- **Compromisos vencidos** = contar compromisos con fecha pasada sin "completado"
- **Riesgos críticos activos** = contar riesgos con score >= 0.40

### 3. Determinar semáforo RAG

**VERDE:** SPI >= 0.95, CPI >= 0.95, sin riesgos críticos, sin hitos vencidos
**AMARILLO:** SPI 0.85-0.94 o CPI 0.85-0.94, o riesgos altos con plan definido
**ROJO:** SPI < 0.85 o CPI < 0.85, o riesgo crítico sin respuesta, o hito con impacto en entrega final

### 4. Generar output

Usar estructura del skill `informes-ejecutivos` — plantilla de informe semanal.

### 5. Registrar en memoria

Agregar entrada en `memory/historial.md`:
```
[FECHA] - Status generado | Semáforo: [RAG] | SPI: X.XX | CPI: X.XX
```

---

## Output esperado

Informe de estado completo con:
- Semáforo RAG con justificación
- Resumen ejecutivo (3-5 líneas)
- Avance por porcentaje y hitos
- Métricas EVM
- Top bloqueos con antigüedad
- Top riesgos activos
- Decisiones pendientes
- Próximas acciones con responsable y fecha

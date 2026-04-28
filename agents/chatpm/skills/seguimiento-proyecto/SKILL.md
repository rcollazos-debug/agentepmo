---
name: seguimiento-proyecto
description: Ejecuta el monitoreo integral del proyecto conforme al Dominio de Medición del PMBOK 8, detectando desviaciones tempranas, interpretando métricas de rendimiento y emitiendo el estado ejecutivo.
---

# SKILL: Seguimiento de Proyecto

## Propósito

Ejecutar el monitoreo integral del proyecto conforme al Dominio de Desempeño de Medición del PMBOK 8. Detectar desviaciones tempranas, interpretar métricas de rendimiento y emitir el estado ejecutivo con precisión.

---

## Base PMBOK 8

- **Dominio:** Medición (Measurement Performance Domain)
- **Principios aplicados:**
  - Demostrar comportamientos de liderazgo
  - Navegar complejidad
  - Enfocarse en el valor
  - Optimizar respuestas a riesgos

---

## Cuándo activar este skill

- El usuario solicita status, avance o reporte del proyecto
- Se requiere verificar el estado de hitos o entregables
- Se necesita comparar baseline vs. ejecución real
- Se detecta una señal de desviación en cronograma, costo o calidad

---

## Protocolo de ejecución

### Paso 1 — Leer contexto activo

Leer en orden:
1. `{project_path}/context/proyecto-base.md` — datos del proyecto
2. `{project_path}/metrics/dashboard.md` — estado actual consolidado
3. `{project_path}/metrics/cronograma.md` — variación de cronograma (SV, SPI)
4. `{project_path}/metrics/financiero.md` — variación de costo (CV, CPI)
5. `{project_path}/memory/compromisos.md` — compromisos vigentes
6. `{project_path}/memory/riesgo.md` — riesgos activos
7. `{project_path}/memory/historial.md` — últimos eventos

### Paso 2 — Calcular indicadores EVM (Earned Value Management)

| Indicador | Fórmula | Interpretación |
|---|---|---|
| SV (Schedule Variance) | EV - PV | Negativo = atrasado |
| SPI (Schedule Performance Index) | EV / PV | < 1.0 = atrasado |
| CV (Cost Variance) | EV - AC | Negativo = sobre presupuesto |
| CPI (Cost Performance Index) | EV / AC | < 1.0 = ineficiente |
| EAC (Estimate at Completion) | BAC / CPI | Proyección de costo final |
| ETC (Estimate to Complete) | EAC - AC | Costo restante estimado |
| TCPI (To Complete Performance Index) | (BAC - EV) / (BAC - AC) | Eficiencia requerida |
| VAC (Variance at Completion) | BAC - EAC | Desviación final proyectada |

### Paso 3 — Clasificar semáforo RAG

**VERDE** — Proyecto controlado:
- SPI >= 0.95 y CPI >= 0.95
- Sin riesgos críticos activos
- Hitos al día o con holgura

**AMARILLO** — Alertas manejables:
- SPI entre 0.85 y 0.94 o CPI entre 0.85 y 0.94
- Riesgos activos con plan de respuesta definido
- Hito con retraso < 5 días sin impacto en fecha final

**ROJO** — Requiere intervención ejecutiva:
- SPI < 0.85 o CPI < 0.85
- Riesgo crítico sin plan
- Hito con retraso que impacta fecha de entrega final
- Bloqueo sin resolución > 3 días

### Paso 4 — Generar informe de seguimiento

Estructura estándar de salida:

```
ESTADO DEL PROYECTO: [NOMBRE] | [FECHA]
Semáforo: [VERDE / AMARILLO / ROJO]

RESUMEN EJECUTIVO
[2-3 líneas directas del estado real]

AVANCE GENERAL
- Completado: X%
- Período cubierto: [fechas]
- Hitos cumplidos: [lista]
- Hitos pendientes próximos: [lista con fechas]

MÉTRICAS DE RENDIMIENTO
- SPI: X.XX | Tendencia: [↑↓→]
- CPI: X.XX | Tendencia: [↑↓→]
- Esfuerzo consumido: X h de Y h presupuestadas
- Velocidad promedio: X story points/sprint

COMPROMISOS CRÍTICOS
[Lista de compromisos con fecha y responsable]

BLOQUEOS ACTIVOS
[Lista con antigüedad y responsable de resolución]

RIESGOS EN RADAR
[Top 3 riesgos con nivel actual]

DECISIONES REQUERIDAS
[Lista de decisiones que requieren aprobación]

PRÓXIMAS ACCIONES CLAVE
[Lista con responsable y fecha]
```

### Paso 5 — Visualizar en Metabase

**Inmediatamente después de generar el informe de texto, activar el skill `metabase-dashboard` con tipo `EJECUTIVO`.**

Instrucciones para el traspaso:
- Los datos ya fueron leídos en el Paso 1 — no releer los archivos
- Pasar directamente a la Fase 3 del skill `metabase-dashboard` (ejecución MCP)
- Usar los valores calculados en el Paso 2 de este skill (SPI, CPI, SV, CV, EAC)
- El dashboard reemplaza la presentación de texto al usuario: el informe escrito es el análisis interno, Metabase es lo que se entrega

Al finalizar el dashboard, responder con:
```
📊 Dashboard de seguimiento actualizado en Metabase:
🔗 http://localhost:3000/dashboard/[ID]

Semáforo: [RAG] | SPI: [X] | CPI: [X] | Avance: [X]%
[1-2 líneas del hallazgo principal]
[Acción requerida si aplica]
```

### Paso 6 — Actualizar memoria

Registrar en `{project_path}/memory/historial.md`:
- Fecha del seguimiento
- Semáforo emitido
- Desviaciones detectadas
- Decisiones tomadas
- URL del dashboard generado

---

## Reglas de interpretación

- Si SPI < 0.85 sin plan de recuperación activo → escalar inmediatamente
- Si hay > 3 compromisos vencidos sin resolución → activar playbook `atraso-cronograma`
- Si CPI < 0.80 → iniciar análisis de reestimación y alertar financiero
- Si semáforo cambia de Verde a Rojo sin pasar por Amarillo → generar alerta de crisis

---

## Frecuencia recomendada

| Tipo de proyecto | Frecuencia de seguimiento |
|---|---|
| Crítico / alta visibilidad | Diario |
| Normal en ejecución | Semanal |
| Fase de inicio o cierre | Quincenal |
| Sostenimiento | Mensual |

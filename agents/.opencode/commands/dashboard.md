# COMMAND: /dashboard

## Propósito

Construir un dashboard de gestión del proyecto directamente en Metabase, adaptado al tipo de análisis solicitado.

## Cuándo usar

- "genera dashboard", "crea tablero", "quiero ver las métricas en Metabase"
- "dashboard financiero / de riesgos / del sprint / de calidad / del equipo / de cronograma"
- "dashboard para el comité", "tablero completo"

---

## Tipos disponibles

| Lo que dice el usuario | Tipo | Contenido |
|---|---|---|
| "ejecutivo", "estado", "general", sin especificar | Ejecutivo | RAG, BAC, días, hito, riesgos, hitos, presupuesto, fases |
| "financiero", "presupuesto", "EVM" | Financiero | BAC, EV, AC, CPI, EVM completa, burn rate, distribución |
| "sprint", "backlog", "velocidad" | Sprint | SP, velocidad, burndown, historias por estado |
| "riesgos" | Riesgos | Tabla riesgos por nivel, compromisos vencidos |
| "calidad", "defectos", "QA" | Calidad | Defectos críticos/altos, tasa, cobertura |
| "equipo", "capacidad" | Equipo | Utilización, velocidad histórica, composición |
| "cronograma", "hitos", "fases" | Cronograma | SPI, fases, hitos, % avance vs % tiempo |
| "compromisos", "pendientes" | Compromisos | Vencidos, en curso, por responsable |
| "completo", "integral", "todo" | Completo | Todas las tarjetas con datos disponibles |

## Instrucciones de ejecución

**Activar inmediatamente el skill `metabase-dashboard`.**

El skill detecta el tipo de dashboard solicitado, extrae los datos reales de los archivos del proyecto, decide qué tarjetas tienen sentido según la fase, y ejecuta la secuencia MCP completa.

No generar texto descriptivo. Ejecutar el skill directamente.

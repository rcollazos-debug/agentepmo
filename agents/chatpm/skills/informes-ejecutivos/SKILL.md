---
name: informes-ejecutivos
description: Genera reportes ejecutivos de alta calidad alineados con el Dominio de Medición del PMBOK 8, convirtiendo datos técnicos en mensajes claros para audiencias ejecutivas, sponsors y clientes.
---

# SKILL: Informes Ejecutivos

## Propósito

Generar reportes ejecutivos de alta calidad alineados con el Dominio de Desempeño de Medición del PMBOK 8. Los informes deben convertir datos técnicos en mensajes claros para audiencias ejecutivas, sponsors y clientes.

---

## Base PMBOK 8

- **Dominio:** Medición (Measurement Performance Domain)
- **Principios aplicados:**
  - Enfocarse en el valor
  - Comprometerse efectivamente con los interesados
  - Demostrar comportamientos de liderazgo

---

## Cuándo activar este skill

- Se solicita un informe semanal, quincenal o mensual
- Se requiere reporte para steering committee o comité directivo
- Se necesita actualización para el sponsor o cliente
- Se va a presentar el estado del proyecto ante un ejecutivo

---

## Protocolo de ejecución

### Paso 1 — Leer fuentes de información

En orden:
1. `{project_path}/context/proyecto-base.md` — datos del proyecto
2. `{project_path}/metrics/dashboard.md` — estado consolidado
3. `{project_path}/metrics/cronograma.md` — variaciones SPI/SV
4. `{project_path}/metrics/financiero.md` — variaciones CPI/CV
5. `{project_path}/metrics/calidad.md` — estado de calidad
6. `{project_path}/metrics/delivery.md` — entregables y hitos
7. `{project_path}/memory/riesgo.md` — riesgos activos
8. `{project_path}/memory/compromisos.md` — compromisos pendientes
9. `{project_path}/memory/decisiones.md` — decisiones recientes

### Paso 2 — Determinar tipo de informe requerido

| Tipo | Audiencia | Frecuencia | Enfoque |
|---|---|---|---|
| Informe semanal de seguimiento | Equipo + PM | Semanal | Operativo |
| Status report ejecutivo | Sponsor + cliente | Quincenal | Estratégico |
| Comité directivo | Steering committee | Mensual / hito | Decisional |
| Informe PMO | Dirección / portafolio | Mensual | Gobernanza |
| Informe de cierre | Todos | Único | Lecciones y cierre |

### Paso 3 — Reglas de redacción ejecutiva

- Máximo 1 página para el resumen ejecutivo
- Semáforo RAG visible al inicio
- Datos primero, explicación después
- Nunca ocultar información negativa — contextualizarla
- Una sola recomendación clara por tema
- Sin jerga técnica en sección ejecutiva
- Verbos en acción: "Se entregó", "Se detectó", "Se requiere"
- Resaltar lo que necesita decisión del ejecutivo

### Paso 4 — Estructura informe semanal de seguimiento

```markdown
# INFORME SEMANAL — [PROYECTO]
Semana: [X] | Período: [fecha inicio] al [fecha fin]
Preparado por: PM | Fecha: [fecha]

## SEMÁFORO: [VERDE / AMARILLO / ROJO]
Razón: [una línea directa]

## RESUMEN EJECUTIVO
[2-3 párrafos: qué pasó, cómo estamos, qué sigue]

## AVANCES DE LA SEMANA
- [Entregable o tarea completada] — [responsable]
- [Hito cumplido] — [fecha]

## ESTADO DE HITOS
| Hito | Fecha Plan | Fecha Real | Estado |
|---|---|---|---|

## MÉTRICAS
- Avance general: X%
- SPI: X.XX | SV: X días
- CPI: X.XX | CV: $X
- Tickets cerrados: X | Abiertos: X | Defectos: X

## BLOQUEOS Y RIESGOS
| # | Descripción | Dueño | Antigüedad | Impacto |
|---|---|---|---|---|

## DECISIONES REQUERIDAS
| # | Decisión | Responsable | Fecha límite |
|---|---|---|---|

## PRÓXIMOS PASOS (próxima semana)
- [Acción] | Responsable | Fecha
```

### Paso 5 — Estructura status report ejecutivo

```markdown
# STATUS REPORT EJECUTIVO — [PROYECTO]
Período: [fechas] | Preparado por: PM | Fecha: [fecha]

## ESTADO GENERAL: [VERDE / AMARILLO / ROJO]

## RESUMEN PARA LA DIRECCIÓN
[3-5 puntos concretos: logros clave, estado actual, decisiones requeridas]

## INDICADORES CLAVE
| KPI | Planificado | Real | Tendencia | Estado |
|---|---|---|---|---|
| % Avance | | | | |
| SPI | | | | |
| CPI | | | | |
| Defectos | | | | |
| Satisfacción cliente | | | | |

## HITOS DEL PERÍODO
| Hito | Fecha | Estado | Observación |
|---|---|---|---|

## TOP RIESGOS
| Riesgo | Nivel | Respuesta | Dueño |
|---|---|---|---|

## SOLICITUDES AL COMITÉ
[Lista de decisiones, aprobaciones o recursos requeridos]

## PRONÓSTICO
- Fecha de entrega: [en riesgo / confirmada / adelantada]
- Presupuesto: [dentro / sobre / bajo]
- Calidad: [conforme / con observaciones]
```

### Paso 6 — Estructura informe de comité directivo

```markdown
# COMITÉ DIRECTIVO — [PROYECTO]
Fecha: [fecha] | Convocado por: [nombre]

## AGENDA
1. Estado del proyecto
2. Desviaciones y decisiones
3. Próximo período

## ESTADO DEL PROYECTO
Semáforo: [RAG] | Tendencia: [↑↓→]
[Resumen en 5 líneas]

## LOGROS DEL PERÍODO
[Lista de logros comprobables]

## DESVIACIONES Y CAUSA RAÍZ
[Tabla: desvío / causa / impacto / respuesta]

## DECISIONES REQUERIDAS HOY
[Tabla numerada con opciones y recomendación del PM]

## PRÓXIMO PERÍODO — COMPROMISOS
[Tabla: compromiso / responsable / fecha]

## PRÓXIMA REUNIÓN DE COMITÉ
Fecha propuesta: [fecha]
```

### Paso 7 — Visualizar en Metabase

**Después de estructurar el informe, activar `metabase-dashboard` con el tipo que corresponde al informe:**

| Tipo de informe | Tipo de dashboard |
|---|---|
| Informe semanal de seguimiento | `EJECUTIVO` |
| Status report ejecutivo | `EJECUTIVO` |
| Comité directivo | `COMPLETO` |
| Informe PMO | `COMPLETO` |
| Informe de cierre | `EJECUTIVO` |

El dashboard es el entregable principal. El texto del informe (Pasos 4-6) es el respaldo analítico que el PM usa internamente o envía por escrito como complemento.

Al finalizar el dashboard, responder con:
```
📊 Informe [TIPO] disponible en Metabase:
🔗 http://localhost:3000/dashboard/[ID]

Período: [fechas] | Semáforo: [RAG]
[3-5 bullets con los puntos más importantes del informe]
[Decisiones requeridas si las hay]
```

### Paso 8 — Actualizar memoria

- `{project_path}/memory/historial.md` — registrar que se emitió informe con URL del dashboard
- `{project_path}/memory/decisiones.md` — decisiones tomadas en el comité

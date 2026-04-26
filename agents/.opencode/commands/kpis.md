# COMMAND: /kpis

## Propósito

Calcular, analizar y reportar los KPIs del proyecto alineados con el Dominio de Desempeño de Medición del PMBOK 8. Mostrar tendencias, comparar contra baseline y emitir alertas cuando los indicadores se desvían.

## Cuándo usar

- Revisión mensual de KPIs
- Solicitud del PMO o dirección
- Antes de un comité directivo
- Cuando se necesita un cuadro de mando del proyecto

---

## Instrucciones de ejecución

### 1. Leer fuentes

```
metrics/dashboard.md
metrics/cronograma.md
metrics/financiero.md
metrics/calidad.md
metrics/delivery.md
metrics/capacidad.md
data/cronograma.md
data/presupuesto.md
data/recursos.md
```

### 2. Calcular KPIs por dominio

#### Dominio Tiempo (Schedule)
| KPI | Fórmula | Umbral Verde | Umbral Amarillo | Umbral Rojo |
|---|---|---|---|---|
| SPI | EV / PV | >= 0.95 | 0.85-0.94 | < 0.85 |
| SV (días) | EV - PV | 0 días | 1-5 días | > 5 días |
| % Cronograma consumido | Días transcurridos / Duración total | Alineado | ±5% | > ±10% |
| Hitos cumplidos a tiempo | Hitos on-time / total hitos | >= 90% | 75-89% | < 75% |

#### Dominio Costo (Cost)
| KPI | Fórmula | Umbral Verde | Umbral Amarillo | Umbral Rojo |
|---|---|---|---|---|
| CPI | EV / AC | >= 0.95 | 0.85-0.94 | < 0.85 |
| CV ($) | EV - AC | <= 0 | 1-5% del BAC | > 5% BAC |
| EAC | BAC / CPI | <= BAC | BAC + 5% | > BAC + 10% |
| TCPI | (BAC-EV)/(BAC-AC) | <= 1.05 | 1.05-1.15 | > 1.15 |

#### Dominio Calidad (Quality)
| KPI | Descripción | Umbral Verde | Umbral Amarillo | Umbral Rojo |
|---|---|---|---|---|
| Tasa de defectos | Bugs / story points entregados | < 0.5 | 0.5-1.0 | > 1.0 |
| Tasa de retrabajo | Horas retrabajo / horas totales | < 5% | 5-15% | > 15% |
| Cobertura de pruebas | % código con test automatizado | > 80% | 60-79% | < 60% |
| Defectos críticos abiertos | Bugs críticos sin resolver | 0 | 1-2 | > 2 |
| Satisfacción cliente (CSAT) | Encuesta periódica (1-10) | >= 8 | 6-7 | < 6 |

#### Dominio Entrega (Delivery)
| KPI | Descripción | Umbral Verde | Umbral Amarillo | Umbral Rojo |
|---|---|---|---|---|
| Velocidad del equipo | SP entregados / sprint | Estable ±10% | Caída 10-25% | Caída > 25% |
| % Backlog completado | SP cerrados / SP totales | Alineado al plan | ±10% | > ±15% |
| Predictibilidad del sprint | SP completados / SP comprometidos | >= 85% | 70-84% | < 70% |
| Throughput | Historias completadas / sprint | Estable | Variable | En declive |

#### Dominio Riesgos (Risk)
| KPI | Descripción | Umbral Verde | Umbral Amarillo | Umbral Rojo |
|---|---|---|---|---|
| Riesgos críticos activos | Count riesgos score >= 0.40 | 0 | 1-2 con plan | >= 3 o sin plan |
| Riesgos sin dueño | Count riesgos sin responsable | 0 | 1 | >= 2 |
| Riesgos materializados | Incidentes del período | 0 | 1 menor | >= 1 mayor |

#### Dominio Recursos (Team)
| KPI | Descripción | Umbral Verde | Umbral Amarillo | Umbral Rojo |
|---|---|---|---|---|
| Utilización del equipo | Horas usadas / horas disponibles | 70-85% | 86-95% | > 95% o < 60% |
| Rotación del equipo | Salidas no planificadas / período | 0 | 1 no crítica | >= 1 crítica |
| Compromisos vencidos | Count compromisos sin resolver | 0 | 1-2 | >= 3 |

### 3. Generar tendencias

Para cada KPI principal mostrar:
- Valor actual
- Valor período anterior
- Tendencia: Mejorando (↑) / Estable (→) / Empeorando (↓)
- Proyección si sigue la tendencia actual

### 4. Dashboard de KPIs

```
DASHBOARD KPIs — [PROYECTO] — [FECHA]

ESTADO GENERAL: [VERDE / AMARILLO / ROJO]

INDICADORES CLAVE
| KPI | Plan | Real | Tendencia | Estado |
|---|---|---|---|---|
| SPI | 1.00 | X.XX | [↑→↓] | [RAG] |
| CPI | 1.00 | X.XX | [↑→↓] | [RAG] |
| Avance % | X% | X% | [↑→↓] | [RAG] |
| Velocidad SP/sprint | X | X | [↑→↓] | [RAG] |
| Defectos críticos | 0 | X | [↑→↓] | [RAG] |
| Riesgos críticos | 0 | X | [↑→↓] | [RAG] |
| Compromisos vencidos | 0 | X | [↑→↓] | [RAG] |
| CSAT cliente | 8+ | X | [↑→↓] | [RAG] |

KPIs EN ZONA ROJA (acción requerida)
[lista con análisis y recomendación]

KPIs EN ZONA AMARILLA (monitorear)
[lista]

PROYECCIÓN BASADA EN TENDENCIAS
- Fecha entrega proyectada: [fecha]
- Presupuesto proyectado al cierre: $[monto]
- Calidad proyectada: [descripción]
```

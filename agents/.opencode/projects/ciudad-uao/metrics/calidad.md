# MÉTRICAS DE CALIDAD

> Registro de indicadores de calidad del proyecto y del producto.
> Basado en el Dominio de Entrega del PMBOK 8 — principio: construir calidad en procesos y entregables.
> Actualizar por sprint o semanalmente.

---

## Definición de Done (DoD) del Proyecto

Criterios que debe cumplir toda historia de usuario para considerarse "done":
- [ ] Código completo y funcional según los criterios de aceptación
- [ ] Code review completado y aprobado por otro desarrollador
- [ ] Pruebas unitarias escritas y pasando (cobertura mínima: X%)
- [ ] Pruebas de integración ejecutadas y pasando
- [ ] QA funcional completado sin defectos críticos ni altos abiertos
- [ ] Documentación técnica actualizada si aplica
- [ ] Desplegado en ambiente de staging
- [ ] Criterios de aceptación validados por el PO o representante del cliente

---

## KPIs de Calidad del Producto

| Indicador | Meta | Actual | Tendencia | Estado |
|---|---|---|---|---|
| Tasa de defectos (bugs/SP entregado) | < 0.5 | X.XX | [↑→↓] | [RAG] |
| Defectos críticos abiertos | 0 | X | [↑→↓] | [RAG] |
| Defectos altos abiertos | <= 2 | X | [↑→↓] | [RAG] |
| Cobertura de pruebas unitarias | >= 80% | X% | [↑→↓] | [RAG] |
| Tasa de retrabajo (% horas retrabajo) | < 10% | X% | [↑→↓] | [RAG] |
| Historias devueltas por QA | < 10% | X% | [↑→↓] | [RAG] |
| Satisfacción cliente (CSAT 1-10) | >= 8 | X | [↑→↓] | [RAG] |
| Defectos encontrados en producción | 0 | X | [↑→↓] | [RAG] |

---

## Registro de Defectos por Sprint

| Sprint | Encontrados | Críticos | Altos | Medios | Bajos | Cerrados | Abiertos |
|---|---|---|---|---|---|---|---|
| Sprint [N] | X | X | X | X | X | X | X |
| Sprint [N-1] | X | X | X | X | X | X | X |
| **Acumulado** | **X** | **X** | **X** | **X** | **X** | **X** | **X** |

---

## Defectos Críticos y Altos Abiertos

| ID | Descripción | Prioridad | Encontrado en | Fecha | Responsable | Estado |
|---|---|---|---|---|---|---|
| BUG-001 | [Descripción] | [Crítico/Alto] | [Ambiente] | [fecha] | [Nombre] | [Abierto/En progreso] |

---

## Tendencia de Calidad

| Sprint | Tasa defectos | Retrabajo % | CSAT | Evaluación |
|---|---|---|---|---|
| [Sprint N] | X.XX | X% | X | [Mejorando/Estable/Deteriorando] |

---

## Métricas de Pruebas

| Tipo de prueba | Planificados | Ejecutados | Pasando | Fallando | Cobertura |
|---|---|---|---|---|---|
| Unitarias | X | X | X | X | X% |
| Integración | X | X | X | X | — |
| Funcionales (QA) | X | X | X | X | — |
| Regresión | X | X | X | X | — |
| Performance | X | X | X | X | — |
| Seguridad | X | X | X | X | — |
| UAT | X | X | X | X | — |

---

## Análisis de Causa Raíz de Defectos (Pareto)

| Causa | Cantidad de defectos | % del total | Acción |
|---|---|---|---|
| Requisitos ambiguos | X | X% | [Acción] |
| Código sin review | X | X% | [Acción] |
| Casos límite no considerados | X | X% | [Acción] |
| Integración no probada | X | X% | [Acción] |
| Otros | X | X% | [Acción] |

---

## Evaluación del semáforo de calidad

| Indicador | Verde | Amarillo | Rojo |
|---|---|---|---|
| Tasa de defectos | < 0.5 | 0.5-1.0 | > 1.0 |
| Defectos críticos abiertos | 0 | 1-2 | > 2 |
| Retrabajo | < 10% | 10-20% | > 20% |
| Cobertura de pruebas | > 80% | 60-79% | < 60% |

**Estado actual de calidad:** [VERDE / AMARILLO / ROJO]

---

Última actualización: [fecha] | Sprint: [N]

# Guía EVM — Earned Value Management

> Cargar este archivo cuando se calculen métricas de proyecto, se interpreten
> índices CPI/SPI, se proyecte el costo final o se analice el margen VortexBird.

---

## Fórmulas Fundamentales

| Métrica | Fórmula | Descripción |
|---|---|---|
| PV | BAC × % planificado a hoy | Valor planificado |
| EV | BAC × % completado real | Valor ganado |
| AC | Costo real acumulado | Costo actual |
| CV | EV − AC | Variación de costo (+ = bajo presupuesto) |
| SV | EV − PV | Variación de cronograma (+ = adelantado) |
| CPI | EV / AC | Índice de desempeño de costo |
| SPI | EV / PV | Índice de desempeño de cronograma |

## Proyecciones al Cierre

| Métrica | Fórmula | Descripción |
|---|---|---|
| EAC (CPI constante) | BAC / CPI | Estimado al cierre si la tendencia continúa |
| EAC (nuevo estimado) | AC + ETC | Si se re-estima el trabajo restante |
| ETC | EAC − AC | Estimado para completar |
| VAC | BAC − EAC | Variación al cierre (+ = ahorro, − = sobrecosto) |
| TCPI | (BAC − EV) / (BAC − AC) | CPI necesario para cumplir el presupuesto |

## Umbrales VortexBird (Obligatorios)

| Condición | Semáforo | Acción |
|---|---|---|
| CPI ≥ 0.95 y SPI ≥ 0.95 | 🟢 VERDE | Monitoreo normal |
| CPI 0.90–0.94 o SPI 0.85–0.94 | 🟡 AMARILLO | Advertir al PM, revisar tendencia |
| CPI 0.85–0.89 | 🟡 AMARILLO | Activar `playbooks/presupuesto-critico.md` preventivo |
| CPI < 0.85 | 🔴 ROJO | Activar `playbooks/presupuesto-critico.md` + escalar al Gerente PMO |
| SPI < 0.85 | 🔴 ROJO | Activar `playbooks/atraso-cronograma.md` + escalar |

## Margen VortexBird

- Margen bruto objetivo: ≥ 30%
- Margen neto mínimo: ≥ 20%
- PM overhead cap: ≤ 15% del presupuesto
- CPI < 0.90 → margen en riesgo → escalar al Gerente PMO

## Ejemplo de Cálculo

```
BAC = $20,000
% planificado = 40% → PV = $8,000
% completado real = 35% → EV = $7,000
AC = $8,500

CPI = $7,000 / $8,500 = 0.82 → 🔴 ROJO
SPI = $7,000 / $8,000 = 0.88 → 🟡 AMARILLO
EAC = $20,000 / 0.82 = $24,390 → Sobrecosto proyectado: $4,390
VAC = $20,000 − $24,390 = −$4,390
```

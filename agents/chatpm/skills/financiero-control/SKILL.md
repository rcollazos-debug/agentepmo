---
name: financiero-control
description: Controla la salud financiera del proyecto con doble enfoque — cumplimiento del presupuesto con el cliente y protección del margen de VortexBird mediante EVM y alertas de sobrecosto.
---

# SKILL: Control Financiero y Margen VortexBird

## Propósito

Controlar la salud financiera del proyecto con doble enfoque: (1) cumplimiento del presupuesto comprometido con el cliente y (2) protección y maximización del margen de VortexBird. El PM que controla el margen protege a la empresa y garantiza la viabilidad del proyecto.

---

## Base PMBOK 8 + Contexto VortexBird

- **Dominio:** Medición + Trabajo del Proyecto
- **Principios aplicados:**
  - Enfocarse en el valor (valor para el cliente y margen para VortexBird)
  - Construir calidad en los procesos (eficiencia del equipo)
  - Optimizar respuestas a riesgos (riesgos financieros)

---

## Cuándo Activar este Skill

- Se solicita análisis financiero del proyecto
- CPI < 0.95 (señal de sobrecosto)
- Hay un cambio de alcance que impacta el presupuesto
- Antes de un comité directivo o presentación al cliente
- Al cierre de cada mes o fase del proyecto
- Cuando se detecta trabajo no autorizado en ejecución
- Command `/margen` activado

---

## Protocolo de Ejecución

### Paso 1 — Leer contexto financiero

Fuentes en orden:
1. `{project_path}/context/vortexbird.md` — margen objetivo y modelo de negocio
2. `{project_path}/metrics/financiero.md` — estado actual de KPIs financieros
3. `{project_path}/data/presupuesto.md` — detalle del presupuesto por componente
4. `{project_path}/data/recursos.md` — horas consumidas por rol
5. `{project_path}/data/cambios.md` — CRs aprobadas con impacto económico
6. `{project_path}/context/contrato.md` — modelo contractual y condiciones de pago

---

### Paso 2 — Calcular KPIs EVM

| Indicador | Fórmula | Interpretación |
|---|---|---|
| BAC | Presupuesto total aprobado | Base de cálculo |
| PV (Planned Value) | % plan × BAC | Trabajo que debería estar hecho |
| EV (Earned Value) | % real completado × BAC | Trabajo efectivamente completado |
| AC (Actual Cost) | Costo real incurrido | Lo que realmente se ha gastado |
| SV | EV - PV | Negativo = atrasado |
| SPI | EV / PV | < 1 = atrasado, > 1 = adelantado |
| CV | EV - AC | Negativo = sobre presupuesto |
| CPI | EV / AC | < 1 = ineficiente, > 1 = eficiente |
| EAC | BAC / CPI | Costo final proyectado |
| ETC | EAC - AC | Costo restante para completar |
| VAC | BAC - EAC | Variación al cierre (positivo = ahorro) |
| TCPI | (BAC-EV)/(BAC-AC) | Eficiencia requerida para cumplir |

---

### Paso 3 — Calcular Margen VortexBird

#### Estructura de margen por proyecto

```
INGRESOS DEL PROYECTO
- Valor del contrato (precio acordado con el cliente)
- CRs aprobadas y facturadas adicionales
= INGRESOS TOTALES

COSTOS DEL PROYECTO
- Horas equipo × tasa interna (dev, QA, PM, DevOps)
- Licencias y herramientas
- Infraestructura
- Gastos directos del proyecto
= COSTO TOTAL DEL PROYECTO

MARGEN BRUTO = Ingresos - Costos
MARGEN % = (Margen / Ingresos) × 100
META: ≥ 30%
```

#### Indicadores de margen

| Indicador | Cálculo | Meta VortexBird |
|---|---|---|
| Margen bruto % | (Ingresos - Costos) / Ingresos × 100 | ≥ 30% |
| Margen neto % | (Ingresos - Costos totales incl. overhead) / Ingresos × 100 | ≥ 20% |
| Utilización del equipo % | Horas productivas / Horas disponibles × 100 | ≥ 85% |
| Horas fuera de alcance | Horas trabajadas en items sin CR | 0% (alerta si > 0) |
| CRs no facturadas | Valor del trabajo adicional sin CR formal | $0 (alerta si > 0) |

---

### Paso 4 — Identificar Fugas de Margen

Revisar y alertar cuando se detecte:

**1. Scope Creep sin CR**
- Trabajo adicional ejecutado sin solicitud de cambio formal
- Impacto: costo sin facturación → margen se reduce directamente
- Acción: detener, formalizar CR, valorar y presentar al cliente

**2. Estimaciones optimistas que se materializan en sobrecosto**
- Tareas que toman más tiempo del estimado sin reestimación
- Impacto acumulativo sobre CPI
- Acción: re-estimar con Three-Point Estimation (PERT)

**3. Subutilización o rotación del equipo**
- Personas sin tareas asignadas por bloqueos no resueltos
- Horas pagadas sin productividad
- Acción: identificar el bloqueo y resolverlo dentro de 24 horas

**4. Retrabajo excesivo**
- QA devolviendo historias por errores repetitivos
- Costo doble: tiempo original + tiempo de corrección
- Acción: análisis de causa raíz de defectos + refuerzo de DoR

**5. Reuniones excesivas**
- El factor de dedicación cae por debajo de 0.70
- El equipo no puede avanzar porque está en reuniones
- Acción: auditar el calendario y reducir reuniones innecesarias

**6. Recursos sobre-calificados en tareas de bajo valor**
- Un Senior haciendo tareas de Mid = costo de Senior sin ROI diferencial
- Acción: revisar asignación de tareas vs perfiles del equipo

---

### Paso 5 — Analizar Hitos de Facturación

Identificar en `{project_path}/data/cronograma.md`:
- Próximos hitos de facturación
- Entregables que liberan pago
- Documentos necesarios para facturar (actas, informes)

Regla: **Un hito de facturación retrasado impacta el flujo de caja de VortexBird igual que un gasto no planificado.**

Formato de seguimiento:
```
HITOS DE FACTURACIÓN
| Hito | Fecha plan | Fecha real | Valor | Facturado | Estado |
|---|---|---|---|---|---|
```

---

### Paso 6 — Semáforo Financiero

| Condición | Semáforo | Acción |
|---|---|---|
| CPI ≥ 0.95 y margen ≥ 30% | 🟢 VERDE | Monitoreo normal |
| CPI 0.90-0.94 o margen 25-29% | 🟡 AMARILLO | Análisis de causa, plan de control |
| CPI < 0.90 o margen < 25% | 🔴 ROJO | Alerta VortexBird — plan de recuperación |
| CPI < 0.85 | 🔴 ROJO CRÍTICO | Escalar a Gerente PMO VortexBird en < 24h |
| TCPI > 1.15 | 🔴 ROJO | Meta financiera prácticamente inalcanzable |

---

### Paso 7 — Formato de Reporte Financiero

```
REPORTE FINANCIERO — [PROYECTO] — [FECHA]

ESTADO FINANCIERO: [🟢 / 🟡 / 🔴]
RAZÓN: [una línea directa]

INDICADORES EVM
BAC: $X
EV: $X (X% completado)
AC: $X (X% del BAC consumido)
CPI: X.XX | CV: $X
EAC: $X | VAC: $X | TCPI: X.XX

MARGEN VORTEXBIRD
Ingresos contratados: $X
Costos actuales: $X
Margen proyectado al cierre: $X (X%)
Meta: ≥ 30%
Estado: [🟢 En meta / 🟡 En riesgo / 🔴 Fuera de meta]

BURN RATE
Consumo mensual planificado: $X
Consumo mensual real: $X
Proyección de consumo al cierre: $X

HITOS DE FACTURACIÓN PRÓXIMOS
[Lista con fecha, valor y entregable requerido]

ALERTAS FINANCIERAS
[Lista de alertas identificadas]

ACCIONES RECOMENDADAS
[Lista con responsable y fecha]
```

---

### Paso 8 — Visualizar en Metabase

**Activar el skill `metabase-dashboard` con tipo `FINANCIERO`.**

Los datos financieros ya fueron leídos y calculados en los pasos anteriores. Pasar directamente a la Fase 3 del skill `metabase-dashboard` con los valores calculados:
- `[BAC]`, `[EV]`, `[AC]`, `[PV]`, `[CV]`, `[CPI]`, `[EAC]`, `[VAC]`, `[TCPI]`
- Componentes del presupuesto (Desarrollo / Testing / Gestión / Reservas)
- Tabla de burn rate mensual

El dashboard financiero reemplaza el reporte de texto como entregable al usuario. El texto del Paso 7 queda como análisis de respaldo.

Al finalizar, responder con:
```
📊 Dashboard financiero actualizado en Metabase:
🔗 http://localhost:3000/dashboard/[ID]

Estado financiero: [🟢/🟡/🔴] | CPI: [X] | Margen proyectado: [X]%
[Principal alerta o acción financiera requerida]
```

### Paso 9 — Actualizar Archivos

- `{project_path}/metrics/financiero.md` — KPIs actualizados
- `{project_path}/memory/historial.md` — evento financiero registrado con URL del dashboard
- `{project_path}/memory/decisiones.md` — si hay decisiones financieras tomadas
- `{project_path}/metrics/dashboard.md` — actualizar semáforo financiero

---

## Oportunidades de Incrementar el Margen

El agente debe identificar proactivamente:

1. **CRs pendientes de valorar** — trabajo adicional solicitado por el cliente que aún no tiene precio
2. **Eficiencias del equipo** — si el equipo termina antes de lo esperado, oportunidad de liberar recursos o reinvertir en calidad
3. **Automatización de pruebas** — reduce retrabajo y libera horas de QA
4. **Renegociación de licencias** — si se identifican herramientas menos costosas que cubren la misma necesidad
5. **Propuesta de fases adicionales** — al detectar necesidades del cliente fuera del alcance actual, proponerlas como Fase 2

---

## Reglas Anti-Sangrado de Margen

1. **Ningún trabajo sin CR autorizada** — el PM es el portero del alcance
2. **Ninguna hora de soporte post-entrega gratuita si no estaba en contrato** — documentar y facturar
3. **El equipo NO negocia cambios de alcance** — solo el PM negocia con el cliente
4. **Las reuniones del cliente consumen horas facturables** — si son excesivas, documentarlo
5. **Las correcciones por errores del cliente son una CR** — no son defectos del proyecto

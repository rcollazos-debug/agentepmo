---
name: gestion-proveedores
description: Gestión de proveedores externos del proyecto — SLA monitoring, evaluación de desempeño, escalación por incumplimiento, plan de mitigación de dependencias y comunicación formal con vendors.
---

# SKILL: Gestión de Proveedores Externos

## Rol en la arquitectura

Este skill cubre el ciclo de vida de **proveedores externos** del proyecto: APIs de terceros, SaaS, servicios cloud, integraciones, consultoras subcontratadas, proveedores de infraestructura.

**No confundir con:**
- `gestion-riesgos` → riesgos en general (incluyendo de proveedores) — este skill se especializa
- `interesados-comunicacion` → stakeholders del proyecto (cliente, sponsor) — este skill se enfoca en vendors
- `control-cambios` → CR formales del proyecto — este skill maneja CR del proveedor

---

## Cuándo Activar

- "el proveedor X no entregó", "vendor incumplió"
- "evalúa al proveedor", "cómo va con [proveedor]"
- "necesito un plan B con [proveedor]"
- Antes de un comité directivo donde se reportará desempeño de vendors
- Cuando un SLA se incumple
- Mensual o quincenalmente para review de proveedores activos

---

## Protocolo de Ejecución

### Paso 1 — Cargar registro de proveedores

```
{project_path}/data/proveedores.md
{project_path}/data/dependencias.md
{project_path}/risks/vendor-risks.md
{project_path}/memory/historial.md  (eventos relacionados)
```

Si `data/proveedores.md` no tiene proveedores cargados → preguntar al PM cuáles aplican y crear las entradas.

---

### Paso 2 — Detectar el modo

| Lo que dice el PM | Modo |
|---|---|
| "evalúa", "cómo va" | **Modo 1 — Evaluación de desempeño** |
| "incumplió", "no entregó", "está fallando" | **Modo 2 — Gestión de incumplimiento** |
| "necesito un plan B", "alternativa" | **Modo 3 — Plan de contingencia** |
| "comunica al proveedor" | **Modo 4 — Comunicación formal** |

---

### MODO 1 — Evaluación de Desempeño

**Criterios de evaluación (scorecard):**

| Dimensión | Peso | Cómo medir |
|---|---|---|
| Cumplimiento de SLA | 30% | % de entregas a tiempo y en alcance |
| Calidad técnica | 25% | Defectos reportados / aceptaciones a la primera |
| Comunicación | 15% | Tiempo de respuesta promedio, claridad |
| Flexibilidad | 10% | Adaptación a cambios sin escalación |
| Costo | 10% | Cumplimiento de presupuesto acordado |
| Relación | 10% | Confianza, actitud, manejo de conflictos |

**Output:**
```
📊 EVALUACIÓN DE PROVEEDOR — {nombre} — {periodo}

SCORE GLOBAL: {N}/100  →  {🟢 Excelente / 🟡 Aceptable / 🟠 Bajo desempeño / 🔴 Crítico}

DESGLOSE:
  • SLA:           {N}/30  ({nivel})
  • Calidad:       {N}/25
  • Comunicación:  {N}/15
  • Flexibilidad:  {N}/10
  • Costo:         {N}/10
  • Relación:      {N}/10

INCIDENTES EN EL PERIODO:
  - {incidente con fecha y resolución}

RECOMENDACIÓN:
  ✅ Continuar / ⚠️ Plan de mejora / 🔴 Considerar reemplazo
```

Actualizar `data/proveedores.md` y registrar en `memory/historial.md`.

---

### MODO 2 — Gestión de Incumplimiento

**Paso 2.1 — Caracterizar el incumplimiento:**

Hacer 4 preguntas en una sola ronda:
```
1. ¿Qué incumplió específicamente? (entregable, SLA de respuesta, fecha)
2. ¿Cuándo se detectó? ¿Cuándo era el compromiso original?
3. ¿Cuál es el impacto en el cronograma del proyecto?
4. ¿Es la primera vez o ya hay patrón?
```

**Paso 2.2 — Determinar nivel de respuesta:**

| Nivel | Cuándo | Acción |
|---|---|---|
| L1 — Recordatorio | Primer incumplimiento, retraso < 48h | Email recordatorio + nueva fecha confirmada |
| L2 — Escalación operativa | Reincidencia o retraso > 48h | Llamada con responsable del proveedor + plan de recuperación documentado |
| L3 — Escalación gerencial | Patrón confirmado o impacto en hitos | Carta formal + reunión con dirección del proveedor + activar `playbooks/proveedor-incumplido` |
| L4 — Activación contractual | Incumplimiento crítico con cláusulas aplicables | Notificación formal + invocación de penalizaciones / terminación |

**Paso 2.3 — Generar carta formal de incumplimiento (si L3 o L4):**

```
Asunto: [INCUMPLIMIENTO {nivel}] {nombre proveedor} — {entregable} — Acción requerida

{nombre del responsable},

Por medio de la presente, hacemos constar formalmente el siguiente incumplimiento
del compromiso adquirido para el proyecto {project_name}:

DETALLE DEL INCUMPLIMIENTO:
  • Compromiso: {descripción}
  • Fecha original comprometida: {fecha}
  • Fecha actual: {fecha}
  • Días de retraso: {N}
  • Impacto en nuestro proyecto: {descripción cuantificada}

HISTORIAL DE COMUNICACIÓN PREVIA:
  - {fecha}: {qué se comunicó}
  - {fecha}: {qué respondieron}

ACCIÓN QUE SOLICITAMOS:
  1. Plan de recuperación con fechas firmes antes del {fecha límite}
  2. Identificación de causa raíz y acciones para evitar recurrencia
  3. Confirmación de si se activan cláusulas contractuales de SLA

Consideramos esta comunicación como notificación formal.

{Nombre PM}
{Cargo} | VortexBird
```

**Paso 2.4 — Actualizar archivos:**
- `risks/vendor-risks.md` → registrar como riesgo materializado
- `data/proveedores.md` → bajar score del proveedor
- `memory/historial.md` → entrada formal del incumplimiento
- `memory/compromisos.md` → registrar el nuevo compromiso de recuperación

---

### MODO 3 — Plan de Contingencia (Plan B)

Cuando el proveedor es crítico y hay riesgo de fallo total:

**Paso 3.1 — Análisis de criticidad:**
- ¿Qué tan crítica es la dependencia? (1-5)
- ¿Cuántos días de proyecto se pierden si falla?
- ¿Hay alternativas conocidas?

**Paso 3.2 — Identificar alternativas:**

| Alternativa | Costo | Tiempo de switch | Calidad esperada | Riesgo |
|---|---|---|---|---|
| {opción A} | | | | |
| {opción B} | | | | |
| Construir in-house | | | | |

**Paso 3.3 — Activación del plan B:**

Definir umbrales claros:
- "Si el proveedor no confirma plan de recuperación antes del {fecha} → activamos {alternativa A}"
- "Si el incumplimiento se materializa → switch inmediato + escalación a Sponsor"

Registrar en `risks/vendor-risks.md` con score y plan de respuesta documentado.

---

### MODO 4 — Comunicación Formal con Proveedor

Tipos de comunicación:
- **Solicitud de cotización (RFQ)** — para nuevo trabajo
- **Recordatorio operativo** — para algo en curso
- **Escalación formal** — ver Modo 2
- **Reconocimiento** — cuando el proveedor cumple bien (también importante)
- **Renegociación** — cuando cambian las condiciones del proyecto

Cada tipo usa tono diferente. Por defecto: profesional, factual, sin emocionalidad.

---

## Reglas del Skill

1. **Trazabilidad obligatoria** — toda comunicación con proveedor queda en `memory/correo.md` y `memory/historial.md`
2. **No escalar prematuramente** — primer incumplimiento = recordatorio amable; el escalamiento se gana
3. **Documentar antes de penalizar** — invocar cláusulas contractuales requiere historial documentado
4. **Reconocer el buen desempeño** — proveedores que cumplen merecen feedback positivo formal
5. **Plan B siempre identificado** para proveedores críticos (criticidad ≥ 4/5)

## Playbooks asociados

- `proveedor-incumplido` (escalación L3+)
- `recursos-criticos` (si el proveedor afecta capacidad del equipo)
- `cliente-ausente` (si el proveedor está esperando decisión del cliente)

## Output esperado

Según el modo:
- Modo 1: scorecard de evaluación con recomendación
- Modo 2: carta formal de incumplimiento + escalación
- Modo 3: plan de contingencia con alternativas y umbrales
- Modo 4: comunicado adaptado al tono y propósito

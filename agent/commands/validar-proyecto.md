# COMMAND: /validar-proyecto

## Propósito

Auditar la coherencia interna del proyecto activo: archivos faltantes, datos inconsistentes, compromisos sin responsable, métricas obsoletas, riesgos sin mitigación. Es el comando para mantener limpia la información antes de un comité, antes de cambiar de PM, o antes de un release importante.

## Cuándo usar

- Antes de un steering committee
- Antes de cambiar de PM (handover)
- Cuando se detecta que algo "no cuadra" en el proyecto
- Auditoría mensual de calidad de información
- "valida el proyecto", "audita el contexto", "revisa la coherencia"

---

## Instrucciones de ejecución

### Paso 1 — Validar archivos mínimos

Verificar que existen estos archivos (con contenido, no vacíos):

| Archivo | Crítico | Si falta o vacío |
|---|---|---|
| `context/proyecto-base.md` | 🔴 SÍ | El proyecto no puede operar |
| `context/vortexbird.md` | 🔴 SÍ | No hay margen ni modelo comercial |
| `context/stakeholders.md` | 🟡 Medio | Comunicaciones desordenadas |
| `data/cronograma.md` | 🟡 Medio | Sin baseline de fechas |
| `data/backlog.md` | 🟡 Medio | Sin backlog cargado |
| `risks/risk-register.md` | 🟠 Alto | Sin registro de riesgos |
| `metrics/dashboard.md` | 🟡 Medio | Sin KPIs trackeados |
| `memory/historial.md` | 🟠 Alto | Sin trazabilidad |

### Paso 2 — Validar coherencia de datos

#### 2.1 Compromisos
Leer `memory/compromisos.md` y validar:
- ¿Todo compromiso tiene responsable? — si no → 🔴 alertar
- ¿Todo compromiso tiene fecha límite? — si no → 🔴 alertar
- ¿Hay compromisos vencidos sin actualización > 7 días? — 🟠 alertar
- ¿Hay compromisos sin estado (pendiente/cumplido/etc)? — 🟡 alertar

#### 2.2 Riesgos
Leer `risks/risk-register.md` y validar:
- ¿Riesgos con score ≥ 0.40 sin estrategia de mitigación? → 🔴 alertar
- ¿Riesgos sin responsable? → 🟠 alertar
- ¿Riesgos sin actualización > 30 días? → 🟡 alertar

#### 2.3 Cronograma vs realidad
- Comparar `data/cronograma.md` (plan) vs `metrics/cronograma.md` (real)
- Si SPI no se calcula hace > 14 días → 🟠 alertar "métricas obsoletas"
- Si hay hitos vencidos no marcados como cumplidos → 🔴 alertar

#### 2.4 Equipo
Leer `context/equipodetrabajodev.md`, `equipodetrabajopm.md`, `equipodetrabajoqa.md`:
- ¿Hay roles críticos sin asignar? (Tech Lead, PM, QA Lead)? → 🔴 alertar
- ¿Hay personas listadas sin disponibilidad? → 🟡 alertar

#### 2.5 Financiero
Leer `metrics/financiero.md` y `context/vortexbird.md`:
- ¿BAC definido? → si no → 🔴 alertar
- ¿Margen objetivo definido? → si no → 🟠 alertar
- ¿CPI calculado en últimos 14 días? → si no → 🟠 alertar

#### 2.6 Stakeholders
Leer `context/stakeholders.md`:
- ¿Sponsor identificado? → 🔴 si no
- ¿Product Owner del cliente identificado? → 🔴 si no
- ¿Plan de comunicaciones existe? → 🟡 si no

#### 2.7 Memoria
- ¿`memory/historial.md` tiene entradas en últimos 7 días? → si no → 🟠 "proyecto desatendido"
- ¿Hay referencias a archivos que no existen? (ej: "ver minuta XYZ.md") → 🟡 alertar

### Paso 3 — Validar conformidad con CONVENCIONES.md

- ¿Algún archivo del proyecto contiene una ruta absoluta, o `brain/` o `projects/` como raíz? → 🔴
- ¿Las entradas de `memory/historial.md` siguen el formato `[YYYY-MM-DD HH:MM] {SKILL} — {desc}`? → 🟡 si no

### Paso 4 — Generar reporte de validación

```
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
🔍 AUDITORÍA DE COHERENCIA — {project_name} — {fecha}
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

PUNTUACIÓN: {N}/100  →  {🟢 Excelente / 🟡 Aceptable / 🔴 Requiere atención}

🔴 PROBLEMAS CRÍTICOS ({N}):
  • {descripción específica del problema}
    Archivo: {path}
    Acción: {qué hacer para resolverlo}

🟠 PROBLEMAS ALTOS ({N}):
  • {descripción}
    Acción: {qué hacer}

🟡 MEJORAS RECOMENDADAS ({N}):
  • {descripción}

🟢 LO QUE ESTÁ BIEN:
  ✓ {N} archivos críticos presentes y completos
  ✓ {N} compromisos activos con responsable y fecha
  ✓ {N} riesgos con estrategia documentada

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
PRÓXIMAS ACCIONES RECOMENDADAS:
  1. {acción más crítica} — Ejecutar /{comando} o editar {archivo}
  2. {segunda acción}
  3. {tercera acción}
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
```

### Paso 5 — Cálculo de puntuación

| Categoría | Peso |
|---|---|
| Archivos críticos completos | 30 pts |
| Compromisos con responsable y fecha | 15 pts |
| Riesgos con mitigación | 15 pts |
| Cronograma actualizado (SPI < 14 días) | 10 pts |
| Stakeholders identificados | 10 pts |
| Financiero al día (CPI < 14 días) | 10 pts |
| Memoria activa (historial reciente) | 10 pts |

Cada problema 🔴 resta puntos completos; 🟠 resta 50%; 🟡 resta 25%.

### Paso 6 — Actualizar historial

```
[{fecha} {hora}] VALIDACION_PROYECTO — Score: {N}/100 — {N crítico, N alto, N medio}
```

---

## Reglas del comando

1. **Hechos, no opiniones** — el reporte solo describe lo que falta o está mal, no juzga al PM
2. **Acciones concretas** — cada problema debe tener "qué hacer para resolverlo"
3. **Priorizar** — 🔴 antes que 🟠 antes que 🟡
4. **No bloquear** — el comando es informativo, no impide otras operaciones
5. **Re-ejecutable** — el PM puede correrlo varias veces para ver progreso

---

## Output esperado

- Reporte de auditoría con score numérico
- Lista priorizada de problemas con acciones
- Lo que está bien (refuerzo positivo)
- 3 próximas acciones recomendadas

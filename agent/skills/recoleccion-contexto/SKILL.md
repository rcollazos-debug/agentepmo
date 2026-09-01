---
name: recoleccion-contexto
description: Cosecha automática de contexto del proyecto desde todas las fuentes disponibles (Gmail, Google Calendar, Metabase, NotebookLM). Actualiza la memoria del proyecto sin intervención manual del PM. Se ejecuta en cada inicio de sesión y bajo demanda.
---

# SKILL: Recolección Automática de Contexto

## Rol en la arquitectura

**Este skill es el WORKER de fuentes vivas.** Se ejecuta **cada sesión** para sincronizar datos que cambian (Gmail, Calendar, Metabase). No hace entrevistas ni consultas a documentos estáticos.

```
analisis-contexto       → ORQUESTADOR (UNA VEZ al inicio del proyecto)
recoleccion-contexto    → ESTE SKILL — worker de fuentes vivas (CADA SESIÓN)
notebooklm-knowledge    → worker de documentos estáticos (BAJO DEMANDA)
```

**Este skill NO hace:**
- ❌ Entrevistar al PM — eso es `analisis-contexto`
- ❌ Consultar NotebookLM con preguntas específicas — eso es `notebooklm-knowledge`
- ❌ Procesar documentos estáticos (contratos, propuestas) — eso es `notebooklm-knowledge`
- ❌ Generar informes de estado — eso es `seguimiento-proyecto` o `informes-ejecutivos`

**Este skill SÍ hace:**
- ✅ Sync de emails recientes (Gmail) — Módulo 1
- ✅ Sync de eventos próximos (Calendar) — Módulo 2
- ✅ Sync de KPIs (Metabase) — Módulo 3
- ✅ Detección de compromisos vencidos — Módulo 5
- ✅ Detección de riesgos por silencio — Módulo 6
- ✅ Listar notebooks disponibles (Módulo 4) — pero la consulta profunda la hace `notebooklm-knowledge`

---

## Propósito

Mantener el contexto del proyecto siempre actualizado extrayendo información automáticamente de todas las fuentes disponibles sin requerir trabajo manual del PM. Cada vez que el agente arranca, este skill corre en segundo plano y actualiza los archivos relevantes con lo nuevo que encontró.

**Principio clave:** el agente debe saber lo que pasó en el proyecto incluso cuando el PM no lo reportó manualmente.

---

## Cuándo Activar

- **Automático:** en cada inicio de sesión (Paso 3 del Protocolo de Inicio de AGENT.md)
- **Manual:** cuando el PM dice "actualiza el contexto", "qué pasó mientras estuve fuera", "sincroniza"
- **Bajo demanda:** cuando se detecta que `memory/historial.md` no tiene entradas en los últimos 3 días

---

## Protocolo de Ejecución

### Módulo 1 — Recolección desde Gmail

**Objetivo:** extraer compromisos, decisiones y novedades de los emails del proyecto.

**Paso 1 — Búsqueda de emails:**
```
# Emails del proyecto en los últimos 7 días
search_threads(
  query: "{project_name} OR {client}",
  maxResults: 20,
  after: "7d"
)

# Emails con compromisos o decisiones
search_threads(
  query: "{project_name} (entregamos OR confirmamos OR quedamos OR definimos OR aprobamos OR rechazamos)",
  maxResults: 10
)

# Emails sin respuesta (posibles bloqueadores)
search_threads(
  query: "{project_name} is:unread label:inbox",
  maxResults: 10
)
```

**Paso 2 — Extracción estructurada por email:**

Para cada email encontrado, extraer:
| Campo | Qué buscar |
|---|---|
| **Compromisos** | "vamos a", "nos comprometemos", "entregaremos", "para el [fecha]" |
| **Decisiones** | "se decidió", "aprobamos", "rechazamos", "definimos" |
| **Bloqueos** | "no podemos avanzar", "necesitamos", "esperamos respuesta de", "bloqueado por" |
| **Riesgos** | "preocupa", "riesgo", "problema con", "podría afectar" |
| **Cambios de alcance** | "además necesitamos", "¿pueden agregar?", "cambio en", "fuera del alcance?" |
| **Sentimiento del cliente** | tono general: positivo / neutro / preocupado / urgente / insatisfecho |

**Paso 3 — Actualizar archivos de memoria:**

```
memory/correo.md → resumen de emails nuevos con fecha, remitente y extracto
memory/emails.md → emails que requieren acción (sin respuesta, con compromisos pendientes)
memory/compromisos.md → compromisos nuevos detectados (fecha límite, responsable, fuente: email)
memory/riesgo.md → riesgos mencionados en emails
memory/historial.md → entrada: "[fecha] SYNC GMAIL — {N} emails procesados, {M} compromisos detectados"
```

**Formato entrada `memory/correo.md`:**
```
[YYYY-MM-DD] — De: {remitente} | Asunto: {asunto}
Resumen: {1-2 líneas del contenido relevante}
Compromisos: {lista o "ninguno"}
Decisiones: {lista o "ninguna"}
Acción pendiente: {Sí/No} — {qué}
Sentimiento: {Positivo/Neutro/Preocupado/Urgente}
```

---

### Módulo 2 — Recolección desde Google Calendar

**Objetivo:** mantener actualizada la agenda del proyecto y anticipar reuniones, entregas e hitos.

**Paso 1 — Buscar eventos relevantes:**
```
# Eventos próximos 14 días
Buscar en calendario: eventos que contengan:
  - "{project_name}"
  - "{client}"
  - "sprint", "review", "retro", "planning", "daily"
  - "kickoff", "kick-off", "inicio"
  - "comité", "steering", "committee"
  - "entrega", "demo", "UAT", "go-live", "release"
  - "reunión", "meeting", "{PM name}"
```

**Paso 2 — Clasificar eventos:**
| Tipo | Ejemplos | Acción del agente |
|---|---|---|
| **Ceremonia Scrum** | Sprint Planning, Review, Retro | Ofrecer preparación anticipada |
| **Hito de entrega** | Demo, UAT, Go-live | Alertar 3 días antes + checklist |
| **Comité directivo** | Steering, Comité mensual | Ofrecer `/comite` con 5 días de anticipación |
| **Reunión con cliente** | Cualquier meeting con {client} | Preparar agenda si se solicita |
| **Cierre de sprint** | Fin de sprint según fechas | Recordar `/sprint` (review + retro) |

**Paso 3 — Actualizar archivos:**
```
data/cronograma.md → si hay hitos nuevos o cambios de fecha
memory/historial.md → entrada de sync con eventos detectados
```

**Salida al PM:**
```
📅 AGENDA DETECTADA ({N} eventos próximos):
  Hoy: {evento si hay}
  Esta semana:
    - {fecha corta}: {nombre del evento}
    - {fecha corta}: {nombre del evento}
  Próximas 2 semanas:
    - {fecha}: {evento importante}
```

---

### Módulo 3 — Recolección desde Metabase

**Objetivo:** actualizar los KPIs del proyecto con datos reales del sistema.

**Paso 1 — Consultar dashboards disponibles:**
```
# Listar bases de datos y dashboards
list_databases()
→ Identificar base de datos del proyecto

# Buscar dashboard del proyecto
Buscar dashboard que contenga: "{project_name}", "{client}", "PMO", "proyecto"
```

**Paso 2 — Extraer métricas clave:**

Si se encuentra dashboard del proyecto, extraer:
| Métrica | Dónde buscar | Archivo destino |
|---|---|---|
| Tareas completadas vs. planificadas | Dashboard de delivery | `metrics/delivery.md` |
| Horas consumidas vs. presupuestadas | Dashboard financiero | `metrics/financiero.md` |
| Defectos abiertos | Dashboard de QA | `metrics/calidad.md` |
| Velocidad del equipo | Burndown / velocity | `metrics/delivery.md` |
| % de avance del proyecto | Progreso general | `metrics/dashboard.md` |

**Paso 3 — Calcular indicadores EVM:**
Con los datos extraídos, calcular (si hay suficiente data):
```
PV = Valor Planificado (% avance esperado × BAC)
EV = Valor Ganado (% avance real × BAC)
AC = Costo Real (horas consumidas × tarifa)
SPI = EV / PV
CPI = EV / AC
```

Actualizar `metrics/financiero.md` y `metrics/cronograma.md`.

**Alertas automáticas si:**
- SPI < 0.90 → notificar en briefing de apertura
- CPI < 0.90 → notificar en briefing de apertura
- Defectos abiertos > umbral → notificar

---

### Módulo 4 — Recolección desde NotebookLM

**Objetivo:** detectar documentos nuevos o actualizados del proyecto y extraer información relevante.

**Paso 1 — Listar notebooks:**
```
notebook_list()
→ Filtrar por: "{project_name}", "{client}", "propuesta", "contrato", "acta"
```

**Paso 2 — Para cada notebook del proyecto:**
```
# Si hay documentos nuevos desde la última sesión
Consultar: "¿Qué compromisos o fechas clave hay en este documento?"
Consultar: "¿Hay cambios de alcance o nuevos requerimientos?"
Consultar: "¿Hay información de presupuesto, contrato o condiciones comerciales?"
```

**Paso 3 — Actualizar archivos según lo encontrado:**
- Cambios de alcance → `context/proyecto-base.md` + riesgo en `risks/risk-register.md`
- Fechas nuevas → `data/cronograma.md`
- Condiciones comerciales → `context/contrato.md`
- Compromisos → `memory/compromisos.md`

---

### Módulo 5 — Detección de Compromisos Vencidos

**Objetivo:** identificar proactivamente compromisos que ya pasaron su fecha límite.

**Proceso:**
1. Leer `memory/compromisos.md`
2. Para cada compromiso con `estado: Pendiente`:
   - ¿La fecha límite ya pasó? → Compromiso **vencido** 🔴
   - ¿La fecha límite es hoy o mañana? → Compromiso **urgente** 🟡
   - ¿La fecha es en 3–5 días? → Compromiso **próximo** ℹ️

**Formato de reporte al PM:**
```
📋 COMPROMISOS ACTIVOS:
  🔴 VENCIDOS ({N}):
    - "{compromiso}" — Responsable: {nombre} — Venció: {fecha}
    - ...
  🟡 URGENTES HOY/MAÑANA ({N}):
    - "{compromiso}" — Responsable: {nombre} — Vence: {fecha}
  ℹ️  PRÓXIMOS 5 DÍAS ({N}):
    - "{compromiso}" — Vence: {fecha}
```

Si hay compromisos vencidos → incluir en briefing de apertura como alerta 🔴.

---

### Módulo 6 — Detección de Riesgos por Silencio

**Objetivo:** identificar situaciones de riesgo que no fueron reportadas explícitamente.

**Señales de riesgo que el agente detecta automáticamente:**

| Señal | Umbral | Riesgo inferido |
|---|---|---|
| `memory/historial.md` sin entradas > 5 días | 5 días | El proyecto está desatendido o no se documenta |
| `memory/correo.md` sin actualizaciones > 3 días | 3 días | Puede haber comunicaciones no procesadas |
| Cliente sin aparecer en emails > 7 días | 7 días | Riesgo de cliente ausente |
| Sprint sin `/sprint` registrado > 14 días | 14 días | Posible sprint sin ceremonies |
| `risks/risk-register.md` sin revisión > 14 días | 14 días | Riesgos posiblemente desactualizados |

Si se detectan señales → incluir en briefing proactivo.

---

### Módulo 7 — Análisis de Tendencias Predictivas (CPI/SPI)

**Objetivo:** anticipar crisis financieras o de cronograma ANTES de que ocurran, no después.

**Paso 1 — Cargar histórico de KPIs:**
```
{project_path}/metrics/financiero.md     (CPI histórico por periodo)
{project_path}/metrics/cronograma.md     (SPI histórico por periodo)
```

**Paso 2 — Calcular tendencias:**

Comparar los últimos 4-6 puntos de medición:

```
Δ_CPI = CPI_actual - CPI_hace_4_periodos
ratio_decay_CPI = Δ_CPI / 4   (caída por periodo)

Δ_SPI = SPI_actual - SPI_hace_4_periodos
ratio_decay_SPI = Δ_SPI / 4
```

**Paso 3 — Proyección lineal:**

Si `ratio_decay < 0` (cayendo):
- Calcular cuántos periodos hasta llegar a 0.85 (umbral amarillo) → 🟡 alerta temprana
- Calcular cuántos periodos hasta llegar a 0.75 (umbral rojo) → 🔴 alerta crítica

```
Ejemplo:
  CPI hoy: 0.93
  CPI hace 4 sprints: 0.99
  Caída: -0.06 en 4 sprints = -0.015 por sprint
  Proyección: en 5 sprints → CPI 0.85 (amarillo)
                en 12 sprints → CPI 0.75 (rojo)
  
🟡 ALERTA PREDICTIVA: CPI con tendencia descendente.
   Si la trayectoria se mantiene, CPI alcanzará umbral amarillo en {fecha estimada}.
   Acción sugerida: revisar causas raíz antes de Sprint {N+2}.
```

**Paso 4 — Detectar aceleraciones:**

Si la tendencia se acelera (caída más rápida que la lineal), alertar más fuerte:
```
🔴 DETERIORO ACELERADO: CPI cayendo más rápido cada periodo
   Sprint -3: -0.01
   Sprint -2: -0.02
   Sprint -1: -0.04
   Acción urgente: activar /margen y entender causa raíz
```

**Paso 5 — Actualizar archivos:**
- `metrics/financiero.md` → seccción "Análisis de tendencia"
- `memory/historial.md` → entrada `[fecha] TENDENCIA_KPI — CPI: {trend}, SPI: {trend}`
- Si hay alerta predictiva → appendear a `risks/risk-register.md`

---

### Módulo 8 — Calendar Gap Detection

**Objetivo:** detectar reuniones que DEBERÍAN existir pero no están agendadas.

**Paso 1 — Ceremonias esperadas según metodología:**

Si el proyecto usa Scrum (de `context/proyecto-base.md`):

| Ceremonia | Cadencia esperada | Si falta |
|---|---|---|
| Daily Standup | Diaria (días hábiles) | 🟡 alertar si > 3 días sin daily |
| Sprint Planning | Inicio de cada sprint | 🔴 alertar si próximo sprint en < 3 días sin Planning agendado |
| Sprint Review | Fin de cada sprint | 🟡 alertar si fin de sprint en < 2 días sin Review |
| Sprint Retro | Fin de cada sprint | 🟡 alertar si fin de sprint en < 2 días sin Retro |
| Refinement | Mid-sprint | 🟢 sugerir si no aparece |

Si proyecto Kanban:
- Daily / Weekly stand-up esperado
- Replenishment meeting

**Paso 2 — Reuniones con cliente esperadas:**

De `context/stakeholders.md` (plan de comunicaciones):

| Reunión | Cadencia esperada | Si falta |
|---|---|---|
| Status weekly con cliente | Semanal | 🟡 si > 10 días sin reunión cliente agendada |
| Comité directivo | Mensual o quincenal | 🔴 si próximo comité sin agendar < 7 días antes |
| Demo / Showcase | Por release | 🟡 si próxima entrega sin demo agendada |

**Paso 3 — Detectar y alertar:**

```
📅 GAPS EN AGENDA DETECTADOS:

🔴 CRÍTICO:
  - Sprint {N+1} Planning no agendado (sprint inicia en 2 días)
    → Sugerir: agendar para mañana 9:00am

🟡 ALERTA:
  - Sin daily standup desde el 2026-04-25 (3 días)
    → Verificar si el equipo está ejecutando sin facilitar
  - Sin reunión semanal con cliente en últimos 10 días
    → Sugerir: programar status call esta semana

🟢 SUGERENCIA:
  - Refinement de mid-sprint no aparece
    → Considera agendar para mantener calidad del backlog
```

**Paso 4 — Acción del agente:**

Si hay 🔴 crítico, ofrecer al PM:
```
¿Quieres que prepare un email de invitación para agendar el Sprint Planning?
```

---

### Módulo 9 — Circuit Breaker (Auto-escalación de Alertas Ignoradas)

**Objetivo:** prevenir que el PM ignore señales críticas hasta que se conviertan en crisis.

**Paso 1 — Auditar alertas pasadas:**

Leer `memory/historial.md` últimos 14 días y buscar entradas marcadas como alerta:
- `[fecha] ALERTA_ROJA — ...`
- `[fecha] BLOQUEADOR_CRITICO — ...`
- `[fecha] COMPROMISO_VENCIDO — ...`

**Paso 2 — Detectar patrones de ignoración:**

Para cada alerta crítica (🔴) registrada, verificar:
- ¿Hay entrada de seguimiento posterior?
- ¿Se registró acción tomada?
- ¿La métrica relacionada mejoró?

Si una alerta crítica:
- No tiene seguimiento en > 3 días → 🟠 ignorada
- No tiene acción tomada en > 5 días → 🔴 ignorada críticamente
- Se repite en 2+ sesiones consecutivas → 🔴 patrón de ignoración

**Paso 3 — Activar circuit breaker:**

```
🚨 CIRCUIT BREAKER ACTIVADO

Patrón detectado: el PM ha ignorado {N} alertas críticas en los últimos {M} días.

ALERTAS IGNORADAS:
  1. {alerta 1} — Detectada el {fecha} — Sin acción registrada hace {N} días
  2. {alerta 2} — Detectada el {fecha} — Repetida {N} veces
  3. {alerta 3} — ...

ACCIÓN OBLIGATORIA DEL AGENTE:
  - Detener el flujo normal
  - Antes de cualquier otra interacción, exigir respuesta sobre estas alertas
  - Si el PM las ignora 1 vez más → activar /escalar nivel L2 automáticamente
    (notificación al Gerente PMO con copia al PM)
```

**Paso 4 — Mensaje del agente al PM:**

```
🛑 NECESITO TU ATENCIÓN ANTES DE CONTINUAR

Como Director PMO, mi rol incluye no dejar pasar señales críticas.
Detecté que estas alertas tienen {N} días sin acción:

{lista}

Por favor, dime para cada una:
  a) Está siendo gestionada (con quién y cómo)
  b) Tiene fecha de resolución (cuándo)
  c) Ya no es relevante (por qué)

Si en la próxima sesión siguen sin acción, activaré escalación al
Gerente PMO automáticamente. No es opcional.
```

**Paso 5 — Auto-escalación si persiste:**

Si en la siguiente sesión el patrón continúa:
- Generar email de escalación L2 automático (con CC al PM)
- Registrar en `memory/historial.md`: `[fecha] AUTO_ESCALACION — Activada por circuit breaker`
- Crear entrada en `risks/risk-register.md`: "Riesgo de gestión - alertas ignoradas sostenidamente"

---

## Salida Consolidada del Skill

Al terminar la recolección, generar un resumen para el briefing de apertura:

```
🔄 SINCRONIZACIÓN COMPLETADA — {fecha} {hora}

FUENTES PROCESADAS Y ANÁLISIS PREDICTIVO:
  📬 Gmail: {N} emails nuevos | {M} compromisos detectados | {K} sin respuesta
  📅 Calendar: {N} eventos próximos | Próximo hito: {nombre} en {N} días
  📊 Metabase: SPI={x} | CPI={x} | Margen actual={x}%
  📚 NotebookLM: {N} documentos revisados | {M} actualizaciones detectadas
  📈 Tendencias: CPI {↑↓→} | SPI {↑↓→} | Proyección: {alerta o "estable"}
  📅 Calendar Gaps: {N} ceremonias/reuniones faltantes detectadas
  🛑 Circuit Breaker: {N} alertas pasadas sin atender ({estado})

ARCHIVOS ACTUALIZADOS:
  ✓ memory/correo.md (+{N} entradas)
  ✓ memory/compromisos.md ({M} compromisos activos)
  ✓ metrics/dashboard.md (KPIs actualizados)
  [otros archivos modificados]

NOVEDADES PARA EL PM:
  [lista de hallazgos que requieren atención]
```

---

## Reglas del Skill

1. **Correr en paralelo** — los 6 módulos se ejecutan simultáneamente cuando hay MCPs disponibles
2. **Nunca interrumpir** — si un módulo falla (MCP no disponible), los demás continúan
3. **Solo escribir novedades** — no sobreescribir entradas anteriores en memoria, solo appendear
4. **Respetar formato de archivos** — mantener la estructura existente de cada archivo
5. **Silencio sobre lo que no encontró** — si un MCP no está disponible, no reportarlo al PM a menos que sea Gmail
6. **Extractos cortos** — máximo 2 líneas por email en `memory/correo.md` — calidad sobre cantidad
7. **Inferir sin alucinaciones** — si no hay dato suficiente, marcar como `[Sin datos suficientes]`, no inventar
8. **Frecuencia mínima** — si el PM no ha abierto ChatPM en 3+ días, al volver mostrar resumen "mientras estuviste fuera"

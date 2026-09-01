---
name: metabase-dashboard
description: Construye dashboards ejecutivos de gestión de proyectos en Metabase. Detecta el tipo de dashboard solicitado, extrae datos reales de los archivos del proyecto, adapta las tarjetas a la fase y a la información disponible, y ejecuta la secuencia completa de llamadas MCP para generar el tablero funcional.
---

# SKILL: Dashboard de Gestión en Metabase

## Propósito

Construir dashboards de gestión directamente en Metabase, adaptados a lo que el PM necesita ver en ese momento. El skill detecta qué tipo de análisis se solicita, extrae los valores reales del proyecto, decide qué tarjetas tienen sentido dado el estado actual, y ejecuta la secuencia de llamadas MCP para entregar un dashboard funcional con la URL lista para compartir.

**Este skill ejecuta acciones MCP. No genera reportes de texto.**

---

## Base PMBOK 8

- **Dominios:** Medición · Entrega · Incertidumbre · Equipo · Trabajo del Proyecto
- **Principios:** Enfocarse en el valor · Navegar la complejidad · Demostrar liderazgo

---

## Cuándo Activar

- "genera dashboard", "crea tablero", "dame un tablero", "quiero ver el estado en Metabase"
- "dashboard financiero", "tablero de riesgos", "dashboard del sprint", "tablero de calidad"
- "crea un dashboard para el comité", "necesito ver las métricas en Metabase"
- Comando `/dashboard` ejecutado

---

## FASE 1 — Detectar qué tipo de dashboard se necesita

Leer la solicitud del usuario e identificar el tipo. Si no es explícito, usar **Ejecutivo** por defecto.

| Palabras clave | Tipo de dashboard |
|---|---|
| "ejecutivo", "status", "estado", "comité", "general", sin especificar | `EJECUTIVO` |
| "financiero", "presupuesto", "EVM", "margen", "costos", "CPI" | `FINANCIERO` |
| "sprint", "backlog", "velocidad", "delivery", "entrega", "burndown" | `SPRINT` |
| "riesgos", "risk", "amenazas", "incertidumbre" | `RIESGOS` |
| "calidad", "defectos", "bugs", "QA", "testing" | `CALIDAD` |
| "equipo", "capacidad", "utilización", "team" | `EQUIPO` |
| "cronograma", "hitos", "fases", "timeline", "fechas" | `CRONOGRAMA` |
| "compromisos", "pendientes", "vencidos", "tareas" | `COMPROMISOS` |
| "completo", "todo", "integral", "full" | `COMPLETO` |

---

## FASE 2 — Extracción de datos del proyecto

### 2.1 Datos base (leer siempre)

Leer `{project_path}/context/proyecto-base.md` y extraer:
- `[PROYECTO]` = nombre del proyecto
- `[CLIENTE]` = nombre del cliente
- `[PM]` = nombre del project manager
- `[FASE]` = fase actual (Inicio / Planeación / Ejecución / Monitoreo / Cierre)
- `[FECHA_INICIO]` = fecha de inicio real (si no hay, planificada)
- `[FECHA_FIN]` = fecha de entrega planificada baseline
- `[BAC]` = presupuesto total en número (sin $ ni comas, ej: 20000)

### 2.2 Datos por archivo (leer solo lo que el tipo de dashboard necesita)

**Para EJECUTIVO, COMPLETO:** leer todos los archivos abajo.
**Para tipos específicos:** leer solo los archivos indicados.

---

**`{project_path}/metrics/dashboard.md`** → EJECUTIVO, COMPLETO
- `[SEMAFORO_RAW]` = "VERDE", "AMARILLO" o "ROJO" (sin emoji)
- `[AVANCE_PCT]` = número del % de avance (0 si no hay)
- `[SIGUIENTE_HITO]` = nombre del próximo hito no completado
- `[FECHA_HITO]` = fecha del próximo hito (formato dd-mmm-yyyy)
- `[DIAS_RESTANTES]` = días hasta fecha fin (calcular si no está explícito)

**`{project_path}/metrics/financiero.md`** → FINANCIERO, EJECUTIVO, COMPLETO
- `[EV]` = número (0 si dice "$0" o "Sin trabajo completado")
- `[AC]` = número (0 si dice "$0")
- `[PV]` = número (0 si dice "$0")
- `[CV]` = número (0 si dice "$0")
- `[CPI]` = número decimal. Si dice "N/A" o "Por iniciar" → `null`
- `[EAC]` = número. Si dice "—" o "Por calcular" → `null`
- `[RESERVA_CONTINGENCIA]` = número
- `[BURN_RATE_MES]` = tabla mes/planificado/real (extraer como texto resumido)

**`{project_path}/metrics/cronograma.md`** → CRONOGRAMA, EJECUTIVO, COMPLETO
- `[SPI]` = número decimal. Si "N/A" → `null`
- `[SV]` = número (0 si "$0")
- `[PCT_TIEMPO]` = % del tiempo transcurrido (número)
- `[PCT_REAL]` = % completado real (número)
- `[HITOS_COMPLETADOS]` = conteo de hitos con Estado = COMPLETADO
- `[HITOS_TOTAL]` = total de hitos en la tabla

**`{project_path}/metrics/delivery.md`** → SPRINT, EJECUTIVO (si fase=Ejecución), COMPLETO
- `[SP_ENTREGADOS]` = story points entregados acumulado (0 si no hay)
- `[VELOCIDAD_PROMEDIO]` = SP por sprint promedio. `null` si no hay
- `[SPRINT_NUM]` = número de sprint actual. `null` si no hay
- `[HISTORIAS_DONE]` = historias completadas acumuladas (0 si no hay)
- `[PCT_BACKLOG]` = % del backlog completado (0 si no hay)

**`{project_path}/metrics/calidad.md`** → CALIDAD, EJECUTIVO (si hay datos), COMPLETO
- `[DEFECTOS_CRITICOS]` = número (0 si no hay)
- `[DEFECTOS_ALTOS]` = número (0 si no hay)
- `[TASA_DEFECTOS]` = bugs/SP. `null` si no hay
- `[COBERTURA_PRUEBAS]` = % cobertura. `null` si no hay

**`{project_path}/metrics/capacidad.md`** → EQUIPO, COMPLETO
- `[UTILIZACION_PROMEDIO]` = % utilización promedio. `null` si no hay
- `[VELOCIDAD_PROMEDIO_CAP]` = SP/sprint promedio de capacidad. `null` si no hay

**`{project_path}/memory/riesgo.md`** → RIESGOS, EJECUTIVO, COMPLETO
- `[RIESGOS_CRITICOS]` = conteo de riesgos con Score >= 0.40 (0 si no hay)
- `[RIESGOS_ALTOS]` = conteo Score 0.20-0.39 (0 si no hay)
- `[RIESGOS_TOTAL]` = total activos

**`{project_path}/memory/compromisos.md`** → COMPROMISOS, EJECUTIVO, COMPLETO
- `[COMPROMISOS_VENCIDOS]` = conteo Estado = "Vencido" (0 si no hay)
- `[COMPROMISOS_CURSO]` = conteo Estado = "En curso" o "Pendiente"

### 2.3 Regla de valores nulos

Si un valor es `null` y se usaría en SQL, reemplazar por la cadena `'N/A'` en la query. Si un valor numérico es `null` y se usaría en un `scalar`, omitir esa tarjeta para evitar mostrar datos vacíos.

---

## FASE 3 — Decidir las tarjetas según tipo y fase

### Catálogo de tarjetas por tipo de dashboard

**EJECUTIVO** (fase Inicio: A, B, E, F, G, H / fase Ejecución+: todas):
A. Estado General (siempre)
B. Presupuesto BAC (siempre)
C. SPI (solo si no es null)
D. CPI (solo si no es null)
E. Días hasta GO-LIVE (siempre)
F. Próximo Hito (siempre)
G. Riesgos Activos — tabla (siempre)
H. Estado de Hitos — tabla (siempre)
I. Distribución del Presupuesto — barra
J. Fases del Proyecto — tabla

**FINANCIERO:** B, C, D, I + tabla EVM completa + tabla burn rate mensual

**SPRINT:** velocidad promedio, % backlog completado, SP entregados, historias done, % avance sprint actual, tabla estado historias sprint

**RIESGOS:** tabla riesgos críticos/altos/medios, compromisos vencidos, semáforo de riesgos

**CALIDAD:** defectos críticos, defectos altos, tasa de defectos, cobertura pruebas, tabla defectos por sprint

**EQUIPO:** utilización promedio, velocidad histórica, composición del equipo, ausencias críticas

**CRONOGRAMA:** A, E, F, H, J + SPI, % avance vs % tiempo

**COMPROMISOS:** compromisos vencidos, compromisos en curso, tabla compromisos por responsable

**COMPLETO:** todas las tarjetas que tengan datos válidos

---

## FASE 4 — Ejecución MCP (secuencia obligatoria)

**EJECUTAR EN ORDEN. Guardar cada ID retornado antes de continuar.**

### Paso 4.1 — Obtener base de datos

Llamar a `list_databases`.
- Guardar el `id` de la primera entrada con `is_sample: true` como `[DB_ID]`.
- Si no hay `is_sample`, usar el `id` de la primera base de datos activa.
- Si la lista está vacía → detener y reportar: *"Metabase no tiene bases de datos. Agrega una conexión en Admin → Databases."*

### Paso 4.2 — Crear colección

Llamar a `create_collection`:
```
name: "PMO — [PROYECTO]"
description: "Seguimiento ejecutivo. Cliente: [CLIENTE] | PM: [PM]"
```
Guardar `id` → `[COLLECTION_ID]`

Si ya existe una colección con ese nombre (error de duplicado), usar `list_collections` para obtener el ID existente.

### Paso 4.3 — Crear dashboard

Llamar a `create_dashboard`:
```
name: "[PROYECTO] — [TIPO_LABEL]"
description: "Dashboard [TIPO_LABEL] | Fase: [FASE] | Cliente: [CLIENTE] | PM: [PM] | Inicio: [FECHA_INICIO] | GO-LIVE: [FECHA_FIN]"
collection_id: [COLLECTION_ID]
```

Donde `[TIPO_LABEL]` es: "Seguimiento Ejecutivo" / "Control Financiero" / "Sprint Dashboard" / "Gestión de Riesgos" / "Calidad del Producto" / "Capacidad del Equipo" / "Control de Cronograma" / "Compromisos" / "Dashboard Integral"

Guardar `id` → `[DASHBOARD_ID]`

### Paso 4.4 — Crear tarjetas

Para cada tarjeta decidida en Fase 3, llamar a `create_card` con la plantilla correspondiente del Catálogo (Fase 5).

Guardar los IDs en orden: `[CARD_IDS]` = lista de IDs en el orden de creación.

### Paso 4.5 — Agregar tarjetas al dashboard con layout

Llamar a `update_dashboard_cards` con el siguiente formato:

```json
{
  "dashboard_id": [DASHBOARD_ID],
  "cards": [
    {"id": -1, "card_id": CARD_IDS[0], "col": 0,  "row": 0, "size_x": 4, "size_y": 3, "parameter_mappings": [], "visualization_settings": {}, "series": []},
    {"id": -2, "card_id": CARD_IDS[1], "col": 4,  "row": 0, "size_x": 4, "size_y": 3, ...},
    ...
  ]
}
```

**Layout estándar por tipo de dashboard (columnas 0–15, 16 total):**

*EJECUTIVO — 4 rows:*
- Row 0: Estado (0–3), BAC (4–7), Días GO-LIVE (8–11), Próximo Hito (12–15) → size_x=4, size_y=3
- Row 3: SPI (0–5, size_x=6), CPI (6–11, size_x=6), Compromisos Vencidos (12–15, size_x=4) → size_y=4
- Row 7: Riesgos tabla (0–7, size_x=8), Hitos tabla (8–15, size_x=8) → size_y=5
- Row 12: Distribución Presupuesto barra (0–9, size_x=10), Fases tabla (10–15, size_x=6) → size_y=6

*FINANCIERO — 3 rows:*
- Row 0: BAC (0–3), EV (4–7), AC (8–11), CPI (12–15) → size_x=4, size_y=3
- Row 3: Tabla EVM completa (0–9, size_x=10), Distribución Presupuesto (10–15, size_x=6) → size_y=6
- Row 9: Burn Rate mensual (0–15, size_x=16) → size_y=5

*RIESGOS — 2 rows:*
- Row 0: Riesgos Críticos (0–3), Riesgos Altos (4–7), Total Riesgos (8–11), Compromisos Vencidos (12–15) → size_x=4, size_y=3
- Row 3: Tabla riesgos (0–15, size_x=16) → size_y=7

*SPRINT — 3 rows:*
- Row 0: Sprint # (0–3), SP Entregados (4–7), Velocidad Promedio (8–11), % Backlog (12–15) → size_x=4, size_y=3
- Row 3: % Avance (0–7, size_x=8), Historias Done (8–15, size_x=8) → size_y=4
- Row 7: Tabla historias por estado (0–15, size_x=16) → size_y=5

*CRONOGRAMA — 3 rows:*
- Row 0: Estado (0–3), SPI (4–9, size_x=6), Días GO-LIVE (10–15, size_x=6) → size_y=3
- Row 3: % Avance vs % Tiempo (0–7, size_x=8), Próximo Hito (8–15, size_x=8) → size_y=4
- Row 7: Fases (0–9, size_x=10), Hitos (10–15, size_x=6) → size_y=6

*CALIDAD — 3 rows:*
- Row 0: Defectos Críticos (0–3), Defectos Altos (4–7), Tasa Defectos (8–11), Cobertura Pruebas (12–15) → size_x=4, size_y=3
- Row 3: Tabla defectos por sprint (0–15, size_x=16) → size_y=6

**Si `update_dashboard_cards` falla:** Reportar al usuario los card IDs creados y el link de la colección donde están disponibles para agregarlos manualmente al dashboard desde la UI de Metabase con drag-and-drop.

### Paso 4.6 — Resultado final

Responder siempre con:
```
✅ Dashboard listo en Metabase

📊 [PROYECTO] — [TIPO_LABEL]
🔗 http://localhost:3000/dashboard/[DASHBOARD_ID]

[N] tarjetas creadas:
[lista con nombre de cada tarjeta y su valor principal]

Fase del proyecto: [FASE] | Semáforo: [🟢/🟡/🔴]
```

---

## FASE 5 — Catálogo de plantillas SQL por tarjeta

Todas las queries usan `type: "native"` con `database: [DB_ID]`. Son SELECTs estáticos que no requieren tablas — funcionan con cualquier base de datos conectada, incluyendo la Sample Database que Metabase incluye por defecto.

**Regla de formato:** Reemplazar cada `[VARIABLE]` con el valor real extraído de los archivos. Los valores de texto van entre comillas simples en el SQL. Los valores numéricos van sin comillas.

---

### T-01 Estado General
```json
{
  "name": "[PROYECTO] | Estado General",
  "display": "scalar",
  "dataset_query": {"database": DB_ID, "type": "native",
    "native": {"query": "SELECT '[EMOJI_SEMAFORO] [SEMAFORO_RAW]' AS \"Estado del Proyecto\""}},
  "visualization_settings": {}
}
```
`[EMOJI_SEMAFORO]` = 🟢 si VERDE, 🟡 si AMARILLO, 🔴 si ROJO.

---

### T-02 Presupuesto (BAC)
```json
{
  "name": "[PROYECTO] | Presupuesto (BAC)",
  "display": "scalar",
  "dataset_query": {"database": DB_ID, "type": "native",
    "native": {"query": "SELECT [BAC] AS \"Presupuesto Total (USD)\""}},
  "visualization_settings": {
    "column_settings": {"[\"name\",\"Presupuesto Total (USD)\"]": {"number_style": "currency", "currency": "USD"}}
  }
}
```

---

### T-03 SPI (solo si SPI no es null)
```json
{
  "name": "[PROYECTO] | SPI",
  "display": "scalar",
  "dataset_query": {"database": DB_ID, "type": "native",
    "native": {"query": "SELECT [SPI] AS \"SPI (Cronograma)\""}},
  "visualization_settings": {}
}
```

---

### T-04 CPI (solo si CPI no es null)
```json
{
  "name": "[PROYECTO] | CPI",
  "display": "scalar",
  "dataset_query": {"database": DB_ID, "type": "native",
    "native": {"query": "SELECT [CPI] AS \"CPI (Costo)\""}},
  "visualization_settings": {}
}
```

---

### T-05 Días hasta GO-LIVE
```json
{
  "name": "[PROYECTO] | Días hasta GO-LIVE",
  "display": "scalar",
  "dataset_query": {"database": DB_ID, "type": "native",
    "native": {"query": "SELECT [DIAS_RESTANTES] AS \"Días Restantes\""}},
  "visualization_settings": {}
}
```

---

### T-06 Próximo Hito
```json
{
  "name": "[PROYECTO] | Próximo Hito",
  "display": "scalar",
  "dataset_query": {"database": DB_ID, "type": "native",
    "native": {"query": "SELECT '[SIGUIENTE_HITO] — [FECHA_HITO]' AS \"Próximo Hito\""}},
  "visualization_settings": {}
}
```

---

### T-07 Riesgos Activos — tabla
```json
{
  "name": "[PROYECTO] | Riesgos Activos",
  "display": "table",
  "dataset_query": {"database": DB_ID, "type": "native",
    "native": {"query": "SELECT 'Críticos (≥0.40)' AS \"Nivel\", [RIESGOS_CRITICOS] AS \"Cantidad\" UNION ALL SELECT 'Altos (0.20-0.39)', [RIESGOS_ALTOS] UNION ALL SELECT 'Total activos', [RIESGOS_TOTAL]"}},
  "visualization_settings": {}
}
```

---

### T-08 Estado de Hitos — tabla
```json
{
  "name": "[PROYECTO] | Estado de Hitos",
  "display": "table",
  "dataset_query": {"database": DB_ID, "type": "native",
    "native": {"query": "SELECT 'Completados' AS \"Estado\", [HITOS_COMPLETADOS] AS \"Cantidad\" UNION ALL SELECT 'Pendientes', [HITOS_TOTAL]-[HITOS_COMPLETADOS] UNION ALL SELECT 'Total', [HITOS_TOTAL]"}},
  "visualization_settings": {}
}
```

---

### T-09 Distribución del Presupuesto — barra
```json
{
  "name": "[PROYECTO] | Distribución Presupuesto",
  "display": "bar",
  "dataset_query": {"database": DB_ID, "type": "native",
    "native": {"query": "SELECT 'Desarrollo' AS \"Componente\", [BAC_DESARROLLO] AS \"USD\" UNION ALL SELECT 'Testing', [BAC_TESTING] UNION ALL SELECT 'Gestión', [BAC_GESTION] UNION ALL SELECT 'Reserva', [BAC_RESERVA]"}},
  "visualization_settings": {}
}
```
Si los componentes individuales no están disponibles, usar query simplificada: `SELECT 'Total' AS "Componente", [BAC] AS "USD"`.

---

### T-10 Fases del Proyecto — tabla
```json
{
  "name": "[PROYECTO] | Fases del Proyecto",
  "display": "table",
  "dataset_query": {"database": DB_ID, "type": "native",
    "native": {"query": "SELECT '[FASE1]' AS \"Fase\", '[FECHA_INI_F1] – [FECHA_FIN_F1]' AS \"Período\", '[ESTADO_F1]' AS \"Estado\" UNION ALL SELECT '[FASE2]','[FECHA_INI_F2] – [FECHA_FIN_F2]','[ESTADO_F2]' UNION ALL ..."}},
  "visualization_settings": {}
}
```
Construir el UNION ALL con tantas filas como fases existan en `{project_path}/metrics/cronograma.md`. Estado: "🔄 En curso" / "⏳ Pendiente" / "✅ Completada".

---

### T-11 Tabla EVM Completa
```json
{
  "name": "[PROYECTO] | Indicadores EVM",
  "display": "table",
  "dataset_query": {"database": DB_ID, "type": "native",
    "native": {"query": "SELECT 'BAC' AS \"Indicador\", '$[BAC]' AS \"Valor\" UNION ALL SELECT 'PV','$[PV]' UNION ALL SELECT 'EV','$[EV]' UNION ALL SELECT 'AC','$[AC]' UNION ALL SELECT 'SV (EV-PV)','$[SV]' UNION ALL SELECT 'CV (EV-AC)','$[CV]' UNION ALL SELECT 'SPI (EV/PV)','[SPI_STR]' UNION ALL SELECT 'CPI (EV/AC)','[CPI_STR]' UNION ALL SELECT 'EAC','[EAC_STR]'"}},
  "visualization_settings": {}
}
```
`[SPI_STR]` = valor numérico o 'N/A'. `[EAC_STR]` = valor con $ o 'Por calcular'.

---

### T-12 Compromisos Vencidos
```json
{
  "name": "[PROYECTO] | Compromisos Vencidos",
  "display": "scalar",
  "dataset_query": {"database": DB_ID, "type": "native",
    "native": {"query": "SELECT [COMPROMISOS_VENCIDOS] AS \"Compromisos Vencidos\""}},
  "visualization_settings": {}
}
```

---

### T-13 Story Points Entregados (solo si SP_ENTREGADOS > 0)
```json
{
  "name": "[PROYECTO] | SP Entregados",
  "display": "scalar",
  "dataset_query": {"database": DB_ID, "type": "native",
    "native": {"query": "SELECT [SP_ENTREGADOS] AS \"Story Points Entregados\""}},
  "visualization_settings": {}
}
```

---

### T-14 Velocidad del Equipo (solo si VELOCIDAD_PROMEDIO no es null)
```json
{
  "name": "[PROYECTO] | Velocidad Promedio",
  "display": "scalar",
  "dataset_query": {"database": DB_ID, "type": "native",
    "native": {"query": "SELECT [VELOCIDAD_PROMEDIO] AS \"SP / Sprint (promedio)\""}},
  "visualization_settings": {}
}
```

---

### T-15 Defectos Críticos Abiertos
```json
{
  "name": "[PROYECTO] | Defectos Críticos",
  "display": "scalar",
  "dataset_query": {"database": DB_ID, "type": "native",
    "native": {"query": "SELECT [DEFECTOS_CRITICOS] AS \"Defectos Críticos Abiertos\""}},
  "visualization_settings": {}
}
```

---

### T-16 % Avance del Proyecto
```json
{
  "name": "[PROYECTO] | Avance del Proyecto",
  "display": "scalar",
  "dataset_query": {"database": DB_ID, "type": "native",
    "native": {"query": "SELECT [AVANCE_PCT] AS \"Avance (%)\""}},
  "visualization_settings": {}
}
```

---

### T-17 Burn Rate Mensual — tabla
```json
{
  "name": "[PROYECTO] | Burn Rate Mensual",
  "display": "table",
  "dataset_query": {"database": DB_ID, "type": "native",
    "native": {"query": "SELECT '[MES1]' AS \"Mes\", [PLAN1] AS \"Planificado (USD)\", '[REAL1]' AS \"Real\" UNION ALL SELECT '[MES2]', [PLAN2], '[REAL2]' UNION ALL ..."}},
  "visualization_settings": {}
}
```
Construir con las filas de la tabla Burn Rate de `{project_path}/metrics/financiero.md`. Si Real es "—", usar `'Pendiente'`.

---

## Reglas del Skill

1. **Nunca describir sin ejecutar.** Si el skill está activo, la siguiente acción es una llamada MCP, no texto.
2. **Verificar antes de crear.** Antes del Paso 4.2, llamar `search_dashboards` con el nombre del proyecto. Si ya existe un dashboard similar, preguntar: *"Ya existe el dashboard '[nombre]'. ¿Lo actualizo o creo uno nuevo?"*
3. **Respetar los datos.** Si un valor es genuinamente nulo porque el proyecto está en Inicio, no crear la tarjeta. Un dashboard con 6 tarjetas reales es más útil que 12 con ceros sin contexto.
4. **Secuencia obligatoria.** Cada paso depende del ID del anterior. No avanzar sin guardar el ID retornado.
5. **Fallback útil.** Si `update_dashboard_cards` falla, reportar los card IDs y la URL de la colección para agregar manualmente desde la UI de Metabase.
6. **Siempre cerrar con la URL.** La última línea de la respuesta siempre es `http://localhost:3000/dashboard/[DASHBOARD_ID]`.

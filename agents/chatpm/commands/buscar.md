# COMMAND: /buscar

## Propósito

Buscar información histórica del proyecto sin que el PM tenga que recordar dónde está. Funciona como búsqueda semántica sobre `memory/historial.md`, `memory/decisiones.md`, `memory/compromisos.md`, `memory/actasdereunion.md` y `memory/correo.md`. Resuelve preguntas tipo "¿cuándo decidimos X?", "¿quién se comprometió a Y?", "¿por qué cambiamos de arquitectura?".

## Cuándo usar

- "¿cuándo decidimos X?", "¿qué pasó con Y?", "¿quién dijo Z?"
- "busca en el historial...", "encuentra cuando..."
- "¿hay alguna decisión sobre...?"
- Reconstruir contexto cuando el PM no recuerda

---

## Instrucciones de ejecución

### Paso 1 — Recibir y normalizar la query

El PM puede formular la búsqueda de muchas formas:
- "¿cuándo decidimos cambiar la base de datos?"
- "buscar arquitectura"
- "todo lo que dijo el cliente sobre el módulo X"

Extraer:
- **Términos clave** (sustantivos, nombres propios)
- **Tipo de información buscada** (decisión, compromiso, riesgo, comunicado, evento)
- **Filtros temporales** ("la semana pasada", "en marzo", "hace 2 sprints")

### Paso 2 — Detectar el tipo de búsqueda

| Tipo de pregunta del PM | Archivo prioritario |
|---|---|
| "¿cuándo decidimos...?" / "decisión sobre..." | `memory/decisiones.md` |
| "¿quién se comprometió a...?" | `memory/compromisos.md` |
| "¿qué dijo el cliente sobre...?" | `memory/correo.md` + `memory/contextoclienteproyecto.md` |
| "¿qué pasó con...?" | `memory/historial.md` |
| "¿qué se discutió en la reunión de...?" | `memory/actasdereunion.md` |
| "riesgo de..." / "preocupación sobre..." | `risks/risk-register.md` + `memory/riesgo.md` |
| Pregunta general | Buscar en TODOS los archivos de memory/ |

### Paso 3 — Ejecutar búsqueda

Buscar coincidencias en los archivos identificados:
- Coincidencia exacta de términos clave
- Coincidencias parciales (stem)
- Coincidencias en líneas adyacentes (contexto)

Recopilar los matches con:
- Archivo origen
- Fecha del registro (si aplica)
- 2-3 líneas de contexto alrededor del match

### Paso 4 — Presentar resultados

```
🔍 BÚSQUEDA: "{query original}"

Encontré {N} resultados en {M} archivos:

═══════════════════════════════════════════════
[1] {archivo} — {fecha del registro}
   {líneas de contexto con el match resaltado}
   ↳ Relevancia: {Alta / Media / Baja}

[2] {archivo} — {fecha}
   {líneas de contexto}
   ↳ Relevancia: {Alta / Media / Baja}

[3] ...
═══════════════════════════════════════════════

INTERPRETACIÓN:
{síntesis del agente — 2-3 líneas conectando los hallazgos}

¿Quieres que profundice en alguno o busque algo más específico?
```

### Paso 5 — Sin resultados

Si no hay matches:
```
🔍 No encontré resultados para "{query}".

Sugerencias:
- ¿Quieres que busque términos relacionados? (ej: "{término_alternativo}")
- ¿La información puede estar en NotebookLM? (ejecutar: notebooklm-knowledge)
- ¿Quieres revisar los emails recientes de Gmail? (ejecutar: gestion-correos)
```

### Paso 6 — Búsquedas con filtros temporales

Si el PM dice "la semana pasada", "en marzo", etc.:
- Calcular el rango de fechas
- Filtrar resultados por timestamp en `memory/historial.md`
- Mostrar solo entradas dentro del rango

Ejemplos de parsing:
- "la semana pasada" → últimos 7 días desde hoy
- "en marzo" → 2026-03-01 a 2026-03-31 (asumiendo año actual)
- "hace 2 sprints" → calcular según `data/sprint-actual.md` y velocidad

---

## Reglas del comando

1. **Mostrar contexto, no solo el match** — 2-3 líneas alrededor del término encontrado
2. **Sintetizar al final** — no solo listar; conectar los puntos en 2-3 líneas
3. **Indicar relevancia** — los primeros resultados deben ser los más relevantes
4. **Sugerir alternativas si no hay match** — nunca dejar al PM sin opciones
5. **No alucinar** — si la información no está en los archivos, decirlo explícitamente

---

## Output esperado

- Lista de resultados con archivo, fecha, contexto y relevancia
- Síntesis interpretativa de 2-3 líneas
- Sugerencias de búsqueda alternativa si aplica

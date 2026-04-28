# COMMAND: /minuta

## Propósito

Generar una minuta profesional de reunión con asistentes, agenda, decisiones tomadas, compromisos asumidos y próximos pasos. Registra automáticamente los compromisos en `memory/compromisos.md` y las decisiones en `memory/decisiones.md`.

## Cuándo usar

- Al terminar cualquier reunión del proyecto: daily, planning, review, retro, comité, llamadas con cliente
- "genera la minuta", "haz la minuta de la reunión"
- "documenta lo que hablamos"
- "registra los acuerdos"

---

## Instrucciones de ejecución

### Paso 1 — Recopilar datos de la reunión

Hacer estas preguntas al PM en una sola ronda (si no las dio ya):

```
Para generar la minuta necesito 4 datos:

1. ¿Qué tipo de reunión fue? (daily, planning, review, retro, comité, call con cliente, otra)
2. ¿Quiénes asistieron? (lista de nombres o roles)
3. ¿Qué temas se discutieron? (puntos principales, en orden o desordenado)
4. ¿Qué decisiones se tomaron y qué compromisos quedaron?
   (puede ser texto libre, yo lo estructuro)
```

→ Esperar respuesta antes de continuar.

### Paso 2 — Cargar contexto

```
{project_path}/context/proyecto-base.md
{project_path}/memory/compromisos.md      (para detectar compromisos previos)
{project_path}/memory/historial.md         (últimas entradas)
```

### Paso 3 — Estructurar la minuta

Usar el template `templates/minuta-reunion.md` y llenar:

```markdown
# Minuta de Reunión — {project_name}

**Tipo:** {Daily / Planning / Review / Retro / Comité / Call cliente / Otra}
**Fecha:** {YYYY-MM-DD}
**Hora:** {HH:MM} - {HH:MM}
**Facilitador:** {PM o nombre}
**Asistentes:**
  - {nombre 1} — {rol}
  - {nombre 2} — {rol}
  ...
**Ausentes con justificación:** {lista o "ninguno"}

## Agenda Tratada
1. {tema 1}
2. {tema 2}
...

## Discusión y Hallazgos
### {tema 1}
{resumen de lo discutido — 2-3 líneas máximo}

### {tema 2}
...

## Decisiones Tomadas
| # | Decisión | Tomada por | Fundamento | Impacto |
|---|---|---|---|---|
| 1 | {decisión} | {persona/comité} | {por qué} | {qué cambia} |

## Compromisos Asumidos
| # | Compromiso | Responsable | Fecha límite |
|---|---|---|---|
| 1 | {qué se va a hacer} | {nombre} | {fecha} |

## Riesgos / Issues Identificados
- {riesgo o issue mencionado, si hay}

## Próxima Reunión
**Fecha:** {fecha o "por confirmar"}
**Tema principal:** {qué se discutirá}
```

### Paso 4 — Actualizar archivos del proyecto

**`memory/compromisos.md`** — appendear cada compromiso nuevo:
```
| {fecha_hoy} | {compromiso} | {responsable} | {fecha límite} | Pendiente | Reunión {tipo} {fecha} |
```

**`memory/decisiones.md`** — appendear cada decisión:
```
| {fecha_hoy} | {decisión} | {tomada por} | {impacto} | Reunión {tipo} {fecha} |
```

**`memory/actasdereunion.md`** — appendear referencia a la minuta:
```
[{fecha_hoy} {hora}] {tipo de reunión} — Asistentes: {N}
  Decisiones: {N} | Compromisos: {N}
  Resumen: {1 línea}
```

**`memory/historial.md`** — entrada:
```
[{fecha} {hora}] MINUTA — {tipo} — {N} decisiones, {N} compromisos
```

### Paso 5 — Confirmación al PM

```
✅ Minuta generada y registrada

DOCUMENTO:
  Tipo: {tipo de reunión}
  Asistentes: {N}
  Decisiones: {N}
  Compromisos: {N}

ARCHIVOS ACTUALIZADOS:
  ✓ memory/compromisos.md (+{N})
  ✓ memory/decisiones.md (+{N})
  ✓ memory/actasdereunion.md (+1)
  ✓ memory/historial.md

¿Quieres que genere el email de envío de la minuta a los asistentes?
```

### Paso 6 — Email opcional de envío

Si el PM dice sí, generar:
```
Asunto: Minuta {tipo} — {project_name} — {fecha}

Equipo,

Adjunto la minuta de la reunión de hoy. Por favor revisen sus compromisos y avísenme si hay algo a corregir antes de mañana.

Resumen ejecutivo:
- {N} decisiones tomadas
- {N} compromisos asumidos
- Próximos pasos: {top 2}

Saludos,
{PM}
```

---

## Reglas del comando

1. **Compromisos siempre con responsable y fecha** — si falta uno de los dos, preguntar al PM antes de registrar
2. **Decisiones con fundamento** — toda decisión registrada debe tener un "por qué" (aunque sea breve)
3. **Sin invención** — si el PM no mencionó algo, no completar con suposiciones
4. **Detectar compromisos duplicados** — si un compromiso ya estaba registrado, actualizarlo en lugar de duplicar
5. **Distinguir decisión vs compromiso** — decisión = qué se decidió hacer; compromiso = quién lo va a hacer y cuándo

---

## Output esperado

- Minuta completa estructurada lista para compartir
- Compromisos y decisiones registrados en archivos del proyecto
- Email opcional de envío a asistentes

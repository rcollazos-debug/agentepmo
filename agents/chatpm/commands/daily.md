# COMMAND: /daily

## Propósito

Generar un briefing pre-standup para el PM en menos de 30 segundos: estado del sprint, bloqueos activos, hitos a 48h, alertas detectadas en el último sync. Es el comando más frecuente del día a día.

## Cuándo usar

- Antes del daily standup (típicamente 5-10 min antes de la reunión)
- "prepárame el daily", "qué hay para el daily", "briefing rápido"
- "dame el estado de hoy"
- Primera interacción del día con el agente

---

## Instrucciones de ejecución

### Paso 1 — Leer fuentes (rápido, sin sync completo)

```
{project_path}/data/sprint-actual.md
{project_path}/memory/historial.md       (últimas 20 entradas)
{project_path}/memory/compromisos.md
{project_path}/metrics/dashboard.md
{project_path}/risks/risk-register.md     (top 3 riesgos)
```

### Paso 2 — Detectar bloqueos críticos

De `data/sprint-actual.md` y `memory/historial.md` (últimos 3 días):
- Bloqueos sin actualización > 24h → 🔴 CRÍTICO
- Bloqueos con actualización pero sin solución > 48h → 🟠 ALTO
- Bloqueos abiertos < 24h → 🟡 SEGUIMIENTO

### Paso 3 — Compromisos del día

De `memory/compromisos.md`:
- Compromisos con fecha límite = hoy → 🔴 VENCEN HOY
- Compromisos con fecha límite = mañana → 🟡 MAÑANA
- Compromisos vencidos sin cerrar → 🔴 VENCIDOS

### Paso 4 — Hitos a 48h

De `data/cronograma.md`:
- Hitos con fecha en próximas 48h → mostrar
- Si no hay → mostrar el siguiente hito y días restantes

### Paso 5 — Generar briefing

```
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
☀️  DAILY BRIEFING — {project_name} — {fecha} {hora}
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

ESTADO DEL SPRINT:
  Sprint {N} — Día {X} de {Y} — {% avance}
  SP completados: {X}/{Y}  |  Burndown: {🟢 OK / 🟡 alerta / 🔴 desviado}
  Velocidad proyectada: {X} SP (objetivo: {Y})

🚧 BLOQUEOS ACTIVOS ({N}):
  🔴 [{ID}] {descripción} — Asignado: {nombre} — Edad: {N días}
  🟠 [{ID}] {descripción} — Asignado: {nombre}
  🟡 [{ID}] {descripción}
  (o "Sin bloqueos activos")

📋 COMPROMISOS:
  🔴 VENCEN HOY ({N}):
    - {compromiso} — {responsable}
  🟡 MAÑANA ({N}):
    - {compromiso} — {responsable}
  🔴 VENCIDOS ({N}):
    - {compromiso} — {responsable} — Venció: {fecha}

📅 PRÓXIMOS HITOS:
  - {fecha}: {hito} ({N días})

⚠️  ALERTAS DEL ÚLTIMO SYNC:
  - {alerta detectada en recoleccion-contexto, si hay}

💡 SUGERENCIA PARA EL DAILY:
  {1 línea con la pregunta más importante a hacer en el daily de hoy}
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
```

### Paso 6 — Sugerencia inteligente

La línea final de "Sugerencia para el daily" se construye según prioridad:
1. Si hay bloqueo crítico > 24h → "Pregunta a {responsable}: ¿qué necesitas para desbloquear {ID}?"
2. Si hay compromiso vencido → "Confirma con {responsable} la nueva fecha de {compromiso}"
3. Si SPI < 0.85 → "Discutir si necesitamos descopear historias del sprint"
4. Si todo está bien → "Pregunta sobre dependencias para mañana"

---

## Reglas del comando

1. **Velocidad sobre profundidad** — el daily ocurre en 15 min; el briefing debe leerse en 30 segundos
2. **Sin recolección completa** — no disparar `recoleccion-contexto`; usar lo que ya está en memoria
3. **Una sugerencia, no varias** — el agente recomienda LA pregunta más importante, no una lista
4. **Si no hay sprint activo** — adaptar a Kanban: WIP actual, lead time, items en flow

---

## Output esperado

Briefing de máximo 25 líneas con: estado del sprint + bloqueos + compromisos del día + hito próximo + 1 sugerencia accionable.

## Playbooks asociados

- `qa-colapsado` (si bloqueos en QA > 2 días)
- `cliente-ausente` (si hay compromiso bloqueado por cliente sin respuesta)
- `atraso-cronograma` (si SPI < 0.85)

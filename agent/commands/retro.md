# COMMAND: /retro

## Propósito

Facilitar una retrospectiva de sprint estructurada y productiva. Recoge insights del equipo, identifica acciones concretas para el próximo sprint, y registra patrones recurrentes para detección temprana de problemas sistémicos.

## Cuándo usar

- Al final de cada sprint (después de la review)
- "facilita la retro", "retrospectiva del sprint", "qué aprendimos"
- Cuando el equipo siente que "algo no está funcionando"
- Después de un incidente o crisis (retro especial)

---

## Instrucciones de ejecución

### Paso 1 — Cargar contexto del sprint

```
{project_path}/data/sprint-actual.md     (sprint que se cierra)
{project_path}/data/velocidad.md         (histórico para comparar)
{project_path}/metrics/calidad.md        (defectos del sprint)
{project_path}/memory/historial.md       (eventos del sprint)
{project_path}/memory/lecciones.md       (lecciones previas)
```

Extraer datos cuantitativos:
- SP comprometidos vs completados
- Defectos introducidos en el sprint
- Bloqueadores que ocurrieron
- Compromisos vencidos durante el sprint

### Paso 2 — Determinar el formato

Según el tono del sprint, el agente sugiere uno de estos formatos:

| Formato | Cuándo usarlo |
|---|---|
| **4-Ls** (Liked / Learned / Lacked / Longed for) | Sprint regular, equipo cohesionado |
| **Mad / Sad / Glad** | Cuando hay tensión emocional o conflictos |
| **Start / Stop / Continue** | Cuando se quieren acciones rápidas |
| **5 Whys** | Cuando hay un problema específico a diagnosticar |
| **Sailboat** (Anchors / Wind / Rocks) | Sprints largos o proyectos en transición |

Por defecto: **4-Ls**.

### Paso 3 — Facilitación virtual

Si el PM va a usar el agente DURANTE la retro, ejecutar facilitación interactiva:

```
🎯 RETROSPECTIVA — Sprint {N} — {project_name}

Voy a facilitar la retro. Vamos por rondas.

DATOS DEL SPRINT:
  • Velocidad: {X} SP (vs objetivo: {Y})
  • Defectos: {N} | Bloqueadores: {N} | Compromisos vencidos: {N}

PARTICIPANTES (confírmame si están todos):
  {lista del equipo}

FORMATO RECOMENDADO: {4-Ls}
¿Vamos con este o prefieres otro?
```

Después de confirmar formato, hacer rondas:

```
RONDA 1 — LIKED (¿Qué disfrutaron del sprint?)
Equipo, comparte lo que les gustó. Espero a que todos contribuyan.
(El PM va escribiendo lo que dice cada uno)

RONDA 2 — LEARNED (¿Qué aprendieron?)
...

RONDA 3 — LACKED (¿Qué les faltó?)
...

RONDA 4 — LONGED FOR (¿Qué les hubiera gustado tener?)
...
```

### Paso 4 — Análisis y patrones

Después de las rondas, el agente analiza:

#### 4.1 Patrones recurrentes
Comparar con `memory/lecciones.md`:
- ¿Aparecen los mismos problemas que en retros anteriores? → 🔴 problema sistémico
- ¿Hay un tipo de queja repetida? (ej: siempre falta info del cliente) → patrón

#### 4.2 Análisis de causa raíz
Para cada item de "Lacked" / "Sad" / "Stop":
- Hacer 5-Whys ligero (3 niveles mínimo)
- Identificar si es: proceso, tecnología, equipo, cliente, comunicación

#### 4.3 Acciones priorizadas
Convertir insights en acciones concretas con:
- Responsable
- Fecha de implementación (próximo sprint o más adelante)
- Cómo se medirá si funcionó

### Paso 5 — Generar documento de retrospectiva

Usar `{{AGENT_HOME}}/vorkan/templates/retrospectiva.md`:

```markdown
# Retrospectiva — Sprint {N} — {project_name}

**Fecha:** {YYYY-MM-DD}
**Duración:** {minutos}
**Facilitador:** {PM}
**Participantes:** {lista}
**Formato usado:** {4-Ls}

## Métricas del Sprint
| Métrica | Valor | Tendencia vs sprint anterior |
|---|---|---|
| Velocidad (SP) | {X}/{Y} | {↑ ↓ →} |
| Defectos introducidos | {N} | {↑ ↓ →} |
| Compromisos cumplidos | {%} | {↑ ↓ →} |
| Satisfacción equipo (1-5) | {N} | {↑ ↓ →} |

## Liked / Lo que funcionó
- {item}
- {item}

## Learned / Lo que aprendimos
- {item}

## Lacked / Lo que faltó
- {item}
  → Causa raíz: {análisis}

## Longed for / Lo que quisiéramos
- {item}

## Patrones Detectados
- {patrón recurrente con sprints anteriores, si hay}

## Acciones para el Próximo Sprint
| # | Acción | Responsable | Para cuándo | Cómo medir éxito |
|---|---|---|---|---|
| 1 | {acción específica} | {nombre} | Sprint {N+1} | {métrica} |
| 2 | ... | | | |

## Lección Aprendida Principal
> "{una frase que captura el insight más importante del sprint}"
```

### Paso 6 — Actualizar archivos

- **`memory/lecciones.md`** — appendear lección principal con fecha
- **`memory/historial.md`** — entrada `[{fecha}] RETRO_SPRINT_{N} — {N} acciones acordadas`
- **`memory/compromisos.md`** — appendear cada acción de la retro como compromiso

### Paso 7 — Confirmación

```
✅ Retrospectiva del Sprint {N} cerrada

INSIGHTS:
  • Lo que mejor funcionó: {item top}
  • Lo que más necesita atención: {item top}
  • Patrón detectado: {si hay}

ACCIONES PARA SPRINT {N+1}:
  {lista numerada de 3-5 acciones}

LECCIÓN PRINCIPAL: "{frase}"

📂 Documento completo: {project_path}/memory/retros/retro-sprint-{N}.md
```

---

## Reglas del comando

1. **Sin culpas** — la retro nunca señala personas; solo procesos y sistemas
2. **Acciones SMART** — específicas, medibles, asignables, realistas, con fecha
3. **Conectar con sprints anteriores** — si los mismos problemas aparecen, escalar como problema sistémico
4. **Máximo 5 acciones** — si hay más, es señal de querer arreglar todo a la vez (anti-patrón)
5. **Una lección, no veinte** — capturar EL insight, no una lista
6. **Datos primero, opiniones después** — empezar siempre con métricas

---

## Output esperado

- Documento de retrospectiva estructurado y compartible
- Acciones priorizadas con responsables y fechas
- Una lección aprendida principal registrada
- Detección de patrones recurrentes si los hay

## Playbooks asociados

- `deuda-tecnica` (si la retro revela acumulación de deuda)
- `qa-colapsado` (si hay queja recurrente sobre calidad)
- `recursos-criticos` (si hay queja sobre falta de personal)

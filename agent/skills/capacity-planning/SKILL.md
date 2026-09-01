---
name: capacity-planning
description: Calcula la capacidad real disponible del equipo para el próximo sprint o periodo, detecta sobrecargas, factoriza vacaciones y compromisos previos, y alerta si el plan excede la capacidad realista del equipo.
---

# SKILL: Capacity Planning

## Rol en la arquitectura

Este skill responde la pregunta "¿cuánto trabajo podemos comprometer realmente?" antes del Sprint Planning, antes de aceptar un nuevo CR, o cuando se evalúa un cambio de alcance.

**No confundir con:**
- `scrum-ceremonies` → facilita Planning/Daily/Review/Retro — este skill calcula la capacidad
- `cronograma-control` → controla cumplimiento del cronograma — este skill calcula viabilidad antes de comprometerlo
- `backlog-management` → prioriza historias — este skill determina cuántas caben

---

## Cuándo Activar

- Antes de un Sprint Planning ("¿cuánta capacity tenemos?")
- Cuando se evalúa un nuevo CR ("¿cabe en el sprint?")
- Cuando alguien se va de vacaciones o reduce dedicación
- Cuando se contrata o suma una persona al equipo
- "calcula la capacidad", "¿podemos meter más historias?"
- Cuando velocidad real cae > 20% sobre velocidad planeada

---

## Protocolo de Ejecución

### Paso 1 — Cargar contexto del equipo

```
{project_path}/context/equipodetrabajodev.md
{project_path}/context/equipodetrabajopm.md
{project_path}/context/equipodetrabajoqa.md
{project_path}/context/equipodetrabajoro.md
{project_path}/data/velocidad.md
{project_path}/metrics/capacidad.md
{project_path}/data/sprint-actual.md
{project_path}/memory/compromisos.md
```

Calendar (si MCP disponible):
- Buscar eventos "vacaciones", "out-of-office", "PTO", "license" del equipo en próximos 30 días

---

### Paso 2 — Calcular capacidad teórica

Para cada persona del equipo:

```
Capacidad teórica (h/sprint) = Disponibilidad % × Horas/sprint estándar
```

Donde:
- Horas/sprint estándar = 80 (sprint de 2 semanas, 5 días útiles × 8 h)
- Disponibilidad % proviene de `context/equipodetrabajo*.md`

Ejemplo:
- Pedro Tech Lead 100% → 80h
- Ana Dev 50% → 40h

---

### Paso 3 — Aplicar reductores (capacidad real)

| Reductor | Ajuste |
|---|---|
| **Overhead administrativo** | -15% (reuniones, code review, ramp-up tareas) |
| **Daily standups** | -2.5h por sprint (15 min × 10 días) |
| **Sprint ceremonies** | -4h por sprint (Planning + Review + Retro) |
| **Vacaciones / PTO en el sprint** | -horas de los días ausentes |
| **Onboarding** | -50% si la persona tiene < 30 días |
| **Soporte a producción** | -X% según historial (típico 10-20%) |
| **Compromisos previos** | -horas asignadas a tareas no terminadas del sprint anterior |

**Capacidad real ≈ Capacidad teórica × (1 - 0.15) - ceremonias - vacaciones**

---

### Paso 4 — Conversión a Story Points

Si el equipo trabaja con SP:
- Calcular velocidad histórica de los últimos 3-5 sprints (de `data/velocidad.md`)
- Velocidad promedio = X SP/sprint
- Velocidad por hora = X SP / horas trabajadas histórico
- **Capacidad en SP = horas reales × (SP/h histórico)**

Aplicar margen de seguridad:
- Sprint estable → usar 100% de la velocidad histórica
- Sprint con personas nuevas o cambios → usar 80%
- Sprint después de retros con problemas → usar 75%

---

### Paso 5 — Detectar sobrecargas individuales

Para cada persona, comparar:
- Capacidad real disponible
- Trabajo asignado en el sprint planificado

Si asignación > capacidad → 🔴 SOBRECARGA

```
🚨 Pedro tiene 65h asignadas pero capacidad real de 50h → 30% de sobrecarga
   Riesgo: defectos por calidad, burnout, atrasos
```

---

### Paso 6 — Generar reporte

```
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
📊 CAPACITY PLANNING — {project_name} — Sprint {N+1}
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

CAPACIDAD DEL EQUIPO:
| Persona | Rol | Disp % | Horas teóricas | Reductores | Horas reales | SP equivalentes |
| --- | --- | --- | --- | --- | --- | --- |
| Pedro | Tech Lead | 100% | 80h | -15% -2v -4cer | 60h | ~16 SP |
| Ana | Dev | 50% | 40h | -15% -2cer | 31h | ~8 SP |
| Carlos | Dev | 100% | 80h | -15% -5v | 63h | ~17 SP |

TOTAL CAPACIDAD REAL: {N} horas → {Y} SP

VELOCIDAD HISTÓRICA (últimos 3 sprints): {X} SP

RECOMENDACIÓN PARA EL SPRINT {N+1}:
  Compromiso seguro:    {Y × 0.85} SP
  Compromiso óptimo:    {Y} SP
  Compromiso ambicioso: {Y × 1.10} SP — solo si retros muestran equipo en buen estado

🚨 ALERTAS:
  - Pedro está sobre-asignado en el plan actual ({X}h vs {Y}h capacidad)
  - Carlos sale 5 días por vacaciones (15-19 de mayo)
  - Ana lleva 2 semanas → considerar 80% de su velocidad estándar

PROPUESTA:
  - Reducir asignación de Pedro en {X}h
  - Mover historia {ID} al siguiente sprint
  - Confirmar disponibilidad de QA para validar el sprint
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
```

---

### Paso 7 — Actualizar archivos

- `metrics/capacidad.md` → tabla de capacidad real del sprint actual
- `memory/historial.md` → entrada `[fecha] CAPACITY_PLAN — Sprint {N+1}: {Y} SP recomendados`

---

## Casos especiales

### Equipo en modo Kanban (no Scrum)
- Calcular WIP máximo en lugar de SP/sprint
- WIP = capacidad real / lead time promedio

### Equipo nuevo (< 3 sprints de histórico)
- No hay velocidad confiable → usar "capacity hours" en lugar de SP
- Ajustar al 60-70% por incertidumbre

### Equipo distribuido (zonas horarias)
- Considerar reducción adicional por overhead de comunicación (-10%)

---

## Reglas del Skill

1. **Capacidad real, no teórica** — siempre aplicar reductores; nunca usar disponibilidad bruta
2. **Detectar sobrecargas individuales** — el equipo puede tener capacidad total pero una persona sobrecargada
3. **Histórico sobre teoría** — si la velocidad real difiere de la calculada, usar la real
4. **Margen de seguridad** — en duda, comprometer 85% de la capacidad calculada
5. **Cruzar con calendario** — vacaciones del calendario son la fuente de verdad

## Playbooks asociados

- `recursos-criticos` (si la sobrecarga implica riesgo de pérdida de personas)
- `atraso-cronograma` (si la capacidad real no alcanza para los compromisos del proyecto)

## Output esperado

- Tabla de capacidad real por persona
- Capacidad total en horas y SP
- Tres niveles de compromiso recomendados (seguro / óptimo / ambicioso)
- Alertas de sobrecarga individuales
- Propuesta de ajuste si hay desbalance

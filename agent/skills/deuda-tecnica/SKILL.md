---
name: deuda-tecnica
description: Identifica, cuantifica y gestiona la deuda técnica del proyecto. Calcula impacto en velocidad, propone balance entre features y reducción de deuda, integra con el backlog y previene acumulación que comprometa la entrega.
---

# SKILL: Gestión de Deuda Técnica

## Rol en la arquitectura

Este skill se especializa en el "deuda" técnica que el equipo acumula como subproducto del desarrollo: código heredado, falta de tests, refactors postergados, dependencias desactualizadas, documentación faltante.

**No confundir con:**
- `backlog-management` → gestiona el backlog producto (features) — este skill gestiona el "backlog técnico"
- `calidad-software` → defectos detectados — este skill se enfoca en deuda preventiva
- `gestion-riesgos` → riesgos del proyecto — la deuda es un tipo específico de riesgo

---

## Cuándo Activar

- "cuánta deuda técnica tenemos"
- Después de una retro que reveló queja sobre velocidad bajando
- Cuando velocidad real cae > 15% sostenido por 2+ sprints
- Cuando defectos en regresión suben sin razón aparente
- Antes de comprometerse a un nuevo CR mayor (validar capacidad real)
- Trimestralmente como práctica regular

---

## Protocolo de Ejecución

### Paso 1 — Cargar contexto técnico

```
{project_path}/data/backlog.md               (épicas/historias clasificadas)
{project_path}/data/sprint-actual.md
{project_path}/data/velocidad.md
{project_path}/metrics/calidad.md
{project_path}/risks/technical-risks.md
{project_path}/memory/lecciones.md
```

Si no existe entrada específica de deuda, crear `{project_path}/data/deuda-tecnica.md`.

---

### Paso 2 — Inventario de deuda técnica

Categorizar por tipo:

| Tipo | Ejemplos | Cómo medir |
|---|---|---|
| **Código legacy** | Módulos antiguos, código sin tests, copy-paste | Líneas de código sin cobertura |
| **Falta de tests** | Features en producción sin tests automatizados | % de cobertura por módulo |
| **Refactors pendientes** | Decisiones temporales (TODO/HACK/FIXME) | grep en código + count |
| **Dependencias** | Librerías desactualizadas, vulnerabilidades, breaking changes | Reporte npm audit / similar |
| **Documentación** | Code sin docs, decisiones de arquitectura sin registro | ADRs faltantes, README desactualizado |
| **Infraestructura** | Servidores manualmente configurados, scripts no versionados | Cuántas piezas no son IaC |
| **Configuración** | Hardcoding de valores, variables de entorno faltantes | grep de constantes mágicas |
| **UX/UI** | Inconsistencias visuales, patterns mezclados | Audit visual del producto |

Para cada item identificado, registrar:

```markdown
### DT-{ID} — {título corto}
**Tipo:** {categoría}
**Ubicación:** {módulo / archivo / componente}
**Descripción:** {qué hay y por qué es deuda}
**Origen:** {por qué se introdujo — atajo de tiempo, decisión deliberada, error}
**Impacto:**
  - En velocidad: {cuánto ralentiza el desarrollo nuevo}
  - En riesgo: {qué puede romper}
  - En mantenimiento: {tiempo extra mensual}
**Esfuerzo estimado para resolverlo:** {horas o SP}
**Severidad:** 🔴 Alta / 🟡 Media / 🟢 Baja
```

---

### Paso 3 — Cuantificar el impacto

#### Sobre la velocidad
Comparar velocidad actual vs velocidad histórica de los primeros sprints:
```
Si velocidad actual es 30 SP y los primeros sprints fueron 40 SP →
ralentización de 25% → potencialmente 25% atribuible a deuda
```

#### Sobre la calidad
- Defectos por módulo legacy vs módulo nuevo
- Tiempo de fix promedio por defecto

#### Sobre el riesgo
- ¿Qué probabilidad hay de fallo en producción por cada item de deuda?
- ¿Qué impacto si falla?

#### Sobre el costo
```
Costo de la deuda = (Sprints ralentizados × velocidad perdida × tarifa)
                  + (Defectos atribuibles × costo de fix)
                  + (Tiempo extra de mantenimiento mensual × tarifa)
```

---

### Paso 4 — Priorización (matriz Impacto vs Esfuerzo)

Crear matriz 2x2:

```
                 Esfuerzo bajo            Esfuerzo alto
              ┌─────────────────────┬─────────────────────┐
Impacto alto  │   🟢 QUICK WINS     │  🟠 PROYECTOS       │
              │   Hacer YA          │  Planificar dedicado │
              ├─────────────────────┼─────────────────────┤
Impacto bajo  │   🟡 OPORTUNISTAS   │   🔴 IGNORAR        │
              │   Hacer si hay slot │   No vale la pena    │
              └─────────────────────┴─────────────────────┘
```

---

### Paso 5 — Estrategia de pago de deuda

Recomendar al PM una de estas estrategias:

| Estrategia | Cuándo aplicar | Cómo |
|---|---|---|
| **20% por sprint** | Deuda moderada, equipo cohesionado | Reservar 20% de capacity de cada sprint para items de deuda |
| **Sprint dedicado** | Deuda alta y bloqueante | Sprint completo dedicado (negociar con cliente) |
| **Refactor incremental** | Deuda en módulo específico | Cuando se toque ese módulo, dejarlo mejor que como se encontró (Boy Scout Rule) |
| **Stop the bleeding** | Deuda creciendo + sin tiempo para pagarla | Aprobar protocolo de no introducir más deuda + plan trimestral |
| **Big rewrite** | Deuda > 50% del código + crisis | Decisión estratégica, requiere business case + sponsor approval |

---

### Paso 6 — Integrar con backlog

Para cada item de deuda priorizado:

```markdown
| ID | Título | Tipo | Esfuerzo | Impacto | Prioridad | Sprint sugerido |
|---|---|---|---|---|---|---|
| DT-001 | Refactor módulo de pagos | Código legacy | 13 SP | Alto | 🟢 Quick win | {N+1} |
```

Agregar items de deuda al `data/backlog.md` con etiqueta especial `[DEUDA]` para distinguirlos de features.

---

### Paso 7 — Reportar al PM

```
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
🔧 ESTADO DE DEUDA TÉCNICA — {project_name} — {fecha}
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

NIVEL DE DEUDA: 🟢 Bajo / 🟡 Moderado / 🟠 Alto / 🔴 Crítico

INVENTARIO:
  • Items de deuda: {N}
  • Esfuerzo total estimado: {Y} SP / {Z} días
  • Severidad: {N🔴} altos, {N🟡} medios, {N🟢} bajos

IMPACTO MEDIDO:
  • Ralentización de velocidad: {-X%}
  • Defectos atribuibles: {N} en últimos 3 sprints
  • Costo mensual estimado: {$X}

QUICK WINS (Impacto alto + Esfuerzo bajo):
  1. {item} — {SP} — {beneficio esperado}
  2. {item} — {SP} — {beneficio esperado}
  3. {item} — {SP} — {beneficio esperado}

ESTRATEGIA RECOMENDADA: {estrategia}

PRÓXIMOS PASOS:
  1. {acción específica para Sprint actual}
  2. {acción específica para próximo sprint}
  3. {acción que requiere conversación con cliente o sponsor}

ALERTA:
  {Si hay riesgo crítico de no pagar deuda — ej. "Sin pagar DT-005 en 4 sprints, riesgo de incidente en producción es Alto"}
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
```

---

## Reglas del Skill

1. **Visibilizar la deuda** — la deuda invisible es la peor; siempre cuantificar
2. **Negociar con el cliente** — pagar deuda requiere capacity; transparencia gana confianza
3. **No demonizar** — la deuda existe por razones legítimas (atajos de tiempo, decisiones contextuales)
4. **Stop digging** — antes de pagar deuda existente, asegurar no acumular más
5. **Cero items vs items prioritarios** — no perseguir deuda cero, sino mantenerla bajo control
6. **Conectar con velocidad** — la justificación más persuasiva es "vamos más lento por esto"

## Playbooks asociados

- `deuda-tecnica` (cuando se materializa como bloqueo)

## Output esperado

- Inventario clasificado de deuda técnica
- Cuantificación de impacto en velocidad, calidad, costo y riesgo
- Matriz de priorización Impacto vs Esfuerzo
- Estrategia recomendada de pago
- Items integrados al backlog para Sprint Planning
- Alertas si hay deuda crítica

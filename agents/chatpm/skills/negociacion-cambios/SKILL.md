---
name: negociacion-cambios
description: Facilita la NEGOCIACIÓN de un Change Request antes de la decisión formal — análisis de impacto, generación de opciones con trade-offs, propuesta económica al cliente y preparación del terreno para que `control-cambios` formalice el acuerdo.
---

# SKILL: Negociación de Cambios

## Rol en la arquitectura

Este skill opera **PRE-decisión** de un CR. Es el momento delicado entre que el cliente pide algo nuevo y que se firma el acuerdo formal.

```
Solicitud del cliente
       ↓
[ESTE SKILL] → análisis + opciones + propuesta + negociación
       ↓
Acuerdo verbal / aprobación inicial
       ↓
control-cambios → POST-decisión: formaliza, documenta, ajusta planes
```

**No confundir con:**
- `control-cambios` → opera DESPUÉS de la decisión (formaliza el CR)
- `comunica` → genera comunicados puntuales — este skill gestiona la negociación completa

---

## Cuándo Activar

- "el cliente pide X", "necesitan agregar Y", "quieren cambiar Z"
- "¿cómo respondemos a esto?", "ayúdame a presentar opciones"
- Cuando llega un email del cliente solicitando algo fuera del alcance original
- Antes de comprometerse verbalmente a un cambio
- Cuando hay tensión sobre si algo es CR o está incluido

---

## Protocolo de Ejecución

### Paso 1 — Cargar contexto

```
{project_path}/context/proyecto-base.md       (alcance original)
{project_path}/context/contrato.md            (modelo y penalizaciones)
{project_path}/context/restricciones.md
{project_path}/data/cronograma.md             (cómo encaja en el plan)
{project_path}/data/presupuesto.md            (margen disponible)
{project_path}/scope/alcancedetallado.md
{project_path}/scope/exclusionesalcance.md
{project_path}/data/cambios.md                (CRs previos para precedentes)
{project_path}/metrics/capacidad.md
```

---

### Paso 2 — Caracterizar la solicitud

Hacer 4 preguntas en una sola ronda al PM:

```
Para preparar la negociación, necesito entender:

1. ¿Qué pidió exactamente el cliente? (lo más literal posible)
2. ¿Quién lo pidió? (PO, sponsor, usuario, equipo técnico cliente)
3. ¿Cuál es la urgencia percibida y la justificación de negocio?
4. ¿Qué dijiste tú hasta ahora? (confirmar que no hubo compromiso prematuro)
```

---

### Paso 3 — Análisis "scope vs scope creep"

Determinar si la solicitud es:

| Tipo | Definición | Tratamiento |
|---|---|---|
| **Aclaración** | Algo ambiguo del alcance original | Confirmar interpretación, no es CR |
| **Refinamiento** | Detalle dentro del alcance | Refinar en backlog, no es CR |
| **Cambio menor** | Modificación que cabe en buffer del proyecto | Negociar absorción si beneficia relación |
| **CR estándar** | Trabajo nuevo o cambio significativo | Trabajar formal: análisis + opciones + acuerdo |
| **CR mayor** | Cambio estructural (alcance >15%, presupuesto, cronograma) | Activar `business-case` + escalación a sponsor |
| **Fuera del proyecto** | No tiene sentido en este proyecto | Rechazo amable + sugerir proyecto separado |

---

### Paso 4 — Análisis de impacto cuantificado

Para CRs y CRs mayores:

#### Impacto en alcance
- ¿Qué partes del alcance original se afectan?
- ¿Hay funcionalidades a quitar para que esto entre?

#### Impacto en cronograma
- Horas estimadas: {X}
- Días calendario adicionales: {Y}
- ¿Afecta hitos comprometidos? Si sí, cuáles

#### Impacto en presupuesto
- Costo VortexBird: horas × tarifa interna
- Precio al cliente: horas × tarifa de venta (T&M) o ajuste fijo
- Impacto en margen actual: {antes %} → {después %}

#### Impacto en riesgos
- ¿Introduce nuevos riesgos técnicos?
- ¿Aumenta riesgo de cumplimiento del proyecto base?

---

### Paso 5 — Generar opciones (mínimo 3)

**Patrón estándar de negociación:**

| Opción | Descripción | Costo | Tiempo | Trade-off |
|---|---|---|---|---|
| **A — Mínima viable** | Solo lo crítico de la solicitud | Bajo | Bajo | No cubre todo lo pedido |
| **B — Completa** | Lo que pidió el cliente exactamente | Medio | Medio | El balance recomendado |
| **C — Premium** | Lo pedido + valor agregado | Alto | Alto | Más caro pero mejor experiencia |

Y siempre considerar:
- **Opción D — Diferir:** "lo agendamos para después del entregable actual"
- **Opción E — Trade:** "lo hacemos a cambio de quitar X del alcance original"

---

### Paso 6 — Generar Propuesta para el Cliente

```
Asunto: Propuesta — {solicitud en 5 palabras} — {project_name}

{nombre cliente},

Hemos analizado tu solicitud sobre {tema} y queremos presentarte
opciones para que decidas con la información completa.

CONTEXTO DE LA SOLICITUD
{1 párrafo describiendo lo que pidieron y por qué importa}

ANÁLISIS DE IMPACTO
Esta solicitud está fuera del alcance contratado original
(ver sección X del contrato). Implementarla requiere:
  • Esfuerzo adicional: {X} horas
  • Tiempo de implementación: {Y} días
  • Impacto en cronograma del proyecto: {ninguno / leve / significativo}

OPCIONES PROPUESTAS

Opción A — Implementación mínima
  Qué incluye: {descripción}
  Costo: {monto o "X horas T&M"}
  Tiempo: {N días}
  Cuándo se entrega: {fecha estimada}

Opción B — Implementación completa (RECOMENDADA)
  Qué incluye: {descripción}
  Costo: {monto}
  Tiempo: {N días}
  Cuándo se entrega: {fecha estimada}

Opción C — Implementación premium con valor agregado
  Qué incluye: {descripción}
  Costo: {monto}
  Cuándo se entrega: {fecha estimada}

NUESTRA RECOMENDACIÓN
Recomendamos la Opción {X} porque {razón en 2 líneas}.

PRÓXIMOS PASOS
Para avanzar con esta solicitud, necesitamos:
  1. Tu confirmación de la opción elegida
  2. Aprobación formal del costo asociado
  3. Una vez confirmado, formalizamos como CR-{N} y ajustamos el plan

Quedamos atentos a tu decisión antes del {fecha límite recomendada}.

{Nombre PM}
{Cargo} | VortexBird
```

---

### Paso 7 — Anticipar objeciones del cliente

Preparar al PM para las respuestas típicas:

| Si el cliente dice... | El PM responde... |
|---|---|
| "Pensé que esto estaba incluido" | Mostrar sección del contrato + ofrecer revisar juntos |
| "El precio es muy alto" | Mostrar desglose + ofrecer Opción A o C |
| "Necesito que sea para ya" | Mostrar capacidad disponible + impacto en lo otro comprometido |
| "Los demás proveedores no cobran extra" | Reforzar valor diferencial + transparencia comercial |
| "Lo hago internamente" | Sin problema; ofrecer apoyo de transferencia |
| "Mejor lo cancelamos todo" | Escalar inmediatamente al Gerente PMO + activar `playbooks/cliente-ausente` |

---

### Paso 8 — Cierre de la negociación

Cuando el cliente decide:

- **Aceptó una opción** → activar `control-cambios` para formalizar el CR
- **Quiere negociar** → siguiente ronda con la opción que prefieren
- **Rechazó todo** → registrar la decisión + entender por qué + posible riesgo de relación

Actualizar siempre:
- `data/cambios.md` → entrada del intercambio
- `memory/historial.md` → registro de la negociación
- `memory/correo.md` → comunicación cruzada

---

## Reglas del Skill

1. **Nunca comprometer sin análisis** — frase prohibida del PM: "déjame ver, probablemente sí"
2. **Mostrar siempre 3 opciones** — el cliente debe sentir que decide, no que se le impone
3. **Recomendación explícita** — el PM debe siempre recomendar una opción con fundamento
4. **Cuantificar todo** — costos, tiempos, márgenes — sin números no hay negociación
5. **Documentar el "no"** — si se rechaza la solicitud, registrar el porqué y comunicar amablemente
6. **Escalar cambios mayores** — CRs > 15% del proyecto siempre van al Sponsor antes de cerrar

## Playbooks asociados

- `cambio-alcance` (cuando el patrón de CRs sugiere scope creep sostenido)
- `cliente-ausente` (cuando el cliente no decide en el plazo)

## Output esperado

- Análisis tipificado de la solicitud (scope vs creep)
- Impacto cuantificado en alcance, cronograma, presupuesto y riesgos
- 3+ opciones con trade-offs claros
- Propuesta formal lista para enviar al cliente
- Anticipación de objeciones y respuestas preparadas

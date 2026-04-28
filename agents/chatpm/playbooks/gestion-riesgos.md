# PLAYBOOK: Gestión de Riesgos Críticos

> **Activador:** Riesgo con Score ≥ 0.40 Y `response_plan = "Sin plan"` detectado en cualquier revisión de métricas.
> **Urgencia:** Alta — riesgo sin plan puede materializarse sin capacidad de respuesta.

---

## Paso 1 — Confirmar el riesgo

1. Leer `risks/risk-register.md` → identificar todos los riesgos con Score ≥ 0.40.
2. Leer `risks/top-risks.md` → verificar si el riesgo ya está en el top activo.
3. Confirmar que `response_plan = "Sin plan"` o está vacío.
4. Anotar: **ID de riesgo**, descripción, probabilidad, impacto, score, responsable actual.

---

## Paso 2 — Evaluar urgencia y categoría

| Score | P×I | Nivel | Acción inmediata |
|---|---|---|---|
| ≥ 0.50 | Alto | 🔴 Crítico | Escalar a sponsor HOY |
| 0.40–0.49 | Medio-Alto | 🟠 Alto | Definir plan en < 48 horas |

**Categorías comunes → respuesta sugerida:**

| Categoría | Ejemplo de riesgo | Estrategia base |
|---|---|---|
| Técnico | Integración no probada, deuda técnica | Spike técnico, prueba de concepto |
| Cronograma | Recurso crítico no disponible | Búsqueda de backup, replanificación |
| Presupuesto | Estimación incorrecta de módulo | CR preventivo, renegociación |
| Stakeholder | Sponsor no toma decisiones | Escalamiento, reunión de alineación |
| Externo | Proveedor en riesgo, dependencia regulatoria | Plan B de proveedor, comunicado legal |
| Seguridad | Vulnerabilidad no evaluada | Análisis de seguridad inmediato |

---

## Paso 3 — Definir el plan de respuesta (obligatorio)

Para cada riesgo sin plan, redactar:

```
Riesgo: [ID] — [Descripción]
Estrategia: [ ] Evitar  [ ] Mitigar  [ ] Transferir  [ ] Aceptar
Plan de acción:
  1. [Acción concreta] — Responsable: [Nombre] — Fecha límite: [Fecha]
  2. [Acción concreta] — Responsable: [Nombre] — Fecha límite: [Fecha]
Trigger de escalamiento: [Condición que activa el plan de contingencia]
Plan de contingencia: [Si el riesgo se materializa, hacer esto]
```

---

## Paso 4 — Actualizar el registro

1. Editar `risks/risk-register.md` → completar columna `response_plan` para el riesgo identificado.
2. Si Score ≥ 0.50 → agregar o actualizar en `risks/top-risks.md`.
3. Actualizar `memory/riesgo.md` con el resumen del riesgo y el plan definido.
4. Registrar en `memory/decisiones.md`:
   - Riesgo identificado
   - Plan de respuesta acordado
   - Responsable y fecha límite

---

## Paso 5 — Comunicar

**Si Score ≥ 0.50 (Crítico):**
- Notificar al sponsor con resumen ejecutivo: riesgo, impacto potencial, plan de respuesta.
- Incluir en próximo Status Report como "Riesgo crítico activo".

**Si Score 0.40–0.49 (Alto):**
- Mencionar en Daily / Weekly standup del equipo.
- Incluir en reporte semanal con semáforo 🟠.

**Template de alerta rápida para sponsor:**
```
Asunto: [Proyecto] — Riesgo [ID] sin plan de respuesta

Se identificó un riesgo de nivel [Alto/Crítico]:
• Descripción: [texto]
• Probabilidad: [%] | Impacto: [nivel] | Score: [valor]
• Estado actual: Sin plan de respuesta

Acción requerida: [aprobación de plan / decisión de sponsor / asignación de recurso]
Plan propuesto: [resumen 2 líneas]

Solicito confirmación antes de [fecha].
```

---

## Paso 6 — Prevención recurrente

Verificar si el riesgo es síntoma de un patrón:

- ¿Hay más riesgos sin plan en `risk-register.md`? → Hacer barrido completo.
- ¿El Risk Workshop inicial fue insuficiente? → Programar nueva sesión de identificación de riesgos.
- ¿El responsable asignado no está gestionando riesgos? → Reforzar en próxima retrospectiva.

---

## Referencias

| Archivo | Uso |
|---|---|
| `risks/risk-register.md` | Registro central — actualizar response_plan |
| `risks/top-risks.md` | Top 10 riesgos activos |
| `risks/risk-heatmap.md` | Mapa de calor — visualización de severidad |
| `memory/riesgo.md` | Resumen rápido de riesgos activos |
| `memory/decisiones.md` | Documentar decisión sobre el plan |
| `playbooks/recuperacion-proyecto.md` | Si el riesgo ya se materializó |
| `playbooks/presupuesto-critico.md` | Si el riesgo afecta margen financiero |

---

> **Regla VortexBird:** Un riesgo sin plan no es un riesgo gestionado. Todo riesgo Score ≥ 0.40 debe tener responsable, fecha y acción concreta antes del próximo sprint.


---

## Activadores

Este playbook se activa típicamente desde los siguientes comandos:
- `/riesgos`

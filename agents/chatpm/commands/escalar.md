# COMMAND: /escalar

## Propósito

Gestionar una escalación formal de manera estructurada. El agente ayuda al PM a caracterizar el problema, determinar el nivel correcto de escalación, y construir el documento de escalación listo para enviar. Alineado con PMBOK 8 Issue Management y Stakeholder Engagement.

## Cuándo usar

- "necesito escalar esto", "esto va al gerente", "el bloqueo no se resuelve"
- "escala al cliente", "necesito llevar esto al sponsor"
- "tenemos una crisis", "esto ya no lo podemos resolver solos"
- Bloqueador técnico activo > 2 días sin resolución
- Decisión requerida por el cliente > 5 días sin respuesta
- Riesgo de margen o cronograma sin respuesta del equipo

---

## Instrucciones de ejecución

### Paso 1 — Leer fuentes

```
memory/compromisos.md
memory/historial.md
risks/risk-register.md
context/stakeholders.md
context/proyecto-base.md
```

### Paso 2 — Entrevista de Caracterización

Hacer las siguientes 4 preguntas **en una sola ronda** (no una por una):

```
Para construir la escalación correcta, necesito entender la situación:

1. ¿Qué pasó exactamente? ¿Cuándo inició el problema?

2. ¿Qué se intentó para resolverlo? ¿Por qué no funcionó?

3. ¿Cuál es el impacto si esto NO se resuelve en los próximos días?
   (fecha de entrega, presupuesto, relación con el cliente, etc.)

4. ¿Cuándo es el límite máximo para tener una resolución?
```

→ Esperar respuesta antes de continuar.

---

### Paso 3 — Determinar Nivel de Escalación

Con las respuestas de la entrevista, determinar el nivel automáticamente:

| Nivel | Destinatario | Criterios de activación |
|---|---|---|
| **L1 — Técnico** | Tech Lead / QA Lead del proyecto | Bloqueador técnico, conflicto de dependencias, decisión de arquitectura, deuda técnica bloqueante |
| **L2 — Gestión** | Gerente PMO VortexBird | Riesgo al margen ≥ 5%, cambio de alcance no autorizado, conflicto de equipo, incumplimiento de proveedor, cliente ausente > 5 días |
| **L3 — Directivo** | Sponsor / C-level cliente | Riesgo crítico al proyecto, breach contractual, pérdida de relación con cliente, impacto > 15% en presupuesto, necesidad de decisión ejecutiva urgente |

Si el problema puede resolverse en L1 → no escalar a L2/L3 directamente.

Mostrar al PM:
```
Nivel de escalación recomendado: {L1/L2/L3}
Destinatario: {nombre o rol del destinatario desde context/stakeholders.md}
Razón: {1 línea}

¿Confirmas este nivel o prefieres otro?
```

---

### Paso 4 — Documento de Escalación Formal

Generar el documento listo para enviar:

```
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
ESCALACIÓN FORMAL — {project_name}
Nivel: {L1/L2/L3} | Fecha: {fecha} | PM: {nombre}
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

SITUACIÓN
{descripción clara y factual del problema — 3-5 líneas}
Fecha de inicio: {fecha}
Intentos de resolución: {qué se intentó y por qué no funcionó}

IMPACTO SI NO SE RESUELVE
• Cronograma: {impacto concreto — ej. "retraso estimado de 5 días"}
• Presupuesto: {impacto — ej. "costo adicional estimado de X horas"}
• Cliente: {impacto — ej. "entregable del {fecha} en riesgo"}
• Riesgo VortexBird: {margen, reputación, contractual}

OPCIONES PROPUESTAS
  Opción A: {descripción} — Ventaja: {x} — Riesgo: {y}
  Opción B: {descripción} — Ventaja: {x} — Riesgo: {y}
  Opción C: {descripción} — Ventaja: {x} — Riesgo: {y}

DECISIÓN SOLICITADA
{qué decisión específica se necesita del destinatario}

FECHA LÍMITE PARA LA DECISIÓN: {fecha}

PREPARADO POR: {nombre PM} — {cargo}
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
```

---

### Paso 5 — Email de Escalación

Si el PM quiere enviar por correo, generar asunto + cuerpo:

```
Asunto: [ESCALACIÓN {L1/L2/L3}] {project_name} — {tema en 5 palabras} — Decisión requerida antes del {fecha}

{nombre destinatario},

Te escribo para escalar formalmente una situación en el proyecto {project_name} que
requiere tu decisión antes del {fecha límite}.

[SITUACIÓN]
{2-3 líneas del problema}

[IMPACTO]
{1-2 líneas del impacto si no se resuelve}

[OPCIONES]
• Opción A: {descripción corta}
• Opción B: {descripción corta}

[SOLICITO]
{decisión específica que necesitas}

Quedo disponible para una llamada de 15 minutos si necesitas más contexto.

{nombre PM}
{cargo} | VortexBird
```

---

### Paso 6 — Actualizar archivos

- `memory/historial.md` → `[{fecha}] ESCALACIÓN {nivel} — {tema} — Destinatario: {nombre} — Fecha límite decisión: {fecha}`
- `risks/risk-register.md` → si la escalación corresponde a un riesgo → actualizar score y estado
- `memory/compromisos.md` → registrar compromiso de resolución con fecha límite y responsable

---

## Output esperado

- Nivel de escalación recomendado con justificación
- Documento de escalación formal listo para enviar/compartir
- Email de escalación (si se requiere)
- Próximos pasos claros con responsable y fecha límite
- Registro en memoria del proyecto

# COMMAND: /comunica

## Propósito

Gestionar las comunicaciones del proyecto con stakeholders: redactar comunicados adaptados al perfil del destinatario, analizar el sentimiento del cliente basado en correos recientes, y mantener actualizado el plan de comunicación del proyecto.

## Cuándo usar

- "redacta un email", "comunica al cliente", "escríbele al sponsor"
- "¿cómo le digo esto al cliente?", "necesito explicarle el atraso", "escribe el comunicado"
- "¿cómo está el cliente?", "¿cuál es el sentimiento del cliente?", "¿el cliente está preocupado?"
- "actualiza el plan de comunicación", "¿quién necesita ser informado de esto?"
- Antes de una reunión con el cliente — preparar mensajes clave
- Después de un incidente — comunicado de disculpa/actualización

---

## Instrucciones de ejecución

### Paso 1 — Detectar el modo

| Lo que dice el PM | Modo |
|---|---|
| "redacta", "escribe", "comunica", "cómo le digo" | **Modo 1 — Redactar comunicado** |
| "¿cómo está el cliente?", "sentimiento", "análisis" | **Modo 2 — Análisis de sentimiento** |
| "plan de comunicación", "quién informar", "stakeholders" | **Modo 3 — Plan de comunicación** |

Si hay ambigüedad → preguntar en 1 línea: "¿Quieres redactar un mensaje, analizar cómo está el cliente, o revisar el plan de comunicación?"

---

### MODO 1 — Redactar Comunicado

**Paso 1 — Leer fuentes:**
```
memory/compromisos.md  ← OBLIGATORIO: verificar fechas antes de comprometer cualquiera
data/cronograma.md     ← OBLIGATORIO: verificar estado real antes de afirmar avances
context/stakeholders.md
memory/historial.md
```

**Regla crítica:** nunca incluir compromisos de fecha en el comunicado sin antes verificar `data/cronograma.md` y `memory/compromisos.md`. Si hay inconsistencia → alertar al PM antes de redactar.

**Paso 2 — Detectar tono automáticamente:**

| Contexto | Tono |
|---|---|
| Actualización de progreso sin problemas | Neutro-profesional |
| Atraso, problema técnico, incidente | Disculpa-recuperación |
| Hito cumplido, entrega exitosa | Celebración-logro |
| Riesgo o issue que el cliente debe conocer | Alerta-riesgo |
| Decisión urgente requerida del cliente | Urgente-ejecutivo |

Si el PM especifica un tono diferente → usar el del PM.

**Paso 3 — Adaptar al perfil del destinatario:**

| Perfil | Estilo |
|---|---|
| Ejecutivo/Sponsor | Breve (máx 150 palabras), impacto en negocio, sin tecnicismos, punto de decisión claro |
| Product Owner / PM cliente | Moderado (200-300 palabras), mezcla técnico-negocio, orientado a backlog y sprints |
| Técnico / Dev cliente | Detallado, específico, terminología técnica permitida |
| Externo / Comité | Formal, estructurado, sin jerga interna |

**Paso 4 — Generar comunicado:**

```
Asunto: {asunto claro que indica el tipo de comunicado y el proyecto}

{nombre del destinatario},

{apertura apropiada al tono — 1 línea}

{cuerpo del mensaje — adaptado al perfil}
  [Tono informativo]: "Te informamos el estado actual de {X}..."
  [Tono atraso]: "Queremos comunicarte con transparencia una situación que afecta..."
  [Tono logro]: "Nos complace informarte que hemos completado..."
  [Tono alerta]: "Identificamos una situación que requiere tu atención..."
  [Tono urgente]: "Necesitamos tu respuesta antes del {fecha} para..."

{cierre apropiado — 1 línea}

{nombre PM}
{cargo} | VortexBird
```

→ Preguntar al PM: "¿Quieres que ajuste el tono, el nivel de detalle o algún punto específico?"

**Paso 5 — Registrar en memoria:**
- `memory/correo.md` → entrada del comunicado enviado con fecha, destinatario y resumen
- `memory/historial.md` → `[{fecha}] COMUNICADO — {tipo} — Destinatario: {nombre}`

---

### MODO 2 — Análisis de Sentimiento del Cliente

**Paso 1 — Leer fuentes:**
```
memory/correo.md
memory/historial.md
context/stakeholders.md
```

**Paso 2 — Si hay MCP Gmail disponible:**
```
search_threads(
  query: "{client_name} OR {project_name}",
  maxResults: 10,
  after: "14d"
)
```
Extraer: tono de los últimos emails, tiempos de respuesta, palabras clave de preocupación.

**Paso 3 — Indicadores de sentimiento:**

| Señal | Interpretación |
|---|---|
| Respuestas rápidas, lenguaje positivo | Cliente comprometido y satisfecho |
| Respuestas tardías (> 48h), lenguaje neutro | Cliente distante o con prioridades otras |
| Preguntas frecuentes de estado, lenguaje tenso | Cliente preocupado |
| Escalaciones a superiores, CC a directivos | Cliente en modo control / desconfianza |
| Silencio prolongado (> 7 días) | Riesgo: cliente ausente o insatisfecho |
| Solicitudes de reuniones urgentes no programadas | Señal de crisis inminente |

**Paso 4 — Reporte de sentimiento:**

```
📊 ANÁLISIS DE SENTIMIENTO — {client_name} — {fecha}

ESTADO GENERAL: {Positivo 🟢 / Neutro 🟡 / Preocupado 🟠 / En riesgo 🔴}

SEÑALES DETECTADAS:
  • {señal 1 con evidencia}
  • {señal 2 con evidencia}

ÚLTIMO CONTACTO: {fecha} — {tipo: email/llamada/reunión}
TIEMPO DE RESPUESTA PROMEDIO: {X días}

RECOMENDACIÓN:
  {acción concreta — ej. "Programar call de check-in esta semana", "Enviar status report proactivo", "Escalar la preocupación detectada"}
```

---

### MODO 3 — Plan de Comunicación

**Paso 1 — Leer fuentes:**
```
context/stakeholders.md
memory/historial.md
data/cronograma.md
```

**Paso 2 — Mapear stakeholders vs comunicación:**

| Stakeholder | Rol | Canal | Frecuencia | Tipo de información | Responsable |
|---|---|---|---|---|---|
| {nombre} | Sponsor | Email / Comité | Quincenal | RAG, hitos, decisiones | PM |
| {nombre} | PO cliente | Email / Teams | Semanal | Sprint progress, backlog | PM |
| {nombre} | Gerente PMO VB | Slack interno | Semanal | Margen, riesgos, escalaciones | PM |
| {nombre} | Equipo técnico | Daily / Slack | Diaria | Blockers, tareas, técnico | Tech Lead |

**Paso 3 — Identificar brechas:**
- ¿Hay stakeholders sin comunicación reciente (> 14 días)?
- ¿Hay hitos próximos que requieren comunicación proactiva?
- ¿Hay riesgos que deben comunicarse antes de que se materialicen?

**Paso 4 — Actualizar `context/stakeholders.md`** con el plan actualizado.

---

## Reglas del comando

1. **Nunca comprometer fechas sin verificar** — siempre cruzar con `data/cronograma.md` y `memory/compromisos.md` antes de incluir una fecha en cualquier comunicado
2. **Tono = contexto + perfil** — un mismo mensaje a un sponsor es diferente que al PO técnico; adaptar siempre
3. **Transparencia antes que optimismo** — si hay un problema, el comunicado lo reconoce con solución; nunca ocultar o minimizar
4. **Proponer, no imponer** — el PM tiene la última palabra en el mensaje; el agente propone y el PM aprueba
5. **Registrar todo** — cada comunicado enviado queda en `memory/correo.md`

---

## Output esperado

- **Modo 1:** comunicado completo con asunto + cuerpo + cierre, listo para copiar/enviar
- **Modo 2:** análisis de sentimiento del cliente con semáforo y recomendación de acción
- **Modo 3:** tabla de plan de comunicación actualizada con brechas identificadas

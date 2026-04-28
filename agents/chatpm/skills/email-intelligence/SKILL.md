---
name: email-intelligence
description: Análisis inteligente de emails del proyecto para detectar señales débiles que el PM podría no notar — bloqueadores silenciosos, cambios de tono del cliente, escalaciones encubiertas, compromisos verbales no documentados. Capa de inteligencia sobre Gmail.
---

# SKILL: Email Intelligence

## Rol en la arquitectura

Este skill **infiere** información de los emails que un humano podría pasar por alto: cambios sutiles de tono, patrones de respuesta, "lo que el cliente NO dijo".

```
recoleccion-contexto    → Sync mecánico (qué llegó, de quién, sobre qué)
gestion-correos         → Operación manual (etiquetar, archivar, vincular)
email-intelligence      → ESTE SKILL — capa de inferencia (qué significa)
```

**No confundir con:**
- `recoleccion-contexto` → cosecha datos de Gmail — este skill los interpreta
- `gestion-correos` → operación CRUD sobre emails — este skill detecta señales

---

## Cuándo Activar

- Como complemento de `recoleccion-contexto` en el inicio de sesión (segundo análisis)
- "cómo está el cliente realmente", "hay algo raro en los correos"
- Antes de un comité o decisión importante con el cliente
- Cuando el PM siente que "algo no cuadra" pero no sabe qué
- Semanal o quincenalmente como práctica regular

---

## Protocolo de Ejecución

### Paso 1 — Cargar histórico de emails

Si MCP Gmail disponible:
```
search_threads(query="from:{client_email}", maxResults: 30, after: "60d")
search_threads(query="to:{client_email}", maxResults: 30, after: "60d")
```

Si no hay MCP:
```
{project_path}/memory/correo.md       (últimos 30 días)
{project_path}/memory/emails.md       (índice)
```

---

### Paso 2 — Detectar señales débiles

#### 2.1 — Bloqueadores silenciosos

Buscar emails enviados por VortexBird al cliente que:
- No tuvieron respuesta en > 5 días
- Contenían pregunta directa ("?") o solicitud de decisión
- Eran sobre tema de cronograma o compromiso

```
🔴 BLOQUEADOR SILENCIOSO DETECTADO
   Email enviado: 2026-04-20 — "Aprobación del diseño de auth"
   Días sin respuesta: 8
   Riesgo: el sprint actual depende de esta aprobación
   Acción sugerida: follow-up con escalación amable
```

#### 2.2 — Cambios de tono

Comparar el lenguaje de los emails recientes vs los antiguos:

| Señal de cambio negativo | Implicación |
|---|---|
| Saludos más formales ("Estimado" vs "Hola") | Distanciamiento |
| Despedidas más cortas o ausentes | Frialdad |
| Aparición de palabras: "preocupación", "duda", "esperaba" | Insatisfacción incipiente |
| Aparición de superiores en CC nuevos | Escalación encubierta |
| Mensajes más cortos / menos contexto | Pérdida de interés o frustración |
| Tiempo de respuesta aumentando | Distanciamiento o sobrecarga |

```
🟠 CAMBIO DE TONO DETECTADO
   El cliente {nombre} cambió de tono en los últimos 14 días.
   Evidencia:
     - Saludo cambió de "Hola Pedro" a "Estimado equipo"
     - Tiempo de respuesta subió de 4h a 36h promedio
     - 2 emails sin "saludos / atte" final
   Posible causa: insatisfacción con {tema reciente}
   Acción sugerida: programar call informal para chequear pulso
```

#### 2.3 — Compromisos verbales no documentados

Detectar lenguaje del PM que indica compromiso pero NO está registrado en `memory/compromisos.md`:

Patrones:
- "Lo entregamos para el {fecha}"
- "Te confirmo el martes"
- "Vamos a poder hacerlo"
- "Sin problema, lo agregamos"

```
🟡 COMPROMISO NO DOCUMENTADO
   En email del 2026-04-25 dijiste: "lo entregamos para el viernes"
   No hay entrada en memory/compromisos.md sobre esto.
   Acción sugerida: registrarlo formalmente con responsable y fecha
```

#### 2.4 — Escalaciones encubiertas

Detectar cuando el cliente:
- Empieza a poner en CC a su jefe
- Cambia el subject de "RE:" a algo nuevo (rompiendo el thread)
- Menciona "voy a consultar con {persona superior}"
- Pide reunión "urgente" sin agenda clara

```
🔴 ESCALACIÓN ENCUBIERTA
   {cliente} empezó a poner en CC a {sponsor} desde 2026-04-22.
   El cliente está preparando o ejecutando una escalación.
   Acción sugerida: proactivamente contactar al cliente y al sponsor antes de que el problema crezca
```

#### 2.5 — Solicitudes implícitas (scope creep)

Detectar lenguaje del cliente que sugiere expectativas fuera del alcance:

- "Asumo que esto incluye..."
- "Y de paso podemos..."
- "Sería bueno que también..."
- "Tendría sentido agregar..."

```
🟡 POSIBLE SCOPE CREEP
   En email del 2026-04-26, el cliente dijo:
     "Asumo que el módulo X incluye reportes históricos"
   Esto NO está en el alcance original.
   Acción sugerida: aclarar antes de que se vuelva expectativa firme
```

#### 2.6 — Patrones de comunicación rota

- Emails con muchos "?" → cliente confundido o frustrado
- Emails con MAYÚSCULAS → impaciencia
- Emails muy largos donde antes eran cortos → algo se está acumulando
- Threads con > 10 respuestas sin resolución → problema de claridad

---

### Paso 3 — Análisis de sentimiento global

Calcular un score de "salud de la relación" 0-100:

| Factor | Peso | Cómo medir |
|---|---|---|
| Tiempo de respuesta promedio | 20 | Más rápido = mejor |
| Tono general | 25 | Análisis de palabras positivas/neutras/negativas |
| Frecuencia de comunicación | 15 | Estable es mejor que abrupta |
| Bloqueadores silenciosos | 20 | Pocos es mejor |
| Lenguaje de compromiso | 10 | "vamos juntos", "nuestro" vs "ustedes", "su" |
| Escalaciones encubiertas | 10 | Cero es ideal |

---

### Paso 4 — Generar reporte de inteligencia

```
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
🧠 EMAIL INTELLIGENCE — {project_name} — {fecha}
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

SALUD DE LA RELACIÓN: {N}/100  →  {🟢 Sólida / 🟡 Estable / 🟠 Tensa / 🔴 En riesgo}

📊 ANÁLISIS PERIODO ÚLTIMOS 30 DÍAS:
  • Emails intercambiados: {N}
  • Tiempo de respuesta promedio (cliente): {X}h
  • Tendencia de respuesta: {↑ ↓ →}

🚨 SEÑALES DETECTADAS:
  🔴 {señal crítica si hay}
  🟠 {señal alta}
  🟡 {señal moderada}

💼 BLOQUEADORES SILENCIOSOS ({N}):
  - {asunto} — Esperando hace {N días} — Impacto: {alto/medio}

📝 COMPROMISOS NO DOCUMENTADOS ({N}):
  - "{frase del email}" — Email del {fecha}

⚠️  POSIBLE SCOPE CREEP ({N}):
  - {expectativa implícita detectada}

🎯 ACCIONES RECOMENDADAS PRIORIZADAS:
  1. {acción más urgente — qué hacer en próximas 24h}
  2. {acción importante — esta semana}
  3. {acción preventiva — este mes}
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
```

---

### Paso 5 — Actualizar archivos del proyecto

- `memory/historial.md` → entrada `[fecha] EMAIL_INTELLIGENCE — Score: {N}/100, {N} señales detectadas`
- Si hay bloqueadores silenciosos críticos → appendear a `memory/compromisos.md` para tracking
- Si hay compromisos no documentados → appendear a `memory/compromisos.md` con fuente del email
- Si hay escalación encubierta → registrar en `risks/risk-register.md`
- Si hay scope creep detectado → alertar a `negociacion-cambios`

---

## Reglas del Skill

1. **Inferir, no concluir** — las señales son hipótesis; el PM verifica con realidad
2. **Cero falsos positivos sobre escalaciones** — antes de alertar "escalación encubierta", validar con 2+ señales
3. **Privacidad del cliente** — analizar patrones, no contenido sensible específico
4. **Conectar puntos** — una señal aislada no es alerta; un patrón sí
5. **Acciones concretas** — no decir "el cliente está preocupado" sin sugerir qué hacer
6. **Auditable** — cada señal debe tener evidencia (fecha del email, frase específica)

## Playbooks asociados

- `cliente-ausente` (si bloqueadores silenciosos > 7 días)
- `conflicto-stakeholders` (si hay escalación encubierta)
- `cambio-alcance` (si hay scope creep en patrones)
- `perdida-confianza-cliente` (si score de salud < 60)

## Output esperado

- Score de salud de la relación 0-100
- Señales débiles detectadas con evidencia
- Bloqueadores silenciosos priorizados
- Compromisos no documentados a regularizar
- Acciones recomendadas en orden de urgencia

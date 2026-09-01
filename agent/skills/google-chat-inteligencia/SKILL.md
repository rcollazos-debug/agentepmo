---
name: google-chat-inteligencia
description: Revisa los mensajes de Google Chat relacionados con el proyecto activo, extrae compromisos, riesgos, decisiones y pendientes, presenta una síntesis al PM y guarda en la memoria del proyecto solo lo que el PM aprueba.
---

# SKILL: Inteligencia de Google Chat

## Propósito

Conectar las conversaciones de Google Chat del equipo con la memoria del proyecto. El agente busca mensajes relevantes entre todos los espacios y conversaciones, los analiza con criterio PMO y presenta un resumen estructurado al PM antes de persistir cualquier información.

---

## Cuándo Activar

- "revisa los chats", "qué hay en los chats"
- "analiza las conversaciones", "qué se habló hoy"
- "sync de chat", "revisa Google Chat"
- "qué compromisos hay en el chat", "hay algo nuevo en los chats del proyecto"
- "qué dijo el equipo hoy"

---

## Protocolo de Ejecución

### Paso 1 — Leer contexto del proyecto activo

Leer `project.md` y extraer:
- `[PROJECT_NAME]` = nombre del proyecto
- `[CLIENT]` = nombre del cliente
- `[PM]` = nombre del PM
- `[project_path]` = el directorio de trabajo actual (`.`)

Definir el rango de búsqueda por defecto: **últimas 48 horas**.
Si el usuario especificó otro rango ("esta semana", "hoy", "últimos 3 días"), usarlo.

### Paso 2 — Descubrir espacios relevantes

Llamar a `list_spaces` para obtener TODOS los espacios de Chat del usuario.

Filtrar localmente los espacios cuyo `displayName` contenga (sin distinguir mayúsculas):
- `[PROJECT_NAME]` o parte de él
- `[CLIENT]`

Consolidar lista de espacios coincidentes → `[ESPACIOS_ENCONTRADOS]`

Si no hay coincidencias claras por nombre, mostrar al PM la lista de espacios disponibles y pedir confirmación:
```
No identifiqué automáticamente espacios de "[PROJECT_NAME]" / "[CLIENT]".
Estos son los espacios disponibles en tu Google Chat:
  [lista de espacios con su displayName]

¿Cuál(es) reviso?
```

### Paso 3 — Extraer mensajes

Para cada espacio en `[ESPACIOS_ENCONTRADOS]`:

Llamar a `list_messages` con el `spaceName` del espacio y filtro de tiempo (últimas 48h o el rango indicado).

> Nota: este MCP no tiene búsqueda global de mensajes. El filtrado por contenido
> (`[PROJECT_NAME]`, `[CLIENT]`, palabras clave) se hace localmente sobre los mensajes
> que devuelve `list_messages` de cada espacio.

Consolidar todos los mensajes en una lista única, eliminando duplicados.

Si hay más de 100 mensajes → priorizar mensajes con menciones, respuestas con ≥3 interacciones, y mensajes de las últimas 12 horas.

Para resolver nombres de autores, usar `get_user_info` si el `sender` viene como ID.

### Paso 4 — Análisis inteligente PMO

Leer todos los mensajes consolidados y clasificar cada fragmento relevante en una de estas categorías:

**COMPROMISOS** — alguien asume una responsabilidad con fecha implícita o explícita
> Señales: "yo me encargo", "para el [día]", "lo entrego", "voy a", "quedé de", "lo termino", "confirmo para"

**RIESGOS** — situación con potencial impacto en entrega, costo o calidad
> Señales: "no vamos a llegar", "hay un bloqueo", "está caído", "no han respondido", "lleva X días sin", "en riesgo", "preocupa", "problema con"

**DECISIONES** — acuerdo tomado entre dos o más personas
> Señales: "quedamos en", "acordamos", "aprobado", "cancelamos", "vamos a hacer", "decidimos", "el cliente aceptó"

**PENDIENTES** — tarea sin dueño claro o sin fecha definida
> Señales: "queda pendiente", "falta definir", "hay que ver", "alguien puede", "¿quién se encarga?"

**SCOPE CREEP** — el cliente o alguien del equipo pide algo que no estaba en el alcance
> Señales: "el cliente pide", "nuevo requerimiento", "¿podemos agregar?", "también quieren", "¿es posible incluir?"

**ESCALADAS** — situación que requiere atención del PM inmediatamente
> Señales: "@[PM]", "urgente", "crítico", "bloqueado hace más de 2 días", "nadie sabe", "se cayó producción"

**INFORMACIÓN GENERAL** — contexto útil pero no crítico
> Daily updates, confirmaciones de reuniones, coordinación logística

Ignorar: saludos, emojis de reacción, mensajes fuera de contexto del proyecto.

### Paso 5 — Presentar síntesis al PM

Mostrar el resumen estructurado ANTES de guardar nada:

```
📱 Revisión de Google Chat — [PROJECT_NAME]
Período: [RANGO] | Espacios revisados: [N] | Mensajes analizados: [N]

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

🔴 ESCALADAS ([N])
[Si hay]: Presentar primero — requieren atención inmediata
  • [Quién]: "[mensaje exacto o parafraseo]" — [espacio] — [hora]

⚠️ RIESGOS ([N])
  • [Quién]: "[resumen]" — [espacio] — [hora]

📋 COMPROMISOS ([N])
  • [Quién]: [qué] — para [cuándo] — [espacio]

✅ DECISIONES ([N])
  • [resumen de la decisión] — [quiénes] — [hora]

📌 PENDIENTES ([N])
  • [qué queda sin dueño o sin fecha]

🔀 POSIBLE SCOPE CREEP ([N])
  • [qué se está pidiendo] — fuente: [quién/espacio]

ℹ️ INFORMACIÓN GENERAL ([N])
  • [resumen breve]

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

¿Qué guardo en el proyecto?
  [A] Todo lo anterior
  [B] Solo las categorías críticas (escaladas + riesgos + compromisos)
  [C] Selecciono yo (dime qué excluir)
  [D] Nada por ahora
```

### Paso 6 — Guardar solo lo aprobado

Según la respuesta del PM:

#### Compromisos aprobados → `{project_path}/memory/compromisos.md`
```markdown
| [fecha] | [quién] | [compromiso] | [fecha límite] | Pendiente |
```
Fuente: Google Chat — [espacio] — [timestamp]

#### Riesgos aprobados → `{project_path}/risks/risk-register.md`
Crear entrada con:
- Descripción del riesgo extraído del chat
- Categoría inferida
- P y I estimados (pedir al PM si no es obvio)
- Estado: Identificado
- Fuente: Google Chat

#### Decisiones aprobadas → `{project_path}/memory/decisiones.md`
```markdown
| [fecha] | [decisión] | [quiénes] | Chat: [espacio] |
```

#### Pendientes aprobados → `{project_path}/memory/compromisos.md`
Registrar como compromisos sin dueño asignado (marcar como "Sin dueño").

#### Scope creep aprobado → Activar skill `control-cambios`
No guardar directamente — formalizar como CR.

#### Escaladas → `{project_path}/memory/historial.md` + alerta inmediata al PM
Siempre registrar, con o sin aprobación explícita.

#### Todo → `{project_path}/memory/historial.md`
Agregar entrada de resumen:
```markdown
## [fecha] — Sync Google Chat
- Compromisos: [N] registrados
- Riesgos: [N] identificados
- Decisiones: [N] documentadas
- Scope creep: [N] — derivados a control-cambios
```

### Paso 7 — Confirmar

```
✅ Guardado en el proyecto "[PROJECT_NAME]":
  • [N] compromisos → memory/compromisos.md
  • [N] riesgos → risks/risk-register.md
  • [N] decisiones → memory/decisiones.md
  [Si hay scope creep]: ⚠️ [N] posibles cambios de alcance — activa skill control-cambios para formalizarlos.
```

---

## Reglas del Skill

1. **Nunca guardar sin aprobación del PM** — siempre presentar síntesis primero.
2. **Escaladas son la excepción** — si hay algo urgente, alertar de inmediato aunque el PM no haya respondido aún.
3. **Scope creep nunca va directo a memoria** — siempre deriva al skill `control-cambios` para formalizar como CR.
4. **Respetar privacidad** — no guardar mensajes completos, solo el resumen del punto relevante.
5. **Citación de fuente** — siempre registrar el espacio y fecha del mensaje origen.
6. **Si Google Chat MCP no está disponible**: responder "El MCP de Google Chat no está conectado aún. Sigue las instrucciones de configuración en `agents/chatpm/mcp/google-chat-setup.md`"

---

## Herramientas del MCP (google-chat-mcp local)

| Herramienta | Uso en este skill |
|---|---|
| `list_spaces` | Descubrir todos los espacios (Paso 2) |
| `list_messages` | Extraer mensajes de un espacio por `spaceName` (Paso 3) |
| `get_message` | Detalle de un mensaje específico |
| `get_user_info` | Resolver nombre de autor desde su ID |
| `find_dm` | Ubicar conversación directa con una persona |
| `send_message` | Confirmar/responder en un espacio (solo si el PM lo pide) |
| `reply_to_thread` | Responder dentro de un hilo |

> No existe `search_conversations` ni `search_messages` — toda búsqueda se hace
> filtrando localmente los resultados de `list_spaces` y `list_messages`.

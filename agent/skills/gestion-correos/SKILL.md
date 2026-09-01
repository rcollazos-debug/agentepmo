---
name: gestion-correos
description: Consulta, clasifica y guarda correos electrónicos relacionados con el proyecto usando el MCP de Gmail. Permite buscar correos por remitente, asunto o tema, marcar los relevantes con una etiqueta del proyecto, y persistirlos en la memoria del agente para trazabilidad y seguimiento.
---

# SKILL: Gestión de Correos del Proyecto

## Propósito

Conectar la bandeja de Gmail del PM con la memoria del proyecto. El skill permite buscar correos relevantes, presentarlos al usuario para que decida cuáles pertenecen al proyecto, etiquetar los seleccionados en Gmail y guardar un resumen estructurado en `{project_path}/memory/emails.md` para que el agente los tenga en cuenta en seguimientos, informes y decisiones futuras.

---

## Base PMBOK 8

- **Dominio:** Stakeholders + Trabajo del Proyecto
- **Principios:** Comprometerse efectivamente con los interesados · Demostrar liderazgo · Construir calidad en los procesos

---

## Cuándo Activar

- "muéstrame los correos del proyecto", "qué correos hay de [cliente]"
- "revisa los correos", "busca correos de [nombre/asunto]"
- "guarda este correo en el proyecto", "marca este correo como del proyecto"
- "qué decisiones han llegado por correo", "hay correos de aprobación"
- "correos de esta semana del cliente", "correos con adjuntos del proyecto"

---

## MODO 1 — Consultar correos del proyecto

Activar cuando el usuario quiere VER correos sin necesariamente guardarlos.

### Paso 1 — Leer contexto del proyecto

Leer `{project_path}/context/proyecto-base.md` para obtener:
- `[PROYECTO]` = nombre del proyecto
- `[CLIENTE]` = nombre del cliente / empresa
- `[EMAIL_CLIENTE]` = email del interlocutor principal si está registrado
- `[PM]` = nombre del PM

### Paso 2 — Construir query de búsqueda

Si el usuario dio una búsqueda específica, usarla directamente.
Si no, construir la query automáticamente con los datos del proyecto:

```
Queries recomendadas por caso:

Correos recientes del cliente:
  "from:[EMAIL_CLIENTE] newer_than:30d"
  "from:[CLIENTE] newer_than:30d"

Correos con el nombre del proyecto:
  "subject:[PROYECTO] newer_than:60d"
  "[PROYECTO] newer_than:60d"

Correos de aprobaciones:
  "subject:(aprobado OR aprobación OR autorizado OR approved) [PROYECTO]"

Correos de cambios de alcance:
  "subject:(cambio OR change OR alcance OR scope) [PROYECTO]"

Correos con adjuntos:
  "has:attachment from:[CLIENTE] newer_than:30d"

Correos no leídos del cliente:
  "from:[CLIENTE] is:unread"
```

### Paso 3 — Ejecutar búsqueda

Llamar a `search_emails`:
```
query: [QUERY_CONSTRUIDA]
maxResults: 15
```

### Paso 4 — Presentar resultados

Mostrar al usuario la lista de correos encontrados en formato tabla:

```
📧 Correos encontrados para [PROYECTO]:

N° | Fecha | De | Asunto | ID
---|---|---|---|---
1  | [fecha] | [remitente] | [asunto] | [messageId]
2  | ...
...

¿Quieres que lea el contenido de alguno? (indica el número)
¿Quieres guardar alguno en la memoria del proyecto? (indica los números, ej: "1, 3, 5")
```

### Paso 5 — Leer correo completo (si el usuario lo pide)

Llamar a `read_email`:
```
messageId: [ID_SELECCIONADO]
```

Presentar:
- De / Para / Fecha
- Asunto
- Cuerpo completo o resumen si es muy largo (> 500 palabras → resumir en 5 puntos clave)
- Adjuntos si los hay

---

## MODO 2 — Guardar correos en la memoria del proyecto

Activar cuando el usuario quiere PERSISTIR correos como registros del proyecto.

### Paso 1 — Identificar correos a guardar

El usuario indica cuáles correos guardar por número de la lista (Modo 1) o por descripción directa.

Si el usuario describe el correo pero no lo ha buscado aún, ejecutar Modo 1 primero.

### Paso 2 — Leer contenido completo de cada correo seleccionado

Para cada correo seleccionado, llamar a `read_email`:
```
messageId: [ID]
```

Extraer:
- `[FECHA_EMAIL]` = fecha de envío
- `[REMITENTE]` = nombre y email del remitente
- `[DESTINATARIOS]` = lista de destinatarios
- `[ASUNTO]` = asunto del correo
- `[CUERPO_RESUMEN]` = resumen de 2-3 líneas con los puntos clave
- `[ACCION_REQUERIDA]` = si hay una acción, decisión o respuesta pendiente (o "Ninguna")
- `[CATEGORIA]` = clasificar en una de las categorías abajo

**Categorías de correos del proyecto:**
- `Decisión del cliente` — aprobaciones, rechazos, cambios de dirección
- `Cambio de alcance` — solicitudes de nuevo trabajo o modificaciones
- `Aprobación formal` — sign-offs, actas firmadas, entregables aprobados
- `Reporte enviado` — reportes de estado enviados al cliente/sponsor
- `Riesgo comunicado` — alertas de riesgo, escalaciones, problemas comunicados
- `Compromiso del cliente` — compromisos de fechas, entregables o recursos del cliente
- `Información general` — contexto, coordinación, logística

### Paso 3 — Etiquetar en Gmail

#### 3.1 Verificar si existe la etiqueta del proyecto

Llamar a `list_email_labels`.

Buscar en los resultados una etiqueta con nombre `PMO/[PROYECTO]`. Si no existe:

Llamar a `create_label`:
```
name: "PMO/[PROYECTO]"
```

Guardar el `id` de la etiqueta como `[LABEL_ID]`.

#### 3.2 Agregar etiqueta a cada correo seleccionado

Para cada correo, llamar a `modify_email`:
```
messageId: [ID]
addLabelIds: [[LABEL_ID]]
```

### Paso 4 — Guardar en `{project_path}/memory/emails.md`

Leer el archivo `{project_path}/memory/emails.md` actual. Si no existe, crearlo con la estructura base (ver plantilla abajo).

Agregar una entrada por cada correo guardado en la sección correspondiente a su categoría.

**Formato de entrada:**
```markdown
| [ID_CORTO] | [FECHA_EMAIL] | [REMITENTE] | [ASUNTO] | [CUERPO_RESUMEN] | [ACCION_REQUERIDA] |
```

`[ID_CORTO]` = primeros 12 caracteres del messageId de Gmail.

### Paso 5 — Confirmar al usuario

```
✅ [N] correos guardados en la memoria del proyecto y etiquetados en Gmail como "PMO/[PROYECTO]"

Correos registrados:
- [ASUNTO 1] — [CATEGORIA 1] — [ACCION 1]
- [ASUNTO 2] — [CATEGORIA 2] — [ACCION 2]

📂 Ver en Gmail: buscar label:PMO/[PROYECTO]
📝 Registro: {project_path}/memory/emails.md
```

---

## MODO 3 — Buscar en la memoria de correos

Activar cuando el usuario quiere consultar correos YA guardados sin ir a Gmail.

### Paso 1 — Leer `{project_path}/memory/emails.md`

### Paso 2 — Filtrar por lo que pide el usuario

Opciones de filtro:
- Por categoría: "muéstrame las aprobaciones", "hay correos de cambios de alcance"
- Por remitente: "correos del cliente UAO"
- Por acción pendiente: "qué correos tienen acción pendiente"
- Por fecha: "correos de esta semana / este mes"

### Paso 3 — Presentar resultados filtrados

Si el usuario quiere ver el correo completo, activar Modo 1 con el messageId guardado.

---

## MODO 4 — Vincular correo a un elemento del proyecto

Activar cuando un correo confirma un compromiso, aprueba un entregable, o genera un cambio.

### Paso 1 — Identificar qué genera el correo

Preguntar al usuario o inferir del contenido:
- ¿Es una aprobación de entregable? → registrar en `{project_path}/memory/compromisos.md`
- ¿Es un cambio de alcance? → crear entrada en `{project_path}/data/cambios.md` o alertar skill `control-cambios`
- ¿Es un riesgo nuevo? → activar skill `gestion-riesgos`
- ¿Es un compromiso del cliente? → agregar a `{project_path}/memory/compromisos.md`

### Paso 2 — Actualizar el archivo correspondiente

Agregar referencia cruzada en el archivo destino:
```
[Referencia al correo: messageId parcial, fecha, asunto]
```

### Paso 3 — Actualizar `{project_path}/memory/emails.md`

Marcar el correo como "Vinculado a [archivo]" en la columna Acción.

---

## Reglas del Skill

1. **Nunca leer correos sin confirmación.** Siempre mostrar la lista primero y esperar que el usuario seleccione.
2. **No guardar correos automáticamente.** El usuario siempre decide cuáles son relevantes para el proyecto.
3. **Respetar la privacidad.** No incluir en `{project_path}/memory/emails.md` el cuerpo completo — solo el resumen de 2-3 líneas.
4. **Etiqueta consistente.** Siempre usar el formato `PMO/[PROYECTO]` para todas las etiquetas del proyecto.
5. **Vincular con el contexto.** Cuando un correo contiene una decisión importante, proponer vincularlo al archivo correspondiente del proyecto (compromisos, cambios, riesgos).
6. **Si Gmail no está autenticado**, responder: *"El MCP de Gmail no está activado aún. Sigue las instrucciones de configuración OAuth para habilitarlo."*

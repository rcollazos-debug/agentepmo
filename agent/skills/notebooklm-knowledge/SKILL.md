---
name: notebooklm-knowledge
description: Consulta y extrae conocimiento estructurado de notebooks de NotebookLM. Identifica documentos del proyecto, hace preguntas específicas orientadas a PM, y actualiza los archivos de contexto con la información encontrada.
---

# SKILL: NotebookLM Knowledge

## Rol en la arquitectura

**Este skill es el WORKER de documentos estáticos.** Se ejecuta bajo demanda o desde la Fase 0 de `analisis-contexto`. Hace consultas profundas y específicas a notebooks (no solo lista).

```
analisis-contexto       → ORQUESTADOR (UNA VEZ al inicio del proyecto)
recoleccion-contexto    → worker de fuentes vivas (CADA SESIÓN)
notebooklm-knowledge    → ESTE SKILL — worker de documentos estáticos (BAJO DEMANDA)
```

**Este skill NO hace:**
- ❌ Sync continuo de Gmail/Calendar — eso es `recoleccion-contexto`
- ❌ Entrevista al PM — eso es `analisis-contexto`
- ❌ Procesar emails — eso es `gestion-correos` o `recoleccion-contexto`

**Este skill SÍ hace:**
- ✅ Listar notebooks relevantes al proyecto activo
- ✅ Clasificar documentos por tipo (propuesta, contrato, acta, etc.)
- ✅ Hacer preguntas específicas adaptadas al tipo de documento
- ✅ Extraer compromisos, fechas, datos financieros, condiciones contractuales
- ✅ Detectar discrepancias entre documentos y archivos locales
- ✅ Actualizar archivos del proyecto solo con información encontrada (sin sobreescribir lo existente)

---

## Propósito

Extraer información valiosa de los documentos del proyecto almacenados en NotebookLM: propuestas, contratos, especificaciones técnicas, actas, emails adjuntos. El agente consulta activamente en lugar de esperar que el PM lo haga manualmente.

**Principio clave:** los documentos en NotebookLM contienen verdad escrita — compromisos, fechas y condiciones que deben sincronizarse con los archivos de memoria del proyecto.

---

## Cuándo Activar

- Durante el Paso 3 del Protocolo de Inicio (cosecha automática vía `recoleccion-contexto`)
- El PM dice: "revisa los documentos", "qué dice el contrato sobre X", "busca en NotebookLM"
- Se necesita validar una fecha, un monto o una condición contractual
- El PM carga un documento nuevo y pide procesarlo
- `analisis-contexto` está en Fase 0 (pre-carga automática)

---

## Protocolo de Ejecución

### Paso 1 — Listar Notebooks Disponibles

```
notebook_list()
```

Filtrar notebooks relevantes al proyecto activo. Un notebook es relevante si su nombre contiene:
- `{project_name}` o `{project_id}`
- `{client}` (nombre del cliente)
- Palabras clave: "propuesta", "contrato", "acta", "especificación", "kickoff", "RFP", "SOW"

Si no se encuentra ningún notebook del proyecto:
```
No encontré notebooks relacionados con "{project_name}" en NotebookLM.
¿Tienes documentos del proyecto cargados? Si no, puedes continuar sin ellos.
```

---

### Paso 2 — Clasificar Documentos por Tipo

Para cada notebook del proyecto, identificar el tipo de documentos que contiene:

| Tipo de documento | Preguntas que se harán | Archivo destino |
|---|---|---|
| **Propuesta económica** | BAC, modelo de contrato, fases, hitos de facturación | `context/vortexbird.md`, `data/presupuesto.md` |
| **Contrato / SOW** | Penalizaciones, garantías, entregables formales, criterios de aceptación, condiciones de pago | `context/contrato.md` |
| **Especificación técnica** | Stack tecnológico, integraciones, restricciones, módulos incluidos/excluidos | `context/proyecto-base.md` |
| **Acta de kickoff / inicio** | Compromisos asumidos, fechas acordadas, equipo, alcance validado | `context/proyecto-base.md`, `memory/compromisos.md` |
| **Emails / comunicaciones** | Compromisos verbales, expectativas del cliente, cambios de dirección | `memory/correo.md`, `memory/compromisos.md` |
| **RFP / Licitación** | Requerimientos originales, criterios de evaluación | `context/proyecto-base.md` |

---

### Paso 3 — Consultas Orientadas al PM

Para cada notebook del proyecto, ejecutar las siguientes preguntas en función del tipo de documento identificado.

#### Para cualquier documento del proyecto:
```
"¿Cuáles son las fechas clave mencionadas en este documento?"
"¿Hay compromisos o entregables con fecha límite?"
"¿Hay personas mencionadas con roles o responsabilidades?"
```

#### Para propuestas / contratos:
```
"¿Cuál es el presupuesto total o precio acordado?"
"¿Cuál es el modelo de contratación (precio fijo, T&M, squad)?"
"¿Hay penalizaciones o cláusulas de incumplimiento?"
"¿Cuáles son los hitos de pago o facturación?"
"¿Qué entregables formales se comprometieron?"
```

#### Para especificaciones técnicas / actas:
```
"¿Cuál es el alcance incluido y excluido?"
"¿Qué integraciones externas se mencionan?"
"¿Hay restricciones técnicas o de arquitectura documentadas?"
"¿Qué cambios de alcance o nuevos requerimientos aparecen?"
```

#### Para detección de riesgos:
```
"¿Hay supuestos críticos o dependencias externas mencionadas?"
"¿Hay lenguaje ambiguo en el alcance que podría generar conflicto?"
"¿Hay condiciones bajo las cuales el proyecto podría fallar según el documento?"
```

---

### Paso 4 — Extraer y Estructurar Hallazgos

Por cada respuesta de NotebookLM, estructurar así:

```
HALLAZGO — {tipo_documento} — {notebook_name}
Fecha detectada: {fecha del documento si aparece}

COMPROMISOS:
  - {compromiso 1} — Responsable: {nombre o "VortexBird"} — Fecha: {fecha o "[Sin fecha]"}

FECHAS CLAVE:
  - {fecha}: {evento/entregable}

CONDICIONES ESPECIALES:
  - {penalización / garantía / condición}

RIESGOS INFERIDOS:
  - {riesgo identificado en el documento}

DATOS FINANCIEROS:
  - BAC: {monto o "[No mencionado]"}
  - Modelo: {tipo o "[No mencionado]"}
  - Hitos de pago: {lista o "[No mencionados]"}
```

---

### Paso 5 — Actualizar Archivos del Proyecto

Con la información extraída, actualizar **solo los campos que se encontraron**. Nunca sobreescribir información existente con datos menos completos.

```
Si se encontraron compromisos → appendear a {project_path}/memory/compromisos.md
Si se encontraron fechas clave → actualizar {project_path}/data/cronograma.md
Si se encontró BAC / modelo → actualizar {project_path}/context/vortexbird.md
Si se encontraron penalizaciones → actualizar {project_path}/context/contrato.md
Si se encontró alcance detallado → actualizar {project_path}/context/proyecto-base.md
Si se identificaron riesgos → appendear a {project_path}/risks/risk-register.md
```

**Formato de entrada en `memory/compromisos.md`:**
```
| {fecha_hoy} | {compromiso extraído} | {responsable} | {fecha_límite} | Pendiente | NotebookLM: {nombre_notebook} |
```

---

### Paso 6 — Resumen al PM

```
📚 NOTEBOOKLM — {N} notebooks procesados — {fecha}

DOCUMENTOS REVISADOS:
  ✓ {nombre_notebook_1} ({tipo})
  ✓ {nombre_notebook_2} ({tipo})

HALLAZGOS PRINCIPALES:
  • BAC detectado: {monto o "[Sin datos]"}
  • Fecha de entrega en documento: {fecha o "[Sin datos]"}
  • Compromisos nuevos: {N} detectados
  • Riesgos inferidos: {N}
  • Penalizaciones: {Sí/No}

ARCHIVOS ACTUALIZADOS:
  ✓ {archivo 1} (+{N} entradas)
  ✓ {archivo 2} (actualizado)

{Si hay discrepancias con archivos locales}:
  ⚠️  DISCREPANCIA DETECTADA: El documento dice {X} pero el archivo local dice {Y}.
      → Verificar con el PM cuál es la versión correcta.
```

---

## Herramientas MCP Disponibles

| Herramienta | Cuándo usarla |
|---|---|
| `notebook_list()` | Paso 1 — listar todos los notebooks disponibles |
| `notebook_query(id, question)` | Paso 3 — hacer una pregunta específica al notebook |
| `notebook_get_sources(id)` | Para ver qué documentos contiene el notebook |
| `notebook_get_notes(id)` | Para leer las notas/resúmenes generados por NotebookLM |

**Setup requerido (una vez por máquina):**
```bash
uv tool install notebooklm-mcp-cli --python 3.12
nlm login
```

---

## Reglas del Skill

1. **Preguntas específicas, no genéricas** — "¿Cuál es el BAC?" es mejor que "¿Qué información hay?"
2. **Solo appendear, nunca sobreescribir** — los archivos locales tienen prioridad sobre lo inferido de documentos
3. **Inferir sin alucinaciones** — si NotebookLM no retorna datos claros, marcar `[Sin datos en documento]`, no inventar
4. **Detectar discrepancias** — si el documento dice algo diferente a lo que está en los archivos locales, alertar al PM
5. **Clasificar antes de preguntar** — identificar el tipo de documento primero para hacer preguntas relevantes
6. **Usar `{project_path}` dinámico** — nunca rutas hardcodeadas
7. **Si el MCP no está disponible** — registrar en `memory/historial.md` y continuar sin bloquear el flujo

# CONVENCIONES — ChatPM PMO Agent

Este documento es la **fuente de verdad** sobre la estructura de archivos, paths y protocolos de escritura del agente. Todos los skills, comandos y playbooks deben adherirse a estas convenciones.

---

## 1. Estructura de Carpetas por Proyecto

Cada proyecto es **una carpeta propia**, creada por `vorkanpm init`. La raíz de esa carpeta es la raíz de los datos, y el agente trabaja siempre sobre el directorio desde el que se abrió la sesión:

```
{project_path}/               ← el directorio de trabajo actual (`.`)
├── project.md ← identificación del proyecto (project_id, cliente, PM, fechas)
├── .vorkanpm.json ← identificador y versión del agente con la que se creó
├── context/   ← información permanente del proyecto (cambia poco)
├── memory/   ← memoria viva del agente (append-only)
├── metrics/  ← realidad medida (sync continuo)
├── data/     ← baseline / plan (modificable solo vía CR)
├── risks/    ← registro de riesgos
└── scope/    ← gestión del alcance
```

---

## 2. Distinción `data/` vs `metrics/` (CRÍTICO)

Esta es la distinción más importante del sistema:

| Carpeta | Propósito | Cuándo se modifica |
|---|---|---|
| **`data/`** | **PLAN / BASELINE** — lo que se acordó hacer | **Solo vía Change Request formal** (`/cambios`). Modificarlo sin CR = riesgo contractual. |
| **`metrics/`** | **REALIDAD MEDIDA** — lo que está pasando | **Sync continuo** desde Metabase, actualizaciones del PM, sincronización automática (`recoleccion-contexto`). |

### Casos específicos:

| Concepto | `data/` (plan) | `metrics/` (real) |
|---|---|---|
| Cronograma | `data/cronograma.md` — fechas comprometidas | `metrics/cronograma.md` — SPI, SV, varianzas |
| Presupuesto | `data/presupuesto.md` — BAC y desglose | `metrics/financiero.md` — CPI, EAC, AC consumido |
| Capacidad | — | `metrics/capacidad.md` — utilización real del equipo |
| Backlog | `data/backlog.md` — historias planificadas | `metrics/delivery.md` — velocidad real |
| Calidad | — | `metrics/calidad.md` — defectos, cobertura, retrabajo |

**Regla de oro:** si un dato puede cambiar sin que cambie el alcance/contrato, va en `metrics/`. Si cambiarlo requiere acuerdo formal, va en `data/`.

---

## 3. Distinción `memory/correo.md` vs `memory/emails.md`

| Archivo | Propósito | Formato |
|---|---|---|
| **`memory/correo.md`** | **Comunicados relevantes** del proyecto — entradas/salidas con resumen y decisión | Texto narrativo con fecha, remitente, asunto y resumen ejecutivo |
| **`memory/emails.md`** | **Índice técnico** de emails con messageId de Gmail para trazabilidad y búsqueda | Tabla con messageId, fecha, asunto, categoría, acción pendiente |

Un mismo email importante puede aparecer en ambos archivos:
- En `emails.md` con su messageId para poder recuperarlo en Gmail
- En `correo.md` con su análisis y por qué importa al proyecto

---

## 4. Variables Dinámicas (NUNCA hardcodear)

### Variables siempre disponibles desde `project.md`:

| Variable | Origen | Uso |
|---|---|---|
| `{project_id}` | project.md | identificador corto del proyecto |
| `{project_name}` | project.md | nombre completo del proyecto |
| `{project_path}` | **siempre `.`** | el directorio de trabajo actual |
| `{client}` | project.md | nombre del cliente |
| `{pm}` | project.md | nombre del PM |

### Reglas:

- ✅ **Siempre:** `{project_path}/context/proyecto-base.md`
- ❌ **Nunca:** `brain/utilcupos/context/proyecto-base.md`
- ❌ **Nunca:** `projects/utilcupos/context/proyecto-base.md`
- ❌ **Nunca:** una ruta absoluta del sistema de archivos

Una carpeta es un proyecto y el proyecto es la carpeta. El agente **no escribe fuera del directorio de trabajo**: no hay raíz `brain/` ni `projects/` sobre la que elegir.

### Las rutas de datos son direcciones lógicas, no rutas de disco

El proyecto vive en **Trilium**. Una referencia `{project_path}/<carpeta>/<archivo>.md` se resuelve
como **la nota `<archivo>` dentro de la nota `<carpeta>`** del proyecto de la sesión:

```
{project_path}/memory/historial.md   →   nota "historial"  bajo la nota "memory"
{project_path}/risks/risk-register.md →   nota "risk-register" bajo la nota "risks"
```

La carpeta local es la **copia de trabajo**: el agente lee y escribe siempre ahí, y publicar en
Trilium es un acto aparte que requiere el visto bueno del PM. Que el servidor no responda nunca
impide trabajar; solo deja la publicación pendiente.

Ninguna dirección puede tener más de dos niveles, y la carpeta debe ser una de las seis conocidas.

### Qué se escribe dónde

| Escribes en | Cuándo | Cómo llega al repositorio |
|---|---|---|
| **Archivos locales** `{project_path}/…` | Siempre que trabajes: es el 100% de los datos del proyecto | Con `vorkanpm publish`, que pide aprobación al PM |
| **Herramientas de Trilium** | Solo operaciones del repositorio: validar un aporte, consultar otro proyecto, corregir una nota concreta a petición del PM | Directo — por eso no se usan para el trabajo de la sesión |

Escribir datos del proyecto con las herramientas de Trilium **salta la aprobación del PM y la firma de autoría**. No se hace.

### Política de reconciliación por naturaleza de carpeta

Cuando local y repositorio han cambiado los dos, lo que decide es la naturaleza de la carpeta — la misma distinción del apartado 2, que aquí deja de ser documentación y pasa a ser la regla de resolución:

| Carpeta | Naturaleza | Qué ocurre |
|---|---|---|
| `memory/` | Append-only | Se **unen** las entradas de ambos lados, ordenadas por fecha y sin duplicar. Por eso **nunca se reescribe entero**: se appendea |
| `metrics/` | Realidad medida | Gana la **medición más reciente**, conservando quién y cuándo midió |
| `risks/`, `scope/` | Tablas con ID | Se **fusionan por identificador de fila** |
| `data/`, `context/` | Línea base | **Se para.** No se resuelve solo: decide el PM titular, porque cambiarla sin acuerdo es riesgo contractual |

### Roles, aportes y autoría

Cada proyecto tiene un **PM titular** y puede tener colaboradores. El titular arbitra la línea base y valida; los colaboradores aportan.

| Lo que aporta un colaborador | Dónde entra |
|---|---|
| Hechos: correo, acuerdo, minuta, compromiso | Directo a `memory/`, marcado **sin validar**, con su autor. Consultable de inmediato |
| Mediciones | Directo a `metrics/`, con autor y fecha |
| Cualquier cosa de `data/` o `context/` | **Propuesta pendiente** junto al dato afectado. La línea base no se mueve |

Un aporte sin validar **no bloquea nada**: se lee, se busca y se usa igual. La validación solo cambia su estatus.

Cada nota registra tres momentos distintos, y son campos separados a propósito:

- `creadoPor` / `aportadoPor` — quién lo trajo. **La corrección del titular no lo borra.**
- `ultimaEdicion` — quién lo tocó al final.
- `validadoPor` — quién le dio el visto bueno.

La identidad **no se declara**: la resuelve el CLI contra Google. Quien diga llamarse de otra forma solo se pone una etiqueta encima de un correo que sigue siendo el suyo.

### Rutas del cuerpo del agente

El material compartido entre skills — playbooks, conocimiento, plantillas y recursos — **no está en la carpeta del proyecto**: vive en la instalación del agente. Se referencia con el marcador `{{AGENT_HOME}}`, que el instalador sustituye por la ruta real de la máquina:

- ✅ `{{AGENT_HOME}}/vorkan/playbooks/atraso-cronograma.md`
- ✅ `{{AGENT_HOME}}/vorkan/knowledge/evm-guide.md`

Un recurso que pertenece a un solo skill se referencia relativo al directorio de ese skill, sin marcador.

Si un skill necesita un valor que no está en `project.md` (ej: `{tech_lead}`), debe leerlo de `{project_path}/context/equipodetrabajodev.md` y NO asumirlo.

---

## 5. Protocolo de Escritura a `memory/historial.md`

Múltiples skills escriben al historial. Para evitar corrupción y facilitar lectura:

### Reglas obligatorias:

1. **Append-only** — nunca sobrescribir entradas anteriores
2. **Formato fijo de entrada:**
   ```
   [YYYY-MM-DD HH:MM] {SKILL_NAME} — {descripción concisa}
   {detalle opcional en líneas siguientes con indentación de 2 espacios}
   ```
3. **Una entrada por evento** — no agrupar múltiples eventos en una línea
4. **Timestamp ISO 8601** — usar fecha y hora reales, no placeholders
5. **{SKILL_NAME} en MAYÚSCULAS** — facilita filtrar por skill: `STATUS`, `SYNC_GMAIL`, `RELEASE`, etc.

### Ejemplos válidos:

```
[2026-04-27 09:15] SYNC_GMAIL — 12 emails procesados, 3 compromisos detectados
  Fuente: gmail.com (cliente: Bancoomeva)
  Riesgo detectado: cliente sin responder hace 8 días → ver risks/risk-register.md

[2026-04-27 14:30] SPRINT_REVIEW — Sprint 12 cerrado
  Velocidad: 38 SP (objetivo: 40) | Defectos abiertos: 2 altos
  Próximo sprint inicia 2026-04-28

[2026-04-27 16:00] ESCALACION_L2 — Bloqueador de QA escalado a Gerente PMO
  Motivo: cuello de botella > 3 sprints
  Decisión solicitada antes del 2026-04-30
```

---

## 6. Protocolo de Escritura a `memory/compromisos.md`

Tabla con formato fijo:

```
| Fecha registro | Compromiso | Responsable | Fecha límite | Estado | Fuente |
|---|---|---|---|---|---|
| 2026-04-27 | Entregar diseño técnico | Pedro Tech Lead | 2026-05-05 | Pendiente | Email cliente 2026-04-26 |
```

**Estados válidos:** `Pendiente`, `En curso`, `Cumplido`, `Vencido`, `Cancelado`

**Fuente** debe identificar de dónde vino el compromiso: email, reunión, NotebookLM, contrato, etc.

---

## 7. Convenciones de Nombres

| Tipo | Convención | Ejemplo |
|---|---|---|
| Skills | kebab-case | `gestion-riesgos` |
| Comandos | kebab-case con `/` | `/nuevo-proyecto`, `/1on1` |
| Playbooks | kebab-case | `cliente-ausente.md` |
| Templates | kebab-case | `acta-inicio.md`, `1on1-notes.md` |
| Project IDs | kebab-case sin espacios ni acentos | `utilcupos`, `bancox-loyalty` |
| Variables | snake_case con llaves | `{project_path}`, `{tech_lead}` |

---

## 8. Manejo de Datos Faltantes

Cuando un dato no está disponible:

- ✅ **Marcar:** `[POR DEFINIR]` o `[Sin datos suficientes]`
- ❌ **Nunca:** inventar valores, dejar campo vacío sin marca, asumir defaults silenciosos

Esto permite al agente identificar qué falta sin alucinaciones.

---

## 9. Orden de precedencia de fuentes

Cuando varias fuentes tienen información sobre lo mismo, prevalecen en este orden:

1. **Archivos locales** (`{project_path}/`) — fuente de verdad operativa
2. **Documentos en NotebookLM** (contratos, propuestas) — fuente legal/contractual
3. **Emails recientes** (Gmail) — actualizaciones recientes del cliente
4. **Metabase** — métricas medidas del sistema
5. **Inferencia del agente** — última opción, siempre marcada como inferencia

Si un documento de NotebookLM contradice un archivo local, el agente **alerta al PM** sin sobrescribir.

---

## 10. Reglas Generales

1. **Multi-proyecto desde el día 1** — todo skill/comando debe funcionar para cualquier `{project_id}`, no solo uno hardcodeado
2. **Append-only en memoria** — nunca destruir información histórica
3. **Verificar antes de escribir** — leer el archivo actual antes de modificarlo
4. **Dejar rastro** — toda modificación importante registrada en `memory/historial.md`
5. **Nunca borrar** archivos de un proyecto sin confirmación explícita del PM

---

*Estas convenciones son parte de la identidad del agente. Cualquier modificación requiere actualizar también AGENT.md y AGENTS.md.*

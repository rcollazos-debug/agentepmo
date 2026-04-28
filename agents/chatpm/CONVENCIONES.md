# CONVENCIONES — ChatPM PMO Agent

Este documento es la **fuente de verdad** sobre la estructura de archivos, paths y protocolos de escritura del agente. Todos los skills, comandos y playbooks deben adherirse a estas convenciones.

---

## 1. Estructura de Carpetas por Proyecto

Cada proyecto vive en `projects/{project_id}/` con esta estructura fija:

```
projects/{project_id}/
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

### Variables siempre disponibles desde `active-project.md`:

| Variable | Origen | Uso |
|---|---|---|
| `{project_id}` | active-project.md | identificador corto del proyecto |
| `{project_name}` | active-project.md | nombre completo del proyecto |
| `{project_path}` | active-project.md | ruta relativa (ej: `projects/utilcupos`) |
| `{client}` | active-project.md | nombre del cliente |
| `{pm}` | active-project.md | nombre del PM |

### Reglas:

- ✅ **Siempre:** `{project_path}/context/proyecto-base.md`
- ❌ **Nunca:** `projects/utilcupos/context/proyecto-base.md`
- ❌ **Nunca:** `projects/gestion-proyectos/context/proyecto-base.md`

Si un skill necesita un valor que no está en `active-project.md` (ej: `{tech_lead}`), debe leerlo de `{project_path}/context/equipodetrabajodev.md` y NO asumirlo.

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

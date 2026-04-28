# COMMAND: /nuevo-proyecto

## Propósito

Inicializar la estructura completa de archivos y directorios para un proyecto nuevo. Crea todos los directorios (`context/`, `memory/`, `metrics/`, `data/`, `risks/`, `scope/`) y los archivos base con plantillas vacías pero estructuradas, dejando el proyecto listo para ser completado con `/analisis-contexto`.

## Cuándo usar

- "nuevo proyecto", "crea el proyecto X", "inicializa el proyecto"
- "vamos a empezar con un proyecto nuevo"
- Cuando el PM tiene un proyecto nuevo que aún no existe en `projects/`
- Después de ganar una propuesta / al inicio del ciclo de vida del proyecto

---

## Instrucciones de ejecución

### Paso 1 — Recopilar datos mínimos

Hacer las siguientes preguntas **en una sola ronda**:

```
Para crear el proyecto necesito 3 datos:

1. ¿Cuál es el ID del proyecto? (código corto, sin espacios — ej: "condepro", "utilcupos", "bancox")
   Este será el nombre del directorio.

2. ¿Cuál es el nombre completo del proyecto?

3. ¿Cuál es el nombre del cliente?
```

→ Esperar respuesta antes de continuar.

Validar el ID:
- Sin espacios, sin caracteres especiales (solo letras, números, guiones)
- Verificar que `projects/{id}/` NO existe ya → si existe, alertar y pedir otro ID

---

### Paso 2 — Crear estructura de directorios y archivos

Con `project_id` confirmado, crear en `projects/{project_id}/`:

#### Directorios a crear:
```
projects/{project_id}/
├── context/
├── memory/
├── metrics/
├── data/
├── risks/
└── scope/
```

#### Archivos a crear con contenido base:

**`context/proyecto-base.md`**
```markdown
# Proyecto: {project_name}

## Identificación
- **ID:** {project_id}
- **Nombre:** {project_name}
- **Cliente:** {client}
- **PM:** [POR DEFINIR]
- **Tech Lead:** [POR DEFINIR]

## Fechas
- **Fecha de inicio:** [POR DEFINIR]
- **Fecha de entrega comprometida:** [POR DEFINIR]
- **Duración estimada:** [POR DEFINIR]

## Descripción
[POR DEFINIR — descripción del proyecto en 2-3 líneas]

## Objetivos del Proyecto
1. [POR DEFINIR]
2. [POR DEFINIR]

## Alcance (resumen)
**Incluido:**
- [POR DEFINIR]

**Excluido:**
- [POR DEFINIR]

## Stack Tecnológico
- **Frontend:** [POR DEFINIR]
- **Backend:** [POR DEFINIR]
- **Base de datos:** [POR DEFINIR]
- **Infraestructura:** [POR DEFINIR]

## Metodología
[POR DEFINIR — Scrum / Kanban / Híbrido]
```

**`context/vortexbird.md`**
```markdown
# Contexto VortexBird — {project_name}

## Modelo Comercial
- **Tipo de contrato:** [POR DEFINIR — Precio fijo / T&M / Squad dedicado]
- **BAC (Presupuesto total):** [POR DEFINIR]
- **Margen objetivo:** [POR DEFINIR]% (mínimo: 30%)
- **Margen calculado:** [POR CALCULAR]%

## Hitos de Facturación
| Hito | % | Monto | Condición | Fecha estimada |
|---|---|---|---|---|
| [POR DEFINIR] | | | | |

## Penalizaciones
[POR DEFINIR — ver contrato]

## Notas Comerciales
[POR DEFINIR]
```

**`context/stakeholders.md`**
```markdown
# Stakeholders — {project_name}

## Interlocutores del Cliente
| Nombre | Cargo | Email | Rol en el proyecto | Nivel de influencia |
|---|---|---|---|---|
| [POR DEFINIR] | | | Sponsor | Alto |
| [POR DEFINIR] | | | Product Owner | Alto |

## Equipo VortexBird
| Nombre | Rol | Disponibilidad |
|---|---|---|
| [POR DEFINIR] | PM | 100% |
| [POR DEFINIR] | Tech Lead | 100% |

## Plan de Comunicaciones
| Stakeholder | Canal | Frecuencia | Tipo de información |
|---|---|---|---|
| Sponsor cliente | Email | Quincenal | RAG, hitos, decisiones |
| PO cliente | Email/Teams | Semanal | Sprint progress |
| Gerente PMO VB | Slack | Semanal | Margen, riesgos |
```

**`context/restricciones.md`**
```markdown
# Restricciones y Supuestos — {project_name}

## Restricciones
1. [POR DEFINIR]

## Supuestos
1. [POR DEFINIR]

## Dependencias Externas
| Dependencia | Proveedor/Responsable | Fecha esperada | Riesgo si no llega |
|---|---|---|---|
| [POR DEFINIR] | | | |
```

**`memory/historial.md`**
```markdown
# Historial del Proyecto — {project_name}

---

## {fecha_creacion} — PROYECTO CREADO

Proyecto {project_name} ({project_id}) inicializado en ChatPM.
Cliente: {client}
Estado: Configuración inicial pendiente — ejecutar /analisis-contexto para completar el contexto.

---
```

**`memory/compromisos.md`**
```markdown
# Compromisos Activos — {project_name}

| ID | Compromiso | Responsable | Fecha límite | Estado | Fuente |
|---|---|---|---|---|---|

*Sin compromisos registrados aún.*
```

**`memory/decisiones.md`**
```markdown
# Decisiones del Proyecto — {project_name}

| Fecha | Decisión | Tomada por | Impacto | Fuente |
|---|---|---|---|---|

*Sin decisiones registradas aún.*
```

**`memory/riesgo.md`**
```markdown
# Resumen de Riesgos Activos — {project_name}

*Sin riesgos registrados aún. Ejecutar /riesgos para el Risk Workshop inicial.*
```

**`metrics/dashboard.md`**
```markdown
# Dashboard — {project_name}

**Semáforo:** ⬜ Sin datos
**Última actualización:** {fecha_creacion}

## KPIs Principales
| KPI | Valor actual | Meta | Estado |
|---|---|---|---|
| SPI | — | ≥ 0.95 | ⬜ |
| CPI | — | ≥ 0.95 | ⬜ |
| Margen actual | — | ≥ 30% | ⬜ |
| Defectos críticos | — | = 0 | ⬜ |
| Sprint velocity | — | [POR DEFINIR] | ⬜ |

## Próximos Hitos
*Sin hitos definidos aún.*
```

**`metrics/financiero.md`**
```markdown
# Control Financiero — {project_name}

## Presupuesto Base
- **BAC:** [POR DEFINIR]
- **Burn rate planificado:** [POR DEFINIR]/mes
- **Margen objetivo:** [POR DEFINIR]%

## EVM — Estado Actual
| Indicador | Valor | Referencia |
|---|---|---|
| PV (Valor Planificado) | — | |
| EV (Valor Ganado) | — | |
| AC (Costo Real) | — | |
| SPI | — | ≥ 0.95 |
| CPI | — | ≥ 0.95 |
| EAC (Estimado al cierre) | — | ≤ BAC |
| VAC (Variación al cierre) | — | > 0 |
| Margen proyectado | — | ≥ 30% |
```

**`data/cronograma.md`**
```markdown
# Cronograma — {project_name}

## Fechas Base
- **Inicio:** [POR DEFINIR]
- **Entrega:** [POR DEFINIR]

## Fases / Hitos
| Fase | Inicio | Fin | Estado | Notas |
|---|---|---|---|---|
| [POR DEFINIR] | | | Pendiente | |

## Sprints (si aplica Scrum)
| Sprint | Inicio | Fin | Objetivo | Estado |
|---|---|---|---|---|
| Sprint 1 | [POR DEFINIR] | [POR DEFINIR] | [POR DEFINIR] | Pendiente |
```

**`data/backlog.md`**
```markdown
# Product Backlog — {project_name}

*Sin historias cargadas aún. Completar durante el Sprint 0 o Kick-off.*

## Épicas
| ID | Épica | Prioridad | T-shirt | Estado |
|---|---|---|---|---|

## Historias de Usuario
| ID | Como... | Quiero... | Para... | Épica | Puntos | MoSCoW | Estado |
|---|---|---|---|---|---|---|---|
```

**`risks/risk-register.md`**
```markdown
# Risk Register — {project_name}

*Sin riesgos registrados aún. Ejecutar /riesgos para el Risk Workshop inicial.*

## Registro de Riesgos
| ID | Riesgo | Categoría | Probabilidad | Impacto | Score | Estrategia | Responsable | Estado |
|---|---|---|---|---|---|---|---|---|
```

**`risks/technical-risks.md`**
```markdown
# Riesgos Técnicos — {project_name}

*Riesgos específicos de arquitectura, integraciones y deuda técnica.*

| ID | Riesgo técnico | Componente | Probabilidad | Impacto | Mitigación | Responsable |
|---|---|---|---|---|---|---|
```

**`data/sprint-actual.md`**
```markdown
# Sprint Actual — {project_name}

**Sprint #:** [POR DEFINIR]
**Fechas:** [POR DEFINIR] → [POR DEFINIR]
**Objetivo del sprint:** [POR DEFINIR]

## Compromiso del Sprint
*Sin historias planificadas aún. Ejecutar /sprint en modo Planning.*

| ID | Historia | Puntos | Asignado | Estado |
|---|---|---|---|---|

## Burndown
| Día | SP restantes | Notas |
|---|---|---|

## Bloqueadores Activos
*Sin bloqueadores registrados.*

## Daily Notes
*Las notas del daily se appendean aquí.*
```

**`data/dependencias.md`**
```markdown
# Dependencias Externas — {project_name}

*Sin dependencias registradas aún.*

## Dependencias Críticas
| ID | Dependencia | Tipo | Proveedor/Responsable | Fecha esperada | Estado | Riesgo si no llega |
|---|---|---|---|---|---|---|

**Tipos:** API externa | SDK | Datos del cliente | Aprobación | Recurso humano | Infraestructura | Licencia
**Estados:** Pendiente | Confirmada | Recibida | Bloqueada | Fallida
```

**`data/proveedores.md`**
```markdown
# Proveedores Externos — {project_name}

*Sin proveedores registrados aún.*

## Registro de Proveedores
| Proveedor | Servicio | Contacto | SLA acordado | Costo | Estado relación | Última evaluación |
|---|---|---|---|---|---|---|

## Evaluación de Desempeño
| Proveedor | Período | Cumplimiento SLA | Calidad | Comunicación | Score | Notas |
|---|---|---|---|---|---|---|
```

**`metrics/capacidad.md`**
```markdown
# Capacidad del Equipo — {project_name}

*Capacidad disponible vs demandada por sprint.*

## Capacidad por Persona (horas/sprint o SP/sprint)
| Persona | Rol | Disponibilidad % | Capacidad teórica | Capacidad real | Notas |
|---|---|---|---|---|---|

## Utilización Histórica
| Sprint | Capacidad disponible | Capacidad utilizada | % Utilización | Comentarios |
|---|---|---|---|---|

## Vacaciones / Ausencias Programadas
| Persona | Desde | Hasta | Impacto en sprint(s) |
|---|---|---|---|
```

---

### Paso 3 — Actualizar `active-project.md`

Preguntar: "¿Quieres activar este proyecto como el activo ahora?"
- Si sí → actualizar `active-project.md` con los datos del nuevo proyecto
- Si no → mantener el proyecto activo actual, solo crear la estructura

---

### Paso 4 — Confirmar y recomendar próximos pasos

```
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
✅ PROYECTO CREADO — {project_name} ({project_id})
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

ESTRUCTURA CREADA:
  ✓ projects/{project_id}/context/   ({N} archivos base)
  ✓ projects/{project_id}/memory/    ({N} archivos base)
  ✓ projects/{project_id}/metrics/   ({N} archivos base)
  ✓ projects/{project_id}/data/      ({N} archivos base)
  ✓ projects/{project_id}/risks/     ({N} archivos base)
  ✓ projects/{project_id}/scope/     (vacío)

PROYECTO ACTIVO: {activo/no cambiado}

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
PRÓXIMOS PASOS RECOMENDADOS:
  1. Ejecutar /analisis-contexto — entrevista guiada para completar el contexto
  2. Ejecutar /riesgos — Risk Workshop inicial
  3. Ejecutar /kick-off-docs — generar Acta de Inicio y presentación PPTX
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
```

---

## Reglas del comando

1. **Nunca sobreescribir** — si `projects/{id}/` ya existe, bloquear y alertar
2. **Siempre crear todos los directorios** — incluso si van a quedar vacíos temporalmente
3. **Usar `{project_path}` dinámico** — nunca paths hardcodeados en los archivos creados
4. **Preguntar si activar** — no cambiar `active-project.md` sin confirmación explícita
5. **Fecha real** — insertar la fecha actual en `memory/historial.md` al crear

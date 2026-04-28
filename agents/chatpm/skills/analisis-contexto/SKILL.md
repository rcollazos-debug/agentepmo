---
name: analisis-contexto
description: Recopila, estructura y registra la información inicial de un proyecto nuevo para que el agente tenga el contexto completo necesario para operar como Director PMO Senior.
---

# SKILL: Análisis de Contexto del Proyecto

## Rol en la arquitectura

**Este skill es el ORQUESTADOR de la fase inicial de contexto.** Se ejecuta una sola vez cuando un proyecto necesita configuración inicial. Combina entrevista al PM con la activación coordinada de los workers especializados.

```
analisis-contexto       → ESTE SKILL — orquestador (entrevista + dispara workers)
                          Se ejecuta UNA VEZ al inicializar un proyecto

recoleccion-contexto    → WORKER de fuentes vivas (Gmail, Calendar, Metabase)
                          Se ejecuta CADA SESIÓN

notebooklm-knowledge    → WORKER de documentos estáticos (propuestas, contratos)
                          Se ejecuta BAJO DEMANDA o desde Fase 0 de este skill
```

**Este skill NO hace:**
- ❌ Sync continuo de Gmail/Calendar — eso es `recoleccion-contexto`
- ❌ Consulta especializada de NotebookLM — eso es `notebooklm-knowledge`
- ❌ Seguimiento operativo del proyecto — eso es `seguimiento-proyecto`

**Este skill SÍ hace:**
- ✅ Entrevista estructurada al PM
- ✅ Pre-carga inicial desde fuentes (Fase 0) — DELEGANDO en los workers
- ✅ Crear los archivos base del proyecto
- ✅ Análisis de viabilidad VortexBird
- ✅ Confirmación final y próximos pasos

---

## Propósito

Recopilar, estructurar y registrar toda la información inicial de un proyecto nuevo para que el agente tenga el contexto completo necesario para operar como Director PMO Senior. Este skill convierte la información dispersa del cliente, el equipo y el contrato en archivos estructurados y listos para ser usados.

Aplica cuando el proyecto inicia, cuando hay un cambio de contexto relevante, o cuando se incorpora nueva información que cambia la comprensión del proyecto.

---

## Base PMBOK 8

- **Dominio:** Planificación + Stakeholders + Trabajo del Proyecto
- **Principios aplicados:**
  - Comprometerse efectivamente con los interesados
  - Enfocarse en el valor
  - Reconocer, evaluar y responder a interacciones del sistema
  - Adaptar el enfoque según el contexto

---

## Cuándo Activar este Skill

- Inicio de un proyecto nuevo
- El usuario dice "carga el contexto del proyecto"
- Se recibe información del cliente sobre el proyecto
- Hay cambios en el equipo, presupuesto, alcance o fechas
- El usuario actualiza datos del proyecto (contrato, propuesta, stakeholders)

---

## Protocolo de Ejecución

### Paso 1 — Obtener información del proyecto

Recopilar o inferir los siguientes datos. Si alguno no está disponible, marcar como `[POR DEFINIR]` y registrarlo como riesgo o supuesto:

#### Información básica
- Nombre del proyecto
- Código / ID
- Cliente (nombre, empresa)
- Tipo de proyecto (web, móvil, API, migración, integración, IA, etc.)
- Metodología preferida (Scrum, Kanban, Híbrido, SAFe, DA)
- Modelo de contratación (precio fijo, T&M, squad dedicado, alcance variable)

#### Fechas clave
- Fecha de inicio oficial
- Fecha de entrega comprometida con el cliente (go-live)
- Hitos intermedios si existen
- Fecha de cierre formal

#### Presupuesto
- Monto total aprobado (BAC)
- Modelo de presupuesto (por horas, por entregable, por fase)
- Margen objetivo de VortexBird
- Hitos de facturación

#### Alcance de alto nivel
- Qué está INCLUIDO en el alcance
- Qué está EXCLUIDO explícitamente
- Restricciones conocidas
- Supuestos del proyecto

#### Equipo
- Project Manager
- Tech Lead
- Desarrolladores (nombre y rol)
- QA Engineers
- DevOps / Infraestructura
- Product Owner / Interlocutor del cliente

#### Stakeholders
- Sponsor (nombre, empresa, contacto)
- Interlocutor principal del cliente
- Otros interesados relevantes

#### Tecnología
- Frontend (Angular, React, Vue, etc.)
- Backend (Java/Spring, Node, Python, .NET, etc.)
- Base de datos
- Infraestructura (cloud, on-premise, AWS, Azure, GCP)
- Integraciones externas

#### Riesgos iniciales evidentes
- Riesgos identificados en la propuesta o en conversaciones iniciales
- Supuestos que si fallan se convierten en riesgos

---

### Paso 2 — Actualizar archivos de contexto

Con la información recopilada, actualizar o crear:

**`{project_path}/context/proyecto-base.md`** — Actualizar:
- Información de identificación del proyecto
- Descripción, objetivos SMART, criterios de éxito
- Tipo de proyecto, metodología, modelo de contratación
- Fechas clave
- Presupuesto
- Alcance de alto nivel (incluye / excluye)
- Tecnología
- Estado actual

**`{project_path}/context/stakeholders.md`** — Actualizar:
- Sponsor: nombre, contacto, poder, interés, estrategia
- Interlocutor del cliente / PO: nombre, contacto, expectativas
- Equipo interno VortexBird: roles y responsabilidades
- Plan de comunicaciones inicial

**`{project_path}/context/restricciones.md`** — Actualizar:
- Restricciones de alcance, tiempo y costo
- Dependencias externas identificadas
- Supuestos del proyecto

**`{project_path}/context/contrato.md`** — Si aplica:
- Modelo contractual
- Condiciones de pago
- Penalizaciones
- Garantías post-entrega

**`{project_path}/context/equipodetrabajodev.md`, `equipodetrabajopm.md`, `equipodetrabajoqa.md`, `equipodetrabajoro.md`** — Actualizar con personas y disponibilidad.

---

### Paso 3 — Inicializar archivos de datos

Crear o estructurar con datos iniciales:

**`{project_path}/data/cronograma.md`** — Con fases y hitos mínimos basados en lo conocido.

**`{project_path}/data/presupuesto.md`** — Con BAC, desglose inicial y hitos de facturación.

**`{project_path}/data/riesgos-iniciales.md`** — Con riesgos identificados en el análisis inicial.

**`{project_path}/data/backlog.md`** — Si hay epicas o historias iniciales conocidas, registrarlas con estimación rough (T-shirt sizing).

**`{project_path}/data/dependencias.md`** — Dependencias externas identificadas (integraciones, proveedores, decisiones del cliente).

---

### Paso 4 — Inicializar métricas

**`{project_path}/metrics/dashboard.md`** — Actualizar con:
- Datos del proyecto
- Semáforo inicial (🟢 VERDE por defecto si no hay alertas identificadas)
- KPIs en cero con meta definida
- Hitos del proyecto

**`{project_path}/metrics/financiero.md`** — Con:
- BAC registrado
- Burn rate planificado por mes
- Margen objetivo VortexBird

**`{project_path}/metrics/cronograma.md`** — Con fechas base del proyecto.

---

### Paso 5 — Registrar en memoria

**`{project_path}/memory/historial.md`** — Agregar entrada:
```
[FECHA] — INICIO DEL PROYECTO
Proyecto: [nombre]
Configuración inicial del agente completada.
Datos registrados: [lista de archivos actualizados]
Semáforo inicial: [RAG]
```

**`{project_path}/memory/riesgo.md`** — Registrar riesgos iniciales detectados en el análisis.

---

### Paso 6 — Análisis de viabilidad VortexBird

Al terminar el análisis de contexto, evaluar desde la perspectiva de VortexBird:

**Preguntas de diagnóstico:**

| Dimensión | Pregunta | Resultado |
|---|---|---|
| Margen | ¿El presupuesto permite un margen ≥ 30%? | [Sí / No / En riesgo] |
| Alcance | ¿El alcance está suficientemente definido para un precio fijo? | [Sí / No / Necesita aclaración] |
| Cronograma | ¿El plazo es realista para el equipo disponible? | [Sí / No / Optimista] |
| Equipo | ¿Los perfiles asignados son los adecuados para la tecnología? | [Sí / Parcial / No] |
| Riesgos | ¿Hay riesgos que amenazan el margen de VortexBird? | [Lista] |
| Cliente | ¿El cliente tiene capacidad de tomar decisiones ágil? | [Sí / En riesgo] |

Si hay alertas en esta evaluación → registrar como riesgos en `{project_path}/risks/risk-register.md` y en `{project_path}/memory/riesgo.md`.

---

### Formato de salida del Análisis de Contexto

```
ANÁLISIS DE CONTEXTO — [PROYECTO] — [FECHA]

## Información registrada
✓ Proyecto: [nombre]
✓ Cliente: [nombre]
✓ PM: [nombre]
✓ Sponsor: [nombre]
✓ Tecnología: [stack]
✓ Metodología: [enfoque]
✓ Inicio: [fecha] | Entrega: [fecha]
✓ Presupuesto BAC: [monto]

## Archivos actualizados
- {project_path}/context/proyecto-base.md ✓
- {project_path}/context/stakeholders.md ✓
- {project_path}/context/restricciones.md ✓
- {project_path}/data/cronograma.md ✓
- {project_path}/data/presupuesto.md ✓
- {project_path}/metrics/dashboard.md ✓
- {project_path}/memory/historial.md ✓

## Datos pendientes de confirmar
[Lista de campos marcados como [POR DEFINIR]]

## Alertas iniciales
[Lista de riesgos o supuestos identificados]

## Semáforo inicial: [🟢 / 🟡 / 🔴]
Razón: [justificación]

## Próxima acción recomendada
[Acción concreta con responsable y fecha]
```

---

## Reglas del Análisis de Contexto

- **Nunca bloquear por falta de datos** — inferir con criterio profesional y marcar supuestos
- **Registrar todo en archivos** — la información verbal no documentada se pierde
- **Evaluar siempre el margen VortexBird** — es parte del análisis, no opcional
- **Si el alcance es ambiguo**, documentarlo como riesgo inmediatamente
- **Si el presupuesto parece insuficiente para el alcance**, alertar al PM antes de iniciar
- **El análisis de contexto es el fundamento** — si está mal, todo lo que viene después estará mal

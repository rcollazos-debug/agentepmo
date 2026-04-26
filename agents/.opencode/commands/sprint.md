# COMMAND: /sprint

## Propósito

Planificar, revisar o cerrar un sprint. Aplicar prácticas ágiles del Dominio de Enfoque de Desarrollo del PMBOK 8 integradas con Scrum. Generar el plan de sprint, reportar avance o facilitar la retrospectiva.

## Cuándo usar

- Inicio de sprint: planning
- Mitad de sprint: revisión de progreso
- Fin de sprint: revisión + retrospectiva
- Cuando se solicita reporte del sprint actual

---

## Instrucciones de ejecución

### 1. Leer fuentes

```
data/backlog.md
data/cronograma.md
data/recursos.md
metrics/capacidad.md
metrics/delivery.md
memory/historial.md
memory/compromisos.md
```

### 2. Detectar modo

**Modo Planning** (inicio de sprint):
- Identificar sprint número y fechas
- Calcular capacidad del equipo disponible
- Seleccionar historias del backlog priorizadas
- Generar Sprint Goal claro
- Crear compromisos del sprint

**Modo Review** (mitad o fin de sprint):
- Calcular % completado del sprint
- Identificar historias en riesgo
- Analizar impedimentos activos
- Proyectar si el sprint goal es alcanzable

**Modo Retrospectiva** (fin de sprint):
- Qué salió bien
- Qué mejorar
- Acciones concretas para el próximo sprint

### 3. Calcular capacidad (Modo Planning)

```
Capacidad total = Σ (horas disponibles por persona × factor de dedicación)
Factor de dedicación estándar = 0.70 (30% para reuniones, email, interrupciones)
Story points disponibles = Velocidad promedio de últimos 3 sprints
Velocidad promedio = Σ SP completados / número de sprints medidos
```

### 4. Priorización del backlog para el sprint

Criterios de selección:
1. Prioridad de negocio (MoSCoW: Must / Should / Could / Won't)
2. Dependencias resueltas
3. Criterios de aceptación definidos
4. Estimación refinada disponible
5. Dentro de la capacidad del sprint

### 5. Formato Sprint Planning

```
SPRINT [N] — PLANNING
Proyecto: [nombre]
Fecha inicio: [fecha] | Fecha fin: [fecha]
Duración: [X semanas]

SPRINT GOAL
[Una oración clara de qué valor entrega este sprint]

CAPACIDAD DEL EQUIPO
| Persona | Rol | Días disponibles | Horas disponibles | Factor | Capacidad efectiva |
|---|---|---|---|---|---|

HISTORIAS COMPROMETIDAS
| ID | Historia | Prioridad | SP | Criterios de Aceptación | Responsable |
|---|---|---|---|---|---|

TOTAL SP: X de X disponibles (X%)

DEFINICIÓN DE DONE (DoD)
- [ ] Código en revisión y aprobado
- [ ] Pruebas unitarias pasando
- [ ] QA funcional completado
- [ ] Documentación actualizada
- [ ] Desplegado en ambiente de staging
- [ ] Aceptación del PO confirmada

RIESGOS DEL SPRINT
[lista de riesgos específicos del sprint]

DEPENDENCIAS EXTERNAS
[lista de dependencias que deben resolverse para no bloquear el sprint]
```

### 6. Formato Sprint Review

```
SPRINT [N] — REVIEW
Fecha: [fecha]

SPRINT GOAL: [descripción]
RESULTADO: [Alcanzado / Parcialmente alcanzado / No alcanzado]

HISTORIAS COMPLETADAS (Done)
| ID | Historia | SP | Validado por |
|---|---|---|---|

HISTORIAS EN PROGRESO (parcial)
| ID | Historia | SP | % completado | Razón |
|---|---|---|---|---|

HISTORIAS NO INICIADAS
| ID | Historia | SP | Razón |
|---|---|---|---|

MÉTRICAS DEL SPRINT
- SP comprometidos: X
- SP completados: X
- Velocidad: X SP/sprint
- Velocidad promedio (últimos 3): X SP/sprint
- % entrega del sprint: X%

DEUDA TÉCNICA GENERADA
[descripción si aplica]

BUGS REPORTADOS EN EL SPRINT
[lista]
```

### 7. Formato Retrospectiva

```
SPRINT [N] — RETROSPECTIVA

QUÉ SALIÓ BIEN
- [lista]

QUÉ MEJORAR
- [lista con causa raíz]

ACCIONES PARA EL PRÓXIMO SPRINT
| Acción | Responsable | Fecha |
|---|---|---|
```

### 8. Actualizar archivos

- `data/backlog.md` — mover historias completadas
- `metrics/delivery.md` — actualizar velocidad y burndown
- `metrics/capacidad.md` — actualizar capacidad real usada
- `memory/historial.md` — registrar cierre de sprint

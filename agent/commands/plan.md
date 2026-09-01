# COMMAND: /plan

## Propósito

Construir o actualizar el Plan de Trabajo del proyecto en cualquier nivel de detalle requerido. Desde el roadmap macro hasta el plan de sprint, pasando por la WBS, el plan de recursos y la ruta crítica.

## Cuándo usar

- Inicio del proyecto (planeación inicial)
- Inicio de una nueva fase
- Cuando el plan existente quedó desactualizado
- Después de aprobar un plan de recuperación
- Cuando el cliente solicita ver el plan de trabajo

---

## Instrucciones de ejecución

### 1. Leer fuentes

```
data/acta-inicio.md
data/alcance-detallado.md
data/cronograma.md
data/backlog.md
data/recursos.md
data/dependencias.md
data/presupuesto.md
context/proyecto-base.md
context/restricciones.md
risks/risk-register.md
```

### 2. Detectar nivel de plan requerido

| Nivel | Descripción | Audiencia |
|---|---|---|
| Estratégico | Roadmap de fases y hitos macro | Sponsor / cliente |
| Táctico | WBS + cronograma con tareas | Equipo + PM |
| Operativo | Plan de sprint o plan semanal | Equipo de desarrollo |

### 3. Construir la WBS (Work Breakdown Structure)

Principio PMBOK 8: La WBS descompone el trabajo hasta llegar a paquetes de trabajo estimables y asignables.

Niveles:
```
Nivel 0: Proyecto
Nivel 1: Fases principales
Nivel 2: Entregables por fase
Nivel 3: Paquetes de trabajo
Nivel 4: Tareas (en proyectos complejos)
```

Regla del 100%: Cada nivel inferior debe cubrir el 100% del nivel superior.
Diccionario de WBS: Para cada paquete de trabajo documentar: descripción, criterio de aceptación, responsable, estimación, dependencias.

### 4. Construir el cronograma

Secuencia de pasos:
1. Listar todas las tareas de la WBS
2. Estimar duración de cada tarea (mejor caso / más probable / peor caso → PERT)
3. Definir dependencias (FS, SS, FF, SF)
4. Asignar recursos a tareas
5. Identificar la ruta crítica (suma de tareas sin holgura)
6. Calcular holguras (total y libre)
7. Ajustar si supera la fecha de entrega (crashing, fast tracking)
8. Fijar la baseline del cronograma con aprobación del sponsor

**Estimación PERT:**
Duración esperada = (Optimista + 4 × Más probable + Pesimista) / 6
Desviación estándar = (Pesimista - Optimista) / 6

### 5. Construir la Matriz RACI

```
| Entregable / Actividad | [Persona 1] | [Persona 2] | [Persona 3] | [Cliente] |
|---|---|---|---|---|
| [Actividad] | R | A | C | I |

R = Responsible (hace el trabajo)
A = Accountable (responsable final, firma)
C = Consulted (aporta input)
I = Informed (se le informa)
```

Reglas:
- Solo un A por actividad
- Al menos un R por actividad
- No saturar la matriz (muchas C e I diluyen la responsabilidad)

### 6. Plan de recursos

```
PLAN DE RECURSOS — [PROYECTO]

EQUIPO DEL PROYECTO
| Rol | Nombre | Dedicación % | Período | Horas totales | Costo estimado |
|---|---|---|---|---|---|

DISTRIBUCIÓN POR FASE
| Fase | Recursos necesarios | Horas estimadas | Pico de demanda |
|---|---|---|---|

DISPONIBILIDAD FUTURA EN RIESGO
[Lista de recursos con fechas en que su disponibilidad puede cambiar]
```

### 7. Plan de hitos

```
PLAN DE HITOS — [PROYECTO]

| ID | Hito | Fase | Fecha planificada | Criterio de completitud | Aprobador |
|---|---|---|---|---|---|
| M01 | Kick-off | Inicio | [fecha] | Reunión realizada, acta firmada | PM |
| M02 | Backlog aprobado | Planificación | [fecha] | PO aprueba el backlog | PO + cliente |
| M03 | MVP entregado | Construcción | [fecha] | Demo aceptada por cliente | Cliente |
| ... | | | | | |
| MXX | Go-live | Cierre | [fecha] | Producción estable 48h | Sponsor |
```

### 8. Actualizar archivos

- `data/cronograma.md` — plan de hitos y tareas
- `data/recursos.md` — plan de recursos
- `data/backlog.md` — backlog priorizado
- `data/dependencias.md` — dependencias entre tareas
- `memory/historial.md` — baseline del plan establecida

---

## Output esperado

Según el nivel solicitado:
- **Roadmap:** diagrama de fases y hitos con fechas
- **Plan táctico:** WBS + RACI + cronograma detallado + recursos
- **Plan operativo:** plan de sprint con historias, responsables y fechas

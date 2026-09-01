# PLAYBOOK: Pérdida o Crisis de Recurso Clave

## Activación

Se activa cuando un miembro clave del equipo abandona el proyecto, enfrenta una incapacidad prolongada, o cuando hay una reducción inesperada de la capacidad del equipo que pone en riesgo la entrega.

**Señales de activación:**
- Renuncia o salida de un desarrollador senior, Tech Lead o QA clave
- Incapacidad médica prolongada > 2 semanas de un recurso crítico
- Conflicto grave que impide a un recurso trabajar con el equipo
- La empresa cliente retira a su PO o interlocutor sin reemplazo
- Un proveedor clave pierde el personal asignado al proyecto

---

## Principio PMBOK 8 aplicado

Dominio: Equipo + Planificación + Incertidumbre
Principio: Crear un entorno colaborativo | Navegar complejidad | Abrazar adaptabilidad y resiliencia

---

## Fase 1 — Evaluación del Impacto (Primeras 24-48 horas)

### Preguntas de diagnóstico:

1. ¿Qué tareas críticas estaba ejecutando el recurso perdido?
2. ¿Hay documentación del trabajo en curso?
3. ¿Existe otro miembro del equipo que pueda asumir temporalmente?
4. ¿Cuántas historias del sprint actual dependen de este recurso?
5. ¿El cronograma puede absorber el impacto sin cambiar la fecha final?

### Cuantificar el impacto:

```
EVALUACIÓN DE IMPACTO — PÉRDIDA DE RECURSO
Recurso perdido: [nombre] — [rol]
Fecha de salida: [fecha]
Tareas en curso: [lista de tareas o historias asignadas]
SP en riesgo este sprint: X SP
Impacto en el cronograma: +X días estimados sin reemplazo
Conocimiento crítico en riesgo: [áreas técnicas o funcionales]
```

---

## Fase 2 — Conocimiento en Riesgo

El mayor riesgo no es la capacidad perdida — es el conocimiento tácito que se va con la persona.

**Acciones inmediatas (dentro de 48 horas si el recurso aún está disponible):**
- Sesión de handoff técnico con el Tech Lead y al menos otro desarrollador
- Documentar las áreas del sistema en las que trabajaba
- Capturar: decisiones técnicas tomadas, problemas conocidos, dependencias ocultas
- Transferir accesos, credenciales y herramientas
- Revisar el código pendiente de PR o review y aprobarlo/cerrarlo

**Si el recurso ya no está disponible:**
- Revisión de commits y código del recurso para entender el estado del trabajo
- Reunión técnica con el equipo para identificar "puntos ciegos"
- Mapear las historias incompletas y evaluar su estado real

---

## Fase 3 — Opciones de Reemplazo

**Opción A — Cobertura interna:**
- Reasignar tareas del recurso perdido entre los miembros actuales del equipo
- Requiere ajuste de velocidad esperada del sprint
- Riesgo: sobrecarga del equipo restante → afecta calidad y moral
- Solo viable si el impacto es < 20% de la capacidad total del equipo

**Opción B — Recurso interno de VortexBird:**
- Solicitar al Gerente PMO VortexBird un recurso de otro proyecto
- Tiempo de onboarding estimado: 1-2 semanas
- Riesgo: transferencia parcial de impacto a otro proyecto
- Mejor opción si se necesita continuidad y el perfil está disponible

**Opción C — Recurso externo / freelance:**
- Contratar un consultor o freelance temporal para cubrir el rol
- Tiempo de onboarding estimado: 2-3 semanas
- Costo adicional → CR al cliente o reserva de gestión
- Requiere aprobación del Gerente PMO VortexBird

**Opción D — Replanificación del cronograma:**
- Ajustar el cronograma con el cliente si ninguna de las opciones anteriores cubre el impacto sin comprometer la calidad
- Presentar análisis de impacto → solicitar extensión de fechas
- Requiere CR formal y comunicación al sponsor

---

## Fase 4 — Comunicar al Cliente (si el impacto afecta el cronograma)

Regla: Nunca esconder el impacto de un recurso perdido al cliente cuando afecta la fecha de entrega.

Mensaje al cliente:
```
"Estimado [nombre]:
Queremos informarle que hemos tenido un cambio en el equipo del proyecto.
Estamos gestionando la transición activamente y hemos tomado las siguientes
acciones: [acciones concretas].
El impacto estimado en el cronograma es: [X días / sin impacto].
Estamos comprometidos con mantener la calidad y la fecha de entrega.
Le mantendremos informado."
[Firma PM]
```

---

## Fase 5 — Ajuste del Sprint Actual

Con el recurso perdido, ajustar el sprint en curso:

1. Mover historias que no pueden completarse sin el recurso → próximo sprint
2. Redistribuir las tareas que sí pueden completarse entre el equipo restante
3. Actualizar el Sprint Burndown con la nueva capacidad
4. Comunicar al PO si el Sprint Goal está en riesgo

---

## Fase 6 — Prevención Futura

Implementar para reducir el Bus Factor:
- **Pair programming rotativo:** el conocimiento técnico nunca debe estar en una sola persona
- **Code reviews obligatorios:** al menos 2 personas conocen cada módulo
- **Documentación de decisiones técnicas** en `memory/decisiones.md`
- **Definition of Done con documentación:** el código no está Done sin comentarios mínimos

---

## Actualizar archivos

- `data/recursos.md` — capacidad del equipo actualizada
- `metrics/capacidad.md` — capacidad ajustada
- `memory/historial.md` — evento registrado
- `memory/riesgo.md` — riesgo de capacidad actualizado
- `data/cronograma.md` — si hay impacto en fechas
- `metrics/dashboard.md` — semáforo actualizado si aplica


---

## Activadores

Este playbook se activa típicamente desde los siguientes comandos:
- `/1on1`
- `/escalar`

# PLAYBOOK: QA Colapsado

## Activación

Se activa cuando el proceso de aseguramiento de calidad colapsa: el equipo de QA no puede absorber el volumen de trabajo, los defectos se acumulan, o la tasa de defectos supera los umbrales aceptables y se convierte en un cuello de botella crítico.

**Señales de activación:**
- Backlog de pruebas > capacidad de QA en 2 sprints
- Tasa de defectos > 1 bug/story point entregado
- Defectos críticos acumulados sin resolución > 3
- QA bloqueando releases por volumen de pendientes
- Retrabajo > 20% del esfuerzo total del sprint

---

## Principio PMBOK 8 aplicado

Dominio: Entrega (Delivery Performance Domain) + Medición
Principio: Construir calidad en procesos y entregables | Enfocarse en el valor | Navegar complejidad

---

## Paso 1 — Diagnosticar el colapso de QA

Responder con datos:
1. ¿Cuántos ítems están en cola de pruebas hoy?
2. ¿Cuántos QA disponibles y cuál es su velocidad de prueba?
3. ¿Cuántos defectos críticos/altos están abiertos?
4. ¿Cuál es la tasa de defectos de los últimos 3 sprints?
5. ¿El problema es de capacidad (pocas personas de QA) o de proceso (pruebas mal estructuradas)?
6. ¿El equipo de desarrollo está entregando historias a QA sin criterios claros de aceptación?

**Tipos de colapso:**
- **Colapso por volumen:** demasiado trabajo para la capacidad de QA
- **Colapso por calidad del código:** el equipo entrega código defectuoso que genera retrabajo masivo
- **Colapso por proceso:** no hay criterios de aceptación claros, QA prueba features ambiguos
- **Colapso por deuda:** pruebas manuales obsoletas o inexistentes, sin automatización

---

## Paso 2 — Acciones de estabilización inmediata

### Si el problema es capacidad:
- Detener temporalmente la entrada de nuevas historias a QA
- Priorizar los ítems más críticos para el release
- Reasignar desarrolladores a apoyar pruebas (pair testing)
- Considerar QA externo o freelance temporal

### Si el problema es calidad del código:
- Exigir que cada historia tenga pruebas unitarias pasando antes de pasar a QA
- Implementar Definition of Done (DoD) estricta: no pasa a QA sin criterios de aceptación documentados y pruebas unitarias
- Establecer gate de code review antes de QA
- Sesión de retrabajo focalizada: el dev que generó el defecto lo corrige como máxima prioridad

### Si el problema es proceso:
- Reunión inmediata entre PM, QA Lead y Tech Lead para redefinir el flujo
- Definir qué significa "listo para QA" con criterios explícitos
- Implementar definición de done (DoD) si no existe

### Si el problema es deuda de pruebas:
- Sprint dedicado parcialmente a automatización de regresión
- Priorizar automatización de los flujos más críticos del negocio

---

## Paso 3 — Triaje de defectos activos

Clasificar todos los defectos abiertos:

| Prioridad | Criterio | Acción |
|---|---|---|
| Crítico | Sistema caído, pérdida de datos, seguridad | Resolver antes de cualquier otra cosa |
| Alto | Funcionalidad principal bloqueada | Resolver en este sprint |
| Medio | Funcionalidad afectada con workaround | Planificar en próximo sprint |
| Bajo | Cosmético, no bloqueante | Backlog, atender cuando haya capacidad |

**Regla de release:** No se puede ir a producción con defectos críticos abiertos. Los altos requieren decisión explícita del sponsor.

---

## Paso 4 — Ajuste del plan de releases

Si el colapso de QA impacta un release programado:
- Evaluar si el release se puede hacer parcial (solo funcionalidades probadas)
- Evaluar si se puede posponer el release
- Comunicar al cliente con anticipo mínimo de 5 días hábiles
- Proponer alternativa: release parcial + segunda entrega en fecha próxima

---

## Paso 5 — Prevención (acciones estructurales)

- **Shift-left testing:** integrar pruebas desde el inicio del ciclo, no al final
- **Automatización de regresión:** reducir carga de pruebas manuales repetitivas
- **BDD (Behavior Driven Development):** criterios de aceptación como tests ejecutables
- **Ratio QA/Dev:** mantener al menos 1 QA por cada 3-4 desarrolladores
- **Definition of Done obligatoria:** ninguna historia se cierra sin pasar todos los criterios de DoD

---

## Paso 6 — Actualizar archivos

- `metrics/calidad.md` — actualizar métricas de defectos y velocidad QA
- `memory/historial.md` — registrar el evento de colapso QA
- `risks/technical-risks.md` — actualizar riesgo de calidad
- `data/backlog.md` — repriorizar con foco en deuda de calidad


---

## Activadores

Este playbook se activa típicamente desde los siguientes comandos:
- `/calidad`

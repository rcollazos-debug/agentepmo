# PLAYBOOK: Cambio de Alcance

## Activación

Se activa cuando el cliente, el sponsor u otro stakeholder solicita modificaciones al alcance del proyecto ya definido y aprobado.

**Señales de activación:**
- Cliente solicita una funcionalidad nueva en una reunión
- Se detecta trabajo siendo ejecutado sin CR formal
- El backlog crece sin que haya cambiado el presupuesto ni la fecha
- El equipo recibe instrucciones directas del cliente que no fueron filtradas por el PM

---

## Principio PMBOK 8 aplicado

Dominio: Trabajo del Proyecto + Planificación
Principio: Habilitar el cambio para lograr el estado futuro previsto | Construir calidad en procesos | Enfocarse en el valor

---

## Paso 1 — Capturar y congelar

**Acción inmediata:** No decir ni sí ni no al cliente. Decir:
> "Perfecto, registremos esto formalmente para evaluarlo con el impacto correspondiente."

Completar la ficha de CR (ver skill `control-cambios`):
- Qué se solicita exactamente
- Quién lo solicita y con qué autoridad
- Por qué lo considera necesario
- Con qué urgencia lo necesita

**Si hay trabajo no autorizado ya iniciado:**
> Detener inmediatamente, documentar el esfuerzo ya invertido, formalizar la CR retroactivamente.

---

## Paso 2 — Análisis de impacto

Evaluar en todas las dimensiones:

**Alcance:** ¿Qué se agrega, modifica o elimina? ¿Cuántas historias/tareas nuevas?
**Cronograma:** ¿Cuántos días adicionales requiere? ¿Afecta la ruta crítica?
**Costo:** ¿Cuánto esfuerzo adicional en horas? ¿Cuál es el costo?
**Calidad:** ¿Introduce complejidad técnica? ¿Requiere pruebas adicionales?
**Riesgos:** ¿Qué nuevos riesgos introduce?
**Recursos:** ¿Requiere skills no disponibles en el equipo actual?

---

## Paso 3 — Definir opciones

**Opción 1 — Incluir en el proyecto actual:**
- Condición: +X días y/o +$X aprobados por el cliente
- Presentar el impacto completo sin minimizarlo

**Opción 2 — Incluir en una fase posterior / Fase 2:**
- Sin impacto en la fecha actual
- Se planifica por separado con nuevo presupuesto

**Opción 3 — Intercambiar alcance:**
- El cambio entra, pero se negocia qué sale para compensar (swap)
- Útil cuando el presupuesto y la fecha son inamovibles

**Opción 4 — Rechazar:**
- Si no aporta valor de negocio suficiente
- Si el riesgo técnico es desproporcionado
- Siempre con justificación documentada

---

## Paso 4 — Presentar al aprobador correspondiente

Según el nivel de impacto:
- Impacto menor: PM decide y comunica
- Impacto moderado: PM + Sponsor deciden juntos
- Impacto mayor: Steering Committee decide
- Impacto contractual: requiere addendum o adenda formal firmada

**Documento de decisión:**
```
DECISIÓN REQUERIDA — CR-[NNN]
Solicitud: [descripción breve]
Opciones: A / B / C (con impacto de cada una)
Recomendación PM: Opción [X]
Fecha límite de decisión: [fecha]
```

---

## Paso 5 — Documentar y actualizar el plan

Una vez aprobada la decisión:
1. Emitir la CR firmada
2. Actualizar `data/alcance-detallado.md`
3. Actualizar `data/cronograma.md` con nuevas fechas si aplica
4. Actualizar `data/backlog.md` con nuevas historias
5. Actualizar `data/presupuesto.md` si hay costo adicional
6. Registrar en `data/cambios.md`
7. Comunicar a todos los interesados afectados

---

## Antídoto contra el scope creep

**Reglas de oro:**
- Todo cambio tiene una CR, sin excepción
- "Es un cambio pequeño" no existe — siempre hay impacto
- El equipo de desarrollo no acepta cambios directamente del cliente
- Si el alcance crece, la fecha o el presupuesto deben crecer — o el alcance original se reduce
- Documentar todo cambio rechazado también (para proteger al PM y al proveedor)

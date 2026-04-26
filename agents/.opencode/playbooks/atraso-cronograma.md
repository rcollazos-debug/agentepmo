# PLAYBOOK: Atraso de Cronograma

## Activación

Se activa cuando el proyecto presenta una desviación de cronograma que supera los umbrales de tolerancia definidos o cuando un hito crítico está en riesgo de incumplimiento.

**Señales de activación:**
- SPI < 0.85 por dos períodos consecutivos
- Hito crítico con retraso confirmado > 5 días
- Ruta crítica con holgura negativa
- Dos o más sprints consecutivos con velocidad < 70% del comprometido

---

## Principio PMBOK 8 aplicado

Dominio: Planificación + Medición + Incertidumbre
Principio: Enfocarse en el valor | Navegar complejidad | Optimizar respuestas a riesgos

---

## Paso 1 — Confirmar y cuantificar el atraso

Leer: `metrics/cronograma.md` + `data/cronograma.md` + `memory/historial.md`

Calcular:
- SPI actual y tendencia de los últimos 3 períodos
- Días de retraso real vs baseline
- Hitos afectados y su orden de impacto
- Nueva fecha de entrega proyectada si no se interviene
- Holgura total restante en la ruta crítica

```
DIAGNÓSTICO DE ATRASO
SPI: X.XX (tendencia: ↓ por X períodos)
Retraso acumulado: X días
Nueva fecha sin intervención: [fecha]
Hitos en riesgo: [lista]
Holgura disponible: X días
```

---

## Paso 2 — Análisis de causa raíz

Aplicar análisis de 5 por qués.

Causas frecuentes en proyectos de software:
- **Estimaciones incorrectas:** la complejidad técnica fue subestimada
- **Requisitos ambiguos:** historias sin criterios de aceptación claros → retrabajo
- **QA al final:** defectos encontrados tarde que requieren retrabajo masivo
- **Dependencias bloqueadas:** integración externa no disponible, decisión pendiente
- **Scope creep:** trabajo adicional absorbido sin ajuste de fecha
- **Recurso crítico fuera:** baja, vacaciones, rotación no planificada
- **Deuda técnica:** refactoring obligatorio no planificado que consume el sprint
- **Ambiente inestable:** problemas de ambiente de desarrollo o staging

---

## Paso 3 — Evaluar opciones de recuperación

### Opción A — Crashing
Agregar recursos a las tareas de la ruta crítica.
- **Cuándo:** hay presupuesto disponible, la tarea es paralelizable, los recursos adicionales tienen el skill requerido
- **Riesgo:** coordinación adicional, posible caída de calidad, ley de Brooks (agregar personas a un proyecto atrasado puede atrasarlo más)
- **Regla:** nunca hacer crashing sin antes validar la paralelizabilidad técnica de la tarea

### Opción B — Fast Tracking
Ejecutar en paralelo tareas que estaban en secuencia.
- **Cuándo:** las tareas tienen dependencia débil (no hard dependency técnico)
- **Riesgo:** retrabajo si hay dependencias ocultas
- **Validar:** con el Tech Lead antes de decidir

### Opción C — Reducción de alcance
Mover funcionalidades al siguiente release.
- **Cuándo:** la fecha de entrega es inamovible y hay alcance negociable
- **Proceso:** requiere CR formal + aprobación del cliente
- **Criterio de selección:** priorizar features por valor de negocio (MoSCoW), mover las "Could" y "Won't"

### Opción D — Renegociar fecha
Presentar nueva fecha al cliente con causa clara y plan de acción.
- **Cuándo:** ninguna otra opción recupera el tiempo sin comprometer calidad inaceptablemente
- **Preparar:** análisis de causa, plan de prevención, nueva fecha comprometida
- **Riesgo:** impacto en relación y posibles penalizaciones contractuales

---

## Paso 4 — Comunicar al cliente (si aplica)

Regla: nunca notificar un atraso sin traer también el plan de resolución.

Estructura del mensaje:
1. Estado objetivo de la situación (sin dramatismo, con datos)
2. Causa raíz en una oración
3. Plan de acción concreto
4. Nueva fecha o confirmación de fecha con condiciones
5. Solicitar reunión para alinear

---

## Paso 5 — Intensificar el monitoreo

Post-activación del playbook:
- Cambiar frecuencia de seguimiento a diario
- Revisar SPI cada 3 días
- Punto de control de la recuperación en [X días]
- Semáforo permanece en ROJO hasta SPI >= 0.90

---

## Paso 6 — Actualizar archivos

- `data/cronograma.md` — nueva baseline si se aprueba
- `metrics/cronograma.md` — actualizar métricas
- `memory/historial.md` — registrar el evento y la decisión
- `memory/compromisos.md` — compromisos del plan de recuperación
- `memory/decisiones.md` — decisión sobre el plan tomada

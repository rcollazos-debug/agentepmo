# PLAYBOOK: Deuda Técnica Bloqueante

## Activación

Se activa cuando la deuda técnica acumulada comienza a impactar la velocidad del equipo, la calidad del producto o la capacidad de entrega. La deuda técnica ignorada es un riesgo financiero para VortexBird (retrabajo = costo sin valor).

**Señales de activación:**
- Velocidad del equipo cayendo > 20% en 2+ sprints consecutivos sin causa externa
- Tech Lead reporta que "el sistema está difícil de modificar"
- Tasa de defectos aumentando a pesar de no agregar funcionalidades complejas
- Más del 20% del esfuerzo de un sprint se destina a correcciones de código anterior
- El código nuevo falla en regresión de funcionalidades antiguas con frecuencia

---

## Principio PMBOK 8 aplicado

Dominio: Entrega + Incertidumbre + Medición
Principio: Construir calidad en los procesos | Navegar complejidad | Optimizar respuestas a riesgos

---

## Fase 1 — Diagnóstico de la Deuda Técnica

### Tipos de deuda técnica

| Tipo | Descripción | Urgencia |
|---|---|---|
| **Deuda de código** | Código duplicado, métodos largos, nombres confusos | Media |
| **Deuda de diseño** | Arquitectura inadecuada que dificulta cambios | Alta |
| **Deuda de pruebas** | Cobertura de tests insuficiente | Alta |
| **Deuda de infraestructura** | Ambientes inestables, CI/CD manual, configuración manual | Alta |
| **Deuda de documentación** | Código sin comentarios, APIs sin documentar | Baja |
| **Deuda de dependencias** | Librerías desactualizadas con vulnerabilidades | Alta (seguridad) |

### Diagnóstico con el Tech Lead

Preguntas de diagnóstico:
1. ¿Qué partes del sistema toman más tiempo del esperado para modificar?
2. ¿Dónde se generan la mayoría de los defectos?
3. ¿Qué áreas del código "nadie quiere tocar"?
4. ¿Cuánto tiempo tarda integrar una historia nueva de X complejidad vs. al inicio del proyecto?
5. ¿Qué refactoring llevan más tiempo evitando y por qué?

### Cuantificar la deuda

```
Velocidad actual: X SP/sprint
Velocidad inicio del proyecto: X SP/sprint
Ratio de degradación: (Vel. inicio - Vel. actual) / Vel. inicio × 100 = X%
Costo estimado de la deuda: (horas de retrabajo/sprint) × tasa/hora × meses restantes
```

---

## Fase 2 — Priorizar la Deuda Técnica

Clasificar los items de deuda por impacto:

| Prioridad | Criterio | Acción |
|---|---|---|
| **Crítica** | Bloquea la entrega de features nuevas o genera bugs en producción | Resolver en el sprint actual, detener features si es necesario |
| **Alta** | Reduce significativamente la velocidad del equipo | Reservar 30-40% del sprint para reducir esta deuda |
| **Media** | Genera fricción pero no bloquea | Reservar 15-20% del sprint para reducir progresivamente |
| **Baja** | Molesta pero no impacta la entrega | Incluir cuando hay holgura en el sprint |

---

## Fase 3 — Plan de Reducción de Deuda

### Política de deuda técnica en los sprints

**Regla recomendada:** Reservar el 20% de la capacidad de cada sprint para deuda técnica.
- Sprint de 40 SP → 8 SP para deuda técnica
- No es opcional — es parte del velocity sostenible

### Técnicas de reducción

**Boy Scout Rule:** Cada vez que un desarrollador toca un módulo, lo deja un poco mejor de como lo encontró. Sin tareas específicas, sin sprint dedicado — es una actitud continua.

**Refactoring incremental:** No reescribir todo — mejorar una función o clase cada vez que se trabaja cerca de ella.

**Strangler Fig Pattern:** Para deuda de arquitectura — construir el sistema nuevo a su lado y migrar gradualmente, sin reescribir todo de golpe.

**Sprint de deuda técnica (cuando es crítica):** Si la deuda está bloqueando, proponer al cliente y sponsor un sprint dedicado a reducirla. Requiere CR formal y comunicación al cliente.

---

## Fase 4 — Comunicar al Cliente

La deuda técnica es un tema interno, pero si afecta la entrega, el cliente debe saberlo.

**Cuándo comunicar:** Cuando la deuda técnica va a retrasar una entrega o requerir un sprint de deuda.

**Cómo comunicar (sin jerga técnica):**
```
"Estimado [cliente]:
Para mantener la calidad y velocidad de entrega del proyecto, necesitamos
dedicar [X% del próximo sprint / un sprint completo] a consolidar la
infraestructura técnica del sistema. Esta inversión nos permitirá:
- Mantener la velocidad de entrega actual
- Reducir el riesgo de defectos futuros
- Facilitar el mantenimiento post-entrega
El impacto en el cronograma es: [X días].
[Firma PM]"
```

---

## Fase 5 — Registrar y Prevenir

- Registrar la deuda técnica en `data/backlog.md` como items de tipo "Tech Debt" con estimación
- Establecer la regla del 20% en los sprints futuros
- Incluir métricas de calidad técnica (cobertura de pruebas, análisis estático) en el DoD
- Revisar la deuda técnica en cada retrospectiva

---

## Actualizar archivos

- `data/backlog.md` — items de deuda técnica registrados y priorizados
- `memory/historial.md` — evento registrado
- `memory/riesgo.md` — si la deuda es un riesgo activo
- `metrics/calidad.md` — métricas de deuda técnica actualizadas


---

## Activadores

Este playbook se activa típicamente desde los siguientes comandos:
- `/retro`
- `/sprint`

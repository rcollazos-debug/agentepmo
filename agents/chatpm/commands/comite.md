# COMMAND: /comite

## Propósito

Preparar y estructurar el material completo para el Steering Committee o Comité Directivo del proyecto. Generar agenda, presentación ejecutiva, tabla de decisiones requeridas y compromisos del período.

## Cuándo usar

- Antes de una reunión de comité directivo
- Cuando el sponsor solicita una presentación de estado
- Cierre de hito importante que requiere validación ejecutiva
- Escalación de una situación crítica al nivel directivo

---

## Instrucciones de ejecución

### 1. Leer fuentes

```
context/proyecto-base.md
context/stakeholders.md
metrics/dashboard.md
metrics/cronograma.md
metrics/financiero.md
metrics/calidad.md
metrics/delivery.md
memory/riesgo.md
memory/decisiones.md
memory/compromisos.md
memory/historial.md
data/cronograma.md
```

### 2. Identificar los asistentes y sus intereses

Leer `context/stakeholders.md` y clasificar:
- Sponsor ejecutivo: quiere saber si el proyecto entregará a tiempo y dentro de presupuesto
- Director de TI / CTO: quiere saber riesgos técnicos y calidad
- Representante del cliente: quiere confirmar que sus expectativas se cumplen
- PMO: quiere governance, métricas y cumplimiento de estándares
- Gerente de área: quiere saber el impacto en su operación

Adaptar énfasis del material según la audiencia confirmada.

### 3. Revisar compromisos del comité anterior

Verificar en `memory/compromisos.md`:
- ¿Qué compromisos se tomaron en el último comité?
- ¿Cuáles se cumplieron?
- ¿Cuáles están pendientes con justificación?

### 4. Preparar decisiones requeridas

Identificar temas que NECESITAN decisión del comité:
- Cambios de alcance mayores
- Solicitudes de presupuesto adicional
- Cambios de fecha de entrega
- Resolución de conflictos entre áreas
- Aprobación de plan de recuperación
- Contratación o liberación de recursos
- Cambio de estrategia tecnológica

### 5. Construir el material del comité

**Slide / sección 1 — Estado general**
```
SEMÁFORO: [VERDE / AMARILLO / ROJO]
Razón en una línea
Avance general: X% (planificado: X%)
Fecha de entrega: [en riesgo / confirmada] → [fecha]
```

**Slide / sección 2 — Logros del período**
- Lista de entregables completados
- Hitos cumplidos con fecha real vs planificada

**Slide / sección 3 — Métricas clave**
```
| KPI | Planificado | Real | Tendencia |
| SPI | | | |
| CPI | | | |
| % Completado | | | |
| Defectos | | | |
| Satisfacción | | | |
```

**Slide / sección 4 — Compromisos del período anterior**
```
| Compromiso | Responsable | Fecha | Estado |
| [comp 1] | | | [Cumplido / Pendiente / Vencido] |
```

**Slide / sección 5 — Top riesgos**
```
| Riesgo | Nivel | Plan de respuesta | Dueño |
```

**Slide / sección 6 — Decisiones requeridas**
```
DECISIÓN [N]: [título]
Contexto: [2 líneas]
Opciones:
  A) [opción A] — impacto: [X]
  B) [opción B] — impacto: [X]
Recomendación del PM: Opción [X]
Deadline para decidir: [fecha]
```

**Slide / sección 7 — Compromisos para el próximo período**
```
| Compromiso | Responsable | Fecha |
```

**Slide / sección 8 — Próxima reunión**
Fecha propuesta, agenda tentativa.

### 6. Generar agenda formal

```
AGENDA — COMITÉ DIRECTIVO — [PROYECTO]
Fecha: [fecha] | Hora: [hora] | Duración: [X min]
Convocatoria: [nombre PM]

PARTICIPANTES: [lista de asistentes]

1. Apertura y objetivos de la sesión (5 min)
2. Estado general del proyecto (10 min)
3. Revisión de compromisos del período anterior (5 min)
4. Métricas y tendencias (10 min)
5. Riesgos críticos (10 min)
6. Decisiones requeridas (15 min)
7. Compromisos para el próximo período (5 min)
8. Cierre y próxima reunión (5 min)

MATERIAL DE SOPORTE: [adjunto]
```

### 7. Actualizar memoria post-comité

Después del comité registrar en:
- `memory/decisiones.md` — decisiones tomadas
- `memory/compromisos.md` — compromisos asumidos
- `memory/historial.md` — evento del comité registrado

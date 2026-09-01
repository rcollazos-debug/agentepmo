# COMMAND: /lecciones

## Propósito

Generar, revisar o actualizar las lecciones aprendidas del proyecto. Las lecciones aprendidas son el activo de conocimiento más valioso de VortexBird — cada proyecto que no captura sus aprendizajes está condenado a repetir sus errores.

## Cuándo usar

- Al finalizar el proyecto (cierre)
- Al finalizar una fase mayor del proyecto
- Después de un incidente o crisis resuelta
- Después de activar un playbook de emergencia
- Cuando el PM identifica un patrón que vale la pena documentar

---

## Instrucciones de ejecución

### 1. Leer fuentes (en orden)

```
context/proyecto-base.md
memory/historial.md (completo)
memory/decisiones.md
memory/riesgo.md
data/cambios.md
metrics/dashboard.md
metrics/financiero.md
metrics/calidad.md
memory/lecciones.md (si existe — para no duplicar)
```

### 2. Facilitar análisis de lecciones

Analizar el proyecto por dimensiones:

| Dimensión | Preguntas guía |
|---|---|
| Planificación | ¿Las estimaciones fueron precisas? ¿El cronograma fue realista? |
| Comunicación | ¿La comunicación con el cliente fue fluida? ¿Hubieron sorpresas? |
| Riesgos | ¿Los riesgos identificados se materializaron? ¿Hubieron riesgos no anticipados? |
| Calidad | ¿La tasa de defectos fue aceptable? ¿El DoD funcionó? |
| Equipo | ¿El equipo fue productivo? ¿Hubieron conflictos o bloqueos repetitivos? |
| Cliente | ¿El cliente fue colaborativo? ¿Hubieron problemas de disponibilidad? |
| Tecnología | ¿Las tecnologías elegidas fueron las correctas? ¿Hubieron problemas técnicos? |
| Financiero | ¿El margen fue el esperado? ¿Hubieron sobrecostos? ¿Por qué? |
| Proceso | ¿El enfoque ágil/híbrido elegido fue el adecuado? |

### 3. Estructura de cada lección

Para cada lección identificada:
```
LECCIÓN [N] — [Título corto]
Contexto: [situación donde ocurrió]
Qué pasó: [descripción objetiva]
Impacto: [cómo afectó al proyecto]
Causa raíz: [por qué ocurrió]
Recomendación: [qué hacer diferente]
Aplicable a: [proyectos similares donde aplica]
Prioridad de adopción: [Alta / Media / Baja]
```

### 4. Actualizar archivos

- `memory/lecciones.md` — lecciones documentadas y actualizadas
- `memory/historial.md` — registro de la sesión de lecciones

---

## Output esperado

- Top 5-10 lecciones aprendidas estructuradas
- Clasificación por dimensión (planificación, calidad, cliente, técnico, financiero)
- Recomendaciones concretas para futuros proyectos VortexBird
- Lista de "nunca más" y "hacer siempre"

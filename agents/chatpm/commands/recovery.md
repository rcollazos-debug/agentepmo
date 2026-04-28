# COMMAND: /recovery

## Propósito

Generar un Plan de Recuperación completo para proyectos en crisis o con desviaciones mayores. Diagnóstico ejecutivo, análisis de causa raíz, acciones de rescate y nuevo cronograma con compromisos formales.

## Cuándo usar

- SPI < 0.75 o CPI < 0.80
- Hito crítico incumplido con impacto en entrega final
- Sponsor o cliente solicitan plan de rescate
- Proyecto en semáforo ROJO por más de 2 semanas consecutivas
- Riesgo materializado con impacto mayor

---

## Instrucciones de ejecución

### 1. Leer todas las fuentes relevantes

```
context/proyecto-base.md
context/restricciones.md
metrics/dashboard.md
metrics/cronograma.md
metrics/financiero.md
metrics/calidad.md
data/cronograma.md
data/backlog.md
data/recursos.md
data/presupuesto.md
data/dependencias.md
memory/riesgo.md
memory/historial.md
memory/compromisos.md
memory/decisiones.md
risks/risk-register.md
```

### 2. Diagnóstico de crisis

Responder estas preguntas con datos:

**¿Cuál es el estado real hoy?**
- SPI: X.XX | SV: X días
- CPI: X.XX | CV: $X
- Avance real vs planificado: X% vs X%
- Riesgos críticos activos: X
- Hitos vencidos: X

**¿Cuál es la raíz del problema?**
Usar análisis de 5 por qués para cada causa principal detectada.

**¿Qué pasó que no se detectó a tiempo?**
- ¿Había señales tempranas ignoradas?
- ¿Falló el proceso de monitoreo?
- ¿Los supuestos iniciales eran incorrectos?

**¿Cuál es el impacto si no se interviene?**
- Nueva fecha proyectada sin intervención: [fecha]
- Costo adicional proyectado: $[monto]
- Riesgo de cancelación: [Alto / Medio / Bajo]

### 3. Definir el horizonte de recuperación

Opciones:
- **Recuperación total:** volver a la fecha y costo originales (evaluar si es realista)
- **Recuperación parcial:** nuevo acuerdo de fecha y/o alcance reducido
- **Replanning completo:** nueva baseline acordada con el cliente

Criterio de elección:
- Tiempo perdido vs tiempo disponible
- Presupuesto disponible vs requerido
- Disposición del cliente a negociar
- Capacidad técnica y de recursos del equipo

### 4. Construir el plan de recuperación

**Acciones de impacto inmediato (0-72 horas):**
Acciones que se pueden ejecutar sin aprobación adicional:
- Reasignación de recursos
- Eliminación de bloqueos pendientes
- Aceleración de decisiones paralizadas
- Reunión de emergencia con equipo y sponsor

**Acciones de corto plazo (1-2 semanas):**
- Crashing de tareas críticas
- Fast tracking de dependencias
- Replanning del sprint actual

**Acciones estructurales (proyecto completo):**
- Nueva baseline aprobada por el sponsor
- Reducción o redistribución de alcance
- Incorporación de recursos adicionales
- Cambio de metodología o cadencia

### 5. Formato del Plan de Recuperación

```markdown
# PLAN DE RECUPERACIÓN — [PROYECTO]
Fecha: [fecha] | Preparado por: PM
Versión: [X]

## DIAGNÓSTICO
Estado actual: ROJO
SPI: X.XX | Retraso: X días
CPI: X.XX | Sobrecosto: $X

Causa raíz principal: [descripción]
Causas secundarias: [lista]

## SITUACIÓN SIN INTERVENCIÓN
- Fecha proyectada de entrega: [fecha]
- Variación vs plan: +X días / +X% costo
- Riesgo adicional: [descripción]

## OBJETIVOS DEL PLAN DE RECUPERACIÓN
1. Recuperar X días de atraso antes del [fecha]
2. Controlar sobrecosto dentro del X% del BAC
3. Estabilizar el semáforo en AMARILLO para el [fecha]
4. Entregar hito [nombre] el [fecha comprometida]

## ACCIONES INMEDIATAS (0-72h)
| Acción | Responsable | Fecha límite | Resultado esperado |
|---|---|---|---|

## ACCIONES CORTO PLAZO (1-2 semanas)
| Acción | Responsable | Fecha límite | Resultado esperado |
|---|---|---|---|

## ACCIONES ESTRUCTURALES
| Acción | Responsable | Fecha límite | Aprobación requerida |
|---|---|---|---|

## NUEVO CRONOGRAMA
| Hito | Fecha original | Nueva fecha | Variación |
|---|---|---|---|

## NUEVA BASELINE
- Nueva fecha de entrega: [fecha]
- Nuevo presupuesto autorizado: $[monto]
- Alcance ajustado: [descripción de lo que se pospone]
- Aprobación requerida de: [sponsor / cliente / comité]

## PUNTOS DE CONTROL
| Checkpoint | Fecha | Criterio de éxito |
|---|---|---|
| Control 1 | [fecha] | SPI >= 0.85 |
| Control 2 | [fecha] | Hito [X] completado |
| Control 3 | [fecha] | Semáforo AMARILLO o mejor |

## PROTOCOLO DE ESCALACIÓN
Si para el [fecha] el SPI no llega a X.XX → escalar a [rol]
Si el costo supera $[monto] → convocar comité de emergencia

## COMPROMISOS
| Compromiso | Responsable | Fecha | Consecuencia si no se cumple |
|---|---|---|---|
```

### 6. Preparar comunicación al cliente

Estructura del mensaje:
1. Reconocimiento directo de la situación (sin excusas, con datos)
2. Análisis de causa raíz breve
3. Plan concreto de recuperación
4. Nuevos compromisos con fecha
5. Solicitud de reunión para alineación

### 7. Actualizar archivos

- `memory/historial.md` — registrar activación del plan de recuperación
- `memory/decisiones.md` — decisiones tomadas en el plan
- `memory/compromisos.md` — compromisos del plan de recuperación
- `data/cronograma.md` — nueva baseline
- `metrics/dashboard.md` — actualizar semáforo y estado


---

## Playbooks asociados

Este comando puede activar los siguientes playbooks según el escenario detectado:
- `recuperacion-proyecto`

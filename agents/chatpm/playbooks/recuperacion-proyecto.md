# PLAYBOOK: Recuperación de Proyecto

## Activación

Se activa cuando el proyecto está en estado crítico sostenido y requiere una intervención estructural para rescatarlo. Va más allá de un plan de recuperación puntual de atraso — es un replanning completo del proyecto.

**Señales de activación:**
- SPI < 0.75 por más de 3 semanas consecutivas
- CPI < 0.80 con tendencia decreciente
- Múltiples hitos incumplidos sin recuperación
- Semáforo ROJO por más de 1 mes sin mejoría
- El sponsor o cliente exigen un plan de rescate formal
- El equipo está en crisis de moral o hay rotación significativa

---

## Principio PMBOK 8 aplicado

Dominio: Todos los dominios — es una intervención integral
Principio: Abrazar adaptabilidad y resiliencia | Navegar complejidad | Habilitar el cambio | Enfocarse en el valor

---

## Fase 1 — Diagnóstico ejecutivo (1-2 días)

### Leer toda la información disponible:
```
context/proyecto-base.md
context/restricciones.md
data/cronograma.md + metrics/cronograma.md
data/presupuesto.md + metrics/financiero.md
data/backlog.md
data/recursos.md
memory/historial.md (completo)
memory/decisiones.md
risks/risk-register.md
```

### Preguntas de diagnóstico:

**¿Cuál es el estado objetivo real?**
- SPI: X.XX | Retraso acumulado: X días
- CPI: X.XX | Sobrecosto proyectado: $X
- % completado real vs planificado
- Hitos cumplidos vs incumplidos

**¿Cuáles son las causas raíz reales?**
(Aplicar análisis de 5 por qués para cada causa identificada)
- ¿El problema es de planificación (estimaciones erróneas)?
- ¿El problema es de ejecución (equipo, proceso, herramientas)?
- ¿El problema es de gobierno (decisiones tardías, cambios sin control)?
- ¿El problema es externo (cliente, proveedores, tecnología)?

**¿El proyecto es recuperable?**
Criterio de viabilidad: ¿Puede el proyecto entregar el valor de negocio principal dentro de un marco de tiempo y costo aceptable para el cliente?

---

## Fase 2 — Sesión de reset (1 día)

Reunión de emergencia con: PM, Tech Lead, Sponsor, representante del cliente.

**Agenda:**
1. Presentar el diagnóstico objetivo (datos, no emociones)
2. Acordar si el proyecto continúa, se reduce o se cancela
3. Si continúa: acordar el marco del replanning (qué es negociable)
4. Asignar responsabilidades para el plan de rescate

**Posibles decisiones:**
- **Continuar con replanning completo:** nuevo alcance, nueva fecha, nuevo presupuesto
- **Continuar con alcance reducido:** entregar un MVP o fase reducida en la fecha original
- **Pausar y replantear:** congelar el proyecto mientras se replantea la estrategia
- **Cancelar:** si el valor de negocio ya no justifica la inversión

---

## Fase 3 — Construcción del plan de rescate (3-5 días)

### 3.1 — Nuevo alcance

Con el cliente y el sponsor, definir:
- ¿Qué funcionalidades son absolutamente necesarias para el valor de negocio? (Must have)
- ¿Qué funcionalidades pueden posponerse a una Fase 2? (Should/Could/Won't)
- Validar que el alcance reducido sigue siendo viable y valioso

### 3.2 — Nueva estimación

Reestimar desde cero con el equipo técnico:
- No usar las estimaciones originales que fallaron
- Usar Three-Point Estimation (PERT)
- Agregar buffer de contingencia explícito (no escondido)
- Ser conservadores: presentar el escenario realista, no el optimista

### 3.3 — Plan de recursos

- ¿El equipo actual es suficiente?
- ¿Se necesita incorporar nuevos perfiles?
- ¿Hay que liberar alguien que no está funcionando?
- ¿Se requiere apoyo externo (consultora, freelance, otro equipo)?

### 3.4 — Nueva baseline

Documento formal con:
- Nuevo alcance aprobado
- Nueva fecha de entrega
- Nuevo presupuesto autorizado
- Puntos de control cada 2 semanas
- Criterios de cancelación (si se vuelve a deteriorar)

---

## Fase 4 — Ejecución bajo régimen de recuperación

**Cambios en el modo de operación:**
- Seguimiento diario (no semanal) durante las primeras 4 semanas
- Revisión de SPI/CPI cada 3 días
- Point of no return definido: si para [fecha] no se alcanza SPI >= 0.85, escalar de nuevo
- PM con presencia más activa en el equipo (no solo reportes)

**Ritual de recovery:**
- Daily standup ampliado: 20-30 min con diagnóstico de bloqueos
- War room semanal: 1 hora con PM + Tech Lead para revisar el plan
- Reporte bisemanal al sponsor: estado real sin filtros

---

## Fase 5 — Comunicación del plan de rescate al cliente

Estructura de la comunicación:
1. Reconocimiento del estado real sin minimizar
2. Causa raíz explicada claramente
3. Qué cambió en el approach (cómo se previene que vuelva a pasar)
4. El nuevo plan con compromisos concretos
5. Puntos de control y transparencia de seguimiento

```
Estimado [nombre]:

Hemos completado el diagnóstico del estado del proyecto [nombre] 
y queremos presentarle el Plan de Recuperación formal.

SITUACIÓN ACTUAL
[Datos directos: atraso, sobrecosto, causas]

PLAN DE RECUPERACIÓN
[Resumen del nuevo alcance, fecha y presupuesto]

COMPROMISOS
[Lista de hitos del plan de rescate con fechas concretas]

CONTROLES
Realizaremos un reporte bisemanal y le solicitamos mantener 
los canales de comunicación activos para agilizar decisiones.

[Firma PM]
```

---

## Actualizar archivos

- `data/cronograma.md` — nueva baseline
- `data/presupuesto.md` — presupuesto autorizado actualizado
- `data/alcance-detallado.md` — nuevo alcance aprobado
- `data/backlog.md` — backlog repriorizado
- `metrics/dashboard.md` — actualizar con nueva baseline
- `memory/historial.md` — registrar el evento de recuperación
- `memory/decisiones.md` — decisiones del plan de rescate

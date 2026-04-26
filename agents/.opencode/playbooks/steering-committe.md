# PLAYBOOK: Steering Committee

## Activación

Se activa antes de cada sesión del Comité Directivo o Steering Committee del proyecto. Guía la preparación, facilitación y seguimiento de las reuniones de gobernanza de mayor nivel.

**Cuándo activar:**
- 48-72 horas antes de una sesión programada del comité
- Cuando se requiere convocar un comité extraordinario por situación crítica
- Para hacer seguimiento de compromisos asumidos en el comité anterior

---

## Principio PMBOK 8 aplicado

Dominio: Interesados + Planificación + Medición
Principio: Comprometerse efectivamente con los interesados | Demostrar liderazgo | Enfocarse en el valor

---

## Propósito del Steering Committee

El comité directivo es el máximo órgano de gobernanza del proyecto. Sus funciones:
- Tomar decisiones estratégicas que el PM no puede tomar solo
- Autorizar cambios mayores de alcance, costo o tiempo
- Resolver conflictos entre stakeholders de alto nivel
- Proveer dirección estratégica y remover obstáculos ejecutivos
- Validar que el proyecto sigue alineado con los objetivos de negocio

---

## Preparación (48-72h antes)

### 1. Recopilar información

```
context/proyecto-base.md
metrics/dashboard.md (completo)
metrics/cronograma.md
metrics/financiero.md
memory/compromisos.md (compromisos del comité anterior)
memory/decisiones.md
memory/riesgo.md
data/cambios.md (CRs pendientes)
```

### 2. Revisar compromisos del comité anterior

Verificar cada compromiso asumido en la última sesión:
- ¿Cumplido? → Presentar evidencia
- ¿Pendiente con justificación? → Presentar causa y nueva fecha
- ¿Vencido sin resolución? → Presentar con plan de resolución urgente

### 3. Identificar decisiones para el comité

Clasificar lo que necesita decisión ejecutiva:
- **Decisiones de alcance:** cambios mayores a aprobar
- **Decisiones de presupuesto:** recursos adicionales, reestimaciones
- **Decisiones de tiempo:** extensiones de fecha
- **Decisiones de prioridad:** qué entra y qué sale si hay restricción
- **Decisiones de riesgo:** respuestas a riesgos críticos que requieren autorización

### 4. Preparar el material

Máximo 10-15 slides / secciones. El comité no lee documentos largos.

Estructura estándar:
```
1. Semáforo general y resumen ejecutivo (1 página)
2. Logros del período (lista concisa)
3. Métricas clave con tendencia (tabla)
4. Estado de hitos (tabla simple)
5. Top riesgos (tabla)
6. Compromisos del comité anterior — estado
7. Decisiones requeridas hoy (una por slide/sección)
8. Compromisos para el próximo período
9. Próxima sesión propuesta
```

### 5. Enviar pre-read 24h antes

```
Asunto: [PRE-READ] Comité Directivo [Proyecto] — [Fecha]
Material adjunto para revisión previa.
Puntos principales de agenda: [lista de 3-5 puntos]
Decisiones que se tomarán: [lista]
Por favor confirmar asistencia: [fecha límite]
```

---

## Durante el comité

### Protocolo de facilitación:

**Inicio (5 minutos):**
- Confirmar quórum (quién tiene autoridad para tomar decisiones)
- Revisar y aprobar agenda
- Asignar documentador (quien levanta el acta)

**Presentación del estado (10-15 minutos):**
- PM presenta, no lee — el comité ya leyó el pre-read
- Enfocarse en lo nuevo, lo crítico y lo que necesita decisión
- Semáforo al inicio con justificación directa

**Revisión de compromisos anteriores (5 minutos):**
- Recorrer la tabla de compromisos del acta anterior
- Sin excusas largas — solo estado y acción

**Decisiones (15-20 minutos):**
- Una decisión a la vez
- PM presenta: contexto → opciones → recomendación
- El comité decide, el documentador registra
- Si no hay consenso: definir quién desempata y cuándo

**Compromisos (5 minutos):**
- Confirmar cada compromiso: qué, quién, cuándo
- El documentador lee la lista antes de cerrar

**Cierre (5 minutos):**
- Próxima fecha de comité
- Información que el comité necesita antes de la próxima sesión

---

## Post-comité (dentro de las 24 horas)

### 1. Enviar acta formal

```
ACTA — COMITÉ DIRECTIVO — [PROYECTO]
Fecha: [fecha] | Hora: [hora] | Lugar/Plataforma: [X]
Asistentes: [lista con nombres y roles]

DECISIONES TOMADAS
| # | Decisión | Tomada por | Impacto |
|---|---|---|---|

COMPROMISOS ASUMIDOS
| Compromiso | Responsable | Fecha límite |
|---|---|---|

TEMAS DIFERIDOS
| Tema | Razón | Próximo comité |
|---|---|---|

PRÓXIMA REUNIÓN: [fecha]
```

### 2. Actualizar archivos

- `memory/decisiones.md` — decisiones registradas
- `memory/compromisos.md` — compromisos actualizados
- `memory/historial.md` — sesión del comité registrada
- `data/cambios.md` — CRs aprobadas o rechazadas
- `data/cronograma.md` — si se aprobaron cambios de fecha
- `data/presupuesto.md` — si se aprobaron cambios de presupuesto

---

## Convocatoria de comité extraordinario

Se convoca cuando:
- El semáforo lleva 2 semanas en ROJO sin mejora
- Riesgo crítico que requiere decisión ejecutiva urgente
- Cambio de alcance mayor que no puede esperar el comité ordinario
- Conflicto entre stakeholders que paraliza el proyecto

Proceso de convocatoria:
1. Contacto directo con el sponsor (llamada)
2. Email formal con justificación de urgencia
3. Propuesta de fecha en las próximas 48-72 horas
4. Material preparado en < 24 horas

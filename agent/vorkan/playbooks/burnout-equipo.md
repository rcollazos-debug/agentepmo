# PLAYBOOK: Burnout de Equipo

## Activador

Una o más de estas señales sostenidas por > 2 sprints:

- Velocidad cae > 20% sin causa técnica identificable
- Defectos suben > 30% sobre la media histórica
- Personas reportan agotamiento en 1-on-1s
- Aumento en ausentismo (PTO no planificado, days-off)
- Disminución en participación en ceremonies (camera off, silencio)
- Comentarios en retros sobre "carga insostenible", "no doy más", "estoy quemado"
- Quejas sobre "trabajamos hasta tarde todas las semanas"
- Cliente nota "no hay la energía de antes"

---

## Severidad

🔴 **Alta** — el burnout es uno de los riesgos más caros para un proyecto:
- Calidad colapsa
- Personas pueden renunciar (pérdida de conocimiento)
- Difícil de revertir si se ignora

---

## Protocolo de Respuesta

### Paso 1 — Confirmar el diagnóstico (no asumir)

No decir "el equipo está en burnout" sin evidencia. Validar:

```
☑️  Hablar 1-on-1 con cada miembro del equipo en los próximos 5 días hábiles
   (Activar /1on1 con cada persona)

Preguntas guía:
  - "¿Cómo te sientes con la carga actual?"
  - "¿Cuántas horas extra estás trabajando por semana?"
  - "¿Cuándo fue tu último día completo de descanso?"
  - "¿Hay algo del proyecto que te preocupa o frustra?"
```

Recopilar respuestas en `{project_path}/memory/1on1s/` (confidencial).

### Paso 2 — Cuantificar el problema

Métricas a recopilar:
- Horas extras promedio por persona en último mes
- Tasa de defectos antes vs ahora
- Velocidad antes vs ahora
- Compromisos vencidos

### Paso 3 — Acciones inmediatas (próximas 48h)

Sin esperar al sprint siguiente:

```
✅ ACCIONES INMEDIATAS:

1. Revisar el sprint actual:
   - Identificar historias que se pueden descopear/diferir SIN afectar entregable crítico
   - Liberar 30-40% de capacity de la persona más afectada

2. Comunicación al equipo:
   - Reconocer públicamente el sobreesfuerzo
   - Anunciar: no se aceptan compromisos nuevos hasta evaluar la situación
   - Reforzar: "no se trabaja tarde sin justificación, no se trabaja en findes"

3. Proteger del cliente:
   - Pausar (educadamente) cualquier solicitud nueva del cliente por 1 semana
   - Mensaje al cliente: "necesitamos consolidar para mantener calidad"
```

### Paso 4 — Plan de recuperación (próximas 2-4 semanas)

```
📋 PLAN DE RECUPERACIÓN:

SEMANA 1 — Aliviar
  - Reducir compromiso del próximo sprint a 70-80% de velocidad histórica
  - Día sin reuniones (deep work day) por persona
  - Permitir flex hours / días remotos adicionales

SEMANA 2 — Estabilizar
  - Sprint con velocidad ajustada
  - Retro especial para identificar causas raíz del burnout
  - Eliminar 2-3 fuentes de estrés identificadas

SEMANA 3-4 — Reconstruir
  - Recuperar velocidad gradualmente
  - Revisar si la deuda técnica acumulada contribuyó al burnout
  - Activar /capacity-planning para ajustar plan futuro

OPCIONAL — si el burnout es severo:
  - Día completo de descanso para el equipo (festivo interno)
  - Team building / desconexión total
  - Negociar con cliente extender el plazo si es necesario
```

### Paso 5 — Causa raíz (analizar para prevenir recurrencia)

Identificar de dónde vino:

| Causa potencial | Síntoma | Solución |
|---|---|---|
| Compromisos demasiado optimistas | Sprints que siempre terminan al 110% | Aplicar /capacity-planning con margen de seguridad |
| Cliente exigente con cambios continuos | CRs constantes sin negociación | Activar `negociacion-cambios` y educar al cliente |
| Deuda técnica que ralentiza | Esfuerzo extra para tareas simples | Activar skill `deuda-tecnica` |
| Persona faltante en rol crítico | Otros cubren su trabajo | Reasignar / contratar / ajustar alcance |
| Falta de claridad de prioridades | Equipo trabajando en 5 cosas a la vez | PM debe priorizar más estricto |
| Liderazgo del PM ausente o errático | Equipo sin dirección clara | Self-reflection del PM, posible coaching |

### Paso 6 — Comunicación con el cliente

**Si el burnout afecta entregables del cliente:**

Mensaje (ajustar tono):
```
{cliente},

Te escribo con transparencia para informarte que en las últimas semanas
hemos detectado señales de sobrecarga en el equipo del proyecto {nombre}.
Como PM, mi prioridad es mantener tanto la calidad de las entregas como
el bienestar del equipo que las hace posibles.

Voy a tomar las siguientes acciones en las próximas 2 semanas:
  • {ajuste 1 — ej. reducir velocidad del próximo sprint en 20%}
  • {ajuste 2}

Estimamos que esto puede generar un impacto leve de {N días} en {hito}.
Confío en que tu apoyo nos permitirá entregar con la calidad que esperas.

Quedo a tu disposición para discutirlo.

{PM}
```

### Paso 7 — Escalación a Gerente PMO

Si las acciones no estabilizan en 2-3 semanas:
- Activar `/escalar` nivel L2
- Considerar refuerzo del equipo (contratación temporal, redistribución)
- Evaluar si el problema es estructural del proyecto

---

## Métricas de éxito de la respuesta

| Métrica | Antes | Objetivo a 4 semanas |
|---|---|---|
| Velocidad | {bajada actual} | Recuperación al 90%+ |
| Defectos | {nivel alto} | Reducción al baseline |
| Horas extras / persona | {X h/semana} | < 3 h/semana |
| Sentiment en retros | 🔴/🟠 | 🟡 al menos |
| Compromisos vencidos | {N} | < 2 |

---

## Lo que NO se debe hacer

- ❌ Ignorar las señales hasta que alguien renuncie
- ❌ Echar la culpa al equipo o a una persona específica
- ❌ "Hagamos un team building del viernes" como única acción
- ❌ Pedir más esfuerzo "por una semana más" — eso lo empeora
- ❌ Esconder el problema al cliente / sponsor — la transparencia gana confianza
- ❌ Auto-flagelación del PM en lugar de actuar

---

## Registro

Toda activación de este playbook debe registrar en `memory/historial.md`:

```
[fecha] BURNOUT_DETECTADO — Equipo de {project_name}
  Severidad: {alta/media}
  Acciones inmediatas tomadas: {N}
  Plan de recuperación: 4 semanas
  Comunicación con cliente: {sí/no}
  Escalación: {nivel}
```

Y agregar al `memory/lecciones.md`:
```
[fecha] LECCIÓN — Detectar burnout antes implica monitorear horas extras y sentimiento mensualmente
```

---

## Activadores

Este playbook se activa típicamente desde los siguientes comandos:
- `/retro`
- `/1on1`
- `/escalar`

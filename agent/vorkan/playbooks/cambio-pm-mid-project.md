# PLAYBOOK: Cambio de PM Mid-Project

## Activador

- El PM saliente decide salir / es asignado a otro proyecto
- VortexBird decide reasignar el PM
- El cliente solicita cambio de PM (escenario distinto, ver `perdida-confianza-cliente`)
- Cambios organizacionales que rotan al PM
- Promoción / cambio de rol del PM actual

---

## Severidad

🟠 **Alta** — un cambio de PM mal gestionado:
- Pierde 30-50% del contexto del proyecto
- Genera ansiedad en el equipo
- El cliente puede percibir falta de continuidad
- Se reabren decisiones que ya estaban cerradas

---

## Protocolo de Respuesta

Este playbook tiene tres roles:
- **PM saliente** (responsable de transferir)
- **PM entrante** (responsable de recibir activamente)
- **Gerente PMO VortexBird** (responsable de orquestar)

---

### Paso 1 — Decisión y comunicación interna (Día 1-3)

**El Gerente PMO:**
- Confirma fecha del cambio (mínimo 2 semanas de transición)
- Asigna el PM entrante
- Comunica al PM saliente y entrante

**Comunicación al equipo VortexBird:**
- En reunión, no por mensaje
- Mensaje: cambio de PM por {razón profesional, no personal}
- Reforzar: "el proyecto continúa, el equipo sigue, los compromisos también"

---

### Paso 2 — Comunicación al cliente (Día 3-5)

**Antes de comunicar al cliente:**
- Confirmar la transición es definitiva
- Preparar mensaje conjunto Gerente PMO + PM saliente

**Llamada al cliente** (NO email):
```
Estructura sugerida:
  1. Saluda + agradece tiempo (1 min)
  2. Anuncia el cambio + razón (3 min)
  3. Presenta al PM entrante con credenciales relevantes (3 min)
  4. Reafirma compromisos del proyecto (2 min)
  5. Plan de transición de 2 semanas (3 min)
  6. Espacio para preguntas (5 min)
  7. Cierre con confianza (2 min)

Total: ~20 minutos
```

**Email de seguimiento (mismo día):**
```
Asunto: Cambio de Project Manager — {project_name}

{nombre cliente},

Como conversamos hoy, te confirmo formalmente el cambio de Project Manager
del proyecto {project_name}:

PM SALIENTE: {nombre}
NUEVO PM: {nombre} — {credenciales relevantes en 1 línea}

PLAN DE TRANSICIÓN:
  • Próximas 2 semanas: ambos PMs en copia de comunicaciones
  • Reunión de presentación con tu equipo: {fecha sugerida}
  • Handover formal: {fecha}

Lo que NO cambia:
  • Compromisos del proyecto (cronograma, alcance, presupuesto)
  • Equipo técnico ({Tech Lead}, devs)
  • Plataformas y procesos que ya conoces

Lo que SÍ cambiará:
  • Tu interlocutor principal
  • Estilo de comunicación (cada PM tiene el suyo)

Estoy comprometida personalmente con que esta transición sea suave para ti.

Quedo disponible para cualquier inquietud.

{Gerente PMO} | VortexBird
```

---

### Paso 3 — Handover técnico (Días 5-12)

**Documentos críticos a transferir** (creados/actualizados por PM saliente):

```
✅ ACTUALIZAR / VALIDAR:
  - context/proyecto-base.md           ← Estado actual completo
  - context/stakeholders.md             ← Mapa de relaciones con notas privadas
  - data/cronograma.md                  ← Estado actual del plan
  - metrics/dashboard.md                 ← KPIs al día
  - risks/risk-register.md              ← Riesgos activos con respuestas
  - memory/historial.md                  ← Últimos 60 días en orden cronológico
  - memory/compromisos.md               ← Todos los pendientes
  - memory/decisiones.md                ← Decisiones críticas con fundamento

✅ CREAR ESPECÍFICAMENTE PARA HANDOVER:
  - memory/handover-{fecha}.md           ← Documento de transición
```

**Estructura de `handover-{fecha}.md`:**

```markdown
# Handover — {project_name}

**De:** {PM saliente}
**A:** {PM entrante}
**Fecha:** {YYYY-MM-DD}

## Estado del Proyecto en 1 Página
- Fase actual: {fase}
- Semáforo: 🟢/🟡/🔴
- Próximo hito: {hito} en {N días}
- Salud financiera: Margen {X}%, CPI {Y}
- Salud relación cliente: {alta/media/baja}

## Top 3 Cosas Críticas que Saber
1. {cosa más importante}
2. ...
3. ...

## Stakeholders Clave (Quiénes son y cómo tratarlos)
| Persona | Cómo es | Sensibilidades | Qué evitar |
|---|---|---|---|
| {nombre} | {personalidad} | {temas delicados} | {qué no hacer} |

## Decisiones Recientes Importantes
- {decisión}: {por qué se tomó}

## Compromisos Vivos (lo que el cliente espera)
- {compromiso} — para {fecha} — riesgo de no cumplir: {alto/medio/bajo}

## Equipo: Lo que el PM nuevo debe saber
| Persona | Fortalezas | Áreas a apoyar | Estado actual |
|---|---|---|---|
| {nombre} | {} | {} | {motivado / cansado / indeciso} |

## Conflictos / Tensiones Activas
- {situación}: {contexto y estado}

## Lo que YO haría diferente si volviera a empezar
- {lección aprendida 1}
- {lección aprendida 2}

## Compromisos del PM Saliente (que aún no he cumplido)
- {compromiso pendiente}

## Lo que el PM Entrante NO Debe Hacer en los Primeros 30 Días
- ❌ Cambiar procesos del equipo de golpe
- ❌ Renegociar compromisos con cliente
- ❌ Tomar decisiones técnicas sin consultar Tech Lead
```

---

### Paso 4 — Reuniones de transición (durante 2 semanas)

| Reunión | Cuándo | Asistentes | Duración |
|---|---|---|---|
| Handover técnico inicial | Día 5 | PM sal + PM ent | 2h |
| Walkthrough de archivos | Día 6-7 | PM sal + PM ent | 1h por carpeta |
| Presentación al equipo VB | Día 7 | Equipo + PM ent + PM sal | 30 min |
| Presentación al cliente | Día 10 | Cliente + PM ent + PM sal | 1h |
| Sombra en daily | Días 8-12 | PM ent observa, PM sal facilita | 15 min |
| Conducción acompañada | Días 13-14 | PM ent facilita, PM sal apoya | 15 min |
| Sesión de cierre handover | Día 14 | PM sal + PM ent + Gerente PMO | 1h |

---

### Paso 5 — Primer mes del PM entrante

**Semana 1: Observación**
- No cambiar nada
- Asistir a todas las ceremonies
- 1-on-1 con cada miembro del equipo
- Llamada con cliente solo (sin PM saliente)

**Semana 2-3: Aprendizaje activo**
- Empezar a tomar decisiones operativas
- Mantener procesos existentes
- Revisar métricas y entender tendencias

**Semana 4: Pequeños ajustes**
- Si algo no funciona, proponer cambios al equipo (no imponer)
- Empezar a poner "su sello" gradualmente
- Establecer la cadencia de comunicación con cliente

**No hacer en el primer mes:**
- ❌ Cambiar metodología
- ❌ Renegociar el contrato
- ❌ Cambiar tools del equipo
- ❌ Reasignar personas
- ❌ Hacer promesas grandes al cliente sin validar con equipo

---

### Paso 6 — Validación de la transición

A las 4 semanas, el Gerente PMO hace check-in:

| Aspecto | Verde | Amarillo | Rojo |
|---|---|---|---|
| Cliente reporta confianza con nuevo PM | "todo bien" | "ajustándome" | "no funciona" |
| Equipo reporta calidad de management | sostenida o mejor | similar | peor |
| Métricas del proyecto | estables | leve dip | dip claro |
| PM entrante reporta sentirse en control | sí | parcial | no |

Si hay 🔴 en alguno → reforzar (más coaching, más tiempo PM saliente, etc.)

---

## Lo que NO se debe hacer

- ❌ Cambio sin transición ("desde mañana es Pedro")
- ❌ PM saliente desentendiéndose en cuanto se comunica el cambio
- ❌ Cliente se entera por terceros
- ❌ No documentar el handover
- ❌ Cambios drásticos del PM entrante en su primera semana
- ❌ Hablar mal del PM saliente (al cliente o al equipo)
- ❌ Dejar al cliente sin contacto durante la transición

---

## Registro

```
[fecha inicio] CAMBIO_PM — {project_name}
  PM saliente: {nombre}
  PM entrante: {nombre}
  Razón: {profesional}
  Plan de transición: 2 semanas
  Handover doc: memory/handover-{fecha}.md

[fecha fin] CAMBIO_PM_COMPLETADO — Validación: {🟢/🟡/🔴}
```

Y agregar a `memory/lecciones.md` lo aprendido del proceso para futuras transiciones.

---

## Activadores

Este playbook se activa típicamente desde los siguientes comandos:
- `/escalar`
- `/comunica`

# PLAYBOOK: Conflicto Interno en el Equipo

## Activador

- Tensión persistente entre 2+ miembros del equipo
- Quejas mutuas en 1-on-1s del PM
- Comunicación pasivo-agresiva en chats / emails / dailies
- Code reviews que se convierten en conflictos
- "Es problema de QA / es problema de Dev" como respuesta recurrente
- Personas evitando colaborar entre sí
- Disminución de la confianza en el equipo
- Comentarios negativos cruzados en retros

---

## Severidad

🟠 **Alta** — el conflicto sin tratar:
- Reduce velocidad por silos
- Aumenta defectos por falta de colaboración
- Puede escalar a renuncias
- Daña la cultura del equipo

---

## Protocolo de Respuesta

### Paso 1 — Identificar tipo de conflicto

| Tipo | Características | Tratamiento |
|---|---|---|
| **Técnico** | Diferentes opiniones sobre arquitectura/diseño | Facilitar decisión, documentar trade-offs |
| **De rol** | Confusión sobre quién hace qué | Clarificar responsabilidades (RACI) |
| **De estilo** | Personalidades / formas de trabajo distintas | Mediar, establecer normas de equipo |
| **De ego** | Lucha de poder, "yo sé más que tú" | Conversación directa con ambos |
| **Histórico** | Resentimiento acumulado por eventos pasados | Sesión 1-on-1 + posible mediación |
| **Ético** | Una persona percibe comportamiento incorrecto | Investigar con cuidado, posible RRHH |

---

### Paso 2 — Recopilar evidencia (sin tomar partido)

Antes de actuar, recoger información objetiva:

```
✅ HACER:
  - 1-on-1 con cada parte involucrada (separadamente)
  - Revisar últimos chats / emails / PR comments
  - Pedir versión específica de eventos: "qué pasó, cuándo, dónde"
  - Verificar con un tercero observador si hay

❌ NO HACER:
  - Decidir quién tiene razón antes de escuchar a ambos
  - Asumir que es "todo culpa de X"
  - Compartir lo que dijo una parte con la otra sin permiso
  - Ignorar pensando "ya se les pasará"
```

---

### Paso 3 — Conversación 1-on-1 con cada parte

**Estructura sugerida (30 min cada uno):**

```
1. CHECK-IN (5 min)
   "¿Cómo estás hoy? Te agradezco que vengas a hablar de esto."

2. ESCUCHA (15 min)
   "Cuéntame, desde tu perspectiva, qué está pasando con {otra persona}."
   "¿Cuándo empezó? ¿Cuál fue el momento más tenso?"
   "¿Qué necesitas para poder trabajar mejor?"

3. RECONOCIMIENTO (5 min)
   "Entiendo que estás sintiendo {emoción}. Es válido."
   "Voy a hablar también con {otra persona} y luego volvemos."

4. EXPECTATIVA (5 min)
   "Mi rol es facilitar que el equipo trabaje. Mi propuesta es:
    - Hablar con la otra persona
    - Si ambos están abiertos, una conversación facilitada
    - Llegar a un acuerdo de cómo seguir"
```

Registrar en notas confidenciales (no públicas).

---

### Paso 4 — Decidir si mediar

| Situación | Acción |
|---|---|
| Conflicto técnico simple | Decisión del Tech Lead + documentar el ADR |
| Conflicto de estilo, ambos receptivos | Mediar en conversación de equipo |
| Una parte no quiere conversar | No forzar; coaching individual |
| Conflicto fuera de control / personal | Escalar a Gerente PMO o RRHH |
| Sospecha de comportamiento inapropiado | Inmediato a RRHH; el PM no investiga |

---

### Paso 5 — Sesión de mediación (si aplica)

**Antes:**
- Confirmar con ambas partes que están dispuestas
- Acordar reglas básicas: respeto, escucha, sin interrumpir, confidencialidad

**Durante (60 min máx):**
```
1. APERTURA (5 min)
   - PM facilita: "Estamos aquí para encontrar una forma de seguir trabajando juntos"
   - Reglas básicas

2. CADA UNO COMPARTE (10 min cada uno)
   - Persona A: "Desde mi perspectiva, lo que pasa es..."
   - Persona B: "Desde mi perspectiva, lo que pasa es..."

3. PUNTOS COMUNES (10 min)
   - PM: "Veo que ambos comparten la preocupación por X y Y"
   - Validar si ambos están de acuerdo en lo que importa

4. NEGOCIACIÓN (15 min)
   - "¿Qué necesita cada uno del otro para trabajar bien?"
   - Acuerdos concretos, observables, medibles

5. CIERRE (10 min)
   - Documentar los acuerdos
   - Acordar revisión en 2 semanas
```

**Después:**
- Documentar acuerdos por escrito (con copia a ambos)
- Programar revisión a las 2 semanas
- No volver a sacar el tema en público

---

### Paso 6 — Acuerdos típicos (ejemplos)

```
ACUERDO ENTRE {Persona A} y {Persona B}:

1. Comunicación
   - PR comments: tono profesional, foco en el código no en la persona
   - Si hay desacuerdo > 2 rounds en un PR → llamar a la otra persona

2. Decisiones técnicas
   - Si ambos disienten → Tech Lead decide y documenta ADR
   - El acuerdo se cumple aunque no sea tu preferencia personal

3. Trabajo conjunto
   - Pair programming en {tarea X} para reconstruir colaboración
   - Daily handoff en standup, no por chat

4. Revisión
   - El PM hace check-in con cada uno en 2 semanas
   - Si hay nueva tensión, hablan directo (sin pasar por el PM primero)
```

---

### Paso 7 — Acciones del PM post-mediación

```
SEMANA 1-2:
  - Observar interacciones en daily, PRs, chat
  - 1-on-1 ligero con cada uno: "¿cómo va?"

SEMANA 3-4:
  - Si los acuerdos se cumplen → reforzar positivo
  - Si los acuerdos se rompen → segunda conversación con consecuencias
```

---

### Paso 8 — Cuándo escalar a RRHH / Gerente PMO

Escalar inmediatamente si:
- Hay acoso, discriminación o comportamiento ético cuestionable
- Una persona se rehúsa a participar en buena fe
- El conflicto involucra a alguien con autoridad sobre la otra
- La mediación falla y la situación se deteriora
- Hay riesgo de que alguien renuncie

---

## Lo que NO se debe hacer

- ❌ Ignorar el conflicto esperando que se resuelva solo
- ❌ Tomar partido públicamente
- ❌ Forzar a las partes a "ser amigos"
- ❌ Compartir lo que dijo una parte sin permiso
- ❌ Hacer pública la mediación si fue privada
- ❌ Pretender ser psicólogo / coach especializado
- ❌ Asumir que "todo esto es por estrés" sin escuchar

---

## Registro

```
[fecha] CONFLICTO_INTERNO — Detectado entre {anonimizar si aplica}
  Tipo: {técnico/rol/estilo/ego/histórico/ético}
  Acciones: {1-on-1 a ambos / mediación / escalación a RRHH}
  Acuerdos: {documentados separadamente con permiso}
  Próxima revisión: {fecha}
```

---

## Métricas de éxito

| Métrica | Indicador de mejora |
|---|---|
| Tono en PR reviews | Profesional sostenido |
| Participación en dailies | Ambas personas activas |
| Compromisos cumplidos en sprint | Sin bloqueos atribuibles a tensión |
| Sentiment en retros | Sin menciones negativas cruzadas |
| Quejas en 1-on-1s | Disminución progresiva |

---

## Activadores

Este playbook se activa típicamente desde los siguientes comandos:
- `/1on1`
- `/retro`
- `/escalar`

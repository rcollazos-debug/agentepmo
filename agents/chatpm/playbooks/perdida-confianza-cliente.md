# PLAYBOOK: Pérdida de Confianza del Cliente

## Activador

Una o más de estas señales sostenidas:

- Cliente cuestiona decisiones que antes aceptaba
- Aparición frecuente de superiores del cliente en CC
- Cliente pide "explicación detallada" de cosas operativas
- Comentarios tipo "no nos sentimos escuchados", "esperábamos otra cosa"
- Solicitud de cambio de PM por parte del cliente
- Sponsor del cliente se involucra en operaciones de día a día
- Email Intelligence detecta score < 60/100
- Cliente pidiendo evaluar "alternativas" o "auditorías externas"
- Atrasos en pagos como respuesta indirecta
- Frase: "no sé si esto va a funcionar"

---

## Severidad

🔴 **Crítica** — pérdida de confianza es difícil de recuperar:
- Si no se actúa: alta probabilidad de cancelación o no-renovación
- Daño a reputación VortexBird con ese cliente y referidos
- Riesgo financiero directo

---

## Protocolo de Respuesta

### Paso 1 — Confirmar el diagnóstico (24-48h)

No actuar por instinto. Validar con datos:

```
✅ HACER ANTES DE ACTUAR:

1. Activar /email-intelligence sobre últimos 60 días
   → Score de salud + señales detectadas

2. Revisar memory/historial.md últimos 90 días
   → ¿Qué eventos pueden haber generado la pérdida?

3. Revisar metrics/dashboard.md
   → ¿Hubo incumplimientos objetivos? (atrasos, defectos, etc.)

4. Llamar al cliente — sin agenda formal
   "Te llamo solo para chequear cómo te sientes con el proyecto.
    No tengo agenda — quería tomar el pulso."
```

---

### Paso 2 — Diagnóstico de causa raíz

Categorías típicas:

| Causa | Signos | Recuperación |
|---|---|---|
| **Incumplimientos objetivos** | Atrasos, defectos, hitos rotos | Mostrar plan concreto + cumplir 3 sprints seguidos |
| **Falta de comunicación** | Cliente sorprendido por cosas que el equipo sabía | Aumentar cadencia + transparencia proactiva |
| **Expectativas no alineadas** | "yo pensé que iba a hacer X" | Re-alinear alcance + documentar formalmente |
| **Cambio en el lado cliente** | Nuevo sponsor, cambio organizacional | Re-conquistar la relación con nuevo decisor |
| **PM con baja química** | Personalidades distintas | Considerar `/cambio-pm-mid-project` |
| **Crisis externa al proyecto** | Industria, competidores, presupuesto | Apoyar al cliente en su contexto, no solo en el proyecto |
| **Comparación con competidor** | "fulano nos ofrece más por menos" | Defender valor con datos + considerar ajustes |

---

### Paso 3 — Reunión cara a cara con el cliente (1 semana)

**No por email. No por chat. Llamada o presencial.**

**Estructura sugerida (60 min):**

```
1. APERTURA SIN DEFENSIVA (5 min)
   "Te agradezco el tiempo. Sé que las cosas no van como
    quisiéramos, y quiero entender mejor desde tu perspectiva."

2. ESCUCHA ACTIVA (20 min)
   "Cuéntame qué ha pasado desde tu lado.
    ¿Cuándo empezaste a sentir que algo no estaba funcionando?
    ¿Qué momentos específicos te marcaron?"

   Tomar notas. NO interrumpir. NO defenderse aún.

3. CONFIRMACIÓN DE ENTENDIMIENTO (5 min)
   "Para asegurarme que te entiendo:
    - Lo más crítico para ti es {X}
    - Te molesta especialmente que {Y}
    - Esperabas {Z}
    ¿Es correcto?"

4. RECONOCIMIENTO (5 min)
   "Tienes razón en {parte donde el cliente tiene razón}.
    Es un error nuestro y voy a tomar acción."
   (Si NO hay error: "Entiendo cómo se vio desde tu lado")

5. CONTEXTO (5 min)
   "Quiero compartirte el contexto desde nuestro lado, no para
    excusarnos, sino para alinearnos."
   (Datos objetivos, no excusas)

6. PROPUESTA (15 min)
   "Te propongo lo siguiente:
    - Acción 1 — para resolver {X}
    - Acción 2 — para prevenir que {Y}
    - Acción 3 — para que volvamos a estar alineados"

   Pedir feedback: "¿esto te suena? ¿qué le falta?"

7. CIERRE CON COMPROMISO (5 min)
   "Mi compromiso personal contigo es {acción concreta y medible}.
    En 30 días vamos a ver si esto está funcionando, y si no,
    haremos los ajustes que sean necesarios."
```

---

### Paso 4 — Plan de Recuperación de Confianza (30-60-90)

**Días 1-30: Demostración**
```
✅ ACCIONES VISIBLES Y MEDIBLES:

1. Cumplir todos los compromisos a tiempo (cero excepciones)
2. Aumentar cadencia de comunicación (sin saturar)
3. Reportes proactivos antes de que el cliente pregunte
4. Sentar a {persona técnica VB} en una reunión con el cliente
   para que vea el rigor del equipo
5. Eliminar UNA fricción operativa identificada en la reunión
```

**Días 31-60: Consolidación**
```
✅ ACCIONES PARA VOLVER A LA NORMALIDAD:

1. Mantener cumplimiento del mes 1
2. Entregar UN beneficio inesperado al cliente (algo no comprometido)
3. Sesión de feedback formal: "¿cómo vamos?"
4. Ajustar lo que el cliente reporte como aún incómodo
```

**Días 61-90: Reconquista**
```
✅ ACCIONES PARA SOLIDIFICAR:

1. Cliente reporta confianza restaurada
2. Métricas del proyecto sostenidas en verde
3. Posible expansión / nuevo proyecto / referido
4. Lección aprendida documentada
```

---

### Paso 5 — Escalación interna VortexBird

Este playbook NO se ejecuta solo el PM:

| Nivel | Quién participa | Cuándo |
|---|---|---|
| **L0 — PM solo** | PM | Si la causa es operativa simple |
| **L1 — PM + Gerente PMO** | PM, Gerente PMO en CC de la primera reunión | Causa media, puede recuperarse |
| **L2 — Gerente PMO presente** | Gerente PMO acompaña al PM en la reunión cliente | Causa seria |
| **L3 — Director / Sales** | Director de VortexBird o Sales se involucra | Riesgo de cancelación o renovación |

---

### Paso 6 — Si la confianza no se recupera (60+ días)

Decisión estratégica con Gerente PMO:

**Opciones:**

a) **Cambio de PM** (activar `cambio-pm-mid-project`)
   - Si la fricción es de personas más que de proceso
   - Riesgo: cliente puede sentir que es "tirar al PM debajo del bus"

b) **Renegociación del proyecto**
   - Reducir alcance, ajustar precio, re-firmar
   - Comprar tiempo para reconstruir confianza con menos presión

c) **Cierre digno**
   - Si la relación es irrecuperable, mejor un cierre acordado
   - Entregar lo construido, transferir conocimiento, mantener buena salida
   - Mejor que esperar a que el cliente cancele unilateralmente

d) **Inversión propia de VortexBird**
   - VortexBird absorbe costo de algo no contratado para recuperar confianza
   - Solo si el cliente vale el costo (LTV alto, referido importante)

---

## Lo que NO se debe hacer

- ❌ Defender por defender ("no es nuestra culpa")
- ❌ Prometer cosas no realizables solo para calmar al cliente
- ❌ Echarle la culpa a algún miembro del equipo VB delante del cliente
- ❌ Esperar a que "se les pase"
- ❌ Mandar emails largos en lugar de hablar
- ❌ Asumir que el problema es del cliente ("son difíciles")
- ❌ Reaccionar emocionalmente — siempre profesional
- ❌ Sorprender al cliente con cancelación VortexBird (mala imagen)

---

## Registro

```
[fecha] PERDIDA_CONFIANZA_DETECTADA — {project_name}
  Score email-intelligence: {N}/100
  Causa raíz identificada: {categoría}
  Reunión cliente realizada: {fecha}
  Plan 30-60-90 activado: sí
  Escalación: {nivel}

[fecha 30 días] CHECKPOINT_30 — {🟢/🟡/🔴}
[fecha 60 días] CHECKPOINT_60 — {🟢/🟡/🔴}
[fecha 90 días] CHECKPOINT_90 — {🟢/🟡/🔴}

[fecha cierre] CONFIANZA_RECUPERADA / DECISIÓN_ESTRATÉGICA — {qué pasó}
```

---

## Métricas de éxito

| Métrica | Mes 1 | Mes 2 | Mes 3 |
|---|---|---|---|
| Email Intelligence Score | +5 pts | +15 pts | +25 pts |
| Tiempo respuesta cliente | Estable | Mejorando | Pre-crisis |
| Tono en comunicación | Neutro | Cordial | Cálido |
| Compromisos cumplidos | 100% | 100% | 100% |
| Quejas explícitas | -50% | 0 | 0 |
| Cliente menciona renovación | No | Tal vez | Sí |

---

## Activadores

Este playbook se activa típicamente desde los siguientes comandos:
- `/escalar`
- `/comunica`
- `/email-intelligence`

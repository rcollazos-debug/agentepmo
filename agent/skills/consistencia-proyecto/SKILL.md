---
name: consistencia-proyecto
description: Revisa el proyecto buscando contradicciones que ninguna sincronización puede detectar — dos riesgos que describen el mismo hecho, un semáforo que contradice al CPI, compromisos duplicados con responsables distintos. Propone correcciones con su evidencia y nunca las aplica por su cuenta.
---

# SKILL: Consistencia del Proyecto

## Propósito

Cuando varios PMs alimentan un mismo proyecto, aparecen incoherencias que ningún merge puede ver: dos personas registran el mismo riesgo con identificadores distintos, o el tablero dice VERDE mientras el CPI está por debajo del umbral. La reconciliación resuelve **choques de texto**; esto resuelve **choques de significado**.

**Regla inamovible: este skill propone, nunca corrige.** Modificar en silencio datos de un proyecto compartido destruye la confianza en el agente. Cada hallazgo se presenta con su evidencia y decide el PM.

---

## Cuándo Activar

- El PM escribe "revisa la consistencia", "¿hay algo que no cuadre?", "audita el proyecto"
- Comando `/consistencia`
- **Automático:** al iniciar sesión, si otro PM escribió en el proyecto desde tu última visita
- Antes de un comité de seguimiento, cuando los datos van a mirarse en público

---

## Protocolo de Ejecución

### Paso 1 — Leer lo necesario, no todo

| Comprobación | Archivos |
|---|---|
| Riesgos duplicados | `{project_path}/risks/risk-register.md` |
| Compromisos | `{project_path}/memory/compromisos.md` |
| Semáforo vs indicadores | `{project_path}/metrics/dashboard.md`, `{project_path}/metrics/financiero.md` |
| Cronograma vs sprint | `{project_path}/data/cronograma.md`, `{project_path}/data/sprint-actual.md` |
| Orden del historial | `{project_path}/memory/historial.md` |
| Riesgos sin plan | `{project_path}/risks/risk-register.md` |

### Paso 2 — Ejecutar las comprobaciones

**C1 · Riesgos que describen el mismo hecho**
Comparar las filas del registro por su descripción, no por su ID. Dos riesgos distintos que hablan del mismo problema — "retraso de QA" y "cuello de botella en pruebas" — son un hallazgo. Señalar ambos IDs, sus responsables y sus scores.

**C2 · Compromisos duplicados con responsables distintos**
Dos filas con el mismo compromiso y distinto responsable significan que dos personas creen que lo hace la otra. Es el hallazgo que más daño evita.

**C3 · Semáforo que contradice a los indicadores**
Contrastar el estado del tablero con los umbrales de `{{AGENT_HOME}}/vorkan/knowledge/evm-guide.md`:

| Indicador | Umbral | Estado que exige |
|---|---|---|
| CPI < 0.85 o SPI < 0.85 | 🔴 | El tablero no puede estar en VERDE ni AMARILLO |
| CPI o SPI entre 0.85 y 0.94 | 🟡 | El tablero no puede estar en VERDE |
| Margen < 30% | 🟡 como mínimo | |

**C4 · Cronograma comprometido contra sprint actual**
Fechas del sprint fuera del rango de su fase, hitos vencidos sin marcar, o una fecha de entrega que ya pasó con el proyecto abierto.

**C5 · Compromisos vencidos que siguen "Pendiente"**
Fecha límite anterior a hoy y estado distinto de Cumplido, Cancelado o Vencido.

**C6 · Riesgos con score ≥ 0.40 sin plan de respuesta**
Ya es un disparador del protocolo; aquí se detecta que además nadie lo atendió.

**C7 · Historial mal formado**
Entradas fuera de orden cronológico, sin el formato `[YYYY-MM-DD HH:MM] {SKILL} — {desc}`, o sin autor cuando vinieron de un aporte.

**C8 · Aportes sin validar envejecidos**
Aportes de otros PM marcados `sinValidar` con más de siete días. No es un error: es una cola que nadie atiende.

### Paso 3 — Presentar los hallazgos

Un hallazgo sin evidencia es una opinión. Cada uno lleva **dónde está, qué dice cada lado, y qué propones**:

```
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
REVISIÓN DE CONSISTENCIA — {project_name}
{N} hallazgos · {fecha}
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

🔴 1. El tablero dice VERDE y el CPI está en 0.78
   Evidencia:
     metrics/dashboard.md  → Semáforo: 🟢 VERDE
     metrics/financiero.md → CPI: 0.78 (umbral rojo: 0.85)
   Propongo: pasar el semáforo a 🔴 ROJO y activar el playbook de
   presupuesto crítico.

🟡 2. Dos riesgos describen el mismo hecho
   Evidencia:
     R-01 "Retraso de QA"          · Valeria · score 0.42
     R-07 "Cuello de botella en
           pruebas"                · Raúl    · score 0.36
   Propongo: conservar R-01 y cerrar R-07 remitiendo a él, o
   confirmarme que son problemas distintos.

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
¿Aplico alguna? Dime cuáles por su número.
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
```

Ordenar por severidad: 🔴 lo que contradice un dato contractual o financiero, 🟡 lo que confunde, ⬜ lo cosmético.

Si no hay hallazgos, decirlo en una línea y no inventar ninguno para justificar la revisión.

### Paso 4 — Aplicar solo lo aceptado

Cuando el PM acepte hallazgos concretos:

1. Aplicar **únicamente** los aceptados. Los demás quedan como estaban.
2. Registrar cada uno en `{project_path}/memory/historial.md` con quién lo aprobó:
   ```
   [YYYY-MM-DD HH:MM] CONSISTENCIA — R-07 cerrado por duplicidad con R-01
     Aprobado por: {correo del PM de la sesión}
     Hallazgo detectado el {fecha}
   ```
3. Si el cambio toca `data/` o `context/` y quien lo aprueba **no** es el PM titular, no aplicarlo: dejarlo como propuesta, que es lo que hace `vorkanpm publish` con la línea base.
4. Publicar es un acto aparte: recordar al PM que ejecute `vorkanpm publish` cuando termine.

---

## Reglas

1. **Nunca modificar nada sin aprobación explícita y por hallazgo.** "Arregla todo" no es aprobación suficiente: enumerar qué se va a tocar y esperar confirmación.
2. **Nunca inventar un hallazgo** para que la revisión parezca útil. Cero hallazgos es un resultado válido y bueno.
3. **Toda propuesta lleva su evidencia citada** con archivo y valor. Sin evidencia, no se reporta.
4. **No tocar la línea base si no eres el titular** — ver `{{AGENT_HOME}}/vorkan/CONVENCIONES.md`.
5. **Un hallazgo rechazado no se vuelve a proponer** en la misma sesión.

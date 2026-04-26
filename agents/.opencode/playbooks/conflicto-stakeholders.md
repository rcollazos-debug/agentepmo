# PLAYBOOK: Conflicto entre Stakeholders

## Activación

Se activa cuando dos o más interesados del proyecto tienen posiciones incompatibles que generan fricción, retrasan decisiones o ponen en riesgo la cohesión del proyecto.

**Señales de activación:**
- Dos stakeholders dan instrucciones contradictorias al equipo
- Un stakeholder bloquea o boicotea decisiones tomadas por otro
- Conflicto de intereses explícito entre áreas del cliente
- El PM está siendo usado como árbitro entre dos partes en conflicto
- Un stakeholder amenaza con escalar o cancelar el proyecto

---

## Principio PMBOK 8 aplicado

Dominio: Interesados (Stakeholder Performance Domain)
Principio: Comprometerse efectivamente con los interesados | Demostrar comportamientos de liderazgo | Crear entorno colaborativo

---

## Paso 1 — Entender el conflicto

Antes de intervenir, responder:
1. ¿Cuál es exactamente el punto de desacuerdo?
2. ¿Es un conflicto de intereses, de información, de poder o de valores?
3. ¿Cuánto tiempo lleva el conflicto sin resolverse?
4. ¿Está afectando decisiones del proyecto o la ejecución del equipo?
5. ¿Quién tiene autoridad formal para desempatar?

**Tipos de conflicto:**
- **De recursos:** ambos stakeholders quieren prioridad sobre los mismos recursos
- **De prioridad:** cada uno quiere que su feature o área sea atendida primero
- **De criterios:** desacuerdo sobre cómo medir el éxito o la calidad
- **De poder:** un área quiere controlar decisiones que corresponden a otra
- **De información:** cada parte tiene información diferente y llega a conclusiones opuestas

---

## Paso 2 — Separar las personas del problema

Principio de Harvard:
- Enfocarse en **intereses**, no en posiciones
- ¿Qué necesita realmente cada parte (interés) vs. qué está pidiendo (posición)?
- Frecuentemente los intereses son compatibles aunque las posiciones parezcan opuestas

Ejemplo:
- Posición A: "Quiero que la funcionalidad X esté en el sprint 3"
- Posición B: "No, la funcionalidad Y debe estar en el sprint 3"
- Interés A: entregar valor al área comercial antes del cierre del trimestre
- Interés B: proteger la estabilidad del sistema antes del pico de carga
- Solución posible: X en sprint 3 + refuerzo de estabilidad en sprint 3 también

---

## Paso 3 — Facilitar la resolución

### Nivel 1 — Mediación directa del PM
- Reunión individual con cada parte para escuchar
- Reunión conjunta con agenda neutral
- El PM facilita, no decide
- Buscar solución donde ambas partes ganen algo

### Nivel 2 — Escalación estructurada al sponsor
- Si en 48h no hay acuerdo y el proyecto está bloqueado
- El PM presenta el conflicto con datos, las dos posiciones, las opciones evaluadas y una recomendación
- El sponsor decide como autoridad máxima del proyecto

### Nivel 3 — Comité directivo
- Si el conflicto involucra decisiones estratégicas de negocio
- Si los dos stakeholders tienen el mismo nivel jerárquico
- Presentar en el próximo comité con estructura formal

### Nivel 4 — Intervención ejecutiva
- Si el conflicto amenaza la viabilidad del proyecto
- Si hay tensiones de poder organizacional más profundas que el proyecto no puede resolver
- El PM escala al nivel más alto disponible y deja constancia escrita

---

## Paso 4 — Comunicación durante el conflicto

Reglas para el PM:
- Nunca tomar partido públicamente
- Nunca transmitir los argumentos de una parte a la otra de forma no estructurada
- Siempre documentar las posiciones de cada parte
- Siempre comunicar el impacto del conflicto en el proyecto (tiempo, costo, moral)
- Nunca dejar que el equipo de desarrollo quede atrapado entre dos jefes con instrucciones contradictorias → el equipo solo recibe instrucciones del PM

---

## Paso 5 — Prevención de futuros conflictos

- Definir claramente el modelo de gobierno y quién toma cada tipo de decisión (Matriz RACI)
- Establecer el proceso de escalación antes de que surjan conflictos
- Tener una sola persona del cliente como interlocutor principal con autoridad
- Documentar y comunicar todas las decisiones por escrito para evitar interpretaciones divergentes

---

## Paso 6 — Actualizar archivos

- `memory/historial.md` — registrar el conflicto y cómo se resolvió
- `memory/decisiones.md` — decisión tomada para resolver el conflicto
- `context/stakeholders.md` — actualizar posición y estrategia de cada parte
- `risks/stakeholder-risks.md` — actualizar estado del riesgo de conflicto

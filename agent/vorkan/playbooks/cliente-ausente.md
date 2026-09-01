# PLAYBOOK: Cliente Ausente

## Activación

Se activa cuando el cliente o sus representantes clave dejan de responder, no asisten a reuniones o demoran sus aprobaciones de forma que bloquea el avance del proyecto.

**Señales de activación:**
- Sin respuesta a correos por más de 3 días hábiles en temas críticos
- Dos o más reuniones canceladas o sin confirmación consecutivas
- Aprobación pendiente por más de 5 días hábiles sin resolverse
- El equipo no puede avanzar por falta de decisión del cliente

---

## Principio PMBOK 8 aplicado

Dominio: Interesados (Stakeholder Performance Domain)
Principio: Comprometerse efectivamente con los interesados | Demostrar comportamientos de liderazgo

---

## Paso 1 — Documentar la situación

Registrar en `memory/historial.md`:
- Fecha y tipo de cada intento de contacto fallido
- Temas bloqueados por falta de respuesta
- Impacto en cronograma de la inactividad (X días perdidos por cada Y días sin respuesta)

**Nunca asumir que el cliente rechazó algo por su ausencia.**
**Nunca avanzar con supuestos no documentados en temas de alto impacto.**

---

## Paso 2 — Escalar el canal de contacto

Secuencia de escalación:

1. **Email formal** con asunto que indica urgencia y fecha límite explícita
   - Asunto: `[URGENTE] Aprobación requerida — [Tema] — Fecha límite: [fecha]`
   - Cuerpo: contexto, qué se necesita, impacto de no decidir, fecha límite

2. **WhatsApp / mensaje directo** si el email no recibe respuesta en 24h
   - Mensaje corto, educado, referenciando el email enviado

3. **Llamada telefónica** si el mensaje directo no recibe respuesta en 24h

4. **Contacto con el interlocutor alterno** del cliente (backup designado, su jefe, otro contacto)

5. **Comunicación formal al sponsor** documentando el impacto de la ausencia del cliente en el cronograma

---

## Paso 3 — Proteger el proyecto con supuestos documentados

Si la decisión bloqueada no puede esperar más:

```
SUPUESTO DOCUMENTADO — [FECHA]
Tema: [descripción de la decisión bloqueada]
Supuesto utilizado: [descripción del supuesto adoptado]
Justificación: [por qué este supuesto es razonable]
Impacto si el supuesto es incorrecto: [descripción]
Comunicado a: [lista de personas notificadas]
Plazo para corrección sin impacto: hasta [fecha]
```

Enviar este documento al cliente y al sponsor como registro formal.

---

## Paso 4 — Comunicar el impacto en cronograma

Si la ausencia ya genera días perdidos:

```
Estimado [nombre]:

Le informamos que a la fecha llevamos [X] días sin recibir respuesta 
sobre [tema específico], lo cual ha generado un bloqueo en las tareas 
[lista], afectando el cronograma en [X] días.

En caso de no recibir respuesta antes del [fecha], adoptaremos el 
supuesto [descripción] y continuaremos con la planificación, 
asumiendo que cualquier cambio posterior sobre esta decisión 
constituirá un cambio de alcance con impacto a evaluar.

Quedamos atentos.
[Firma PM]
```

---

## Paso 5 — Plan de engagement proactivo

Si el patrón de ausencia es recurrente, proponer al sponsor:
1. Designar un representante alterno del cliente con autoridad de aprobación
2. Cambiar la cadencia de reuniones (menos frecuentes pero más estructuradas)
3. Definir SLA de respuesta del cliente en el plan de comunicaciones
4. Incluir cláusula de impacto de ausencia del cliente en el cronograma (si hay contrato)

---

## Paso 6 — Actualizar archivos

- `memory/historial.md` — registrar cada intento de contacto
- `memory/compromisos.md` — compromisos del cliente pendientes
- `risks/stakeholder-risks.md` — activar riesgo de cliente no comprometido
- `context/stakeholders.md` — actualizar estrategia de engagement del cliente


---

## Activadores

Este playbook se activa típicamente desde los siguientes comandos:
- `/blockers`
- `/escalar`

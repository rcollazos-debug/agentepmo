# COMMAND: /actualizar

## Propósito

Integrar novedades del proyecto a la memoria y los archivos de seguimiento del agente. Cuando el usuario entrega una actualización verbal o escrita, este comando la procesa, la estructura y la persiste en los archivos correspondientes.

## Cuándo usar

- El PM informa novedades del proyecto (avances, bloqueos, incidentes)
- Se completó un hito o tarea importante
- Hay un cambio en el equipo, recursos o presupuesto
- Se toma una decisión clave
- Se recibe feedback del cliente

---

## Instrucciones de ejecución

### 1. Leer contexto actual

```
memory/historial.md
memory/compromisos.md
memory/riesgo.md
memory/decisiones.md
metrics/dashboard.md
```

### 2. Clasificar la información recibida

Analizar el texto del usuario e identificar:

**Avances:**
- ¿Qué se completó?
- ¿Hay hitos o entregables cerrados?
- ¿Cambió el % de avance?

**Bloqueos:**
- ¿Hay impedimentos nuevos?
- ¿Se resolvió algún bloqueo existente?

**Riesgos:**
- ¿Se materializó algún riesgo?
- ¿Hay nuevas amenazas u oportunidades?
- ¿Cambió la probabilidad de algún riesgo activo?

**Decisiones:**
- ¿Se tomó alguna decisión clave?
- ¿Quién decidió y qué se decidió?

**Compromisos:**
- ¿Alguien se comprometió a algo con fecha?
- ¿Se cumplió o vencid algún compromiso existente?

**Cambios:**
- ¿Hay solicitudes de cambio nuevas o resueltas?
- ¿Cambiaron fechas, alcance o presupuesto?

**Equipo:**
- ¿Hubo cambios en el equipo?
- ¿Alguien entró, salió o cambió de rol?

### 3. Actualizar cada archivo correspondiente

**Actualizar `memory/historial.md`:**
```
### [FECHA] — [Tipo de evento]
[Descripción del evento]
Fuente: [quién informó]
Impacto: [impacto en el proyecto]
```

**Actualizar `memory/riesgo.md`** (si hay cambios en riesgos):
```
| ID | Descripción | Estado | Cambio | Fecha |
```

**Actualizar `memory/compromisos.md`** (si hay compromisos nuevos o resueltos):
```
| Compromiso | Responsable | Fecha | Estado | Actualización |
```

**Actualizar `memory/decisiones.md`** (si hay decisiones):
```
### Decisión [N] — [Fecha]
Qué se decidió: [descripción]
Quién decidió: [nombre y rol]
Contexto: [por qué se tomó]
Impacto: [efecto en el proyecto]
```

**Actualizar `metrics/dashboard.md`** (si cambia el estado general):
- Semáforo actualizado
- % avance actualizado
- Hitos actualizados

### 4. Verificar consistencia

Antes de cerrar, verificar:
- ¿El semáforo refleja la realidad actualizada?
- ¿Hay compromisos nuevos sin responsable? → asignar
- ¿Hay riesgos materializados sin plan de respuesta? → activar playbook
- ¿Hay decisiones tomadas sin comunicar a stakeholders? → agregar a plan de comunicaciones

### 5. Confirmar actualización al usuario

Responder con un resumen de qué se registró:

```
ACTUALIZACIÓN REGISTRADA — [FECHA]

Eventos registrados:
✓ [descripción breve]
✓ [descripción breve]

Archivos actualizados:
- memory/historial.md
- memory/compromisos.md (si aplica)
- memory/riesgo.md (si aplica)
- memory/decisiones.md (si aplica)

Alertas detectadas en la actualización:
! [alerta si hay alguna situación que requiere atención]

Próxima acción sugerida:
[recomendación del agente basada en lo actualizado]
```

---

## Reglas de procesamiento

- Nunca descartar información del usuario — si es ambigua, categorizar en historial con nota de ambigüedad
- Si el usuario da fechas relativas ("ayer", "la semana pasada"), convertirlas a fecha absoluta antes de guardar
- Si el usuario menciona una persona por nombre sin rol, preguntar el rol si no está en `context/stakeholders.md`
- Si la actualización contradice algo en la memoria, registrar ambas versiones y marcar para clarificación
- Si se detecta un nuevo riesgo crítico en la actualización → mencionar inmediatamente y sugerir activar skill `gestion-riesgos`

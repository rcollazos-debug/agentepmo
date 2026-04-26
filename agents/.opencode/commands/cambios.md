# COMMAND: /cambios

## Propósito

Procesar y gestionar solicitudes de cambio al proyecto aplicando el proceso de Control Integrado de Cambios del PMBOK 8. Documentar, analizar impacto, generar opciones y facilitar la decisión formal.

## Cuándo usar

- El cliente solicita un cambio al alcance, cronograma o presupuesto
- El equipo propone un cambio técnico con impacto significativo
- Se detecta scope creep sin formalizar
- Se recibe una solicitud de cambio (CR) formal

---

## Instrucciones de ejecución

### 1. Leer fuentes

```
data/cambios.md
data/alcance-detallado.md
data/cronograma.md
data/presupuesto.md
data/backlog.md
data/recursos.md
context/restricciones.md
memory/decisiones.md
```

### 2. Capturar la solicitud de cambio

Completar la ficha:

```
SOLICITUD DE CAMBIO — CR-[NNN]
Fecha: [fecha]
Solicitante: [nombre] | Rol: [cliente / equipo / PM / sponsor]
Tipo: [Alcance / Cronograma / Costo / Técnico / Contractual / Calidad]
Descripción: [qué se quiere cambiar — ser específico]
Justificación: [por qué es necesario / qué valor entrega]
Urgencia: [Inmediata / Normal / Baja]
Restricciones asociadas: [referencias a restricciones del proyecto]
```

### 3. Análisis de impacto completo

Evaluar cada triple restricción + riesgos:

```
ANÁLISIS DE IMPACTO — CR-[NNN]

ALCANCE
Cambio en alcance: [Aumenta / Reduce / Modifica / Sin cambio]
Entregables afectados: [lista]
Nuevas tareas requeridas: [lista con estimación en horas]

CRONOGRAMA
Impacto en duración: [+X días / -X días / Sin cambio]
Tareas afectadas en ruta crítica: [lista]
Nueva fecha de entrega proyectada: [fecha]

COSTO
Esfuerzo adicional: [X horas × $Y tarifa = $Z]
Materiales o licencias adicionales: [$X]
Impacto total en presupuesto: [+/-$X | +/-X% del BAC]

CALIDAD
Impacto en calidad: [Mejora / Riesgo / Sin cambio]
Criterios de aceptación modificados: [descripción]
Pruebas adicionales requeridas: [descripción]

RIESGOS NUEVOS INTRODUCIDOS
[lista de riesgos que este cambio introduce]

RECURSOS
Recursos adicionales requeridos: [perfil, horas, disponibilidad]
Recursos liberados (si reduce alcance): [descripción]
```

### 4. Nivel de aprobación requerido

| Nivel | Criterio | Aprobador |
|---|---|---|
| Menor | < 2 días o < 2% BAC | Project Manager |
| Moderado | 2-5 días o 2-5% BAC | PM + Sponsor |
| Mayor | > 5 días o > 5% BAC | Steering Committee |
| Crítico | Cambia alcance contractual o fecha de entrega | Comité + firma cliente |

### 5. Opciones de respuesta

Siempre presentar al menos 2 opciones:

```
OPCIÓN A — Aprobar como solicitado
Impacto: +X días, +$X
Condición: aprobación de tiempo y presupuesto adicional
Ventaja: [descripción del valor que entrega]
Riesgo: [descripción]

OPCIÓN B — Aprobar con ajuste de alcance
Qué incluye: [descripción]
Qué se pospone: [descripción]
Impacto: +X días, +$X (menor)
Condición: cliente acepta posponer [funcionalidad]

OPCIÓN C — Rechazar
Justificación: [razón técnica o de negocio]
Alternativa propuesta: [si aplica]

RECOMENDACIÓN DEL PM: Opción [X]
Justificación: [2-3 líneas directas]
```

### 6. Registrar decisión

Una vez tomada la decisión por el aprobador:

```
RESOLUCIÓN CR-[NNN]
Decisión: [Aprobada / Aprobada condicionalmente / Diferida / Rechazada]
Tomada por: [nombre y rol]
Fecha: [fecha]
Condiciones (si aplica): [descripción]
```

### 7. Actualizar el proyecto si se aprueba

- `data/alcance-detallado.md` — nuevo alcance documentado
- `data/cronograma.md` — nuevas fechas
- `data/presupuesto.md` — presupuesto actualizado
- `data/backlog.md` — nuevas historias o tareas
- `data/cambios.md` — CR registrada con resolución
- `memory/decisiones.md` — decisión registrada
- Notificar a stakeholders afectados

### 8. Registro consolidado de cambios

Mantener actualizado en `data/cambios.md`:
```
| ID | Fecha | Solicitante | Descripción | Tipo | +Días | +Costo | Estado | Aprobador | Fecha resolución |
```

---

## Señales de scope creep a detectar proactivamente

- El equipo habla de "un pequeño ajuste" sin CR
- El cliente pide en reunión algo que no estaba en el contrato
- El backlog crece sin que la fecha cambie
- Sprints sistemáticamente incompletos sin causa clara de capacidad

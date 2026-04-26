# PLAYBOOK: Proveedor Incumplido

## Activación

Se activa cuando un proveedor, vendor o tercero no cumple sus compromisos contractuales o de entrega, poniendo en riesgo el cronograma o la calidad del proyecto.

**Señales de activación:**
- Entregable del proveedor no recibido en la fecha acordada
- Calidad de la entrega no cumple los criterios de aceptación definidos
- El proveedor reporta que no podrá cumplir con lo acordado
- Comunicación del proveedor cortada o sin respuesta por más de 3 días hábiles

---

## Principio PMBOK 8 aplicado

Dominio: Trabajo del Proyecto (Project Work Performance Domain)
Principio: Navegar complejidad | Optimizar respuestas a riesgos | Enfocarse en el valor

---

## Paso 1 — Confirmar y documentar el incumplimiento

Registrar inmediatamente:
- Qué debía entregar el proveedor
- Fecha comprometida
- Fecha actual
- Días de retraso o descripción del defecto de calidad
- Impacto en el proyecto: qué tareas están bloqueadas
- Referencia contractual: cláusula de entrega y penalizaciones aplicables

---

## Paso 2 — Contacto formal y urgente con el proveedor

**Primer contacto (mismo día):**
Llamada telefónica al responsable del proveedor. No solo email.

Preguntas clave:
- ¿Cuál es la causa del incumplimiento?
- ¿Cuándo estará listo?
- ¿Qué necesita de nuestra parte para desbloquearse?
- ¿Hay un compromiso nuevo con fecha específica?

**Confirmación escrita formal (dentro de las 2 horas):**
```
Asunto: Notificación formal de incumplimiento — [Descripción del entregable]

Estimado [nombre]:
Le notificamos formalmente que el entregable [nombre] comprometido 
para el [fecha] no ha sido recibido a la fecha de hoy [fecha].

Solicitamos confirmar por escrito:
1. Nueva fecha de entrega comprometida
2. Causa del retraso
3. Plan de acción para cumplir la nueva fecha

Este retraso está generando un impacto de [X días] en nuestro 
cronograma. Quedamos a la espera de su respuesta antes de las 
[hora] de hoy.

[Firma PM]
```

---

## Paso 3 — Evaluar opciones de contingencia

**Opción A — Esperar con nueva fecha comprometida:**
- Solo si el nuevo plazo es aceptable para el proyecto
- Documentar el nuevo compromiso con firmeza

**Opción B — Alternativa interna:**
- ¿Puede el equipo propio absorber el trabajo?
- Costo: esfuerzo interno + posible impacto en otras tareas

**Opción C — Proveedor alternativo:**
- ¿Existe un sustituto que pueda incorporarse rápidamente?
- Costo: tiempo de onboarding + posible costo mayor

**Opción D — Replanear alrededor del proveedor:**
- Mover tareas dependientes al inicio de lo que el proveedor retrase
- Continuar con lo que no depende del proveedor

**Opción E — Activar cláusula contractual:**
- Aplicar penalización según contrato
- Evaluar si la terminación del contrato es procedente y económicamente viable
- Requiere revisión legal y aprobación del sponsor

---

## Paso 4 — Escalar internamente

Comunicar al sponsor:
- El incumplimiento confirmado
- El impacto en el cronograma
- Las opciones evaluadas
- La recomendación del PM
- La acción requerida del sponsor (decisión, autorización de gasto alternativo, contacto ejecutivo)

---

## Paso 5 — Actualizar el plan

Una vez definida la acción:
- Actualizar `data/cronograma.md` con el impacto real
- Actualizar `data/proveedores.md` con el incumplimiento documentado
- Activar riesgo en `risks/vendor-risks.md`
- Registrar en `memory/historial.md`
- Notificar al equipo sobre el impacto en sus dependencias

---

## Paso 6 — Post-incidente: fortalecer la gestión del proveedor

Acciones preventivas para el futuro:
- Agregar puntos de control intermedios (check-ins semanales)
- Definir criterios de aceptación más detallados antes del inicio
- Incluir cláusula de notificación temprana en futuros contratos
- Evaluar si este proveedor debe seguir en el proyecto o en proyectos futuros

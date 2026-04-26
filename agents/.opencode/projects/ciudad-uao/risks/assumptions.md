# REGISTRO DE SUPUESTOS Y RESTRICCIONES

> Los supuestos son condiciones que se asumen como verdaderas para la planificación del proyecto.
> Cada supuesto invalidado es un riesgo materializado.
> Las restricciones son condiciones que limitan las opciones del proyecto.

---

## Supuestos del Proyecto

### Instrucciones de uso

- **ID:** formato SUP-NNN
- **Estado:** Vigente / Cuestionado / Invalidado / Confirmado
- **Riesgo si se invalida:** Alto / Medio / Bajo
- Cuando un supuesto cambia a "Cuestionado" o "Invalidado" → activar análisis de riesgo inmediatamente

---

### Supuestos de Recursos

| ID | Supuesto | Estado | Riesgo si invalida | Fecha validación | Dueño |
|---|---|---|---|---|---|
| SUP-001 | El equipo comprometido estará disponible durante todo el proyecto | Vigente | Alto | [fecha] | PM |
| SUP-002 | La carga del equipo permitirá la dedicación planificada (X%) | Vigente | Alto | [fecha] | PM |
| SUP-003 | No habrá rotación de personal crítico durante la ejecución | Vigente | Alto | [fecha] | PM |

### Supuestos del Cliente

| ID | Supuesto | Estado | Riesgo si invalida | Fecha validación | Dueño |
|---|---|---|---|---|---|
| SUP-010 | El cliente dispondrá de tiempo para revisiones y aprobaciones según el plan | Vigente | Alto | [fecha] | PM |
| SUP-011 | Los usuarios finales estarán disponibles para UAT según lo planificado | Vigente | Medio | [fecha] | PM |
| SUP-012 | Los requisitos actuales son estables y no cambiarán significativamente | Vigente | Alto | [fecha] | PM |
| SUP-013 | El interlocutor designado del cliente tiene autoridad para aprobar decisiones | Vigente | Alto | [fecha] | PM |

### Supuestos Técnicos

| ID | Supuesto | Estado | Riesgo si invalida | Fecha validación | Dueño |
|---|---|---|---|---|---|
| SUP-020 | La tecnología seleccionada soporta los requisitos funcionales y de performance | Vigente | Alto | [fecha] | Tech Lead |
| SUP-021 | Las APIs de terceros estarán disponibles con el SLA requerido | Vigente | Medio | [fecha] | Tech Lead |
| SUP-022 | Los ambientes de desarrollo y pruebas estarán disponibles según lo planificado | Vigente | Medio | [fecha] | DevOps |
| SUP-023 | La infraestructura de producción estará lista antes del primer release | Vigente | Alto | [fecha] | DevOps |

### Supuestos de Negocio

| ID | Supuesto | Estado | Riesgo si invalida | Fecha validación | Dueño |
|---|---|---|---|---|---|
| SUP-030 | El presupuesto aprobado es suficiente para cubrir el alcance definido | Vigente | Alto | [fecha] | Sponsor |
| SUP-031 | No habrá cambios regulatorios que afecten los requisitos durante el proyecto | Vigente | Medio | [fecha] | PM |
| SUP-032 | Las prioridades organizacionales no cambiarán significativamente durante el proyecto | Vigente | Medio | [fecha] | Sponsor |

---

## Restricciones del Proyecto

### Restricciones de Tiempo

| ID | Restricción | Descripción | Flexibilidad |
|---|---|---|---|
| RES-001 | Fecha de entrega fija | [Fecha de entrega comprometida y por qué es inamovible] | Ninguna / Limitada |
| RES-002 | Fechas de hitos intermedios | [Descripción] | Limitada |

### Restricciones de Costo

| ID | Restricción | Descripción | Flexibilidad |
|---|---|---|---|
| RES-010 | Presupuesto máximo aprobado | $[Monto] — no puede excederse sin aprobación del comité | Requiere aprobación |
| RES-011 | Tope de contratación externa | [Descripción] | Requiere aprobación |

### Restricciones de Alcance

| ID | Restricción | Descripción |
|---|---|---|
| RES-020 | Funcionalidades fuera del alcance | [Lista de lo que explícitamente NO está incluido] |
| RES-021 | Tecnologías mandatorias | [Tecnologías que deben usarse por decisión organizacional] |

### Restricciones de Calidad

| ID | Restricción | Descripción |
|---|---|---|
| RES-030 | Estándares de seguridad requeridos | [Normativas, certificaciones o estándares que aplican] |
| RES-031 | SLA de performance en producción | [Tiempos de respuesta, disponibilidad requeridos] |

---

## Supuestos invalidados (historial)

| ID | Supuesto | Fecha invalidación | Impacto | Acción tomada |
|---|---|---|---|---|
| | | | | |

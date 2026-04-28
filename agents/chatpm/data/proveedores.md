# REGISTRO DE PROVEEDORES

> Directorio de proveedores y vendors del proyecto.
> Gestionar con el playbook `proveedor-incumplido` si hay incumplimientos.
> Ver también: `risks/vendor-risks.md` para la evaluación de riesgos.

---

## Directorio de Proveedores

### PROVEEDOR 1: [Nombre de la empresa]

| Campo | Valor |
|---|---|
| Nombre de la empresa | [Nombre] |
| Tipo de servicio | [Desarrollo / Infraestructura / Licencia / Consultoría / API] |
| Contacto principal | [Nombre, cargo, email, teléfono] |
| Contacto alterno | [Nombre, cargo, email] |
| Nivel de criticidad | [Alta / Media / Baja] |
| Contractual | [Sí / No] |
| Tipo de contrato | [Tiempo y materiales / Precio fijo / Suscripción] |
| Monto del contrato | $[Monto] |
| Fecha inicio del contrato | [Fecha] |
| Fecha fin del contrato | [Fecha] |
| SLA de respuesta | [X horas] |
| SLA de disponibilidad | [X%] |

**Entregables comprometidos:**
| Entregable | Fecha comprometida | Fecha real | Estado |
|---|---|---|---|
| [Descripción] | [fecha] | [fecha] | [Entregado/Pendiente/Vencido] |

**Evaluación del desempeño:**
| Período | Calidad | Puntualidad | Comunicación | Calificación general |
|---|---|---|---|---|
| [Período] | [1-5] | [1-5] | [1-5] | [1-5] |

**Incumplimientos registrados:**
| Fecha | Descripción | Impacto | Acción tomada |
|---|---|---|---|
| [fecha] | [Descripción] | [Impacto] | [Acción] |

**Notas:**
[Información relevante sobre este proveedor, sensibilidades, contexto de la relación]

---

### PROVEEDOR 2: [Nombre]

[Repetir estructura para cada proveedor]

---

## APIs y Servicios de Terceros (SaaS, APIs externas)

| Nombre / Servicio | Proveedor | Propósito | SLA disponibilidad | Plan/Nivel | Contacto soporte | Estado |
|---|---|---|---|---|---|---|
| [Nombre del API/SaaS] | [Empresa] | [Para qué se usa] | X% | [Free/Pro/Enterprise] | [URL/email soporte] | [Activo] |

---

## Matriz de Dependencia de Proveedores

| Proveedor | Componentes que dependen | Alternativa identificada | Tiempo de switching |
|---|---|---|---|
| [Nombre] | [Lista de componentes] | [Nombre alternativo] | [X días] |

---

## Protocolo de Gestión de Proveedores

1. **Check-in mensual:** revisar avance y cumplimiento de cada proveedor
2. **Primer incumplimiento:** notificación formal + registro en este archivo
3. **Segundo incumplimiento:** reunión de escalación
4. **Tercer incumplimiento:** activar cláusula contractual + buscar alternativa
5. **Proveedor crítico en crisis:** activar playbook `proveedor-incumplido`

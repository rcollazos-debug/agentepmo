# EXCLUSIONES FORMALES DEL ALCANCE

> Registro oficial de lo que NO está incluido en el proyecto.
> Las exclusiones son tan importantes como el alcance incluido: protegen a VortexBird del scope creep y aclaran expectativas al cliente.
> Toda solicitud del cliente que caiga en una exclusión debe gestionarse como CR formal.
> Proyecto: **Conde**
> Validado por: [Nombre del cliente / PO — Fecha]
> Actualizado: [fecha]

---

## Principio de Exclusión

> Todo lo que no esté explícitamente incluido en `scope/alcancedetallado.md` o en el contrato
> es por defecto una **exclusión** del alcance de VortexBird.
> Si el cliente solicita algo no incluido, se genera automáticamente un CR (Change Request).

---

## Exclusiones Funcionales

> Funcionalidades que el cliente podría esperar pero que NO están incluidas en este proyecto.

| ID | Exclusión | Descripción | Origen de la exclusión | ¿Puede ser v2.0? |
|---|---|---|---|---|
| EX-F-001 | [Nombre de la exclusión] | [Descripción clara de qué no se construye y por qué] | [Contrato / Acuerdo verbal / Limitación de presupuesto] | [Sí / No / Propuesta pendiente] |
| EX-F-002 | [Nombre] | [Descripción] | [Origen] | |
| EX-F-003 | [Nombre] | [Descripción] | [Origen] | |
| EX-F-004 | App móvil nativa | El proyecto incluye solo la plataforma web responsiva. No se desarrolla app iOS ni Android nativa. | Contrato | Sí — potencial v2.0 |
| EX-F-005 | Inteligencia artificial / ML | No se incluyen funcionalidades de IA, machine learning o análisis predictivo. | Contrato | Por definir |
| EX-F-006 | [Nombre] | [Descripción] | | |

---

## Exclusiones de Integración

> Integraciones con sistemas externos que NO están incluidas.

| ID | Sistema externo | Por qué está excluido | ¿Quién es responsable? |
|---|---|---|---|
| EX-I-001 | [Nombre del sistema] | [Ej: No está documentado / No está en el contrato / Requiere acceso que el cliente no ha provisto] | [Cliente / Proveedor del sistema] |
| EX-I-002 | [Sistema ERP del cliente] | [Ej: Integración fuera del alcance contractual] | [Cliente — puede ser CR en fase 2] |
| EX-I-003 | [Pasarela de pagos] | [Ej: El cliente usará una pasarela ya existente, solo se hace la interfaz] | [Proveedor de la pasarela] |

---

## Exclusiones de Infraestructura

> Componentes de infraestructura que son responsabilidad del cliente o de terceros.

| ID | Ítem | Descripción | Responsable |
|---|---|---|---|
| EX-INF-001 | Servidores de producción | La adquisición, configuración y mantenimiento de servidores de producción es responsabilidad del cliente. VortexBird entrega dockerfiles y guía de despliegue. | Cliente |
| EX-INF-002 | Licencias de software de terceros | [Ej: Licencias de SO, BD de pago, herramientas] | Cliente |
| EX-INF-003 | Dominio y certificados SSL | La gestión del dominio y certificados SSL es responsabilidad del cliente. | Cliente |
| EX-INF-004 | [Ítem] | [Descripción] | [Responsable] |

---

## Exclusiones de Datos

> Actividades relacionadas con datos que NO están incluidas.

| ID | Exclusión de datos | Descripción | Alternativa si el cliente la necesita |
|---|---|---|---|
| EX-D-001 | Migración de datos históricos | No se incluye la migración de datos del sistema legado al nuevo sistema. | CR formal con estimación de horas adicionales |
| EX-D-002 | Limpieza / normalización de datos existentes | Los datos del cliente se asumen correctos y limpios para las integraciones. | Taller de calidad de datos (CR) |
| EX-D-003 | Carga inicial de datos maestros | [Descripción] | [Alternativa] |

---

## Exclusiones de Servicios

> Servicios profesionales que NO están incluidos.

| ID | Servicio excluido | Descripción | Condición para incluir |
|---|---|---|---|
| EX-S-001 | Capacitación extendida | Solo se incluye capacitación básica de uso del sistema (máximo [N] horas). La capacitación avanzada o para múltiples grupos no está incluida. | CR de capacitación adicional |
| EX-S-002 | Soporte post go-live > [N] días | El soporte post go-live cubre [N] días de garantía. El soporte continuado requiere contrato de mantenimiento. | Propuesta de contrato de soporte |
| EX-S-003 | Consultoría de procesos de negocio | VortexBird construye el sistema según los procesos definidos por el cliente. No incluye rediseño de procesos de negocio (BPR). | Consultoría separada |
| EX-S-004 | Auditorías de seguridad externas | No se incluyen penetration testing ni auditorías de seguridad por terceros. | Contratar empresa de seguridad (a cargo del cliente) |

---

## Exclusiones de Entornos

> Ambientes o entornos que VortexBird NO configura ni mantiene.

| ID | Ambiente excluido | Responsable | Notas |
|---|---|---|---|
| EX-E-001 | Ambiente de Disaster Recovery (DR) | Cliente | VortexBird documenta las configuraciones; la infraestructura DR es del cliente |
| EX-E-002 | [Ambiente] | [Responsable] | |

---

## Proceso para Solicitudes que Caen en Exclusiones

Cuando el cliente solicita algo que está en esta lista de exclusiones:

1. **El PM informa al cliente** que el ítem está fuera del alcance contractual
2. **El PM evalúa el impacto** de incluirlo: horas, costo, impacto en cronograma y margen
3. **Se genera un CR formal** con la estimación y propuesta de precio
4. **El cliente aprueba o rechaza** el CR por escrito
5. Si se aprueba → se genera **adenda al contrato** o acuerdo escrito
6. Si se rechaza → queda documentado que el cliente rechazó la funcionalidad

> Ver proceso completo en `commands/cambios.md`

---

## Historial de Exclusiones Convertidas en CR

| ID CR | Exclusión original | Fecha solicitud | Estado del CR | Valor adicional |
|---|---|---|---|---|
| CR-001 | [EX-F-XXX — Nombre] | [fecha] | [Aprobado / Rechazado / Pendiente] | $[monto] |

---

## Notas del PM sobre Exclusiones

[Observaciones sobre exclusiones que el cliente ha cuestionado, solicitudes que anticipan convertirse en CR, o exclusiones ambiguas que pueden generar conflicto.]

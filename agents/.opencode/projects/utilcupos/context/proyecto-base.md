# CONTEXTO BASE DEL PROYECTO

> Ficha tecnica permanente del proyecto.
> Actualizado: 20 de abril de 2026.

## Identificacion del Proyecto

| Campo | Valor |
|---|---|
| Nombre del proyecto | **WO0000000358906 - Utilizaciones de Cupos** |
| Codigo / ID | utilcupos |
| Cliente | **Bancoomeva** |
| Organizacion ejecutora | **VortexBird** |
| Project Manager | **Valeria Rivera Rico** |
| Patrocinador del frente | **Keilly Barona** |
| Product Owner VortexBird | **Ingrid Y. Mosquera** |
| Product Owner cliente | **Adriana Muñoz Ñañez** |
| Analista funcional cliente | **Adriana Muñoz Ñañez** |

## Descripcion del Proyecto

### Proposito y objetivo principal
Implementar el modulo de Utilizacion de Cupos para Bancoomeva, mediante evolutivos funcionales y tecnicos que permitan validar al cliente, consultar y seleccionar cupos disponibles, parametrizar condiciones comerciales, gestionar desembolsos y ejecutar la operacion final, asegurando integracion con los servicios corporativos requeridos y trazabilidad operativa.

### Criterios de exito iniciales
- El asesor o usuario de canal puede utilizar un cupo preaprobado y convertirlo en un prestamo desembolsado.
- El modulo soporta validacion de cliente, estado y mora antes de continuar.
- Existen parametrizaciones centralizadas de cupos y cuentas con auditoria.
- La solucion ejecuta la operacion final mediante integracion con la orquestacion `utilizarCuposORQ` y COBIS.

## Tipo de Proyecto y Enfoque

| Campo | Valor |
|---|---|
| Tipo | Desarrollo de software / modulo transaccional bancario |
| Metodologia | **Agil - Scrum** |
| Ciclo de vida | Incremental e iterativo |
| Modelo de trabajo | DevOps |

## Fechas Clave

| Evento | Fecha planificada | Fecha real |
|---|---|---|
| Elaboracion de historias de usuario | 18-mar-2026 | 18-mar-2026 |
| Contrato de integracion v1 | 16-abr-2026 | 16-abr-2026 |
| Propuesta economica | 20-abr-2026 | 20-abr-2026 |
| Inicio oficial del proyecto | 20-abr-2026 | 20-abr-2026 |
| Fecha compromiso / baseline formal | 14-may-2026 | - |
| Duracion comprometida actual | 1 mes | - |

## Presupuesto

| Componente | Valor |
|---|---|
| Presupuesto total aprobado (BAC) | No aplica para la gestion del proyecto |
| Consumido a la fecha | No aplica |
| Disponible | No aplica |
| Modelo de presupuesto | Proyecto sin control presupuestal operativo |

## Tecnologia

| Componente | Tecnologia / Plataforma |
|---|---|
| Frontend | Angular, TypeScript, MFE sobre XpertSuite |
| Backend | Java 25, Spring Boot, Spring Framework, Spring Data JPA, Spring MVC Rest |
| Base de datos | PostgreSQL |
| Integracion core | COBIS via `utilizarCuposORQ` |
| Arquitectura | Microservicios, API Gateway, Vault, Keycloak, Redis, RabbitMQ |
| Observabilidad | Grafana, Prometheus, ELK |

## Gobierno y Aprobaciones

| Tema | Responsable |
|---|---|
| Aprobaciones funcionales | Adriana Muñoz Ñañez |
| Aprobaciones tecnicas | Diana Carolina Restrepo |
| Priorizacion | Adriana Muñoz Ñañez y Monica Araque |

## Estado Inicial

- Fase actual: **Inicio**
- Semaforo actual: **🟡 AMARILLO**
- Avance general: 0%
- Observacion: Proyecto con fecha de inicio 20-abr-2026 y compromiso de entrega en 1 mes. Se prioriza `utilizarCuposORQ` y se trabaja en paralelo el resto del alcance.

# ALCANCE TÉCNICO DEL PROYECTO

> Descripción técnica detallada: arquitectura, componentes, integraciones, tecnologías y restricciones técnicas.
> El equipo de desarrollo usa este archivo como referencia técnica de lo que se va a construir.
> Para el alcance funcional ver `scope/alcancedetallado.md`. Para exclusiones ver `scope/exclusionesalcance.md`.
> Proyecto: **Conde**
> Actualizado: [fecha]

---

## Resumen de la Arquitectura

> Descripción en un párrafo de la arquitectura general del sistema.

[Ej: El sistema se construirá bajo una arquitectura de microservicios con backend en Java/Spring Boot, frontend en Angular, comunicación entre servicios vía REST/API Gateway, y despliegue en contenedores Docker sobre infraestructura cloud.]

---

## Diagrama de Arquitectura

```
[DIAGRAMA DE ARQUITECTURA — Agregar imagen o diagrama ASCII/texto aquí]

Ejemplo de estructura:

  [Cliente Web Browser]
         |
     [Angular SPA]
         |
     [API Gateway]
    /     |      \
[Svc A] [Svc B] [Svc C]
    \     |      /
   [Base de Datos]
```

> Link al diagrama en Confluence/Miro/Lucidchart: [URL]

---

## Stack Tecnológico

### Frontend

| Componente | Tecnología | Versión | Observaciones |
|---|---|---|---|
| Framework principal | Angular | [v17+] | |
| Lenguaje | TypeScript | [v5.x] | |
| UI Component Library | [Ej: Angular Material / PrimeNG / Tailwind] | [versión] | |
| State Management | [Ej: NgRx / RxJS / Signals] | [versión] | |
| HTTP Client | Angular HttpClient | — | |
| Testing | [Ej: Jest / Karma + Jasmine] | [versión] | |

### Backend

| Componente | Tecnología | Versión | Observaciones |
|---|---|---|---|
| Lenguaje | Java | [17 / 21 LTS] | |
| Framework | Spring Boot | [v3.x] | |
| ORM | Spring Data JPA / Hibernate | [versión] | |
| Seguridad | Spring Security + JWT | [versión] | |
| API | REST + OpenAPI / Swagger | [versión] | |
| Mensajería (si aplica) | [Kafka / RabbitMQ / N/A] | [versión] | |
| Testing | JUnit 5 + Mockito | [versión] | |
| Cobertura mínima | JaCoCo | — | Objetivo: > 80% |

### Base de Datos

| Componente | Tecnología | Versión | Observaciones |
|---|---|---|---|
| Base de datos principal | [PostgreSQL / MySQL / SQL Server] | [versión] | |
| Caché (si aplica) | [Redis / N/A] | [versión] | |
| Estrategia de migración | [Flyway / Liquibase / Manual] | [versión] | |
| Backup | [Política de backup] | — | |

### Infraestructura y DevOps

| Componente | Tecnología | Observaciones |
|---|---|---|
| Contenedores | Docker | |
| Orquestación | [Kubernetes / Docker Compose / N/A] | |
| Cloud provider | [AWS / GCP / Azure / On-premise] | |
| CI/CD | [GitHub Actions / Jenkins / GitLab CI] | |
| Control de versiones | Git — [GitHub / GitLab / Bitbucket] | |
| Ambientes | DEV / QA / UAT / PROD | |
| Monitoreo | [Ej: CloudWatch / Datadog / Grafana / N/A] | |
| Logs | [Ej: ELK Stack / CloudWatch Logs / N/A] | |

---

## Microservicios / Componentes del Sistema

| Servicio / Componente | Responsabilidad | Tecnología | Expone API | Base de datos propia |
|---|---|---|---|---|
| [Servicio 1 — Ej: auth-service] | [Autenticación y autorización de usuarios] | Spring Boot | REST | [Sí / No / Compartida] |
| [Servicio 2 — Ej: user-service] | [Gestión de usuarios y perfiles] | Spring Boot | REST | Sí |
| [Servicio 3 — Ej: notification-service] | [Envío de notificaciones email/SMS] | Spring Boot | REST | No |
| [Módulo frontend — Ej: admin-module] | [Panel de administración] | Angular | — | — |
| [Módulo frontend — Ej: portal-module] | [Portal del usuario final] | Angular | — | — |

---

## Integraciones con Sistemas Externos

| # | Sistema externo | Proveedor | Tipo de integración | Protocolo | Documentación disponible | Responsable de la integración |
|---|---|---|---|---|---|---|
| INT-001 | [Nombre del sistema] | [Proveedor] | [API REST / SOAP / BD / Archivo] | [REST / SOAP / SFTP / etc.] | [Sí / No / Parcial] | [VortexBird / Cliente / Proveedor] |
| INT-002 | | | | | | |
| INT-003 | | | | | | |

**Riesgo de integraciones:** [Alto / Medio / Bajo]
**Supuesto:** Las integraciones son responsabilidad de VortexBird solo si están explícitamente en el contrato.

---

## Seguridad del Sistema

| Aspecto de seguridad | Implementación planificada |
|---|---|
| Autenticación | [Ej: JWT + Refresh tokens / OAuth2 / SAML] |
| Autorización | [Ej: RBAC — Role Based Access Control] |
| Cifrado en tránsito | HTTPS/TLS en todos los endpoints |
| Cifrado en reposo | [Ej: Datos sensibles cifrados en BD] |
| Protección OWASP Top 10 | [Checklist básico aplicado en QA] |
| Gestión de secretos | [Ej: Variables de entorno / AWS Secrets Manager / Vault] |
| Auditoría | [Ej: Log de acciones críticas del usuario] |

---

## Modelo de Datos — Entidades Principales

| Entidad | Descripción | Relaciones clave | Módulo |
|---|---|---|---|
| [Entidad 1 — Ej: Usuario] | [Descripción] | [Ej: tiene Roles, tiene Permisos] | [Auth] |
| [Entidad 2 — Ej: Producto] | [Descripción] | [Ej: pertenece a Categoría] | [Catálogo] |
| [Entidad 3] | | | |

> Link al modelo entidad-relación completo: [URL / Archivo]

---

## Ambientes del Proyecto

| Ambiente | URL / Servidor | Responsable | Propósito | Datos |
|---|---|---|---|---|
| DEV | [URL local / servidor dev] | Equipo VortexBird | Desarrollo continuo | Datos de prueba generados |
| QA | [URL ambiente QA] | Equipo QA | Pruebas de calidad | Datos de prueba controlados |
| UAT | [URL ambiente UAT] | PM + Cliente | Pruebas de aceptación | Datos similares a producción |
| PROD | [URL producción] | DevOps + Cliente | Producción real | Datos reales del negocio |

---

## Restricciones Técnicas

| # | Restricción | Origen | Impacto |
|---|---|---|---|
| RT-001 | [Ej: El sistema debe ser compatible con browsers IE11+] | [Requerimiento del cliente] | [Limitaciones de Angular moderno] |
| RT-002 | [Ej: Los datos no pueden salir del país] | [Regulación] | [Cloud region específica] |
| RT-003 | [Ej: Tiempo de respuesta < 3 segundos para el 95% de las peticiones] | [Performance requirement] | [Diseño de caché y BD] |

---

## Deuda Técnica Prevista y Controlada

| Ítem | Descripción | Sprint donde se planea resolver | Impacto si no se resuelve |
|---|---|---|---|
| DT-001 | [Ej: Endpoints sin validación de entrada completa — por velocidad en Sprint 1] | Sprint 3 | Vulnerabilidad de seguridad |
| DT-002 | | | |

> Ver playbook `playbooks/deuda-tecnica.md` si la deuda técnica se vuelve bloqueante.

---

## Notas del Tech Lead

[Observaciones técnicas importantes, decisiones de arquitectura tomadas, trade-offs identificados, riesgos técnicos específicos.]

# RIESGOS TÉCNICOS

> Catálogo de riesgos de naturaleza técnica y tecnológica del proyecto.
> Complementa el risk-register.md con análisis especializado por área técnica.

---

## Categorías de riesgo técnico

### 1. Arquitectura y Diseño

| ID | Riesgo | Señales de alerta | Respuesta sugerida |
|---|---|---|---|
| RT-001 | Arquitectura no probada en escala requerida | Performance degradada en pruebas de carga | POC de escalabilidad antes de arquitectura final |
| RT-002 | Acoplamiento excesivo entre módulos | Cambios en un módulo rompen otros | Revisión de arquitectura y aplicación de principios SOLID |
| RT-003 | Deuda técnica bloqueante acumulada | Velocidad del equipo en declive constante | Sprint dedicado a refactoring antes de continuar |

### 2. Integraciones y APIs Externas

| ID | Riesgo | Señales de alerta | Respuesta sugerida |
|---|---|---|---|
| RT-010 | API de tercero sin SLA de disponibilidad | Fallos intermitentes en ambiente de pruebas | Circuit breaker + fallback local + SLA contractual |
| RT-011 | Cambios de versión de API externa sin notificación | Breaking changes inesperados | Versionado de contrato + tests de contrato automatizados |
| RT-012 | Dependencia de sistema legacy sin documentación | Comportamientos inesperados en integración | Reverse engineering + documentación + tests de integración exhaustivos |

### 3. Ambientes y DevOps

| ID | Riesgo | Señales de alerta | Respuesta sugerida |
|---|---|---|---|
| RT-020 | Diferencia entre ambiente de dev y producción | Funciona en dev, falla en prod | Infraestructura como código (IaC) + ambientes equivalentes |
| RT-021 | Pipeline CI/CD frágil o inexistente | Despliegues manuales, fallos frecuentes | Inversión en automatización del pipeline |
| RT-022 | Sin capacidad de rollback automatizado | Downtime largo post-deploy con problemas | Blue-green deployment o feature flags |

### 4. Seguridad

| ID | Riesgo | Señales de alerta | Respuesta sugerida |
|---|---|---|---|
| RT-030 | Vulnerabilidades en dependencias de terceros (OSS) | CVEs reportados en componentes usados | Escaneo automático de dependencias (OWASP Dependency Check) |
| RT-031 | Datos sensibles sin cifrado en tránsito o reposo | Ausencia de TLS, datos legibles en DB | Auditoría de seguridad + implementación de cifrado |
| RT-032 | Falta de gestión de secrets y credenciales | Credenciales hardcodeadas en código | Vault / gestión de secrets + rotación periódica |

### 5. Performance y Escalabilidad

| ID | Riesgo | Señales de alerta | Respuesta sugerida |
|---|---|---|---|
| RT-040 | Sistema no soporta el volumen de usuarios esperado | Tiempos de respuesta > baseline en pruebas de carga | Load testing temprano + optimización antes del go-live |
| RT-041 | Consultas a base de datos no optimizadas | Queries lentos en ambientes con datos reales | Profiling de BD + índices + caché |
| RT-042 | Falta de estrategia de caché | Latencia alta en operaciones frecuentes | Implementar caché en capas relevantes |

### 6. Calidad de Código

| ID | Riesgo | Señales de alerta | Respuesta sugerida |
|---|---|---|---|
| RT-050 | Cobertura de pruebas insuficiente | Regresiones frecuentes en producción | Meta mínima de cobertura + gate de calidad en CI |
| RT-051 | Falta de pruebas de regresión automatizadas | Tiempo de QA manual insostenible | Automatización progresiva de regresión |
| RT-052 | Código sin revisión entre pares | Defectos que pasan a QA son evitables | Code review obligatorio antes de merge |

---

## Protocolo de clasificación de riesgos técnicos

Para cada riesgo técnico identificado:
1. Asignar ID con formato RT-NNN
2. Evaluar P e I con el Tech Lead
3. Definir disparador técnico específico (métrica, log, fallo)
4. Asignar dueño técnico (no solo el PM — el Tech Lead o dev senior)
5. Agregar al `risk-register.md` con referencia a este documento

---

## Revisión técnica de riesgos

Frecuencia: en cada sprint planning y antes de cada release
Participantes: PM + Tech Lead + Dev senior
Fuente de datos: logs, métricas de CI/CD, reportes de deuda técnica

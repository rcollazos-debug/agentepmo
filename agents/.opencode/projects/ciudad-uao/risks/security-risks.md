# RIESGOS DE SEGURIDAD

> Catálogo de riesgos de seguridad, privacidad y cumplimiento del proyecto.
> Basado en OWASP Top 10 y mejores prácticas de seguridad en proyectos de software.

---

## Categorías de riesgo de seguridad

### 1. Seguridad de la Aplicación (OWASP-alineado)

| ID | Riesgo | OWASP | Señales de alerta | Respuesta sugerida |
|---|---|---|---|---|
| RSec-001 | Inyección SQL, NoSQL, comandos | A03:2021 | Inputs sin validación, queries dinámicas | Prepared statements, ORM, validación de inputs |
| RSec-002 | Autenticación débil o rota | A07:2021 | Contraseñas débiles, sin MFA, tokens sin expiración | MFA, hashing fuerte, tokens con TTL corto |
| RSec-003 | Exposición de datos sensibles | A02:2021 | Datos en logs, PII sin cifrar, endpoints abiertos | Cifrado en reposo y tránsito, minimización de datos |
| RSec-004 | Control de acceso deficiente | A01:2021 | Usuarios acceden a recursos de otros, escalación de privilegios | RBAC, principio de mínimo privilegio, pruebas de autorización |
| RSec-005 | Componentes con vulnerabilidades conocidas | A06:2021 | Dependencias desactualizadas | Escaneo automático de dependencias + política de actualización |
| RSec-006 | Cross-Site Scripting (XSS) | A03:2021 | Inputs sin sanitización en frontend | Sanitización, CSP headers, encoding de outputs |
| RSec-007 | CSRF (Cross-Site Request Forgery) | A01:2021 | Formularios sin token CSRF | Tokens anti-CSRF, SameSite cookies |
| RSec-008 | Configuración de seguridad incorrecta | A05:2021 | Defaults sin cambiar, headers faltantes, errores detallados en prod | Hardening checklist + revisión de configuración por ambiente |

### 2. Gestión de Datos y Privacidad

| ID | Riesgo | Señales de alerta | Respuesta sugerida |
|---|---|---|---|
| RSec-010 | Datos personales sin tratamiento adecuado (GDPR/LGPD) | PII en logs, sin consentimiento, sin política de retención | Privacy by design + auditoría de datos + DPO involucrado |
| RSec-011 | Backups sin cifrado o sin prueba de restauración | Backups existentes pero no probados | Cifrado de backups + prueba mensual de restauración |
| RSec-012 | Datos de producción en ambientes de desarrollo | PII real en ambientes no productivos | Anonimización/masking de datos en ambientes no prod |

### 3. Infraestructura y Operaciones

| ID | Riesgo | Señales de alerta | Respuesta sugerida |
|---|---|---|---|
| RSec-020 | Credenciales hardcodeadas en el código | Secrets en repositorio, variables de entorno sin gestión | Vault/gestión de secrets + escaneo de secrets en CI |
| RSec-021 | Exposición de servicios internos a internet | Puertos abiertos innecesariamente, firewall mal configurado | Auditoría de red + principio de mínima exposición |
| RSec-022 | Sin plan de respuesta a incidentes de seguridad | No hay proceso definido si ocurre una brecha | Definir IRP (Incident Response Plan) antes del go-live |
| RSec-023 | Logs sin integridad ni centralización | Sin capacidad de forensics post-incidente | Centralización de logs + integridad (firma digital de logs) |

### 4. Gestión de Identidades y Accesos

| ID | Riesgo | Señales de alerta | Respuesta sugerida |
|---|---|---|---|
| RSec-030 | Cuentas con privilegios excesivos | Admin para todo el mundo, sin principio de mínimo privilegio | Revisión periódica de permisos + principio de mínimo privilegio |
| RSec-031 | Sin proceso de offboarding de accesos | Ex-empleados con acceso activo | Proceso de offboarding incluye remoción inmediata de accesos |
| RSec-032 | Credenciales compartidas entre personas | Sin trazabilidad de quién hizo qué | Credenciales individuales + MFA |

---

## Checklist de seguridad pre-release

- [ ] Escaneo de vulnerabilidades de dependencias ejecutado
- [ ] Pruebas de penetración básicas realizadas (o contratadas)
- [ ] Revisión de configuración de seguridad por ambiente
- [ ] Sin credenciales hardcodeadas en el código
- [ ] Certificados SSL/TLS vigentes y configurados correctamente
- [ ] Headers de seguridad HTTP configurados (CSP, HSTS, X-Frame-Options)
- [ ] Logs de seguridad centralizados y funcionando
- [ ] Plan de respuesta a incidentes de seguridad documentado
- [ ] Proceso de notificación de brechas definido (tiempos regulatorios)

---

## Clasificación de datos del proyecto

| Tipo de dato | Ejemplos | Nivel de sensibilidad | Controles requeridos |
|---|---|---|---|
| Datos públicos | [Ejemplos del proyecto] | Bajo | Ninguno adicional |
| Datos internos | [Ejemplos] | Medio | Control de acceso básico |
| Datos confidenciales | [Ejemplos] | Alto | Cifrado + acceso restringido |
| Datos personales (PII) | [Ejemplos] | Muy Alto | Cifrado + anonimización + compliance |

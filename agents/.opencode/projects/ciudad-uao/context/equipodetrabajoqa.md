# EQUIPO DE QA — PERFIL Y EXPERIENCIA

> Perfiles del equipo de aseguramiento de calidad (QA) asignado al proyecto.
> El agente usa este archivo para entender las capacidades de QA disponibles, las herramientas y el nivel de automatización alcanzable.
> Proyecto: **Conde**
> Actualizado: [fecha]

---

## Composición del Equipo de QA

| Nombre | Rol | Tipo de vinculación | Sede |
|---|---|---|---|
| [Nombre] | QA Lead / QA Engineer Senior | [Empleado VortexBird / Freelance] | [Ciudad / Remoto] |
| [Nombre] | QA Engineer | | |
| [Nombre] | Automatizador QA | [Si aplica] | |

---

## Perfil Detallado — QA Lead

### [Nombre] — QA Lead / QA Engineer Senior

| Campo | Detalle |
|---|---|
| Años de experiencia en QA | [N años] |
| Años en VortexBird | [N años] |
| Proyectos de software testeados | [N proyectos] |
| Tipo de pruebas que domina | [Ej: Funcionales, Regresión, Integración, Performance, Seguridad básica] |
| Pruebas automatizadas | [Sí / No / Parcial — qué herramientas] |
| Certificaciones | [Ej: ISTQB Foundation, ISTQB Advanced, Selenium Certified] |
| Herramientas que usa | [Ej: Selenium, Cypress, Postman, JMeter, TestRail, Jira, Zephyr] |
| Conocimiento técnico | [Alto / Medio — puede leer código, escribir scripts básicos] |
| Idiomas | [Español nativo, Inglés B1] |

---

### Fortalezas del Equipo QA

| # | Fortaleza | Evidencia |
|---|---|---|
| F-001 | [Ej: Diseño de casos de prueba exhaustivos] | [Descripción] |
| F-002 | [Ej: Automatización con Selenium/Cypress] | [Descripción] |
| F-003 | [Ej: Pruebas de API con Postman] | [Descripción] |
| F-004 | [Ej: Gestión de defectos en Jira] | [Descripción] |
| F-005 | [Ej: Comunicación asertiva de hallazgos al equipo dev] | [Descripción] |

---

### Áreas de Mejora / Brechas del Equipo QA

| # | Área de mejora | Plan |
|---|---|---|
| B-001 | [Ej: Pruebas de performance (JMeter)] | [Capacitación + proyectos piloto] |
| B-002 | [Ej: Pruebas de seguridad (OWASP básico)] | [Curso + checklist OWASP Top 10] |
| B-003 | [Ej: Automatización CI/CD integrada] | [Configurar pipeline con el equipo dev] |

---

### Responsabilidades Específicas en Este Proyecto

| Responsabilidad | Frecuencia | Entregable |
|---|---|---|
| Definición del plan de pruebas | Fase de planificación | Plan de pruebas |
| Diseño de casos de prueba por módulo | Por sprint / por historia | Casos de prueba en TestRail/Jira |
| Pruebas funcionales en ambiente QA | Cada sprint | Reporte de defectos |
| Pruebas de regresión | Antes de cada release | Reporte de regresión |
| Soporte en pruebas UAT del cliente | Durante UAT | Guía de pruebas + apoyo |
| Reporte de métricas de calidad | Semanal | `metrics/calidad.md` |
| Gate de calidad previo al release | Antes de cada deployment | Checklist de release |
| Gestión de defectos en Jira | Continua | Registro actualizado |

---

## Pipeline de Pruebas del Proyecto

```
Desarrollo (DEV) → Pruebas Unitarias (Dev) → QA → UAT (Cliente) → PROD
```

| Ambiente | Responsable de pruebas | Tipo de pruebas | Criterio de pase |
|---|---|---|---|
| DEV | Desarrollador | Unit tests, pruebas de componente | Cobertura > 80% + sin errores de compilación |
| QA | Equipo QA | Funcionales, integración, regresión | 0 defectos Críticos/Altos abiertos |
| UAT | Cliente + soporte QA | Aceptación del usuario | Aprobación formal del cliente |
| PROD | QA + DevOps | Smoke test post-deploy | Funcionalidades críticas operativas |

---

## Definición de Severidad de Defectos

| Severidad | Descripción | Tiempo máximo de resolución |
|---|---|---|
| 🔴 Crítico | Sistema caído, pérdida de datos, bloqueo total de funcionalidad | 4 horas |
| 🟠 Alto | Funcionalidad principal afectada, sin workaround disponible | 24 horas |
| 🟡 Medio | Funcionalidad afectada pero con workaround disponible | 3 días |
| 🟢 Bajo | Problemas menores de UI, ortografía, estilos | Próximo sprint |

---

## Herramientas de QA del Proyecto

| Herramienta | Propósito | URL / Acceso |
|---|---|---|
| [Ej: Jira / Zephyr] | Gestión de casos de prueba y defectos | [URL] |
| [Ej: Postman] | Pruebas de API | [Colección compartida] |
| [Ej: Selenium / Cypress] | Automatización UI | [Repositorio] |
| [Ej: JMeter] | Pruebas de carga y performance | [Si aplica] |
| [Ej: SonarQube] | Análisis estático de código | [URL / Si aplica] |

---

## Métricas de Calidad del Equipo QA

| Métrica | Objetivo del proyecto | Umbral de alerta |
|---|---|---|
| Cobertura de pruebas unitarias | > 80% | < 70% |
| Defectos Críticos/Altos en UAT | 0 | > 0 |
| Defectos escapados a producción | 0 defectos críticos | Cualquier crítico |
| Tiempo promedio de cierre de defecto | < 48 h (Altos) | > 72 h |
| Tasa de defectos reabiertos | < 5% | > 10% |

---

## Notas del PM sobre el Equipo QA

[Observaciones sobre la madurez del equipo QA, coordinación con el equipo dev, capacidad de automatización real, riesgos de calidad identificados, etc.]

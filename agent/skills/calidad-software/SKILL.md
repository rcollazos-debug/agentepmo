---
name: calidad-software
description: Garantiza que el producto de software entregado cumpla con los estándares de calidad acordados mediante gates de QA estructurados, gestión de defectos y métricas de calidad continua.
---

# SKILL: Calidad de Software

## Propósito

Garantizar que el producto de software entregado cumpla con los estándares de calidad acordados, mediante gates de QA estructurados, gestión de defectos, métricas de calidad y aseguramiento de que el equipo trabaje con estándares elevados desde el primer sprint. La calidad no es una fase final — es una práctica continua.

---

## Base PMBOK 8 + Marcos Ágiles

- **Dominio:** Entrega (Delivery) + Medición (Measurement)
- **Principios aplicados:**
  - Construir calidad en los procesos y entregables
  - Enfocarse en el valor
  - Navegar la complejidad

---

## Cuándo Activar este Skill

- Se solicita revisión del estado de calidad del proyecto
- Se reportan defectos críticos o altos en el sistema
- La tasa de historias devueltas por QA supera el 15%
- Antes de un release o despliegue a producción
- Al hacer la revisión del sprint
- Command `/calidad` activado
- Cuando el semáforo de calidad cambia a AMARILLO o ROJO

---

## Protocolo de Ejecución

### Paso 1 — Leer estado de calidad

Fuentes en orden:
1. `{project_path}/metrics/calidad.md` — KPIs de calidad actuales
2. `{project_path}/data/backlog.md` — historias con defectos o devueltas por QA
3. `{project_path}/data/sprint-actual.md` — estado del sprint actual
4. `{project_path}/memory/historial.md` — tendencia de calidad reciente

---

### Paso 2 — Estrategia de QA por Ambiente

**Principio: Nunca llevar un bug a producción que podamos encontrar en DEV o QA.**

#### Pipeline de ambientes obligatorio para proyectos VortexBird

```
DEV → QA → UAT → PROD

DEV:   Desarrollador prueba su propio código
QA:    QA Engineer hace pruebas funcionales, regresión y exploratoria
UAT:   Cliente o PO valida los criterios de aceptación de negocio
PROD:  Despliegue con plan de rollback definido
```

**Regla:** No se puede pasar a un ambiente superior sin la aprobación del responsable del ambiente anterior.

---

### Paso 3 — Tipos de Pruebas y Responsables

| Tipo de Prueba | Quién | Cuándo | Herramientas |
|---|---|---|---|
| Pruebas unitarias | Desarrollador | Durante el desarrollo | JUnit, Jest, PyTest, etc. |
| Code Review | Otro desarrollador o Tech Lead | Antes de PR aprobado | GitHub/GitLab, SonarQube |
| Pruebas de integración | Desarrollador + QA | Antes de pasar a QA | Postman, REST Assured |
| Pruebas funcionales | QA Engineer | En ambiente QA | Manual + herramienta QA |
| Pruebas de regresión | QA Engineer | En cada sprint / antes de release | Manual + automatizadas |
| Pruebas de performance | QA / DevOps | Antes de UAT | JMeter, k6, Locust |
| Pruebas de seguridad | DevOps / QA | Antes de UAT | OWASP ZAP, SonarQube |
| UAT | PO / Cliente | En ambiente UAT | Manual |
| Smoke test | QA / DevOps | Post-despliegue a PROD | Automatizado si es posible |

---

### Paso 4 — Clasificación de Defectos

| Severidad | Definición | SLA de resolución |
|---|---|---|
| **Crítico** | El sistema no funciona — impide el uso | 24 horas |
| **Alto** | Funcionalidad clave afectada con workaround difícil | 48 horas |
| **Medio** | Funcionalidad afectada con workaround disponible | Próximo sprint |
| **Bajo** | Error visual, tipográfico o de UX menor | Próxima versión |

**Regla de release:**
- Defectos Críticos abiertos = 0 → obligatorio para release
- Defectos Altos abiertos = 0 → obligatorio para release a producción
- Defectos Medios = plan de corrección en siguiente release con fecha
- Defectos Bajos = aceptados con documentación formal

---

### Paso 5 — KPIs de Calidad

| KPI | Meta | Semáforo Verde | Semáforo Amarillo | Semáforo Rojo |
|---|---|---|---|---|
| Tasa de defectos (bugs/SP) | < 0.5 | < 0.5 | 0.5 - 1.0 | > 1.0 |
| Defectos críticos abiertos | 0 | 0 | 1-2 | > 2 |
| Defectos altos abiertos | ≤ 2 | 0-2 | 3-5 | > 5 |
| Cobertura pruebas unitarias | ≥ 80% | ≥ 80% | 60-79% | < 60% |
| Tasa de retrabajo | < 10% | < 10% | 10-20% | > 20% |
| Historias devueltas por QA | < 10% | < 10% | 10-20% | > 20% |
| Satisfacción cliente (CSAT) | ≥ 8/10 | ≥ 8 | 6-7 | < 6 |
| Defectos en producción post-release | 0 | 0 | 1-2 | > 2 |

---

### Paso 6 — Gate de Release

Antes de cada despliegue a producción, verificar el siguiente checklist:

**Gate Técnico:**
- [ ] Todos los tests unitarios pasando (cobertura ≥ meta)
- [ ] Todos los tests de integración pasando
- [ ] Code review completado en todos los PRs incluidos en el release
- [ ] SonarQube / análisis estático sin issues críticos o altos
- [ ] Tests de performance ejecutados y dentro de los límites acordados
- [ ] Tests de seguridad ejecutados sin vulnerabilidades altas/críticas

**Gate Funcional:**
- [ ] Todos los defectos críticos y altos cerrados
- [ ] Todas las historias del release validadas por QA
- [ ] UAT completado y firmado por PO/cliente
- [ ] Sin regresiones detectadas en funcionalidades previas

**Gate Operacional:**
- [ ] Plan de rollback documentado y validado
- [ ] Ventana de despliegue acordada (preferiblemente no viernes tarde)
- [ ] Equipo de soporte notificado
- [ ] Monitoreo y alertas configurados para el nuevo release
- [ ] Comunicación al cliente / usuarios finales enviada

**Gate de Negocio:**
- [ ] Aprobación formal del PO para el release
- [ ] Acta de aceptación del release generada
- [ ] Documentación de usuario actualizada (si aplica)

---

### Paso 7 — Análisis de Causa Raíz de Defectos (Pareto)

Cuando la tasa de defectos supera el umbral, analizar causas:

| Causa frecuente | Señal | Solución |
|---|---|---|
| Historias con criterios de aceptación ambiguos | Defectos por interpretación diferente | Reforzar DoR — criterios Gherkin |
| QA al final del sprint | Descubrir muchos bugs al final | QA integrado desde el día 1 del sprint |
| Falta de code review | PRs aprobados por el mismo autor | Política: todo PR requiere reviewer externo |
| Estimaciones muy optimistas | Código apresurado por falta de tiempo | Re-estimación, no presión de velocidad |
| Deuda técnica acumulada | Bugs en código antiguo sin tests | Reservar 20% de capacidad para tech debt |
| Ambiente DEV inestable | Errores de ambiente confundidos con bugs | Estabilizar ambientes antes del sprint |
| Regresiones frecuentes | Tests automáticos insuficientes | Invertir en automatización de regresión |

---

### Paso 8 — Plan de Mejora de Calidad

Si el semáforo de calidad es AMARILLO o ROJO:

1. **Diagnóstico** — Identificar la causa raíz dominante (Pareto de defectos)
2. **Acción inmediata** (dentro de la semana):
   - Detener el trabajo en historias nuevas si hay defectos críticos
   - Priorizar corrección de defectos altos y críticos sobre features
   - Convocar sesión de análisis de causa raíz con el equipo
3. **Acción estructural** (dentro del sprint):
   - Reforzar el proceso de DoR para historias
   - Agregar sesión de tres amigos (Dev + QA + PO) para historias complejas
   - Incorporar QA en el sprint planning para detectar riesgos de calidad temprano
4. **Acción de fondo** (próximos 2 sprints):
   - Plan de automatización de pruebas de regresión
   - Revisión de la cobertura de pruebas unitarias
   - Definir presupuesto de tech debt en cada sprint

---

### Paso 9 — Actualizar Archivos

- `{project_path}/metrics/calidad.md` — KPIs actualizados
- `{project_path}/memory/historial.md` — eventos de calidad registrados
- `{project_path}/memory/riesgo.md` — si se detectan riesgos de calidad nuevos
- `{project_path}/metrics/dashboard.md` — actualizar semáforo de calidad

---

## Formato de Reporte de Calidad

```
GATE DE CALIDAD — [PROYECTO] — [FECHA/SPRINT N]

ESTADO: [🟢 VERDE / 🟡 AMARILLO / 🔴 ROJO]

RESUMEN DE DEFECTOS
Defectos críticos abiertos: X (meta: 0)
Defectos altos abiertos: X (meta: ≤ 2)
Defectos medios abiertos: X
Total defectos sprint: X | Tasa: X.XX bugs/SP

MÉTRICAS DE CALIDAD
Cobertura unitaria: X% (meta: ≥ 80%)
Historias devueltas por QA: X (X%) (meta: < 10%)
Retrabajo: X% del esfuerzo (meta: < 10%)
CSAT cliente: X/10 (meta: ≥ 8)

DEFECTOS CRÍTICOS Y ALTOS ABIERTOS
| ID | Descripción | Severidad | Desde | Responsable | ETA |
|---|---|---|---|---|---|

ESTADO DE RELEASE
[✓ / ✗] Gate técnico
[✓ / ✗] Gate funcional
[✓ / ✗] Gate operacional
[✓ / ✗] Gate de negocio
DECISIÓN: [APROBADO / RECHAZADO / CONDICIONADO]

ALERTAS Y ACCIONES
[Lista de acciones con responsable y fecha]
```

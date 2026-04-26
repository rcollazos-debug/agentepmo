# ALCANCE DETALLADO DEL PROYECTO

> Documento que define con precisión qué está y qué no está incluido en el proyecto.
> Fuente de verdad para resolver disputas de alcance.
> Actualizar con cada Change Request (CR) aprobada.

---

## EDT / WBS — Work Breakdown Structure

### Nivel 1: Proyecto
**[Nombre del Proyecto]**

### Nivel 2: Fases

#### FASE 1: INICIO
- 1.1 Acta de constitución
- 1.2 Identificación de stakeholders
- 1.3 Kick-off del proyecto

#### FASE 2: PLANIFICACIÓN
- 2.1 Definición detallada del alcance
- 2.2 Construcción del backlog inicial
- 2.3 Plan de proyecto (cronograma, recursos, riesgos)
- 2.4 Arquitectura técnica

#### FASE 3: CONSTRUCCIÓN
- 3.1 [Módulo/Componente 1]
  - 3.1.1 [Sub-componente]
  - 3.1.2 [Sub-componente]
- 3.2 [Módulo/Componente 2]
  - 3.2.1 [Sub-componente]
- 3.3 Integraciones
- 3.4 Pruebas

#### FASE 4: ENTREGA
- 4.1 UAT con cliente
- 4.2 Correcciones post-UAT
- 4.3 Go-live / Despliegue a producción
- 4.4 Capacitación de usuarios

#### FASE 5: CIERRE
- 5.1 Documentación técnica final
- 5.2 Transferencia operativa
- 5.3 Lecciones aprendidas
- 5.4 Cierre administrativo

---

## Entregables por Módulo

### Módulo 1: [Nombre]

**Descripción:** [Descripción de qué hace este módulo]
**Criterios de aceptación:**
- [ ] [Criterio 1 — verificable y objetivo]
- [ ] [Criterio 2]
- [ ] [Criterio 3]
**Responsable:** [Nombre]
**Estimación:** [X SP / X horas]

---

### Módulo 2: [Nombre]

**Descripción:** [Descripción]
**Criterios de aceptación:**
- [ ] [Criterio 1]
- [ ] [Criterio 2]
**Responsable:** [Nombre]
**Estimación:** [X SP / X horas]

---

## Límites del Alcance

### QUÉ ESTÁ INCLUIDO (en alcance):
| # | Funcionalidad / Entregable | Módulo | Prioridad MoSCoW |
|---|---|---|---|
| 1 | [Descripción] | [Módulo] | Must |
| 2 | [Descripción] | [Módulo] | Should |
| 3 | [Descripción] | [Módulo] | Could |

### QUÉ NO ESTÁ INCLUIDO (fuera de alcance):
| # | Exclusión | Razón | Posible Fase 2 |
|---|---|---|---|
| 1 | [Descripción] | [Razón] | [Sí/No] |
| 2 | [Descripción] | [Razón] | [Sí/No] |

---

## Criterios de Aceptación Globales del Proyecto

El proyecto completo se considera aceptado cuando:
1. Todos los módulos "Must" están funcionales y aprobados por el cliente
2. Las pruebas de regresión pasan sin defectos críticos
3. El UAT es aprobado formalmente por el cliente
4. La documentación técnica está entregada
5. El sistema funciona en producción por 48 horas sin incidentes críticos

---

## Historial de Cambios de Alcance

| Versión | Fecha | CR | Descripción del cambio | Aprobado por |
|---|---|---|---|---|
| 1.0 | [fecha] | — | Alcance inicial | [Nombre] |
| 1.1 | [fecha] | CR-001 | [Descripción del cambio] | [Nombre] |

# RIESGOS INICIALES DEL PROYECTO

> Identificación de riesgos en la fase de inicio del proyecto.
> Estos riesgos se identifican antes de que comience la planificación detallada.
> Transferir al `risks/risk-register.md` con el análisis completo de scoring.

---

## Contexto

Este archivo captura los riesgos identificados en las primeras semanas del proyecto, durante el proceso de kick-off y planificación inicial. Sirve como punto de partida para el plan de riesgos formal.

---

## Riesgos Identificados en el Kick-off

### Riesgos Técnicos Iniciales

| ID | Descripción | Categoría | Probabilidad inicial | Impacto inicial | Responsable de análisis |
|---|---|---|---|---|---|
| RI-T01 | Tecnología nueva sin experiencia previa del equipo | Técnico | [Alta/Media/Baja] | [Alto/Medio/Bajo] | Tech Lead |
| RI-T02 | Integraciones con sistemas legacy del cliente sin documentación | Técnico | [Alta/Media/Baja] | [Alto/Medio/Bajo] | Tech Lead |
| RI-T03 | Requisitos de performance no validados en escala real | Técnico | Media | Alto | Tech Lead |
| RI-T04 | Sin ambiente de producción definido desde el inicio | Técnico | Media | Alto | DevOps |

### Riesgos de Alcance y Requisitos

| ID | Descripción | Categoría | Probabilidad inicial | Impacto inicial | Responsable |
|---|---|---|---|---|---|
| RI-A01 | Requisitos ambiguos o incompletos al inicio | Gestión | Alta | Alto | PM + PO |
| RI-A02 | Expectativas del cliente no alineadas con el alcance documentado | Interesados | Media | Alto | PM |
| RI-A03 | Cambios frecuentes de prioridad del cliente | Gestión | Media | Medio | PM |

### Riesgos de Recursos y Equipo

| ID | Descripción | Categoría | Probabilidad inicial | Impacto inicial | Responsable |
|---|---|---|---|---|---|
| RI-R01 | Disponibilidad del equipo menor a la planificada | Organizacional | Media | Alto | PM |
| RI-R02 | Dependencia en un solo recurso con conocimiento crítico | Organizacional | Media | Alto | PM |
| RI-R03 | Incorporación tardía de recursos clave | Organizacional | Baja | Alto | PM |

### Riesgos de Cronograma

| ID | Descripción | Categoría | Probabilidad inicial | Impacto inicial | Responsable |
|---|---|---|---|---|---|
| RI-C01 | Estimaciones optimistas sin buffer de contingencia | Gestión | Alta | Alto | PM |
| RI-C02 | Fecha de entrega fija con alcance sin negociar | Gestión | Media | Alto | PM |
| RI-C03 | Dependencias externas no controladas en ruta crítica | Externo | Media | Alto | PM |

### Riesgos de Stakeholders

| ID | Descripción | Categoría | Probabilidad inicial | Impacto inicial | Responsable |
|---|---|---|---|---|---|
| RI-S01 | Disponibilidad limitada del cliente para aprobaciones | Interesados | Media | Alto | PM |
| RI-S02 | Falta de soporte ejecutivo visible al proyecto | Interesados | Baja | Muy Alto | PM |
| RI-S03 | Resistencia al cambio de los usuarios finales | Interesados | Alta | Medio | PM |

---

## Checklist de Análisis Post-Kick-off

- [ ] Todos los riesgos iniciales transferidos al `risks/risk-register.md`
- [ ] Scoring completo (P × I) calculado para cada riesgo
- [ ] Dueño asignado para cada riesgo activo
- [ ] Plan de respuesta definido para riesgos Altos y Críticos
- [ ] Reserva de contingencia calculada
- [ ] Disparadores (triggers) definidos para los top 5 riesgos

---

## Fecha de identificación inicial: [Fecha]
## Próxima revisión formal de riesgos: [Fecha]

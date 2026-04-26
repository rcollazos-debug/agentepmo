# REGISTRO DE RIESGOS — Risk Register

> Documento central de gestión de riesgos del proyecto.
> Actualizar con cada revisión de riesgos o cuando ocurra un evento relevante.
> Proyecto: **Ciudad UAO**
> Actualizado: 15 de abril de 2026

---

## Instrucciones de uso

- **ID:** formato R-NNN (R-001, R-002...)
- **Probabilidad:** 0.10 / 0.25 / 0.50 / 0.75 / 0.90
- **Impacto:** 0.05 / 0.10 / 0.20 / 0.40 / 0.80
- **Score:** P × I
- **Nivel:** Crítico (≥0.40) / Alto (0.20-0.39) / Medio (0.08-0.19) / Bajo (<0.08)
- **Estado:** Activo / Materializado / Cerrado / Monitoreo pasivo

---

## Registro de Riesgos

*Análisis formal realizado en Risk Workshop*

| ID | Descripción | Categoría | P | I | Score | Nivel | Estrategia | Dueño | Respuesta | Disparador | Estado | Última revisión |
|---|---|---|---|---|---|---|---|---|---|---|---|---|
| R-001 | Retraso en entrega de requerimientos por parte del cliente | Gestión | 0.75 | 0.40 | **0.30** | Alto | Mitigar | Raul Collazos (PO) | Compromiso formal del cliente con fechas de entrega de reqs | Más de 3 días de retraso en entrega de reqs | Activo | 15-abr-2026 |
| R-002 | Alcance ambiguo o cambiante | Alcance | 0.50 | 0.40 | 0.20 | Alto | Mitigar | Monge (PM) | Control de cambios formal, sign-off de requisitos | Cambios > 2 por semana | Activo | 15-abr-2026 |
| R-003 | Disponibilidad limitada del equipo | Recursos | 0.25 | 0.40 | 0.10 | Medio | Aceptar | Monge (PM) | Monitoreo de capacidad, buffer en estimación | Equipo < 4 personas por > 1 semana | Activo | 15-abr-2026 |
| R-004 | Retraso en decisiones técnicas | Técnico | 0.25 | 0.20 | 0.05 | Bajo | Mitigar | Camilo José Delgado (Tech Lead) | Decisiones técnicas priorizadas en planning | Decisión > 2 días sin respuesta | Activo | 15-abr-2026 |
| R-005 | Deuda técnica por presión de cronograma | Técnico | 0.25 | 0.20 | 0.05 | Bajo | Mitigar | Camilo José Delgado (Tech Lead) | Definition of Done con estándares de calidad | Deuda técnica > 20% del código | Monitoreo pasivo | 15-abr-2026 |

---

## Registro de Riesgos Materializados (Incidentes)

*Sin incidentes registrados*

---

## Historial de cambios al registro

| Fecha | Cambio realizado | Autor |
|---|---|---|
| 15-abr-2026 | Registro inicial creado con riesgos potenciales | Configuración |
| 15-abr-2026 | Risk Workshop completado. Riesgos identificados y evaluados | PM |

---

## Notas de la última revisión

- Fecha de última revisión completa: 15-abril-2026
- Próxima revisión programada: 01-may-2026
- Revisado por: PM
- Observaciones: Risk Workshop completado. Principal riesgo identificado: retrasos en entrega de requerimientos por parte del cliente.

---

## Recomendaciones para Risk Workshop

1. Convocar sesión en primera semana de mayo
2. Invitar: PM, Tech Lead, representantes del equipo
3. Usar técnica de brainstorming por categorías PMBOK
4. Priorizar con matriz P x I
5. Definir dueño y respuesta para cada riesgo
6. Establecer disparadores y frecuencia de revisión

# RESTRICCIONES Y SUPUESTOS DEL PROYECTO

> Restricciones: condiciones que limitan las opciones del proyecto y no son negociables.
> Supuestos: condiciones asumidas como verdaderas para la planificación.
> Proyecto: **Ciudad UAO**
> Última actualización: 18 de abril de 2026

---

## Restricciones del Proyecto

### Restricciones de Tiempo

| ID | Restricción | Descripción | Flexibilidad | Impacto si se viola |
|---|---|---|---|---|
| RT-001 | Fecha de entrega inamovible | 31 de agosto de 2026 | Ninguna | Incumplimiento académico |
| RT-002 | Fecha inicio oficial | 18 de abril de 2026 | Ninguna | Desfase en cronograma |
| RT-003 | Hito MVP | 30 de junio de 2026 | Limitada (7 días) | Retraso en UAT |

### Restricciones de Costo

| ID | Restricción | Descripción | Flexibilidad | Impacto si se viola |
|---|---|---|---|---|
| RC-001 | Presupuesto máximo aprobado | $20,000 USD | Requiere comité | Impacto en margen del proyecto |
| RC-002 | Reserva de contingencia | 10% ($2,000) | Limitada | Reducción de buffer para riesgos |
| RC-003 | Reserva de gestión | 5% ($1,000) | Ninguna | Sin margen para riesgos desconocidos |

### Restricciones de Alcance

| ID | Restricción | Descripción |
|---|---|---|
| RA-001 | Funcionalidades fuera de alcance | Por definir con el cliente |
| RA-002 | Tecnologías mandatorias | Java Spring Boot (backend), Angular (frontend) |
| RA-003 | Arquitectura | Por definir |

### Restricciones de Calidad

| ID | Restricción | Descripción | Umbral |
|---|---|---|---|
| RQ-001 | Cobertura de pruebas | Mínimo de coverage en unit tests | > 70% |
| RQ-002 | Defectos críticos en producción | Cero defectos críticos | 0 |
| RQ-003 | Tiempo de respuesta | Páginas principales | < 3 segundos |

### Restricciones de Recursos

| ID | Restricción | Descripción |
|---|---|---|
| RR-001 | Tamaño del equipo | Por definir |
| RR-002 | Metodología | Híbrido (Scrum + Kanban) |

---

## Supuestos del Proyecto

> Completar y verificar periódicamente. Cada supuesto invalidado es un riesgo que se materializa.

### Supuestos Clave

| ID | Supuesto | Estado | Impacto si se invalida |
|---|---|---|---|
| SUP-001 | El equipo de desarrollo estará disponible durante toda la ejecución | Vigente | Alto — afecta capacidad y cronograma |
| SUP-002 | El cliente (UAO) dispondrá de tiempo para aprobaciones en el plazo acordado | Vigente | Alto — bloqueo en decisiones clave |
| SUP-003 | Los requisitos académicos son suficientemente estables | Vigente | Alto — scope creep o retrabajo |
| SUP-004 | Java Spring Boot y Angular soportan los requisitos funcionales | Vigente | Alto — replanning técnico |
| SUP-005 | El presupuesto $20,000 USD es suficiente para el alcance definido | Vigente | Alto — impacto financiero |
| SUP-006 | Infraestructura (Cloud/On-prem) estará disponible a tiempo | Vigente | Medio — retraso en despliegues |
| SUP-007 | Cliente proveerá acceso a sistemas para integraciones | Pendiente definir | Medio — impacto en integraciones |

---

## Dependencias Externas Críticas

| Dependencia | Proveedor / Equipo | Fecha requerida | Impacto si falla | Dueño de seguimiento |
|---|---|---|---|---|
| Acceso a sistemas del cliente | Cliente | 01-jun-2026 | Bloqueo en integraciones | PM |
| Decisión de arquitectura | Tech Lead + Cliente | 15-may-2026 | Retraso en desarrollo | Tech Lead |

---

## Protocolo para cambios en restricciones

Si una restricción cambia:
1. Documentar la nueva restricción en este archivo
2. Evaluar el impacto en el plan actual
3. Emitir CR si el cambio tiene impacto significativo
4. Actualizar `memory/decisiones.md` con el cambio
5. Comunicar a los interesados afectados

Si una restricción se viola:
1. Activar alerta al sponsor de inmediato
2. Analizar causa y opciones de corrección
3. Convocar comité de emergencia si el impacto es mayor

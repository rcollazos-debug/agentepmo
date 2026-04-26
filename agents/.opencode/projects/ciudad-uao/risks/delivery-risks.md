# RIESGOS DE ENTREGA

> Catálogo de riesgos que impactan directamente la capacidad de entregar el proyecto en tiempo, costo y con el alcance comprometido.

---

## Categorías de riesgo de entrega

### 1. Cronograma

| ID | Riesgo | Señales de alerta | Respuesta sugerida |
|---|---|---|---|
| RD-001 | Estimaciones optimistas sin buffer de contingencia | SPI < 0.90 en las primeras semanas | Reestimar con técnica PERT + buffer explícito aprobado |
| RD-002 | Ruta crítica con múltiples puntos de fallo | Más de 3 tareas en ruta crítica sin holgura | Identificar y proteger los cuellos de botella |
| RD-003 | Dependencias externas no controladas en ruta crítica | Retrasos frecuentes de terceros o de otro equipo | Gestión proactiva de dependencias + plan alternativo |
| RD-004 | Velocidad del equipo inconsistente | Variación > 30% entre sprints consecutivos | Investigar causas + estabilizar capacidad |

### 2. Alcance

| ID | Riesgo | Señales de alerta | Respuesta sugerida |
|---|---|---|---|
| RD-010 | Scope creep no controlado | Backlog crece sin cambiar la fecha | Proceso de CR obligatorio + revisión del backlog mensual |
| RD-011 | Requisitos ambiguos que generan retrabajo | Historias devueltas por QA o cliente por incumplir expectativas | Refinamiento detallado antes de comprometer al sprint |
| RD-012 | Cambios de prioridad frecuentes del cliente | El backlog reordenado en cada sprint planning | SLA de estabilidad del backlog + costo de cambio de prioridad |

### 3. Recursos y Equipo

| ID | Riesgo | Señales de alerta | Respuesta sugerida |
|---|---|---|---|
| RD-020 | Pérdida de un recurso clave (key man risk) | Persona única con conocimiento crítico | Documentación del conocimiento + pair programming + cross-training |
| RD-021 | Sobreutilización del equipo (burnout) | Overtime constante, moral baja, errores frecuentes | Monitorear utilización + redistribuir carga + respetar capacidad real |
| RD-022 | Skill gap: perfil técnico insuficiente para la tecnología | Tareas que toman 3x más de lo estimado | Capacitación, pair con experto, o reemplazo del perfil |
| RD-023 | Rotación de equipo durante el proyecto | Salida de personas sin plan de sucesión | Plan de retención + documentación de conocimiento |

### 4. Calidad y QA

| ID | Riesgo | Señales de alerta | Respuesta sugerida |
|---|---|---|---|
| RD-030 | UAT mal gestionado o tardío | El cliente aprueba en los últimos días con sorpresas | Involucrar al cliente en demos frecuentes durante el sprint |
| RD-031 | Criterios de aceptación no definidos antes del desarrollo | Historias completadas pero rechazadas por el cliente | DoD incluye criterios de aceptación firmados antes del sprint |
| RD-032 | Sin pruebas de regresión → cada release introduce regresiones | Bugs en producción en funcionalidad previamente probada | Automatización de pruebas de regresión |

### 5. Release y Despliegue

| ID | Riesgo | Señales de alerta | Respuesta sugerida |
|---|---|---|---|
| RD-040 | Sin plan de rollback para el release | Fallo en producción sin posibilidad de revertir | Definir y probar el rollback antes de cada release |
| RD-041 | Ambiente de producción diferente al de pruebas | Fallos post-deploy inexplicables | IaC + paridad de ambientes |
| RD-042 | Ventana de deploy demasiado corta | Deploy incompleto o fallido por tiempo | Negociar ventana adecuada + automatizar el proceso |
| RD-043 | Sin monitoreo post-release | Problemas no detectados hasta que el usuario reporta | Alertas automáticas + monitoreo activo las primeras 24h |

---

## Umbrales de alerta de entrega

| Indicador | Verde | Amarillo | Rojo |
|---|---|---|---|
| SPI | >= 0.95 | 0.85-0.94 | < 0.85 |
| Hitos vencidos | 0 | 1 menor | 1+ crítico o 2+ menores |
| Historias devueltas por QA | < 10% | 10-20% | > 20% |
| Velocidad del equipo (vs promedio) | ±10% | -10% a -25% | < -25% |
| Defectos críticos abiertos | 0 | 1-2 | > 2 |

---

## Protocolo de respuesta ante riesgo de entrega materializado

1. Identificar el impacto exacto en la fecha de entrega
2. Activar el skill `cronograma-control` para análisis de opciones
3. Si el impacto es > 5 días: comunicar al cliente y sponsor dentro de 24h
4. Si el impacto compromete la fecha final: activar playbook `atraso-cronograma` o `recuperacion-proyecto`

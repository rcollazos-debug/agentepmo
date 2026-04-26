# RIESGOS DE INTERESADOS

> Catálogo de riesgos relacionados con stakeholders, clientes, usuarios y la organización que pueden impactar el proyecto.

---

## Categorías de riesgo de interesados

### 1. Cliente y Sponsor

| ID | Riesgo | Señales de alerta | Respuesta sugerida |
|---|---|---|---|
| RS-001 | Cliente no disponible para aprobaciones críticas | Respuestas tardías, reuniones canceladas | SLA de respuesta en plan de comunicaciones + contacto alterno definido |
| RS-002 | Cambio de interlocutor del cliente durante el proyecto | Nueva persona sin contexto del proyecto | Plan de onboarding del nuevo contacto + documentación actualizada |
| RS-003 | Sponsor pierde interés o soporte al proyecto | Ausencias en comités, sin seguimiento | Gestión proactiva del sponsor + alineación con sus KPIs |
| RS-004 | Cliente con expectativas no alineadas a lo documentado | Sorpresas en demos o en UAT | Demos frecuentes + acta de cada reunión con confirmación de expectativas |
| RS-005 | Presión del cliente para acelerar a costa de calidad | Solicitudes de "saltarse" pruebas o etapas | Comunicar el riesgo de calidad y documentar la decisión del cliente |

### 2. Usuarios Finales

| ID | Riesgo | Señales de alerta | Respuesta sugerida |
|---|---|---|---|
| RS-010 | Resistencia al cambio de los usuarios finales | Quejas, baja adopción, sabotaje pasivo | Plan de gestión del cambio + capacitación + quick wins visibles |
| RS-011 | Usuarios finales no involucrados en validación | UAT fallido porque usuarios no estaban en el proceso | Incluir representantes de usuarios en demos y revisiones desde el inicio |
| RS-012 | Expectativas de los usuarios superiores a las del cliente | El cliente aprueba pero los usuarios rechazan | Involucrar usuarios finales en el proceso de validación, no solo al cliente |

### 3. Organización Interna

| ID | Riesgo | Señales de alerta | Respuesta sugerida |
|---|---|---|---|
| RS-020 | Conflicto de prioridades entre áreas del cliente | Instrucciones contradictorias al equipo | Activar playbook `conflicto-stakeholders`, definir interlocutor único |
| RS-021 | Cambio de prioridades organizacionales que afectan el proyecto | Recursos reasignados, presupuesto cuestionado | Alineación periódica del proyecto con la estrategia organizacional |
| RS-022 | Falta de soporte político al proyecto | Sin aliados en la organización del cliente | Identificar y cultivar campeones internos |

### 4. Regulatorio y Legal

| ID | Riesgo | Señales de alerta | Respuesta sugerida |
|---|---|---|---|
| RS-030 | Cambio regulatorio que afecta los requisitos del sistema | Nueva ley, norma o regulación durante el proyecto | Monitoreo del entorno regulatorio + cláusula de cambio regulatorio en contrato |
| RS-031 | Incumplimiento de protección de datos (GDPR, LGPD, etc.) | Datos personales sin gestión adecuada | Auditoría de privacidad + privacy by design desde el inicio |
| RS-032 | Disputas contractuales | Desacuerdo sobre el alcance o los entregables | Contrato claro + gestión documental rigurosa + asesoría legal disponible |

---

## Mapa de posición de stakeholders

| Stakeholder | Poder | Interés | Posición actual | Posición deseada | Riesgo identificado | Estrategia |
|---|---|---|---|---|---|---|
| [Nombre] | Alto/Medio/Bajo | Alto/Medio/Bajo | Defensor/Neutral/Resistente | [Posición deseada] | RS-XXX | [Estrategia] |

---

## Indicadores de alerta de stakeholders

- Tiempo promedio de respuesta del cliente > 3 días hábiles
- Ausencias a reuniones > 2 veces consecutivas
- Cambio de tono o lenguaje en comunicaciones (más formal, más distante)
- Escalación sin previo aviso al PM
- Queja del usuario final que llegó por canal no oficial

---

## Protocolo de revisión

Frecuencia: mensual o después de cada evento de stakeholders significativo
Herramienta: actualizar `context/stakeholders.md` con los cambios detectados
Responsable: PM con input del equipo que tiene contacto directo con el cliente

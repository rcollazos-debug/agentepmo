# RIESGOS DE PROVEEDORES

> Catálogo de riesgos asociados a terceros, vendors y proveedores externos que participan en el proyecto.

---

## Registro de proveedores del proyecto

| ID | Proveedor | Servicio | Criticidad | Contractual | Contacto | Nivel de riesgo |
|---|---|---|---|---|---|---|
| V-001 | [Nombre] | [Servicio que provee] | [Alta/Media/Baja] | [Sí/No] | [Nombre y contacto] | [Alto/Medio/Bajo] |

---

## Categorías de riesgo de proveedores

### 1. Incumplimiento de Entrega

| ID | Riesgo | Señales de alerta | Respuesta sugerida |
|---|---|---|---|
| RV-001 | Proveedor no entrega en la fecha comprometida | Retrasos menores frecuentes, comunicación evasiva | Check-ins semanales + puntos de control formales en el contrato |
| RV-002 | Calidad del entregable del proveedor no cumple estándares | Primera entrega rechazada por defectos | Criterios de aceptación detallados en el contrato + revisión previa a la entrega |
| RV-003 | Cambio de equipo del proveedor sin notificación | Nuevo interlocutor sin contexto, calidad degradada | Cláusula de continuidad de equipo + onboarding documentado |

### 2. Capacidad y Disponibilidad

| ID | Riesgo | Señales de alerta | Respuesta sugerida |
|---|---|---|---|
| RV-010 | Proveedor sobrecargado con múltiples clientes | Respuestas lentas, retrasos repetidos | Confirmar la dedicación del equipo antes de firmar + SLA de respuesta |
| RV-011 | Proveedor sin la capacidad técnica real prometida | Entregables de baja calidad, preguntas básicas frecuentes | Due diligence técnico antes de contratar + entregable de prueba |
| RV-012 | Riesgo de quiebra o cierre del proveedor | Señales financieras negativas, rotación alta del proveedor | Cláusula de escrow de código + evaluar solidez financiera del vendor |

### 3. Dependencia Tecnológica

| ID | Riesgo | Señales de alerta | Respuesta sugerida |
|---|---|---|---|
| RV-020 | Vendor lock-in con proveedor de infraestructura/plataforma | Migración costosa o imposible | Arquitectura portable + cláusulas de portabilidad |
| RV-021 | SaaS de tercero sin disponibilidad garantizada | Outages frecuentes del servicio externo | SLA contractual + plan de contingencia si el SaaS cae |
| RV-022 | API de tercero discontinuada o cambiada sin aviso | Anuncio de deprecación, breaking changes | Monitoreo de changelogs + versión fija en dependencias |

### 4. Contractual y Legal

| ID | Riesgo | Señales de alerta | Respuesta sugerida |
|---|---|---|---|
| RV-030 | Contrato sin penalizaciones por incumplimiento | Sin incentivo del proveedor para cumplir | Negociar SLAs con penalizaciones y bonos por desempeño |
| RV-031 | Propiedad intelectual del código del proveedor no transferida | Código que no puede ser modificado sin el proveedor | Cláusula de transferencia de IP en el contrato |
| RV-032 | Datos del proyecto compartidos con el proveedor sin NDA | Fuga de información confidencial | NDA firmado antes de iniciar + minimizar datos sensibles compartidos |

---

## Protocolo de gestión de proveedores en riesgo

1. **Monitoreo mensual:** revisar cumplimiento de cada proveedor vs. compromisos
2. **Primer incumplimiento:** contacto formal con registro escrito
3. **Segundo incumplimiento:** reunión de escalación con el proveedor
4. **Tercer incumplimiento:** activar cláusula contractual + buscar alternativa
5. **Proveedor crítico en crisis:** activar playbook `proveedor-incumplido`

---

## Proveedores alternativos identificados (contingencia)

| Servicio | Proveedor actual | Alternativa 1 | Alternativa 2 | Tiempo de switching |
|---|---|---|---|---|
| [Servicio] | [Nombre] | [Nombre] | [Nombre] | [X días] |

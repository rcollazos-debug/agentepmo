# PLAN DE GESTION DEL PROYECTO

## WO0000000358906 - Utilizaciones de Cupos

> Version: 1.0
> Fecha: 20-abr-2026
> Proyecto: utilcupos
> PM: Valeria Rivera Rico

---

## 1. Informacion General

| Campo | Valor |
|---|---|
| Proyecto | WO0000000358906 - Utilizaciones de Cupos |
| Codigo | utilcupos |
| Cliente | Bancoomeva |
| Organizacion ejecutora | VortexBird |
| Gerente de Proyecto | Valeria Rivera Rico |
| Soporte PM | Raul Collazos Castillo |
| Product Owner VortexBird | Ingrid Y. Mosquera |
| Product Owner cliente | Adriana Muñoz Ñañez |
| Patrocinador del frente | Keilly Barona |
| Fecha de inicio | 20-abr-2026 |
| Fecha compromiso | 14-may-2026 |
| Duracion comprometida | 1 mes |
| Semaforo inicial | Amarillo |
| Presupuesto | No aplica para la gestion operativa del proyecto |

---

## 2. Proposito del Proyecto

Implementar el modulo de Utilizacion de Cupos para Bancoomeva con foco inmediato en la entrega del servicio `utilizarCuposOrq` y el desarrollo paralelo de las historias funcionales priorizadas que afectan directamente la solucion al cliente.

---

## 3. Objetivos de Gestion

1. Cumplir la fecha compromiso del `14-may-2026`.
2. Entregar `utilizarCuposOrq` sin mediacion como primer entregable critico.
3. Coordinar el desarrollo paralelo de `HU-BCO-004` a `HU-BCO-015`.
4. Habilitar la entrada de QA despues del cierre del bloque funcional comprometido para el `04-may-2026`.
5. Mantener control visible sobre dependencias del cliente e Interoperabilidad.

---

## 4. Alcance de Gestion

### Incluido en la prioridad inmediata

- Gestion de entrega del servicio `utilizarCuposOrq`.
- Gestion del desarrollo de `HU-BCO-004` a `HU-BCO-015`.
- Coordinacion de QA posterior al cierre de desarrollo.
- Seguimiento de dependencias abiertas del cliente.
- Monitoreo de cambios tecnicos asociados a `CrearPrestamoORQ V4 CC4`.

### Excluido de la prioridad inmediata

- Historias de la Epica 1.
- La mediacion del servicio `utilizarCupos`.

Nota: La solicitud formal de la mediacion `utilizarCupos` debe ser gestionada por el frente banca con la celula de Interoperabilidad Bancoomeva y no hace parte del alcance del proyecto.

---

## 5. Gobierno del Proyecto

| Tema | Responsable |
|---|---|
| Direccion del proyecto | Valeria Rivera Rico |
| Soporte PM | Raul Collazos Castillo |
| Aprobaciones funcionales | Adriana Muñoz Ñañez |
| Aprobaciones tecnicas | Diana Carolina Restrepo |
| Priorizacion | Adriana Muñoz Ñañez y Monica Araque |
| Patrocinio del frente | Keilly Barona |

### Mecanismo de decision

1. Las definiciones funcionales se validan con Adriana Muñoz Ñañez.
2. Las definiciones tecnicas se validan con Diana Carolina Restrepo.
3. La priorizacion del backlog se ajusta con Adriana Muñoz Ñañez y Monica Araque.
4. Los riesgos o bloqueos mayores se escalan por PM hacia sponsor del frente y actores tecnicos correspondientes.

---

## 6. Estructura del Equipo

| Nombre | Rol | Dedicacion |
|---|---|---|
| Valeria Rivera Rico | Gerente de Proyecto | 4 horas diarias |
| Raul Collazos Castillo | Soporte PM | Bajo demanda |
| Ingrid Y. Mosquera | Product Owner VortexBird | Bajo demanda segun dudas funcionales |
| Christian Ospina | Arquitecto de Soluciones | Por definir |
| Sebastian Garcia | Apoyo de Arquitectura | Por definir |
| Jurgen Sanclemente | Desarrollo / Orquestacion | 100% en `utilizarCuposOrq` |
| Sebastian Caicedo | Desarrollo funcional | 100% |
| David Velazco | Desarrollo funcional | 100% |
| Kathereen Gonzalez | QA | 100% despues de finalizar desarrollo |

---

## 7. Estrategia de Ejecucion

### Frente 1: Orquestacion

- Responsable principal: Jurgen Sanclemente.
- Entregable critico: `utilizarCuposOrq` sin mediacion.
- Fecha objetivo inmediata: lunes de la proxima semana.

### Frente 2: Desarrollo funcional

- Responsables: Sebastian Caicedo y David Velazco.
- Historias objetivo: `HU-BCO-004` a `HU-BCO-015`.
- Compromiso del equipo: entrega el `04-may-2026` para habilitar QA.

### Frente 3: QA

- Responsable: Kathereen Gonzalez.
- Inicio: una vez finalice el bloque de desarrollo comprometido.
- Objetivo: validar funcionalidad priorizada antes de la fecha compromiso del proyecto.

---

## 8. Cronograma Base de Gestion

| Hito | Fecha | Estado |
|---|---|---|
| Inicio oficial del proyecto | 20-abr-2026 | Confirmado |
| Entrega `utilizarCuposOrq` sin mediacion | 27-abr-2026 | Compromiso inmediato |
| Entrega funcional Sebastian y David | 04-may-2026 | Comprometido |
| Inicio QA | 04-may-2026 o siguiente dia habil | Planeado |
| Fecha compromiso del proyecto | 14-may-2026 | Baseline formal |

### Calendario no laborable

- 01-may-2026
- 18-may-2026
- 08-jun-2026
- 15-jun-2026
- 29-jun-2026

---

## 9. Gestion del Alcance y Priorizacion

- La Epica 1 queda fuera de la prioridad inmediata.
- Se priorizan historias que impactan funcionalmente la solucion del cliente.
- No hay HUs exclusivamente de backend; el frente de orquestacion debe participar transversalmente en las historias priorizadas, excepto `HU-BCO-003` y `HU3 NoFuncional`.
- Todo cambio nuevo que afecte integraciones, cronograma o exclusiones debe registrarse como cambio formal.

---

## 10. Gestion de Dependencias

| ID | Dependencia | Dueño | Estado |
|---|---|---|---|
| DEP-001 | API `consultarCotizacionMoneda` para conversion del campo codigo moneda | Bancoomeva | Pendiente cliente |
| DEP-002 | Contrato del servicio `orquestadorDeTransacciones` llamado por `UtilizacionCuposOrq` | Bancoomeva | Pendiente cliente |
| DEP-003 | Detalle tecnico del cambio `CC4` sobre `CrearPrestamoORQ V4` | Interoperabilidad / Bancoomeva | Pendiente analisis |
| DEP-004 | Solicitud formal de la mediacion `utilizarCupos` a Interoperabilidad | Frente banca Bancoomeva | Pendiente |

### Regla de gestion

Toda dependencia abierta debe tener seguimiento visible en los reportes de estado y escalarse si afecta la ruta critica.

---

## 11. Gestion de Riesgos

| Riesgo | Descripcion | Respuesta |
|---|---|---|
| R-001 | Dependencias externas del cliente no liberadas a tiempo | Escalar y hacer seguimiento diario hasta liberacion |
| R-002 | Cambio `CC4` sin detalle suficiente | Solicitar definicion tecnica y evaluar impacto inmediato |
| R-003 | Presion de cronograma por ventana corta | Foco estricto en alcance priorizado y exclusiones claras |
| R-004 | Inicio tardio de QA por retraso en desarrollo | Monitoreo diario de hitos del 27-abr y 04-may |

---

## 12. Gestion de Comunicaciones

| Comunicacion | Frecuencia | Audiencia | Responsable |
|---|---|---|---|
| Seguimiento operativo | Diario | Equipo VortexBird | Valeria Rivera Rico |
| Aclaraciones funcionales | Bajo demanda | Equipo + Adriana Muñoz Ñañez | Ingrid Y. Mosquera / PM |
| Revision de prioridades | Segun necesidad | Bancoomeva | Adriana Muñoz Ñañez y Monica Araque |
| Escalacion de bloqueos | Inmediata | Sponsor del frente / tecnicos | PM |
| Reporte de estado | Semanal o segun corte | Cliente y VortexBird | PM |

---

## 13. Gestion de Calidad

- QA inicia cuando finalice el desarrollo comprometido.
- Se debe validar el frente de orquestacion y el frente funcional antes de cierre.
- Los defectos bloqueantes deben resolverse antes de declarar lista la entrega.
- Los cambios de integracion no documentados no se aceptan sin validacion tecnica.

---

## 14. Criterios de Exito

1. `utilizarCuposOrq` entregado sin mediacion en la fecha comprometida.
2. Bloque funcional de Sebastian y David entregado el `04-may-2026`.
3. QA ejecutado oportunamente.
4. Dependencias externas controladas y escaladas.
5. Proyecto listo para el `14-may-2026` dentro del alcance acordado.

---

## 15. Proximas Acciones Inmediatas

| # | Accion | Responsable | Fecha |
|---|---|---|---|
| 1 | Entregar `utilizarCuposOrq` sin mediacion | Jurgen Sanclemente | 27-abr-2026 |
| 2 | Confirmar disponibilidad de `consultarCotizacionMoneda` | Bancoomeva | Inmediata |
| 3 | Recibir contrato de `orquestadorDeTransacciones` | Bancoomeva | Inmediata |
| 4 | Obtener detalle del `CC4` | Interoperabilidad / Bancoomeva | Inmediata |
| 5 | Entregar bloque funcional priorizado | Sebastian Caicedo / David Velazco | 04-may-2026 |
| 6 | Iniciar QA | Kathereen Gonzalez | 04-may-2026 o siguiente habil |

---

## 16. Control de Versiones

| Version | Fecha | Cambio | Autor |
|---|---|---|---|
| 1.0 | 20-abr-2026 | Creacion inicial del plan de gestion del proyecto | OpenCode |

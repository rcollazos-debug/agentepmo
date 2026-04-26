# KICKOFF MEETING
## WO0000000358906 - Utilizaciones de Cupos

---

## Bienvenida

**Proyecto:** WO0000000358906 - Utilizaciones de Cupos  
**Cliente:** Bancoomeva  
**Fecha de kickoff:** 20-abr-2026  
**Project Manager:** Valeria Rivera Rico  

---

## Objetivo de la sesion

- Alinear alcance, prioridades y responsables del proyecto.
- Confirmar la estrategia de entrega temprana del servicio `utilizarCuposOrq`.
- Visibilizar exclusiones de alcance, dependencias externas y compromiso de fechas.

---

## Contexto del proyecto

El proyecto busca implementar el modulo de Utilizacion de Cupos para Bancoomeva, permitiendo validar cliente, consultar cupos disponibles, gestionar desembolsos y ejecutar la operacion final con trazabilidad operativa e integracion corporativa.

---

## Equipo clave

| Rol | Nombre |
|---|---|
| Gerente de Proyecto | Valeria Rivera Rico |
| Soporte PM | Raul Collazos Castillo |
| Product Owner VortexBird | Ingrid Y. Mosquera |
| Product Owner cliente / Analista funcional | Adriana Muñoz Ñañez |
| Patrocinador del frente | Keilly Barona |
| Arquitecto de Soluciones | Christian Ospina |
| Apoyo de Arquitectura | Sebastian Garcia |
| Desarrollador | Sebastian Caicedo |
| Desarrollador | David Velazco |
| Desarrollador | Jurgen Sanclemente |
| QA | Kathereen Gonzalez |

---

## Gobierno y aprobaciones

| Tema | Responsable |
|---|---|
| Aprobaciones funcionales | Adriana Muñoz Ñañez |
| Aprobaciones tecnicas | Diana Carolina Restrepo |
| Priorizacion | Adriana Muñoz Ñañez y Monica Araque |

---

## Alcance priorizado

### Incluye en la prioridad inmediata

- Servicio `utilizarCuposOrq` como frente critico de entrega.
- Historias funcionales `HU-BCO-004` a `HU-BCO-015`.
- Trabajo paralelo del equipo funcional para adelantar impacto visible al cliente.

### No incluye en esta primera prioridad

- Historias de la Epica 1.
- La mediacion del servicio `utilizarCupos`, la cual no hace parte del alcance del proyecto actual.

---

## Mensajes clave del kickoff

### 1. Entrega inmediata comprometida

Se debe entregar el servicio `utilizarCuposOrq` sin la mediacion el lunes de la proxima semana.

### 2. Exclusiones de alcance

El equipo del frente banca debe realizar la solicitud formal de la mediacion del servicio `utilizarCupos` a la celula de Interoperabilidad de Bancoomeva.

La mediacion no hace parte del alcance del proyecto actual de VortexBird.

### 3. Compromiso interno de desarrollo

Sebastian Caicedo y David Velazco se comprometieron a entregar su parte el `04-may-2026` para habilitar el inicio de pruebas de QA.

---

## Distribucion del trabajo

| Frente | Responsable | Enfoque |
|---|---|---|
| Orquestacion | Jurgen Sanclemente | Servicio `utilizarCuposOrq` |
| Funcional | Sebastian Caicedo | HUs `HU-BCO-004` a `HU-BCO-015` |
| Funcional | David Velazco | HUs `HU-BCO-004` a `HU-BCO-015` |
| QA | Kathereen Gonzalez | Inicia al 100% una vez termine el desarrollo |
| Soporte funcional | Ingrid Y. Mosquera | Bajo demanda cuando el equipo requiera claridad funcional |

---

## Cronograma ejecutivo

| Hito | Fecha | Observacion |
|---|---|---|
| Inicio oficial del proyecto | 20-abr-2026 | Confirmado |
| Entrega de `utilizarCuposOrq` sin mediacion | 27-abr-2026 | Compromiso inmediato |
| Entrega funcional de Sebastian y David | 04-may-2026 | Habilita inicio de QA |
| Inicio de QA | 04-may-2026 o siguiente dia habil | Sujeto a cierre de desarrollo |
| Fecha compromiso del proyecto | 14-may-2026 | Baseline formal actual |

---

## Restricciones y dependencias

### Restricciones

- El proyecto tiene una ventana de entrega de 1 mes.
- Se deben considerar como no laborables: 01-may-2026, 18-may-2026, 08-jun-2026, 15-jun-2026 y 29-jun-2026.
- No se gestionara presupuesto operativo para este proyecto.

### Dependencias externas abiertas

- API `consultarCotizacionMoneda` para conversion del campo codigo moneda.
- Contrato del servicio `orquestadorDeTransacciones` usado por `UtilizacionCuposOrq`.
- Detalle tecnico del control de cambios `CC4` sobre `CrearPrestamoORQ V4`.
- Solicitud formal de la mediacion `utilizarCupos` por parte del frente banca a Interoperabilidad.

---

## Riesgos clave

| Riesgo | Impacto |
|---|---|
| Retraso en dependencias externas del cliente | Puede bloquear integraciones y pruebas |
| Cambio `CC4` sin detalle tecnico suficiente | Puede generar reproceso en la orquestacion |
| Presion de cronograma por entrega en 1 mes | Exige foco estricto en alcance priorizado |
| Inicio tardio de QA por retraso de desarrollo | Puede comprometer validacion antes de la fecha objetivo |

---

## Acuerdos del kickoff

1. `utilizarCuposOrq` se entrega primero y sin mediacion.
2. La mediacion `utilizarCupos` no hace parte del alcance del proyecto.
3. El frente banca debe gestionar formalmente esa solicitud con Interoperabilidad.
4. Sebastian Caicedo y David Velazco entregan su bloque funcional el `04-may-2026`.
5. QA inicia cuando el desarrollo priorizado quede disponible.

---

## Proximos pasos

1. Confirmar detalle tecnico del `CC4`.
2. Recibir contrato de `orquestadorDeTransacciones`.
3. Confirmar disponibilidad del API `consultarCotizacionMoneda`.
4. Ejecutar desarrollo paralelo segun distribucion definida.
5. Preparar entrada de QA posterior al cierre del bloque funcional comprometido.

---

## Cierre

El proyecto inicia con foco en entrega temprana, alcance priorizado y una separacion clara entre lo que hace parte del proyecto y lo que debe gestionar el frente banca con Interoperabilidad.

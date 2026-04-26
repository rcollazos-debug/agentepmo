# REGISTRO DE CORREOS

## Resumen revisado al 20-abr-2026

### Hilo principal: `Proyecto GAW - Creacion Proyecto GoAnywhere para transferencia de la nomina electronica`

| Fecha | Emisor | Hallazgo clave |
|---|---|---|
| 08-sep-2025 | Jonathan Posada Londoño | Comparte documento del requerimiento a VortexBird para estimacion. |
| 09-sep-2025 | Diego Gomez | VortexBird envia propuesta comercial al cliente. |
| 10-dic-2025 | Jonathan Posada Londoño | Confirma aprobacion de la propuesta e inicio del proyecto. |
| 12-dic-2025 | Diego Gomez | Solicita a VortexBird coordinar plan de trabajo para arrancar. |
| 18-dic-2025 | Raul Collazos | VortexBird eleva dudas de alcance, destinatarios, listener, ruta GAW y acceso BD. |
| 09-ene-2026 | Jonathan Posada Londoño | Cliente informa que el ingeniero de apoyo regresa y luego entregaran informacion. |
| 27-ene-2026 | Juan Gerardo Bastidas | Responde dudas: alcance incluye JSON + consumo API + update `id_track`; listener automatico; ruta `/Peoplenet`; define destinatarios de correos y acceso inicial de BD para pruebas. |
| 29-ene-2026 | Juan Gerardo Bastidas | Comparte `swagger` de pruebas de Aportes en Linea y conexion de BD de pruebas PeopleNet. |
| 04-feb-2026 | Tatiana Montesdeoca | Registra pendientes de reunion: data de prueba, coleccion Postman, documentacion actualizada, definicion de envio uno a uno o agrupado, vigencia del token. |
| 16-feb-2026 | Tatiana Montesdeoca | Reitera que siguen pendientes los compromisos definidos el 04-feb. |
| 10-mar-2026 | Juan Gerardo Bastidas | Informa que siguen levantando usuarios, APIs y clonacion del ambiente de pruebas. |
| 16-mar-2026 | Juan Gerardo Bastidas | Agenda reunion para validar y suministrar la informacion solicitada. |

### Hilo secundario: `Pendientes Proyecto GAW`

| Fecha | Emisor | Hallazgo clave |
|---|---|---|
| 03-mar-2026 | Raul Collazos | Reenvia documento de pendientes del proyecto GAW a Coomeva. |
| 03-mar-2026 | Maria del Socorro Bastidas | Confirma recepcion tardia y promete gestion. |
| 05-mar-2026 | Raul Collazos | Reenvia pendientes a Jonathan Posada. |
| 11-mar-2026 | Raul Collazos | Solicita retroalimentacion sobre pendientes sin respuesta concreta en el correo. |

## Conclusiones del analisis de correos

- La propuesta comercial fue enviada el 09-sep-2025 y aprobada el 10-dic-2025.
- El arranque operativo se freno por dependencias del cliente: APIs, usuarios, ambiente de pruebas, data de prueba y aclaraciones funcionales.
- El alcance confirmado por correo incluye tanto generacion de JSON como consumo de API y actualizacion de `id_track`.
- Se confirmo por correo que la ejecucion debe ser programada automaticamente y que la ruta del proyecto en GAW es `/Peoplenet`.
- Persistieron varios pendientes abiertos entre enero y marzo sin evidencia de cierre por correo en los mensajes revisados.
- En la cadena revisada se compartieron credenciales o datos sensibles de acceso tecnico por correo; este manejo debe considerarse un riesgo de seguridad y revisarse/rotarse si sigue vigente.

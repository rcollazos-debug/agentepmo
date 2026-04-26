# ALCANCE DE ALTO NIVEL

> Proyecto: **GAW**

## Incluye

- Generacion de archivos JSON por empresa del GECC a partir de registros pendientes en PeopleNet.
- Insercion y actualizacion de trazabilidad en tablas `JSON_NOM_ELEC`, `CTRL_NOM_ELEC` y `XML_COMPROBANTE`.
- Consumo de APIs `Autenticacion`, `ProcesarNomina` y `ConsultaEstado` de Aportes en Linea.
- Actualizacion de `PROCESS_FLAG`, `ID_TRACK` y `TRANSACTION_ID` segun respuesta del proveedor.
- Reintentos de consulta de estado cada 15 minutos cuando la respuesta indique procesamiento en curso.
- Notificaciones por correo para exito, error funcional y error tecnico del job GAW.
- Limpieza automatica de registros con antiguedad mayor a tres meses.

## Excluye

- No se encontraron exclusiones explicitas en la documentacion fuente.

## Criterios de aceptacion de alto nivel

- El sistema identifica correctamente cuantos JSON generar por empresa y periodo.
- Cada envio deja trazabilidad completa en base de datos.
- La consulta de estado recupera CUNE o error y actualiza el registro correspondiente.
- Los correos se envian a los destinatarios definidos con el contenido esperado.

# TECHNICAL RISKS

- El nuevo control de cambios `CC4` sobre `CrearPrestamoORQ V4` puede introducir ajustes no contemplados en la integracion de `UtilizacionCuposOrq`.
- Sin el detalle del `CC4`, existe riesgo de reproceso en contratos, mapeos y validaciones del flujo de creacion de prestamo.
- Aunque Adriana confirma que `CrearPrestamoORQ V4 CC5` puede usarse, debe validarse formalmente si reemplaza completamente el analisis previo del `CC4`.
- El proyecto sigue expuesto a bloqueo tecnico mientras no se confirme si `parent`, `client`, `redis`, `cobis` y `rabbit` se reutilizan o deben construirse de forma independiente.

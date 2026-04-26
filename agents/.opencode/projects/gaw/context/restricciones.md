# RESTRICCIONES Y SUPUESTOS DEL PROYECTO

> Proyecto: **GAW**
> Ultima actualizacion: 20 de abril de 2026

## Restricciones del Proyecto

### Tiempo

| ID | Restriccion | Descripcion | Flexibilidad |
|---|---|---|---|
| RT-001 | Solicitud formal registrada | 25-ago-2025 | Ninguna |
| RT-002 | Fecha de entrega | [POR DEFINIR] | [POR DEFINIR] |

### Costo

| ID | Restriccion | Descripcion | Flexibilidad |
|---|---|---|---|
| RC-001 | Presupuesto maximo | [POR DEFINIR] | [POR DEFINIR] |

### Alcance

| ID | Restriccion | Descripcion |
|---|---|---|
| RA-001 | Alcance aprobado | Debe cubrir generacion JSON, envio API, consulta estado, actualizacion BD y notificaciones |
| RA-002 | Exclusiones | No encontradas en la documentacion revisada |

## Supuestos del Proyecto

| ID | Supuesto | Estado | Impacto si se invalida |
|---|---|---|---|
| SUP-001 | PeopleNet y la base Oracle entregan la informacion requerida para construir los JSON | Vigente | Alto |
| SUP-002 | Las APIs de Aportes en Linea estaran disponibles y con credenciales validas | Vigente | Alto |
| SUP-003 | El presupuesto sera consistente con el alcance esperado | Vigente | Alto |
| SUP-004 | El equipo requerido podra asignarse a tiempo | Vigente | Medio |

## Dependencias Externas

| Dependencia | Proveedor / Equipo | Fecha requerida | Impacto |
|---|---|---|---|
| Disponibilidad APIs Aportes en Linea | Proveedor externo | [POR DEFINIR] | Bloquea integracion |
| Acceso a BD PeopleNet / Oracle | Cliente / TI cliente | [POR DEFINIR] | Bloquea extraccion y trazabilidad |
| Confirmacion de presupuesto | Cliente / Comercial | [POR DEFINIR] | Bloquea factibilidad |

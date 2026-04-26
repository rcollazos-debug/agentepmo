# REGISTRO DE DEPENDENCIAS

> Mapa de dependencias entre tareas del proyecto y con sistemas/equipos externos.
> Las dependencias no resueltas son bloqueos potenciales en la ruta crítica.
> Actualizar cuando se identifican nuevas dependencias o se resuelven existentes.

---

## Tipos de Dependencias

| Tipo | Código | Descripción | Ejemplo |
|---|---|---|---|
| Fin-Inicio | FS | B no puede iniciar hasta que A termine | No se puede desarrollar hasta que se apruebe la arquitectura |
| Inicio-Inicio | SS | B no puede iniciar hasta que A inicie | QA puede iniciar cuando desarrollo inicia |
| Fin-Fin | FF | B no puede terminar hasta que A termine | Documentación no puede cerrarse hasta que dev termine |
| Inicio-Fin | SF | B no puede terminar hasta que A inicie | Poco común — caso especial |

---

## Dependencias Internas (entre tareas del proyecto)

| ID | Tarea sucesora | Depende de | Tipo | Lag/Lead | Estado | Riesgo |
|---|---|---|---|---|---|---|
| DEP-001 | Desarrollo módulo X | Arquitectura aprobada | FS | 0 días | Resuelta | Bajo |
| DEP-002 | UAT | Construcción completa Sprint X | FS | 0 días | Pendiente | Medio |
| DEP-003 | Deploy producción | UAT aprobado | FS | 0 días | Pendiente | Alto |

---

## Dependencias Externas (con sistemas o equipos fuera del proyecto)

| ID | Qué necesitamos | De quién | Para cuándo | Estado | Responsable seguimiento | Riesgo |
|---|---|---|---|---|---|---|
| DEP-EXT-001 | API de [Sistema externo] disponible en staging | [Equipo/Empresa] | [Fecha] | [Pendiente/En gestión/Resuelta] | PM | [Alto/Medio/Bajo] |
| DEP-EXT-002 | Accesos de producción al servidor del cliente | [TI del cliente] | [Fecha] | Pendiente | PM | Alto |
| DEP-EXT-003 | Datos de prueba del cliente para UAT | [PO del cliente] | [Fecha] | Pendiente | PM | Medio |

---

## Dependencias de Terceros / Proveedores

| ID | Entregable del proveedor | Proveedor | Fecha comprometida | Estado | Plan B |
|---|---|---|---|---|---|
| DEP-PRV-001 | [Descripción del entregable] | [Nombre proveedor] | [Fecha] | Pendiente | [Descripción del plan alternativo] |

---

## Dependencias Críticas (en ruta crítica)

| ID | Descripción | Impacto si se bloquea | Dueño | Fecha límite |
|---|---|---|---|---|
| DEP-XXX | [Descripción] | +X días en la entrega final | [Nombre] | [Fecha] |

---

## Dependencias Bloqueadas (atención inmediata)

| ID | Dependencia | Causa del bloqueo | Días bloqueado | Acción inmediata | Dueño |
|---|---|---|---|---|---|
| | | | | | |

*Sin dependencias bloqueadas actualmente.*

---

## Historial de Resolución

| ID | Dependencia | Fecha resolución | Cómo se resolvió | Impacto evitado |
|---|---|---|---|---|
| | | | | |

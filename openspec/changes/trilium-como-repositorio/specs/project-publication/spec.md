## ADDED Requirements

### Requirement: Nada se publica sin un resumen aprobado por el PM
Antes de enviar cualquier cambio a Trilium, el sistema SHALL mostrar al PM un resumen de lo que va a publicar y SHALL esperar su aprobación explícita.

#### Scenario: Publicación tras un bloque de trabajo
- **WHEN** el PM termina un bloque de trabajo con cambios sin publicar
- **THEN** el sistema muestra el resumen de lo que subiría y no envía nada hasta que el PM lo apruebe

#### Scenario: El PM no aprueba
- **WHEN** el PM rechaza la publicación o no responde
- **THEN** no se envía nada a Trilium y los cambios siguen guardados en la copia local

### Requirement: El resumen está escrito en lenguaje de negocio
El resumen SHALL describir los cambios por su significado para el proyecto, y SHALL NOT usar nombres de archivo, rutas ni identificadores de nota salvo que el PM pida el detalle.

#### Scenario: Resumen de un acuerdo y un compromiso
- **WHEN** los cambios pendientes son una entrada en el historial y un compromiso nuevo
- **THEN** el resumen dice algo como "un acuerdo con el cliente sobre la fecha de UAT y un compromiso nuevo para el 12-sep", no los archivos afectados

### Requirement: La publicación se agrupa, no se dispara en cada acción
El sistema SHALL ofrecer publicar al cerrar un bloque de trabajo y cuando el PM lo solicite, y SHALL NOT solicitar confirmación después de cada intervención.

#### Scenario: Varias acciones seguidas
- **WHEN** el agente registra cinco cambios durante una conversación
- **THEN** se solicita una sola confirmación que los agrupa, no cinco

## ADDED Requirements

### Requirement: `vorkanpm update` actualiza el cuerpo del agente sin tocar los datos
El comando `update` SHALL reemplazar por completo el cuerpo del agente instalado en el directorio global por la versión indicada, o la última disponible. SHALL NOT modificar, mover ni eliminar ningún archivo dentro de una carpeta de proyecto.

#### Scenario: Actualización con proyectos en uso
- **WHEN** un PM con tres carpetas de proyecto ejecuta `vorkanpm update`
- **THEN** el cuerpo del agente pasa a la versión nueva y el contenido de las tres carpetas queda intacto

#### Scenario: Corrección de un skill publicada por el administrador
- **WHEN** se publica una versión nueva con un skill corregido y el PM ejecuta `update`
- **THEN** la siguiente sesión de opencode usa el skill corregido sin ninguna otra acción del PM

### Requirement: `update` conserva la configuración y las autorizaciones de la máquina
El comando SHALL preservar las credenciales instaladas y las autorizaciones OAuth ya concedidas, y SHALL regenerar la configuración global cuando la versión nueva lo requiera.

#### Scenario: Actualización tras haber conectado las cuentas
- **WHEN** se ejecuta `update` en una máquina con todas las cuentas conectadas
- **THEN** no se solicita ninguna autorización de nuevo y las integraciones siguen operativas

### Requirement: `update` informa de la versión anterior y la nueva
El comando SHALL indicar de qué versión a qué versión se actualizó, y SHALL terminar sin cambios cuando ya se está en la versión solicitada.

#### Scenario: Ya en la última versión
- **WHEN** se ejecuta `update` estando en la última versión publicada
- **THEN** el comando informa de que no hay nada que actualizar y no modifica nada

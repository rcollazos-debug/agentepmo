## ADDED Requirements

### Requirement: El trabajo local nunca se bloquea por el estado del servidor
El agente SHALL leer y escribir siempre en la copia local del proyecto. La indisponibilidad de Trilium SHALL impedir la publicación, nunca el trabajo.

#### Scenario: Servidor caído durante una sesión
- **WHEN** Trilium no responde y el PM registra riesgos y compromisos
- **THEN** todo queda guardado en la copia local y el sistema informa de que la publicación queda pendiente

#### Scenario: Reconexión posterior
- **WHEN** el servidor vuelve a estar disponible
- **THEN** el sistema ofrece publicar lo pendiente siguiendo el flujo normal de resumen y aprobación

### Requirement: `vorkanpm join` vincula una carpeta local a un proyecto existente
El sistema SHALL permitir que un PM cree una copia de trabajo local de un proyecto que ya existe en Trilium, quedando la carpeta vinculada a la nota raíz de ese proyecto.

#### Scenario: Un colaborador se suma a un proyecto
- **WHEN** un PM ejecuta `vorkanpm join` en una carpeta vacía indicando un proyecto existente
- **THEN** se descarga el contenido del proyecto, se crean las seis carpetas y la carpeta queda vinculada a la nota raíz

#### Scenario: Join sobre una carpeta que ya es un proyecto
- **WHEN** se ejecuta `join` en una carpeta que ya está vinculada
- **THEN** el comando se detiene sin escribir e informa de a qué proyecto está vinculada

### Requirement: La reconciliación aplica la política que corresponde a cada carpeta
Al publicar o al descargar, cuando el contenido remoto haya cambiado desde la última sincronización, el sistema SHALL resolver según la naturaleza de la carpeta: unir en `memory/`, prevalecer lo más reciente en `metrics/`, fusionar por identificador de fila en `risks/` y `scope/`, y **detenerse** en `data/` y `context/`.

#### Scenario: Dos aportes al historial
- **WHEN** local y remoto tienen entradas distintas en `memory/historial.md`
- **THEN** se unen ambas, se ordenan por fecha y no se pierde ninguna

#### Scenario: Métrica actualizada por otro PM
- **WHEN** otro PM publicó una medición más reciente en `metrics/`
- **THEN** prevalece la más reciente, conservando quién y cuándo la midió

#### Scenario: Divergencia en la línea base
- **WHEN** local y remoto difieren en un archivo de `data/`
- **THEN** el sistema no resuelve automáticamente, presenta la diferencia al titular y deja el trabajo local intacto

### Requirement: Se detectan las escrituras hechas por otros desde la última lectura
El sistema SHALL registrar el identificador de contenido de cada nota al leerla y SHALL comprobarlo antes de escribir, para no pisar cambios ajenos.

#### Scenario: La nota cambió entre la lectura y la escritura
- **WHEN** el identificador de contenido de la nota difiere del registrado al leer
- **THEN** no se sobrescribe: se aplica la política de reconciliación de esa carpeta

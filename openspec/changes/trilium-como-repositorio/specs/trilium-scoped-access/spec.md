## ADDED Requirements

### Requirement: El acceso a Trilium se realiza a través de un servidor MCP propio sobre la ETAPI
El sistema SHALL exponer Trilium mediante un servidor MCP propio, construido sobre la ETAPI, que conoce la nota raíz del proyecto de la sesión y aplica el ámbito dentro de cada herramienta. SHALL cubrir las diecinueve capacidades: notas, búsqueda, organización, atributos, calendario, adjuntos, revisiones e información del sistema.

#### Scenario: Arranque del servidor dentro de un proyecto
- **WHEN** se abre una sesión en una carpeta de proyecto vinculada
- **THEN** el servidor arranca con la nota raíz de ese proyecto como ámbito y publica las diecinueve herramientas

#### Scenario: Inventario de herramientas
- **WHEN** el agente consulta las herramientas disponibles
- **THEN** obtiene las diecinueve, cada una declarando si escribe o solo lee

### Requirement: Toda escritura fuera del subárbol del proyecto es rechazada
El servidor SHALL rechazar cualquier operación de escritura cuyo destino no cuelgue de la nota raíz del proyecto de la sesión, con independencia de lo que solicite el agente.

#### Scenario: Intento de escribir en otro proyecto
- **WHEN** se solicita escribir en una nota que pertenece a otro proyecto
- **THEN** el servidor rechaza la operación y devuelve un error explicando que está fuera del ámbito de la sesión

#### Scenario: Escritura dentro del proyecto
- **WHEN** se solicita escribir en una nota que cuelga de la raíz del proyecto abierto
- **THEN** la operación se transmite al servidor de Trilium sin modificar

### Requirement: La lectura entre proyectos está permitida y queda registrada
El servidor SHALL permitir consultar otros proyectos, porque el conocimiento histórico compartido es el motivo del repositorio, y SHALL dejar constancia de esas consultas.

#### Scenario: Consulta del histórico de un cliente
- **WHEN** el agente busca qué se hizo con un cliente en años anteriores
- **THEN** la consulta se permite aunque abarque proyectos ajenos a la sesión

### Requirement: Sin vinculación a un proyecto no hay acceso de escritura
El servidor SHALL negarse a escribir cuando la sesión no esté vinculada a ningún proyecto de Trilium.

#### Scenario: Sesión en una carpeta sin vincular
- **WHEN** se abre una sesión en una carpeta que no está vinculada a un proyecto
- **THEN** las lecturas siguen disponibles y toda escritura se rechaza indicando cómo vincular la carpeta

### Requirement: Las notas de calendario son de solo lectura y el respaldo no se expone
El sistema SHALL permitir consultar las notas de día, mes y año, y SHALL rechazar escribir en ellas, porque viven fuera del subárbol del proyecto. SHALL NOT exponer al agente la creación de respaldos del servidor.

#### Scenario: Consulta de la nota del día
- **WHEN** el agente pide la nota del día
- **THEN** la obtiene en modo lectura

#### Scenario: Intento de escribir en una nota de calendario
- **WHEN** el agente intenta escribir en la nota de un día
- **THEN** la operación se rechaza por estar fuera del ámbito del proyecto

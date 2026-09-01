## ADDED Requirements

### Requirement: Los proyectos se organizan en Trilium como Cliente / Año de inicio / Proyecto
El sistema SHALL crear la nota raíz de cada proyecto bajo una nota de año, que a su vez cuelga de una nota de cliente. El año SHALL ser el del **inicio del proyecto**, no el del calendario.

#### Scenario: Primer proyecto de un cliente
- **WHEN** se publica un proyecto de un cliente que no existe en Trilium
- **THEN** se crean la nota del cliente, la nota del año de inicio y la nota del proyecto, en ese orden jerárquico

#### Scenario: Segundo proyecto del mismo cliente y año
- **WHEN** se publica otro proyecto del mismo cliente iniciado el mismo año
- **THEN** se reutilizan las notas de cliente y año existentes, y no se duplica ninguna

#### Scenario: Proyecto que cruza el fin de año
- **WHEN** un proyecto iniciado en 2026 continúa en 2027
- **THEN** permanece bajo la nota de 2026 y no se mueve ni se duplica

### Requirement: Las carpetas y archivos del proyecto se mapean uno a uno a notas
Bajo la nota del proyecto, el sistema SHALL crear una nota por cada una de las seis carpetas de trabajo, y dentro de cada una, una nota por archivo.

#### Scenario: Publicación inicial de un proyecto
- **WHEN** un titular publica por primera vez una carpeta de proyecto completa
- **THEN** en Trilium quedan las seis notas de carpeta y una nota por cada archivo, conservando nombres y jerarquía

### Requirement: Una ruta del contenido del agente es una dirección lógica de nota
Toda referencia de la forma `{project_path}/<carpeta>/<archivo>.md` SHALL resolverse como la nota `<archivo>` dentro de la nota `<carpeta>` del proyecto de la sesión.

#### Scenario: Un skill escribe en el historial
- **WHEN** un skill escribe en `{project_path}/memory/historial.md`
- **THEN** el destino es la nota `historial` bajo `memory` del proyecto abierto, sin que el skill necesite conocer ningún identificador de nota

### Requirement: Los archivos del proyecto se guardan como Markdown, sin conversión
Cada archivo del proyecto SHALL publicarse como una nota de tipo `code` con mime `text/x-markdown`, conservando su contenido Markdown sin transformar. Las notas contenedoras — cliente, año, proyecto y carpeta — SHALL seguir siendo de tipo `text`.

#### Scenario: Publicación de un archivo con tabla
- **WHEN** se publica un archivo que contiene una tabla Markdown
- **THEN** la nota resultante es de tipo `code` con mime `text/x-markdown` y su contenido es idéntico al archivo local

#### Scenario: Descarga de una nota publicada
- **WHEN** se descarga una nota del proyecto a la copia local
- **THEN** el archivo resultante es idéntico byte a byte al que se publicó, sin pasar por ninguna conversión

#### Scenario: Corrección hecha desde Trilium
- **WHEN** una persona edita el contenido de una nota del proyecto en Trilium
- **THEN** lo que edita es Markdown, y al descargarlo la copia local lo recibe sin transformar

### Requirement: La nota raíz del proyecto lleva atributos consultables
El sistema SHALL mantener en la nota raíz atributos con el cliente, el año de inicio, el identificador del proyecto, el PM titular y el estado.

#### Scenario: Consulta entre proyectos
- **WHEN** alguien busca los proyectos en estado AMARILLO iniciados en 2026
- **THEN** la búsqueda los devuelve a partir de los atributos, sin abrir cada proyecto

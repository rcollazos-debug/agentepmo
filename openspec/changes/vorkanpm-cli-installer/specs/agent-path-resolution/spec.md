## ADDED Requirements

### Requirement: El agente identifica el proyecto por el directorio de trabajo
El contenido del agente SHALL determinar el proyecto activo leyendo `project.md` del directorio de trabajo actual. SHALL NOT depender de un archivo de proyecto activo ni de un comando de conmutación entre proyectos.

#### Scenario: Inicio de sesión en una carpeta de proyecto
- **WHEN** se abre una sesión en una carpeta inicializada
- **THEN** el agente identifica el proyecto a partir de `project.md` y saluda indicando de cuál se trata

#### Scenario: Inicio de sesión fuera de un proyecto
- **WHEN** se abre una sesión en un directorio que no es un proyecto de Vorkan-PM
- **THEN** el agente lo advierte e indica cómo crear uno con `vorkanpm init`, en lugar de asumir un proyecto

### Requirement: Las rutas de datos se resuelven contra el directorio de trabajo
Todo skill, comando y playbook SHALL resolver las rutas de datos del proyecto de forma relativa al directorio de trabajo. SHALL NOT contener referencias literales a `brain/` ni a `projects/`.

#### Scenario: Auditoría del contenido del agente
- **WHEN** se busca en skills, comandos y playbooks una referencia literal a `brain/` o `projects/`
- **THEN** no se encuentra ninguna

#### Scenario: Escritura de un artefacto de proyecto
- **WHEN** un skill escribe un archivo de memoria o de métricas
- **THEN** el archivo queda dentro del directorio de trabajo, en la subcarpeta que le corresponde

### Requirement: Las rutas del cuerpo del agente se resuelven contra su directorio de instalación
Las referencias a material compartido entre skills — playbooks, conocimiento, plantillas y recursos — SHALL resolverse contra el directorio de instalación del cuerpo del agente, cuya ruta real se fija durante la instalación.

#### Scenario: Consulta de un playbook desde una carpeta de proyecto
- **WHEN** un skill necesita leer un playbook durante una sesión abierta en una carpeta de proyecto
- **THEN** lo localiza en el directorio de instalación, sin que exista copia alguna en la carpeta del proyecto

#### Scenario: Recurso propio de un skill
- **WHEN** un skill usa un recurso que le pertenece en exclusiva
- **THEN** lo referencia de forma relativa a su propio directorio, sin anclaje a la instalación

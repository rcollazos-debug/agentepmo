## ADDED Requirements

### Requirement: `vorkanpm init` convierte el directorio actual en un proyecto de Vorkan-PM
El comando `init` SHALL crear en el directorio actual las seis carpetas de trabajo (`context/`, `memory/`, `metrics/`, `data/`, `risks/`, `scope/`) con sus archivos base, un `project.md` con la identificación del proyecto y un `.vorkanpm.json` con el identificador y la versión del cuerpo del agente instalado.

#### Scenario: Inicialización en una carpeta vacía
- **WHEN** un PM crea una carpeta y ejecuta `vorkanpm init` dentro
- **THEN** quedan creadas las seis carpetas con sus archivos base, `project.md` y `.vorkanpm.json`, y el comando indica que ya puede abrirse con `opencode`

### Requirement: `init` recoge la identificación mínima del proyecto
El comando SHALL obtener identificador, nombre y cliente del proyecto, por argumentos o preguntándolos. El identificador SHALL limitarse a letras minúsculas, números y guiones.

#### Scenario: Identificador inválido
- **WHEN** se indica un identificador con espacios o caracteres especiales
- **THEN** el comando lo rechaza, explica el formato admitido y no crea nada

#### Scenario: Sin argumentos
- **WHEN** se ejecuta `vorkanpm init` sin argumentos
- **THEN** el comando pregunta identificador, nombre y cliente antes de crear nada

### Requirement: `init` nunca sobrescribe datos existentes
El comando SHALL detenerse sin escribir si el directorio ya contiene un proyecto de Vorkan-PM o cualquiera de los archivos que crearía.

#### Scenario: Carpeta que ya es un proyecto
- **WHEN** se ejecuta `init` en una carpeta que ya contiene `.vorkanpm.json`
- **THEN** el comando se detiene, informa de que ya es un proyecto y no modifica ningún archivo

### Requirement: `init` genera la configuración de opencode del proyecto
El comando SHALL escribir un `opencode.json` en el directorio con la configuración específica del proyecto, que opencode fusiona con la global escrita por `setup`.

#### Scenario: Apertura del proyecto
- **WHEN** el PM ejecuta `opencode` en la carpeta inicializada
- **THEN** el agente Vorkan-PM está disponible con sus skills y comandos, sin que exista copia alguna del cuerpo del agente dentro de la carpeta

### Requirement: El proyecto abierto es el único que el agente puede escribir
El agente SHALL resolver todas sus rutas de datos dentro del directorio de trabajo desde el que se abrió la sesión, y SHALL NOT escribir datos de proyecto fuera de él.

#### Scenario: Dos proyectos en el mismo equipo
- **WHEN** existen dos carpetas de proyecto y se abre una sesión en la primera
- **THEN** el agente lee y escribe únicamente dentro de la primera, y no accede a los datos de la segunda

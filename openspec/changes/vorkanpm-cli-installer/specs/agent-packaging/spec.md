## ADDED Requirements

### Requirement: El paquete distribuible contiene el cuerpo del agente y nunca datos ni secretos
El paquete publicado SHALL incluir únicamente el cuerpo del agente — definición del agente, skills, comandos, playbooks, plantillas, conocimiento, recursos y el CLI. SHALL excluir de forma explícita los datos de proyecto (`brain/`, `projects/`, `output/`), las credenciales (`credenciales/`, `mcp/.env`, cualquier `*oauth*.json`, `token*.json`) y la configuración local del entorno de desarrollo (`.claude/`).

#### Scenario: Empaquetado desde un árbol de trabajo con datos reales
- **WHEN** se genera el paquete desde un repositorio que contiene proyectos de clientes y credenciales
- **THEN** el artefacto resultante no contiene ningún archivo bajo `brain/`, `projects/`, `output/`, `credenciales/` ni `.claude/`, ni ningún archivo de credenciales u OAuth

#### Scenario: Verificación previa a publicar
- **WHEN** se ejecuta la verificación de contenido del paquete
- **THEN** falla si aparece cualquier ruta excluida, y el mensaje nombra el archivo infractor

### Requirement: El paquete se publica versionado en un registry privado
El paquete SHALL publicarse en un registry privado de la organización bajo un scope propio, con versionado semántico. SHALL NOT publicarse en un registry público.

#### Scenario: Instalación sin credenciales del registry
- **WHEN** alguien sin acceso al registry privado intenta instalar el paquete
- **THEN** la instalación falla por autenticación y no se descarga ningún contenido del agente

### Requirement: El árbol versionado no contiene rutas absolutas de una máquina concreta
El contenido del agente y su configuración SHALL NOT contener rutas absolutas del sistema de archivos de un equipo concreto. Toda ruta dependiente de la máquina SHALL resolverse en tiempo de instalación.

#### Scenario: Auditoría del árbol versionado
- **WHEN** se busca en el árbol versionado una ruta absoluta a un directorio personal
- **THEN** no se encuentra ninguna coincidencia

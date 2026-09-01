## ADDED Requirements

### Requirement: La identidad del autor la resuelve el CLI contra Google, no el modelo
Antes de publicar, el sistema SHALL obtener la dirección de correo del usuario consultando su perfil de Google con la sesión ya autorizada. La identidad SHALL NOT declararla el usuario ni deducirla el agente a partir del contenido de los correos.

#### Scenario: Publicación con sesión válida
- **WHEN** un PM con sesión de Google válida publica cambios
- **THEN** el sistema obtiene su correo del perfil de Google y lo usa como autor

#### Scenario: El usuario afirma ser otra persona
- **WHEN** el usuario le dice al agente que es otro PM
- **THEN** la afirmación no altera la atribución: se sigue estampando el correo obtenido de Google

### Requirement: Sin identidad verificable no se publica
Cuando no se pueda obtener una identidad verificada, el sistema SHALL cancelar la publicación con un mensaje que explique cómo restaurar la sesión, y SHALL conservar intacto el trabajo local.

#### Scenario: Sesión de Google caducada
- **WHEN** la sesión de Google no es válida al intentar publicar
- **THEN** no se envía nada a Trilium, el trabajo local se conserva y se indica cómo volver a autorizar

### Requirement: El correo es la llave de la atribución; el nombre es solo una etiqueta
El sistema SHALL usar la dirección de correo como identificador de autoría en toda lógica y todo registro. El nombre para mostrar SHALL ser un texto legible, solicitado una vez, sin efecto sobre la atribución.

#### Scenario: Nombre para mostrar incorrecto
- **WHEN** el nombre para mostrar guardado no corresponde a la cuenta autenticada
- **THEN** la atribución sigue basándose en el correo verificado y la discrepancia es visible

### Requirement: Cada nota registra creación, última edición y validación por separado
El sistema SHALL mantener, con su fecha, quién creó el contenido, quién lo editó por última vez y quién lo validó.

#### Scenario: Aporte corregido por el titular
- **WHEN** un colaborador crea un contenido y el titular lo corrige y valida
- **THEN** constan el colaborador como creador, el titular como último editor y el titular como validador, cada uno con su fecha

### Requirement: Se avisa cuando la instalación y la persona no concuerdan
Cuando el token de acceso a Trilium esté asociado a un PM distinto del autenticado en Google, el sistema SHALL avisar sin bloquear la publicación, y SHALL atribuir siempre a la cuenta de Google.

#### Scenario: Equipo compartido
- **WHEN** el token de la instalación corresponde a un PM y la cuenta de Google a otro
- **THEN** se publica atribuyendo a la cuenta de Google y se muestra un aviso de la discrepancia

## ADDED Requirements

### Requirement: `vorkanpm setup` deja una máquina lista en una sola ejecución
El comando `setup` SHALL instalar el cuerpo del agente en el directorio global de opencode de la plataforma, generar la configuración global y conectar las cuentas del usuario. SHALL funcionar en Windows 10/11 y en macOS con la misma implementación.

#### Scenario: Instalación en una máquina limpia de Windows
- **WHEN** un PM ejecuta `vorkanpm setup` en un equipo sin instalación previa
- **THEN** el cuerpo del agente queda en `%AppData%\opencode\`, la configuración global queda generada, y el comando informa del resultado de cada paso en español

#### Scenario: Instalación en macOS
- **WHEN** se ejecuta `vorkanpm setup` en macOS
- **THEN** el cuerpo del agente queda en `~/.config/opencode/` y el resultado es equivalente al de Windows

### Requirement: `setup` verifica los prerrequisitos y da instrucciones accionables cuando faltan
El comando SHALL comprobar la presencia de Node.js y del CLI opencode antes de continuar. Cuando un prerrequisito falta o no es visible en la sesión actual, SHALL detenerse indicando en lenguaje no técnico qué hacer.

#### Scenario: Node instalado pero ausente del PATH de la sesión
- **WHEN** Node acaba de instalarse y no es visible en la sesión actual de Windows
- **THEN** `setup` se detiene y pide reiniciar el equipo y volver a ejecutarlo, en lugar de fallar con un error del sistema

### Requirement: `setup` instala las credenciales OAuth de la organización desde una ubicación indicada
El comando SHALL aceptar la ubicación de la carpeta de credenciales entregada por el administrador e instalar cada credencial en la ruta que espera su servidor MCP. Cuando falte la credencial de Gmail y exista la de Calendar, SHALL reutilizar esta última. Las credenciales ausentes SHALL degradar el servicio correspondiente sin abortar la instalación.

#### Scenario: Carpeta de credenciales incompleta
- **WHEN** la carpeta contiene la credencial de Calendar y de Chat pero no la de Metabase
- **THEN** `setup` instala las dos primeras, informa de que Metabase queda pendiente, y termina correctamente

#### Scenario: Carpeta de credenciales ausente
- **WHEN** no se indica ni se encuentra carpeta de credenciales
- **THEN** `setup` completa la instalación del agente e informa de que las integraciones quedan sin conectar y de a quién pedirlas

### Requirement: `setup` conduce la autenticación del usuario en cada servicio
El comando SHALL lanzar la autenticación de opencode y la autorización OAuth de cada servicio con credencial instalada, indicando antes de cada apertura del navegador qué verá el usuario y qué debe pulsar.

#### Scenario: Una autorización falla
- **WHEN** la autorización de un servicio opcional no se completa
- **THEN** `setup` continúa con los demás servicios y al final enumera cuáles quedaron pendientes y cómo reintentarlos

### Requirement: `setup` es idempotente
Ejecutar `setup` sobre una máquina ya instalada SHALL reparar la instalación sin duplicar nada ni invalidar las autorizaciones ya concedidas.

#### Scenario: Segunda ejecución tras una instalación correcta
- **WHEN** se ejecuta `setup` por segunda vez
- **THEN** el cuerpo del agente y la configuración quedan en el mismo estado y no se vuelve a pedir una autorización ya válida

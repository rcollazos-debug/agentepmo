## ADDED Requirements

### Requirement: `vorkanpm doctor` verifica la instalación y reporta cada fallo con su remedio
El comando `doctor` SHALL comprobar los prerrequisitos, la presencia y versión del cuerpo del agente, la configuración generada, las credenciales instaladas y el estado de cada servidor MCP. Cada comprobación fallida SHALL reportarse en lenguaje no técnico junto con la acción concreta que la resuelve.

#### Scenario: Sesión de opencode sin autenticar
- **WHEN** el PM no ha completado `opencode auth login` y ejecuta `doctor`
- **THEN** el informe señala esa causa como el problema y da la instrucción exacta para resolverla

#### Scenario: Instalación correcta
- **WHEN** todo está en orden
- **THEN** `doctor` lo indica y termina con código de salida de éxito

### Requirement: `doctor` distingue lo obligatorio de lo opcional
El informe SHALL diferenciar los fallos que impiden usar el agente de los que solo degradan una integración opcional.

#### Scenario: Integración opcional caída
- **WHEN** Metabase no responde pero el resto funciona
- **THEN** `doctor` lo reporta como degradación y confirma que el agente es utilizable

### Requirement: `doctor` detecta proyectos desalineados con la versión instalada
Ejecutado dentro de una carpeta de proyecto, el comando SHALL comparar la versión registrada en `.vorkanpm.json` con la del cuerpo instalado e informar cuando difieran.

#### Scenario: Proyecto creado con una versión anterior
- **WHEN** se ejecuta `doctor` en un proyecto creado con una versión anterior a la instalada
- **THEN** el informe indica ambas versiones y si se requiere alguna acción

### Requirement: `doctor` detecta modificaciones del cuerpo instalado
El comando SHALL advertir cuando el cuerpo del agente instalado haya sido modificado localmente, porque `update` lo sobrescribirá.

#### Scenario: Skill editado a mano en la instalación global
- **WHEN** un archivo del cuerpo instalado difiere del publicado en esa versión
- **THEN** `doctor` lo advierte y explica que el cambio se perderá en la próxima actualización

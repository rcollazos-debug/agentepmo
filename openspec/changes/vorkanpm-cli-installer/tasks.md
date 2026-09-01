## 1. Seguridad y saneamiento previo

- [ ] 1.1 Rotar la contraseña de Metabase, la API key `mb_…` y el token de sesión expuestos en texto plano en `.claude/settings.local.json`
- [x] 1.2 Añadir `.claude/`, `credenciales/`, `output/`, `brain/`, `projects/` y los patrones de credenciales a las exclusiones de empaquetado
- [x] 1.3 Eliminar la ruta absoluta `/Users/rcollazos/.local/bin/notebooklm-mcp` del árbol versionado

## 2. Reestructuración del repositorio

- [x] 2.1 Separar el árbol en `agent/` (cuerpo redistribuible) y `cli/`, sacando los datos de proyecto fuera de lo empaquetable
- [x] 2.2 Mover `playbooks/`, `knowledge/`, `templates/` y `assets/` bajo `agent/vorkan/`
- [x] 2.3 Convertir `agents/chatpm/package.json` en un manifiesto real con `name` con scope, `version`, `bin` y `files`
- [x] 2.4 Retirar `.opencode`, `opencode.json`, `opencode.windows.json`, los cuatro `.bat` y los dos `.ps1`

## 3. Refactorización de rutas del contenido del agente

- [x] 3.1 Reescribir el Paso 0 de `AGENT.md`: leer `project.md` del directorio de trabajo en vez de `active-project.md`
- [x] 3.2 Definir `{project_path}` como `.` y verificar que las 280 referencias parametrizadas siguen resolviendo
- [x] 3.3 Sustituir las 49 referencias literales a `brain/` y `projects/` por `{project_path}`
- [x] 3.4 Anclar con `{{AGENT_HOME}}` las 35 referencias a `playbooks/`, `knowledge/`, `templates/` y `assets/`
- [x] 3.5 Dejar los recursos propios de cada skill referenciados de forma relativa a su propio directorio
- [x] 3.6 Eliminar `active-project.md`, `commands/proyecto.md` y `commands/nuevo-proyecto.md`, trasladando su scaffolding al CLI
- [x] 3.7 Verificar que no queda ninguna referencia literal a `brain/` ni a `projects/` en skills, comandos ni playbooks

## 4. Esqueleto del CLI

- [x] 4.1 Crear el paquete Node del CLI con el binario `vorkanpm` y el despacho de subcomandos
- [x] 4.2 Implementar la resolución del directorio global de opencode por plataforma (`~/.config/opencode`, `%AppData%\opencode`)
- [x] 4.3 Implementar la salida de consola en español, uniforme para los cuatro comandos
- [x] 4.4 Implementar la lectura y escritura de `.vorkanpm.json` y del manifiesto de versión del cuerpo instalado

## 5. `vorkanpm setup`

- [x] 5.1 Comprobar prerrequisitos (Node, opencode) y detener con instrucción accionable cuando falten o no estén en el PATH de la sesión
- [x] 5.2 Instalar el cuerpo del agente en el directorio global, sustituyendo `{{AGENT_HOME}}` por la ruta real
- [x] 5.3 Generar la configuración global de opencode con modelo y servidores MCP, con rutas absolutas resueltas
- [x] 5.4 Instalar las credenciales OAuth desde la carpeta indicada, con reutilización de la de Calendar para Gmail y degradación por credencial ausente
- [x] 5.5 Conducir `opencode auth login` y la autorización OAuth de cada servicio, informando antes de cada apertura del navegador
- [x] 5.6 Reportar al final qué servicios quedaron pendientes y cómo reintentarlos
- [x] 5.7 Hacer `setup` idempotente: reparar sin duplicar ni revocar autorizaciones válidas

## 6. Subcomandos MCP

- [x] 6.1 Portar la lógica de los wrappers a `vorkanpm mcp <servidor>`: reconstrucción de PATH, carga del `.env` de Metabase y parche de esquema
- [x] 6.2 Portar la espera del `token.json` de Google Chat
- [x] 6.3 Eliminar los diez wrappers `.sh` y `.cmd` y apuntar la configuración generada a los subcomandos

## 7. `vorkanpm init`

- [x] 7.1 Recoger identificador, nombre y cliente por argumentos o por preguntas, validando el formato del identificador
- [x] 7.2 Detener sin escribir si el directorio ya es un proyecto o contiene alguno de los archivos a crear
- [x] 7.3 Crear las seis carpetas con sus archivos base, a partir de las plantillas hoy dispersas entre `brain/_template` y `commands/nuevo-proyecto.md`
- [x] 7.4 Escribir `project.md` y `.vorkanpm.json` con la versión del cuerpo instalado
- [x] 7.5 Generar el `opencode.json` del proyecto
- [x] 7.6 Verificar que `opencode` abierto en la carpeta descubre el agente sin copia local del cuerpo

## 8. `vorkanpm update` y `vorkanpm doctor`

- [x] 8.1 Implementar `update`: reemplazo completo del cuerpo global, preservando credenciales y autorizaciones
- [x] 8.2 Informar de versión anterior y nueva, y terminar sin cambios cuando ya se está en la última
- [x] 8.3 Verificar con un proyecto real que `update` no modifica ningún archivo de datos
- [x] 8.4 Implementar `doctor`: prerrequisitos, cuerpo instalado, configuración, credenciales y estado de cada MCP
- [x] 8.5 Distinguir en el informe los fallos bloqueantes de las degradaciones opcionales
- [x] 8.6 Detectar en `doctor` proyectos con versión desalineada y modificaciones locales del cuerpo instalado

## 9. Publicación y arranque

- [x] 9.1 Configurar la publicación en el registry privado bajo el scope de la organización
- [x] 9.2 Añadir la verificación de contenido del paquete que falla si aparece una ruta excluida
- [ ] 9.3 Emitir el PAT de grano fino de solo lectura de paquetes, con caducidad
- [x] 9.4 Escribir los bootstrap de Windows y macOS: configurar `.npmrc`, instalar el CLI y lanzar `setup`
- [ ] 9.5 Publicar `1.0.0`

## 10. Verificación de extremo a extremo

- [ ] 10.1 Instalación completa en una máquina Windows limpia, desde el bootstrap hasta una sesión de agente respondiendo
- [ ] 10.2 Instalación completa en macOS con el mismo resultado
- [ ] 10.3 Dos proyectos en el mismo equipo: confirmar que una sesión no lee ni escribe los datos del otro
- [x] 10.4 Publicar una corrección de skill, ejecutar `update` y confirmar que llega sin tocar los datos

## 11. Documentación

- [x] 11.1 Reescribir `MANUAL-USUARIO.md` para el flujo bootstrap → `setup` → `init`, sin pasos de Obsidian
- [x] 11.2 Reescribir `LEEME-ADMIN.md`: publicación de versiones, emisión y rotación del PAT, entrega del bootstrap junto a `credenciales/`
- [x] 11.3 Actualizar `AGENTS.md` con la estructura nueva y el inventario real de skills y comandos
- [x] 11.4 Documentar que el cuerpo instalado es de solo lectura y que `update` lo sobrescribe

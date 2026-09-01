## Why

Distribuir Vorkan-PM hoy exige armar un ZIP a mano, entregarlo por Drive y que cada PM ejecute un `.ps1` de seis pasos que instala prerrequisitos, credenciales y el agente **en el mismo árbol donde vivirán sus datos**. Consecuencia: corregir un skill no puede llegar a los 6 PMs sin repetir la instalación completa, y hacerlo sobrescribiría el trabajo del PM. No existe ninguna vía de actualización.

Además el instalador es exclusivo de Windows, la configuración versionada contiene rutas absolutas del equipo del autor, y conviven dos convenciones de rutas de proyecto en conflicto (`brain/{id}` y `projects/{id}`), ambas presentes en disco.

## What Changes

- **Nuevo CLI `vorkanpm`** con cuatro comandos: `setup` (una vez por máquina), `init` (una vez por carpeta de proyecto), `update` y `doctor`. Sustituye a `instalar-windows.ps1`, `INSTALAR.bat`, `ABRIR-AGENTE.bat` y `DESINSTALAR.bat`.
- **Separación cuerpo/datos.** El cuerpo del agente (agentes, skills, comandos, playbooks, plantillas, conocimiento, wrappers MCP) se instala **una sola vez** en el directorio global de opencode — `~/.config/opencode/` en macOS, `%AppData%\opencode\` en Windows — donde opencode lo descubre en todo proyecto. Cada carpeta de proyecto contiene únicamente datos.
- **Una carpeta = un proyecto.** `vorkanpm init` crea `project.md`, `.vorkanpm.json` y las seis carpetas de trabajo (`context/`, `memory/`, `metrics/`, `data/`, `risks/`, `scope/`) en el directorio actual, y genera su `opencode.json`. El PM abre el proyecto con `opencode` desde esa carpeta.
- **BREAKING — desaparece el multiproyecto por conmutación.** Se eliminan `active-project.md` y el comando `/proyecto`. El proyecto activo pasa a ser el directorio de trabajo. Esto convierte el cwd en la frontera de escritura del agente, requisito de la futura integración con Trilium.
- **BREAKING — se unifican `brain/{id}` y `projects/{id}`.** Ambas desaparecen: la raíz de la carpeta del proyecto es la raíz de los datos. Las 280 referencias `{project_path}` del contenido siguen sirviendo con `{project_path} = .`; las 49 referencias literales a `brain/` y `projects/` se sustituyen.
- **BREAKING — desaparece el symlink `.opencode`** y el par `opencode.json` / `opencode.windows.json`. La configuración se **genera** en `setup` e `init` con las rutas reales de la máquina, en vez de versionarse.
- **Publicación privada versionada.** El paquete se publica en un registry privado (GitHub Packages). Un bootstrap mínimo, entregado por el mismo canal privado que hoy usa `credenciales/`, deja el registry configurado en la máquina del PM antes del primer `npm install -g`.
- **Soporte macOS de primera clase**, en paridad con Windows: el CLI reemplaza a los wrappers `.sh`/`.cmd` duplicados.
- **Se retira Obsidian** del flujo de instalación: registraba un vault sobre `brain/`, carpeta que deja de existir.
- **Fuera de alcance:** migrar instalaciones existentes (arranque limpio, decidido) y la integración con Trilium (cambio posterior, habilitado por este).

## Capabilities

### New Capabilities
- `agent-packaging`: el repositorio se convierte en un paquete versionado y publicable, con separación explícita entre el cuerpo del agente (redistribuible) y los datos del PM (nunca empaquetados), incluida la exclusión de secretos.
- `machine-setup`: `vorkanpm setup` deja una máquina lista una sola vez — prerrequisitos, instalación del cuerpo del agente en el directorio global de opencode, credenciales OAuth y autenticación de opencode.
- `project-init`: `vorkanpm init` convierte un directorio vacío en un proyecto de Vorkan-PM abrible con `opencode`.
- `agent-update`: `vorkanpm update` reemplaza el cuerpo del agente a una versión nueva sin tocar ningún dato de proyecto.
- `install-diagnostics`: `vorkanpm doctor` verifica una instalación y reporta cada fallo con su remedio, sustituyendo la tabla de resolución de problemas del manual.
- `agent-path-resolution`: el contenido del agente resuelve las rutas de datos contra el directorio de trabajo y las de su propio cuerpo contra el directorio global, en lugar de asumir un árbol único.

### Modified Capabilities
<!-- Ninguna: openspec/specs/ está vacío; este es el primer cambio del proyecto. -->

## Impact

- **Código nuevo:** el CLI `vorkanpm` (hoy no existe un solo archivo `.js`/`.ts` en el repositorio).
- **Contenido del agente:** ~90 ediciones de ruta en 25 skills, 31 comandos y `AGENT.md` — 49 literales `brain/`/`projects/`, 35 referencias a `playbooks/`, `knowledge/`, `templates/`, `assets/`, y 6 archivos que leen `active-project.md`.
- **Se eliminan:** `instalar-windows.ps1`, `desinstalar-windows.ps1`, los cuatro `.bat`, el symlink `.opencode`, `opencode.windows.json`, `opencode.json` versionado, `active-project.md`, `commands/proyecto.md` y `commands/nuevo-proyecto.md` (su scaffolding pasa al CLI).
- **Documentación:** `MANUAL-USUARIO.md` y `LEEME-ADMIN.md` se reescriben; `AGENTS.md` queda desfasado (declara 23 skills y 33 comandos frente a 25 y 31 reales).
- **Dependencias:** Node.js y el CLI opencode pasan a ser prerrequisito explícito del bootstrap. Se retira Obsidian.
- **Seguridad:** `.claude/settings.local.json` contiene en texto plano una contraseña de Metabase, una API key y un token de sesión, dentro de la carpeta que se empaqueta hoy. Debe excluirse del paquete y rotarse.
- **Riesgo:** los 6 PMs actuales quedan sin ruta de actualización automática desde la instalación vieja — reinstalan con el flujo nuevo.

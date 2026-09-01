## Context

Vorkan-PM se distribuye hoy como un ZIP con el árbol completo del repositorio. Ese árbol mezcla tres cosas que tienen ciclos de vida distintos: el **cuerpo del agente** (Markdown que Raúl edita y que debería poder actualizarse), los **datos del PM** (los `.md` que el agente escribe y que jamás deben perderse) y la **configuración de máquina** (rutas, credenciales, PATH). Al vivir en el mismo directorio, actualizar cualquiera implica arriesgar los otros dos.

La restricción dominante es el usuario: un PM sin perfil técnico, en Windows, sin herramientas de desarrollo. Todo lo que exija editar JSON, manejar PATH o entender un registry es un fallo de producto. Son 6 PMs hoy.

Dos hechos verificados durante la exploración sostienen el diseño:

1. **opencode fusiona configuración global y de proyecto**, y descubre agentes y skills en `~/.config/opencode/{agents,skills,commands}/` (macOS) y `%AppData%\opencode\…` (Windows), además de `.opencode/` del proyecto. El cuerpo del agente puede vivir una sola vez y estar disponible en toda carpeta.
2. **El contenido ya está parametrizado**: 280 de las 329 referencias a rutas de datos usan `{project_path}`. Solo 49 son literales de `brain/` o `projects/`.

## Goals / Non-Goals

**Goals:**
- Que un PM instale con dos pasos (bootstrap + `vorkanpm setup`) y cree un proyecto con uno (`vorkanpm init`).
- Que Raúl pueda publicar una corrección de un skill y que llegue a los 6 PMs con `vorkanpm update`, sin tocar sus datos.
- Paridad real macOS / Windows con **una sola** implementación, eliminando la duplicación `.sh` / `.cmd` y `opencode.json` / `opencode.windows.json`.
- Que el directorio de trabajo sea la frontera de escritura del agente, dejando lista la integración posterior con Trilium.
- Que ninguna ruta absoluta ni secreto viva en el árbol versionado.

**Non-Goals:**
- Migrar instalaciones existentes (decisión: arranque limpio).
- La integración con Trilium: es un cambio posterior que este habilita.
- Reescribir el contenido metodológico de los skills. Aquí solo se tocan sus rutas.
- Publicar nada en npm público.
- Sustituir a opencode o soportar otro runtime de agentes.

## Decisions

### D1 — El cuerpo del agente se instala en el directorio global de opencode

`setup` copia el cuerpo a `~/.config/opencode/` (macOS) o `%AppData%\opencode\` (Windows). Cada carpeta de proyecto contiene solo datos.

*Alternativas descartadas:* copiar el cuerpo en cada proyecto (N copias ⇒ N actualizaciones, y arrastra datos de clientes al copiar); enlazar con symlink (no sobrevive a Windows ni al ZIP — es justo el mecanismo que falla hoy).

### D2 — El material que opencode no descubre vive en `vorkan/` y se ancla por plantilla en la instalación

`playbooks/`, `knowledge/`, `templates/`, `assets/` no son carpetas reconocidas por opencode: las leen los skills por ruta. Como el cwd deja de contenerlas, se instalan en `<global>/vorkan/` y las 35 referencias del contenido se escriben con un único marcador `{{AGENT_HOME}}` que `setup` y `update` sustituyen por la ruta real de la máquina.

*Alternativas descartadas:* dejar las rutas relativas y explicarle al modelo en `AGENT.md` dónde está su cuerpo (frágil: depende de que resuelva bien 35 veces); escribir rutas absolutas literales en el repositorio (obliga a dos variantes de contenido por plataforma).

Se acepta que el cuerpo instalado difiera textualmente del versionado. No genera deriva porque `update` reinstala el cuerpo completo: **el cuerpo instalado es de solo lectura para el PM**.

### D3 — Los skills conservan sus recursos propios de forma relativa

Un recurso que pertenece a un solo skill (por ejemplo `skills/presentacion-kickoff/generator.py`) permanece dentro de su directorio y se referencia relativo a él. Solo se ancla con `{{AGENT_HOME}}` lo compartido entre skills.

### D4 — `{project_path}` pasa a valer `.`

Las 280 referencias parametrizadas no se tocan. Se sustituyen las 49 literales y se reescribe el Paso 0 de `AGENT.md`: en vez de leer `active-project.md` y resolver `brain/{id}`, lee `./project.md` del directorio actual. Es el cambio de mínimo esfuerzo que además produce el aislamiento por carpeta.

*Alternativa descartada:* una variable de entorno `VORKAN_PROJECT` — el PM no la va a definir.

### D5 — Registry privado con bootstrap que configura el token

El paquete se publica en GitHub Packages bajo un scope de la organización. Un script bootstrap por plataforma (`.bat` y `.sh`), entregado por el **mismo canal privado que hoy usa `credenciales/`**, escribe en `~/.npmrc` el registry del scope y un **PAT de grano fino, solo `read:packages`, con caducidad**, y a continuación instala el CLI y lanza `setup`.

Esto es la contrapartida de la decisión de mantener todo privado: el PM no teclea el token, pero el token existe en un archivo en su máquina. Se mitiga con permisos mínimos, caducidad y rotación; no da acceso a código fuente ni a datos de clientes.

*Alternativas descartadas:* npm público (expondría metodología y nombres de clientes); descarga de un tarball por URL firmada (no da un `update` idiomático ni resolución de versiones).

### D6 — La configuración se genera, nunca se versiona

`setup` escribe la configuración global (modelo y servidores MCP, con rutas absolutas ya resueltas para esa máquina). `init` escribe la del proyecto con lo específico de él. opencode fusiona ambas. Desaparecen `opencode.json` y `opencode.windows.json` del repositorio, y con ellos la ruta `/Users/rcollazos/.local/bin/notebooklm-mcp`.

### D7 — Los wrappers MCP se convierten en subcomandos del CLI

Los wrappers `.sh`/`.cmd` existen porque hay lógica real que ejecutar antes de arrancar cada servidor MCP: reconstruir el PATH, cargar el `.env` de Metabase, parchear un bug de esquema del servidor de Metabase, esperar el `token.json` de Google Chat. Esa lógica pasa a `vorkanpm mcp <servidor>`, y la configuración generada invoca ese subcomando. Diez archivos duplicados se convierten en un solo camino de código multiplataforma.

### D8 — CLI en Node.js, sin dependencias pesadas

Node ya es prerrequisito de opencode y npm es el canal de distribución elegido. No introduce una tecnología nueva en la máquina del PM.

### D9 — Los tres comandos son idempotentes y `init` nunca sobrescribe datos

Re-ejecutar `setup` repara una instalación; re-ejecutar `update` sobre la misma versión no hace nada; `init` sobre una carpeta que ya es un proyecto se detiene sin escribir. La instalación tiene que ser reintentable, porque el soporte consiste hoy en pedirle al PM que la repita.

### D10 — Cada proyecto registra la versión con la que se creó

`.vorkanpm.json` guarda `project_id` y la versión del cuerpo. `doctor` compara con la instalada y avisa cuando un proyecto quedó atrás, que es la señal que hoy no existe.

## Risks / Trade-offs

- **El PAT de lectura queda en la máquina de 6 PMs** → grano fino, solo `read:packages`, con caducidad y procedimiento de rotación documentado en `LEEME-ADMIN.md`. Si se filtra, expone paquetes del agente, no código fuente ni datos de clientes.
- **El diseño depende de rutas de descubrimiento de opencode que pueden cambiar** → `doctor` verifica que el agente sea visible para opencode y se fija una versión mínima soportada.
- **Perder el multiproyecto por conmutación es una regresión de flujo** para quien trabaje varios proyectos a la vez: pasa de `/proyecto` a abrir otra terminal en otra carpeta. Se acepta: es el precio del aislamiento de escritura que exige Trilium.
- **Los 6 PMs reinstalan desde cero** → sus carpetas actuales no se borran; quedan como respaldo del que copiar `.md` a mano si hiciera falta.
- **En Windows, tras instalar Node el PATH no está disponible en la misma sesión** — el fallo más común del instalador actual → el bootstrap detecta el caso y pide reiniciar, en vez de fallar de forma opaca.
- **Un PM podría editar el cuerpo instalado** y perder el cambio en el siguiente `update` → se documenta como área de solo lectura y `doctor` detecta modificaciones.

## Migration Plan

1. Publicar `1.0.0` en el registry privado y emitir el PAT de lectura.
2. Entregar a cada PM el bootstrap junto a su carpeta `credenciales/`, por el canal privado habitual.
3. El PM ejecuta el bootstrap → `vorkanpm setup` → `vorkanpm init` en una carpeta por proyecto.
4. La instalación anterior se conserva intacta como respaldo hasta que el PM confirme que trabaja con la nueva.
5. Retirar el ZIP de Drive y archivar los `.bat` y `.ps1` del repositorio.

*Rollback:* el ZIP anterior sigue siendo funcional y autónomo; volver a él no requiere desinstalar nada, porque el cuerpo nuevo vive en el directorio global de opencode y no interfiere con un árbol antiguo.

## Open Questions

- Nombre del scope y del paquete en GitHub Packages (`@vortexbird/vorkanpm` es la suposición de trabajo).
- Si `setup` debe seguir instalando Python: hoy solo lo usa la generación de PPTX del kick-off. Si se resuelve de otro modo, desaparece un prerrequisito pesado.
- Dónde escribe el agente los documentos generados ahora que `output/` deja de estar en la raíz de la instalación: se asume `output/` dentro de la carpeta del proyecto.
- Rotación de la contraseña de Metabase y de la API key expuestas en `.claude/settings.local.json`: es trabajo de seguridad previo, no del CLI.

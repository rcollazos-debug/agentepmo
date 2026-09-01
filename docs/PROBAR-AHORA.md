# Probar Vorkan-PM ahora (macOS, desde el repositorio)

> Este manual es para **ti**, no para los PMs. Instala desde el repositorio local, sin
> paquete publicado. El manual de los PMs es `MANUAL-USUARIO.md`, y será exacto cuando
> se publique la versión 1.0.0.

## Qué funciona hoy y qué no

| Funciona | Todavía no |
|---|---|
| Todo el ciclo: `setup`, `init`, `join`, `publish`, `revisar`, `titularidad`, `estado`, `doctor` | Instalar con `npm i -g` (falta publicar la versión) |
| El agente conduce el flujo en la conversación y ofrece publicar | El árbol de clientes en Trilium está vacío |
| Roles titular/colaborador, aportes marcados, propuestas de línea base | |
| Reconciliación a tres bandas: unir, medición más reciente, parar en línea base | |
| Auditoría `/consistencia` — propone, nunca corrige | |
| Trilium: 19 herramientas MCP acotadas al proyecto de la sesión | |
| opencode descubre el agente y sus 26 skills | |

**En resumen:** funciona entero. Lo único que falta para repartirlo es publicar el paquete y
emitir los tokens.

---

## Paso 1 — Poner opencode en el PATH

Tu opencode vive dentro de la aplicación de escritorio y no está en el PATH. El instalador
lo encuentra solo, pero **tú** necesitas escribir `opencode` en la terminal:

```bash
ln -sf /Applications/opencode.app/Contents/MacOS/opencode-cli ~/.local/bin/opencode
```

Comprueba: `opencode --version` debe responder `1.14.18`.

## Paso 2 — Dejar disponible el comando `vorkanpm`

Desde la raíz del repositorio:

```bash
npm link
```

Comprueba: `vorkanpm --version` debe responder `1.0.0`.

## Paso 3 — Credenciales de Trilium

Crea una carpeta `credenciales` con un archivo `trilium.env`:

```
TRILIUM_URL=http://154.53.44.235:8080/etapi
TRILIUM_TOKEN=<tu token ETAPI>
```

> Gmail ya está autorizado en este Mac y el instalador no lo toca. Calendar y Chat no están
> configurados aquí; el agente funcionará sin ellos y avisará de que faltan.

## Paso 4 — Instalar

```bash
vorkanpm setup --credenciales ./credenciales --sin-autenticar
```

`--sin-autenticar` se salta la conexión de cuentas, que en tu Mac ya está hecha.

> ⚠️ Esto escribe `~/.config/opencode/opencode.json`, que es la configuración **global** de
> opencode: el modelo y los seis servidores MCP se aplicarán a **todos** tus proyectos de
> opencode, no solo a los de Vorkan-PM. Para deshacerlo, borra ese archivo.

Comprueba con `vorkanpm doctor`.

## Paso 5 — Crear un proyecto y abrirlo

```bash
mkdir -p ~/Proyectos-vorkan/prueba && cd ~/Proyectos-vorkan/prueba
vorkanpm init prueba --nombre "Proyecto de prueba" --cliente "Bancoomeva"
opencode
```

El agente debería saludarte, reconocer el proyecto por la carpeta y tener sus 26 skills.
Prueba a pedirle *"dame el estado del proyecto"* o *"cómo van los riesgos"*.

## Paso 6 — Publicar en el repositorio

```bash
vorkanpm publish
```

La primera vez crea el proyecto en Trilium bajo `Cliente / Año / Proyecto` y te deja como
**PM titular**. Antes de subir nada te muestra un resumen en lenguaje de negocio y espera tu
aprobación. Tarda unos 12 segundos con los 47 archivos.

> Requiere sesión de Google válida: la autoría se resuelve contra Gmail, no se declara.
> Sin ella no se publica nada y tu trabajo local queda intacto.

## Paso 7 — Ser el segundo PM

En **otra carpeta vacía**:

```bash
vorkanpm join "nombre del proyecto"
```

Descarga el proyecto y vincula la carpeta. A partir de ahí, los dos podéis trabajar y
publicar: las entradas del historial se unen sin perderse, las mediciones las gana la más
reciente, y el cronograma o el presupuesto **se paran** pidiendo tu decisión, porque cambiar
la línea base sin acuerdo es riesgo contractual.

Si el servidor no responde, `publish` te lo dice y no bloquea nada: tu trabajo sigue en la
carpeta y se publica cuando vuelva la conexión.

## Paso 8 — Validar lo que aporta el otro

Como PM titular, para ver lo que te espera:

```bash
vorkanpm revisar
```

Y para validarlo uno a uno: `vorkanpm revisar --validar`. Puedes corregir antes de validar:
quien lo aportó sigue constando como autor.

Dentro del agente, `/consistencia` revisa contradicciones —dos riesgos que describen lo mismo,
un semáforo que no cuadra con el CPI— y **propone** correcciones con su evidencia.

## Lo que el agente ve al arrancar

```bash
vorkanpm estado --json
```

Es lo que ejecuta en su Paso 1: identidad, rol, qué está sin publicar, qué esperan validación
y qué escribieron otros. Útil también para ti si algo no cuadra.

---

## Deshacerlo todo

```bash
rm ~/.config/opencode/opencode.json                       # configuración global
rm -rf ~/.config/opencode/{agents,skills,commands,vorkan} # cuerpo del agente
npm unlink -g @vortexbird/vorkanpm                        # el comando vorkanpm
rm ~/.local/bin/opencode                                  # el enlace a opencode
```

Tus carpetas de proyecto y tus credenciales de Google no se tocan.

## Si algo falla

```bash
vorkanpm doctor
```

Revisa prerrequisitos, cuerpo instalado, configuración, credenciales y alineación del
proyecto, y por cada problema dice qué hacer.

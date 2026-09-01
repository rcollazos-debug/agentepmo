# Manual de Vorkan-PM

### Tu asistente de gestión de proyectos de VortexBird

Este manual es para cualquier persona, sin conocimientos técnicos. Instalarlo lleva unos
**10 minutos** y solo se hace **una vez por computador**.

---

## Qué es, en una frase

Un asistente que trabaja **en la carpeta de tu proyecto** y guarda todo en el repositorio de
la PMO, para que el conocimiento del proyecto no viva solo en tu equipo.

```
   Tu carpeta del proyecto  ──publicas cuando tú digas──▶  Repositorio de VortexBird
   (trabajas aquí, siempre)                                (lo ven los demás PM)
```

---

# Parte 1 — Instalación

## Antes de empezar necesitas

- Windows 10/11 o un Mac
- Tu **correo de VortexBird**
- La carpeta que te compartió el administrador, que contiene el instalador y una subcarpeta
  **`credenciales`**

> Si no la tienes, escríbele a Raúl antes de continuar.

## Paso 1 — Ejecutar el instalador

**Windows:** doble clic en **`windows.bat`**.

> Si aparece la advertencia azul de Windows: **"Más información"** → **"Ejecutar de todas
> formas"**. Es una herramienta interna de VortexBird.

**Mac:** abre la Terminal, arrastra `macos.sh` a la ventana y pulsa Enter.

Presiona ENTER cuando te lo pida y espera. **Si te pide reiniciar el computador, hazlo** y
vuelve a ejecutarlo: es normal la primera vez.

## Paso 2 — Conectar tus cuentas

Se abrirá el navegador varias veces.

Primero **opencode**: elige un proveedor de inteligencia artificial e inicia sesión. Sin esto
el agente no responde.

Después tus cuentas de **Google**. En cada una:

1. Elige tu **correo de VortexBird** — usa siempre el mismo en todas
2. Si aparece "Google no verificó esta app" → **"Configuración avanzada"** → **"Ir a Vorkan PM"**
3. Pulsa **"Continuar"** o **"Permitir"**

> Si alguna falla no pasa nada: el instalador te dice cuáles quedaron pendientes y cómo
> reintentarlas.

---

# Parte 2 — Trabajar con un proyecto

## Crear un proyecto nuevo

Cada proyecto es **una carpeta**. Créala donde guardes tu trabajo, entra en ella y ejecuta:

```bash
vorkanpm init
```

Te pedirá tres datos: identificador, nombre y cliente, más el año de inicio. Con eso queda lista.

## Sumarte a un proyecto que ya existe

Si otro PM ya lo creó y vas a colaborar, en una **carpeta vacía**:

```bash
vorkanpm join "nombre del proyecto"
```

Se descarga todo y la carpeta queda enlazada.

## Usar el agente

Dentro de la carpeta del proyecto:

```bash
opencode
```

El agente te saluda por tu nombre, reconoce el proyecto por la carpeta y te dice si hay algo
esperándote. Puedes pedirle cosas como *"dame el estado del proyecto"*, *"revisa los chats de
hoy"* o *"cómo van los riesgos"*.

> El agente solo lee y escribe dentro de la carpeta desde la que lo abriste. Para otro
> proyecto, ábrelo desde la carpeta de ese otro proyecto.

## Publicar tu trabajo

Nada sube al repositorio hasta que tú lo apruebes. Cuando termines un bloque de trabajo, el
agente te lo ofrece, o lo haces tú:

```bash
vorkanpm publish
```

Te enseña un resumen en lenguaje claro —*"un acuerdo con el cliente y un compromiso nuevo para
el 12-sep"*— y espera tu sí.

> **Si el servidor no responde, no pasa nada:** tu trabajo está guardado en tu carpeta y se
> publica cuando vuelva la conexión.

---

# Parte 3 — Trabajar entre varios PM

Cada proyecto tiene un **PM titular** y puede tener colaboradores.

## Si eres colaborador

Aporta con normalidad. Lo que subes se encamina solo:

| Lo que aportas | Qué pasa |
|---|---|
| Un acuerdo, un correo, una minuta, un compromiso | Se publica al momento, marcado para que el titular lo valide. **Está disponible desde ya** |
| Una medición: avance, defectos, velocidad | Se publica al momento |
| Un cambio al cronograma, presupuesto o alcance | Queda como **propuesta**. La línea base no se mueve: eso lo decide el titular |

## Si eres el titular

Al abrir el agente te dice si hay cosas esperándote. Para verlas:

```bash
vorkanpm revisar
```

Y para validarlas una a una:

```bash
vorkanpm revisar --validar
```

Puedes corregir cualquier dato antes de validarlo: **quien lo aportó sigue constando como
autor**, y tu corrección queda registrada a tu nombre.

## Cambiar de titular

Antes de unas vacaciones o al traspasar el proyecto:

```bash
vorkanpm titularidad --ceder correo@vortexbird.com
```

Si el titular no está disponible, otro PM puede tomarla con `vorkanpm titularidad --tomar`.
Queda registrado de forma visible: nunca ocurre en silencio.

## Cuando algo no cuadra

Si dos personas registraron el mismo riesgo con nombres distintos, o el semáforo dice VERDE y
las cifras dicen otra cosa, pídeselo al agente:

```
/consistencia
```

Revisa el proyecto y **te propone** correcciones con su evidencia. No cambia nada por su
cuenta: decides tú, hallazgo por hallazgo.

---

# Parte 4 — Mantenimiento

## Actualizar

Cuando el administrador publique mejoras:

```bash
vorkanpm update
```

Actualiza el agente **sin tocar ninguno de tus proyectos**.

## Si algo sale mal

```bash
vorkanpm doctor
```

Revisa la instalación completa y por cada problema te dice qué hacer.

| Problema | Solución |
|---|---|
| "No se reconoce vorkanpm" u "opencode" | Reinicia el computador y reintenta |
| El agente no responde / error de modelo | `opencode auth login`, inicia sesión y elige un modelo |
| "Esta carpeta no es un proyecto de Vorkan-PM" | Estás fuera de la carpeta, o falta `vorkanpm init` |
| "No puedo verificar quién eres" | Tu sesión de Google caducó: `vorkanpm mcp gmail --auth` |
| No se pudo descargar Vorkan-PM | El acceso caducó. Pide a Raúl el instalador renovado |
| Cualquier otra cosa | Captura de pantalla a Raúl |

## Dos advertencias

**No edites los archivos del agente instalado** (skills, comandos, playbooks). Son de solo
lectura: la próxima actualización los sobrescribe. Si necesitas que se comporte distinto,
pídeselo a Raúl y lo publica para todos.

**Tu identidad la verifica Google, no se declara.** Todo lo que publicas queda firmado con tu
correo corporativo. Sin sesión de Google válida puedes trabajar, pero no publicar.

---

## Soporte

Cualquier duda, escríbele a **Raúl Collazos** con una captura de lo que ves.

---
name: inicio-proyecto
description: Completa el contexto de un proyecto recién creado. La estructura de carpetas y archivos la crea el CLI con `vorkanpm init`; este skill conduce la entrevista que llena `project.md` y los archivos de `context/` con los datos reales del proyecto.
---

# SKILL: Inicio de Proyecto

## Propósito

Un proyecto de Vorkan-PM nace con `vorkanpm init`, que crea la carpeta con sus 47 archivos base. Este skill toma esa estructura vacía y la llena: recoge los datos del proyecto y escribe `project.md` y los archivos de `context/`, dejándolo listo para operar.

**Este skill no crea carpetas ni archivos nuevos.** Si la estructura no existe, el remedio es el CLI, no el agente.

---

## Cuándo Activar

- "vamos a configurar el proyecto", "llena el contexto", "arrancamos el proyecto [nombre]"
- Tras un `vorkanpm init`, cuando `project.md` aún tiene campos por definir
- El agente detecta que `context/proyecto-base.md` está en su estado de plantilla

---

## Protocolo de Ejecución

### Paso 1 — Verificar que el directorio es un proyecto

Comprobar que existe `project.md` en el directorio de trabajo.

Si **no existe**, detenerse y responder:

```
Esta carpeta todavía no es un proyecto de Vorkan-PM.

Cierra la sesión, sitúate en la carpeta del proyecto y ejecuta:
    vorkanpm init
Después vuelve a abrir el agente con `opencode` desde esa carpeta.
```

No continuar bajo ningún concepto: crear la estructura a mano deja el proyecto sin registrar y sin versión.

### Paso 2 — Recolectar los datos del proyecto

Pedir en **una sola ronda** lo que falte. Si el usuario ya lo dio en su mensaje, extraerlo y no volver a preguntar.

```
Para dejar el proyecto listo necesito:

1. Nombre completo del proyecto
2. Cliente
3. PM responsable
4. Fecha de inicio
5. Fecha fin planificada
6. Presupuesto total (BAC) — opcional, puede definirse después
```

`project_id` **no se pregunta**: ya lo fijó `vorkanpm init` y está en `project.md`. No cambiarlo nunca — es la identidad del proyecto.

### Paso 3 — Escribir `project.md`

Actualizar los campos con los datos recogidos, conservando `project_id`:

```markdown
# Proyecto

project_id: [PROJECT_ID]        ← no tocar
project_name: [PROJECT_NAME]
client: [CLIENT]
pm: [PM]
start_date: [START_DATE]
end_date: [END_DATE]
bac: [BAC]
status: VERDE
```

`{project_path}` no se escribe en el archivo: vale siempre `.`, el directorio actual.

### Paso 4 — Llenar el contexto

| Archivo | Qué hacer |
|---|---|
| `{project_path}/context/proyecto-base.md` | Llenar con nombre, cliente, PM, fechas, BAC y estado inicial 🟢 VERDE. El objetivo se pide al usuario o queda "Por definir" |
| `{project_path}/context/vortexbird.md` | **No personalizar** — se deja tal como vino de la plantilla |
| Resto de `context/` | Dejar los encabezados genéricos; el PM los llena durante el proyecto |

### Paso 5 — Registrar en el historial

Appendear a `{project_path}/memory/historial.md` según el protocolo de `{{AGENT_HOME}}/vorkan/CONVENCIONES.md`.

### Paso 6 — Confirmar

```
✅ Proyecto "[PROJECT_NAME]" configurado.

Cliente: [CLIENT] · PM: [PM] · Inicio: [START_DATE]

Siguiente paso recomendado: análisis de contexto
(escribe "analiza el contexto" o usa el skill analisis-contexto)
```

---

## Reglas

1. **Nunca crear la estructura de carpetas.** Eso es `vorkanpm init`; el agente solo la llena.
2. **Nunca cambiar `project_id`** — lo fijó el CLI y lo registra `.vorkanpm.json`.
3. **`vortexbird.md`** nunca se personaliza.
4. **Nunca escribir fuera del directorio de trabajo.** Para otro proyecto se abre otra sesión en su carpeta.
5. Si un dato no se conoce, dejarlo como "Por definir" — nunca inventarlo.

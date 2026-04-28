# COMMAND: /proyecto

## Propósito

Cambiar el proyecto activo en `active-project.md` para que el agente trabaje sobre el proyecto correcto. Permite listar los proyectos disponibles, cambiar de proyecto y verificar cuál está activo en este momento.

## Cuándo usar

- `/proyecto [nombre o id]` — cambiar al proyecto especificado
- `/proyecto` (sin argumentos) — mostrar cuál es el proyecto activo y la lista de proyectos disponibles
- "cambia al proyecto X", "activa el proyecto Y", "con qué proyecto estamos trabajando"
- "lista los proyectos", "qué proyectos tengo"
- Cuando el PM empieza a hablar de un proyecto diferente al activo

---

## Instrucciones de ejecución

### Paso 1 — Leer estado actual

```
active-project.md            ← proyecto activo ahora
projects/                    ← listar subdirectorios = proyectos disponibles
```

### Paso 2 — Detectar intención

| Caso | Acción |
|---|---|
| `/proyecto` sin argumentos | Mostrar proyecto activo + lista de disponibles |
| `/proyecto [id/nombre]` | Cambiar al proyecto especificado |
| Argumento no coincide con ningún proyecto | Sugerir proyectos similares o preguntar |

---

### MODO 1 — Ver proyecto activo y lista

Si el PM escribe `/proyecto` sin argumentos:

```
1. Leer active-project.md → mostrar proyecto activo
2. Listar subdirectorios de projects/ → proyectos disponibles
3. Para cada proyecto disponible, leer projects/{id}/context/proyecto-base.md
   (si existe) para obtener: nombre del proyecto y cliente
```

**Output:**
```
📂 PROYECTO ACTIVO:
  ID:      {project_id}
  Nombre:  {project_name}
  Cliente: {client}
  PM:      {pm}
  Ruta:    {project_path}

PROYECTOS DISPONIBLES:
  {id_1}  →  {nombre} | {cliente}  {← ACTIVO si es el actual}
  {id_2}  →  {nombre} | {cliente}
  {id_3}  →  {nombre} | {cliente}

Para cambiar: /proyecto {id}
Para crear uno nuevo: /nuevo-proyecto
```

---

### MODO 2 — Cambiar de proyecto

Si el PM especifica un proyecto (ej: `/proyecto condepro` o `/proyecto Bancoomeva`):

**Paso 1 — Resolver el ID:**
```
1. Buscar coincidencia exacta de project_id en subdirectorios de projects/
2. Si no hay coincidencia exacta → buscar coincidencia parcial en:
   - project_id (ej. "cond" coincide con "condepro")
   - project_name (ej. "Cupos" coincide con "Utilizaciones de Cupos")
   - client (ej. "Banco" coincide con "Bancoomeva")
3. Si hay varias coincidencias → mostrar opciones y pedir confirmación
4. Si no hay ninguna → informar y sugerir /proyecto para ver la lista
```

**Paso 2 — Verificar que el proyecto tiene archivos mínimos:**
```
projects/{nuevo_id}/context/proyecto-base.md  ← REQUERIDO
```
Si no existe → advertir: "⚠️ Este proyecto no tiene contexto configurado. Ejecuta /analisis-contexto para configurarlo."

**Paso 3 — Actualizar `active-project.md`:**

Leer `projects/{nuevo_id}/context/proyecto-base.md` para extraer:
- `project_name`
- `client`
- `pm` (el PM del proyecto)

Reescribir `active-project.md` con los datos del nuevo proyecto:
```
# Proyecto Activo

project_id: {nuevo_id}
project_name: {nombre del proyecto}
project_path: projects/{nuevo_id}
client: {cliente}
pm: {pm}
```

**Paso 4 — Confirmar el cambio:**
```
✅ Proyecto cambiado

ANTES:  {id anterior} — {nombre anterior}
AHORA:  {nuevo_id} — {nuevo nombre} | Cliente: {cliente}

El agente ahora trabaja sobre projects/{nuevo_id}/
```

**Paso 5 — Briefing rápido del nuevo proyecto (opcional):**

Preguntar al PM: "¿Quieres que haga un briefing rápido del estado actual de {nuevo_nombre}?"
- Si sí → leer `metrics/dashboard.md` y `memory/historial.md` del nuevo proyecto y dar resumen en 5 líneas
- Si no → continuar sin briefing

---

### MODO 3 — Verificar coherencia (diagnóstico)

Si el PM dice "con qué proyecto estamos", "verifica el proyecto activo":

```
1. Leer active-project.md
2. Verificar que projects/{project_id}/ existe físicamente
3. Verificar que {project_path}/context/proyecto-base.md existe
4. Si todo OK → mostrar datos del proyecto activo
5. Si hay inconsistencia → alertar y proponer corrección
```

---

## Reglas del comando

1. **Nunca cambiar de proyecto sin confirmación si hay trabajo en curso** — si `memory/historial.md` del proyecto actual tiene entradas del día de hoy, confirmar antes de cambiar
2. **El proyecto activo afecta a TODO el agente** — todos los comandos posteriores operarán sobre el nuevo proyecto
3. **Solo listar proyectos con estructura válida** — directorios de `projects/` que tengan al menos `context/`
4. **Nunca crear un proyecto nuevo desde este comando** — para eso existe `/nuevo-proyecto`

---

## Output esperado

- Lista clara de proyectos disponibles con nombre y cliente
- Confirmación inmediata del cambio con proyecto anterior y nuevo
- Advertencia si el proyecto destino no tiene contexto configurado
- Oferta de briefing rápido del nuevo proyecto

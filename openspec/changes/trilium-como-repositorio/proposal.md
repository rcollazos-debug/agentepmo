## Why

Hoy la memoria de cada proyecto vive en la carpeta local de un solo PM. Si esa persona se ausenta, cambia de rol o sale de la empresa, el histórico del proyecto se va con ella, y nadie puede responder "¿qué acordamos con Bancoomeva en 2025?". Tampoco hay forma de que un segundo PM aporte lo que sabe: si Raúl habla con el cliente de un proyecto que lidera Valeria, ese acuerdo no llega a ninguna parte.

VortexBird ya tiene una instancia de **Trilium** en un servidor. Convertirla en el repositorio de los proyectos resuelve las dos cosas: el conocimiento sobrevive a las personas y varios PMs pueden alimentar un mismo proyecto. Lo que hay que diseñar con cuidado es que eso ocurra **sin ensuciar la información** y **sin que el PM tenga que entender nada técnico**.

## What Changes

- **Trilium pasa a ser la fuente de verdad del proyecto.** Los 47 archivos de la carpeta se mapean uno a uno a notas bajo una estructura **`Cliente / Año de inicio / Proyecto`**, con las seis carpetas de trabajo como notas hijas. La carpeta local se conserva como **copia de trabajo**.
- **Nada se publica en silencio.** Antes de subir, el agente muestra al PM un resumen en lenguaje de negocio de lo que va a publicar, y solo sube si el PM lo aprueba.
- **El trabajo local nunca se bloquea.** Si el servidor no responde, el PM sigue trabajando en su carpeta y la publicación queda pendiente. Falla hacia el trabajo guardado, nunca hacia el trabajo perdido.
- **Roles por proyecto: un PM titular y colaboradores.** Los colaboradores aportan; el titular valida, corrige y es el único que mueve la línea base. La titularidad se cede de forma explícita y queda registrada.
- **Los aportes entran por la vía que corresponde a su naturaleza:** los hechos (correos, acuerdos, minutas, compromisos) van directos a `memory/` marcados como *sin validar*; las mediciones van a `metrics/`; todo lo que toque la línea base (`data/`, `context/`) entra como **propuesta pendiente**, nunca directo.
- **Toda escritura queda atribuida a una persona verificada.** La identidad se resuelve **por código contra Google** —el mismo Gmail que el agente ya exige— y no la declara el usuario ni la deduce el modelo. **BREAKING**: sin sesión de Google válida no se puede publicar.
- **Nuevo `vorkanpm join`**: vincula una carpeta local a un proyecto que ya existe en Trilium, para que un segundo PM pueda trabajarlo.
- **Nueva auditoría de consistencia**: una skill que revisa el proyecto buscando incoherencias que ningún merge detecta (dos riesgos que describen el mismo hecho, un semáforo que contradice al CPI) y **propone** correcciones sin aplicarlas.
- **El acceso a Trilium queda acotado por proyecto.** El servidor MCP se envuelve en un proxy que rechaza toda escritura fuera del subárbol del proyecto abierto, porque Trilium no tiene permisos por nota y el token da acceso total al árbol.
- **Un token ETAPI por PM**, en lugar de uno compartido, para poder revocar a una persona sin afectar al resto.
- **Fuera de alcance:** el modelo nativo de Trilium (cada riesgo o compromiso como su propia nota con relaciones). El mapeo 1:1 conserva las 284 referencias del contenido; el modelo nativo es un cambio posterior que empezaría por `risks/`.

## Capabilities

### New Capabilities
- `trilium-project-store`: estructura `Cliente / Año / Proyecto` en Trilium, mapeo 1:1 de las seis carpetas y sus notas, atributos de proyecto, y creación idempotente de los nodos de cliente y año.
- `trilium-scoped-access`: servidor MCP de Trilium envuelto en un proxy que acota lecturas y **rechaza escrituras** fuera del subárbol del proyecto de la sesión.
- `project-publication`: publicación deliberada — resumen en lenguaje de negocio, confirmación del PM, y nada sube sin aprobación.
- `local-working-copy`: la carpeta local como copia de trabajo que nunca bloquea, `vorkanpm join` para vincularse a un proyecto existente, y reconciliación según la naturaleza de cada carpeta.
- `contribution-validation`: roles titular y colaborador, aportes marcados como no validados, validación y corrección con rastro, y cesión de titularidad.
- `authorship-attribution`: identidad verificada contra Google resuelta por el CLI, correo como llave y nombre como etiqueta, tres campos de autoría por nota, y publicación bloqueada sin identidad.
- `consistency-audit`: skill y comando que detectan incoherencias semánticas del proyecto y proponen correcciones sin aplicarlas.

### Modified Capabilities
<!-- Ninguna archivada todavía. Este cambio se apoya en las capacidades del cambio
     `vorkanpm-cli-installer`, aún sin archivar: en particular `project-init`
     (que pasará a publicar en Trilium) y `agent-path-resolution` (cuyas rutas
     pasan a ser direcciones lógicas de nota). -->

## Impact

- **Depende de `vorkanpm-cli-installer`**, que tiene 7 tareas abiertas. En particular la 7.6 —verificar que opencode descubre el agente contra un opencode real— sigue sin comprobarse, y este cambio se apoya entero en esa base.
- **CLI:** comandos nuevos (`join`, publicación, reconciliación), servidor MCP nuevo con su proxy, y resolución de identidad contra la API de Gmail.
- **Contenido del agente:** las 284 referencias `{project_path}/...` se conservan, pero pasan a interpretarse como direcciones lógicas de nota mediante una regla en `CONVENCIONES.md`. El protocolo de inicio del `AGENT.md` cambia: identidad por código, aviso de aportes pendientes y estado de publicación.
- **Se elimina** el Paso 3 actual del `AGENT.md`, que deduce el nombre del PM leyendo un correo con `from:me`.
- **Infraestructura:** el servidor Trilium queda accesible sin VPN, por lo que el token ETAPI es la única barrera. Requiere HTTPS con proxy inverso y un procedimiento de rotación de tokens.
- **Credenciales:** cada PM recibe además su token ETAPI, por el mismo canal privado que las credenciales de Google.
- **Riesgo aceptado:** con la instancia compartida, cualquier PM ve los proyectos de todos los clientes. Trilium no ofrece permisos por nota, y el proxy de ámbito protege la escritura, no la lectura.
- **Verificación pendiente:** si la instancia admite varios tokens ETAPI simultáneos y revocables por separado. Si no los admite, la atribución depende por completo del estampado del agente.

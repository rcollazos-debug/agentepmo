## Context

VortexBird tiene una instancia de Trilium en un servidor propio, accesible sin VPN. El cambio anterior (`vorkanpm-cli-installer`) dejó cada proyecto como una carpeta local con 47 archivos, y el directorio de trabajo como frontera de escritura del agente. Este cambio traslada la verdad del proyecto a Trilium sin perder esa frontera.

Tres restricciones mandan sobre el diseño:

1. **Trilium no tiene multiusuario.** Una instancia es de un usuario; no hay permisos por nota. Cualquier token ETAPI puede leer y escribir todo el árbol. La instancia es compartida por decisión explícita, asumiendo que todos los PMs ven todos los proyectos.
2. **Los PMs no son técnicos.** Todo lo que exija entender un merge, un conflicto o una nota huérfana es un fallo de producto.
3. **El trabajo no se puede bloquear.** Ni por un servidor caído, ni por un conflicto, ni por una validación pendiente.

### Verificado contra la instancia real (31-ago-2026)

Trilium **0.105.0**, ETAPI en `http://154.53.44.235:8080/etapi`. Comprobado con un subárbol de prueba que después se eliminó sin dejar restos:

| Qué | Resultado |
|---|---|
| Autenticación | Acepta `Authorization: <token>` y `Bearer <token>` |
| Crear, leer, escribir y borrar notas | Correcto |
| Jerarquía cliente → año → proyecto → carpeta | Correcto |
| Atributos (`label`) sobre una nota | Correcto — habilita `#creadoPor`, `#pmTitular`, `#cliente` |
| `blobId` | **Cambia al escribir contenido** → el control de concurrencia optimista de D6 funciona |
| Búsqueda acotada por `ancestorNoteId` | Correcto, e incluye descendientes |
| `POST /auth/login` | Existe y exige contraseña → **se pueden acuñar varios tokens ETAPI**, uno por PM |
| Transporte | **HTTP sin TLS, sobre IP pública.** El token viaja en claro en cada petición |
| Formato de nota | Acepta `text`+`text/html`, `text`+`text/markdown`, `code`+`text/x-markdown`, sin coaccionar nada |
| Renderizado (comprobado a ojo en la interfaz) | Solo renderiza el HTML. **Un `text` con mime `text/markdown` NO renderiza**: muestra el Markdown crudo |
| Ida y vuelta por API | Byte a byte idéntico, mismo `blobId` |
| Abrir una nota en el editor | **No** modifica su contenido |
| Búsqueda en notas `code` | Indexa el contenido igual que en las de texto, incluido `note.content*=*` |

Y un hecho verificado: el token de Gmail que el agente ya usa tiene scope `gmail.modify`, suficiente para consultar el perfil del usuario y obtener su dirección de correo. **La identidad está disponible hoy sin pedir ningún permiso nuevo ni volver a pasar a los PMs por la pantalla de consentimiento.**

## Goals / Non-Goals

**Goals:**
- Que el conocimiento del proyecto sobreviva a la persona que lo lleva.
- Que varios PMs alimenten un mismo proyecto sin ensuciar la línea base.
- Que nada llegue a Trilium sin que un PM haya visto y aprobado un resumen entendible.
- Que toda escritura quede atribuida a una persona verificada por Google, no declarada.
- Que el agente siga siendo utilizable con el servidor caído.

**Non-Goals:**
- El modelo nativo de Trilium (una nota por riesgo, por compromiso, con relaciones). El mapeo 1:1 conserva las 284 referencias del contenido.
- Permisos de lectura por proyecto: Trilium no los ofrece y no se van a simular.
- Edición simultánea en tiempo real. La publicación es deliberada y agrupada.
- Sustituir el flujo de Change Request para mover la línea base.

## Decisions

### D1 — La ruta del contenido pasa a ser una dirección lógica, no una ruta de disco

`{project_path}/memory/historial.md` se interpreta como *la nota `historial` dentro de la carpeta `memory` del proyecto de la sesión*. Una sola regla en `CONVENCIONES.md` traduce las 284 referencias existentes.

*Alternativa descartada:* reescribir las referencias para hablar de `noteId`. Rompería 25 skills y ataría el contenido a un almacén concreto.

### D2 — Estructura `Cliente / Año de inicio / Proyecto`, con nodos creados de forma idempotente

El año es el de **inicio del proyecto**, no el del calendario, porque replica la organización de carpetas que la PMO ya usa. Un proyecto que cruza el fin de año permanece en el año en que empezó. Crear un proyecto busca primero el nodo de cliente y el de año; solo los crea si no existen, para que dos proyectos del mismo cliente no dupliquen padres.

### D3 — Trilium es la fuente de verdad; la carpeta local es copia de trabajo

El agente lee y escribe siempre en local, y publicar es un acto aparte. Esto mantiene la propiedad más valiosa del diseño anterior —el sistema de archivos como frontera— y hace que el servidor caído sea un inconveniente, no una parada.

*Alternativa descartada:* que el agente hable directamente con Trilium en cada lectura y escritura. Ata cada frase de la conversación a la latencia y la disponibilidad del servidor.

### D4 — Nada se publica sin un resumen aprobado

Antes de subir, el CLI presenta lo que va a publicar **en lenguaje de negocio** ("un acuerdo con el cliente, un compromiso nuevo para el 12-sep"), nunca nombres de archivo ni notas. El PM aprueba y entonces se publica.

Esto no es solo una cortesía para usuarios no técnicos: al convertir la publicación en un acto deliberado y agrupado, **elimina la mayor parte de las escrituras concurrentes** que de otro modo habría que resolver con un algoritmo.

Momento: al cerrar un bloque de trabajo y cuando el PM lo pida. No después de cada intervención.

### D5 — La naturaleza de la carpeta decide cómo se reconcilia

La taxonomía que ya existe en `CONVENCIONES.md` es la política de resolución de conflictos:

| Carpeta | Naturaleza | Política |
|---|---|---|
| `memory/` (96 refs) | Append-only | Unir por entrada; deduplicar con el formato `[YYYY-MM-DD HH:MM] {SKILL} — {desc}`. **Nunca reescribir el archivo entero** |
| `metrics/` (55) | Realidad medida | Gana la medición más reciente, estampando quién y cuándo midió |
| `data/` (65), `context/` (45) | Línea base | **No resolver automáticamente.** Parar y presentar la diferencia al titular |
| `risks/` (21), `scope/` (2) | Tablas con ID | Fusionar por ID de fila |

Con esto, el 55% de las escrituras se reconcilia sin intervención humana y el trabajo delicado se concentra donde ya hay un proceso formal: el Change Request.

### D6 — Detección de escrituras pisadas con `blobId`, sin garantía atómica

Cada nota expone `blobId` —un hash del contenido— y `utcDateModified`. Se guarda el `blobId` al leer y se comprueba antes de escribir. La ETAPI **no ofrece actualización condicional (`If-Match`)**, así que la comprobación es del lado del cliente y queda una ventana entre releer y escribir. Con 6 PMs y publicación deliberada es aceptable; se documenta como lo que es, una red de seguridad y no una garantía.

### D7 — Los aportes entran por la vía que corresponde a su naturaleza

| Aporte de un colaborador | Entra | Por qué |
|---|---|---|
| Hechos: correo, acuerdo, minuta, compromiso | Directo a `memory/`, marcado **sin validar**, con autor | Son append-only: no ensucian nada, y el conocimiento está disponible desde el primer momento |
| Mediciones | Directo a `metrics/`, con autor y fecha | Una medición nueva sustituye a la anterior, no la contradice |
| Línea base | **Propuesta pendiente** | Es lo contractual; solo el titular lo mueve |

*Alternativa descartada:* una bandeja de entrada única para todo. Más "limpia", pero deja invisible el conocimiento del colaborador hasta que alguien lo revise.

### D8 — Titular y colaboradores, con titularidad cedible

El titular arbitra la línea base, valida los aportes y corrige. La titularidad es un atributo de la nota raíz (`#pmTitular`), **se cede de forma explícita** y queda registrada en el historial. Un colaborador puede tomarla en una emergencia dejando constancia visible, nunca en silencio.

Sin cesión, un proyecto se congelaría en su línea base cada vez que el titular se ausenta.

### D9 — La identidad la resuelve el código contra Google, nunca el modelo

Al publicar, el CLI consulta el perfil de Gmail y obtiene el correo del usuario. Ese correo es la llave de la atribución.

- **Correo** (`rcollazos@vortexbird.com`): verificado por Google, único, imposible de falsear sin la sesión de esa persona. Es lo que se estampa y lo único que usa cualquier lógica.
- **Nombre para mostrar** ("Raúl Collazos"): etiqueta legible, se pregunta una vez y se guarda. Que sea declarado da igual: no atribuye nada.

Si un usuario afirma ser otra persona, solo consigue ponerse una etiqueta falsa sobre un correo que sigue siendo el suyo.

*Alternativa descartada:* el Paso 3 actual del `AGENT.md`, que deduce el nombre leyendo un correo con `from:me`. Es frágil y pasa por el modelo, que es sugestionable. **Se elimina.**

**Fail-closed:** sin identidad verificable no se publica. El trabajo local continúa; lo que no puede es subir sin firma.

### D10 — Tres campos de autoría, no uno

`#creadoPor`, `#ultimaEdicion` y `#validadoPor`, cada uno con su fecha. Cuando el titular corrige el aporte de un colaborador, **el colaborador sigue constando como autor** y la corrección queda atribuida a quien la hizo. Con un solo campo, corregir borraría la autoría y el colaborador nunca sabría que le cambiaron algo.

### D11 — Dos identidades independientes, y su desacuerdo se avisa

El **token ETAPI** identifica la instalación; la **cuenta de Google** identifica a la persona. Atribuye siempre Google. Que no coincidan puede ser legítimo (un portátil compartido) o no serlo (un token que circuló): se avisa, no se bloquea.

Un token por PM, revocable por separado. **Verificado**: la instancia expone `POST /auth/login`, que acuña un token nuevo a partir de la contraseña, y `POST /auth/logout` invalida el token con el que se llama. Emitir y revocar por persona es viable; lo hace el administrador, porque requiere la contraseña de la instancia.

### D12 — Servidor MCP propio sobre la ETAPI, con las 19 herramientas y el ámbito aplicado dentro de cada una

Trilium no tiene permisos por nota: cualquier token escribe en todo el árbol. La barrera entre proyectos tiene que ponerla el servidor MCP.

En lugar de envolver `triliumnext-mcp` y vigilar sus herramientas desde fuera, se implementa un **servidor MCP propio sobre la ETAPI** que expone las mismas diecinueve capacidades y **aplica el ámbito dentro de cada herramienta**. Se gana en tres cosas: no se depende de un repositorio ajeno que puede añadir herramientas sin avisar, la comprobación vive en la herramienta y no en un intermediario que puede quedarse desactualizado, y el cliente ETAPI ya existe (`cli/src/lib/trilium.js`).

Las diecinueve, sobre endpoints verificados en la instancia real:

| Categoría | Herramientas |
|---|---|
| Notas (5) | `get_note`, `create_note`, `write_note`, `update_note`, `delete_note` |
| Búsqueda (2) | `search_notes`, `get_note_tree` |
| Organización (1) | `organize_note` (mover y clonar mediante ramas) |
| Atributos (3) | `get_attributes`, `set_attribute`, `delete_attribute` |
| Calendario (1) | `get_special_note` (día, mes, año — **semanas no existen en 0.105.0**) |
| Adjuntos (4) | `list_attachments`, `create_attachment`, `write_attachment`, `delete_attachment` |
| Revisiones (2) | `get_revisions`, `create_revision` |
| Sistema (1) | `app_info` (solo lectura) |

Regla de ámbito, uniforme:

- **Escritura**: el destino debe colgar de la nota raíz del proyecto de la sesión. Se comprueba recorriendo la jerarquía hacia arriba. Si no cuelga, se rechaza.
- **Lectura**: permitida en todo el árbol, porque consultar el histórico de otros proyectos es el motivo de tener repositorio, y se deja constancia.
- **Notas de calendario**: solo lectura, porque viven fuera del subárbol del proyecto.
- **Respaldo del sistema**: no se expone al agente. Es una acción de administración.

Una instrucción en el `AGENT.md` no bastaría: sería una norma, no un candado.

### D13 — La auditoría de consistencia propone, nunca corrige

Detecta lo que ningún merge ve: dos riesgos distintos que describen el mismo hecho, compromisos duplicados con responsables distintos, un semáforo en verde con CPI 0.78, un cronograma que contradice al sprint actual. Su salida es un informe con evidencia y propuesta; decide el titular.

Corregir en silencio datos de un proyecto compartido es lo que destruye la confianza en el agente.

### D14 — Mapeo 1:1 más atributos

Los 47 archivos se mapean uno a uno. Encima, atributos en la nota raíz (`#cliente`, `#anioInicio`, `#projectId`, `#pmTitular`, `#estado`) que habilitan las consultas entre proyectos que justifican haber ido a Trilium — "todos los proyectos en amarillo de 2026", "qué hicimos con Bancoomeva desde 2024" — sin tocar un solo skill.

### D15 — Las notas hoja se guardan como `code` con mime `text/x-markdown`

Los 47 archivos del proyecto se publican como notas de tipo `code` con mime `text/x-markdown`. Las notas contenedoras — cliente, año, proyecto y las seis carpetas — siguen siendo `text`, porque son ramas del árbol y no documentos.

El motivo es que Trilium no renderiza Markdown en ningún tipo de nota: solo renderiza HTML. Verificado en la instancia, un `text` con mime `text/markdown` muestra el Markdown crudo. Así que la elección real era entre convertir a HTML o asumir que el Markdown se lee como fuente.

Se elige Markdown como fuente porque:

- **No hay conversión, luego no hay pérdida ni deriva.** El problema que amenazaba el diseño —que un viaje Markdown → HTML → Markdown no fuera idempotente y rompiera la detección de cambios por hash— desaparece por completo, no se mitiga.
- **`fusionarFilas()` sigue sirviendo tal cual.** La reconciliación de tablas parsea Markdown; con HTML habría que reescribirla.
- **Cuando el titular corrige un dato, edita Markdown**, que es lo que el agente entiende, y vuelve intacto.
- **El CLI conserva su propiedad de cero dependencias.** La alternativa exigía un conversor en cada sentido.
- **La búsqueda no se resiente**: Trilium indexa el contenido de las notas `code` igual que el de las de texto.

*Coste aceptado:* las tablas se leen como texto con tuberías, no como cuadrícula. Es una pérdida real de comodidad para quien consulte el registro de riesgos en Trilium, y se acepta a cambio de la integridad del dato.

*Alternativa descartada:* convertir a HTML (`marked` + `turndown`). Renderiza de verdad, pero introduce dos dependencias, obliga a reescribir la reconciliación de tablas y pone una conversión en el camino donde más duele: la corrección de un dato por el titular.

## Risks / Trade-offs

- **Servidor sin VPN, sin TLS y token con acceso total al árbol.** Verificado que hoy responde por HTTP plano en una IP pública: el token viaja en claro en cada petición y cualquiera en la ruta puede capturarlo. HTTPS con proxy inverso deja de ser una mejora y pasa a ser condición previa a repartir tokens a los PMs. Además, un token por PM y rotación documentada. Si un token se filtra, expone el histórico completo de la PMO.
- **Cualquier PM ve los proyectos de todos los clientes** → asumido; Trilium no ofrece permisos por nota y no se van a simular.
- **La cola de validación puede envejecer** si el titular no revisa → el agente insiste al abrir sesión. La falta de revisión no bloquea ni el aporte ni la consulta: solo deja el dato marcado como no validado.
- **La comprobación de `blobId` no es atómica** → ventana breve entre releer y escribir. Mitigado por la publicación deliberada, que hace raras las escrituras simultáneas.
- **El PM puede autorizar Gmail, Calendar y Chat con cuentas distintas** → manda Gmail, y el instalador avisa si detecta cuentas diferentes.
- **Dependencia de un cambio sin terminar**: `vorkanpm-cli-installer` tiene 7 tareas abiertas y su tarea 7.6 —que opencode descubra el agente— sigue sin verificar contra un opencode real.
- **Dependencia de un servidor MCP de terceros** (`perfectra1n/triliumnext-mcp`, 19 herramientas, mantenimiento activo) → el proxy propio aísla su superficie; si hubiera que cambiarlo, se cambia detrás del proxy.

## Migration Plan

1. Verificar en la instancia real si admite varios tokens ETAPI revocables por separado.
2. Poner HTTPS con proxy inverso delante de Trilium y emitir un token por PM.
3. Crear el árbol `Cliente / Año` con los clientes existentes.
4. Publicar la versión nueva del agente. Cada PM ejecuta `vorkanpm update`.
5. El titular de cada proyecto publica su carpeta local por primera vez: el volcado inicial queda firmado por él.
6. Los colaboradores se vinculan con `vorkanpm join` y empiezan a aportar.

*Rollback:* la carpeta local sigue siendo funcional y completa por sí sola. Desactivar la publicación devuelve el sistema al comportamiento del cambio anterior sin pérdida de datos.

## Open Questions

- ¿Qué ocurre con un proyecto cuyo cliente cambia de nombre, o que se reasigna a otro cliente? Trilium permite clonar una nota en varios padres, así que hay salida, pero hay que decidirla.
- ¿Se publican también los documentos generados (PPTX, DOCX) como adjuntos de la nota del proyecto? El servidor MCP expone herramientas de adjuntos.
- `CONVENCIONES.md` obliga al agente a usar `[[wikilinks]]`, herencia del diseño para Obsidian. En una nota de código no enlazan a nada. Hay que decidir si se retiran o si se traducen a enlaces internos de Trilium.
- ¿Cuánto histórico se migra? El punto 5 asume que cada titular publica su estado actual, no el histórico completo de proyectos ya cerrados.

## 1. Verificaciones e infraestructura previas

- [x] 1.1 Verificar en la instancia real si Trilium admite varios tokens ETAPI simultáneos y revocables por separado, y anotar el resultado en `design.md`
- [ ] 1.2 Poner HTTPS con proxy inverso delante del servidor Trilium
- [ ] 1.3 Emitir un token ETAPI por PM y documentar el procedimiento de rotación en `LEEME-ADMIN.md`
- [x] 1.4 Cerrar la tarea 7.6 de `vorkanpm-cli-installer`: comprobar contra un opencode real que descubre el agente instalado
- [x] 1.5 Probar `triliumnext-mcp` contra la instancia: crear, leer, escribir y buscar una nota de prueba

## 2. Identidad verificada

- [x] 2.1 Resolver el correo del usuario consultando el perfil de Gmail con la sesión ya autorizada
- [x] 2.2 Cachear la identidad resuelta y revalidarla al publicar, nunca confiar en un valor declarado
- [x] 2.3 Preguntar una vez el nombre para mostrar y guardarlo junto a la identidad, sin usarlo para atribuir
- [x] 2.4 Cancelar toda publicación cuando no haya identidad verificable, conservando el trabajo local
- [ ] 2.5 Detectar y avisar cuando el token ETAPI de la instalación y la cuenta de Google correspondan a personas distintas
- [ ] 2.6 Avisar en `setup` si Gmail, Calendar y Chat quedaron autorizados con cuentas distintas
- [x] 2.7 Eliminar el Paso 3 del `AGENT.md`, que deduce el nombre del PM leyendo un correo con `from:me`

## 3. Acceso acotado a Trilium

- [x] 3.1 Añadir `trilium` a los servidores MCP que arranca `vorkanpm mcp`, con URL y token desde la configuración
- [x] 3.2 Implementar el proxy que interpone el ámbito del proyecto entre el agente y el servidor
- [x] 3.3 Rechazar toda escritura cuyo destino no cuelgue de la nota raíz del proyecto de la sesión
- [x] 3.4 Permitir la lectura entre proyectos y dejar constancia de esas consultas
- [x] 3.5 Rechazar la escritura cuando la sesión no esté vinculada a ningún proyecto, indicando cómo vincularla
- [x] 3.6 Verificar con un intento real de escritura cruzada que el proxy la bloquea

## 4. Estructura del repositorio en Trilium

- [x] 4.1 Resolver o crear de forma idempotente las notas de cliente y de año de inicio
- [x] 4.2 Crear la nota raíz del proyecto con sus atributos (cliente, año, identificador, titular, estado)
- [x] 4.3 Crear las seis notas de carpeta y publicar los 47 archivos como notas
- [x] 4.4 Traducir las direcciones lógicas `{project_path}/<carpeta>/<archivo>.md` a notas, en ambos sentidos
- [x] 4.5 Escribir en `CONVENCIONES.md` la regla de traducción, para no tocar las 284 referencias del contenido
- [x] 4.6 Comprobar que un proyecto iniciado en un año y continuado al siguiente permanece bajo su año de inicio
- [x] 4.7 Publicar las notas hoja como `code` con mime `text/x-markdown`, dejando las contenedoras como `text`

## 5. Copia local, publicación y reconciliación

- [x] 5.1 Registrar en `.vorkanpm.json` la vinculación con la nota raíz y la marca de la última sincronización
- [x] 5.2 Implementar `vorkanpm join`: descargar un proyecto existente a una carpeta vacía y vincularla
- [x] 5.3 Detener `join` sin escribir si la carpeta ya está vinculada
- [x] 5.4 Detectar los cambios locales sin publicar
- [x] 5.5 Generar el resumen de publicación en lenguaje de negocio, sin nombres de archivo ni rutas
- [x] 5.6 Exigir aprobación explícita antes de enviar nada, y agrupar los cambios en una sola confirmación
- [x] 5.7 Registrar el identificador de contenido de cada nota al leer y comprobarlo antes de escribir
- [x] 5.8 Reconciliar `memory/` uniendo entradas y deduplicando por el formato de línea del historial
- [x] 5.9 Reconciliar `metrics/` haciendo prevalecer la medición más reciente, con autor y fecha
- [x] 5.10 Reconciliar `risks/` y `scope/` fusionando por identificador de fila
- [x] 5.11 Detener la reconciliación en `data/` y `context/` y presentar la diferencia al titular
- [x] 5.12 Degradar sin bloquear cuando el servidor no responda, dejando la publicación pendiente
- [x] 5.13 Ofrecer publicar lo pendiente al recuperar la conexión

## 6. Roles, aportes y validación

- [x] 6.1 Registrar el PM titular en la nota raíz y resolver el rol del usuario de la sesión
- [x] 6.2 Encaminar los hechos aportados a `memory/`, marcados como no validados y con autor
- [x] 6.3 Encaminar las mediciones aportadas a `metrics/`, con autor y fecha
- [x] 6.4 Convertir en propuesta pendiente todo aporte de un colaborador que afecte a `data/` o `context/`
- [x] 6.5 Informar al titular de los aportes y propuestas pendientes al iniciar sesión
- [x] 6.6 Registrar quién valida o corrige, conservando al autor original del aporte
- [x] 6.7 Hacer visible para el colaborador que su aporte fue corregido
- [x] 6.8 Implementar la cesión de titularidad, con registro en el historial
- [x] 6.9 Permitir tomar la titularidad sin cesión previa, dejando constancia destacada
- [x] 6.10 Comprobar que los aportes no validados siguen siendo consultables y no bloquean nada

## 7. Auditoría de consistencia

- [x] 7.1 Crear la skill `consistencia-proyecto` y su comando
- [x] 7.2 Detectar riesgos distintos que describen el mismo hecho
- [x] 7.3 Detectar compromisos duplicados con responsables distintos
- [x] 7.4 Detectar contradicciones entre el semáforo del proyecto y sus indicadores
- [x] 7.5 Detectar contradicciones entre el cronograma comprometido y el sprint actual
- [x] 7.6 Presentar los hallazgos como propuestas con evidencia, sin modificar nada
- [x] 7.7 Aplicar solo las propuestas aceptadas, atribuidas a quien las aprobó
- [x] 7.8 Ofrecer la auditoría cuando otros PMs hayan escrito desde la última sesión del titular

## 8. Protocolo del agente

- [x] 8.1 Reescribir el protocolo de inicio: identidad por código, proyecto vinculado, aportes pendientes y estado de publicación
- [x] 8.2 Documentar en `CONVENCIONES.md` la política de reconciliación por naturaleza de carpeta
- [x] 8.3 Documentar los roles, el marcado de aportes y los tres campos de autoría
- [x] 8.4 Revisar los 25 skills para que ningún destino de escritura eluda el flujo de publicación

## 9. Verificación de extremo a extremo

- [x] 9.1 Titular publica un proyecto completo por primera vez y queda firmado por él
- [x] 9.2 Colaborador se vincula con `join`, aporta un acuerdo y aparece marcado como no validado
- [x] 9.3 Titular ve el aporte al iniciar sesión, lo corrige, y el colaborador sigue constando como autor
- [x] 9.4 Colaborador propone un cambio de línea base y la línea base no cambia hasta que el titular decide
- [x] 9.5 Dos PMs escriben en el historial sin conexión y al publicar no se pierde ninguna entrada
- [x] 9.6 Con el servidor apagado, una sesión completa de trabajo se conserva y publica al reconectar
- [x] 9.7 Con la sesión de Google caducada, la publicación se cancela y el trabajo local se conserva
- [ ] 9.8 La auditoría detecta un riesgo duplicado introducido a propósito y propone unificarlo

## 10. Documentación y despliegue

- [x] 10.1 Actualizar `MANUAL-USUARIO.md`: aportar, publicar con confirmación, unirse a un proyecto, revisar aportes
- [x] 10.2 Actualizar `LEEME-ADMIN.md`: tokens ETAPI, rotación, estructura del árbol y creación de clientes
- [x] 10.3 Actualizar `AGENTS.md` y `CLAUDE.md` con el modelo de repositorio compartido
- [ ] 10.4 Crear el árbol de clientes y años con los clientes existentes
- [ ] 10.5 Publicar la versión y acompañar a cada titular en su primera publicación

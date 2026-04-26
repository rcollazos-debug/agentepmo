# ALCANCE DETALLADO — FUNCIONAL Y VALIDADO

> Descripción funcional detallada y validada del proyecto: qué debe hacer el sistema desde la perspectiva del usuario y del negocio.
> Este archivo es la fuente de verdad funcional. Toda historia de usuario y caso de uso debe estar alineada con este documento.
> Para el alcance técnico ver `scope/alcancetecnico.md`. Para exclusiones ver `scope/exclusionesalcance.md`.
> Proyecto: **Conde**
> Versión: [v1.0]
> Validado por: [Nombre del cliente / PO — Fecha]
> Actualizado: [fecha]

---

## Control de Versiones del Documento

| Versión | Fecha | Autor | Cambios | Validado por cliente |
|---|---|---|---|---|
| v1.0 | [fecha] | [Nombre BA/PM] | Versión inicial | [Nombre] — [fecha] |
| v1.1 | [fecha] | [Nombre] | [Cambio] | [Nombre] — [fecha] |

---

## Descripción Funcional General

> En 2-3 párrafos: qué hace el sistema, quiénes lo usan, cómo mejora el negocio del cliente.

[Párrafo 1: qué hace el sistema]
[Párrafo 2: perfiles de usuario y flujos principales]
[Párrafo 3: valor de negocio entregado]

---

## Módulos Funcionales

---

### MÓDULO 1 — [Nombre del módulo]

**Objetivo del módulo:** [Para qué sirve este módulo — desde la perspectiva del usuario]

**Usuarios que lo usan:** [Perfiles de usuario que acceden a este módulo]

**Prioridad MoSCoW:** [Must / Should / Could / Won't]

#### Funcionalidades del Módulo 1

| ID | Funcionalidad | Descripción | Flujo principal | Reglas de negocio | Prioridad |
|---|---|---|---|---|---|
| F-1.01 | [Nombre] | [Qué hace] | [Cómo fluye] | [Regla 1, Regla 2] | Must |
| F-1.02 | [Nombre] | [Qué hace] | [Cómo fluye] | [Reglas] | Must |
| F-1.03 | [Nombre] | [Qué hace] | [Cómo fluye] | [Reglas] | Should |

#### Flujos de Usuario — Módulo 1

**Flujo feliz (Happy Path):**
1. [Paso 1: El usuario hace X]
2. [Paso 2: El sistema responde con Y]
3. [Paso 3: El usuario confirma Z]
4. [Paso 4: El sistema guarda y notifica]

**Flujos alternativos:**
- [Si el usuario no tiene permisos → El sistema muestra mensaje de acceso denegado]
- [Si el dato requerido está vacío → El sistema muestra validación en línea]

**Flujos de error:**
- [Error de conexión → El sistema muestra mensaje y permite reintento]
- [Tiempo de sesión vencido → Redirigir al login]

#### Criterios de Aceptación — Módulo 1

| # | Criterio | Cómo se verifica |
|---|---|---|
| CA-1.01 | [El usuario puede realizar X en menos de 3 clics] | [Prueba funcional manual] |
| CA-1.02 | [El sistema valida que Y campo no sea vacío] | [Prueba de validación] |
| CA-1.03 | [Los datos se persisten correctamente en la BD] | [Prueba de integración] |

---

### MÓDULO 2 — [Nombre del módulo]

**Objetivo del módulo:** [Para qué sirve]

**Usuarios que lo usan:** [Perfiles]

**Prioridad MoSCoW:** [Must / Should / Could / Won't]

#### Funcionalidades del Módulo 2

| ID | Funcionalidad | Descripción | Flujo principal | Reglas de negocio | Prioridad |
|---|---|---|---|---|---|
| F-2.01 | [Nombre] | [Descripción] | [Flujo] | [Reglas] | Must |
| F-2.02 | | | | | |

#### Criterios de Aceptación — Módulo 2

| # | Criterio | Cómo se verifica |
|---|---|---|
| CA-2.01 | [Criterio] | [Verificación] |

---

*(Agregar una sección por cada módulo del sistema)*

---

## Requerimientos No Funcionales

> Atributos de calidad que el sistema debe cumplir en todos los módulos.

| ID | Categoría | Requerimiento | Métrica de aceptación | Prioridad |
|---|---|---|---|---|
| RNF-001 | Performance | El sistema debe responder en < 3 segundos para el 95% de las peticiones bajo carga normal | Prueba de carga con [N] usuarios concurrentes | Must |
| RNF-002 | Disponibilidad | El sistema debe tener uptime > 99% en horario de operación | Monitoreo de disponibilidad | Must |
| RNF-003 | Seguridad | Las contraseñas deben almacenarse con bcrypt | Revisión de código | Must |
| RNF-004 | Usabilidad | El sistema debe ser usable sin capacitación para usuarios básicos | Prueba de usabilidad con 3 usuarios | Should |
| RNF-005 | Escalabilidad | El sistema debe soportar [N] usuarios concurrentes sin degradación | Prueba de carga | Should |
| RNF-006 | Compatibilidad | Compatible con Chrome, Firefox, Edge (versiones actuales -1) | Prueba cross-browser | Must |
| RNF-007 | Mantenibilidad | Cobertura de pruebas unitarias > 80% | Reporte JaCoCo/Sonar | Must |

---

## Requerimientos de Reportería y Dashboards

| ID | Reporte / Dashboard | Datos que muestra | Usuario que lo necesita | Formato | Frecuencia |
|---|---|---|---|---|---|
| REP-001 | [Nombre del reporte] | [Datos] | [Perfil de usuario] | [Tabla / Gráfico / Exportable] | [Diario / Semanal / Bajo demanda] |
| REP-002 | | | | | |

---

## Requerimientos de Notificaciones

| ID | Evento disparador | Canal | Destinatario | Contenido |
|---|---|---|---|---|
| NOT-001 | [Ej: Nuevo registro creado] | [Email / SMS / Push / En app] | [Rol de usuario] | [Descripción del contenido] |
| NOT-002 | | | | |

---

## Historias de Usuario de Alto Nivel (Épicas)

| ID Épica | Nombre | Como... | Quiero... | Para... | Story Points estimados |
|---|---|---|---|---|---|
| EP-001 | [Gestión de usuarios] | Administrador | Crear, editar y desactivar usuarios | Controlar el acceso al sistema | [N SP] |
| EP-002 | [Nombre épica] | [Rol] | [Acción] | [Beneficio] | [N SP] |
| EP-003 | | | | | |
| **TOTAL** | | | | | **[N SP]** |

> Para el backlog completo con historias detalladas ver `data/backlog.md`

---

## Preguntas Abiertas / Pendientes de Definición

> Aspectos funcionales que aún no han sido definidos completamente por el cliente.

| # | Pregunta | Módulo afectado | Fecha límite para respuesta | Responsable cliente | Estado |
|---|---|---|---|---|---|
| P-001 | [Descripción de la pregunta o ambigüedad] | [Módulo] | [fecha] | [Nombre] | [Abierta / Respondida] |
| P-002 | | | | | |

---

## Notas de Validación con el Cliente

[Registro de las sesiones de validación funcional realizadas con el cliente: cuándo, quién participó, qué se validó y qué quedó pendiente.]

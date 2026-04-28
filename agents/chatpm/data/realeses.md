# REGISTRO DE RELEASES Y DESPLIEGUES

> Historial de todos los releases, despliegues y entregas al cliente.
> Gestionar con el playbook `realese-riesgo` para releases de alto riesgo.
> Actualizar inmediatamente después de cada despliegue.

---

## Plan de Releases

| Release | Versión | Fecha planificada | Ambiente | Funcionalidades incluidas | Estado |
|---|---|---|---|---|---|
| MVP | v1.0 | [fecha] | Producción | [Lista de features] | Planificado |
| Release 2 | v1.1 | [fecha] | Producción | [Lista de features] | Planificado |
| Release 3 | v2.0 | [fecha] | Producción | [Lista de features] | Planificado |

---

## Historial de Releases Realizados

### Release: v[X.Y.Z] — [Nombre del release]

| Campo | Valor |
|---|---|
| Versión | v[X.Y.Z] |
| Nombre del release | [Nombre descriptivo] |
| Ambiente | [Staging / Producción] |
| Fecha planificada | [Fecha] |
| Fecha real | [Fecha] |
| Variación | [0 / +X días] |
| Responsable técnico | [Nombre] |
| PM | [Nombre] |
| Aprobado por | [Nombre] |

**Funcionalidades incluidas:**
- [US-XXX: Descripción de la historia]
- [US-XXX: Descripción]

**Resultados del Go/No-Go:**
- Defectos críticos: [X — todos resueltos]
- UAT aprobado por: [Nombre cliente] el [fecha]
- QA sign-off: [Nombre] el [fecha]

**Estado del release:**
- [ ] Desplegado exitosamente
- [ ] Sin incidentes en las primeras 24h
- [ ] Sin incidentes en las primeras 72h
- [ ] Cliente confirma funcionamiento

**Incidentes post-release:**
| Incidente | Severidad | Detectado | Resuelto | Descripción |
|---|---|---|---|---|
| — | — | — | — | Sin incidentes |

**Rollback ejecutado:** [No / Sí — Descripción]

**Lecciones del release:**
- [Lección 1]
- [Lección 2]

---

## Métricas de Releases

| Métrica | Meta | Real | Tendencia |
|---|---|---|---|
| Releases a tiempo | 100% | X% | [↑→↓] |
| Releases sin rollback | 100% | X% | [↑→↓] |
| Defectos post-release (primeras 48h) | 0 críticos | X | [↑→↓] |
| Tiempo de deploy | < X min | X min | [↑→↓] |

---

## Ambientes del Proyecto

| Ambiente | Propósito | URL | Responsable | Estado |
|---|---|---|---|---|
| Development | Desarrollo local / feature branches | [URL o local] | Dev Team | [Activo] |
| Staging / QA | Pruebas integradas y QA | [URL] | DevOps | [Activo] |
| UAT | Validación del cliente | [URL] | PM + DevOps | [Activo] |
| Producción | Sistema live | [URL] | DevOps | [Activo] |

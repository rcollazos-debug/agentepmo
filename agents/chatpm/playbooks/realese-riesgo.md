# PLAYBOOK: Release de Alto Riesgo

## Activación

Se activa cuando se aproxima un release o despliegue a producción que presenta factores de riesgo significativos: alta criticidad del negocio, componentes sin prueba completa, integraciones complejas, o historial de fallos en despliegues anteriores.

**Señales de activación:**
- Release con funcionalidades críticas que afectan procesos core del negocio
- Dependencias de terceros no probadas en ambiente productivo
- Primer despliegue en un ambiente nuevo o migración de datos
- Defectos conocidos catalogados como aceptables por el cliente
- Ventana de despliegue estrecha con alta visibilidad
- El equipo o el cliente expresan nerviosismo sobre el release

---

## Principio PMBOK 8 aplicado

Dominio: Entrega (Delivery Performance Domain) + Incertidumbre
Principio: Construir calidad en procesos y entregables | Optimizar respuestas a riesgos | Abrazar adaptabilidad y resiliencia

---

## Paso 1 — Go/No-Go Checklist (mínimo 48h antes del release)

Revisar cada criterio. Si algún criterio crítico no pasa: el release NO va.

### Criterios técnicos:
- [ ] Todos los defectos críticos resueltos y verificados
- [ ] Defectos altos resueltos o documentados con workaround aprobado por el cliente
- [ ] Pruebas de regresión completas y pasando
- [ ] Pruebas de performance realizadas en ambiente similar a producción
- [ ] Pruebas de integración con sistemas externos completadas
- [ ] Script de rollback probado y funcional
- [ ] Backups verificados y restauración probada
- [ ] Variables de ambiente de producción configuradas y verificadas
- [ ] Logs y monitoreo configurados
- [ ] Plan de deployment documentado paso a paso

### Criterios de proceso:
- [ ] Aprobación QA formal obtenida
- [ ] Sign-off del cliente / PO en las funcionalidades incluidas
- [ ] Ventana de mantenimiento comunicada a los usuarios finales
- [ ] Equipo de soporte informado de los cambios
- [ ] Equipo de operaciones/DevOps disponible durante el despliegue
- [ ] PM disponible durante la ventana de despliegue
- [ ] Canal de comunicación de emergencia activo

---

## Paso 2 — Plan de despliegue detallado

```
PLAN DE DESPLIEGUE — [NOMBRE DEL RELEASE]
Fecha: [fecha] | Ventana: [hora inicio] a [hora fin]
Responsable técnico: [nombre]
PM: [nombre]

PASOS DEL DEPLOYMENT
| Paso | Descripción | Responsable | Duración estimada | Criterio de éxito |
|---|---|---|---|---|

VALIDACIONES POST-DEPLOY
| Validación | Responsable | Criterio de éxito |
|---|---|---|

PUNTOS DE DECISIÓN GO/NO-GO DURANTE EL DEPLOY
[Definir en qué momentos del deploy se hace una pausa para evaluar si continuar]
```

---

## Paso 3 — Plan de rollback

**Criterios de rollback** (cuándo ejecutarlo):
- Error crítico que impide el funcionamiento del sistema
- Pérdida o corrupción de datos detectada
- Performance degradada > 50% del baseline
- Fallo en validación de flujo crítico del negocio

**Procedimiento de rollback:**
```
1. Tomar la decisión de rollback (quién decide: [nombre/rol])
2. Notificar al cliente y sponsor de inmediato
3. Ejecutar el rollback según el procedimiento documentado
4. Verificar que el sistema anterior está estable
5. Comunicar a usuarios que el sistema está operativo en versión anterior
6. Investigar la causa del fallo antes de intentar el release nuevamente
```

**Tiempo máximo para decidir rollback:** [X minutos] desde detectado el problema.

---

## Paso 4 — Comunicación del release

**A los usuarios finales (mínimo 48h antes):**
```
Asunto: Actualización programada del sistema [nombre] — [fecha]
Estimados usuarios:
El [fecha] entre las [hora inicio] y las [hora fin] realizaremos 
una actualización del sistema [nombre].
Durante este período el sistema [estará disponible / no estará disponible].
Cambios incluidos: [lista breve de lo nuevo]
Para consultas: [canal de soporte]
```

**Al equipo de soporte (antes del release):**
- Lista de cambios y nuevas funcionalidades
- Preguntas frecuentes anticipadas
- Cómo manejar reportes de errores durante las primeras 24h post-release

---

## Paso 5 — Monitoreo post-release (24-72 horas)

**Primeras 2 horas:**
- Monitoreo activo del equipo técnico
- Verificación de todos los flujos críticos del negocio
- Revisión de logs en tiempo real
- Disponible para rollback inmediato

**Primeras 24 horas:**
- Revisión de métricas de performance cada hora
- Canal abierto con el cliente para reporte de incidentes
- Bugfix inmediato para cualquier defecto crítico encontrado

**72 horas post-release:**
- Retrospectiva del deployment: qué funcionó, qué mejorar
- Cierre formal del release en el log del proyecto
- Actualizar `data/realeses.md`

---

## Paso 6 — Actualizar archivos

- `data/realeses.md` — release documentado
- `memory/historial.md` — evento registrado
- `metrics/delivery.md` — actualizar métricas de delivery
- `risks/technical-risks.md` — cerrar riesgos resueltos, abrir nuevos si aplica


---

## Activadores

Este playbook se activa típicamente desde los siguientes comandos:
- `/release`

# PLAYBOOK: Crisis de Producción

## Activación

Este playbook se activa cuando ocurre un incidente en el ambiente productivo que afecta la disponibilidad, funcionalidad o integridad de datos del sistema entregado.

**Señales de activación:**
- Sistema productivo caído (downtime)
- Pérdida o corrupción de datos
- Fallo de seguridad o acceso no autorizado
- Degradación severa de performance (> 50% del baseline)
- Error crítico en proceso de negocio clave del cliente

---

## Principio PMBOK 8 aplicado

Dominio: Trabajo del Proyecto + Incertidumbre
Principio: Navegar complejidad | Optimizar respuestas a riesgos | Abrazar adaptabilidad y resiliencia

---

## Fase 1 — Detección y declaración (0-15 minutos)

1. **Confirmar el incidente:** ¿Es real? ¿En producción? ¿Cuántos usuarios afectados?
2. **Declarar P1 (Prioridad 1)** si el impacto es en producción y afecta procesos críticos
3. **Notificar inmediatamente a:**
   - Tech Lead / CTO: llamada telefónica
   - PM del proyecto: llamada telefónica
   - Sponsor (si el cliente es externo): mensaje de texto + email

**Mensaje inicial al cliente (máx 5 min después de confirmar):**
```
Estimado [nombre]:
Hemos detectado un problema en el sistema [nombre] que está siendo investigado 
con carácter urgente. Nuestro equipo está trabajando en ello. 
Les informaremos con actualizaciones cada 30 minutos.
PM: [nombre] | Tel: [número]
```

---

## Fase 2 — Contención (15-60 minutos)

**Acciones inmediatas de contención:**
- Activar el War Room (sala/call de crisis con el equipo técnico)
- Aislar el componente fallido si es posible
- Activar rollback si hay una versión estable previa disponible
- Activar modo mantenimiento si aplica para proteger datos
- Verificar backups y su integridad

**Guerra de diagnóstico (War Room):**
```
ROLES EN EL WAR ROOM
- Incident Commander: PM o Tech Lead designado
- Investigador técnico: Dev senior / DevOps
- Comunicador: PM (único punto de contacto con el cliente)
- Documentador: alguien que registra todo lo que pasa
```

**Preguntas de diagnóstico:**
1. ¿Cuándo empezó exactamente?
2. ¿Qué cambio precedió al incidente? (último deploy, configuración, datos)
3. ¿Qué componentes exactamente están fallando?
4. ¿Es aislado o cascada de fallos?
5. ¿Hay logs de error disponibles? ¿Qué dicen?
6. ¿El rollback es posible y seguro?

---

## Fase 3 — Resolución (variable según severidad)

**Árbol de decisión de resolución:**

```
¿Rollback disponible y seguro?
  SÍ → Ejecutar rollback → Validar → Comunicar restauración
  NO → ¿Hay hotfix posible?
         SÍ → Desarrollar hotfix → QA rápido → Deploy → Validar
         NO → Activar contingencia operativa:
              - Proceso manual alternativo para el cliente
              - Comunicar tiempo estimado de resolución realista
              - Escalar a arquitectura para solución estructural
```

**Criterio de validación post-resolución:**
- Sistema funciona al 100% en flujos críticos
- Ningún dato perdido o corregido
- Performance dentro del baseline
- Logs limpios sin errores críticos
- Cliente confirma funcionamiento

---

## Fase 4 — Comunicación durante el incidente

**Cadencia de actualizaciones al cliente:**
- Cada 30 minutos durante la crisis
- Aunque no haya novedades → siempre actualizar que se sigue trabajando

**Estructura del update:**
```
ACTUALIZACIÓN [N] — [HORA]
Estado: [En investigación / Contención activa / En resolución / Resuelto]
Situación: [qué está pasando en 1-2 líneas]
Usuarios afectados: [alcance]
Próxima actualización: en [X] minutos
```

---

## Fase 5 — Post-mortem (24-48 horas después)

**Objetivos del post-mortem:**
- Identificar causa raíz real (no superficial)
- Entender por qué los controles de prevención fallaron
- Definir acciones para que no se repita
- NO buscar culpables → buscar mejoras sistémicas

**Formato del post-mortem:**
```
POST-MORTEM — [NOMBRE INCIDENTE]
Fecha del incidente: [fecha] | Duración: [X horas X minutos]
Preparado por: [nombre]

LÍNEA DE TIEMPO
[Lista cronológica de eventos desde detección hasta resolución]

IMPACTO
- Usuarios afectados: [número]
- Tiempo de downtime: [X minutos]
- Pérdida de datos: [Sí/No] | Descripción: [si aplica]
- Impacto económico estimado: [si aplica]

CAUSA RAÍZ
[Descripción técnica de la causa raíz real]

POR QUÉ NO SE DETECTÓ ANTES
[Análisis de los controles preventivos que fallaron]

ACCIONES CORRECTIVAS
| Acción | Responsable | Fecha | Previene qué |
|---|---|---|---|

LECCIONES APRENDIDAS
[Lista de aprendizajes para el equipo]
```

**Actualizar:**
- `memory/historial.md` — incidente registrado
- `memory/decisiones.md` — decisiones tomadas durante la crisis
- `risks/risk-register.md` — nuevos riesgos identificados post-mortem

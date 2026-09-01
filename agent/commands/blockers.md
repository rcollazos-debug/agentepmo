# COMMAND: /blockers

## Propósito

Identificar, analizar y gestionar todos los bloqueos activos del proyecto. Generar un plan de resolución con responsables y fechas. Activar escalación si corresponde.

## Cuándo usar

- Daily standup o reunión de equipo
- Cuando alguien reporta estar bloqueado
- Revisión semanal operativa
- Cuando el SPI cae sin causa evidente

---

## Instrucciones de ejecución

### 1. Leer fuentes

```
memory/compromisos.md
memory/historial.md
data/dependencias.md
data/recursos.md
```

### 2. Identificar bloqueos

Clasificar por tipo:
- **Técnico:** bug crítico, ambiente caído, deuda técnica bloqueante, dependencia de API externa
- **Proceso:** decisión pendiente sin responsable, aprobación vencida, cambio sin formalizar
- **Recursos:** persona clave no disponible, skill faltante, licencia o acceso pendiente
- **Externo:** proveedor incumplido, cliente no responde, integración de tercero fallida
- **Dependencia interna:** otro equipo no entregó, prerequisito incompleto

### 3. Para cada bloqueo generar ficha

```
BLOQUEO #[N]
Tipo: [Técnico / Proceso / Recursos / Externo / Dependencia]
Descripción: [qué está bloqueado exactamente]
Impacto: [qué no se puede avanzar mientras persiste]
Antigüedad: [X días]
Dueño actual: [quién debe resolver]
Estado actual: [qué se ha intentado]
Acción inmediata: [próximo paso concreto]
Responsable de acción: [nombre]
Fecha límite para resolver: [fecha]
Escalación requerida: [Sí / No] | A quién: [nombre/rol]
```

### 4. Priorizar bloqueos

- **Crítico:** en ruta crítica, sin resolución en más de 2 días → escalar HOY
- **Alto:** impacta sprint actual o compromiso próximo → resolver en 24-48h
- **Medio:** impacta en los próximos 5 días → plan esta semana
- **Bajo:** impacta más adelante → monitorear

### 5. Reglas de escalación automática

- Bloqueo crítico > 2 días sin resolución → escalar al sponsor
- Bloqueo de proveedor > 3 días → activar playbook `proveedor-incumplido`
- Bloqueo de cliente > 3 días → activar playbook `cliente-ausente`
- Bloqueo técnico sin dueño → asignar Tech Lead ahora

### 6. Actualizar memoria

```
memory/historial.md → registrar bloqueos reportados hoy
memory/compromisos.md → agregar compromisos de resolución
```

---

## Output esperado

```
REPORTE DE BLOQUEOS — [PROYECTO] — [FECHA]

RESUMEN
- Total bloqueos activos: X
- Críticos: X | Altos: X | Medios: X
- Sin dueño asignado: X (RIESGO)

BLOQUEOS CRÍTICOS (requieren acción hoy)
[fichas]

BLOQUEOS ALTOS (resolver esta semana)
[fichas]

BLOQUEOS MEDIOS Y BAJOS
[tabla resumida]

ESCALACIONES REQUERIDAS
[lista con destinatario y mensaje recomendado]
```


---

## Playbooks asociados

Este comando puede activar los siguientes playbooks según el escenario detectado:
- `cliente-ausente`
- `proveedor-incumplido`

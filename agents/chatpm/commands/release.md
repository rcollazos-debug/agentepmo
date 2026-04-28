# COMMAND: /release

## Propósito

Gestionar el proceso completo de un release o deploy a producción: pre-release gate, ejecución y post-release. Garantiza que ningún deploy ocurra sin las verificaciones mínimas de calidad, sin comunicación a los stakeholders y sin un plan de rollback.

## Cuándo usar

- "vamos a hacer un release", "deploy a producción", "push a prod/staging"
- "¿podemos pasar a producción?", "release esta noche", "subimos mañana"
- "¿el sistema está listo para producción?"
- Al terminar un sprint que incluye entregables desplegables

---

## Instrucciones de ejecución

### Paso 1 — Leer fuentes

```
metrics/calidad.md
data/sprint-actual.md
data/realeses.md
memory/compromisos.md
memory/historial.md
context/proyecto-base.md
```

### Paso 2 — Pre-Release Gate

Verificar **todos** los criterios en orden. Un solo criterio rojo = BLOQUEADO.

| # | Criterio | Fuente | Umbral |
|---|---|---|---|
| 1 | Defectos críticos abiertos | `metrics/calidad.md` | = 0 |
| 2 | Defectos altos abiertos | `metrics/calidad.md` | ≤ 2 |
| 3 | Cobertura de pruebas | `metrics/calidad.md` | ≥ umbral definido en contrato |
| 4 | Regresión ejecutada | `metrics/calidad.md` | Sí / confirmado por QA |
| 5 | Aprobación formal del PO/cliente | `memory/compromisos.md` | Confirmada |
| 6 | Plan de rollback documentado | PM confirma o `data/realeses.md` | Existe |
| 7 | Backup antes del deploy | PM confirma | Confirmado |
| 8 | Ventana de mantenimiento acordada | `context/stakeholders.md` | Comunicada |

**Si hay defectos críticos abiertos:**
```
🚫 RELEASE BLOQUEADO — Defectos críticos sin resolver

Defectos críticos abiertos:
  • [DEF-XXX] — {descripción} — Asignado a: {nombre} — Abierto desde: {fecha}

El release no puede proceder con defectos críticos. Opciones:
  1. Resolver los defectos y volver a ejecutar /release
  2. Excluir del alcance del release las funcionalidades afectadas
  3. Forzar el release asumiendo el riesgo formalmente (requiere aprobación del Sponsor)

¿Qué quieres hacer?
```

**Si el PM quiere forzar el release a pesar de un bloqueo:**
→ Pedir confirmación explícita: "¿Confirmas que quieres proceder con el riesgo conocido? Esta decisión quedará registrada."
→ Si confirma: registrar en `risks/risk-register.md` como riesgo materializado + en `memory/historial.md`

---

### Paso 3 — Veredicto del Gate

```
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
🚀 GATE DE RELEASE — {project_name} v{versión} — {fecha}
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

CRITERIOS:
  ✅/🚫/⚠️  Defectos críticos: {N} abiertos
  ✅/🚫/⚠️  Defectos altos: {N} abiertos
  ✅/🚫/⚠️  Cobertura de pruebas: {X}% (umbral: {Y}%)
  ✅/🚫/⚠️  Regresión: {ejecutada/pendiente}
  ✅/🚫/⚠️  Aprobación PO/cliente: {confirmada/pendiente}
  ✅/🚫/⚠️  Plan de rollback: {existe/pendiente}
  ✅/🚫/⚠️  Backup: {confirmado/pendiente}
  ✅/🚫/⚠️  Ventana de mantenimiento: {comunicada/pendiente}

VEREDICTO: ✅ APROBADO / 🚫 BLOQUEADO / ⚠️ CONDICIONADO

{Si condicionado: lista de condiciones a resolver antes de proceder}
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
```

---

### Paso 4 — Checklist de Ejecución del Deploy

Si el gate pasa (✅ Aprobado o ⚠️ Condicionado resuelto), generar el checklist secuencial:

```
📋 CHECKLIST DE DEPLOY — {project_name} v{versión}

PRE-DEPLOY (responsable: {DevOps/TechLead})
  [ ] 1. Backup de base de datos completado
  [ ] 2. Tag de versión creado en repositorio
  [ ] 3. Deploy en ambiente staging validado
  [ ] 4. Rollback plan revisado y operativo
  [ ] 5. Equipo de soporte notificado

COMUNICACIÓN PRE-DEPLOY
  [ ] 6. Cliente notificado (ventana de mantenimiento)
  [ ] 7. Usuarios finales notificados (si corresponde)
  [ ] 8. Equipo interno en standby

EJECUCIÓN (responsable: {DevOps})
  [ ] 9. Iniciar deploy en producción
  [ ] 10. Monitorear logs durante el deploy
  [ ] 11. Smoke tests post-deploy
  [ ] 12. Verificar integraciones críticas

POST-DEPLOY (responsable: PM)
  [ ] 13. Confirmar funcionamiento con cliente/PO
  [ ] 14. Monitorear KPIs de sistema por 24h
  [ ] 15. Cerrar tickets del release en issue tracker
  [ ] 16. Registrar release en memory/historial.md
```

---

### Paso 5 — Comunicado Post-Release

Generar plantilla de comunicado al cliente tras deploy exitoso:

```
Asunto: ✅ Release {versión} — {project_name} desplegado exitosamente

{nombre del interlocutor cliente},

Con satisfacción te informamos que el release {versión} del proyecto {project_name} fue
desplegado exitosamente en producción el {fecha} a las {hora}.

¿QUÉ INCLUYE ESTE RELEASE?
• {funcionalidad 1}
• {funcionalidad 2}
• {correcciones incluidas}

CÓMO VALIDAR
Por favor verifica {funcionalidades principales} y confirma que todo esté operativo.
Ante cualquier inconveniente, contáctanos de inmediato.

Equipo {VortexBird/nombre del proyecto}
```

---

### Paso 6 — Actualizar archivos

- `data/realeses.md` → agregar entrada del release con versión, fecha, ambiente, funcionalidades incluidas
- `memory/historial.md` → `[{fecha}] RELEASE v{versión} a {ambiente} — {veredicto gate}: {N} funcionalidades, {N} defectos resueltos`
- `metrics/calidad.md` → actualizar conteo de defectos post-release
- `metrics/dashboard.md` → si corresponde, actualizar semáforo

---

## Output esperado

Gate de release con:
- Veredicto claro (✅ Aprobado / 🚫 Bloqueado / ⚠️ Condicionado)
- Lista de criterios con estado individual
- Checklist de ejecución del deploy (si aprobado)
- Plantilla de comunicado post-deploy
- Registro en memoria del proyecto

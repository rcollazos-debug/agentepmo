# PLAYBOOK: Presupuesto en Estado Crítico

## Activación

Se activa cuando el proyecto muestra indicadores de sobrecosto que ponen en riesgo el margen de VortexBird o el cumplimiento del presupuesto acordado con el cliente.

**Señales de activación:**
- CPI < 0.85 por dos períodos consecutivos
- EAC proyectado supera el BAC en > 10%
- Margen VortexBird proyectado < 20%
- Horas consumidas > 90% del presupuesto con < 80% de avance
- Reserva de contingencia < 20% restante

---

## Principio PMBOK 8 aplicado

Dominio: Medición + Incertidumbre + Trabajo del Proyecto
Principio: Enfocarse en el valor | Optimizar respuestas a riesgos | Navegar complejidad

---

## Fase 1 — Diagnóstico Financiero (Inmediato)

**Alertar al Gerente PMO VortexBird dentro de 24 horas.**

### Leer en orden:
```
context/vortexbird.md
metrics/financiero.md
data/presupuesto.md
data/recursos.md
data/cambios.md
memory/historial.md (3 últimas semanas)
```

### Calcular estado crítico:

```
DIAGNÓSTICO FINANCIERO CRÍTICO
CPI: X.XX (< 0.85 = CRÍTICO)
CV: $X (costo sobre presupuesto)
EAC proyectado: $X (BAC: $X)
Sobrecosto proyectado: $X (X% del BAC)
Margen proyectado: X% (meta VortexBird: ≥ 30%)
Reserva de contingencia disponible: $X (X% del asignado)
```

---

## Fase 2 — Identificar Causas del Sobrecosto

Investigar las causas del CPI bajo:

| Causa posible | Verificar en | Señal |
|---|---|---|
| Scope creep sin CR | `data/cambios.md` + horas reales | Trabajo ejecutado sin CR aprobada |
| Estimaciones optimistas | Comparar estimado vs real por tarea | Consistentemente más horas de las estimadas |
| Retrabajo excesivo | `metrics/calidad.md` | Tasa de defectos alta o historias devueltas frecuentemente |
| Subutilización del equipo | `data/recursos.md` | Horas disponibles vs horas productivas |
| Recursos senior en tareas junior | Revisión de asignación de tareas | Tech lead o senior haciendo tareas de baja complejidad |
| Reuniones excesivas | Factor de dedicación real | Factor < 0.60 = el equipo está en reuniones más de lo necesario |
| Problemas técnicos imprevistos | `memory/historial.md` | Spikes técnicos, deuda técnica, integraciones complejas |

---

## Fase 3 — Opciones de Respuesta

Evaluar y proponer al Gerente PMO VortexBird:

**Opción A — Reducir costos internos:**
- Reasignar tareas de senior a mid según complejidad
- Reducir overhead de reuniones no productivas
- Optimizar proceso de code review y QA para ser más eficiente
- Congelar gastos no esenciales del proyecto (licencias extra, herramientas no usadas)

**Opción B — Recuperar trabajo no facturado:**
- Identificar scope creep ejecutado sin CR → formalizar CR retroactiva y negociar con el cliente
- Revisar si hay soporte post-entrega gratuito que debería ser facturado
- Identificar CRs aprobadas pero no facturadas aún

**Opción C — Reducir alcance (si el contrato lo permite):**
- Proponer al cliente diferir funcionalidades Could/Won't a una Fase 2 pagada
- Negociar un alcance reducido sin penalización de precio

**Opción D — Renegociar con el cliente:**
- Si el sobrecosto viene de cambios solicitados por el cliente → presentar análisis de impacto formal
- Presentar propuesta de CR global que cubra el sobre-esfuerzo generado

**Opción E — Absorber la pérdida (última instancia):**
- Solo si las opciones A-D no son viables
- Documentar las causas raíz para que no se repita en futuros proyectos
- Registrar como lección aprendida crítica

---

## Fase 4 — Comunicación Interna VortexBird

**Inmediato:** Notificar al Gerente PMO VortexBird con el diagnóstico completo:

```
ALERTA FINANCIERA — PROYECTO [NOMBRE]
Fecha: [fecha]
CPI: X.XX | EAC: $X | Margen proyectado: X%
Causa raíz identificada: [descripción]
Opciones propuestas: [A/B/C/D]
Decisión requerida: [descripción]
Plazo de decisión: [fecha]
```

---

## Fase 5 — Comunicación con el Cliente (si aplica)

**Solo si la causa raíz implica trabajo del cliente o CRs pendientes.**

Nunca comunicar al cliente una pérdida de VortexBird sin análisis interno previo.

Si hay CRs que justifican la conversación:
1. Preparar análisis de impacto documentado
2. Presentar en reunión (no por email)
3. Proponer opciones (absorber vs. CR formal)
4. Lograr acuerdo escrito

---

## Fase 6 — Plan de Control Financiero Reforzado

Post-diagnóstico, implementar:
- Seguimiento semanal de horas consumidas vs presupuesto (no mensual)
- Revisión de CPI cada viernes
- Ninguna hora adicional al equipo sin aprobación del PM
- Todas las solicitudes del cliente documentadas como potenciales CRs
- Punto de no retorno: si para [fecha] el CPI no mejora a ≥ 0.88 → escalar de nuevo

---

## Actualizar archivos

- `metrics/financiero.md` — estado actualizado con alertas
- `memory/historial.md` — evento crítico registrado
- `memory/riesgo.md` — riesgo financiero crítico documentado
- `metrics/dashboard.md` — semáforo financiero en ROJO


---

## Activadores

Este playbook se activa típicamente desde los siguientes comandos:
- `/margen`

# MAPA DE CALOR DE RIESGOS — Risk Heatmap

> Representación visual de la distribución de riesgos por probabilidad e impacto.
> Actualizar después de cada sesión de revisión de riesgos.

---

## Mapa de Calor (Matriz 5×5)

```
IMPACTO →         Muy Bajo   Bajo      Medio     Alto      Muy Alto
                    (0.05)   (0.10)    (0.20)    (0.40)    (0.80)
                  ┌──────────┬─────────┬──────────┬──────────┬──────────┐
MUY ALTA  (0.90) │  0.045   │  0.090  │  0.180   │  0.360   │  0.720   │
                  │  [MEDIO] │ [MEDIO] │  [ALTO]  │  [CRIT]  │  [CRIT]  │
                  ├──────────┼─────────┼──────────┼──────────┼──────────┤
ALTA      (0.75) │  0.038   │  0.075  │  0.150   │  0.300   │  0.600   │
                  │  [BAJO]  │ [MEDIO] │  [ALTO]  │  [CRIT]  │  [CRIT]  │
                  ├──────────┼─────────┼──────────┼──────────┼──────────┤
MEDIA     (0.50) │  0.025   │  0.050  │  0.100   │  0.200   │  0.400   │
                  │  [BAJO]  │ [BAJO]  │  [MEDIO] │  [ALTO]  │  [CRIT]  │
                  ├──────────┼─────────┼──────────┼──────────┼──────────┤
BAJA      (0.25) │  0.013   │  0.025  │  0.050   │  0.100   │  0.200   │
                  │  [BAJO]  │ [BAJO]  │  [BAJO]  │  [MEDIO] │  [ALTO]  │
                  ├──────────┼─────────┼──────────┼──────────┼──────────┤
MUY BAJA  (0.10) │  0.005   │  0.010  │  0.020   │  0.040   │  0.080   │
                  │  [BAJO]  │ [BAJO]  │  [BAJO]  │  [BAJO]  │  [MEDIO] │
                  └──────────┴─────────┴──────────┴──────────┴──────────┘

LEYENDA DE NIVELES:
[CRIT]  = Crítico  → Score ≥ 0.40 → Acción inmediata
[ALTO]  = Alto     → Score 0.20-0.39 → Plan de respuesta requerido
[MEDIO] = Medio    → Score 0.08-0.19 → Monitoreo activo
[BAJO]  = Bajo     → Score < 0.08 → Monitoreo pasivo
```

---

## Posicionamiento actual de riesgos del proyecto

> Completar con los IDs de los riesgos del proyecto posicionados en cada celda.

```
IMPACTO →         Muy Bajo   Bajo      Medio     Alto      Muy Alto
                  ┌──────────┬─────────┬──────────┬──────────┬──────────┐
MUY ALTA  (0.90) │          │         │          │          │          │
                  ├──────────┼─────────┼──────────┼──────────┼──────────┤
ALTA      (0.75) │          │         │          │          │          │
                  ├──────────┼─────────┼──────────┼──────────┼──────────┤
MEDIA     (0.50) │          │         │          │          │          │
                  ├──────────┼─────────┼──────────┼──────────┼──────────┤
BAJA      (0.25) │          │         │          │          │          │
                  ├──────────┼─────────┼──────────┼──────────┼──────────┤
MUY BAJA  (0.10) │          │         │          │          │          │
                  └──────────┴─────────┴──────────┴──────────┴──────────┘
```

---

## Resumen de distribución de riesgos

| Nivel | Cantidad | IDs | Acción |
|---|---|---|---|
| Crítico | 0 | | Acción inmediata requerida |
| Alto | 0 | | Plan de respuesta activo |
| Medio | 0 | | Monitoreo activo semanal |
| Bajo | 0 | | Monitoreo pasivo mensual |
| **Total** | **0** | | |

---

## Tendencia del mapa de calor

| Período | Críticos | Altos | Medios | Bajos | Evaluación |
|---|---|---|---|---|---|
| [Período actual] | 0 | 0 | 0 | 0 | Inicial |
| [Período anterior] | — | — | — | — | — |

---

## Reglas de acción por zona

### Zona Roja (Crítico — Score ≥ 0.40)
- Plan de respuesta formal con dueño asignado
- Escalación al sponsor dentro de 24 horas
- Revisión de estado cada 3 días
- Incluir en agenda del próximo comité directivo
- Reserva de contingencia asignada

### Zona Naranja (Alto — Score 0.20-0.39)
- Plan de respuesta documentado y activo
- Revisión semanal en el seguimiento del proyecto
- Dueño asignado con fechas concretas
- Reportado en el status report ejecutivo

### Zona Amarilla (Medio — Score 0.08-0.19)
- Monitoreo activo en cada seguimiento semanal
- Plan de contingencia preparado pero no activado
- Revisar si el contexto cambia su scoring

### Zona Verde (Bajo — Score < 0.08)
- Lista de observación
- Revisión mensual en la sesión de riesgos
- Sin acción proactiva requerida

---

Última actualización: [fecha]
Próxima revisión: [fecha]

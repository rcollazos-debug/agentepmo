# COMMAND: /margen

## Propósito

Analizar el estado financiero del proyecto con foco en el margen de VortexBird. Calcular CPI, VAC, margen proyectado al cierre e identificar fugas de margen. Alertar si el margen está en riesgo.

## Cuándo usar

- Revisión financiera mensual o quincenal
- CPI < 0.95 (señal de alerta)
- Antes de presentación al comité directivo
- Cuando hay CRs aprobadas con impacto económico
- Para verificar si el proyecto sigue siendo rentable para VortexBird

---

## Instrucciones de ejecución

### 1. Leer fuentes (en orden)

```
context/vortexbird.md
metrics/financiero.md
data/presupuesto.md
data/recursos.md
data/cambios.md
context/contrato.md
memory/historial.md
```

### 2. Activar SKILL: financiero-control

Ejecutar el protocolo completo del skill de control financiero:
- Calcular indicadores EVM (CPI, CV, EAC, VAC, TCPI)
- Calcular margen real proyectado al cierre
- Identificar fugas de margen (scope creep, retrabajo, subutilización)
- Revisar hitos de facturación próximos
- Clasificar semáforo financiero

### 3. Evaluar alertas VortexBird

| Condición | Acción |
|---|---|
| CPI < 0.85 | Escalar a Gerente PMO VortexBird INMEDIATAMENTE |
| Margen proyectado < 20% | Plan de recuperación financiero |
| Horas fuera de alcance > 0 | Detener y formalizar CR |
| Hito de facturación vencido | Acelerar entregable o renegociar |

### 4. Generar reporte financiero

Usar el formato de salida definido en el skill `financiero-control`.

### 5. Actualizar memoria

- Agregar entrada en `memory/historial.md`: "Análisis financiero [fecha] | CPI: X.XX | Margen: X%"
- Si hay alertas → registrar en `memory/riesgo.md`

---

## Output esperado

Reporte financiero con:
- CPI / CV / EAC / VAC / TCPI
- Margen VortexBird proyectado vs meta (30%)
- Hitos de facturación próximos
- Fugas de margen identificadas
- Semáforo financiero (🟢 / 🟡 / 🔴)
- Acciones recomendadas con responsable y fecha


---

## Playbooks asociados

Este comando puede activar los siguientes playbooks según el escenario detectado:
- `presupuesto-critico`

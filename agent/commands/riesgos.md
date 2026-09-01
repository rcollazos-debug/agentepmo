# COMMAND: /riesgos

## Propósito

Ejecutar una sesión completa de gestión de riesgos: identificar nuevos riesgos, revisar los activos, actualizar scoring, verificar respuestas y emitir el top de riesgos con recomendaciones.

## Cuándo usar

- Revisión semanal o quincenal de riesgos
- Antes de un hito o release importante
- Cuando el semáforo cambia a AMARILLO o ROJO
- Cuando ocurre un evento inesperado en el proyecto
- Solicitud del sponsor o comité

---

## Instrucciones de ejecución

### 1. Leer fuentes

```
risks/risk-register.md
risks/top-risks.md
risks/technical-risks.md
risks/delivery-risks.md
risks/stakeholder-risks.md
risks/vendor-risks.md
risks/security-risks.md
risks/assumptions.md
risks/opportunities.md
memory/riesgo.md
context/proyecto-base.md
```

### 2. Revisar riesgos activos

Para cada riesgo en el registro verificar:
- ¿El scoring sigue siendo válido? (P × I)
- ¿El plan de respuesta se está ejecutando?
- ¿Hay señales de materialización?
- ¿Cambió el contexto que afecte la probabilidad?
- ¿Vence algún disparador (trigger) en los próximos días?

### 3. Identificar riesgos nuevos

Preguntas de identificación:
- ¿Hay nuevas dependencias externas no previstas?
- ¿Algún recurso clave está en riesgo?
- ¿El cliente está mostrando señales de cambio de alcance?
- ¿Hay deuda técnica acumulándose que pueda bloquear?
- ¿Hay integraciones sin probar en ambiente productivo?
- ¿Algún supuesto del proyecto fue invalidado recientemente?
- ¿Hay un release próximo con componentes no validados?

### 4. Calcular y actualizar scoring

Usar matriz de la skill `gestion-riesgos`:
- Probabilidad (0.10 / 0.25 / 0.50 / 0.75 / 0.90)
- Impacto (0.05 / 0.10 / 0.20 / 0.40 / 0.80)
- Score = P × I
- Nivel: Crítico (>=0.40) / Alto (0.20-0.39) / Medio (0.08-0.19) / Bajo (<0.08)

### 5. Verificar estado de respuestas

Para cada riesgo con nivel Alto o Crítico:
- ¿El plan de respuesta está asignado a un dueño?
- ¿La respuesta se está ejecutando?
- ¿La respuesta fue efectiva (score bajó)?
- ¿Se necesita escalar?

### 6. Revisar oportunidades

Leer `risks/opportunities.md`:
- ¿Hay oportunidades que se pueden explotar hoy?
- ¿Cambios recientes que abren nuevas oportunidades?

### 7. Actualizar archivos

- `risks/risk-register.md` — actualizar scores y estados
- `risks/top-risks.md` — actualizar top 5
- `risks/risk-heatmap.md` — actualizar mapa de calor
- `memory/riesgo.md` — riesgos activos para seguimiento diario

### 8. Generar escalaciones necesarias

- Riesgo crítico sin dueño → asignar ahora
- Riesgo materializado → activar playbook correspondiente
- Riesgo crítico sin plan → escalar al sponsor en 24h

---

## Output esperado

```
REPORTE DE RIESGOS — [PROYECTO] — [FECHA]

RESUMEN
- Riesgos totales en registro: X
- Críticos: X | Altos: X | Medios: X | Bajos: X
- Nuevos riesgos identificados: X
- Riesgos cerrados/materializados: X

TOP 5 RIESGOS
| Rank | ID | Descripción | Nivel | P | I | Score | Dueño | Estado respuesta |
|---|---|---|---|---|---|---|---|---|

RIESGOS MATERIALIZADOS (incidentes activos)
[lista con impacto real]

SUPUESTOS EN RIESGO DE INVALIDACIÓN
[lista]

OPORTUNIDADES ACTIVAS
[lista de oportunidades positivas identificadas]

ACCIONES REQUERIDAS
| Acción | Riesgo ID | Responsable | Fecha |
|---|---|---|---|

ESCALACIONES RECOMENDADAS
[lista con destinatario y urgencia]
```


---

## Playbooks asociados

Este comando puede activar los siguientes playbooks según el escenario detectado:
- `gestion-riesgos`

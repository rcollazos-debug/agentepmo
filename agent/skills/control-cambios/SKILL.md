---
name: control-cambios
description: Gestiona los cambios al proyecto conforme al Control Integrado de Cambios del PMBOK 8, protegiendo la triple restricción y garantizando que ningún cambio se ejecute sin evaluación de impacto y aprobación formal.
---

# SKILL: Control de Cambios

## Propósito

Gestionar los cambios al proyecto de forma estructurada conforme al proceso de Control Integrado de Cambios del PMBOK 8. Proteger la triple restricción y garantizar que ningún cambio se ejecute sin evaluación de impacto y aprobación formal.

---

## Base PMBOK 8

- **Dominio:** Trabajo del Proyecto (Project Work Performance Domain)
- **Principios aplicados:**
  - Enfocarse en el valor
  - Construir calidad en procesos y entregables
  - Navegar complejidad
  - Habilitar el cambio para lograr el estado futuro previsto

---

## Cuándo activar este skill

- El cliente solicita una modificación al alcance, tiempo o costo
- Un miembro del equipo propone un cambio técnico significativo
- Un riesgo materializado obliga a replantear el plan
- Se detecta scope creep sin proceso formal
- Se recibe una Solicitud de Cambio (CR) formal

---

## Protocolo de ejecución

### Paso 1 — Capturar la solicitud de cambio

Datos requeridos para toda CR:

```markdown
SOLICITUD DE CAMBIO (CR)
ID: CR-[NNN]
Fecha: [fecha]
Solicitante: [nombre y rol]
Tipo: [Alcance / Cronograma / Costo / Calidad / Técnico / Contractual]
Descripción del cambio solicitado:
[descripción clara de qué se quiere cambiar]
Justificación / necesidad de negocio:
[por qué es necesario]
Urgencia: [Inmediata / Normal / Baja]
```

### Paso 2 — Análisis de impacto

Evaluar el impacto en cada dimensión:

| Dimensión | Impacto | Detalle |
|---|---|---|
| Alcance | [Aumenta / Reduce / Sin cambio] | [descripción] |
| Cronograma | [+X días / -X días / Sin cambio] | [tareas afectadas] |
| Costo | [+$X / -$X / Sin cambio] | [esfuerzo y recursos] |
| Calidad | [Mejora / Riesgo / Sin cambio] | [criterios afectados] |
| Riesgos | [Nuevos riesgos introducidos] | [descripción] |
| Recursos | [Recursos adicionales requeridos] | [perfil y horas] |
| Dependencias | [Tareas o sistemas afectados] | [lista] |

### Paso 3 — Clasificación de la CR

| Nivel | Criterio | Aprobador |
|---|---|---|
| Menor | Impacto < 2 días y < 2% presupuesto | Project Manager |
| Moderado | Impacto 2-5 días o 2-5% presupuesto | PM + Sponsor |
| Mayor | Impacto > 5 días o > 5% presupuesto | Steering Committee |
| Crítico | Cambia alcance contractual o fecha de entrega | Comité + cliente formal |

### Paso 4 — Opciones de respuesta

Para cada CR presentar al menos 2 opciones:

**Opción A — Implementar como solicitado:**
- Impacto: [costo, tiempo, riesgos]
- Condición: aprobación de recursos/tiempo adicional

**Opción B — Implementar con ajuste de alcance:**
- Qué se incluye y qué se pospone
- Impacto: [costo, tiempo, riesgos]

**Opción C — Rechazar (si aplica):**
- Justificación técnica o de negocio
- Alternativa propuesta

### Paso 5 — Decisión y registro

Posibles resultados:
- **Aprobada:** implementar en el plan del proyecto
- **Aprobada condicionalmente:** con modificaciones al alcance o recursos
- **Diferida:** implementar en una fase posterior
- **Rechazada:** no se implementa, documentar razón

### Paso 6 — Actualizar el plan del proyecto

Si la CR es aprobada:
1. Actualizar `{project_path}/data/cronograma.md` con nuevas fechas
2. Actualizar `{project_path}/data/alcance-detallado.md` con el nuevo alcance
3. Actualizar `{project_path}/data/presupuesto.md` si hay impacto financiero
4. Actualizar `{project_path}/data/backlog.md` con nuevas tareas
5. Registrar en `{project_path}/data/cambios.md`
6. Actualizar `{project_path}/memory/decisiones.md`
7. Comunicar a los stakeholders afectados

### Paso 7 — Formato de log de cambios

```
| ID | Fecha | Solicitante | Descripción | Tipo | Impacto Tiempo | Impacto Costo | Estado | Aprobador | Fecha resolución |
```

---

## Reglas anti-scope creep

- Todo cambio de alcance, por pequeño que sea, debe tener una CR documentada
- No existe "cambio rápido que no afecta nada" — siempre evaluar
- El equipo de desarrollo NO debe aceptar cambios directamente del cliente sin pasar por el PM
- Si se detecta trabajo no autorizado en ejecución → detener y formalizar
- El PM es el único punto de control de cambios salvo delegación explícita

---

## Señales de scope creep

- El cliente añade funcionalidades en reuniones sin CR formal
- El equipo implementa mejoras no solicitadas en el sprint
- Los sprints se alargan sistemáticamente sin cambio en alcance documentado
- El backlog crece sin que el roadmap o fecha cambien

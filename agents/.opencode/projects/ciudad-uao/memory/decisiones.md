# REGISTRO DE DECISIONES

> Registro permanente de decisiones clave del proyecto.
> Una decisión documentada es protección para el PM y el equipo.
> El agente actualiza este archivo cuando se toma una decisión relevante.

---

## Instrucciones de formato

Para agregar una decisión:

```
### Decisión [N] — [Fecha] — [Título breve]

**Qué se decidió:** [Descripción clara de la decisión]
**Tomada por:** [Nombre y rol]
**En qué contexto:** [Reunión, situación, o proceso donde se tomó]
**Opciones evaluadas:**
  - Opción A: [Descripción]
  - Opción B: [Descripción]
**Razón de la decisión:** [Por qué se eligió esta opción]
**Impacto en el proyecto:** [Efecto en alcance, tiempo, costo, calidad]
**Aprobada por:** [Nombre y rol si requería aprobación]
**Referencia:** [CR-XXX / Comité [Fecha] / Reunión [Fecha] / Email]
```

---

## Categorías de decisiones

- **Técnica:** arquitectura, tecnología, diseño, infraestructura
- **Alcance:** qué entra, qué sale, cambios de funcionalidades
- **Cronograma:** fechas, hitos, extensiones
- **Presupuesto:** aprobaciones de gasto, reestimaciones
- **Recursos:** incorporaciones, salidas, reasignaciones
- **Gestión:** proceso, metodología, gobierno
- **Escalación:** resolución de conflictos, crisis

---

## Registro de Decisiones

### Decisión 1 — 15-abril-2026 — Inicio del proyecto

**Qué se decidió:** Proyecto "Conde" activado y configuración del agente de gestión completada.
**Tomada por:** Configuración inicial
**Contexto:** Inicio formal del proyecto
**Impacto:** Habilitación del seguimiento y gestión del proyecto
**Referencia:** AGENTS.md - 15-abr-2026

---

### Decisión 2 — 15-abril-2026 — Selección de tecnología

**Qué se decidió:** Java Spring Boot para backend y Angular para frontend, con arquitectura de microservicios.
**Tomada por:** [Organización]
**Contexto:** Definición de stack tecnológico
**Opciones evaluadas:**
  - Opción A: .NET + React → Descartada (equipo con experiencia en Java)
  - Opción B: Python + Django → Descartada (menor tipado para proyecto empresarial)
**Razón de la decisión:** Tecnologías maduras, amplia comunidad, equipo con experiencia previa
**Impacto en el proyecto:** Define arquitectura técnica, patrones de desarrollo, infraestructura necesaria
**Referencia:** context/proyecto-base.md

---

### Decisión 3 — 15-abril-2026 — Metodología híbrida

**Qué se decidió:** Metodología híbrida combinando Scrum (sprints de 2 semanas) con elementos Kanban.
**Tomada por:** [Organización]
**Contexto:** Definición de metodología de trabajo
**Opciones evaluadas:**
  - Opción A: Scrum puro → Descartada (rigidez para este cliente)
  - Opción B: Kanban puro → Descartada (necesidad de predictibilidad en fechas)
**Razón de la decisión:** Balance entre flexibilidad para cambios y predictibilidad para el cliente
**Impacto en el proyecto:** Define cadencia de sprints, ceremonias, flujo de trabajo
**Referencia:** context/proyecto-base.md

---

### Decisión 4 — 15-abril-2026 — Presupuesto y reservas

**Qué se decidió:** Presupuesto < $50,000 USD con reserva de contingencia 10% ($5,000) y reserva de gestión 5% ($2,500).
**Tomada por:** [Organización]
**Contexto:** Definición financiera del proyecto
**Razón de la decisión:** Práctica estándar de gestión de riesgos financieros
**Impacto en el proyecto:** Define límites de gasto, triggers para escalación
**Referencia:** context/restricciones.md, metrics/financiero.md

---

### Decisión 5 — 15-abril-2026 — Plan de trabajo y estructura de sprints

**Qué se decidió:** Plan de trabajo con 5 fases (Inicio, Planificación, Construcción, UAT, Cierre) y sprints de 2 semanas.
**Tomada por:** Monge (PM)
**Contexto:** Planificación de la ejecución del proyecto
**Opciones evaluadas:**
  - Opción A: Sprints de 1 semana → Descartada (poco tiempo para validar valor)
  - Opción B: Sprints de 3 semanas → Descartada (feedback delayed)
**Razón de la decisión:** Balance entre velocidad de entrega y calidad de feedback
**Impacto en el proyecto:** Define cadencia de entregas, ceremonias, ritmo de trabajo
**Entregable:** templates/plan-trabajo.md v1.0
**Referencia:** templates/plan-trabajo.md

---

*[Las decisiones siguientes serán agregadas por el agente con cada evento relevante]*

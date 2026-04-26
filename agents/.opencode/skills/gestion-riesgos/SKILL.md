---
name: gestion-riesgos
description: Identifica, analiza, prioriza y gestiona riesgos del proyecto conforme al Dominio de Incertidumbre del PMBOK 8, convirtiendo la incertidumbre en decisiones controladas.
---

# SKILL: Gestión de Riesgos

## Propósito

Identificar, analizar, priorizar y gestionar riesgos del proyecto conforme al Dominio de Desempeño de Incertidumbre del PMBOK 8. Convertir la incertidumbre en decisiones controladas.

---

## Base PMBOK 8

- **Dominio:** Incertidumbre (Uncertainty Performance Domain)
- **Principios aplicados:**
  - Optimizar respuestas a riesgos
  - Navegar complejidad
  - Abrazar adaptabilidad y resiliencia
  - Reconocer, evaluar y responder a interacciones sistémicas

---

## Cuándo activar este skill

- Se solicita análisis o revisión de riesgos
- Se detecta una situación nueva con potencial impacto
- Se actualiza el risk register
- Antes de un hito importante o release
- Cuando el semáforo del proyecto cambia a AMARILLO o ROJO

---

## Protocolo de ejecución

### Paso 1 — Identificación de riesgos

Revisar fuentes:
1. `projects/gestion-proyectos/risks/risk-register.md` — registro activo
2. `projects/gestion-proyectos/risks/technical-risks.md` — riesgos tecnológicos
3. `projects/gestion-proyectos/risks/delivery-risks.md` — riesgos de entrega
4. `projects/gestion-proyectos/risks/stakeholder-risks.md` — riesgos de interesados
5. `projects/gestion-proyectos/risks/vendor-risks.md` — riesgos de proveedores
6. `projects/gestion-proyectos/risks/security-risks.md` — riesgos de seguridad
7. `projects/gestion-proyectos/risks/assumptions.md` — supuestos que pueden convertirse en riesgos

Categorías RBS (Risk Breakdown Structure):
- **Técnico:** deuda técnica, tecnología nueva, integración, arquitectura, performance, seguridad
- **Externo:** cliente, regulación, proveedores, dependencias externas, mercado
- **Organizacional:** recursos, presupuesto, prioridades, cambios organizacionales
- **Gestión:** scope creep, estimaciones, dependencias, comunicación, cambios de requerimientos
- **Operacional:** ambientes, despliegues, soporte, calidad

### Paso 2 — Análisis cualitativo

Escala de Probabilidad:
| Nivel | Descripción | Valor |
|---|---|---|
| Muy Baja | Poco probable | 0.10 |
| Baja | Posible bajo ciertas condiciones | 0.25 |
| Media | Probabilidad moderada | 0.50 |
| Alta | Probable que ocurra | 0.75 |
| Muy Alta | Casi certeza | 0.90 |

Escala de Impacto:
| Nivel | Tiempo | Costo | Valor |
|---|---|---|---|
| Muy Bajo | < 1 día | < 1% | 0.05 |
| Bajo | 1-3 días | 1-5% | 0.10 |
| Medio | 3-7 días | 5-10% | 0.20 |
| Alto | 1-2 semanas | 10-20% | 0.40 |
| Muy Alto | > 2 semanas | > 20% | 0.80 |

**Score = Probabilidad × Impacto**

Clasificación:
- **Crítico:** >= 0.40 → Acción inmediata
- **Alto:** 0.20 - 0.39 → Plan de respuesta requerido
- **Medio:** 0.08 - 0.19 → Monitoreo activo
- **Bajo:** < 0.08 → Monitoreo pasivo

### Paso 3 — Estrategias de respuesta

**Para amenazas:**
| Estrategia | Cuándo usar |
|---|---|
| Evitar (Avoid) | Score crítico, causa raíz eliminable |
| Transferir (Transfer) | Riesgo financiero o legal |
| Mitigar (Mitigate) | Reducir probabilidad o impacto |
| Aceptar activamente | Plan de contingencia definido |
| Aceptar pasivamente | Score bajo, sin acción justificada |
| Escalar | Fuera del control del PM |

**Para oportunidades:**
| Estrategia | Cuándo usar |
|---|---|
| Explotar | Alta probabilidad de beneficio claro |
| Compartir | Beneficio se potencia con aliado |
| Mejorar | Aumentar probabilidad o impacto positivo |
| Aceptar | Beneficio bienvenido si ocurre |

### Paso 4 — Formato del Risk Register

```
| ID | Descripción | Categoría | P | I | Score | Nivel | Estrategia | Dueño | Respuesta | Disparador | Estado | Revisión |
```

### Paso 5 — Reservas del proyecto

**Reserva de contingencia:** Para riesgos identificados
- Suma ponderada (P × Impacto en $) de riesgos identificados
- Administrada por: Project Manager

**Reserva de gestión:** Para riesgos desconocidos (unk-unk)
- 5-10% del costo base del proyecto
- Administrada por: Sponsor / Comité

### Paso 6 — Visualizar en Metabase

**Activar el skill `metabase-dashboard` con tipo `RIESGOS`.**

Usar los datos ya evaluados:
- `[RIESGOS_CRITICOS]`, `[RIESGOS_ALTOS]`, `[RIESGOS_TOTAL]`
- Tabla de riesgos por nivel con score, dueño y próximo control
- `[COMPROMISOS_VENCIDOS]` de `projects/gestion-proyectos/memory/compromisos.md`

Al finalizar, responder con:
```
📊 Dashboard de riesgos actualizado en Metabase:
🔗 http://localhost:3000/dashboard/[ID]

Riesgos críticos: [N] | Altos: [N] | Total activos: [N]
[Principal riesgo y acción requerida]
```

### Paso 7 — Actualizar archivos

- `projects/gestion-proyectos/risks/risk-register.md`
- `projects/gestion-proyectos/risks/top-risks.md`
- `projects/gestion-proyectos/risks/risk-heatmap.md`
- `projects/gestion-proyectos/memory/riesgo.md` — con URL del dashboard generado

---

## Señales de alerta temprana

- Supuesto clave invalidado
- Proveedor reporta problema
- Hito en riesgo de incumplimiento
- Cambio de alcance sin evaluación de impacto
- Recurso clave en riesgo de salida
- QA reporta tasa de defectos sobre umbral acordado
- Integración externa fallando en ambientes inferiores

---

## Reglas de escalación

- Riesgo crítico sin plan → escalar al sponsor en 24 horas
- Riesgo materializado con impacto en entrega → activar comité de crisis
- > 3 riesgos altos simultáneos → incluir en agenda del steering committee

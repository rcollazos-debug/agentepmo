---
name: cierre-proyecto
description: Ejecuta el proceso de cierre del proyecto garantizando aceptación formal del cliente, protección contractual de VortexBird, documentación de lecciones aprendidas y apertura a proyectos futuros.
---

# SKILL: Cierre Formal del Proyecto

## Propósito

Ejecutar el proceso de cierre del proyecto de forma estructurada, garantizando que el cliente acepte formalmente los entregables, que VortexBird proteja sus intereses contractuales, que las lecciones aprendidas queden documentadas y que la relación con el cliente quede en el mejor punto posible para proyectos futuros.

Un cierre mal ejecutado borra el trabajo de meses. Un cierre bien ejecutado abre la puerta al siguiente contrato.

---

## Base PMBOK 8 + Contexto VortexBird

- **Dominio:** Entrega + Medición + Stakeholders
- **Principios aplicados:**
  - Ser un administrador diligente, respetuoso y responsable
  - Comprometerse efectivamente con los interesados
  - Enfocarse en el valor
  - Habilitar el cambio para lograr el estado futuro previsto

---

## Cuándo Activar este Skill

- El proyecto está en fase de cierre o próximo a terminar
- Todos los entregables principales fueron aceptados por el cliente
- Se aproxima la fecha de go-live o entrega final
- Command `/cierre` activado

---

## Protocolo de Ejecución

### Paso 1 — Verificar criterios de cierre

Antes de iniciar el proceso de cierre formal, confirmar:

**Criterios técnicos:**
- [ ] Todos los entregables del alcance original han sido completados
- [ ] Todos los defectos críticos y altos están cerrados
- [ ] El sistema está desplegado en producción y funcionando
- [ ] Los tests de smoke post-producción fueron ejecutados y pasaron
- [ ] La documentación técnica está actualizada y entregada

**Criterios de negocio:**
- [ ] El PO / cliente aprobó formalmente los entregables
- [ ] UAT fue completado con aprobación firmada
- [ ] Todos los hitos de facturación han sido facturados y cobrados (o están en proceso)
- [ ] No hay CRs pendientes de implementar dentro del alcance actual
- [ ] No hay deuda técnica crítica sin documentar

**Criterios contractuales:**
- [ ] Las condiciones de entrega del contrato se han cumplido
- [ ] Las penalizaciones (si existían) han sido evaluadas
- [ ] Los saldos pendientes de facturación están documentados

---

### Paso 2 — Preparar Acta de Entrega

Generar el acta formal de entrega que el cliente debe firmar.

**Estructura del Acta de Entrega:**

```
ACTA DE ENTREGA Y ACEPTACIÓN DEL PROYECTO
Proyecto: [Nombre]
Fecha: [DD de Mes de YYYY]
Cliente: [Nombre de la empresa]
VortexBird representado por: [Nombre del PM]

1. DECLARACIÓN DE ENTREGA
Se hace constar que VortexBird entrega formalmente al cliente [nombre empresa]
el proyecto [nombre del proyecto] con los siguientes entregables:

ENTREGABLES ENTREGADOS Y ACEPTADOS:
| # | Entregable | Descripción | Aceptado | Observaciones |
|---|---|---|---|---|

2. FUNCIONALIDADES ENTREGADAS
[Lista de módulos y funcionalidades incluidas en la entrega]

3. EXCLUSIONES DEL ALCANCE
[Lista de funcionalidades explícitamente excluidas del contrato]

4. ESTADO DEL SISTEMA AL MOMENTO DE ENTREGA
[Descripción del ambiente productivo, versión, configuraciones]

5. ENTREGABLES DE DOCUMENTACIÓN
- Manual técnico: [✓ / N/A]
- Manual de usuario: [✓ / N/A]
- Código fuente en repositorio: [✓ / N/A]
- Credenciales y accesos: [✓ / N/A]
- Backups iniciales: [✓ / N/A]

6. PENDIENTES ACORDADOS POST-ENTREGA (si aplica)
| # | Pendiente | Responsable | Fecha compromiso |
|---|---|---|---|

7. CONDICIONES DE GARANTÍA Y SOPORTE
[Período de garantía, alcance del soporte post-entrega, SLAs acordados]

8. APROBACIONES
Con la firma de este documento, el cliente acepta formalmente que VortexBird
ha cumplido con el alcance, calidad y términos acordados en el contrato.

Firma cliente: _________________ Cargo: ________ Fecha: _______
Firma VortexBird PM: ___________ Cargo: ________ Fecha: _______
Firma Sponsor: _________________ Cargo: ________ Fecha: _______
```

---

### Paso 3 — Lecciones Aprendidas

Facilitar una sesión de lecciones aprendidas con el equipo y registrar los hallazgos.

**Participantes:** PM, Tech Lead, QA, al menos un desarrollador senior

**Duración recomendada:** 90 minutos

**Estructura de la sesión:**

**Parte 1 — Análisis por dimensiones (60 min)**
Revisar qué funcionó y qué no en cada área:

| Dimensión | Qué funcionó | Qué no funcionó | Causa raíz | Recomendación |
|---|---|---|---|---|
| Planificación | | | | |
| Estimaciones | | | | |
| Comunicación con el cliente | | | | |
| Gestión de riesgos | | | | |
| Calidad y QA | | | | |
| Equipo y colaboración | | | | |
| Tecnología | | | | |
| Gestión de cambios | | | | |
| Finanzas / margen | | | | |

**Parte 2 — Top 5 lecciones (30 min)**
Priorizar las 5 lecciones más impactantes para futuros proyectos.

**Formato de cada lección:**
```
LECCIÓN [N]
Título: [nombre corto y memorable]
Contexto: [en qué situación ocurrió]
Qué pasó: [descripción objetiva]
Impacto: [cómo afectó al proyecto]
Causa raíz: [por qué ocurrió]
Recomendación: [qué hacer diferente en el próximo proyecto]
Aplicable a: [tipo de proyectos donde aplica]
```

Registrar en `projects/gestion-proyectos/memory/lecciones.md`.

---

### Paso 4 — Informe Final del Proyecto

Generar el informe final para la dirección de VortexBird y para el cliente.

**Estructura del Informe Final:**

```
# INFORME FINAL DEL PROYECTO
Proyecto: [Nombre]
Cliente: [Empresa]
PM: [Nombre]
Período: [fecha inicio] — [fecha cierre]
Fecha del informe: [fecha]

## 1. RESUMEN EJECUTIVO
[3-5 líneas: qué se construyó, para qué, resultado general]

## 2. OBJETIVOS VS. RESULTADOS
| Objetivo SMART | Resultado | Estado |
|---|---|---|

## 3. INDICADORES FINALES
| KPI | Meta | Resultado | Estado |
|---|---|---|---|
| Cumplimiento de cronograma | | | |
| Cumplimiento de presupuesto | | | |
| Satisfacción del cliente (CSAT) | ≥ 8 | | |
| Defectos en producción | 0 | | |
| Funcionalidades entregadas | X/X | | |

## 4. EVM FINAL
| Indicador | Valor | Interpretación |
|---|---|---|
| BAC | $X | Presupuesto base |
| EAC | $X | Costo final real |
| VAC | $X | Ahorro o sobrecosto |
| CPI final | X.XX | Eficiencia financiera |
| SPI final | X.XX | Eficiencia de cronograma |

## 5. MARGEN FINAL VORTEXBIRD
Ingresos totales: $X
Costos totales: $X
Margen bruto: $X (X%)
Meta de margen: 30%
Resultado: [Superado / Alcanzado / No alcanzado]

## 6. ANÁLISIS DE CRONOGRAMA
Fecha comprometida: [fecha]
Fecha real de entrega: [fecha]
Variación: [X días antes / a tiempo / X días después]
Razón de variación si aplica: [descripción]

## 7. RIESGOS QUE SE MATERIALIZARON
| Riesgo | Impacto real | Respuesta aplicada |
|---|---|---|

## 8. LECCIONES APRENDIDAS CLAVE
[Top 3-5 lecciones del proyecto]

## 9. RECOMENDACIONES PARA PROYECTOS FUTUROS
[Recomendaciones del PM basadas en la experiencia del proyecto]

## 10. OPORTUNIDADES DE CONTINUIDAD
[Propuesta de Fase 2, soporte, mantenimiento u otros proyectos identificados con el cliente]
```

---

### Paso 5 — Cierre Administrativo VortexBird

Verificar y ejecutar el cierre administrativo:

**Checklist de cierre administrativo:**

- [ ] Acta de entrega firmada por el cliente
- [ ] Informe final generado y aprobado internamente
- [ ] Lecciones aprendidas documentadas en `projects/gestion-proyectos/memory/lecciones.md`
- [ ] Todos los accesos y credenciales transferidos al cliente (con acuse de recibo)
- [ ] Código fuente entregado al cliente (si aplica contractualmente)
- [ ] Repositorios archivados o transferidos
- [ ] Facturas finales emitidas y en proceso de cobro
- [ ] Documentación del proyecto archivada en los repositorios de VortexBird
- [ ] Recursos del equipo liberados o reasignados
- [ ] Contratos de proveedores terminados si aplica
- [ ] Ambientes temporales dados de baja o transferidos
- [ ] Herramientas y licencias del proyecto canceladas si no continúan

---

### Paso 6 — Propuesta de Continuidad al Cliente

El cierre es el mejor momento para proponer el siguiente paso con el cliente.

**Oportunidades a explorar:**
- Mantenimiento evolutivo del sistema (contrato de soporte)
- Fase 2 con funcionalidades del backlog "Won't Have"
- Nuevos proyectos identificados durante el desarrollo
- Staff augmentation del equipo para el cliente
- Capacitación del equipo del cliente en el sistema entregado

**Formato de propuesta:**
```
PROPUESTA DE CONTINUIDAD — [PROYECTO]
Fecha: [fecha]

Estimado [nombre]:

Hemos completado exitosamente [nombre del proyecto]. Durante el proyecto
identificamos las siguientes oportunidades de continuidad que podrían
generar valor adicional para su organización:

[Lista de oportunidades con descripción breve y valor estimado]

Quedamos disponibles para conversar sobre estas oportunidades.
[Firma PM + datos de contacto VortexBird]
```

---

### Paso 7 — Actualizar Archivos

- `projects/gestion-proyectos/memory/actasdeentrega.md` — acta de entrega registrada
- `projects/gestion-proyectos/memory/lecciones.md` — lecciones aprendidas documentadas
- `projects/gestion-proyectos/memory/historial.md` — cierre formal registrado
- `projects/gestion-proyectos/memory/decisiones.md` — decisiones finales del proyecto
- `projects/gestion-proyectos/metrics/dashboard.md` — estado final del proyecto
- `projects/gestion-proyectos/metrics/financiero.md` — margen final calculado y registrado

---

## Formato de Output del Cierre

```
PROCESO DE CIERRE — [PROYECTO] — [FECHA]

ESTADO: [Cierre en progreso / Cierre completado]

CHECKLIST DE CIERRE
[✓/✗] Entregables técnicos completos
[✓/✗] Defectos críticos/altos cerrados
[✓/✗] UAT aprobado
[✓/✗] Acta de entrega firmada
[✓/✗] Facturación completa
[✓/✗] Lecciones aprendidas
[✓/✗] Cierre administrativo
[✓/✗] Propuesta de continuidad enviada

INDICADORES FINALES
CPI: X.XX | SPI: X.XX | Margen: X% | CSAT: X/10

PRÓXIMOS PASOS
[Lista de acciones pendientes para completar el cierre]
```

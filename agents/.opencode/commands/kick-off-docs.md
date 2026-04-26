# COMMAND: /kick-off-docs

## Propósito

Generar los documentos oficiales de lanzamiento del proyecto:
1. **Presentación Kick-off** (PowerPoint) — Comunicación visual para stakeholders
2. **Acta de Inicio** (Word) — Documento charter que autoriza el proyecto

Alineado con PMBOK 8 Dominios: Stakeholders, Planning, Medición.

---

## Cuándo usar

- Proyecto aprobado, listo para lanzamiento formal
- Necesidad de comunicar visión a todo el equipo
- Preparar documentos para kick-off meeting
- Generar charter firmado por sponsor y PM
- Distribuir información a stakeholders antes del inicio

---

## Instrucciones de ejecución

### Paso 1 — Leer fuentes de información (en orden)

```
context/proyecto-base.md
context/stakeholders.md
context/restricciones.md
metrics/cronograma.md
metrics/financiero.md
metrics/dashboard.md
risks/risk-register.md
data/acta-inicio.md
memory/decisiones.md
memory/historial.md
```

### Paso 2 — Compilar datos del proyecto

Extraer y validar:

| Dato | Fuente | Validar |
|---|---|---|
| Nombre proyecto | proyecto-base.md | ✓ No vacío |
| Sponsor | stakeholders.md | ✓ Nombre completo |
| PM | stakeholders.md | ✓ Nombre completo |
| Product Owner/PO | stakeholders.md | ✓ Nombre y contacto |
| Fecha inicio | cronograma.md | ✓ Formato DD-MMM-YYYY |
| Fecha fin / Go-live | cronograma.md | ✓ >= fecha inicio |
| Presupuesto | financiero.md | ✓ Número positivo |
| Objetivos | proyecto-base.md | ✓ 3-5 objetivos SMART |
| Alcance INCLUYE | restricciones.md | ✓ Mínimo 3 items |
| Alcance EXCLUYE | restricciones.md | ✓ Mínimo 2 items |
| Equipo | stakeholders.md | ✓ Nombre + rol |
| Riesgos TOP 5 | risk-register.md | ✓ Score y mitigación |
| Hitos | cronograma.md | ✓ Fechas realistas |

**Regla:** Si falta algún dato requerido, completar con "[POR DEFINIR]" y flagear como PENDIENTE en dashboard.

### Paso 3 — Generar Presentación PowerPoint

**Estructura fija de 10 slides:**

1. **Portada** — Proyecto, sponsor, PM, fechas
2. **Propósito y Objetivos** — Why + objectives SMART
3. **Alcance (In/Out)** — Lo que SÍ y NO se hace
4. **Equipo del Proyecto** — Nombres, roles, responsabilidades
5. **Cronograma General** — Hitos principales con fechas
6. **Presupuesto** — Total + desglose por fase
7. **Riesgos Principales** — Top 5 con mitigaciones
8. **Criterios de Éxito** — KPIs y métricas principales
9. **Próximos Pasos** — Hitos inmediatos (próximas 2 semanas)
10. **Contactos Clave** — Nombres y canales de comunicación

**Requisitos de presentación:**
- Color profesional (azul/gris corporativo)
- Fonts legibles (mínimo 16pt para body)
- Sin jerga técnica en slides ejecutivas
- Tablas/gráficos simples y claros
- Máximo 6 líneas por slide (regla de legibilidad)
- Numeración de slides visible

**Nombre de archivo:**
```
Kick-off-[NombreProyecto]-[DD-MMM-YYYY].pptx
Ej: Kick-off-Conde-15-Apr-2026.pptx
```

### Paso 4 — Generar Documento Acta de Inicio (Word)

**Estructura de secciones:**

#### Encabezado
```
ACTA DE INICIO DEL PROYECTO
[Nombre Proyecto]
Fecha: DD de Mes de YYYY
```

#### Secciones obligatorias
1. **Información General** — Proyecto, Sponsor, PM, PO, Fechas, Presupuesto
2. **Descripción del Proyecto** — Propósito, Objetivos, Justificación
3. **Alcance de Alto Nivel** — Lo que incluye/excluye
4. **Cronograma General** — Fechas clave e hitos
5. **Estimación de Recursos** — Presupuesto, equipo, equipamiento
6. **Riesgos y Restricciones** — Top riesgos, dependencias, restricciones
7. **Criterios de Éxito** — Entregables, métricas, aceptación
8. **Autorización y Aprobaciones** — Tabla de firmas (Sponsor, PM, PO)

**Requisitos de documento:**
- Formato profesional (márgenes 1", font Calibri 11pt)
- Tablas estructuradas para datos
- Numeración clara de secciones
- Espacio para firmas al final (2-3 líneas por firma)
- Encabezado con logo si existe
- Pie de página con fecha de generación

**Nombre de archivo:**
```
Acta-Inicio-[NombreProyecto]-[DD-MMM-YYYY].docx
Ej: Acta-Inicio-Conde-15-Apr-2026.docx
```

### Paso 5 — Guardar y registrar

**Ubicación:**
```
/output/documentos-iniciales/
```

**Verificar antes de guardar:**
- [ ] Ambos archivos se generaron correctamente
- [ ] Todos los datos están poblados (sin "[PENDIENTE]")
- [ ] Fechas son coherentes
- [ ] Nombres de stakeholders están completos
- [ ] Presupuesto coincide con cronograma
- [ ] Riesgos incluyen mitigaciones
- [ ] Formato profesional y legible

**Actualizar memoria:**
- Agregar entrada en `memory/historial.md` — "Documentos de inicio generados"
- Agregar decisión en `memory/decisiones.md` — "Acta de Inicio autorizada"
- Actualizar dashboard en `metrics/dashboard.md` — marcar como completado

### Paso 6 — Generar informe de ejecución

Reportar:
```
✓ Presentación Kick-off: [RUTA Y NOMBRE]
✓ Acta de Inicio: [RUTA Y NOMBRE]
✓ Datos validados: X/X campos completados
✓ Stakeholders notificados: Sponsor, PM, PO
✓ Próxima acción: Enviar documentos 24h antes de kick-off meeting
```

---

## Checklist de validación final

Antes de marcar como COMPLETADO:

**Presentación PowerPoint:**
- [ ] Se abre correctamente en PowerPoint/Google Slides
- [ ] Todas las 10 slides tienen contenido
- [ ] No hay placeholder vacíos "[POR DEFINIR]"
- [ ] Formato consistente (fonts, colores, márgenes)
- [ ] Tablas se ven claras y profesionales
- [ ] Nombres de stakeholders están completos

**Acta de Inicio Word:**
- [ ] Se abre correctamente en Word/Google Docs
- [ ] Todas las secciones están completas
- [ ] No hay placeholder vacíos "[POR DEFINIR]"
- [ ] Tablas de datos están pobladas
- [ ] Sección de firmas tiene espacio para 3 firmas
- [ ] Numeración de secciones es clara

**Documentos en general:**
- [ ] Fechas son coherentes (inicio < fin > mvp > go-live)
- [ ] Presupuesto coincide entre presentación y acta
- [ ] Nombres de equipo son idénticos en ambos documentos
- [ ] Riesgos listados son los mismos en presentación y acta
- [ ] Hitos coinciden en cronograma y ambos documentos

---

## Output esperado

Dos archivos profesionales listos para:

✓ **Kick-off-[Proyecto]-[Fecha].pptx**
   - Presentar en reunión de lanzamiento
   - Distribuir a participantes
   - Proyectar en pantalla

✓ **Acta-Inicio-[Proyecto]-[Fecha].docx**
   - Imprimir para que firmen Sponsor, PM, PO
   - Archivar como documento oficial
   - Adjuntar en actas de comité

---

## Notas operacionales

- Los documentos se actualizan si hay cambios en alcance/cronograma (control de cambios)
- La presentación puede adaptarse para diferentes audiencias (técnica, ejecutiva, cliente)
- El Acta de Inicio es documento legal — cuidar coherencia con proyecto-base.md
- Guardar versiones anteriores si hay re-generaciones

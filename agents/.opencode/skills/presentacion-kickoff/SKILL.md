---
name: presentacion-kickoff
description: Genera la presentación de Kick-off (PPTX) y el Acta de Inicio (DOCX) para el lanzamiento formal del proyecto, alineados con PMBOK 8 y adaptados al cliente y equipo específico.
---

# SKILL: Presentación Kick-off y Acta de Inicio

## Propósito

Generar documentos oficiales de lanzamiento del proyecto alineados con el PMBOK 8:
1. **Presentación de Kick-off** (PPTX): Comunicación visual del proyecto a todos los stakeholders
2. **Acta de Inicio** (DOCX): Documento formal que autoriza y establece el proyecto

---

## Base PMBOK 8

- **Dominios:** Stakeholders, Planning, Measurement
- **Principios aplicados:**
  - Comprometerse efectivamente con los interesados
  - Demostrar comportamientos de liderazgo
  - Enfocarse en el valor
  - Reconocer la existencia de la complejidad del proyecto

---

## Cuándo activar este skill

- Proyecto aprobado y listo para lanzamiento formal
- Se requiere socializar el proyecto con todo el equipo y stakeholders
- Necesidad de documento charter firmado por el sponsor
- Kick-off meeting programada

---

## Identidad Visual VortexBird

> **OBLIGATORIO:** Leer `knowledge/vortexbird-brand.md` ANTES de generar cualquier presentación.

### Filosofía de diseño (del skill canvas-design)
Antes de generar, define la intención visual de cada slide: ¿qué debe sentir el espectador? Las decisiones de color, tamaño y espacio comunican sin palabras. Cada slide es una decisión deliberada de diseño, no solo un contenedor de texto.

### 5 principios clave (del skill pptx)
1. **Color dominante:** Teal `#10C1BC` ocupa 60-70% del peso visual — barra header en cada slide
2. **Elemento consistente:** Logo VortexBird + barra teal en TODAS las slides
3. **Variedad de layouts:** Portada oscura → contenido claro → cierre oscuro. Cards, columnas y timelines alternan
4. **Visual en cada slide:** Ninguna slide es solo texto — siempre hay barra de color, card con fondo, o timeline
5. **Contraste y alineación:** Título 28-32pt bold vs cuerpo 14-18pt regular; texto body alineado a la izquierda

### Generador principal
Usar **`skills/presentacion-kickoff/generator.py`** (no `templates/generar_kickoff_pptx.py`).

---

## Protocolo de ejecución

### Paso 0 — Cargar identidad de marca (SIEMPRE primero)

1. Leer `knowledge/vortexbird-brand.md` → cargar paleta de colores y reglas de logo
2. Verificar que existe `assets/logo-vortexbird.png`
3. Leer `active-project.md` → obtener `{project_path}` y `{project_name}`

### Paso 1 — Leer fuentes de información (en orden)

1. `projects/{project_path}/context/proyecto-base.md` — datos básicos del proyecto
2. `projects/{project_path}/context/stakeholders.md` — equipo y stakeholders
3. `projects/{project_path}/context/restricciones.md` — scope y restricciones
4. `projects/{project_path}/data/cronograma.md` — hitos y cronograma
5. `projects/{project_path}/data/presupuesto.md` — presupuesto
6. `projects/{project_path}/risks/risk-register.md` — riesgos principales
7. `projects/{project_path}/data/acta-inicio.md` — plantilla de charter

### Paso 2 — Generar Presentación PowerPoint (PPTX)

**Estructura de slides:**

#### Slide 1: Portada
- Título: [Nombre del Proyecto]
- Sponsor: [Nombre]
- Project Manager: [Nombre]
- Fecha de inicio: [DD-MMM-YYYY]
- Fecha go-live: [DD-MMM-YYYY]
- Logo del proyecto (si existe)

#### Slide 2: Propósito y Objetivos
- Qué es este proyecto
- Por qué es importante (business case)
- Objetivos SMART

#### Slide 3: Alcance (In/Out)
- Lo que SÍ incluye
- Lo que NO incluye
- Restricciones principales

#### Slide 4: Equipo del Proyecto
- Organigrama visual
- Nombre, rol, responsabilidades
- Contactos clave

#### Slide 5: Cronograma General (Hitos)
- Diagrama Gantt simplificado de fases
- Hitos principales con fechas
- MVP target
- Go-live

#### Slide 6: Presupuesto
- Monto total
- Desglose por fase
- Reservas (contingencia + gestión)

#### Slide 7: Riesgos Principales (Top 5)
- Tabla: Riesgo | Probabilidad | Impacto | Nivel | Mitigación
- Destacar riesgos ALTO/CRÍTICO

#### Slide 8: Criterios de Éxito
- KPIs principales
- Criterios de aceptación
- Métricas de entrega

#### Slide 9: Próximos Pasos
- Hitos inmediatos (próximas 2 semanas)
- Decisiones requeridas
- Fechas de ceremonias (kick-off, planning, reviews)

#### Slide 10: Preguntas y Contactos
- Contactos clave del equipo
- Canales de comunicación
- Frecuencia de updates

### Paso 3 — Generar Documento Acta de Inicio (DOCX)

**Estructura:**

```
ACTA DE INICIO DEL PROYECTO
Proyecto: [Nombre]
Fecha: [DD de MMM de YYYY]

1. INFORMACIÓN GENERAL
   1.1 Datos del Proyecto
   1.2 Sponsor y PM
   1.3 Justificación del Proyecto

2. DESCRIPCIÓN DEL PROYECTO
   2.1 Propósito y Objetivos
   2.2 Alcance de Alto Nivel
   2.3 Ubicación Geográfica / Líneas de Negocio

3. CRONOGRAMA GENERAL
   3.1 Fecha de Inicio
   3.2 Fecha de Término
   3.3 Hitos Principales

4. ESTIMACIÓN DE RECURSOS
   4.1 Presupuesto
   4.2 Estructura de Equipo
   4.3 Equipamiento Requerido

5. RIESGOS Y RESTRICCIONES
   5.1 Riesgos Identificados
   5.2 Restricciones de Alcance
   5.3 Dependencias Externas

6. CRITERIOS DE ÉXITO
   6.1 Entregables Principales
   6.2 Métricas de Éxito
   6.3 Criterios de Aceptación

7. AUTORIZACIÓN Y APROBACIONES
   7.1 Autorización del Sponsor
   7.2 Aceptación del PM
   7.3 Aceptación del Cliente/PO

[FIRMAS]
Sponsor: _________________ Fecha: _______
PM:      _________________ Fecha: _______
PO:      _________________ Fecha: _______
```

### Paso 4 — Validación antes de guardar

**Checklist de contenido:**
- ✓ Todos los datos están poblados (sin [PENDIENTE])
- ✓ Fechas son consistentes (inicio < fin)
- ✓ Nombres de stakeholders están completos
- ✓ Presupuesto y hitos coinciden con cronograma
- ✓ Riesgos incluyen mitigaciones
- ✓ Documentos tienen formato profesional

**Checklist visual QA (del skill pptx):**
- ✓ Logo VortexBird visible en todas las slides
- ✓ Barra teal `#10C1BC` en todas las slides de contenido
- ✓ Portada con fondo DARK_NAVY `#1E293A` y texto blanco
- ✓ Slide de cierre (Q&A) con fondo DARK_NAVY
- ✓ Ninguna slide es solo texto — al menos un elemento visual de color
- ✓ Texto body alineado a la izquierda
- ✓ Contraste claro: título 28-32pt vs cuerpo 14-18pt
- ✓ Línea naranja `#FF9141` en borde inferior de cada slide

---

## Configuración de Python

### Librerías requeridas

```bash
pip install python-pptx python-docx pillow
```

### Código de generación (integrado en el skill)

```python
from pptx import Presentation
from pptx.util import Inches, Pt
from pptx.enum.text import PP_ALIGN
from docx import Document
from docx.shared import Pt, RGBColor, Inches
from docx.enum.text import WD_ALIGN_PARAGRAPH
import json
from datetime import datetime

class KickoffDocumentGenerator:
    def __init__(self, project_data):
        self.project = project_data
        self.timestamp = datetime.now().strftime("%Y%m%d_%H%M%S")
    
    def generate_presentation(self, output_path):
        """Generar presentación PowerPoint"""
        prs = Presentation()
        prs.slide_width = Inches(10)
        prs.slide_height = Inches(7.5)
        
        # Slide 1: Portada
        self._add_title_slide(prs)
        
        # Slide 2: Propósito
        self._add_purpose_slide(prs)
        
        # Slide 3: Alcance
        self._add_scope_slide(prs)
        
        # Slide 4: Equipo
        self._add_team_slide(prs)
        
        # Slide 5: Cronograma
        self._add_schedule_slide(prs)
        
        # Slide 6: Presupuesto
        self._add_budget_slide(prs)
        
        # Slide 7: Riesgos
        self._add_risks_slide(prs)
        
        # Slide 8: Criterios de Éxito
        self._add_success_slide(prs)
        
        # Slide 9: Próximos Pasos
        self._add_next_steps_slide(prs)
        
        # Slide 10: Contactos
        self._add_contacts_slide(prs)
        
        prs.save(output_path)
        return output_path
    
    def _add_title_slide(self, prs):
        slide = prs.slides.add_slide(prs.slide_layouts[6])  # Blank layout
        
        # Add background color
        background = slide.background
        fill = background.fill
        fill.solid()
        fill.fore_color.rgb = RGBColor(31, 78, 121)  # Dark blue
        
        # Title
        title_box = slide.shapes.add_textbox(Inches(0.5), Inches(2), Inches(9), Inches(1.5))
        title_frame = title_box.text_frame
        title_frame.text = self.project.get('nombre', 'PROYECTO')
        title_frame.paragraphs[0].font.size = Pt(60)
        title_frame.paragraphs[0].font.bold = True
        title_frame.paragraphs[0].font.color.rgb = RGBColor(255, 255, 255)
        title_frame.paragraphs[0].alignment = PP_ALIGN.CENTER
        
        # Info box
        info_text = f"""
SPONSOR: {self.project.get('sponsor', 'Por definir')}
PROJECT MANAGER: {self.project.get('pm', 'Por definir')}

Inicio: {self.project.get('fecha_inicio', 'Por definir')}
Go-Live: {self.project.get('fecha_fin', 'Por definir')}
        """
        
        info_box = slide.shapes.add_textbox(Inches(1), Inches(4), Inches(8), Inches(2.5))
        info_frame = info_box.text_frame
        info_frame.text = info_text.strip()
        info_frame.paragraphs[0].font.size = Pt(18)
        info_frame.paragraphs[0].font.color.rgb = RGBColor(255, 255, 255)
        info_frame.paragraphs[0].alignment = PP_ALIGN.CENTER
    
    def _add_purpose_slide(self, prs):
        slide = prs.slides.add_slide(prs.slide_layouts[5])  # Blank
        
        title = slide.shapes.add_textbox(Inches(0.5), Inches(0.3), Inches(9), Inches(0.8))
        title_frame = title.text_frame
        title_frame.text = "Propósito y Objetivos"
        title_frame.paragraphs[0].font.size = Pt(44)
        title_frame.paragraphs[0].font.bold = True
        
        content = slide.shapes.add_textbox(Inches(0.7), Inches(1.3), Inches(8.6), Inches(5.5))
        content_frame = content.text_frame
        content_frame.word_wrap = True
        
        objectives = self.project.get('objetivos', ['Por definir'])
        for obj in objectives:
            p = content_frame.add_paragraph()
            p.text = f"• {obj}"
            p.font.size = Pt(24)
            p.level = 0
    
    def _add_scope_slide(self, prs):
        slide = prs.slides.add_slide(prs.slide_layouts[5])
        
        title = slide.shapes.add_textbox(Inches(0.5), Inches(0.3), Inches(9), Inches(0.8))
        title_frame = title.text_frame
        title_frame.text = "Alcance (In/Out)"
        title_frame.paragraphs[0].font.size = Pt(44)
        title_frame.paragraphs[0].font.bold = True
        
        # Alcance
        in_title = slide.shapes.add_textbox(Inches(0.7), Inches(1.3), Inches(4), Inches(0.5))
        in_title_frame = in_title.text_frame
        in_title_frame.text = "INCLUYE:"
        in_title_frame.paragraphs[0].font.size = Pt(20)
        in_title_frame.paragraphs[0].font.bold = True
        in_title_frame.paragraphs[0].font.color.rgb = RGBColor(0, 176, 80)  # Green
        
        in_box = slide.shapes.add_textbox(Inches(0.7), Inches(1.9), Inches(4.3), Inches(5))
        in_frame = in_box.text_frame
        in_frame.word_wrap = True
        inclusions = self.project.get('alcance_incluye', ['Por definir'])
        for item in inclusions:
            p = in_frame.add_paragraph()
            p.text = f"✓ {item}"
            p.font.size = Pt(16)
        
        # Exclusiones
        out_title = slide.shapes.add_textbox(Inches(5.3), Inches(1.3), Inches(4), Inches(0.5))
        out_title_frame = out_title.text_frame
        out_title_frame.text = "EXCLUYE:"
        out_title_frame.paragraphs[0].font.size = Pt(20)
        out_title_frame.paragraphs[0].font.bold = True
        out_title_frame.paragraphs[0].font.color.rgb = RGBColor(192, 0, 0)  # Red
        
        out_box = slide.shapes.add_textbox(Inches(5.3), Inches(1.9), Inches(4.2), Inches(5))
        out_frame = out_box.text_frame
        out_frame.word_wrap = True
        exclusions = self.project.get('alcance_excluye', ['Por definir'])
        for item in exclusions:
            p = out_frame.add_paragraph()
            p.text = f"✗ {item}"
            p.font.size = Pt(16)
    
    def _add_team_slide(self, prs):
        slide = prs.slides.add_slide(prs.slide_layouts[5])
        
        title = slide.shapes.add_textbox(Inches(0.5), Inches(0.3), Inches(9), Inches(0.8))
        title_frame = title.text_frame
        title_frame.text = "Equipo del Proyecto"
        title_frame.paragraphs[0].font.size = Pt(44)
        title_frame.paragraphs[0].font.bold = True
        
        content = slide.shapes.add_textbox(Inches(0.7), Inches(1.3), Inches(8.6), Inches(5.8))
        content_frame = content.text_frame
        content_frame.word_wrap = True
        
        team = self.project.get('equipo', [])
        for member in team:
            p = content_frame.add_paragraph()
            p.text = f"{member.get('nombre', 'N/A')} — {member.get('rol', 'N/A')}"
            p.font.size = Pt(20)
            p.font.bold = True
            
            if member.get('responsabilidades'):
                p2 = content_frame.add_paragraph()
                p2.text = member.get('responsabilidades', '')
                p2.font.size = Pt(16)
                p2.level = 1
    
    def _add_schedule_slide(self, prs):
        slide = prs.slides.add_slide(prs.slide_layouts[5])
        
        title = slide.shapes.add_textbox(Inches(0.5), Inches(0.3), Inches(9), Inches(0.8))
        title_frame = title.text_frame
        title_frame.text = "Cronograma General"
        title_frame.paragraphs[0].font.size = Pt(44)
        title_frame.paragraphs[0].font.bold = True
        
        content = slide.shapes.add_textbox(Inches(0.7), Inches(1.3), Inches(8.6), Inches(5.8))
        content_frame = content.text_frame
        content_frame.word_wrap = True
        
        hitos = self.project.get('hitos', [])
        for hito in hitos:
            p = content_frame.add_paragraph()
            p.text = f"{hito.get('nombre', 'Hito')} — {hito.get('fecha', 'Por definir')}"
            p.font.size = Pt(18)
            p.font.bold = True
    
    def _add_budget_slide(self, prs):
        slide = prs.slides.add_slide(prs.slide_layouts[5])
        
        title = slide.shapes.add_textbox(Inches(0.5), Inches(0.3), Inches(9), Inches(0.8))
        title_frame = title.text_frame
        title_frame.text = "Presupuesto"
        title_frame.paragraphs[0].font.size = Pt(44)
        title_frame.paragraphs[0].font.bold = True
        
        # Presupuesto total
        budget_total = slide.shapes.add_textbox(Inches(1), Inches(1.5), Inches(8), Inches(1))
        budget_frame = budget_total.text_frame
        budget_frame.text = f"Presupuesto Total: ${self.project.get('presupuesto', 'Por definir')}"
        budget_frame.paragraphs[0].font.size = Pt(32)
        budget_frame.paragraphs[0].font.bold = True
        budget_frame.paragraphs[0].alignment = PP_ALIGN.CENTER
        
        # Desglose
        content = slide.shapes.add_textbox(Inches(1), Inches(2.8), Inches(8), Inches(4))
        content_frame = content.text_frame
        content_frame.word_wrap = True
        
        items = self.project.get('presupuesto_desglose', [])
        for item in items:
            p = content_frame.add_paragraph()
            p.text = f"• {item.get('concepto', 'Concepto')}: ${item.get('monto', '0')}"
            p.font.size = Pt(20)
    
    def _add_risks_slide(self, prs):
        slide = prs.slides.add_slide(prs.slide_layouts[5])
        
        title = slide.shapes.add_textbox(Inches(0.5), Inches(0.3), Inches(9), Inches(0.8))
        title_frame = title.text_frame
        title_frame.text = "Riesgos Principales"
        title_frame.paragraphs[0].font.size = Pt(44)
        title_frame.paragraphs[0].font.bold = True
        
        content = slide.shapes.add_textbox(Inches(0.7), Inches(1.3), Inches(8.6), Inches(5.8))
        content_frame = content.text_frame
        content_frame.word_wrap = True
        
        risks = self.project.get('riesgos_top', [])
        for risk in risks[:5]:
            p = content_frame.add_paragraph()
            p.text = f"{risk.get('descripcion', 'Riesgo')} [{risk.get('nivel', '?')}]"
            p.font.size = Pt(16)
            p.font.bold = True
            
            if risk.get('mitigacion'):
                p2 = content_frame.add_paragraph()
                p2.text = f"→ {risk.get('mitigacion', '')}"
                p2.font.size = Pt(14)
                p2.level = 1
    
    def _add_success_slide(self, prs):
        slide = prs.slides.add_slide(prs.slide_layouts[5])
        
        title = slide.shapes.add_textbox(Inches(0.5), Inches(0.3), Inches(9), Inches(0.8))
        title_frame = title.text_frame
        title_frame.text = "Criterios de Éxito"
        title_frame.paragraphs[0].font.size = Pt(44)
        title_frame.paragraphs[0].font.bold = True
        
        content = slide.shapes.add_textbox(Inches(0.7), Inches(1.3), Inches(8.6), Inches(5.8))
        content_frame = content.text_frame
        content_frame.word_wrap = True
        
        criteria = self.project.get('criterios_exito', [])
        for criterion in criteria:
            p = content_frame.add_paragraph()
            p.text = f"✓ {criterion}"
            p.font.size = Pt(20)
    
    def _add_next_steps_slide(self, prs):
        slide = prs.slides.add_slide(prs.slide_layouts[5])
        
        title = slide.shapes.add_textbox(Inches(0.5), Inches(0.3), Inches(9), Inches(0.8))
        title_frame = title.text_frame
        title_frame.text = "Próximos Pasos"
        title_frame.paragraphs[0].font.size = Pt(44)
        title_frame.paragraphs[0].font.bold = True
        
        content = slide.shapes.add_textbox(Inches(0.7), Inches(1.3), Inches(8.6), Inches(5.8))
        content_frame = content.text_frame
        content_frame.word_wrap = True
        
        steps = self.project.get('proximos_pasos', [])
        for step in steps:
            p = content_frame.add_paragraph()
            p.text = f"→ {step}"
            p.font.size = Pt(18)
    
    def _add_contacts_slide(self, prs):
        slide = prs.slides.add_slide(prs.slide_layouts[5])
        
        title = slide.shapes.add_textbox(Inches(0.5), Inches(0.3), Inches(9), Inches(0.8))
        title_frame = title.text_frame
        title_frame.text = "Contactos Clave"
        title_frame.paragraphs[0].font.size = Pt(44)
        title_frame.paragraphs[0].font.bold = True
        
        content = slide.shapes.add_textbox(Inches(0.7), Inches(1.3), Inches(8.6), Inches(5.8))
        content_frame = content.text_frame
        content_frame.word_wrap = True
        
        contacts = self.project.get('contactos', {})
        for role, info in contacts.items():
            p = content_frame.add_paragraph()
            p.text = f"{role}: {info}"
            p.font.size = Pt(18)
            p.font.bold = True
    
    def generate_charter(self, output_path):
        """Generar Acta de Inicio en Word"""
        doc = Document()
        
        # Encabezado
        header = doc.add_heading('ACTA DE INICIO DEL PROYECTO', 0)
        header.alignment = WD_ALIGN_PARAGRAPH.CENTER
        
        subtitle = doc.add_heading(self.project.get('nombre', 'PROYECTO'), level=2)
        subtitle.alignment = WD_ALIGN_PARAGRAPH.CENTER
        
        date_para = doc.add_paragraph(f"Fecha: {datetime.now().strftime('%d de %B de %Y')}")
        date_para.alignment = WD_ALIGN_PARAGRAPH.CENTER
        
        doc.add_paragraph()  # Espacio
        
        # 1. Información General
        doc.add_heading('1. INFORMACIÓN GENERAL', level=1)
        
        table1 = doc.add_table(rows=7, cols=2)
        table1.style = 'Light Grid Accent 1'
        
        table1.cell(0, 0).text = "Nombre del Proyecto"
        table1.cell(0, 1).text = self.project.get('nombre', 'Por definir')
        table1.cell(1, 0).text = "Sponsor"
        table1.cell(1, 1).text = self.project.get('sponsor', 'Por definir')
        table1.cell(2, 0).text = "Project Manager"
        table1.cell(2, 1).text = self.project.get('pm', 'Por definir')
        table1.cell(3, 0).text = "Product Owner"
        table1.cell(3, 1).text = self.project.get('po', 'Por definir')
        table1.cell(4, 0).text = "Fecha de Inicio"
        table1.cell(4, 1).text = self.project.get('fecha_inicio', 'Por definir')
        table1.cell(5, 0).text = "Fecha de Término"
        table1.cell(5, 1).text = self.project.get('fecha_fin', 'Por definir')
        table1.cell(6, 0).text = "Presupuesto Aprobado"
        table1.cell(6, 1).text = f"${self.project.get('presupuesto', 'Por definir')}"
        
        # 2. Descripción del Proyecto
        doc.add_heading('2. DESCRIPCIÓN DEL PROYECTO', level=1)
        
        doc.add_heading('2.1 Propósito y Justificación', level=2)
        doc.add_paragraph(self.project.get('proposito', 'Por definir'))
        
        doc.add_heading('2.2 Objetivos', level=2)
        objectives = self.project.get('objetivos', [])
        for obj in objectives:
            doc.add_paragraph(obj, style='List Bullet')
        
        doc.add_heading('2.3 Alcance de Alto Nivel', level=2)
        
        doc.add_paragraph('Incluye:', style='Heading 3')
        inclusions = self.project.get('alcance_incluye', [])
        for item in inclusions:
            doc.add_paragraph(item, style='List Bullet')
        
        doc.add_paragraph('Excluye:', style='Heading 3')
        exclusions = self.project.get('alcance_excluye', [])
        for item in exclusions:
            doc.add_paragraph(item, style='List Bullet')
        
        # 3. Cronograma
        doc.add_heading('3. CRONOGRAMA GENERAL', level=1)
        
        table3 = doc.add_table(rows=4, cols=2)
        table3.style = 'Light Grid Accent 1'
        table3.cell(0, 0).text = "Inicio"
        table3.cell(0, 1).text = self.project.get('fecha_inicio', 'Por definir')
        table3.cell(1, 0).text = "Término"
        table3.cell(1, 1).text = self.project.get('fecha_fin', 'Por definir')
        table3.cell(2, 0).text = "MVP Target"
        table3.cell(2, 1).text = self.project.get('fecha_mvp', 'Por definir')
        table3.cell(3, 0).text = "Go-Live"
        table3.cell(3, 1).text = self.project.get('fecha_go_live', 'Por definir')
        
        doc.add_paragraph()
        doc.add_paragraph('Hitos Principales:', style='Heading 3')
        hitos = self.project.get('hitos', [])
        for hito in hitos:
            doc.add_paragraph(
                f"{hito.get('nombre', 'Hito')} — {hito.get('fecha', 'Por definir')}",
                style='List Bullet'
            )
        
        # 4. Recursos
        doc.add_heading('4. ESTIMACIÓN DE RECURSOS', level=1)
        
        doc.add_heading('4.1 Presupuesto', level=2)
        doc.add_paragraph(f"Presupuesto Total Aprobado: ${self.project.get('presupuesto', 'Por definir')}")
        
        desglose = self.project.get('presupuesto_desglose', [])
        for item in desglose:
            doc.add_paragraph(
                f"{item.get('concepto', 'Concepto')}: ${item.get('monto', '0')}",
                style='List Bullet'
            )
        
        doc.add_heading('4.2 Equipo', level=2)
        team = self.project.get('equipo', [])
        for member in team:
            doc.add_paragraph(
                f"{member.get('nombre', 'N/A')} — {member.get('rol', 'N/A')}",
                style='List Bullet'
            )
        
        # 5. Riesgos y Restricciones
        doc.add_heading('5. RIESGOS Y RESTRICCIONES', level=1)
        
        doc.add_heading('5.1 Riesgos Identificados', level=2)
        risks = self.project.get('riesgos_top', [])
        for risk in risks[:5]:
            doc.add_paragraph(
                f"{risk.get('descripcion', 'Riesgo')} [{risk.get('nivel', '?')}]",
                style='List Bullet'
            )
        
        doc.add_heading('5.2 Restricciones', level=2)
        restrictions = self.project.get('restricciones', [])
        for restriction in restrictions:
            doc.add_paragraph(restriction, style='List Bullet')
        
        # 6. Criterios de Éxito
        doc.add_heading('6. CRITERIOS DE ÉXITO', level=1)
        
        doc.add_heading('6.1 Entregables Principales', level=2)
        deliverables = self.project.get('entregables', [])
        for del_item in deliverables:
            doc.add_paragraph(del_item, style='List Bullet')
        
        doc.add_heading('6.2 Métricas de Éxito', level=2)
        metrics = self.project.get('criterios_exito', [])
        for metric in metrics:
            doc.add_paragraph(metric, style='List Bullet')
        
        # 7. Autorización
        doc.add_heading('7. AUTORIZACIÓN Y APROBACIONES', level=1)
        
        approval_table = doc.add_table(rows=4, cols=3)
        approval_table.style = 'Light Grid Accent 1'
        
        approval_table.cell(0, 0).text = "Rol"
        approval_table.cell(0, 1).text = "Nombre"
        approval_table.cell(0, 2).text = "Firma / Fecha"
        
        approval_table.cell(1, 0).text = "Sponsor"
        approval_table.cell(1, 1).text = self.project.get('sponsor', 'Por definir')
        approval_table.cell(1, 2).text = "_____________"
        
        approval_table.cell(2, 0).text = "Project Manager"
        approval_table.cell(2, 1).text = self.project.get('pm', 'Por definir')
        approval_table.cell(2, 2).text = "_____________"
        
        approval_table.cell(3, 0).text = "Product Owner"
        approval_table.cell(3, 1).text = self.project.get('po', 'Por definir')
        approval_table.cell(3, 2).text = "_____________"
        
        doc.save(output_path)
        return output_path
```

---

## Flujo de activación

### Opción 1: Comando directo
```
/kick-off-docs
```

### Opción 2: Manual
El usuario ejecuta este skill y proporciona el directorio del proyecto. El skill:
1. Lee los archivos del proyecto
2. Compila los datos en una estructura JSON
3. Genera PPTX y DOCX
4. Guarda en el directorio `/output/` con timestamp

---

## Output esperado

Dos archivos generados:
1. `kick-off-presentacion-[proyecto]-[timestamp].pptx`
2. `acta-inicio-[proyecto]-[timestamp].docx`

Ambos listos para:
- Presentar en kick-off meeting
- Distribuir a stakeholders
- Firmar y archivar como documentos oficiales

---

## Checklist de validación

Antes de marcar como completado:
- [ ] PPTX carga correctamente en PowerPoint/Google Slides
- [ ] DOCX carga correctamente en Word/Google Docs
- [ ] Todos los stakeholder names están poblados
- [ ] Fechas son consistentes
- [ ] Presupuesto y hitos coinciden
- [ ] Formato profesional y legible
- [ ] Riesgos están claros e identificables

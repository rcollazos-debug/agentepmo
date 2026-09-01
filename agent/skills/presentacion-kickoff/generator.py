#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""
Kick-off Document Generator — VortexBird Branded
Generates PowerPoint presentations and Word documents for project launch.

Usage:
    python generator.py --project-data path/to/data.json --output path/to/output/
"""

import json
import os
import sys
from datetime import datetime
from pathlib import Path
from typing import Dict, List, Any

try:
    from pptx import Presentation
    from pptx.util import Inches, Pt, Emu
    from pptx.enum.text import PP_ALIGN
    from pptx.dml.color import RGBColor
    from pptx.util import Inches
    from pptx.oxml.ns import qn
    from lxml import etree
    PPTX_AVAILABLE = True
except ImportError:
    PPTX_AVAILABLE = False
    print("Warning: python-pptx not available. Install with: pip install python-pptx lxml")

try:
    from docx import Document
    from docx.shared import Pt as DocxPt, RGBColor as DocxRGB, Inches as DocxInches
    from docx.enum.text import WD_ALIGN_PARAGRAPH
    DOCX_AVAILABLE = True
except ImportError:
    DOCX_AVAILABLE = False
    print("Warning: python-docx not available. Install with: pip install python-docx")


# ---------------------------------------------------------------------------
# VortexBird Brand System — ChatPM
# ---------------------------------------------------------------------------
PRIMARY     = RGBColor(0x10, 0xC1, 0xBC) if PPTX_AVAILABLE else None  # Teal #10C1BC
SECONDARY   = RGBColor(0xFF, 0x91, 0x41) if PPTX_AVAILABLE else None  # Orange #FF9141
DARK_NAVY   = RGBColor(0x1E, 0x29, 0x3A) if PPTX_AVAILABLE else None  # Dark Navy #1E293A
TEXT_GRAY   = RGBColor(0x56, 0x56, 0x56) if PPTX_AVAILABLE else None  # Body text #565656
WHITE       = RGBColor(0xFF, 0xFF, 0xFF) if PPTX_AVAILABLE else None
LIGHT_BG    = RGBColor(0xF2, 0xF2, 0xF2) if PPTX_AVAILABLE else None
TEAL_LIGHT  = RGBColor(0xE0, 0xF7, 0xF7) if PPTX_AVAILABLE else None
RISK_RED    = RGBColor(0xC0, 0x00, 0x00) if PPTX_AVAILABLE else None
RISK_ORANGE = RGBColor(0xFF, 0x8C, 0x00) if PPTX_AVAILABLE else None
RISK_YELLOW = RGBColor(0xFF, 0xD7, 0x00) if PPTX_AVAILABLE else None
RISK_BG_RED    = RGBColor(0xFF, 0xE8, 0xE8) if PPTX_AVAILABLE else None
RISK_BG_ORANGE = RGBColor(0xFF, 0xF0, 0xD8) if PPTX_AVAILABLE else None
RISK_BG_YELLOW = RGBColor(0xFF, 0xFB, 0xD8) if PPTX_AVAILABLE else None

LOGO_PATH  = Path(__file__).parent.parent.parent / "assets" / "logo-vortexbird.png"
ICONS_DIR  = Path(__file__).parent.parent.parent / "assets" / "icons"

SLIDE_W  = Inches(13.333)
SLIDE_H  = Inches(7.5)
HEADER_H = Inches(1.1)
ACCENT_H = Inches(0.06)

# Icons8 ios-filled style — monochrome, professional
_ICON_NAMES = {
    'purpose':    'target',
    'scope':      'compass',
    'team':       'conference-call',
    'schedule':   'calendar',
    'budget':     'money',
    'risks':      'warning-shield',
    'success':    'checkmark--v1',
    'next_steps': 'circled-right-2',
    'contacts':   'contact-card',
}

# Typography — brand-guidelines: primary font + system fallback always defined
FONT_TITLE   = "Red Hat Display"
FONT_TITLE_FB = "Arial"       # fallback if Red Hat Display not installed
FONT_BODY    = "Open Sans"
FONT_BODY_FB  = "Helvetica"   # fallback if Open Sans not installed


def _luminance(r: int, g: int, b: int) -> float:
    """Relative luminance per WCAG 2.1 (0=black, 1=white)."""
    def _c(x):
        x /= 255
        return x / 12.92 if x <= 0.03928 else ((x + 0.055) / 1.055) ** 2.4
    return 0.2126 * _c(r) + 0.7152 * _c(g) + 0.0722 * _c(b)


def _contrast_ratio(rgb1: RGBColor, rgb2: RGBColor) -> float:
    """WCAG contrast ratio between two RGBColor values."""
    l1 = _luminance(rgb1[0], rgb1[1], rgb1[2])
    l2 = _luminance(rgb2[0], rgb2[1], rgb2[2])
    lighter, darker = max(l1, l2), min(l1, l2)
    return (lighter + 0.05) / (darker + 0.05)


def text_color_for_bg(bg: RGBColor) -> RGBColor:
    """Return WHITE or DARK_NAVY — whichever has higher WCAG contrast with bg."""
    white = RGBColor(0xFF, 0xFF, 0xFF)
    dark  = RGBColor(0x1E, 0x29, 0x3A)
    return white if _contrast_ratio(bg, white) >= _contrast_ratio(bg, dark) else dark


def _get_icon_path(key: str, color: str = "FFFFFF") -> "Path | None":
    """Return cached icon PNG (downloads from Icons8 CDN on first use). Never raises."""
    name = _ICON_NAMES.get(key)
    if not name:
        return None
    dest = ICONS_DIR / f"{key}.png"
    if dest.exists() and dest.stat().st_size > 200:
        return dest
    ICONS_DIR.mkdir(parents=True, exist_ok=True)
    url = f"https://img.icons8.com/ios-filled/64/{color}/{name}.png"
    try:
        import urllib.request
        urllib.request.urlretrieve(url, str(dest))
        if dest.stat().st_size > 200:
            return dest
        dest.unlink(missing_ok=True)
    except Exception:
        pass
    return None


def apply_font(p, size: float, bold: bool = False, is_heading: bool = None):
    """Apply brand font with system fallback (brand-guidelines: smart font application).
    Headings ≥ 24pt use FONT_TITLE, smaller text uses FONT_BODY."""
    use_title = is_heading if is_heading is not None else (size >= 24)
    try:
        p.font.name = FONT_TITLE if use_title else FONT_BODY
    except Exception:
        p.font.name = FONT_TITLE_FB if use_title else FONT_BODY_FB
    p.font.size = Pt(size)
    p.font.bold = bold


class KickoffDocumentGenerator:
    """Generate branded VortexBird kick-off presentation and charter document."""

    def __init__(self, project_data: Dict[str, Any], output_dir: str = None):
        self.project = project_data
        self.output_dir = output_dir or "./output/documentos-iniciales"
        self.timestamp = datetime.now().strftime("%d-%b-%Y").replace(" ", "-")
        Path(self.output_dir).mkdir(parents=True, exist_ok=True)

    # -----------------------------------------------------------------------
    # Brand helpers
    # -----------------------------------------------------------------------

    def _fill_shape(self, shape, color: RGBColor):
        """Fill a shape with a solid color."""
        fill = shape.fill
        fill.solid()
        fill.fore_color.rgb = color

    def _add_rect(self, slide, x, y, w, h, color: RGBColor):
        """Add a solid-colored rectangle."""
        shape = slide.shapes.add_shape(
            1,  # MSO_SHAPE_TYPE.RECTANGLE
            x, y, w, h
        )
        shape.line.fill.background()
        self._fill_shape(shape, color)
        return shape

    def _add_header_bar(self, slide, title: str, slide_type: str = None):
        """Full Dark Navy header: icon (left) · title (center) · logo (right).
        Thin teal accent line at bottom separates header from content area."""
        # Full Dark Navy bar
        self._add_rect(slide, Inches(0), Inches(0), SLIDE_W, HEADER_H, DARK_NAVY)
        # Teal accent line at bottom of header (brand color separator)
        self._add_rect(slide, Inches(0), HEADER_H - Inches(0.045), SLIDE_W, Inches(0.045), PRIMARY)

        # Icon — left side
        icon_size = Inches(0.58)
        icon_x = Inches(0.28)
        icon_y = (HEADER_H - icon_size) / 2 - Inches(0.02)
        icon_path = _get_icon_path(slide_type) if slide_type else None
        if icon_path:
            slide.shapes.add_picture(str(icon_path), icon_x, icon_y,
                                     width=icon_size, height=icon_size)

        # Title text
        title_x = Inches(1.05) if icon_path else Inches(0.35)
        title_w = Inches(10.3) if icon_path else Inches(11.0)
        tb = slide.shapes.add_textbox(title_x, Inches(0.15), title_w, Inches(0.85))
        tf = tb.text_frame
        tf.word_wrap = False
        p = tf.paragraphs[0]
        p.text = title
        p.font.size = Pt(28)
        p.font.bold = True
        p.font.color.rgb = WHITE
        p.font.name = FONT_TITLE

        # Logo — right side, vertically centered
        logo_w = Inches(1.55)
        logo_h = logo_w * (300 / 1200)
        logo_y = (HEADER_H - logo_h) / 2
        self._add_logo(slide, x=Inches(11.72), y=logo_y, w=logo_w)

    def _add_logo(self, slide, x=Inches(11.72), y=Inches(0.36), w=Inches(1.55)):
        """Add VortexBird logo (caller must ensure dark/navy background)."""
        if LOGO_PATH.exists():
            slide.shapes.add_picture(str(LOGO_PATH), x, y, width=w)

    def _add_bottom_accent(self, slide):
        """Add orange accent line at the bottom."""
        self._add_rect(slide, Inches(0), SLIDE_H - ACCENT_H, SLIDE_W, ACCENT_H, SECONDARY)

    def _add_dark_slide_base(self, slide):
        """Fill entire slide background with DARK_NAVY."""
        bg = slide.background
        fill = bg.fill
        fill.solid()
        fill.fore_color.rgb = DARK_NAVY

    def _set_text(self, tf, text, size, bold=False, color=None, align=PP_ALIGN.LEFT, font=FONT_BODY):
        """Set text frame content with consistent styling."""
        tf.word_wrap = True
        p = tf.paragraphs[0]
        p.text = text
        p.font.size = Pt(size)
        p.font.bold = bold
        p.font.color.rgb = color or TEXT_GRAY
        p.alignment = align
        p.font.name = font

    def _add_bullet(self, tf, text, size=15, color=None, prefix=""):
        """Add a bullet paragraph to a text frame."""
        p = tf.add_paragraph()
        p.text = f"{prefix}{text}"
        p.font.size = Pt(size)
        p.font.color.rgb = color or TEXT_GRAY
        p.font.name = FONT_BODY
        p.alignment = PP_ALIGN.LEFT

    # -----------------------------------------------------------------------
    # Slide builders
    # -----------------------------------------------------------------------

    def _add_title_slide(self, prs: Presentation) -> None:
        """Slide 1 — Portada: dark navy, teal accent bar, logo centered, white text."""
        slide = prs.slides.add_slide(prs.slide_layouts[6])
        self._add_dark_slide_base(slide)

        # Top teal accent bar (thin)
        self._add_rect(slide, Inches(0), Inches(0), SLIDE_W, Inches(0.08), PRIMARY)

        # Logo centered at top
        self._add_logo(slide, x=Inches(5.67), y=Inches(0.3), w=Inches(2.5))

        # Horizontal teal divider below logo
        self._add_rect(slide, Inches(1.5), Inches(1.35), Inches(10.333), Inches(0.05), PRIMARY)

        # Project name
        tb = slide.shapes.add_textbox(Inches(0.5), Inches(1.6), Inches(12.333), Inches(1.6))
        tf = tb.text_frame
        self._set_text(tf, self.project.get('nombre', 'PROYECTO'),
                       size=52, bold=True, color=WHITE, align=PP_ALIGN.CENTER, font=FONT_TITLE)

        # Metadata rows
        meta_lines = []
        if self.project.get('sponsor'):
            meta_lines.append(f"Sponsor:  {self.project['sponsor']}")
        if self.project.get('pm'):
            meta_lines.append(f"Project Manager:  {self.project['pm']}")
        meta_lines.append("")
        if self.project.get('fecha_inicio'):
            meta_lines.append(f"Inicio:  {self.project['fecha_inicio']}    Go-Live:  {self.project.get('fecha_fin', 'Por definir')}")

        meta_box = slide.shapes.add_textbox(Inches(1.5), Inches(3.5), Inches(10.333), Inches(2.5))
        meta_tf = meta_box.text_frame
        meta_tf.word_wrap = True
        first = True
        for line in meta_lines:
            p = meta_tf.paragraphs[0] if first else meta_tf.add_paragraph()
            first = False
            p.text = line
            p.font.size = Pt(17)
            p.font.color.rgb = RGBColor(0xCC, 0xCC, 0xCC)
            p.font.name = FONT_BODY
            p.alignment = PP_ALIGN.CENTER

        # Bottom orange accent bar
        self._add_rect(slide, Inches(0), SLIDE_H - Inches(0.08), SLIDE_W, Inches(0.08), SECONDARY)

    def _add_purpose_slide(self, prs: Presentation) -> None:
        """Slide 2 — Propósito y Objetivos."""
        slide = prs.slides.add_slide(prs.slide_layouts[6])
        self._add_header_bar(slide, "Propósito y Objetivos", 'purpose')
        self._add_bottom_accent(slide)

        # Propósito label
        lbl = slide.shapes.add_textbox(Inches(0.5), Inches(1.2), Inches(12.333), Inches(0.4))
        self._set_text(lbl.text_frame, "¿POR QUÉ ESTE PROYECTO?", 11, bold=True, color=PRIMARY, font=FONT_TITLE)

        # Propósito text
        proposito = self.project.get('proposito', 'Por definir')
        tb = slide.shapes.add_textbox(Inches(0.5), Inches(1.6), Inches(12.333), Inches(1.2))
        tf = tb.text_frame
        tf.word_wrap = True
        self._set_text(tf, proposito, 16, color=DARK_NAVY, font=FONT_BODY)

        # Teal divider
        self._add_rect(slide, Inches(0.5), Inches(2.9), Inches(12.333), Inches(0.04), PRIMARY)

        # Objetivos label
        lbl2 = slide.shapes.add_textbox(Inches(0.5), Inches(3.0), Inches(12.333), Inches(0.4))
        self._set_text(lbl2.text_frame, "OBJETIVOS", 11, bold=True, color=PRIMARY, font=FONT_TITLE)

        # Objectives
        objectives = self.project.get('objetivos', [])
        if isinstance(objectives, str):
            objectives = [objectives]

        tb2 = slide.shapes.add_textbox(Inches(0.5), Inches(3.45), Inches(12.333), Inches(3.7))
        tf2 = tb2.text_frame
        tf2.word_wrap = True
        first = True
        for obj in objectives:
            p = tf2.paragraphs[0] if first else tf2.add_paragraph()
            first = False
            p.text = f"  ●  {obj}"
            p.font.size = Pt(15)
            p.font.color.rgb = TEXT_GRAY
            p.font.name = FONT_BODY
            p.alignment = PP_ALIGN.LEFT
            # Colored bullet dot
            if p.runs:
                p.runs[0].font.color.rgb = PRIMARY

    def _add_scope_slide(self, prs: Presentation) -> None:
        """Slide 3 — Alcance: two columns, teal background for IN, gray for OUT."""
        slide = prs.slides.add_slide(prs.slide_layouts[6])
        self._add_header_bar(slide, "Alcance del Proyecto", 'scope')
        self._add_bottom_accent(slide)

        # Left column: INCLUYE — teal-light background
        self._add_rect(slide, Inches(0.3), Inches(1.15), Inches(6.2), Inches(6.1), TEAL_LIGHT)
        lbl_in = slide.shapes.add_textbox(Inches(0.45), Inches(1.25), Inches(5.8), Inches(0.45))
        self._set_text(lbl_in.text_frame, "✓  INCLUYE", 14, bold=True, color=PRIMARY, font=FONT_TITLE)

        inclusions = self.project.get('alcance_incluye', [])
        if isinstance(inclusions, str):
            inclusions = [inclusions]
        tb_in = slide.shapes.add_textbox(Inches(0.45), Inches(1.75), Inches(5.8), Inches(5.3))
        tf_in = tb_in.text_frame
        tf_in.word_wrap = True
        first = True
        for item in inclusions:
            p = tf_in.paragraphs[0] if first else tf_in.add_paragraph()
            first = False
            p.text = f"  ✓  {item}"
            p.font.size = Pt(13)
            p.font.color.rgb = DARK_NAVY
            p.font.name = FONT_BODY
            p.space_after = Pt(4)

        # Right column: EXCLUYE — light gray background
        self._add_rect(slide, Inches(6.9), Inches(1.15), Inches(6.2), Inches(6.1), LIGHT_BG)
        lbl_out = slide.shapes.add_textbox(Inches(7.05), Inches(1.25), Inches(5.8), Inches(0.45))
        self._set_text(lbl_out.text_frame, "✗  EXCLUYE", 14, bold=True, color=RISK_RED, font=FONT_TITLE)

        exclusions = self.project.get('alcance_excluye', [])
        if isinstance(exclusions, str):
            exclusions = [exclusions]
        tb_out = slide.shapes.add_textbox(Inches(7.05), Inches(1.75), Inches(5.8), Inches(5.3))
        tf_out = tb_out.text_frame
        tf_out.word_wrap = True
        first = True
        for item in exclusions:
            p = tf_out.paragraphs[0] if first else tf_out.add_paragraph()
            first = False
            p.text = f"  ✗  {item}"
            p.font.size = Pt(13)
            p.font.color.rgb = TEXT_GRAY
            p.font.name = FONT_BODY
            p.space_after = Pt(4)

    def _add_team_slide(self, prs: Presentation) -> None:
        """Slide 4 — Equipo: person cards with teal border."""
        slide = prs.slides.add_slide(prs.slide_layouts[6])
        self._add_header_bar(slide, "Equipo del Proyecto", 'team')
        self._add_bottom_accent(slide)

        team = self.project.get('equipo', [])
        if not team:
            tb = slide.shapes.add_textbox(Inches(0.5), Inches(1.5), Inches(9), Inches(1))
            self._set_text(tb.text_frame, "Equipo por definir", 18, color=TEXT_GRAY)
            return

        # Layout: max 3 per row
        cols = min(3, len(team))
        card_w = Inches(2.9) if cols == 3 else (Inches(4.3) if cols == 2 else Inches(6))
        card_h = Inches(1.45)
        x_start = Inches(0.3)
        x_gap = Inches(0.2)
        y_start = Inches(1.2)
        y_gap = Inches(0.2)

        for i, member in enumerate(team[:9]):
            nombre = member.get('nombre', 'N/A') if isinstance(member, dict) else str(member)
            rol = member.get('rol', '') if isinstance(member, dict) else ''

            row = i // cols
            col = i % cols
            x = x_start + col * (card_w + x_gap)
            y = y_start + row * (card_h + y_gap)

            # Card background
            self._add_rect(slide, x, y, card_w, card_h, LIGHT_BG)
            # Teal left border (thin rectangle)
            self._add_rect(slide, x, y, Inches(0.07), card_h, PRIMARY)

            # Name
            tb_name = slide.shapes.add_textbox(x + Inches(0.15), y + Inches(0.15), card_w - Inches(0.2), Inches(0.65))
            self._set_text(tb_name.text_frame, nombre, 16, bold=True, color=DARK_NAVY, font=FONT_TITLE)

            # Role
            if rol:
                tb_rol = slide.shapes.add_textbox(x + Inches(0.15), y + Inches(0.75), card_w - Inches(0.2), Inches(0.55))
                self._set_text(tb_rol.text_frame, rol, 12, color=PRIMARY, font=FONT_BODY)

    def _add_schedule_slide(self, prs: Presentation) -> None:
        """Slide 5 — Cronograma: visual timeline with teal circles."""
        slide = prs.slides.add_slide(prs.slide_layouts[6])
        self._add_header_bar(slide, "Cronograma y Hitos", 'schedule')
        self._add_bottom_accent(slide)

        hitos = self.project.get('hitos', [])
        if not hitos:
            tb = slide.shapes.add_textbox(Inches(0.5), Inches(1.5), Inches(9), Inches(1))
            self._set_text(tb.text_frame, "Hitos por definir", 18, color=TEXT_GRAY)
            return

        # Horizontal timeline line
        y_line = Inches(3.2)
        self._add_rect(slide, Inches(0.5), y_line, Inches(12.333), Inches(0.05), PRIMARY)

        n = min(len(hitos), 5)
        spacing = Inches(12.333) / (n + 1) if n > 1 else Inches(4.5)
        x_base = Inches(0.5)

        for i, hito in enumerate(hitos[:5]):
            nombre = hito.get('nombre', 'Hito') if isinstance(hito, dict) else str(hito)
            fecha = hito.get('fecha', '') if isinstance(hito, dict) else ''

            x_center = x_base + spacing * (i + 1)
            circle_r = Inches(0.22)

            # Teal circle on timeline
            circle = slide.shapes.add_shape(9, x_center - circle_r, y_line - circle_r, circle_r * 2, circle_r * 2)
            self._fill_shape(circle, PRIMARY)
            circle.line.fill.background()

            # Hito number in circle
            tb_num = slide.shapes.add_textbox(x_center - circle_r, y_line - circle_r, circle_r * 2, circle_r * 2)
            p = tb_num.text_frame.paragraphs[0]
            p.text = str(i + 1)
            p.font.size = Pt(11)
            p.font.bold = True
            p.font.color.rgb = WHITE
            p.alignment = PP_ALIGN.CENTER
            p.font.name = FONT_TITLE

            # Date above timeline
            tb_date = slide.shapes.add_textbox(x_center - Inches(0.9), y_line - Inches(0.85), Inches(1.8), Inches(0.4))
            self._set_text(tb_date.text_frame, fecha, 11, bold=True, color=SECONDARY, font=FONT_BODY)
            tb_date.text_frame.paragraphs[0].alignment = PP_ALIGN.CENTER

            # Milestone name below timeline
            tb_name = slide.shapes.add_textbox(x_center - Inches(0.9), y_line + Inches(0.4), Inches(1.8), Inches(0.8))
            self._set_text(tb_name.text_frame, nombre, 11, color=DARK_NAVY, font=FONT_BODY)
            tb_name.text_frame.paragraphs[0].alignment = PP_ALIGN.CENTER
            tb_name.text_frame.word_wrap = True

        # Dates row header
        tb_h = slide.shapes.add_textbox(Inches(0.3), Inches(1.15), Inches(4), Inches(0.4))
        self._set_text(tb_h.text_frame, "FECHAS CLAVE", 10, bold=True, color=PRIMARY, font=FONT_TITLE)

        # Key dates summary below
        y_sum = Inches(4.4)
        key_dates = [
            ("Inicio del proyecto", self.project.get('fecha_inicio', '—')),
            ("MVP / Release 1", self.project.get('fecha_mvp', '—')),
            ("Go-Live", self.project.get('fecha_go_live', self.project.get('fecha_fin', '—'))),
        ]
        for j, (label, date) in enumerate(key_dates):
            xd = Inches(0.5) + j * Inches(3.1)
            self._add_rect(slide, xd, y_sum, Inches(3.8), Inches(0.8), TEAL_LIGHT)
            tb_kd = slide.shapes.add_textbox(xd + Inches(0.1), y_sum + Inches(0.08), Inches(3.6), Inches(0.65))
            tf = tb_kd.text_frame
            tf.word_wrap = True
            lp = tf.paragraphs[0]
            lp.text = label
            lp.font.size = Pt(10)
            lp.font.color.rgb = PRIMARY
            lp.font.name = FONT_BODY
            dp = tf.add_paragraph()
            dp.text = date
            dp.font.size = Pt(13)
            dp.font.bold = True
            dp.font.color.rgb = DARK_NAVY
            dp.font.name = FONT_TITLE

    def _add_budget_slide(self, prs: Presentation) -> None:
        """Slide 6 — Presupuesto: total big + category bars."""
        slide = prs.slides.add_slide(prs.slide_layouts[6])
        self._add_header_bar(slide, "Presupuesto del Proyecto", 'budget')
        self._add_bottom_accent(slide)

        # Total budget highlight box
        self._add_rect(slide, Inches(0.5), Inches(1.15), Inches(12.333), Inches(0.95), TEAL_LIGHT)
        tb_total = slide.shapes.add_textbox(Inches(0.7), Inches(1.2), Inches(12.0), Inches(0.85))
        tf_t = tb_total.text_frame
        p1 = tf_t.paragraphs[0]
        p1.text = "PRESUPUESTO TOTAL"
        p1.font.size = Pt(11)
        p1.font.bold = True
        p1.font.color.rgb = PRIMARY
        p1.font.name = FONT_TITLE
        p1.alignment = PP_ALIGN.CENTER
        p2 = tf_t.add_paragraph()
        p2.text = f"$ {self.project.get('presupuesto', 'Por definir')}"
        p2.font.size = Pt(26)
        p2.font.bold = True
        p2.font.color.rgb = DARK_NAVY
        p2.font.name = FONT_TITLE
        p2.alignment = PP_ALIGN.CENTER

        # Category breakdown
        items = self.project.get('presupuesto_desglose', [])
        if items:
            tb_lbl = slide.shapes.add_textbox(Inches(0.5), Inches(2.25), Inches(4), Inches(0.35))
            self._set_text(tb_lbl.text_frame, "DESGLOSE POR CATEGORÍA", 10, bold=True, color=PRIMARY, font=FONT_TITLE)

            for k, item in enumerate(items[:6]):
                concepto = item.get('concepto', 'Concepto') if isinstance(item, dict) else str(item)
                monto = item.get('monto', '0') if isinstance(item, dict) else '0'

                y_item = Inches(2.65) + k * Inches(0.72)
                self._add_rect(slide, Inches(0.5), y_item, Inches(12.333), Inches(0.6), LIGHT_BG)
                self._add_rect(slide, Inches(0.5), y_item, Inches(0.08), Inches(0.6), PRIMARY)

                tb_cat = slide.shapes.add_textbox(Inches(0.7), y_item + Inches(0.05), Inches(9.8), Inches(0.5))
                tf_c = tb_cat.text_frame
                cp = tf_c.paragraphs[0]
                cp.text = concepto
                cp.font.size = Pt(13)
                cp.font.color.rgb = TEXT_GRAY
                cp.font.name = FONT_BODY

                tb_monto = slide.shapes.add_textbox(Inches(10.8), y_item + Inches(0.05), Inches(2.5), Inches(0.5))
                tf_m = tb_monto.text_frame
                mp = tf_m.paragraphs[0]
                mp.text = f"$ {monto}"
                mp.font.size = Pt(14)
                mp.font.bold = True
                mp.font.color.rgb = DARK_NAVY
                mp.font.name = FONT_TITLE
                mp.alignment = PP_ALIGN.RIGHT

    def _add_risks_slide(self, prs: Presentation) -> None:
        """Slide 7 — Riesgos: cards with color-coded severity."""
        slide = prs.slides.add_slide(prs.slide_layouts[6])
        self._add_header_bar(slide, "Riesgos Principales", 'risks')
        self._add_bottom_accent(slide)

        risks = self.project.get('riesgos_top', [])
        if not risks:
            tb = slide.shapes.add_textbox(Inches(0.5), Inches(1.5), Inches(9), Inches(1))
            self._set_text(tb.text_frame, "Sin riesgos identificados", 18, color=TEXT_GRAY)
            return

        level_colors = {
            'alto': (RISK_RED, RISK_BG_RED),
            'crítico': (RISK_RED, RISK_BG_RED),
            'critico': (RISK_RED, RISK_BG_RED),
            'medio': (RISK_ORANGE, RISK_BG_ORANGE),
            'moderate': (RISK_ORANGE, RISK_BG_ORANGE),
            'bajo': (RISK_YELLOW, RISK_BG_YELLOW),
            'low': (RISK_YELLOW, RISK_BG_YELLOW),
        }

        for i, risk in enumerate(risks[:5]):
            descripcion = risk.get('descripcion', 'Riesgo') if isinstance(risk, dict) else str(risk)
            nivel = (risk.get('nivel', '?') if isinstance(risk, dict) else '?').lower()
            mitigacion = risk.get('mitigacion', '') if isinstance(risk, dict) else ''

            border_c, bg_c = level_colors.get(nivel, (TEXT_GRAY, LIGHT_BG))
            card_h = Inches(1.05) if mitigacion else Inches(0.72)
            y_card = Inches(1.18) + i * (card_h + Inches(0.1))

            self._add_rect(slide, Inches(0.3), y_card, Inches(12.7), card_h, bg_c)
            self._add_rect(slide, Inches(0.3), y_card, Inches(0.1), card_h, border_c)

            # Level badge
            badge = slide.shapes.add_textbox(Inches(0.5), y_card + Inches(0.08), Inches(1.1), Inches(0.35))
            bp = badge.text_frame.paragraphs[0]
            bp.text = nivel.upper()
            bp.font.size = Pt(10)
            bp.font.bold = True
            bp.font.color.rgb = border_c
            bp.font.name = FONT_TITLE

            # Description
            tb_d = slide.shapes.add_textbox(Inches(1.65), y_card + Inches(0.06), Inches(11.2), Inches(0.38))
            self._set_text(tb_d.text_frame, descripcion, 13, bold=True, color=DARK_NAVY, font=FONT_BODY)

            # Mitigation
            if mitigacion:
                tb_m = slide.shapes.add_textbox(Inches(1.65), y_card + Inches(0.5), Inches(11.2), Inches(0.45))
                self._set_text(tb_m.text_frame, f"→ {mitigacion}", 11, color=TEXT_GRAY, font=FONT_BODY)

    def _add_success_slide(self, prs: Presentation) -> None:
        """Slide 8 — Criterios de Éxito: numbered circular bullets."""
        slide = prs.slides.add_slide(prs.slide_layouts[6])
        self._add_header_bar(slide, "Criterios de Éxito", 'success')
        self._add_bottom_accent(slide)

        criteria = self.project.get('criterios_exito', [])
        if isinstance(criteria, str):
            criteria = [criteria]

        for i, crit in enumerate(criteria[:6]):
            y_row = Inches(1.25) + i * Inches(0.95)
            # Circle
            r = Inches(0.28)
            cx = Inches(0.55)
            circle = slide.shapes.add_shape(9, cx, y_row + Inches(0.05), r * 2, r * 2)
            self._fill_shape(circle, PRIMARY)
            circle.line.fill.background()
            tb_num = slide.shapes.add_textbox(cx, y_row + Inches(0.05), r * 2, r * 2)
            np = tb_num.text_frame.paragraphs[0]
            np.text = str(i + 1)
            np.font.size = Pt(12)
            np.font.bold = True
            np.font.color.rgb = WHITE
            np.alignment = PP_ALIGN.CENTER
            np.font.name = FONT_TITLE

            # Criteria text
            tb_c = slide.shapes.add_textbox(Inches(1.1), y_row + Inches(0.05), Inches(11.8), Inches(0.78))
            self._set_text(tb_c.text_frame, crit, 15, color=DARK_NAVY, font=FONT_BODY)
            tb_c.text_frame.word_wrap = True

    def _add_next_steps_slide(self, prs: Presentation) -> None:
        """Slide 9 — Próximos Pasos: arrow-styled numbered list."""
        slide = prs.slides.add_slide(prs.slide_layouts[6])
        self._add_header_bar(slide, "Próximos Pasos", 'next_steps')
        self._add_bottom_accent(slide)

        steps = self.project.get('proximos_pasos', [])
        if isinstance(steps, str):
            steps = [steps]

        if not steps:
            steps = [
                "Firma del Acta de Inicio",
                "Sprint Planning — Sprint 1",
                "Configuración de ambientes de desarrollo",
                "Kick-off interno del equipo técnico",
            ]

        for i, step in enumerate(steps[:6]):
            y_row = Inches(1.25) + i * Inches(0.9)
            self._add_rect(slide, Inches(0.35), y_row + Inches(0.1), Inches(0.55), Inches(0.55), PRIMARY)
            tb_n = slide.shapes.add_textbox(Inches(0.35), y_row + Inches(0.1), Inches(0.55), Inches(0.55))
            np2 = tb_n.text_frame.paragraphs[0]
            np2.text = str(i + 1)
            np2.font.size = Pt(14)
            np2.font.bold = True
            np2.font.color.rgb = WHITE
            np2.alignment = PP_ALIGN.CENTER
            np2.font.name = FONT_TITLE

            tb_s = slide.shapes.add_textbox(Inches(1.05), y_row + Inches(0.08), Inches(11.9), Inches(0.72))
            self._set_text(tb_s.text_frame, step, 15, color=DARK_NAVY, font=FONT_BODY)
            tb_s.text_frame.word_wrap = True

    def _add_contacts_slide(self, prs: Presentation) -> None:
        """Slide 10 — Contactos Clave: cards with orange border."""
        slide = prs.slides.add_slide(prs.slide_layouts[6])
        self._add_header_bar(slide, "Contactos Clave", 'contacts')
        self._add_bottom_accent(slide)

        contacts = self.project.get('contactos', {})
        if not contacts:
            tb = slide.shapes.add_textbox(Inches(0.5), Inches(1.5), Inches(9), Inches(1))
            self._set_text(tb.text_frame, "Contactos por definir", 18, color=TEXT_GRAY)
            return

        items = list(contacts.items()) if isinstance(contacts, dict) else [(str(c), '') for c in contacts]
        cols = min(3, len(items))
        card_w = Inches(2.9) if cols == 3 else (Inches(4.3) if cols == 2 else Inches(6))
        card_h = Inches(1.3)

        for i, (role, info) in enumerate(items[:6]):
            row = i // cols
            col = i % cols
            x = Inches(0.3) + col * (card_w + Inches(0.2))
            y = Inches(1.2) + row * (card_h + Inches(0.25))

            self._add_rect(slide, x, y, card_w, card_h, LIGHT_BG)
            self._add_rect(slide, x, y, Inches(0.07), card_h, SECONDARY)

            tb_r = slide.shapes.add_textbox(x + Inches(0.15), y + Inches(0.12), card_w - Inches(0.2), Inches(0.45))
            self._set_text(tb_r.text_frame, role, 13, bold=True, color=DARK_NAVY, font=FONT_TITLE)

            if info:
                tb_i = slide.shapes.add_textbox(x + Inches(0.15), y + Inches(0.6), card_w - Inches(0.2), Inches(0.55))
                self._set_text(tb_i.text_frame, str(info), 12, color=TEXT_GRAY, font=FONT_BODY)

    def _add_closing_slide(self, prs: Presentation) -> None:
        """Slide 11 — Q&A / Cierre: dark navy, logo centered."""
        slide = prs.slides.add_slide(prs.slide_layouts[6])
        self._add_dark_slide_base(slide)

        self._add_rect(slide, Inches(0), Inches(0), SLIDE_W, Inches(0.08), PRIMARY)

        # Logo
        self._add_logo(slide, x=Inches(5.67), y=Inches(0.5), w=Inches(2.5))

        # Teal divider
        self._add_rect(slide, Inches(2.5), Inches(1.55), Inches(6.0), Inches(0.05), PRIMARY)

        # "Preguntas y Respuestas" heading
        tb_qa = slide.shapes.add_textbox(Inches(1.0), Inches(1.8), Inches(11.333), Inches(1.2))
        self._set_text(tb_qa.text_frame, "Preguntas y Respuestas",
                       44, bold=True, color=WHITE, align=PP_ALIGN.CENTER, font=FONT_TITLE)

        # Tagline
        tb_tag = slide.shapes.add_textbox(Inches(1.0), Inches(3.2), Inches(11.333), Inches(0.7))
        self._set_text(tb_tag.text_frame, "Construimos tecnología. Construimos relaciones.",
                       17, color=RGBColor(0xAA, 0xAA, 0xAA), align=PP_ALIGN.CENTER, font=FONT_BODY)

        self._add_rect(slide, Inches(0), SLIDE_H - Inches(0.08), SLIDE_W, Inches(0.08), SECONDARY)

    # -----------------------------------------------------------------------
    # Public generation methods
    # -----------------------------------------------------------------------

    def validate_project_data(self) -> List[str]:
        errors = []
        required = {
            'nombre': 'Project name',
            'sponsor': 'Sponsor',
            'pm': 'Project Manager',
            'fecha_inicio': 'Start date',
            'fecha_fin': 'End date',
        }
        for field, label in required.items():
            if not self.project.get(field):
                errors.append(f"Missing: {label}")
        return errors

    def generate_presentation(self) -> str:
        if not PPTX_AVAILABLE:
            raise ImportError("python-pptx not available. pip install python-pptx lxml")

        prs = Presentation()
        prs.slide_width = SLIDE_W
        prs.slide_height = SLIDE_H

        self._add_title_slide(prs)
        self._add_purpose_slide(prs)
        self._add_scope_slide(prs)
        self._add_team_slide(prs)
        self._add_schedule_slide(prs)
        self._add_budget_slide(prs)
        self._add_risks_slide(prs)
        self._add_success_slide(prs)
        self._add_next_steps_slide(prs)
        self._add_contacts_slide(prs)
        self._add_closing_slide(prs)

        filename = f"Kick-off-{self.project.get('nombre', 'Proyecto')}-{self.timestamp}.pptx"
        output_path = os.path.join(self.output_dir, filename)
        prs.save(output_path)
        return output_path

    def generate_charter(self) -> str:
        if not DOCX_AVAILABLE:
            raise ImportError("python-docx not available. pip install python-docx")

        doc = Document()

        title = doc.add_heading('ACTA DE INICIO DEL PROYECTO', 0)
        title.alignment = WD_ALIGN_PARAGRAPH.CENTER

        subtitle = doc.add_heading(self.project.get('nombre', 'PROYECTO'), level=2)
        subtitle.alignment = WD_ALIGN_PARAGRAPH.CENTER

        doc.add_paragraph(f"Fecha: {datetime.now().strftime('%d de %B de %Y')}").alignment = WD_ALIGN_PARAGRAPH.CENTER
        doc.add_paragraph()

        doc.add_heading('1. INFORMACIÓN GENERAL', level=1)
        t = doc.add_table(rows=7, cols=2)
        t.style = 'Light Grid Accent 1'
        rows_data = [
            ("Nombre del Proyecto", self.project.get('nombre', '—')),
            ("Sponsor", self.project.get('sponsor', '—')),
            ("Project Manager", self.project.get('pm', '—')),
            ("Product Owner", self.project.get('po', '—')),
            ("Fecha de Inicio", self.project.get('fecha_inicio', '—')),
            ("Fecha de Término", self.project.get('fecha_fin', '—')),
            ("Presupuesto Aprobado", f"$ {self.project.get('presupuesto', '—')}"),
        ]
        for i, (k, v) in enumerate(rows_data):
            t.cell(i, 0).text = k
            t.cell(i, 1).text = str(v)

        doc.add_heading('2. DESCRIPCIÓN DEL PROYECTO', level=1)
        doc.add_heading('2.1 Propósito y Justificación', level=2)
        doc.add_paragraph(self.project.get('proposito', '—'))

        doc.add_heading('2.2 Objetivos', level=2)
        for obj in (self.project.get('objetivos', []) if isinstance(self.project.get('objetivos'), list) else [self.project.get('objetivos', '')]):
            doc.add_paragraph(obj, style='List Bullet')

        doc.add_heading('2.3 Alcance', level=2)
        doc.add_paragraph('Incluye:', style='Heading 3')
        for item in (self.project.get('alcance_incluye', []) if isinstance(self.project.get('alcance_incluye'), list) else [self.project.get('alcance_incluye', '')]):
            doc.add_paragraph(item, style='List Bullet')
        doc.add_paragraph('Excluye:', style='Heading 3')
        for item in (self.project.get('alcance_excluye', []) if isinstance(self.project.get('alcance_excluye'), list) else [self.project.get('alcance_excluye', '')]):
            doc.add_paragraph(item, style='List Bullet')

        doc.add_heading('3. CRONOGRAMA GENERAL', level=1)
        t3 = doc.add_table(rows=4, cols=2)
        t3.style = 'Light Grid Accent 1'
        for i, (k, v) in enumerate([
            ("Inicio", self.project.get('fecha_inicio', '—')),
            ("Término", self.project.get('fecha_fin', '—')),
            ("MVP", self.project.get('fecha_mvp', '—')),
            ("Go-Live", self.project.get('fecha_go_live', '—')),
        ]):
            t3.cell(i, 0).text = k
            t3.cell(i, 1).text = str(v)

        doc.add_paragraph()
        doc.add_paragraph('Hitos Principales:', style='Heading 3')
        for h in self.project.get('hitos', []):
            nombre = h.get('nombre', '—') if isinstance(h, dict) else str(h)
            fecha = h.get('fecha', '—') if isinstance(h, dict) else '—'
            doc.add_paragraph(f"{nombre} — {fecha}", style='List Bullet')

        doc.add_heading('4. ESTIMACIÓN DE RECURSOS', level=1)
        doc.add_heading('4.1 Presupuesto', level=2)
        doc.add_paragraph(f"Total: $ {self.project.get('presupuesto', '—')}")
        for item in self.project.get('presupuesto_desglose', []):
            c = item.get('concepto', '—') if isinstance(item, dict) else str(item)
            m = item.get('monto', '—') if isinstance(item, dict) else '—'
            doc.add_paragraph(f"{c}: $ {m}", style='List Bullet')

        doc.add_heading('4.2 Equipo', level=2)
        for member in self.project.get('equipo', []):
            n = member.get('nombre', '—') if isinstance(member, dict) else str(member)
            r = member.get('rol', '—') if isinstance(member, dict) else '—'
            doc.add_paragraph(f"{n} — {r}", style='List Bullet')

        doc.add_heading('5. RIESGOS Y RESTRICCIONES', level=1)
        doc.add_heading('5.1 Riesgos', level=2)
        for risk in self.project.get('riesgos_top', [])[:5]:
            d = risk.get('descripcion', '—') if isinstance(risk, dict) else str(risk)
            n = risk.get('nivel', '?') if isinstance(risk, dict) else '?'
            doc.add_paragraph(f"{d} [{n}]", style='List Bullet')

        doc.add_heading('5.2 Restricciones', level=2)
        restricciones = self.project.get('restricciones', [])
        if isinstance(restricciones, str):
            restricciones = [restricciones]
        for r in restricciones:
            doc.add_paragraph(r, style='List Bullet')

        doc.add_heading('6. CRITERIOS DE ÉXITO', level=1)
        doc.add_heading('6.1 Entregables', level=2)
        for e in (self.project.get('entregables', []) if isinstance(self.project.get('entregables'), list) else []):
            doc.add_paragraph(e, style='List Bullet')
        doc.add_heading('6.2 Métricas', level=2)
        for m in (self.project.get('criterios_exito', []) if isinstance(self.project.get('criterios_exito'), list) else []):
            doc.add_paragraph(m, style='List Bullet')

        doc.add_heading('7. AUTORIZACIÓN Y APROBACIONES', level=1)
        ta = doc.add_table(rows=4, cols=3)
        ta.style = 'Light Grid Accent 1'
        ta.cell(0, 0).text = "Rol"
        ta.cell(0, 1).text = "Nombre"
        ta.cell(0, 2).text = "Firma / Fecha"
        for i, (rol, key) in enumerate([('Sponsor', 'sponsor'), ('Project Manager', 'pm'), ('Product Owner', 'po')], 1):
            ta.cell(i, 0).text = rol
            ta.cell(i, 1).text = self.project.get(key, '—')
            ta.cell(i, 2).text = "_____________________"

        filename = f"Acta-Inicio-{self.project.get('nombre', 'Proyecto')}-{self.timestamp}.docx"
        output_path = os.path.join(self.output_dir, filename)
        doc.save(output_path)
        return output_path

    def generate_all(self) -> dict:
        results = {'success': False, 'errors': [], 'files': {}, 'timestamp': self.timestamp}

        warnings = self.validate_project_data()
        if warnings:
            print("⚠️  Validation warnings:")
            for w in warnings:
                print(f"   - {w}")

        try:
            if PPTX_AVAILABLE:
                path = self.generate_presentation()
                results['files']['presentation'] = path
                print(f"✓ Presentación: {path}")
            else:
                results['errors'].append("python-pptx not available")
        except Exception as e:
            results['errors'].append(f"Error PPTX: {e}")
            print(f"✗ Error presentación: {e}")

        try:
            if DOCX_AVAILABLE:
                path = self.generate_charter()
                results['files']['charter'] = path
                print(f"✓ Acta de Inicio: {path}")
            else:
                results['errors'].append("python-docx not available")
        except Exception as e:
            results['errors'].append(f"Error DOCX: {e}")
            print(f"✗ Error acta: {e}")

        results['success'] = len(results['files']) > 0
        return results


def main():
    import argparse
    parser = argparse.ArgumentParser(description='VortexBird Kick-off Document Generator')
    parser.add_argument('--project-data', '-d', help='JSON file with project data')
    parser.add_argument('--output', '-o', default='./output/documentos-iniciales', help='Output directory')
    args = parser.parse_args()

    if args.project_data:
        with open(args.project_data, 'r', encoding='utf-8') as f:
            project_data = json.load(f)
    else:
        project_data = {
            'nombre': 'Ciudad UAO',
            'sponsor': 'Por definir',
            'pm': 'Raul Collazos',
            'po': 'Por definir',
            'fecha_inicio': '18-Abr-2026',
            'fecha_fin': '15-Sep-2026',
            'fecha_mvp': '30-Jun-2026',
            'fecha_go_live': '31-Ago-2026',
            'presupuesto': '20,000 USD',
            'proposito': 'Desarrollar la plataforma digital Ciudad UAO para la Universidad Autónoma de Occidente.',
            'objetivos': [
                'Digitalizar los procesos de gestión universitaria',
                'Mejorar la experiencia del estudiante y docente',
                'Centralizar información académica y administrativa',
            ],
            'alcance_incluye': ['Backend Spring Boot', 'Frontend Angular', 'QA integrado', 'Despliegue en producción'],
            'alcance_excluye': ['Integración con sistemas de terceros no especificados', 'Soporte post-garantía'],
            'equipo': [
                {'nombre': 'Raul Collazos', 'rol': 'Project Manager'},
                {'nombre': 'Pedro', 'rol': 'Tech Lead / Backend'},
                {'nombre': 'María', 'rol': 'Frontend Angular'},
                {'nombre': 'Juan', 'rol': 'QA Engineer'},
                {'nombre': 'Sofía', 'rol': 'Backend Developer'},
            ],
            'hitos': [
                {'nombre': 'Acta firmada', 'fecha': '02-May-2026'},
                {'nombre': 'Arquitectura aprobada', 'fecha': '16-May-2026'},
                {'nombre': 'MVP Release 1', 'fecha': '30-Jun-2026'},
                {'nombre': 'UAT completado', 'fecha': '22-Ago-2026'},
                {'nombre': 'Go-Live', 'fecha': '31-Ago-2026'},
            ],
            'presupuesto_desglose': [
                {'concepto': 'Desarrollo Backend (Java/Spring Boot)', 'monto': '7,000'},
                {'concepto': 'Desarrollo Frontend (Angular)', 'monto': '5,000'},
                {'concepto': 'QA y Pruebas', 'monto': '3,000'},
                {'concepto': 'Gestión de Proyecto (PM)', 'monto': '2,500'},
                {'concepto': 'Infraestructura y Ambientes', 'monto': '1,500'},
                {'concepto': 'Contingencia (5%)', 'monto': '1,000'},
            ],
            'riesgos_top': [
                {'descripcion': 'Retrasos en definición de requisitos por parte del cliente', 'nivel': 'Alto', 'mitigacion': 'Sesiones semanales de validación con sponsor'},
                {'descripcion': 'Disponibilidad del equipo técnico durante vacaciones', 'nivel': 'Medio', 'mitigacion': 'Plan de contingencia con recursos de backup'},
                {'descripcion': 'Cambios de alcance sin CR formal', 'nivel': 'Alto', 'mitigacion': 'Protocolo de Change Request obligatorio'},
            ],
            'criterios_exito': [
                'Sistema en producción antes del 31-Ago-2026',
                'UAT aprobado por el cliente con < 5 defectos críticos abiertos',
                'Velocidad del equipo ≥ 3 SP/sprint sostenida',
                'Margen VortexBird ≥ 30% al cierre',
                'CSAT del cliente ≥ 8/10',
            ],
            'proximos_pasos': [
                'Firma del Acta de Inicio — 02-May-2026',
                'Sprint Planning Sprint 1 — 18-Abr-2026',
                'Configuración de ambientes de desarrollo — semana 1',
                'Risk Workshop inicial — 25-Abr-2026',
            ],
            'contactos': {
                'Project Manager': 'Raul Collazos — rcollazos@vortexbird.com',
                'Tech Lead': 'Pedro — pedro@vortexbird.com',
                'Sponsor UAO': 'Por definir',
            },
            'restricciones': [
                'Precio fijo $20,000 USD — sin variación',
                'Go-live antes del 31-Ago-2026',
                'Stack tecnológico: Java Spring Boot + Angular',
            ],
            'entregables': [
                'Aplicación web (Backend + Frontend) en producción',
                'Código fuente en repositorio Git',
                'Manual de usuario y técnico',
                'Actas de entrega firmadas',
            ],
        }

    generator = KickoffDocumentGenerator(project_data, args.output)
    print(f"\n📄 Generando documentos de kick-off — VortexBird Brand System")
    print(f"📁 Directorio: {args.output}\n")

    results = generator.generate_all()

    if results['success']:
        print(f"\n✅ Documentos generados:")
        for doc_type, path in results['files'].items():
            print(f"   {doc_type}: {path}")
    else:
        print(f"\n❌ Errores:")
        for e in results['errors']:
            print(f"   - {e}")
        sys.exit(1)


if __name__ == '__main__':
    main()

# VortexBird Brand Guidelines

> Guía de identidad visual para presentaciones y documentos generados por el agente PMO.
> Basada en los principios de los skills: `brand-guidelines`, `pptx`, y `canvas-design` de Anthropic.

---

## Paleta de Colores

| Token | Hex | RGB | Uso |
|---|---|---|---|
| PRIMARY (Teal) | `#10C1BC` | `(16, 193, 188)` | Barras de header, bordes activos, highlights — color dominante (~60%) |
| SECONDARY (Orange) | `#FF9141` | `(255, 145, 65)` | Acentos secundarios, detalles, CTA visual |
| DARK_NAVY | `#1E293A` | `(30, 41, 58)` | Fondos de portada, slides oscuras, títulos principales |
| TEXT_GRAY | `#565656` | `(86, 86, 86)` | Cuerpo de texto en fondos blancos |
| WHITE | `#FFFFFF` | `(255, 255, 255)` | Fondos principales, texto sobre oscuro |
| LIGHT_BG | `#F2F2F2` | `(242, 242, 242)` | Fondos alternativos, cards de sección |
| TEAL_LIGHT | `#E0F7F7` | `(224, 247, 247)` | Fondos de columnas "incluye", áreas de énfasis suave |
| RISK_RED | `#C00000` | `(192, 0, 0)` | Riesgos altos |
| RISK_ORANGE | `#FF8C00` | `(255, 140, 0)` | Riesgos medios |
| RISK_YELLOW | `#FFD700` | `(255, 215, 0)` | Riesgos bajos |

### Constantes Python (python-pptx)
```python
from pptx.dml.color import RGBColor

PRIMARY    = RGBColor(0x10, 0xC1, 0xBC)  # Teal #10C1BC
SECONDARY  = RGBColor(0xFF, 0x91, 0x41)  # Orange #FF9141
DARK_NAVY  = RGBColor(0x1E, 0x29, 0x3A)  # Dark Navy #1E293A
TEXT_GRAY  = RGBColor(0x56, 0x56, 0x56)  # Gray #565656
WHITE      = RGBColor(0xFF, 0xFF, 0xFF)
LIGHT_BG   = RGBColor(0xF2, 0xF2, 0xF2)
TEAL_LIGHT = RGBColor(0xE0, 0xF7, 0xF7)
RISK_RED   = RGBColor(0xC0, 0x00, 0x00)
RISK_ORANGE= RGBColor(0xFF, 0x8C, 0x00)
RISK_YELLOW= RGBColor(0xFF, 0xD7, 0x00)
```

---

## Tipografía

| Uso | Fuente principal | Fallback |
|---|---|---|
| Títulos / Headings | Red Hat Display | Arial |
| Cuerpo / Body | Open Sans | Helvetica |
| Datos / Números | Montserrat | Arial |

**Reglas de tamaño:**
- Título de portada: 52–60pt, Bold
- Título de slide (header bar): 28–32pt, Bold, Blanco
- Subtítulos de sección: 20–24pt, Bold, DARK_NAVY o PRIMARY
- Cuerpo: 14–18pt, Regular, TEXT_GRAY
- Notas / metadata: 11–12pt, Regular

---

## Logo

**Archivo:** `agents/.opencode/assets/logo-vortexbird.png`

**Reglas de posición:**
- **Portada:** Centrado horizontal, parte superior (y=0.3"), ancho 2.5"
- **Slides de contenido:** Esquina superior derecha, x=8.8", y=0.1", ancho 1.0"
- **Slide Q&A / cierre:** Centrado horizontal, medio de la slide, ancho 2.0"

**Fondo del logo:** El logo es sobre fondo blanco → en slides oscuras, agregar fondo blanco semitransparente o usar versión invertida si disponible.

---

## Anatomía de una slide de contenido

```
┌─────────────────────────────────────────────────────────────────────┐
│  ████████████████████ BARRA TEAL (10" × 1.0") ██████ [LOGO 1.0"] │  ← y=0
│  Título de la Slide en Blanco 28pt Bold                             │
├─────────────────────────────────────────────────────────────────────┤
│                                                                     │
│   Contenido de la slide (texto, cards, tabla, timeline)             │
│   Fondo blanco o LIGHT_BG                                           │
│   Texto en TEXT_GRAY, alineado a la izquierda                       │
│                                                                     │
│                                                                     │
│                                                                     │
├─────────────────────────────────────────────────────────────────────┤
│  ██ LÍNEA NARANJA (10" × 0.06") ████████████████████████████████  │  ← y=7.44"
└─────────────────────────────────────────────────────────────────────┘
```

---

## Anatomía de la portada

```
┌─────────────────────────────────────────────────────────────────────┐
│                      FONDO DARK_NAVY completo                       │
│                                                                     │
│            ┌─────────────────────┐                                  │
│            │    [LOGO 2.5"]      │   ← y=0.5", centrado             │
│            └─────────────────────┘                                  │
│                                                                     │
│   ████████████████████ BARRA TEAL (10" × 0.08") ██████████████     │
│                                                                     │
│            NOMBRE DEL PROYECTO                                      │
│            (52pt, Bold, WHITE, centrado)                            │
│                                                                     │
│            Sponsor / PM / Fechas (16pt, WHITE semi-opaco)           │
│                                                                     │
│   ████████████████ BARRA ORANGE (10" × 0.08") ████████████████     │
└─────────────────────────────────────────────────────────────────────┘
```

---

## Principios de Diseño

### Del skill `pptx` (Anthropic)
1. **Color dominante:** Teal #10C1BC ocupa 60-70% del peso visual (header bar en todas las slides)
2. **Elemento consistente:** Logo VortexBird + barra teal aparecen en TODAS las slides
3. **Variedad de layouts:** Portada oscura → contenido claro → cierre oscuro. Cards, columnas y listas alternan
4. **Visual en cada slide:** Ninguna slide es solo texto — siempre hay barra de color, card con fondo, o timeline visual
5. **Alineación izquierda:** Todo el texto de cuerpo va alineado a la izquierda (no centrado)
6. **Contraste:** Título 28-32pt bold vs. cuerpo 14-18pt regular

### Del skill `canvas-design` (Anthropic)
- Antes de generar, definir la **intención visual de cada slide**: ¿qué debe sentir el espectador?
- Cada slide es una decisión deliberada de diseño, no solo un contenedor de texto
- Las jerarquías visuales (tamaño, color, espacio) comunican importancia sin palabras

### Del skill `brand-guidelines` (Anthropic) — adaptado para VortexBird
- Las constantes de color y fuente se definen UNA vez y se aplican sistemáticamente
- El logo y la barra teal son la "firma visual" de VortexBird en cada diapositiva
- Consistencia > creatividad individual: cada slide debe verse parte del mismo set

---

## Diseño por tipo de slide

| Slide | Fondo | Header | Elemento visual especial |
|---|---|---|---|
| Portada | DARK_NAVY | Barra teal delgada | Logo grande centrado, barra naranja inferior |
| Propósito | WHITE | Barra teal + título blanco | Bullets con punto teal |
| Alcance | WHITE | Barra teal | 2 columnas: teal claro (incluye) / gris (excluye) |
| Equipo | LIGHT_BG | Barra teal | Cards de persona con borde teal |
| Cronograma | WHITE | Barra teal | Timeline visual con círculos y línea conectora teal |
| Presupuesto | WHITE | Barra teal | Total grande en PRIMARY; barras proporcionales por categoría |
| Riesgos | WHITE | Barra teal | Cards de riesgo con color por nivel (rojo/naranja/amarillo) |
| Criterios/Pasos | WHITE | Barra teal | Números circulares teal como bullets |
| Contactos | WHITE | Barra teal | Cards de contacto con borde naranja |
| Q&A / Cierre | DARK_NAVY | — | Logo centrado, texto blanco grande, barra naranja inferior |

# Skill: Presentación Kick-off y Acta de Inicio

Generador de documentos oficiales de lanzamiento de proyecto en PowerPoint y Word.

## 📋 Contenidos

- `SKILL.md` — Definición completa del skill alineado con PMBOK 8
- `generator.py` — Implementación en Python para generar documentos
- `example-conde-data.json` — Ejemplo de datos del proyecto Conde
- `README.md` — Este archivo

## 🚀 Uso rápido

### Opción 1: Línea de comandos

```bash
# Generar con datos de ejemplo
python generator.py

# Generar con datos personalizados
python generator.py --project-data example-conde-data.json --output ./output
```

### Opción 2: Desde Python

```python
from generator import KickoffDocumentGenerator

# Cargar datos del proyecto
project_data = {
    'nombre': 'Mi Proyecto',
    'sponsor': 'Juan Pérez',
    'pm': 'Maria García',
    'po': 'Carlos López',
    'fecha_inicio': '01-May-2026',
    'fecha_fin': '30-Sep-2026',
    # ... más campos ...
}

# Generar documentos
generator = KickoffDocumentGenerator(project_data, output_dir='./output')
results = generator.generate_all()

if results['success']:
    print(f"✓ Documentos generados:")
    print(f"  - {results['files']['presentation']}")
    print(f"  - {results['files']['charter']}")
```

## 📦 Requisitos

```bash
pip install python-pptx python-docx
```

## 🎯 Estructura de datos requerida

```json
{
  "nombre": "Nombre del proyecto",
  "sponsor": "Nombre del sponsor",
  "pm": "Nombre del PM",
  "po": "Nombre del PO",
  "fecha_inicio": "01-May-2026",
  "fecha_fin": "30-Sep-2026",
  "fecha_mvp": "15-Jul-2026",
  "fecha_go_live": "30-Sep-2026",
  "presupuesto": "$50,000 USD",
  "proposito": "Descripción del propósito",
  "objetivos": ["Objetivo 1", "Objetivo 2"],
  "alcance_incluye": ["Item 1", "Item 2"],
  "alcance_excluye": ["Item 1", "Item 2"],
  "equipo": [
    {
      "nombre": "Pedro",
      "rol": "Backend Developer"
    }
  ],
  "hitos": [
    {
      "nombre": "Hito 1",
      "fecha": "01-May-2026"
    }
  ],
  "presupuesto_desglose": [
    {
      "concepto": "Desarrollo",
      "monto": "25000"
    }
  ],
  "riesgos_top": [
    {
      "descripcion": "Riesgo 1",
      "nivel": "Alto",
      "mitigacion": "Acción mitiga"
    }
  ],
  "criterios_exito": ["Criterio 1", "Criterio 2"],
  "restricciones": ["Restricción 1"],
  "entregables": ["Entregable 1"],
  "contactos": {
    "PM": "pm@email.com",
    "PO": "po@email.com"
  }
}
```

## 📄 Output generado

### PowerPoint (PPTX)

Nombre: `Kick-off-[NombreProyecto]-[DD-Mes-YYYY].pptx`

**Slides incluidos:**
1. Portada (proyecto, sponsor, PM, fechas)
2. Propósito y Objetivos
3. Alcance (In/Out)
4. Equipo del Proyecto
5. Cronograma General
6. Presupuesto
7. Riesgos Principales
8. Criterios de Éxito
9. Próximos Pasos
10. Contactos Clave

### Word Document (DOCX)

Nombre: `Acta-Inicio-[NombreProyecto]-[DD-Mes-YYYY].docx`

**Secciones incluidas:**
1. Información General (tabla de datos)
2. Descripción del Proyecto (propósito, objetivos, alcance)
3. Cronograma General (fechas e hitos)
4. Estimación de Recursos (presupuesto, equipo)
5. Riesgos y Restricciones
6. Criterios de Éxito
7. Autorización y Aprobaciones (firmas)

## 🔄 Integración con OpenCode Agent

### Activar desde agent

En el archivo `AGENT.md` del agente gestion-proyectos:

```markdown
## Protocolo: Documentos de Lanzamiento

**Cuándo activar:**
- Proyecto aprobado y listo para kick-off
- Se solicita "/kick-off-docs"

**Ejecución:**
1. Leer contexto/proyecto-base.md
2. Leer projects/gestion-proyectos/context/stakeholders.md
3. Compilar datos en estructura JSON
4. Ejecutar: python generator.py --project-data data.json
5. Actualizar projects/gestion-proyectos/memory/historial.md
```

### Comando disponible

```
/kick-off-docs
```

## 🛠️ Personalización

### Cambiar colores de presentación

En `generator.py`, buscar:

```python
fill.fore_color.rgb = RGBColor(31, 78, 121)  # Cambiar estos valores
```

Colores sugeridos:
- Azul corporativo: `RGBColor(31, 78, 121)`
- Verde profesional: `RGBColor(0, 102, 51)`
- Gris neutro: `RGBColor(64, 64, 64)`

### Cambiar estilos de Word

En `generate_charter()`:

```python
table.style = 'Light Grid Accent 1'  # Cambiar estilo
```

Estilos disponibles:
- 'Light Grid Accent 1'
- 'Table Grid'
- 'Light List Accent 1'
- Ver: https://python-docx.readthedocs.io

### Agregar logo

```python
def _add_title_slide(self, prs):
    # Añadir después del background
    left = Inches(0.5)
    top = Inches(0.3)
    height = Inches(0.8)
    pic = slide.shapes.add_picture('logo.png', left, top, height=height)
```

## 📊 Validación de datos

El generador valida automáticamente:

- Campos requeridos no vacíos
- Fechas coherentes (inicio < fin)
- Presupuesto es número positivo
- Listas tienen contenido

**Resultado:**
- ✅ Verde: Todos los datos válidos
- ⚠️ Amarillo: Datos faltantes (genera con [POR DEFINIR])
- ❌ Rojo: Error crítico (no genera)

## 🎓 Ejemplo completo

```bash
# 1. Preparar datos
cp example-conde-data.json mi-proyecto.json

# 2. Editar con los datos reales
nano mi-proyecto.json

# 3. Generar documentos
python generator.py --project-data mi-proyecto.json --output ./documentos

# 4. Verificar output
ls -lh documentos/
# Kick-off-Conde-01-May-2026.pptx
# Acta-Inicio-Conde-01-May-2026.docx
```

## ⚠️ Troubleshooting

### Error: python-pptx no encontrado

```bash
pip install python-pptx
```

### Error: python-docx no encontrado

```bash
pip install python-docx
```

### El documento no abre en Word

- Verificar que todas las strings están en UTF-8
- Verificar que no hay caracteres especiales sin escape
- Regenerar el documento

### Las fechas no coinciden

- Formato debe ser: `DD-Mes-YYYY` (ej: 01-May-2026)
- No usar slashes (/) o números para mes
- Usar nombres de mes en inglés

## 📚 Archivos relacionados

```
agents/.opencode/
├── agents/gestion-proyectos/
│   ├── AGENT.md (contiene protocolos)
│   ├── projects/gestion-proyectos/context/
│   │   ├── proyecto-base.md
│   │   └── stakeholders.md
│   ├── projects/gestion-proyectos/memory/
│   │   ├── historial.md
│   │   └── decisiones.md
│   └── projects/gestion-proyectos/metrics/
│       └── dashboard.md
├── skills/
│   └── presentacion-kickoff/
│       ├── SKILL.md
│       ├── generator.py
│       ├── example-conde-data.json
│       └── README.md
└── commands/
    └── kick-off-docs.md
```

## 📝 Licencia y Notas

- Generador compatible con PowerPoint 2016+ y Word 2016+
- Compatible con Google Slides y Google Docs (conversión automática)
- Documentos generados en formato OOXML estándar
- Caja de seguridad: PMBOK 8 compliance checks integrados

## 🤝 Soporte

Para dudas o mejoras:
1. Revisar `SKILL.md` para detalles de protocolo
2. Revisar `kick-off-docs.md` (comando) para casos de uso
3. Ejecutar validación: `python generator.py --validate`

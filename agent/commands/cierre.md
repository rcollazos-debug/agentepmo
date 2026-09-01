# COMMAND: /cierre

## Propósito

Iniciar y gestionar el proceso de cierre formal del proyecto. Verificar criterios de cierre, generar el acta de entrega, facilitar la sesión de lecciones aprendidas, generar el informe final y asegurar el cierre administrativo completo de VortexBird.

## Cuándo usar

- El proyecto está próximo a la fecha de entrega final
- Todos los entregables principales están completos
- UAT fue aprobado por el cliente
- Se solicita el proceso formal de cierre

---

## Instrucciones de ejecución

### 1. Leer fuentes (en orden)

```
context/proyecto-base.md
context/vortexbird.md
data/acta-inicio.md
memory/historial.md (completo)
memory/decisiones.md
memory/compromisos.md
metrics/dashboard.md
metrics/financiero.md
metrics/calidad.md
data/cambios.md
memory/actasdeentrega.md
```

### 2. Activar SKILL: cierre-proyecto

Ejecutar el protocolo completo del skill de cierre:
1. Verificar checklist de criterios de cierre
2. Generar acta de entrega para firma del cliente
3. Facilitar sesión de lecciones aprendidas
4. Generar informe final del proyecto
5. Ejecutar checklist de cierre administrativo VortexBird
6. Preparar propuesta de continuidad al cliente

### 3. Outputs a generar

**Documentos obligatorios:**
- Acta de entrega y aceptación (para firma)
- Informe final ejecutivo del proyecto
- Lecciones aprendidas del proyecto
- Checklist de cierre administrativo completado
- Propuesta de continuidad / siguiente fase

### 4. Actualizar archivos

- `memory/actasdeentrega.md` — acta de entrega registrada
- `memory/lecciones.md` — lecciones documentadas
- `memory/historial.md` — cierre formal registrado
- `metrics/financiero.md` — margen final calculado
- `metrics/dashboard.md` — estado final: PROYECTO CERRADO

---

## Output esperado

- Estado del checklist de cierre (pendientes identificados)
- Acta de entrega lista para revisión y firma
- Informe final del proyecto
- Top 5 lecciones aprendidas
- Margen final del proyecto vs meta VortexBird
- Propuesta de continuidad para el cliente

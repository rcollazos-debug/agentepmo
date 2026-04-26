---
name: interesados-comunicacion
description: Gestiona el compromiso de los interesados y la comunicación del proyecto conforme al PMBOK 8, garantizando que la información correcta llegue a la persona correcta en el momento correcto.
---

# SKILL: Gestión de Interesados y Comunicación

## Propósito

Gestionar el compromiso de los interesados y la comunicación del proyecto conforme a los Dominios de Desempeño de Interesados del PMBOK 8. Garantizar que la información correcta llegue a la persona correcta en el momento correcto.

---

## Base PMBOK 8

- **Dominios:** Interesados (Stakeholder) + Equipo (Team Performance Domain)
- **Principios aplicados:**
  - Comprometerse efectivamente con los interesados
  - Crear un entorno colaborativo para el equipo
  - Demostrar comportamientos de liderazgo
  - Enfocarse en el valor

---

## Cuándo activar este skill

- Se necesita identificar o actualizar el mapa de interesados
- Hay conflicto entre stakeholders
- Un interesado está inactivo o no colaborando
- Se requiere diseñar un plan de comunicaciones
- Antes de una reunión de comité o presentación ejecutiva
- Se detecta resistencia al cambio en algún stakeholder

---

## Protocolo de ejecución

### Paso 1 — Leer el mapa de interesados

Fuente: `projects/gestion-proyectos/context/stakeholders.md`

Clasificación de interesados por cuadrante:

```
          ALTO PODER
              |
  Gestionar  | Colaborar
  de cerca   | activamente
              |
--------------+-------------- ALTO INTERÉS
              |
  Monitorear | Mantener
  (mínimo    | informado
  esfuerzo)  |
              |
         BAJO PODER
```

| Cuadrante | Estrategia |
|---|---|
| Alto poder, alto interés | Gestionar de cerca. Involucrar en decisiones. |
| Alto poder, bajo interés | Gestionar expectativas. No saturar. |
| Bajo poder, alto interés | Mantener informado. Canal abierto. |
| Bajo poder, bajo interés | Monitorear. Comunicación mínima. |

### Paso 2 — Perfil de cada interesado

Para cada stakeholder clave documentar:

```markdown
## [Nombre] — [Rol]
- Organización: [cliente / interno / proveedor]
- Poder: [Alto / Medio / Bajo]
- Interés: [Alto / Medio / Bajo]
- Posición actual: [Defensor / Neutral / Resistente / Desconocida]
- Posición deseada: [Defensor / Neutral / Aceptante]
- Necesidades clave: [qué le importa]
- Canal preferido: [email / reunión / WhatsApp / reporte]
- Frecuencia de comunicación: [diaria / semanal / quincenal / mensual]
- Sensibilidades: [temas que generan fricción]
- Estrategia de engagement: [descripción]
```

### Paso 3 — Plan de comunicaciones

Estructura del plan:

| Comunicación | Audiencia | Frecuencia | Formato | Canal | Responsable | Propósito |
|---|---|---|---|---|---|---|
| Status semanal | PM + equipo | Semanal | Informe MD | Email | PM | Seguimiento operativo |
| Status ejecutivo | Sponsor | Quincenal | PDF 1 pág | Email | PM | Visibilidad estratégica |
| Comité directivo | Steering | Mensual | Presentación | Reunión | PM | Decisiones y gobernanza |
| Daily standup | Equipo | Diaria | Verbal | Videollamada | Líder técnico | Coordinación diaria |
| Demo de sprint | Cliente + equipo | Por sprint | Demo en vivo | Reunión | PM + dev | Validación de avance |
| Reporte de riesgos | Sponsor | Quincenal | Informe MD | Email | PM | Control de riesgos |

### Paso 4 — Protocolo por tipo de mensaje

**Buenas noticias (hito cumplido, entrega exitosa):**
- Canal: email + mención en próxima reunión
- Tono: celebrar logro, reconocer equipo, proyectar próximo hito
- Timing: inmediato

**Alertas amarillas (riesgo elevado, atraso menor):**
- Canal: email directo al sponsor
- Tono: directo, con causa raíz y plan de respuesta
- Timing: dentro de las 24 horas de detectar
- Contenido: problema + causa + impacto + opciones + recomendación

**Alertas rojas (crisis, riesgo crítico):**
- Canal: llamada primero, seguida de email escrito
- Tono: ejecutivo, sin pánico, orientado a solución
- Timing: inmediato (misma hora de detección)
- Contenido: qué pasó + impacto real + qué se está haciendo + qué necesita el PM

**Solicitud de decisión:**
- Canal: email formal con documento adjunto
- Tono: estructura: contexto → opciones → recomendación → decisión requerida
- Fecha límite de respuesta explícita en el mensaje

**Manejo de cliente ausente:**
- Activar playbook `cliente-ausente`
- Escalar por canal alternativo (otro contacto del cliente)
- Documentar el intento fallido
- Enviar resumen escrito por si no hay respuesta verbal

### Paso 5 — Gestión de conflictos entre interesados

Niveles de escalación:
1. **Mediación directa del PM:** escuchar a ambas partes, encontrar acuerdo
2. **Reunión tripartita:** PM + las dos partes + agenda neutral
3. **Escalación al sponsor:** si el conflicto afecta el proyecto y no se resuelve en 48h
4. **Comité directivo:** si afecta contratos, presupuesto o alcance mayor

Técnicas de resolución:
- Separar la persona del problema
- Centrarse en intereses, no posiciones
- Generar opciones de beneficio mutuo
- Usar criterios objetivos para decidir

### Paso 6 — Actualizar archivos

- `projects/gestion-proyectos/context/stakeholders.md` — actualizar posiciones y estrategias
- `projects/gestion-proyectos/memory/historial.md` — registrar comunicaciones clave
- `projects/gestion-proyectos/memory/decisiones.md` — decisiones de stakeholders registradas
- `projects/gestion-proyectos/memory/compromisos.md` — compromisos asumidos por stakeholders

---

## Señales de riesgo en stakeholders

- Respuestas tardías o ausentes del cliente
- Cambio de interlocutor sin notificación formal
- Resistencia pasiva (aprueban pero no actúan)
- Cambios de posición frecuentes sin justificación
- Comentarios negativos del proyecto en canales no formales
- Ausencias frecuentes a reuniones clave

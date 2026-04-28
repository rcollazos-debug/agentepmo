# COMMAND: /atrasos

## Propósito

Analizar desviaciones de cronograma con precisión ejecutiva. Identificar causas raíz, cuantificar impacto en fecha de entrega y generar opciones de recuperación con recomendación clara.

## Cuándo usar

- SPI cae por debajo de 0.95
- Un hito se incumple
- El equipo reporta atraso
- Antes de comunicar novedades al cliente sobre timeline

---

## Instrucciones de ejecución

### 1. Leer fuentes

```
data/cronograma.md
metrics/cronograma.md
data/dependencias.md
data/recursos.md
memory/historial.md
memory/compromisos.md
```

### 2. Cuantificar el atraso

Calcular:
- SV = EV - PV (días o puntos de historia)
- SPI = EV / PV
- Días de retraso = (1 - SPI) × días restantes planificados
- Nueva fecha proyectada = fecha fin original + días de retraso
- Holgura total restante en ruta crítica

### 3. Análisis de causa raíz (RCA)

Técnica de los 5 por qués:
```
¿Por qué hay atraso?
→ [causa inmediata]
¿Por qué ocurrió eso?
→ [causa de segundo nivel]
¿Por qué ocurrió eso?
→ [causa de tercer nivel]
¿Por qué ocurrió eso?
→ [causa raíz]
```

Categorías de causa raíz comunes:
- **Estimación incorrecta:** subestimación de esfuerzo
- **Dependencia no resuelta:** bloqueo externo o interno
- **Cambio de alcance no controlado:** scope creep
- **Recurso no disponible:** persona ausente, baja, rotación
- **Problema técnico no anticipado:** deuda técnica, integración fallida
- **Ambigüedad de requerimientos:** historias mal definidas, criterios de aceptación ausentes
- **QA tardío o colapsado:** bugs encontrados tarde en el ciclo
- **Proveedor incumplido:** entrega externa retrasada

### 4. Evaluar opciones de recuperación

Para cada opción calcular: días recuperados, costo adicional, riesgo introducido.

**Crashing (compresión por recursos):**
- Agregar personas a tareas de ruta crítica
- Cálculo: horas faltantes / capacidad adicional = días recuperados
- Costo: horas extras × tarifa
- Riesgo: coordinación, calidad, fatiga del equipo

**Fast Tracking (paralelización):**
- Identificar tareas secuenciales que pueden ejecutarse en paralelo
- Cálculo: solape posible en días
- Costo: mayor esfuerzo de integración
- Riesgo: retrabajo si hay dependencias técnicas

**Reducción de alcance:**
- Mover features a una fase posterior o release adicional
- Requiere: aprobación del cliente y sponsor formal (CR)
- Impacto: menor valor entregado en fecha original

**Renegociar fecha:**
- Proponer nueva fecha al cliente con causa clara
- Presentar: qué pasó, por qué, qué se hace diferente, nueva fecha comprometida
- Riesgo: impacto contractual, relación con cliente

**Combinación:**
- Fast tracking + crashing + reducción mínima de alcance
- Opción más frecuente en proyectos reales

### 5. Generar comunicación al cliente (si aplica)

Estructura de mensaje de atraso al cliente:
```
Estimado [nombre]:

Le informamos que el proyecto [nombre] presenta una desviación 
de [X días] sobre el cronograma planificado, con una nueva 
fecha proyectada de entrega el [fecha].

CAUSA PRINCIPAL
[Una oración directa]

ACCIONES EN CURSO
1. [Acción concreta ya tomada]
2. [Acción concreta en proceso]

PLAN DE RECUPERACIÓN
[Resumen del plan acordado]

COMPROMISO
Nos comprometemos a entregar el [entregable] el [nueva fecha].

[Firma PM]
```

### 6. Actualizar archivos

- `data/cronograma.md` — nueva baseline si se aprueba
- `metrics/cronograma.md` — actualizar SPI y proyecciones
- `memory/historial.md` — registrar evento de atraso y decisión
- `memory/compromisos.md` — nueva fecha como compromiso formal

---

## Output esperado

```
ANÁLISIS DE ATRASO — [PROYECTO] — [FECHA]

SITUACIÓN ACTUAL
- SPI: X.XX | SV: X días
- Nueva fecha proyectada: [fecha]
- Atraso vs baseline: X días

CAUSA RAÍZ
[descripción directa]

TAREAS EN RUTA CRÍTICA AFECTADAS
[lista con holgura actual]

OPCIONES DE RECUPERACIÓN
| Opción | Días recuperados | Costo adicional | Riesgo | Viable |
|---|---|---|---|---|

RECOMENDACIÓN
[Opción X — justificación en 2-3 líneas]

ACCIONES INMEDIATAS (próximas 48h)
| Acción | Responsable | Fecha |
|---|---|---|

COMUNICACIÓN REQUERIDA
[Sí / No] | Destinatario: [nombre] | Mensaje: [borrador adjunto]
```


---

## Playbooks asociados

Este comando puede activar los siguientes playbooks según el escenario detectado:
- `atraso-cronograma`
- `recuperacion-proyecto`

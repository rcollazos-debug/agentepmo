# Post-Incident Review (PIR)
**Proyecto:** [NOMBRE_PROYECTO]
**Versión/Release afectado:** [v{X.Y.Z}]
**Fecha del incidente:** [YYYY-MM-DD]
**Fecha de este PIR:** [YYYY-MM-DD]
**Facilitador:** [NOMBRE PM]
**Participantes:** [lista de personas presentes en el PIR]

---

## 1. Resumen Ejecutivo

**¿Qué pasó?** (2-3 líneas, sin tecnicismos, orientado a negocio)
[Describir el incidente en lenguaje comprensible para un ejecutivo]

**Duración del impacto:** [HH:MM — desde {hora inicio} hasta {hora resolución}]

**Severidad:** 🔴 Crítico / 🟠 Alto / 🟡 Medio / 🟢 Bajo

**Estado actual:** ✅ Resuelto / ⚠️ Mitigado con workaround / 🔄 En resolución

---

## 2. Cronología del Incidente

| Hora | Evento | Responsable |
|---|---|---|
| {HH:MM} | Incidente detectado — {cómo y quién lo detectó} | {nombre} |
| {HH:MM} | Equipo notificado | {nombre} |
| {HH:MM} | {acción de diagnóstico} | {nombre} |
| {HH:MM} | {acción de mitigación} | {nombre} |
| {HH:MM} | Servicio restaurado / problema resuelto | {nombre} |
| {HH:MM} | Cliente notificado de resolución | {nombre PM} |

---

## 3. Impacto

### Impacto en Usuarios/Cliente
- **Usuarios afectados:** [número o "todos los usuarios"]
- **Funcionalidades afectadas:** [lista]
- **Tiempo de inactividad:** [HH:MM]
- **Datos perdidos o comprometidos:** [Sí/No — descripción si aplica]

### Impacto en el Proyecto
- **Reputación con el cliente:** [Positivo mantenido / Afectado levemente / Daño significativo]
- **SLA incumplido:** [Sí/No — cuál]
- **Costo estimado del incidente:** [horas extra × tarifa + penalizaciones si aplica]

---

## 4. Causa Raíz — Análisis 5-Whys

**Síntoma visible:** [qué fue lo que falló en superficie]

| Por qué # | Pregunta | Respuesta |
|---|---|---|
| ¿Por qué 1? | ¿Por qué falló {síntoma}? | {respuesta} |
| ¿Por qué 2? | ¿Por qué {respuesta 1}? | {respuesta} |
| ¿Por qué 3? | ¿Por qué {respuesta 2}? | {respuesta} |
| ¿Por qué 4? | ¿Por qué {respuesta 3}? | {respuesta} |
| ¿Por qué 5? | ¿Por qué {respuesta 4}? | {respuesta — causa raíz real} |

**Causa raíz identificada:** [descripción clara de la causa raíz]

**Tipo de causa:**
- [ ] Error humano (proceso / capacitación)
- [ ] Error de código (lógica / bug)
- [ ] Error de infraestructura (configuración / capacidad)
- [ ] Dependencia externa (proveedor / API terceros)
- [ ] Falta de pruebas / cobertura insuficiente
- [ ] Proceso de deploy inadecuado

---

## 5. Lo que Funcionó Bien

*(Lo que ayudó a detectar y resolver el incidente más rápido)*

- [item 1]
- [item 2]
- [item 3]

---

## 6. Lo que Puede Mejorar

*(Sin culpas — enfocado en sistemas y procesos, no en personas)*

- [área de mejora 1]
- [área de mejora 2]
- [área de mejora 3]

---

## 7. Acciones de Remediación

| # | Acción | Tipo | Responsable | Fecha límite | Estado |
|---|---|---|---|---|---|
| 1 | {acción correctiva inmediata} | Correctivo | {nombre} | {fecha} | Pendiente |
| 2 | {mejora de proceso / prueba} | Preventivo | {nombre} | {fecha} | Pendiente |
| 3 | {monitoreo / alerta nueva} | Detective | {nombre} | {fecha} | Pendiente |
| 4 | {documentación / runbook} | Preventivo | {nombre} | {fecha} | Pendiente |

**Seguimiento:** Las acciones serán revisadas en el próximo Sprint Review / reunión de equipo.

---

## 8. Comunicado al Cliente

*(Registrar si se envió comunicado formal y cuándo)*

- **Notificación inicial enviada:** [Sí/No] — Fecha/hora: {timestamp}
- **Notificación de resolución enviada:** [Sí/No] — Fecha/hora: {timestamp}
- **Disculpa formal requerida:** [Sí/No]
- **SLA crédito a aplicar:** [Sí/No — condiciones]

---

## 9. Lección Aprendida Principal

**Una línea que resume lo más importante de este incidente:**
> "{lección aprendida — lo que el equipo nunca debe olvidar de este incidente}"

Registrar también en `memory/lecciones.md` del proyecto.

---

*PIR completado — {fecha} — {nombre PM} | VortexBird*
*"Sin culpas. Con aprendizaje."*

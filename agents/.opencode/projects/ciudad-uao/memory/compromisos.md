# REGISTRO DE COMPROMISOS

> Registro de todos los compromisos asumidos por el equipo, el cliente, el sponsor y proveedores.
> Un compromiso sin seguimiento es un riesgo.
> El agente actualiza este archivo con cada nuevo compromiso o cambio de estado.

---

## Instrucciones de formato

Para agregar un compromiso:

```
| ID | Compromiso | Responsable | Rol | Fecha compromiso | Estado | Última actualización |
```

Estados:
- **Pendiente:** aún no iniciado, dentro de plazo
- **En curso:** trabajo comenzado, dentro de plazo
- **Cumplido:** entregado a tiempo
- **Cumplido tarde:** entregado después de la fecha
- **Vencido:** fecha pasada sin cumplimiento
- **Cancelado:** ya no aplica

---

## Compromisos del Equipo / PM

| ID | Compromiso | Responsable | Fecha | Estado | Notas |
|---|---|---|---|---|---|
| COM-001 | [Descripción del compromiso] | [Nombre] | [fecha] | Pendiente | [Nota] |

---

## Compromisos del Cliente

| ID | Compromiso | Responsable cliente | Fecha | Estado | Notas |
|---|---|---|---|---|---|
| CLI-001 | [Descripción] | [Nombre] | [fecha] | Pendiente | [Nota] |

---

## Compromisos del Sponsor

| ID | Compromiso | Responsable | Fecha | Estado | Notas |
|---|---|---|---|---|---|
| SPO-001 | [Descripción] | [Nombre] | [fecha] | Pendiente | [Nota] |

---

## Compromisos de Proveedores

| ID | Proveedor | Compromiso | Fecha | Estado | Notas |
|---|---|---|---|---|---|
| PRV-001 | [Proveedor] | [Descripción] | [fecha] | Pendiente | [Nota] |

---

## Compromisos del Steering Committee

> Compromisos formales asumidos en sesiones del comité directivo.

| ID | Compromiso | Responsable | Comité fecha | Fecha límite | Estado |
|---|---|---|---|---|---|
| COM-SC-001 | [Descripción] | [Nombre/Rol] | [fecha comité] | [fecha] | Pendiente |

---

## Compromisos Vencidos (Atención inmediata)

| ID | Compromiso | Responsable | Fecha original | Días vencido | Causa | Plan |
|---|---|---|---|---|---|---|
| | | | | | | |

---

## Historial de Compromisos Cumplidos

| ID | Compromiso | Responsable | Fecha plan | Fecha real | Variación |
|---|---|---|---|---|---|
| | | | | | |

---

## Regla de escalación

- Compromiso vencido 1-2 días: recordatorio directo al responsable
- Compromiso vencido 3+ días: escalar al sponsor
- Compromiso del cliente vencido 3+ días: activar playbook `cliente-ausente`
- Compromiso del proveedor vencido 3+ días: activar playbook `proveedor-incumplido`

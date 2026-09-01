# COMMAND: /consistencia

## Propósito

Revisar el proyecto en busca de contradicciones que la sincronización no puede detectar, y proponer correcciones con su evidencia. No modifica nada por su cuenta.

## Cuándo usar

- "revisa la consistencia", "¿hay algo que no cuadre?", "audita el proyecto"
- Antes de un comité de seguimiento
- Cuando otro PM ha escrito en el proyecto desde tu última sesión

## Ejecución

Activar el skill `consistencia-proyecto` y seguir su protocolo completo.

Si el usuario acota la revisión ("mira solo los riesgos", "revisa lo financiero"), ejecutar únicamente las comprobaciones pertinentes y decirlo en el encabezado del informe.

## Reglas

1. Propone, nunca corrige por iniciativa propia.
2. Cada hallazgo con evidencia citada: archivo y valor.
3. Solo se aplica lo que el PM acepte, hallazgo por hallazgo.
4. Cada corrección aplicada se registra en el historial con quién la aprobó.
5. Cero hallazgos es un resultado válido: no inventar ninguno.

# SKILL: NotebookLM Knowledge

## Propósito

Consultar documentación del proyecto en NotebookLM para obtener información detallada cuando el agente requiera contexto adicional. NotebookLM es donde se cargará toda la documentación del proyecto.

---

## Cuándo Activar este Skill

- El usuario solicite información detallada del proyecto
- El agente necesite validar o ampliar información local
- Se requiera consultar documentos subidos a NotebookLM
- El usuario mentione repositorio de NotebookLM

---

## Protocolo de Ejecución

### Paso 1 — Solicitar Nombre del Repositorio

Si no se ha proporcionado el nombre del repositorio, preguntar al usuario:

```
Para consultar la documentación del proyecto en NotebookLM,
necesito saber el nombre exacto del repositorio.

¿Cuál es el nombre del repositorio en NotebookLM donde tienes
cargada la documentación del proyecto?
```

### Paso 2 — Consultar NotebookLM

Una vez conocido el nombre del repositorio, usar el MCP de NotebookLM para:

- **Listar fuentes** del repositorio
- **Consultar notas** o documentación
- **Obtener información específica**

### Paso 3 — Integrar con Respuesta

Combinar la información de NotebookLM con el contexto local para proporcionar una respuesta completa.

---

## Herramientas MCP de NotebookLM

| Herramienta | Propósito |
|---|---|
| `notebooklm_list_sources` | Listar fuentes/documentos del repositorio |
| `notebooklm_list_notebooks` | Listar notebooks disponibles |
| `notebooklm_query` | Consultar información en el repositorio |
| `notebooklm_get_notes` | Obtener notas generadas |
| `notebooklm_search` | Buscar en el contenido |

---

## Flujo de Consulta

```
1. Usuario pregunta sobre [tema del proyecto]
2. Agent verifica si tiene contexto local completo
3. Si necesita más información → activa skill NotebookLM
4. Pregunta nombre del repositorio (si no lo tiene)
5. Consulta en NotebookLM
6. Integra información con contexto local
7. Responde al usuario
```

---

## Integración con opencode

Este skill usa el MCP `notebooklm-mcp-cli` que debe estar configurado en `opencode.json`.

**Configuración en opencode.json:**
```json
{
  "mcpServers": {
    "notebooklm-mcp": {
      "command": "notebooklm-mcp",
      "args": []
    }
  }
}
```

**Para usar en otra máquina:**
1. Instalar: `uv tool install notebooklm-mcp-cli`
2. Autenticar: `nlm login`
3. Configurar en opencode.json

---

## Notas

- NotebookLM es el repositorio central de documentación del proyecto
- Toda la documentación relevante debe cargarse ahí
- El agente consulta NotebookLM cuando necesita validar o ampliar información
- El usuario proporciona el nombre del repositorio
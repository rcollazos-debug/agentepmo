#!/bin/bash

# Cargar credenciales desde .env (evita credenciales en opencode.json)
ENV_FILE="$(dirname "${BASH_SOURCE[0]}")/.env"
if [ -f "$ENV_FILE" ]; then set -a; source "$ENV_FILE"; set +a; fi

# Cargar PATH completo para encontrar node/npm/npx
export PATH="/opt/homebrew/bin:/usr/local/bin:/usr/bin:/bin:$HOME/.nvm/versions/node/$(ls $HOME/.nvm/versions/node 2>/dev/null | tail -1)/bin:$PATH"

NPX=$(command -v npx 2>/dev/null || echo "")
if [ -z "$NPX" ]; then
  echo '{"jsonrpc":"2.0","id":1,"error":{"code":-32000,"message":"npx no encontrado. Instala Node.js desde https://nodejs.org"}}' >&2
  exit 1
fi

# Parchear el bug de schema (z.array sin items) en cualquier máquina
DB_TOOLS=$(find ~/.npm/_npx -name "database-tools.js" -path "*metabase-mcp-server*" 2>/dev/null | head -1)
if [ -n "$DB_TOOLS" ]; then
  sed -i.bak 's/z\.array(z\.any())/z.array(z.unknown())/g' "$DB_TOOLS" 2>/dev/null
fi

exec "$NPX" -y @cognitionai/metabase-mcp-server --all

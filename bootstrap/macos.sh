#!/bin/bash
# ============================================================
#  INSTALADOR DE VORKAN-PM  (macOS)
#  Uso:  bash macos.sh
#
#  ATENCION ADMINISTRADOR: sustituye TOKEN_DE_LECTURA por el token
#  emitido antes de repartir este archivo. Se entrega por canal
#  privado, junto a la carpeta "credenciales".
# ============================================================
set -u

SCOPE="@rcollazos-debug"
REGISTRY="https://npm.pkg.github.com"
TOKEN="TOKEN_DE_LECTURA"
AQUI="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"

echo
echo "  Instalador de Vorkan-PM"
echo "  -----------------------"

if ! command -v node >/dev/null 2>&1; then
  echo "  Falta Node.js. Instalalo desde https://nodejs.org (version LTS) y vuelve a ejecutar este script."
  exit 1
fi

if ! command -v opencode >/dev/null 2>&1; then
  echo "  Instalando opencode..."
  npm install -g opencode-ai || { echo "  No se pudo instalar opencode."; exit 1; }
fi

echo "  Configurando el acceso al repositorio de VortexBird..."
{
  echo "${SCOPE}:registry=${REGISTRY}"
  echo "//npm.pkg.github.com/:_authToken=${TOKEN}"
} > "$HOME/.npmrc"

echo "  Descargando Vorkan-PM..."
if ! npm install -g --force "${SCOPE}/vorkanpm"; then
  echo
  echo "  No se pudo descargar Vorkan-PM. Avisa al administrador:"
  echo "  probablemente el acceso caduco y hay que renovarlo."
  exit 1
fi

vorkanpm setup --credenciales "$AQUI/credenciales"

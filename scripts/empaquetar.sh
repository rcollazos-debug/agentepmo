#!/usr/bin/env bash
# ============================================================
#  Genera la carpeta dist/Vorkan-PM/ lista para entregar al PM.
#
#  Uso:
#    bash scripts/empaquetar.sh --token <token> [--credenciales <ruta>]
#
#  Opciones:
#    --token          Token de lectura de GitHub Packages (obligatorio)
#    --credenciales   Ruta a la carpeta de credenciales del PM
#                     (por defecto: ./credenciales si existe)
#
#  Resultado:
#    dist/Vorkan-PM/
#    ├── macos.sh
#    ├── windows.bat
#    └── credenciales/   (si se proporcionaron)
# ============================================================
set -euo pipefail

AQUI="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
RAIZ="$(cd "$AQUI/.." && pwd)"
DESTINO="$RAIZ/dist/Vorkan-PM"

TOKEN=""
CRED_ORIGEN=""

# --- Leer argumentos ---
while [[ $# -gt 0 ]]; do
  case "$1" in
    --token)         TOKEN="$2";       shift 2 ;;
    --credenciales)  CRED_ORIGEN="$2"; shift 2 ;;
    *) echo "Opcion desconocida: $1"; exit 1 ;;
  esac
done

if [[ -z "$TOKEN" ]]; then
  echo "Error: falta --token <token>"
  echo "Uso: bash scripts/empaquetar.sh --token <token> [--credenciales <ruta>]"
  exit 1
fi

# Auto-detectar carpeta de credenciales si no se paso
if [[ -z "$CRED_ORIGEN" && -d "$RAIZ/credenciales" ]]; then
  CRED_ORIGEN="$RAIZ/credenciales"
fi

# --- Crear la carpeta de distribución ---
rm -rf "$DESTINO"
mkdir -p "$DESTINO"

# --- Sustituir token en los bootstrap ---
sed "s/TOKEN_DE_LECTURA/$TOKEN/g" "$RAIZ/bootstrap/macos.sh"    > "$DESTINO/macos.sh"
sed "s/TOKEN_DE_LECTURA/$TOKEN/g" "$RAIZ/bootstrap/windows.bat" > "$DESTINO/windows.bat"
chmod +x "$DESTINO/macos.sh"

echo "  OK  Bootstrap listos (token sustituido)"

# --- Copiar credenciales si se proporcionaron ---
if [[ -n "$CRED_ORIGEN" ]]; then
  if [[ ! -d "$CRED_ORIGEN" ]]; then
    echo "  !   La carpeta de credenciales no existe: $CRED_ORIGEN"
    echo "      La distribucion queda sin credenciales."
  else
    mkdir -p "$DESTINO/credenciales"
    cp -r "$CRED_ORIGEN/." "$DESTINO/credenciales/"
    echo "  OK  Credenciales copiadas desde: $CRED_ORIGEN"
  fi
else
  echo "  !   Sin carpeta de credenciales. Copialas manualmente a:"
  echo "      $DESTINO/credenciales/"
fi

# --- Resumen ---
echo ""
echo "  Carpeta lista para entregar:"
echo "  $DESTINO"
echo ""
echo "  Contenido:"
find "$DESTINO" -not -path '*/.DS_Store' | sort | sed "s|$DESTINO||" | sed 's|^/||' | awk '{print "    " $0}'
echo ""
echo "  Entregala al PM por canal privado (Drive restringido o USB)."
echo "  Nunca por correo masivo ni repositorios publicos."

@echo off
rem ============================================================
rem   INSTALADOR DE VORKAN-PM  (Windows)
rem   Haz doble clic en este archivo. No necesitas saber nada tecnico.
rem
rem   ATENCION ADMINISTRADOR: antes de repartir este archivo,
rem   sustituye TOKEN_DE_LECTURA por el token que emitiste.
rem   Este archivo se entrega por canal privado, junto a la carpeta
rem   "credenciales" — nunca por correo masivo ni repositorios.
rem ============================================================
setlocal
set "SCOPE=@vortexbird"
set "REGISTRY=https://npm.pkg.github.com"
set "TOKEN=TOKEN_DE_LECTURA"

title Instalador Vorkan-PM
cd /d "%~dp0"

echo.
echo   Instalador de Vorkan-PM
echo   -----------------------
echo   Esto instalara tu asistente de gestion de proyectos.
echo   Tardara unos minutos. No cierres esta ventana.
echo.
pause

rem --- 1. Node.js ---
where node >nul 2>&1
if errorlevel 1 (
  echo   Instalando Node.js...
  winget install -e --id OpenJS.NodeJS.LTS --accept-source-agreements --accept-package-agreements --silent
  echo.
  echo   ============================================================
  echo   Node.js quedo instalado, pero Windows aun no lo reconoce.
  echo.
  echo   QUE HACER:
  echo     1. Cierra esta ventana
  echo     2. REINICIA el computador
  echo     3. Vuelve a hacer doble clic en este archivo
  echo   ============================================================
  echo.
  pause
  exit /b
)

rem --- 2. opencode ---
where opencode >nul 2>&1
if errorlevel 1 (
  echo   Instalando opencode...
  call npm install -g opencode-ai
)

rem --- 3. Acceso al repositorio privado de VortexBird ---
echo   Configurando el acceso...
> "%USERPROFILE%\.npmrc" echo %SCOPE%:registry=%REGISTRY%
>> "%USERPROFILE%\.npmrc" echo //npm.pkg.github.com/:_authToken=%TOKEN%

rem --- 4. El CLI ---
echo   Descargando Vorkan-PM...
call npm install -g %SCOPE%/vorkanpm
if errorlevel 1 (
  echo.
  echo   No se pudo descargar Vorkan-PM. Avisa al administrador:
  echo   probablemente el acceso caduco y hay que renovarlo.
  echo.
  pause
  exit /b 1
)

rem --- 5. Instalacion propiamente dicha ---
call vorkanpm setup --credenciales "%~dp0credenciales"

echo.
pause

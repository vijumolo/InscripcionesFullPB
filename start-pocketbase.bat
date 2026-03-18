@echo off
setlocal

set ROOT=%~dp0
set PB_DIR=%ROOT%pocketbase

if not exist "%PB_DIR%\pocketbase.exe" (
  echo PocketBase is not installed yet.
  echo Run scripts\download-pocketbase.ps1 first.
  exit /b 1
)

cd /d "%PB_DIR%"
.\pocketbase.exe serve --http=127.0.0.1:8090 --dir="%PB_DIR%\pb_data"

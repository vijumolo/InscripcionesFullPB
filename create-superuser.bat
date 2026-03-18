@echo off
setlocal

set EMAIL=%~1
set PASSWORD=%~2

if "%EMAIL%"=="" set /p EMAIL=Superuser email: 
if "%PASSWORD%"=="" set /p PASSWORD=Superuser password: 

if "%EMAIL%"=="" (
  echo Email is required.
  exit /b 1
)

if "%PASSWORD%"=="" (
  echo Password is required.
  exit /b 1
)

set ROOT=%~dp0
set PB_DIR=%ROOT%pocketbase

if not exist "%PB_DIR%\pocketbase.exe" (
  echo PocketBase is not installed yet.
  echo Run scripts\download-pocketbase.ps1 first.
  exit /b 1
)

cd /d "%PB_DIR%"
.\pocketbase.exe superuser upsert "%EMAIL%" "%PASSWORD%"
echo Superuser ready: %EMAIL%

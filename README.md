# Inscripciones App PocketBase

Esta es una segunda version de la app, separada de la original con Supabase.

La app original sigue en:

- `inscripciones-app`

La nueva version basada en PocketBase vive en:

- `inscripciones-app-pocketbase`

## Lo que ya queda listo

- Frontend React migrado para usar PocketBase
- Login admin con `_superusers`
- CRUD de eventos y participantes
- Exportacion a Excel
- Configuracion inicial en `.env`
- Guia de backend en `POCKETBASE_SETUP.md`
- Scripts de Windows para descargar y arrancar PocketBase

## Inicio rapido en Windows

1. Descargar PocketBase:

```powershell
powershell -ExecutionPolicy Bypass -File .\scripts\download-pocketbase.ps1
```

2. Crear superusuario:

```bat
create-superuser.bat
```

3. Aplicar migraciones iniciales:

```bat
apply-migrations.bat
```

4. Iniciar PocketBase:

```bat
start-pocketbase.bat
```

5. Iniciar la app:

```bat
run-dev.bat
```

## URL esperadas

- Frontend Vite: `http://localhost:5173`
- PocketBase API: `http://127.0.0.1:8090`
- PocketBase Dashboard: `http://127.0.0.1:8090/_/`

## Configuracion requerida en PocketBase

Sigue el archivo:

- `POCKETBASE_SETUP.md`

Ese archivo describe:

- colecciones `events` y `participants`
- reglas sugeridas
- indices unicos
- evento inicial recomendado
- migracion automatica incluida en `pocketbase/pb_migrations`

## Nota

Segun la documentacion oficial de PocketBase, al 16 de marzo de 2026 la release estable mas reciente publicada en GitHub es `v0.36.7`, y este proyecto usa esa version por defecto en el script de descarga.

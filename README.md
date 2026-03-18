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
- Flujo de deploy del frontend a GitHub Pages

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
- Panel admin de la app: `/#/admin`

## Configuracion requerida en PocketBase

Sigue el archivo:

- `POCKETBASE_SETUP.md`

Ese archivo describe:

- colecciones `events` y `participants`
- reglas sugeridas
- indices unicos
- evento inicial recomendado
- migracion automatica incluida en `pocketbase/pb_migrations`

## Como funciona el backend en esta version

En esta app, el backend no es un modulo Node separado.

El backend es PocketBase, y las funciones administrativas de negocio viven en dos partes:

- PocketBase como servidor y base de datos
- el panel web de la app en `/#/admin`

Desde ese panel admin puedes:

- definir nombre y descripcion del evento
- definir fecha de cierre de inscripciones
- administrar categorias
- exportar inscritos a Excel
- borrar la base de inscritos para iniciar un nuevo evento
- editar y eliminar participantes

## Deploy recomendado

Esta solucion se despliega en dos piezas:

1. Frontend estatico en GitHub Pages
2. PocketBase en un servidor Windows o Linux con IP o dominio publico

GitHub Pages no puede ejecutar PocketBase porque PocketBase necesita un proceso backend persistente.

### Frontend en GitHub Pages

El repo ya incluye el workflow:

- `.github/workflows/deploy-pages.yml`

Antes de usarlo, en GitHub configura:

- `Settings > Pages`: habilitar GitHub Pages desde GitHub Actions
- `Settings > Secrets and variables > Actions > Variables`: crear `VITE_POCKETBASE_URL`

Ese valor debe apuntar a tu backend PocketBase publicado, por ejemplo:

```text
https://tudominio-pb.com
```

### Backend PocketBase

Publica PocketBase en un VPS o servidor donde puedas ejecutar:

```powershell
.\pocketbase.exe serve --http=0.0.0.0:8090
```

Luego:

1. Crea o actualiza el superusuario
2. Aplica migraciones con `apply-migrations.bat`
3. Configura un proxy reverso con HTTPS si va a produccion

## Recomendacion de seguridad

Ahora mismo la app conserva el comportamiento de la version original:

- las inscripciones publicas pueden editarse

Eso se hizo para mantener compatibilidad funcional. Antes de ponerlo en produccion abierta, conviene endurecer esa parte.

## Nota

Segun la documentacion oficial de PocketBase, al 16 de marzo de 2026 la release estable mas reciente publicada en GitHub es `v0.36.7`, y este proyecto usa esa version por defecto en el script de descarga.

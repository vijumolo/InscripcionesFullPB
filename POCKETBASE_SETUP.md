# PocketBase Setup

## 1. Run PocketBase

1. Download PocketBase for Windows from the official site: [https://pocketbase.io/docs/](https://pocketbase.io/docs/)
2. Extract it into a folder such as `C:\pocketbase`
3. Start it with:

```powershell
.\pocketbase serve
```

4. Open the admin dashboard at `http://127.0.0.1:8090/_/`
5. Create your first superuser account

This app logs the admin panel against PocketBase `_superusers` for parity with the existing Supabase admin flow. According to the official docs, `_superusers` bypass collection rules, so protect those credentials carefully.

## 2. Create collections

### Collection: `events`

Create a regular collection named `events` with these fields:

- `name` as `text`, required
- `description` as `editor` or `text`
- `activeCategories` as `json`
- `registrationCloseDate` as `date`

Recommended rules:

- List rule: empty string
- View rule: empty string
- Create rule: `@request.auth.collectionName = "_superusers"`
- Update rule: `@request.auth.collectionName = "_superusers"`
- Delete rule: `@request.auth.collectionName = "_superusers"`

### Collection: `participants`

Create a regular collection named `participants` with these fields:

- `event` as `relation` to `events`, max select `1`, required
- `documentnumber` as `text`, required
- `licensenumber` as `text`
- `dob` as `date`, required
- `fullname` as `text`, required
- `category` as `text`, required
- `club` as `text`
- `sponsor` as `text`
- `gender` as `select` with options `M` and `F`, required
- `email` as `email`, required
- `mobile` as `text`, required

Recommended indexes:

- unique on `event,documentnumber`
- unique on `event,email`

Recommended rules:

- List rule: empty string
- View rule: empty string
- Create rule: empty string
- Update rule: empty string
- Delete rule: `@request.auth.collectionName = "_superusers"`

`Update rule: true` preserves the current behavior of the Supabase app, where the public registrations view can edit records. If you want tighter security, the safer next step is to add an edit token or make editing admin-only.

## 3. Create the first event

Create one record in `events` with values similar to:

```json
{
  "name": "Gran Carrera Tibirita 2026",
  "description": "Evento deportivo para todas las edades.",
  "activeCategories": ["Infantil (5-10 anos)", "Juvenil (11-17 anos)", "Abierta 5K", "Elite 10K"],
  "registrationCloseDate": "2026-11-10 23:59:59.000Z"
}
```

## 4. Configure the frontend

In the app folder, use:

```env
VITE_POCKETBASE_URL=http://127.0.0.1:8090
```

If PocketBase runs on another server, replace the URL with that host.

## 5. Start the app

```powershell
npm install
npm run dev
```

## Notes

- The original Supabase app remains untouched in `inscripciones-app`.
- The PocketBase version lives in `inscripciones-app-pocketbase`.
- PocketBase docs currently label the project as `0.x`, so review release notes before upgrading production environments.

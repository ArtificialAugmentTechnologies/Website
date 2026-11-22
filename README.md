# A² Technologies website

Marketing site and learner accounts for A² Technologies, built with TanStack Start, React, Tailwind CSS and Neon.

## Run locally

Needs Node.js and npm.

```sh
npm install
npm run dev        # http://localhost:8080
```

`.env` must contain the Neon variables. Get them with the Neon CLI (`neon env pull`) once the folder is linked (`neon link`).

## Commands

| Command | What it does |
| --- | --- |
| `npm run dev` | Start the dev server |
| `npm run build` | Production build (Vercel uses this) |
| `npm run db:migrate` | Apply new SQL files in `neon/migrations` to the Neon database |
| `npm run lint` | Lint the code |

## Backend (Neon)

- **Database:** Neon Postgres, database `artificial_augment_technologies`. Tables: `site_users`, `applications`, `contact_messages`, plus Neon Auth's `neon_auth` schema.
- **Login:** Neon Auth: email/password, Google, password reset by email link.
- **Forms:** admissions and contact forms email the office (FormSubmit) and keep a copy in Neon.

## Environment variables (also set these in Vercel)

| Variable | Used for |
| --- | --- |
| `DATABASE_URL` | Pooled connection for the app |
| `DATABASE_URL_UNPOOLED` | Direct connection for migrations (local only) |
| `NEON_AUTH_BASE_URL` | Neon Auth URL (server) |
| `NEON_AUTH_JWKS_URL` | Verifies login tokens on the server |
| `VITE_NEON_AUTH_URL` | Neon Auth URL for the browser (same value as `NEON_AUTH_BASE_URL`) |

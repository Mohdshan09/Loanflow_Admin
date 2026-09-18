# LoanFlow Admin

LoanFlow Admin is a full-stack administration panel for managing loan products, applicants, and product-eligibility evaluations. It includes role-based admin authentication and an eligibility engine that recalculates applicant eligibility when data changes.

## Tech choices

| Area | Technology | Why |
| --- | --- | --- |
| Frontend | React, TypeScript, Vite | A fast, typed single-page application development experience. |
| UI and state | Tailwind CSS, TanStack Query, Zustand | Utility-first styling, server-state caching, and lightweight client auth state. |
| API | Node.js, Express, TypeScript | A typed REST API with a familiar, minimal HTTP framework. |
| Data | PostgreSQL, Prisma | Relational storage with schema migrations and type-safe database access. |
| Security and validation | JWT, bcryptjs, Zod, Helmet | Token authentication, secure password hashing, input validation, and safer HTTP headers. |
| Testing | Vitest | Fast unit and integration test runner for the backend. |

## Prerequisites

- Node.js 20 or later
- npm
- PostgreSQL 14 or later

Create an empty PostgreSQL database, for example `loanflow_db`, before running migrations.

## Setup

1. Install dependencies for both applications.

   ```bash
   cd frontend
   npm install

   cd ../backend
   npm install
   ```

2. Create `backend/.env` and configure the database and authentication values. Replace the database credentials with your local PostgreSQL credentials.

   ```env
   DATABASE_URL="postgresql://postgres:your-password@localhost:5432/loanflow_db"
   PORT=5000
   JWT_SECRET="replace-with-a-long-random-secret"
   SEED_ADMIN_EMAIL="adminflow1024@gmail.com"
   SEED_ADMIN_PASSWORD="AdminFlow@1024"
   ```

3. Create `frontend/.env` so the web app points to the API.

   ```env
   VITE_API_URL=http://localhost:5000/api
   ```

4. Generate Prisma's client, apply the database migrations, and seed the admin account.

   ```bash
   cd backend
   npx prisma generate
   npx prisma migrate dev
   npx prisma db seed
   ```

## Run locally

Start the backend in one terminal:

```bash
cd backend
npm run dev
```

The API runs at `http://localhost:5000`; its health endpoint is `http://localhost:5000/api/health`.

Start the frontend in a second terminal:

```bash
cd frontend
npm run dev
```

Open the Vite URL printed in the terminal (usually `http://localhost:5173`).

## Production deployment

Configure `DATABASE_URL`, `JWT_SECRET`, `CORS_ORIGIN`, `SEED_ADMIN_EMAIL`, and
`SEED_ADMIN_PASSWORD` as protected environment variables in your hosting provider.
Do not commit them to the repository.

For the backend deployment build command, use:

```bash
npm run build:deploy
```

It compiles the API, applies pending Prisma migrations, then runs the admin seed.
The seed is idempotent: it creates the configured administrator only when that email
does not already exist, so subsequent deployments do not overwrite the account or password.

## Deploy on Vercel

Deploy the frontend and API as **two Vercel projects** from this repository. This
keeps the React static site and the Express serverless API independently deployable.

1. Create a Vercel project for the API and set its **Root Directory** to `backend`.
   The included `backend/vercel.json` exposes the Express application through a
   serverless function and forwards `/api/*` requests to it.
2. Add these API environment variables in Vercel:

   ```env
   DATABASE_URL=<your-hosted-postgresql-connection-string>
   JWT_SECRET=<long-random-secret>
   CORS_ORIGIN=https://<your-frontend-project>.vercel.app
   SEED_ADMIN_EMAIL=<admin-email>
   SEED_ADMIN_PASSWORD=<strong-admin-password>
   ```

   Apply database migrations from a trusted environment with
   `npx prisma migrate deploy`. Do not run `prisma db seed` as part of every
   serverless build; run it once when you want to create the initial admin.
3. Create a second Vercel project for the frontend and set its **Root Directory**
   to `frontend`. The included `frontend/vercel.json` builds Vite and rewrites
   client-side routes to `index.html`.
4. Add the following frontend environment variable, replacing the value with the
   deployed API URL:

   ```env
   VITE_API_URL=https://<your-api-project>.vercel.app/api
   ```

Redeploy the frontend after setting `VITE_API_URL`. Vite embeds this value at build
time, so changing it requires a new frontend deployment.

## Development login

After running the seed command with the example environment values, sign in with:

| Field | Value |
| --- | --- |
| Email | `adminflow1024@gmail.com` |
| Password | `AdminFlow@1024` |

These are local development credentials only. Change `SEED_ADMIN_EMAIL`, `SEED_ADMIN_PASSWORD`, and `JWT_SECRET` for any shared or deployed environment.

## Password resets

Use **Forgot password?** on the sign-in screen. Reset tokens expire after 15 minutes. During local development, the API returns the token to the frontend so no email service is required. In production, the API intentionally does not return a token; connect `POST /api/auth/forgot-password` to an email provider that sends a reset link containing the token.

## Useful commands

| Location | Command | Purpose |
| --- | --- | --- |
| `frontend/` | `npm run build` | Type-check and build the frontend. |
| `frontend/` | `npm run lint` | Run frontend linting. |
| `backend/` | `npm run typecheck` | Check backend TypeScript without emitting files. |
| `backend/` | `npm run test` | Run backend tests. |
| `backend/` | `npm run build` | Compile the backend to `dist/`. |
| `backend/` | `npm run start` | Start the compiled backend. |
| `backend/` | `npm run prisma:studio` | Open Prisma Studio for inspecting local data. |

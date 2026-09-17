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
   PORT=8080
   JWT_SECRET="replace-with-a-long-random-secret"
   SEED_ADMIN_EMAIL="adminflow1024@gmail.com"
   SEED_ADMIN_PASSWORD="AdminFlow@1024"
   ```

3. Create `frontend/.env` so the web app points to the API.

   ```env
   VITE_API_URL=http://localhost:8080/api
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

The API runs at `http://localhost:8080`; its health endpoint is `http://localhost:8080/api/health`.

Start the frontend in a second terminal:

```bash
cd frontend
npm run dev
```

Open the Vite URL printed in the terminal (usually `http://localhost:5173`).

## Development login

After running the seed command with the example environment values, sign in with:

| Field | Value |
| --- | --- |
| Email | `adminflow1024@gmail.com` |
| Password | `AdminFlow@1024` |

These are local development credentials only. Change `SEED_ADMIN_EMAIL`, `SEED_ADMIN_PASSWORD`, and `JWT_SECRET` for any shared or deployed environment.

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

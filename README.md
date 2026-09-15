# LoanFlow Admin

Full-stack loan products administration panel with RBAC and a backend eligibility engine.

## Structure
- `frontend/` — React + TypeScript frontend
- `backend/` — Node.js + TypeScript backend
- `database/` — database migrations, seeds, and schema artifacts

## Tech Stack

### Frontend

- React — UI framework
- TypeScript — Type safety
- Vite — Build tool and development server
- React Router DOM — Client-side routing
- Axios — REST API communication

### Backend

- Node.js — JavaScript runtime
- Express 5.2.1 — REST API framework
- TypeScript 7.0.2 — Type safety
- Zod 4.6.5 — Request and data validation
- JSON Web Token 9.0.3 — Authentication
- bcryptjs 3.0.3 — Password hashing
- Helmet 8.3.0 — HTTP security headers
- CORS 2.8.6 — Cross-origin resource sharing
- dotenv 17.4.2 — Environment configuration

### Database

- PostgreSQL — Relational database
- Prisma 7.10.0 — ORM and database toolkit
- @prisma/client 7.10.0 — Prisma client
- @prisma/adapter-pg 7.10.0 — PostgreSQL adapter
- pg 8.23.0 — PostgreSQL driver

### Testing

- Vitest 5.0.1 — Unit and integration testing
- @vitest/coverage-v8 5.0.1 — Test coverage

### Development Tools

- tsx 4.23.13 — TypeScript execution
- TypeScript type definitions:
  - @types/node 26.5.1
  - @types/express 5.0.6
  - @types/cors 2.8.19
  - @types/jsonwebtoken 9.0.10

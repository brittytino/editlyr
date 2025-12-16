# Editlyr - Modern Academic Publishing Platform (SaaS)

Editlyr is a complete, open-source, multi-tenant SaaS platform for managing academic journals. It includes submission workflows, peer review management, publishing, and subscription monetization via Stripe.

## Tech Stack
- **Monorepo**: TurboRepo
- **Frontend**: Next.js 14 (App Router), Tailwind CSS, Shadcn UI
- **Backend**: NestJS, Prisma ORM, PostgreSQL
- **Worker**: Node.js (Redis-based queue)
- **Infra**: Docker, MinIO (S3), Redis

## Features
- **Multi-Tenancy**: Run thousands of journals on a single instance.
- **SaaS Billing**: Stripe integration for subscriptions (Free vs Pro).
- **Workflows**: Authors submit -> Editors assign -> Reviewers review -> Editors decide -> Publish.
- **Plugins**: Extensible architecture to toggle features per journal.
- **Security**: Audit logs, Role-Based Access Control (RBAC), JWT Auth.

## Getting Started

### Prerequisites
- Docker & Docker Compose
- Node.js 18+
- npm or pnpm

### 1. Environment Setup
Copy `.env.example` to `.env` and fill in the values.
```bash
cp .env.example .env
```
**Critical Variables:**
- `DATABASE_URL`: `postgresql://postgres:postgres@localhost:5432/editlyr?schema=public`
- `JWT_SECRET`: Any random string.
- `STRIPE_SECRET_KEY`: Get from Stripe Dashboard (or use `sk_test_...` for dev).

### 2. Infrastructure
Start the database, redis, and minio containers.
```bash
docker compose up -d
```

### 3. Install Dependencies
```bash
npm install
```

### 4. Database Setup
Push the schema to the database.
```bash
npx turbo db:push
# OR (if turbo fails)
cd apps/api
npx prisma db push
```
*(Optional) Seed data:*
```bash
cd infra/scripts
npx ts-node seed.ts
```

### 5. Run Locally
Start all apps (Web, API, Worker) in development mode.
```bash
npm run dev
```
- **Web**: [http://localhost:3000](http://localhost:3000)
- **API**: [http://localhost:4000](http://localhost:4000)
- **Prisma Studio**: `npx prisma studio` (optional)

## Project Structure
- `apps/web`: Next.js frontend application.
- `apps/api`: NestJS backend API.
- `apps/worker`: Background worker for emails/maintenance.
- `packages/`: Shared UI, config, and types.
- `infra/`: Docker and infrastructure scripts.

## License
MIT

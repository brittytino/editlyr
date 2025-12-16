EDITLYR — END-TO-END RUNBOOK

Local → Production (Vercel) → Flow Verification

Tech you locked in (good choices, by the way):

Next.js 16 (App Router)

NestJS

TypeScript / TSX

Prisma

Neon (Postgres)

Cloudinary (files)

Redis (free tier)

Stripe or Razorpay

npm

Vercel (frontend)

Self-host / free infra first

0. PRE-FLIGHT CHECK (DON’T SKIP)

Before anything runs:

Node.js ≥ 20

npm ≥ 10

Docker installed (for Redis locally)

Git clean

No hardcoded secrets anywhere

If any of this fails, stop. Fix. Continue.

1. ENVIRONMENT VARIABLES (SOURCE OF MOST PAIN)
Root .env.example
# Shared
NODE_ENV=development
APP_URL=http://localhost:3000

# Database (Neon)
DATABASE_URL=postgresql://user:pass@neon-host/db

# Auth
JWT_SECRET=super-secret
NEXTAUTH_SECRET=super-secret
NEXTAUTH_URL=http://localhost:3000

# Cloudinary
CLOUDINARY_CLOUD_NAME=
CLOUDINARY_API_KEY=
CLOUDINARY_API_SECRET=

# Redis
REDIS_URL=redis://localhost:6379

# Email
SMTP_HOST=
SMTP_PORT=
SMTP_USER=
SMTP_PASS=

# Billing (choose one)
STRIPE_SECRET_KEY=
STRIPE_WEBHOOK_SECRET=

RAZORPAY_KEY_ID=
RAZORPAY_KEY_SECRET=


Rule:

Local → .env

Production → Vercel env vars

Never commit .env

2. DATABASE SETUP (NEON + PRISMA)
2.1 Prisma sanity check

From apps/api:

npm install
npx prisma generate
npx prisma migrate dev --name init


Expected:

Tables created

No warnings

Prisma client generated

If this fails, nothing else matters.

2.2 Seed minimal data
npm run seed


Seed should create:

1 platform admin

1 journal

1 editor user

If you don’t have this, testing is miserable.

3. REDIS (LOCAL)
Local Redis via Docker
docker run -d -p 6379:6379 redis


Verify:

redis-cli ping
# PONG


Redis is used for:

Email queue

Rate limiting

Billing jobs

If Redis is down, app should degrade gracefully, not crash.

4. BACKEND (NESTJS) — LOCAL RUN

From apps/api:

npm run start:dev


Expected:

Server on http://localhost:4000

Prisma connected

Redis connected (or warned, not fatal)

Health check
GET /health
→ 200 OK


If you don’t have /health, add it. Seriously.

5. FRONTEND (NEXT 16) — LOCAL RUN

From apps/web:

npm install
npm run dev


Expected:

http://localhost:3000

No hydration errors

Auth pages load

6. TENANT / SUBDOMAIN LOCAL TESTING

Add to /etc/hosts:

127.0.0.1 journal1.editlyr.local
127.0.0.1 journal2.editlyr.local


Set in .env:

APP_URL=http://editlyr.local:3000


Your middleware should:

Read host

Resolve journal

Inject journalId into request context

If this breaks, SaaS breaks. Fix this first.

7. FILE UPLOAD FLOW (CLOUDINARY)
Test upload path

Author uploads manuscript

File stored in Cloudinary

Only signed URLs

No public listing

Verify:

File exists in Cloudinary

Access controlled

Delete on submission delete

If files leak publicly, journals will not trust you.

8. AUTH FLOW (ALL ROLES)
Roles to test

Platform Admin

Journal Admin

Editor

Reviewer

Author

Public Reader

Verify:

Role-based guards work

Editors can’t impersonate admins

Reviewers can’t see other reviews

Authors can’t see reviewer identity (blind review)

If this fails, you’re dead on arrival.

9. FULL USER FLOW VERIFICATION (MANDATORY)
AUTHOR FLOW

Register

Create submission (DRAFT)

Upload file

Submit

Receive email

View status

Upload revision if requested

✔️ Status transitions correct
✔️ No direct DB edits
✔️ UI reflects truth

EDITOR FLOW

View inbox

Assign reviewers

Monitor reviews

Make decision

Trigger email

Publish article

✔️ Timeline visible
✔️ Decisions immutable
✔️ Audit log written

REVIEWER FLOW

Email invite

Accept / decline

Submit review

Exit system

✔️ No dashboard clutter
✔️ One-click access
✔️ Review locked after submit

PUBLIC FLOW

Visit journal

Browse articles

Read metadata

Download PDF

✔️ No auth required
✔️ SEO-friendly
✔️ Fast load

10. BILLING FLOW (TEST MODE)
Stripe / Razorpay test

Create plan

Upgrade journal

Downgrade

Simulate payment failure

Verify:

Features unlock immediately

Features revoke after failure

No data deletion

Domain reverts safely

If money logic is flaky, don’t launch.

11. PLAN ENFORCEMENT MATRIX
Feature	Free	Paid
Subdomain	✔️	✔️
Custom domain	❌	✔️
Branding removal	❌	✔️
Storage limit	Low	High
Plugins	❌	✔️
Priority email	❌	✔️

Enforcement must happen in backend, not UI.

12. PRODUCTION DEPLOYMENT (VERCEL)
Frontend

Connect GitHub repo

Root: apps/web

Set env vars

Build command: npm run build

Backend

Options:

Railway / Fly.io / Render (free first)

Or VPS later

Make sure:

CORS configured

Webhooks reachable

HTTPS enforced

13. POST-DEPLOY CHECKLIST

Signup works

Subdomain resolves

Emails send

Uploads work

Payments work (test mode)

Logs exist

Errors don’t expose secrets

If even one fails, don’t announce anything.

14. ROUTES OVERVIEW (CORE)
Frontend
/
 /pricing
 /auth/login
 /auth/register
 /dashboard
 /dashboard/submissions
 /dashboard/submissions/[id]
 /dashboard/reviews
 /dashboard/billing
 /admin/tenants

Backend
POST   /auth/login
POST   /auth/register
GET    /journals/:id
POST   /submissions
POST   /submissions/:id/submit
POST   /reviews
POST   /decisions
POST   /publish
POST   /billing/upgrade
POST   /billing/webhook


If your route list doesn’t roughly match this, something’s missing.

FINAL REALITY CHECK (IMPORTANT)

If:

Local works

Subdomains work

One journal can publish

Payments toggle features

No manual DB edits needed

Then yes.
You are ready to test with real humans.

Not launch.
Test.
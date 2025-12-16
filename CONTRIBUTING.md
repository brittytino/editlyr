# Contributing to Editlyr

We welcome contributions!

## Tech Stack
- **Monorepo**: TurboRepo
- **Web**: Next.js (App Router), Tailwind, Shadcn UI
- **API**: NestJS, Prisma, PostgreSQL
- **Worker**: Node.js

## Getting Started
1. Fork and Clone.
2. `npm install`
3. `docker-compose up -d`
4. `npx prisma db push`
5. `npm run dev`

## Plugin Development
Plugins are stored in the `Plugin` table.
To create a "core" plugin:
1. Add logic to the registry.
2. Add default config.

## Testing
Run `npm test` across packages.

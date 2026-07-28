# Atlas of the Sacred

**An immersive, evidence-led exploration of sacred architecture and humanity’s search for meaning.**

> We neither dismiss mystery nor manufacture it.

## V1 production foundation

This repository contains the real Next.js application, the typed claim and source registries, the editorial operating system, the Supabase schema, CI workflows, and the stable standalone field edition used as a rollback fallback.

Public experience: https://atlas-of-the-sacred.vercel.app

V1.0 release plan: [`docs/V1_RELEASE_PLAN.md`](docs/V1_RELEASE_PLAN.md)  
Master tracker: https://github.com/mikelninh/atlas-of-the-sacred/issues/8

## Launch routes

- `/` — The Living Centre and Purpose Compass
- `/journeys/common-thread/` — the flagship guided journey
- `/sites/giza/` — the first deep portal
- `/editorial/` — the evidence and editorial operating system

## Architecture

```text
Source → Claim → Review → Publication → Experience → Revision
```

Pages arrange knowledge; they do not own factual prose. Stable claim IDs connect each experience to its sources, evidence status, review date, interpretation and explicit limits.

```text
app/                    Next.js routes and composition
components/             Reusable visitor and editorial interfaces
content/                Typed claims, sources, sites and journeys
lib/repository/         Storage-independent repository contract
supabase/schemas/       Production database design and RLS
scripts/                Validation, reports and source-health checks
docs/                   Editorial, deployment and release standards
site/                   Stable standalone fallback edition
.github/workflows/      Continuous quality and source monitoring
```

## Run locally

```bash
npm install
npm run validate:content
npm run report:editorial
npm run dev
```

## Quality gate

```bash
npm run quality
npm run build
```

The source-health check is intentionally non-destructive: a blocked URL creates an editorial task; it does not automatically invalidate a historical claim.

## Deployment

Read [`docs/DEPLOYMENT.md`](docs/DEPLOYMENT.md). Pull requests should receive Vercel previews; reviewed merges to `main` become production deployments.

## Editorial standards

- [`docs/EDITORIAL_STANDARD.md`](docs/EDITORIAL_STANDARD.md)
- [`docs/EDITORIAL_WORKFLOW.md`](docs/EDITORIAL_WORKFLOW.md)
- [`docs/ARCHITECTURE.md`](docs/ARCHITECTURE.md)
- [`docs/IMAGE_CREDITS.md`](docs/IMAGE_CREDITS.md)

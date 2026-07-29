# Atlas of the Sacred

**An immersive, evidence-led exploration of sacred architecture and humanity’s search for meaning.**

> We neither dismiss mystery nor manufacture it.

## Canonical production

This repository is the single source of truth for the Atlas Next.js application, typed claim and source registries, editorial operating system, review circle, discovery feed, Supabase schema, CI workflows and rollback edition.

- Unified V1 RC2: https://atlas-of-the-sacred-v1.vercel.app
- Production branch: `main`
- Canonical origin: configured through `NEXT_PUBLIC_SITE_URL`
- Release record: [`docs/releases/V1_RC2.md`](docs/releases/V1_RC2.md)
- Production runbook: [`docs/PRODUCTION_RUNBOOK.md`](docs/PRODUCTION_RUNBOOK.md)
- V1.0 release plan: [`docs/V1_RELEASE_PLAN.md`](docs/V1_RELEASE_PLAN.md)
- Master tracker: https://github.com/mikelninh/atlas-of-the-sacred/issues/8

The older `https://atlas-of-the-sacred.vercel.app` address remains the legacy edition until its alias is deliberately moved in Vercel. Feature-specific Vercel URLs are preview and rollback artifacts. A release becomes production only after the exact `main` build passes route, asset and canonical-metadata smoke tests.

## Institutional routes

- `/` — The Living Centre and Purpose Compass
- `/journeys/common-thread/` — the flagship guided journey
- `/sites/giza/` — the first deep portal
- `/sites/gobekli-tepe/` — the second deep portal and Circle of Presences prototype
- `/dispatches/` — claim-aware research updates
- `/review/` — the Founding Review Circle
- `/editorial/` — the evidence and editorial operating system

## Architecture

```text
Source → Claim → Review → Publication → Experience → Revision
```

Pages arrange knowledge; they do not own factual prose. Stable claim IDs connect each experience to its sources, evidence status, review date, interpretation and explicit limits.

```text
app/                    Next.js routes and composition
components/             Reusable visitor and editorial interfaces
content/                Typed claims, sources, sites, journeys and dispatches
lib/repository/         Storage-independent repository contract
supabase/schemas/       Production database design and RLS
scripts/                Validation, reports, smoke tests and source health
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

## Quality and release gates

```bash
npm run quality
npm run build
npm run smoke:static
ATLAS_BASE_URL=https://your-preview.example npm run smoke:routes
```

The smoke tests require every institutional route to render its identifying content and declare itself as canonical. The source-health check is intentionally non-destructive: a blocked URL creates an editorial task; it does not automatically invalidate a historical claim.

## Deployment

Read [`docs/DEPLOYMENT.md`](docs/DEPLOYMENT.md). Pull requests should receive isolated previews; reviewed merges to `main` become production candidates. Promotion happens only after route, asset, metadata and rollback verification.

## Editorial standards

- [`docs/EDITORIAL_STANDARD.md`](docs/EDITORIAL_STANDARD.md)
- [`docs/EDITORIAL_WORKFLOW.md`](docs/EDITORIAL_WORKFLOW.md)
- [`docs/ARCHITECTURE.md`](docs/ARCHITECTURE.md)
- [`docs/IMAGE_CREDITS.md`](docs/IMAGE_CREDITS.md)
- [`docs/FOUNDING_REVIEW_CIRCLE.md`](docs/FOUNDING_REVIEW_CIRCLE.md)

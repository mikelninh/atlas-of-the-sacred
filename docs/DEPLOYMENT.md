# Deployment and rollback

## Production model

- GitHub repository: `mikelninh/atlas-of-the-sacred`
- Production branch: `main`
- Preview branches: pull-request branches
- Framework: Next.js App Router with static export
- Production host: one canonical Vercel project
- Canonical origin: `NEXT_PUBLIC_SITE_URL`

Feature-specific Vercel projects are temporary preview or rollback artifacts. They are not separate production editions.

## Required checks

Before promotion or merge:

```bash
npm install --no-audit --no-fund
npm run quality
npm run build
npm run smoke:static
```

The seven institutional routes must resolve:

- `/`
- `/journeys/common-thread/`
- `/sites/giza/`
- `/sites/gobekli-tepe/`
- `/dispatches/`
- `/review/`
- `/editorial/`

## Preview deployment

Vercel should be connected to the GitHub repository with the repository root as the project root. Every pull request must receive an isolated preview deployment. Do not point the production domain at a preview until the seven routes and content validation pass.

After deployment, run:

```bash
ATLAS_BASE_URL=https://preview.example npm run smoke:routes
```

## Production promotion

Merge the reviewed pull request to `main`. Verify the Vercel deployment is `READY`, run the deployed route smoke test, check canonical metadata, then promote the exact verified deployment to the production alias.

See [`PRODUCTION_RUNBOOK.md`](PRODUCTION_RUNBOOK.md) for the full cutover procedure.

## Rollback

The stable standalone edition remains in `site/` and previous Vercel deployments remain available for rollback.

Preferred rollback order:

1. Repoint the production alias to the last known-good deployment.
2. Verify all seven routes against the restored origin.
3. Open a corrective issue and preserve the failed deployment logs.
4. Do not force-push or erase the failed release commit.

## Environment

The current application has no required runtime secret for its static content. Set `NEXT_PUBLIC_SITE_URL` to the canonical production origin so sitemap, robots and metadata remain consistent. Supabase credentials stay optional until the database-backed editorial workflow is activated. Never commit service-role keys.

# Deployment and rollback

## Production model

- GitHub repository: `mikelninh/atlas-of-the-sacred`
- Production branch: `main`
- Preview branches: pull-request branches
- Framework: Next.js App Router with static export
- Production host: Vercel

## Required checks

Before promotion or merge:

```bash
npm install --no-audit --no-fund
npm run quality
npm run build
```

The four launch routes must resolve:

- `/`
- `/journeys/common-thread/`
- `/sites/giza/`
- `/editorial/`

## Preview deployment

Vercel should be connected to the GitHub repository with the repository root as the project root. Every pull request must receive an isolated preview deployment. Do not point the production domain at a preview until the four launch routes and content validation pass.

## Production promotion

Merge the reviewed pull request to `main`. Verify the Vercel deployment is `READY`, then smoke-test the four launch routes at the production alias.

## Rollback

The stable standalone edition remains in `site/` and the previous Vercel production deployment remains available for instant rollback.

Preferred rollback order:

1. Use Vercel rollback to repoint the production alias to the last known-good deployment.
2. Verify `/` returns the prior experience.
3. Open a corrective issue and preserve the failed deployment logs.
4. Do not force-push or erase the failed release commit.

## Environment

The current application has no required runtime secret for its static content. Supabase credentials must remain optional until the database-backed editorial workflow is activated. Never commit service-role keys.

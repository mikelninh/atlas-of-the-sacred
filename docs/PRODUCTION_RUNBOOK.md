# Canonical production runbook

## One source of truth

- Repository: `mikelninh/atlas-of-the-sacred`
- Production branch: `main`
- Framework: Next.js App Router with static export
- Host: one canonical Vercel project
- Required environment variable: `NEXT_PUBLIC_SITE_URL`

Temporary feature projects are preview and rollback artifacts. They are never presented as the current Atlas after the canonical project is green.

## Required routes

The release is incomplete unless all seven routes return HTTP 200 with their identifying content:

1. `/`
2. `/journeys/common-thread/`
3. `/sites/giza/`
4. `/sites/gobekli-tepe/`
5. `/dispatches/`
6. `/review/`
7. `/editorial/`

The static build enforces this through `npm run smoke:static`. A deployed build is verified with:

```bash
ATLAS_BASE_URL=https://example.vercel.app npm run smoke:routes
```

## Preview gate

For every pull request:

1. Install with `npm install --no-audit --no-fund`.
2. Run `npm run quality`.
3. Run `npm run build`.
4. Run `npm run smoke:static`.
5. Publish an isolated preview.
6. Verify the changed experience on desktop, mobile, keyboard and reduced-motion paths where relevant.

## Production promotion

1. Merge only a reviewed, green pull request.
2. Wait for the `main` deployment to reach `READY`.
3. Run `npm run smoke:routes` against the production candidate.
4. Confirm `robots.txt`, `sitemap.xml` and canonical metadata point to the intended public domain.
5. Promote or alias the verified deployment.
6. Tag the release.
7. Record the deployment ID and rollback target in the release issue.

## Rollback

Preferred order:

1. Repoint the canonical alias to the previous known-good Vercel deployment.
2. Run the seven-route smoke test.
3. Open a corrective issue containing the failed deployment ID and logs.
4. Preserve the failed commit and deployment for diagnosis.
5. Never force-push `main` or erase the release history.

The standalone edition under `site/` remains a final fallback, not the normal production path.

## Domain cutover checklist

- [ ] Canonical project builds directly from GitHub `main`.
- [ ] `NEXT_PUBLIC_SITE_URL` equals the production origin.
- [ ] All seven routes pass deployed smoke tests.
- [ ] Current production deployment is recorded.
- [ ] Previous deployment is recorded as rollback.
- [ ] Preferred domain is attached only after verification.
- [ ] Old preview projects are labelled historical.

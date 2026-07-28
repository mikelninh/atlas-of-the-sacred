# Production Architecture

## Core rule

Pages are compositions. Claims are knowledge.

A site page must not become the canonical home of a factual statement. It asks the content layer for stable claim IDs and renders those claims through reusable components.

```text
Source → Claim → Site module / Journey step → UI component
```

## Boundaries

### `content/sources.ts`
Canonical source records. Live resources carry an access date; published work carries a publication year when known.

### `content/claims.ts`
Canonical factual statements and their limits. Updating one claim updates every site module and journey that reuses it.

### `content/sites/*`
Site configuration: visual identity, philosophical framing and ordered module references.

### `content/journeys/*`
Cross-site narrative paths assembled from claim IDs. Reflections are clearly separated from factual statements.

### `components/claim/*`
Evidence badges, source disclosures and reusable claim presentation.

### `components/giza/*`
The first domain-specific learning instruments. Their visual shells are reusable; their content comes from claims.

## Giza module contract

Each module must:

1. identify the claim IDs it presents;
2. show evidence status where interpretation could be mistaken for certainty;
3. make limitations visible at the moment of wonder;
4. label diagrams and cinematic visuals honestly;
5. avoid presenting a reconstruction as archaeological evidence.

## Adding the next site

1. Add authoritative sources to `content/sources.ts`.
2. Draft and review claims in `content/claims.ts`.
3. Run `npm run validate:content`.
4. Add the site configuration under `content/sites/`.
5. Compose existing learning instruments before inventing new ones.
6. Add a route adapter only when the site needs genuinely different interaction.

## Near-term production work

- Replace file registries with a database-backed editorial API while preserving the TypeScript contracts.
- Add schema validation with Zod at the ingestion boundary.
- Add unit tests for content helpers and interaction tests for each learning instrument.
- Add visual regression, accessibility and performance checks in CI.
- Store image provenance and visual classification as structured records.
- Add correction history and reviewer identity to claims.

# Editorial workflow

## Publication states

1. `draft` — a researcher may change the claim freely.
2. `in-review` — the statement, sources and limits are frozen for review.
3. `approved` — the review gate passed but the claim is not yet public.
4. `published` — public experiences may use the claim.
5. `needs-revision` — material evidence or a correction requires action.
6. `archived` — preserved for history but excluded from current experiences.

## The review gate

A claim may be published only when it has:

- a stable identifier;
- at least one registered source;
- an evidence status;
- a current review date;
- a separate interpretation;
- a meaningful “what this does not prove” statement;
- no unresolved `changes-requested` review.

## Corrections

Material changes increment `version` and preserve the previous record in `claim_revisions`.
A visible correction note is required when a published statement, evidence status or conclusion changes materially.
Typographic changes do not require a public correction note, but remain visible in Git history.

## Roles

Atlas roles live in Supabase `app_metadata`, not user-editable metadata:

- `reviewer` — reviews claims and requests changes;
- `editor` — authors and publishes claims;
- `admin` — manages roles and destructive actions.

## Source health

The weekly checker records redirects, broken links and access blocks. A broken URL does not automatically make a historical claim false. It creates an editorial task to locate an archived or replacement source.

# Supabase setup

The repository contains a declarative schema in `supabase/schemas/01_editorial_operating_system.sql`.

## Why declarative schema first

The Supabase CLI is not available in the build environment that created this sprint, so no migration filename was invented. Once the CLI is installed and a project is linked:

```bash
supabase init
supabase start
supabase db diff -f editorial_operating_system
supabase db reset
supabase test db
```

Review the generated migration, run database advisors, and only then push it to the linked project.

## Security model

- Row Level Security is enabled on every public table.
- Anonymous visitors can read only published claims, sites and journeys.
- Editorial authorization reads `app_metadata.atlas_role`.
- `service_role` must never be shipped to the browser.
- Material claim edits are captured in an immutable revision table.
- Public views use `security_invoker`.

New Supabase projects may not expose public tables to the Data API automatically. The schema grants table privileges, but project Data API exposure must also be checked in the dashboard.

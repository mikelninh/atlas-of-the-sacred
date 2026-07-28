-- Atlas of the Sacred editorial operating system
-- Declarative schema source. Generate a timestamped migration with:
--   supabase db diff -f editorial_operating_system

create schema if not exists private;
revoke all on schema private from public, anon, authenticated;
grant usage on schema private to authenticated;

create type public.evidence_status as enum (
  'established',
  'probable',
  'contested',
  'open-mystery'
);

create type public.editorial_state as enum (
  'draft',
  'in-review',
  'approved',
  'published',
  'needs-revision',
  'archived'
);

create type public.review_decision as enum (
  'approved',
  'approved-with-notes',
  'changes-requested',
  'rejected'
);

create type public.source_kind as enum (
  'official-record',
  'primary-research',
  'scholarly-archive',
  'critical-edition'
);

create type public.source_health_status as enum (
  'healthy',
  'redirected',
  'blocked',
  'broken',
  'unchecked'
);

create table public.sites (
  id text primary key,
  slug text not null unique,
  name text not null,
  location_label text not null,
  poetic_thesis text not null,
  interpretive_question text not null,
  hero_image text not null,
  hero_alt text not null,
  editorial_state public.editorial_state not null default 'draft',
  published_at timestamptz,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table public.sources (
  id text primary key,
  title text not null,
  publisher text not null,
  published_year integer check (published_year is null or published_year between 1400 and 2200),
  accessed_on date not null,
  url text not null,
  kind public.source_kind not null,
  note text not null,
  is_active boolean not null default true,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table public.claims (
  id text primary key,
  site_id text not null references public.sites(id) on update cascade on delete restrict,
  title text not null,
  statement text not null,
  status public.evidence_status not null,
  reviewed_on date not null,
  editorial_state public.editorial_state not null default 'draft',
  version integer not null default 1 check (version > 0),
  owner text not null,
  interpretation text not null,
  does_not_prove text not null,
  tags text[] not null default '{}',
  diagram_label text,
  published_at timestamptz,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  constraint claims_statement_not_blank check (length(trim(statement)) > 20),
  constraint claims_limits_not_blank check (length(trim(does_not_prove)) > 20)
);

create table public.claim_sources (
  claim_id text not null references public.claims(id) on update cascade on delete cascade,
  source_id text not null references public.sources(id) on update cascade on delete restrict,
  source_role text not null default 'supports' check (source_role in ('supports', 'context', 'challenges', 'method')),
  locator text,
  note text,
  primary key (claim_id, source_id)
);

create table public.site_modules (
  id text primary key,
  site_id text not null references public.sites(id) on update cascade on delete cascade,
  title text not null,
  eyebrow text not null,
  position integer not null check (position >= 0),
  unique (site_id, position)
);

create table public.module_claims (
  module_id text not null references public.site_modules(id) on update cascade on delete cascade,
  claim_id text not null references public.claims(id) on update cascade on delete restrict,
  position integer not null check (position >= 0),
  primary key (module_id, claim_id),
  unique (module_id, position)
);

create table public.journeys (
  id text primary key,
  slug text not null unique,
  title text not null,
  description text not null,
  editorial_state public.editorial_state not null default 'draft',
  published_at timestamptz,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table public.journey_steps (
  id text primary key,
  journey_id text not null references public.journeys(id) on update cascade on delete cascade,
  title text not null,
  site_id text not null references public.sites(id) on update cascade on delete restrict,
  reflection text not null,
  position integer not null check (position >= 0),
  unique (journey_id, position)
);

create table public.journey_step_claims (
  journey_step_id text not null references public.journey_steps(id) on update cascade on delete cascade,
  claim_id text not null references public.claims(id) on update cascade on delete restrict,
  position integer not null check (position >= 0),
  primary key (journey_step_id, claim_id),
  unique (journey_step_id, position)
);

create table public.claim_reviews (
  id uuid primary key default gen_random_uuid(),
  claim_id text not null references public.claims(id) on update cascade on delete cascade,
  reviewer_id uuid references auth.users(id) on delete set null,
  reviewer_label text not null,
  reviewed_on date not null default current_date,
  decision public.review_decision not null,
  evidence_assessment public.evidence_status not null,
  notes text not null,
  requested_changes text[] not null default '{}',
  created_at timestamptz not null default now()
);

create table public.claim_revisions (
  id bigint generated always as identity primary key,
  claim_id text not null references public.claims(id) on update cascade on delete cascade,
  version integer not null,
  changed_on timestamptz not null default now(),
  changed_by uuid references auth.users(id) on delete set null,
  change_summary text not null,
  previous_record jsonb not null,
  is_public boolean not null default false,
  unique (claim_id, version)
);

create table public.source_health_checks (
  id bigint generated always as identity primary key,
  source_id text not null references public.sources(id) on update cascade on delete cascade,
  checked_on timestamptz not null default now(),
  status public.source_health_status not null,
  http_status integer,
  resolved_url text,
  note text
);

create index claims_site_id_idx on public.claims(site_id);
create index claims_editorial_state_idx on public.claims(editorial_state);
create index claims_reviewed_on_idx on public.claims(reviewed_on);
create index claim_reviews_claim_id_idx on public.claim_reviews(claim_id, reviewed_on desc);
create index claim_revisions_claim_id_idx on public.claim_revisions(claim_id, version desc);
create index source_health_checks_source_id_idx on public.source_health_checks(source_id, checked_on desc);

create or replace function private.atlas_editorial_role()
returns text
language sql
stable
security invoker
set search_path = pg_catalog
as $$
  select coalesce((select auth.jwt() -> 'app_metadata' ->> 'atlas_role'), '');
$$;

create or replace function private.can_review()
returns boolean
language sql
stable
security invoker
set search_path = pg_catalog, private
as $$
  select private.atlas_editorial_role() in ('reviewer', 'editor', 'admin');
$$;

create or replace function private.can_author()
returns boolean
language sql
stable
security invoker
set search_path = pg_catalog, private
as $$
  select private.atlas_editorial_role() in ('editor', 'admin');
$$;

create or replace function private.is_atlas_admin()
returns boolean
language sql
stable
security invoker
set search_path = pg_catalog, private
as $$
  select private.atlas_editorial_role() = 'admin';
$$;

create or replace function private.set_updated_at()
returns trigger
language plpgsql
security invoker
set search_path = pg_catalog
as $$
begin
  new.updated_at = now();
  return new;
end;
$$;

create or replace function private.capture_claim_revision()
returns trigger
language plpgsql
security definer
set search_path = pg_catalog, public, private
as $$
begin
  if row(
    old.title, old.statement, old.status, old.interpretation,
    old.does_not_prove, old.tags, old.editorial_state
  ) is distinct from row(
    new.title, new.statement, new.status, new.interpretation,
    new.does_not_prove, new.tags, new.editorial_state
  ) then
    new.version = old.version + 1;
    insert into public.claim_revisions (
      claim_id,
      version,
      changed_by,
      change_summary,
      previous_record
    ) values (
      old.id,
      old.version,
      auth.uid(),
      coalesce(current_setting('request.headers', true)::jsonb ->> 'x-atlas-change-summary', 'Material claim update'),
      to_jsonb(old)
    );
  end if;
  return new;
end;
$$;

revoke all on function private.atlas_editorial_role() from public, anon, authenticated;
revoke all on function private.can_review() from public, anon, authenticated;
revoke all on function private.can_author() from public, anon, authenticated;
revoke all on function private.is_atlas_admin() from public, anon, authenticated;
revoke all on function private.capture_claim_revision() from public, anon, authenticated;
revoke all on function private.set_updated_at() from public, anon, authenticated;

grant execute on function private.atlas_editorial_role() to authenticated;
grant execute on function private.can_review() to authenticated;
grant execute on function private.can_author() to authenticated;
grant execute on function private.is_atlas_admin() to authenticated;

create trigger sites_set_updated_at before update on public.sites
for each row execute function private.set_updated_at();
create trigger sources_set_updated_at before update on public.sources
for each row execute function private.set_updated_at();
create trigger claims_set_updated_at before update on public.claims
for each row execute function private.set_updated_at();
create trigger journeys_set_updated_at before update on public.journeys
for each row execute function private.set_updated_at();
create trigger claims_capture_revision before update on public.claims
for each row execute function private.capture_claim_revision();

alter table public.sites enable row level security;
alter table public.sources enable row level security;
alter table public.claims enable row level security;
alter table public.claim_sources enable row level security;
alter table public.site_modules enable row level security;
alter table public.module_claims enable row level security;
alter table public.journeys enable row level security;
alter table public.journey_steps enable row level security;
alter table public.journey_step_claims enable row level security;
alter table public.claim_reviews enable row level security;
alter table public.claim_revisions enable row level security;
alter table public.source_health_checks enable row level security;

grant usage on schema public to anon, authenticated;
grant select on public.sites, public.sources, public.claims, public.claim_sources,
  public.site_modules, public.module_claims, public.journeys, public.journey_steps,
  public.journey_step_claims, public.claim_reviews, public.claim_revisions,
  public.source_health_checks to anon, authenticated;
grant insert, update, delete on public.sites, public.sources, public.claims,
  public.claim_sources, public.site_modules, public.module_claims, public.journeys,
  public.journey_steps, public.journey_step_claims, public.claim_reviews,
  public.source_health_checks to authenticated;

create policy "Public reads published sites"
on public.sites for select to anon, authenticated
using (editorial_state = 'published');
create policy "Editors read all sites"
on public.sites for select to authenticated
using ((select private.can_review()));
create policy "Editors write sites"
on public.sites for all to authenticated
using ((select private.can_author()))
with check ((select private.can_author()));

create policy "Public reads active sources"
on public.sources for select to anon, authenticated
using (is_active);
create policy "Editors read all sources"
on public.sources for select to authenticated
using ((select private.can_review()));
create policy "Editors write sources"
on public.sources for all to authenticated
using ((select private.can_author()))
with check ((select private.can_author()));

create policy "Public reads published claims"
on public.claims for select to anon, authenticated
using (editorial_state = 'published');
create policy "Editors read all claims"
on public.claims for select to authenticated
using ((select private.can_review()));
create policy "Editors insert claims"
on public.claims for insert to authenticated
with check ((select private.can_author()));
create policy "Editors update claims"
on public.claims for update to authenticated
using ((select private.can_author()))
with check ((select private.can_author()));
create policy "Admins delete claims"
on public.claims for delete to authenticated
using ((select private.is_atlas_admin()));

create policy "Public reads links for published claims"
on public.claim_sources for select to anon, authenticated
using (exists (
  select 1 from public.claims c
  where c.id = claim_id and c.editorial_state = 'published'
));
create policy "Editors write claim source links"
on public.claim_sources for all to authenticated
using ((select private.can_author()))
with check ((select private.can_author()));

create policy "Public reads published site modules"
on public.site_modules for select to anon, authenticated
using (exists (
  select 1 from public.sites s
  where s.id = site_id and s.editorial_state = 'published'
));
create policy "Editors write site modules"
on public.site_modules for all to authenticated
using ((select private.can_author()))
with check ((select private.can_author()));

create policy "Public reads published module claims"
on public.module_claims for select to anon, authenticated
using (exists (
  select 1
  from public.site_modules m
  join public.sites s on s.id = m.site_id
  where m.id = module_id and s.editorial_state = 'published'
));
create policy "Editors write module claims"
on public.module_claims for all to authenticated
using ((select private.can_author()))
with check ((select private.can_author()));

create policy "Public reads published journeys"
on public.journeys for select to anon, authenticated
using (editorial_state = 'published');
create policy "Editors write journeys"
on public.journeys for all to authenticated
using ((select private.can_author()))
with check ((select private.can_author()));

create policy "Public reads steps in published journeys"
on public.journey_steps for select to anon, authenticated
using (exists (
  select 1 from public.journeys j
  where j.id = journey_id and j.editorial_state = 'published'
));
create policy "Editors write journey steps"
on public.journey_steps for all to authenticated
using ((select private.can_author()))
with check ((select private.can_author()));

create policy "Public reads claims in published journey steps"
on public.journey_step_claims for select to anon, authenticated
using (exists (
  select 1
  from public.journey_steps js
  join public.journeys j on j.id = js.journey_id
  where js.id = journey_step_id and j.editorial_state = 'published'
));
create policy "Editors write journey claim links"
on public.journey_step_claims for all to authenticated
using ((select private.can_author()))
with check ((select private.can_author()));

create policy "Public reads reviews of published claims"
on public.claim_reviews for select to anon, authenticated
using (exists (
  select 1 from public.claims c
  where c.id = claim_id and c.editorial_state = 'published'
));
create policy "Reviewers create reviews"
on public.claim_reviews for insert to authenticated
with check ((select private.can_review()));
create policy "Reviewers update own reviews"
on public.claim_reviews for update to authenticated
using ((select private.can_review()) and reviewer_id = (select auth.uid()))
with check ((select private.can_review()) and reviewer_id = (select auth.uid()));
create policy "Admins delete reviews"
on public.claim_reviews for delete to authenticated
using ((select private.is_atlas_admin()));

create policy "Public reads revisions of published claims"
on public.claim_revisions for select to anon, authenticated
using (exists (
  select 1 from public.claims c
  where c.id = claim_id and c.editorial_state = 'published'
) and is_public);
create policy "Editors read all revisions"
on public.claim_revisions for select to authenticated
using ((select private.can_review()));

create policy "Public reads source health for active sources"
on public.source_health_checks for select to anon, authenticated
using (exists (
  select 1 from public.sources s
  where s.id = source_id and s.is_active
));
create policy "Editors write source health"
on public.source_health_checks for all to authenticated
using ((select private.can_author()))
with check ((select private.can_author()));

create view public.latest_source_health
with (security_invoker = true)
as
select distinct on (source_id)
  source_id,
  checked_on,
  status,
  http_status,
  resolved_url,
  note
from public.source_health_checks
order by source_id, checked_on desc;

grant select on public.latest_source_health to anon, authenticated;

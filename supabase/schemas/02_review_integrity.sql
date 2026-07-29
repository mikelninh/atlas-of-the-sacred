-- Review provenance extension for the Atlas editorial operating system.
-- This declarative schema runs after 01_editorial_operating_system.sql.

create type public.review_kind as enum (
  'internal-editorial',
  'external-specialist'
);

alter table public.claim_reviews
  add column review_kind public.review_kind not null default 'internal-editorial',
  add column reviewer_discipline text not null default 'editorial provenance check',
  add column conflict_statement text not null default 'No conflict statement recorded.',
  add column attribution_consent text not null default 'private' check (
    attribution_consent in (
      'public-name-and-affiliation',
      'public-name-only',
      'anonymous-discipline',
      'private'
    )
  ),
  add column reviewed_claim_version integer check (reviewed_claim_version is null or reviewed_claim_version > 0),
  add column scope_note text;

alter table public.claim_reviews
  add constraint claim_reviews_external_scope_required check (
    review_kind <> 'external-specialist'
    or (
      length(trim(reviewer_discipline)) > 3
      and length(trim(conflict_statement)) > 3
      and reviewed_claim_version is not null
      and length(trim(coalesce(scope_note, ''))) > 10
    )
  );

create index claim_reviews_kind_idx
  on public.claim_reviews(review_kind, reviewed_on desc);

comment on column public.claim_reviews.review_kind is
  'Separates internal editorial checks from independent external specialist reviews.';
comment on column public.claim_reviews.conflict_statement is
  'Relevant authorship, institutional, funding, commercial, advocacy or personal involvement disclosed for interpretation of the review.';
comment on column public.claim_reviews.attribution_consent is
  'Controls whether reviewer identity and affiliation may be displayed publicly.';
comment on column public.claim_reviews.reviewed_claim_version is
  'The exact claim version covered by the review; later material revisions require renewed review.';
comment on column public.claim_reviews.scope_note is
  'Bounded claim, module or experience scope covered by the review.';

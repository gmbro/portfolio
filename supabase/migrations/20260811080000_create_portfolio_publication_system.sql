-- Portfolio application variants and immutable publication revisions.
-- Private JD/evidence data is kept separate from public-safe page payloads.

create extension if not exists pgcrypto with schema extensions;

create or replace function public.set_updated_at()
returns trigger
language plpgsql
set search_path = public
as $$
begin
  new.updated_at = now();
  return new;
end;
$$;

create table public.career_evidence (
  id uuid primary key default gen_random_uuid(),
  owner_id uuid not null default auth.uid() references auth.users(id) on delete cascade,
  title text not null,
  context text,
  challenge text,
  action text,
  result text,
  tools jsonb not null default '[]'::jsonb,
  metrics jsonb not null default '{}'::jsonb,
  evidence_status text not null default 'needs_review'
    check (evidence_status in ('verified', 'needs_review', 'blocked')),
  source_note text,
  is_public_safe boolean not null default false,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table public.applications (
  id uuid primary key default gen_random_uuid(),
  owner_id uuid not null default auth.uid() references auth.users(id) on delete cascade,
  company_name text not null,
  role_title text not null,
  jd_source_url text,
  jd_text text,
  jd_analysis jsonb not null default '{}'::jsonb,
  status text not null default 'draft'
    check (status in ('draft', 'review', 'published', 'archived')),
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table public.portfolio_revisions (
  id uuid primary key default gen_random_uuid(),
  application_id uuid not null references public.applications(id) on delete cascade,
  revision_no integer not null check (revision_no > 0),
  competency_structure jsonb not null default '{}'::jsonb,
  hero_options jsonb not null default '[]'::jsonb,
  selected_hero jsonb not null default '{}'::jsonb,
  page_content jsonb not null default '{}'::jsonb,
  change_summary text,
  created_at timestamptz not null default now(),
  unique (application_id, revision_no)
);

create table public.portfolio_publications (
  id uuid primary key default gen_random_uuid(),
  application_id uuid not null references public.applications(id) on delete cascade,
  current_revision_id uuid references public.portfolio_revisions(id) on delete restrict,
  slug text not null unique
    check (char_length(slug) between 8 and 96)
    check (slug ~ '^[a-z0-9]+(?:-[a-z0-9]+)*$'),
  published_content jsonb not null default '{}'::jsonb,
  status text not null default 'draft'
    check (status in ('draft', 'published', 'paused', 'archived')),
  noindex boolean not null default true,
  published_at timestamptz,
  expires_at timestamptz,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  check (status <> 'published' or current_revision_id is not null)
);

create index applications_owner_id_idx on public.applications(owner_id);
create index portfolio_revisions_application_id_idx on public.portfolio_revisions(application_id, revision_no desc);
create index portfolio_publications_application_id_idx on public.portfolio_publications(application_id);
create index portfolio_publications_public_lookup_idx
  on public.portfolio_publications(slug)
  where status = 'published';

create trigger career_evidence_set_updated_at
before update on public.career_evidence
for each row execute function public.set_updated_at();

create trigger applications_set_updated_at
before update on public.applications
for each row execute function public.set_updated_at();

create trigger portfolio_publications_set_updated_at
before update on public.portfolio_publications
for each row execute function public.set_updated_at();

create or replace function public.validate_publication_revision()
returns trigger
language plpgsql
set search_path = public
as $$
begin
  if new.current_revision_id is not null and not exists (
    select 1
    from public.portfolio_revisions revision
    where revision.id = new.current_revision_id
      and revision.application_id = new.application_id
  ) then
    raise exception 'The publication revision must belong to the same application.';
  end if;

  return new;
end;
$$;

create trigger portfolio_publications_validate_revision
before insert or update of application_id, current_revision_id
on public.portfolio_publications
for each row execute function public.validate_publication_revision();

alter table public.career_evidence enable row level security;
alter table public.applications enable row level security;
alter table public.portfolio_revisions enable row level security;
alter table public.portfolio_publications enable row level security;

revoke all on table public.career_evidence from anon, authenticated;
revoke all on table public.applications from anon, authenticated;
revoke all on table public.portfolio_revisions from anon, authenticated;
revoke all on table public.portfolio_publications from anon, authenticated;

grant select, insert, update, delete on table public.career_evidence to authenticated;
grant select, insert, update, delete on table public.applications to authenticated;
grant select, insert on table public.portfolio_revisions to authenticated;
grant select, insert, update, delete on table public.portfolio_publications to authenticated;
grant select on table public.portfolio_publications to anon;

create policy "owners manage career evidence"
on public.career_evidence
for all
to authenticated
using ((select auth.uid()) = owner_id)
with check ((select auth.uid()) = owner_id);

create policy "owners manage applications"
on public.applications
for all
to authenticated
using ((select auth.uid()) = owner_id)
with check ((select auth.uid()) = owner_id);

create policy "owners read revisions"
on public.portfolio_revisions
for select
to authenticated
using (
  exists (
    select 1
    from public.applications application
    where application.id = application_id
      and application.owner_id = (select auth.uid())
  )
);

create policy "owners create revisions"
on public.portfolio_revisions
for insert
to authenticated
with check (
  exists (
    select 1
    from public.applications application
    where application.id = application_id
      and application.owner_id = (select auth.uid())
  )
);

create policy "published portfolios are publicly readable"
on public.portfolio_publications
for select
to anon, authenticated
using (
  status = 'published'
  and (expires_at is null or expires_at > now())
);

create policy "owners read all publications"
on public.portfolio_publications
for select
to authenticated
using (
  exists (
    select 1
    from public.applications application
    where application.id = application_id
      and application.owner_id = (select auth.uid())
  )
);

create policy "owners create publications"
on public.portfolio_publications
for insert
to authenticated
with check (
  exists (
    select 1
    from public.applications application
    where application.id = application_id
      and application.owner_id = (select auth.uid())
  )
);

create policy "owners update publications"
on public.portfolio_publications
for update
to authenticated
using (
  exists (
    select 1
    from public.applications application
    where application.id = application_id
      and application.owner_id = (select auth.uid())
  )
)
with check (
  exists (
    select 1
    from public.applications application
    where application.id = application_id
      and application.owner_id = (select auth.uid())
  )
);

create policy "owners delete publications"
on public.portfolio_publications
for delete
to authenticated
using (
  exists (
    select 1
    from public.applications application
    where application.id = application_id
      and application.owner_id = (select auth.uid())
  )
);

create or replace function public.create_portfolio_revision(
  p_application_id uuid,
  p_competency_structure jsonb default '{}'::jsonb,
  p_hero_options jsonb default '[]'::jsonb,
  p_selected_hero jsonb default '{}'::jsonb,
  p_page_content jsonb default '{}'::jsonb,
  p_change_summary text default null
)
returns public.portfolio_revisions
language plpgsql
security invoker
set search_path = public
as $$
declare
  next_revision_no integer;
  created_revision public.portfolio_revisions;
begin
  perform 1
  from public.applications
  where id = p_application_id
  for update;

  if not found then
    raise exception 'Application not found or not accessible.';
  end if;

  select coalesce(max(revision_no), 0) + 1
  into next_revision_no
  from public.portfolio_revisions
  where application_id = p_application_id;

  insert into public.portfolio_revisions (
    application_id,
    revision_no,
    competency_structure,
    hero_options,
    selected_hero,
    page_content,
    change_summary
  ) values (
    p_application_id,
    next_revision_no,
    p_competency_structure,
    p_hero_options,
    p_selected_hero,
    p_page_content,
    p_change_summary
  )
  returning * into created_revision;

  return created_revision;
end;
$$;

create or replace function public.publish_portfolio_revision(
  p_publication_id uuid,
  p_revision_id uuid
)
returns public.portfolio_publications
language plpgsql
security invoker
set search_path = public
as $$
declare
  target_revision public.portfolio_revisions;
  updated_publication public.portfolio_publications;
begin
  select *
  into target_revision
  from public.portfolio_revisions
  where id = p_revision_id;

  if not found then
    raise exception 'Revision not found or not accessible.';
  end if;

  update public.portfolio_publications publication
  set
    current_revision_id = target_revision.id,
    published_content = target_revision.page_content,
    status = 'published',
    published_at = coalesce(publication.published_at, now())
  where publication.id = p_publication_id
    and publication.application_id = target_revision.application_id
  returning * into updated_publication;

  if not found then
    raise exception 'Publication not found, not accessible, or linked to another application.';
  end if;

  update public.applications
  set status = 'published'
  where id = target_revision.application_id;

  return updated_publication;
end;
$$;

revoke all on function public.create_portfolio_revision(uuid, jsonb, jsonb, jsonb, jsonb, text) from public;
revoke all on function public.publish_portfolio_revision(uuid, uuid) from public;
grant execute on function public.create_portfolio_revision(uuid, jsonb, jsonb, jsonb, jsonb, text) to authenticated;
grant execute on function public.publish_portfolio_revision(uuid, uuid) to authenticated;

comment on table public.career_evidence is 'Private, reusable and verified career evidence.';
comment on table public.applications is 'Private company and JD workflow records.';
comment on table public.portfolio_revisions is 'Immutable snapshots created for every requested revision.';
comment on table public.portfolio_publications is 'Public-safe page payload and stable slug for a portfolio link.';

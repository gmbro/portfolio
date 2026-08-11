drop policy if exists "published portfolios are publicly readable"
  on public.portfolio_publications;

revoke select on table public.portfolio_publications from anon, public;

create or replace function public.get_public_portfolio_by_slug(p_slug text)
returns table (
  slug text,
  noindex boolean,
  published_content jsonb
)
language sql
stable
security definer
set search_path = ''
as $$
  select
    publication.slug,
    publication.noindex,
    publication.published_content
  from public.portfolio_publications as publication
  where publication.slug = p_slug
    and publication.status = 'published'
    and (publication.expires_at is null or publication.expires_at > now())
  limit 1
$$;

revoke all on function public.get_public_portfolio_by_slug(text)
  from public, anon, authenticated, service_role;

grant execute on function public.get_public_portfolio_by_slug(text)
  to anon, authenticated;

comment on function public.get_public_portfolio_by_slug(text)
  is 'Returns only public-safe portfolio fields for one exact published, unexpired slug.';

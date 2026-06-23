-- RIVO Imobiliare — schema Supabase
-- Tabele prefixate `rivo_` pentru a coexista în siguranță cu alte proiecte.
-- Rulează în Supabase → SQL Editor (sau automat prin scripts/setup-supabase.mjs).

create table if not exists rivo_projects (
  slug        text primary key,
  position    int  not null default 0,
  name        text not null default '',
  tagline     text not null default '',
  location    text not null default '',
  status      text not null default 'in-curand',
  type        text not null default 'rezidential',
  year        text not null default '',
  progress    int  not null default 0,
  cover       text not null default '',
  description text not null default '',
  gallery     jsonb not null default '[]'::jsonb,
  specs       jsonb not null default '[]'::jsonb,
  typologies  jsonb not null default '[]'::jsonb,
  amenities   jsonb not null default '[]'::jsonb,
  map         jsonb not null default '{"lat":47.7929,"lng":22.8857}'::jsonb,
  created_at  timestamptz not null default now()
);

create table if not exists rivo_submissions (
  id           text primary key,
  type         text not null default 'mesaj',
  status       text not null default 'nou',
  name         text not null default '',
  email        text not null default '',
  phone        text not null default '',
  project_slug text not null default '',
  message      text not null default '',
  created_at   timestamptz not null default now()
);

create index if not exists rivo_submissions_created_idx
  on rivo_submissions (created_at desc);

create table if not exists rivo_settings (
  id         int primary key default 1,
  data       jsonb not null,
  updated_at timestamptz not null default now()
);

-- Securitate: activăm RLS și NU adăugăm politici publice.
-- Accesul se face exclusiv server-side cu cheia service_role (care ocolește RLS),
-- niciodată direct din browser.
alter table rivo_projects   enable row level security;
alter table rivo_submissions enable row level security;
alter table rivo_settings    enable row level security;

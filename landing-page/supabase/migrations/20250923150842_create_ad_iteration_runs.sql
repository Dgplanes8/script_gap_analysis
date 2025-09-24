create table public.ad_iteration_runs (
  id uuid primary key default gen_random_uuid(),
  created_at timestamptz default now(),
  user_id uuid,
  request jsonb not null,
  result jsonb not null,
  credits_spent integer not null,
  processing_ms integer not null,
  source text default 'web'
);

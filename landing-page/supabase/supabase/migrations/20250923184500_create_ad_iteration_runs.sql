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

-- Enable RLS
alter table public.ad_iteration_runs enable row level security;

-- Allow users to see their own runs
create policy "Users can view own iteration runs" on public.ad_iteration_runs
  for select using (auth.uid() = user_id);

-- Allow users to insert their own runs
create policy "Users can insert own iteration runs" on public.ad_iteration_runs
  for insert with check (auth.uid() = user_id);
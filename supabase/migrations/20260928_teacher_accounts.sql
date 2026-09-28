-- Teacher accounts with manual approval by FSA admins.
-- Applied to Supabase project "Future Scholars Association" (psmqabrmxceqwiznvqcb) on 2026-09-28.

create type public.account_role as enum ('teacher', 'admin');
create type public.account_status as enum ('pending', 'approved', 'rejected');

-- Emails that become admins when they sign up. No client access.
create table public.admin_emails (
  email text primary key
);
alter table public.admin_emails enable row level security;
revoke all on public.admin_emails from anon, authenticated;
insert into public.admin_emails (email) values ('futurescholars.contact@gmail.com');

create table public.profiles (
  id uuid primary key references auth.users (id) on delete cascade,
  email text not null,
  first_name text not null default '',
  last_name text not null default '',
  school_id text,
  school_name text,
  grade text,
  subject text,
  role public.account_role not null default 'teacher',
  status public.account_status not null default 'pending',
  reviewed_at timestamptz,
  reviewed_by uuid references auth.users (id) on delete set null,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);
alter table public.profiles enable row level security;
create index profiles_reviewed_by_idx on public.profiles (reviewed_by);
create index profiles_status_idx on public.profiles (status);

-- Admin check lives outside the public API; used only by policies and functions.
create schema if not exists private;
revoke all on schema private from public, anon;
grant usage on schema private to authenticated;

create or replace function private.is_admin()
returns boolean
language sql
stable
security definer
set search_path = ''
as $$
  select exists (
    select 1 from public.profiles
    where id = (select auth.uid()) and role = 'admin' and status = 'approved'
  );
$$;
revoke execute on function private.is_admin() from public, anon;
grant execute on function private.is_admin() to authenticated;

create policy "Teachers read their own profile; admins read all"
  on public.profiles for select to authenticated
  using (id = (select auth.uid()) or (select private.is_admin()));

create policy "Teachers update their own profile"
  on public.profiles for update to authenticated
  using (id = (select auth.uid()))
  with check (id = (select auth.uid()));

-- Clients may only edit these columns. Role and status change only through set_teacher_status().
revoke all on public.profiles from anon;
revoke insert, update, delete on public.profiles from authenticated;
grant select on public.profiles to authenticated;
grant update (first_name, last_name, grade, subject) on public.profiles to authenticated;

create or replace function public.touch_updated_at()
returns trigger
language plpgsql
set search_path = ''
as $$
begin
  new.updated_at = now();
  return new;
end;
$$;

create trigger profiles_touch_updated_at
  before update on public.profiles
  for each row execute function public.touch_updated_at();

-- Create a profile for every new sign-up from the details sent with it.
create or replace function public.handle_new_user()
returns trigger
language plpgsql
security definer
set search_path = ''
as $$
declare
  admin boolean;
  meta jsonb := coalesce(new.raw_user_meta_data, '{}'::jsonb);
begin
  select exists (select 1 from public.admin_emails where lower(email) = lower(new.email)) into admin;

  insert into public.profiles (id, email, first_name, last_name, school_id, school_name, grade, subject, role, status)
  values (
    new.id,
    new.email,
    left(coalesce(meta ->> 'first_name', ''), 100),
    left(coalesce(meta ->> 'last_name', ''), 100),
    left(meta ->> 'school_id', 20),
    left(meta ->> 'school_name', 200),
    left(meta ->> 'grade', 50),
    left(meta ->> 'subject', 100),
    case when admin then 'admin'::public.account_role else 'teacher'::public.account_role end,
    case when admin then 'approved'::public.account_status else 'pending'::public.account_status end
  );
  return new;
end;
$$;

create trigger on_auth_user_created
  after insert on auth.users
  for each row execute function public.handle_new_user();

-- Admins approve or reject teacher accounts.
create or replace function public.set_teacher_status(teacher_id uuid, new_status public.account_status)
returns void
language plpgsql
security definer
set search_path = ''
as $$
begin
  if not private.is_admin() then
    raise exception 'Only FSA admins can review teacher accounts' using errcode = '42501';
  end if;

  update public.profiles
  set status = new_status, reviewed_at = now(), reviewed_by = (select auth.uid())
  where id = teacher_id and role = 'teacher';
end;
$$;

revoke execute on function public.handle_new_user() from public, anon, authenticated;
revoke execute on function public.set_teacher_status(uuid, public.account_status) from public, anon;
grant execute on function public.set_teacher_status(uuid, public.account_status) to authenticated;

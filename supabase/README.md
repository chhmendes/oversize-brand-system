# Supabase — Setup Instructions

## 1. Apply migrations (SQL Editor)

Open the Supabase Dashboard → **SQL Editor** and run each file below **in order**:

| Order | File | What it creates |
|-------|------|-----------------|
| 1 | `migrations/001_profiles.sql` | `profiles` table, auto-create trigger, RLS policies |
| 2 | `migrations/002_brand_assets.sql` | `brand_assets` table, RLS policies |
| 3 | `migrations/003_docs.sql` | `docs` table, RLS policies |

Copy-paste each file's contents and click **Run**.

> `003_docs.sql` reuses the `handle_updated_at()` function defined in `001_profiles.sql`, so migration 001 must be applied first.

## 2. Create the Storage bucket

1. Dashboard → **Storage** → **New bucket**
2. Name: `brand-assets`
3. Public bucket: **off** (unchecked)
4. Click **Create bucket**

## 3. Apply Storage policies

In **SQL Editor**, run the contents of `storage-policies.sql`.

## 4. Environment variables

Add the following to `.env.local` (never commit this file):

```
NEXT_PUBLIC_SUPABASE_URL=https://<project-ref>.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=<anon-key>
SUPABASE_SERVICE_ROLE_KEY=<service-role-key>
```

Find these values in Dashboard → **Settings** → **API**:
- `NEXT_PUBLIC_SUPABASE_URL` → Project URL
- `NEXT_PUBLIC_SUPABASE_ANON_KEY` → `anon` / `public` key
- `SUPABASE_SERVICE_ROLE_KEY` → `service_role` key (keep secret — server-side only)

## Schema overview

```
auth.users  (managed by Supabase)
    │
    ├── public.profiles        ← extended user info + role ('admin' | 'staff')
    ├── public.brand_assets    ← metadata for files in the brand-assets bucket
    └── public.docs            ← metadata for MDX documentation pages
```

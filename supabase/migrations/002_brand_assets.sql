-- ============================================================
-- Migration 002: brand_assets
-- Metadata for files stored in the 'brand-assets' Storage bucket.
-- ============================================================

CREATE TABLE IF NOT EXISTS public.brand_assets (
  id            uuid        PRIMARY KEY DEFAULT gen_random_uuid(),
  name          text        NOT NULL,
  storage_path  text        NOT NULL,
  public_url    text,
  mime_type     text,
  category      text        NOT NULL
                            CHECK (category IN (
                              'logotipos', 'imagens', 'icones',
                              'tipografia', 'cores', 'documentos',
                              'audios', 'videos'
                            )),
  size_bytes    bigint,
  uploaded_by   uuid        REFERENCES auth.users(id) ON DELETE SET NULL,
  created_at    timestamptz NOT NULL DEFAULT now()
);

-- ----------------------------------------------------------
-- Row Level Security
-- ----------------------------------------------------------
ALTER TABLE public.brand_assets ENABLE ROW LEVEL SECURITY;

-- Any authenticated user can list / download asset metadata
CREATE POLICY "Authenticated users can view assets"
  ON public.brand_assets
  FOR SELECT
  USING (auth.role() = 'authenticated');

-- Any authenticated user can upload (insert) new assets
CREATE POLICY "Authenticated users can insert assets"
  ON public.brand_assets
  FOR INSERT
  WITH CHECK (auth.role() = 'authenticated');

-- Only admins can delete assets
CREATE POLICY "Admins can delete assets"
  ON public.brand_assets
  FOR DELETE
  USING (
    EXISTS (
      SELECT 1 FROM public.profiles
      WHERE id = auth.uid() AND role = 'admin'
    )
  );

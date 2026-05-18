-- ============================================================
-- Migration 003: docs
-- Manageable metadata for MDX documentation pages.
-- The MDX source files remain on disk; this table tracks
-- publication state, ordering, and searchable metadata.
-- ============================================================

CREATE TABLE IF NOT EXISTS public.docs (
  slug         text        PRIMARY KEY,
  title        text        NOT NULL,
  description  text,
  section      text        NOT NULL
                           CHECK (section IN (
                             'estrategia', 'marca',
                             'comunicacao', 'identidade'
                           )),
  order_index  integer     NOT NULL DEFAULT 0,
  published    boolean     NOT NULL DEFAULT true,
  created_at   timestamptz NOT NULL DEFAULT now(),
  updated_at   timestamptz NOT NULL DEFAULT now()
);

-- Keep updated_at current — reuse the function created in 001_profiles.sql
DROP TRIGGER IF EXISTS on_docs_updated ON public.docs;
CREATE TRIGGER on_docs_updated
  BEFORE UPDATE ON public.docs
  FOR EACH ROW EXECUTE PROCEDURE public.handle_updated_at();

-- ----------------------------------------------------------
-- Row Level Security
-- ----------------------------------------------------------
ALTER TABLE public.docs ENABLE ROW LEVEL SECURITY;

-- Any authenticated user can read published docs
CREATE POLICY "Authenticated users can view docs"
  ON public.docs
  FOR SELECT
  USING (auth.role() = 'authenticated');

-- Only admins can insert docs metadata
CREATE POLICY "Admins can insert docs"
  ON public.docs
  FOR INSERT
  WITH CHECK (
    EXISTS (
      SELECT 1 FROM public.profiles
      WHERE id = auth.uid() AND role = 'admin'
    )
  );

-- Only admins can update docs metadata
CREATE POLICY "Admins can update docs"
  ON public.docs
  FOR UPDATE
  USING (
    EXISTS (
      SELECT 1 FROM public.profiles
      WHERE id = auth.uid() AND role = 'admin'
    )
  );

-- Only admins can delete docs metadata
CREATE POLICY "Admins can delete docs"
  ON public.docs
  FOR DELETE
  USING (
    EXISTS (
      SELECT 1 FROM public.profiles
      WHERE id = auth.uid() AND role = 'admin'
    )
  );

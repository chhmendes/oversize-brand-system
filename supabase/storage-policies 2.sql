-- ============================================================
-- Storage: brand-assets bucket policies
--
-- Run this in the SQL Editor AFTER creating the bucket via
-- the Supabase Dashboard (Storage → New bucket → name:
-- "brand-assets", public: false).
--
-- If you prefer CLI-based setup, uncomment the INSERT below:
-- INSERT INTO storage.buckets (id, name, public)
--   VALUES ('brand-assets', 'brand-assets', false)
--   ON CONFLICT (id) DO NOTHING;
-- ============================================================

-- Authenticated users can download / read objects
CREATE POLICY "Authenticated users can read assets"
  ON storage.objects
  FOR SELECT
  USING (
    bucket_id = 'brand-assets'
    AND auth.role() = 'authenticated'
  );

-- Authenticated users can upload new objects
CREATE POLICY "Authenticated users can upload assets"
  ON storage.objects
  FOR INSERT
  WITH CHECK (
    bucket_id = 'brand-assets'
    AND auth.role() = 'authenticated'
  );

-- Only admins can delete objects
CREATE POLICY "Admins can delete assets"
  ON storage.objects
  FOR DELETE
  USING (
    bucket_id = 'brand-assets'
    AND EXISTS (
      SELECT 1 FROM public.profiles
      WHERE id = auth.uid() AND role = 'admin'
    )
  );

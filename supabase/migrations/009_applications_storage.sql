-- ===================== APPLICATION FILE STORAGE =====================

-- Add file path columns to job_applications
ALTER TABLE IF EXISTS job_applications
  ADD COLUMN IF NOT EXISTS profile_picture_path TEXT,
  ADD COLUMN IF NOT EXISTS cv_path TEXT,
  ADD COLUMN IF NOT EXISTS additional_documents_paths TEXT;

-- Create private storage bucket for applications
INSERT INTO storage.buckets (id, name, public)
VALUES ('applications', 'applications', false)
ON CONFLICT (id) DO NOTHING;

-- Storage policies for applications bucket
DROP POLICY IF EXISTS "Public can upload application files" ON storage.objects;
CREATE POLICY "Public can upload application files"
  ON storage.objects FOR INSERT
  WITH CHECK (bucket_id = 'applications');

DROP POLICY IF EXISTS "Admins can view application files" ON storage.objects;
CREATE POLICY "Admins can view application files"
  ON storage.objects FOR SELECT
  USING (bucket_id = 'applications' AND auth.role() = 'authenticated');

DROP POLICY IF EXISTS "Admins can update application files" ON storage.objects;
CREATE POLICY "Admins can update application files"
  ON storage.objects FOR UPDATE
  USING (bucket_id = 'applications' AND auth.role() = 'authenticated');

DROP POLICY IF EXISTS "Admins can delete application files" ON storage.objects;
CREATE POLICY "Admins can delete application files"
  ON storage.objects FOR DELETE
  USING (bucket_id = 'applications' AND auth.role() = 'authenticated');

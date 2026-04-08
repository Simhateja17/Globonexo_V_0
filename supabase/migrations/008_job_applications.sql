-- ===================== JOB APPLICATIONS =====================
CREATE TABLE IF NOT EXISTS job_applications (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  full_name TEXT NOT NULL,
  email TEXT NOT NULL,
  phone TEXT,
  country TEXT,
  city TEXT,
  linkedin_url TEXT,
  github_url TEXT,
  motivation TEXT,
  open_to_relocation BOOLEAN NOT NULL DEFAULT false,
  privacy_accepted BOOLEAN NOT NULL DEFAULT false,
  profile_picture_file_name TEXT,
  cv_file_name TEXT,
  additional_documents_file_names TEXT,
  status TEXT NOT NULL DEFAULT 'new' CHECK (status IN ('new', 'reviewed', 'contacted', 'rejected')),
  created_at TIMESTAMPTZ DEFAULT now() NOT NULL
);

CREATE INDEX IF NOT EXISTS idx_job_applications_status ON job_applications(status);
CREATE INDEX IF NOT EXISTS idx_job_applications_created ON job_applications(created_at DESC);

ALTER TABLE job_applications ENABLE ROW LEVEL SECURITY;

-- Public can submit job applications
DROP POLICY IF EXISTS "Public can submit job applications" ON job_applications;
CREATE POLICY "Public can submit job applications"
  ON job_applications FOR INSERT
  WITH CHECK (true);

-- Admins can manage job applications
DROP POLICY IF EXISTS "Admins can manage job applications" ON job_applications;
CREATE POLICY "Admins can manage job applications"
  ON job_applications FOR ALL
  USING (auth.role() = 'authenticated');

-- ============================================================
-- Globonexo CMS Schema
-- Full CMS database schema for the Admin Panel
-- ============================================================

-- ===================== BLOG POSTS =====================
CREATE TABLE IF NOT EXISTS blog_posts (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  title TEXT NOT NULL,
  slug TEXT NOT NULL UNIQUE,
  excerpt TEXT,
  content JSONB, -- Tiptap JSON content
  cover_image TEXT,
  meta_title TEXT,
  meta_description TEXT,
  status TEXT NOT NULL DEFAULT 'draft' CHECK (status IN ('draft', 'published')),
  published_at TIMESTAMPTZ,
  author_id UUID REFERENCES auth.users(id) ON DELETE SET NULL,
  created_at TIMESTAMPTZ DEFAULT now() NOT NULL,
  updated_at TIMESTAMPTZ DEFAULT now() NOT NULL
);

CREATE INDEX idx_blog_posts_slug ON blog_posts(slug);
CREATE INDEX idx_blog_posts_status ON blog_posts(status);
CREATE INDEX idx_blog_posts_published_at ON blog_posts(published_at DESC);

-- ===================== SERVICES =====================
CREATE TABLE IF NOT EXISTS services (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  title TEXT NOT NULL,
  description TEXT,
  icon TEXT, -- Lucide icon name or image URL
  sort_order INT DEFAULT 0,
  is_active BOOLEAN DEFAULT true,
  created_at TIMESTAMPTZ DEFAULT now() NOT NULL,
  updated_at TIMESTAMPTZ DEFAULT now() NOT NULL
);

CREATE INDEX idx_services_sort ON services(sort_order);

-- ===================== TEAM MEMBERS =====================
CREATE TABLE IF NOT EXISTS team_members (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  name TEXT NOT NULL,
  role TEXT,
  bio TEXT,
  photo_url TEXT,
  linkedin_url TEXT,
  sort_order INT DEFAULT 0,
  is_active BOOLEAN DEFAULT true,
  created_at TIMESTAMPTZ DEFAULT now() NOT NULL,
  updated_at TIMESTAMPTZ DEFAULT now() NOT NULL
);

CREATE INDEX idx_team_members_sort ON team_members(sort_order);

-- ===================== TESTIMONIALS =====================
CREATE TABLE IF NOT EXISTS testimonials (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  author_name TEXT NOT NULL,
  author_role TEXT,
  author_company TEXT,
  author_photo TEXT,
  content TEXT NOT NULL,
  rating INT CHECK (rating >= 1 AND rating <= 5),
  sort_order INT DEFAULT 0,
  is_active BOOLEAN DEFAULT true,
  created_at TIMESTAMPTZ DEFAULT now() NOT NULL,
  updated_at TIMESTAMPTZ DEFAULT now() NOT NULL
);

CREATE INDEX idx_testimonials_sort ON testimonials(sort_order);

-- ===================== FAQS =====================
CREATE TABLE IF NOT EXISTS faqs (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  question TEXT NOT NULL,
  answer TEXT NOT NULL,
  sort_order INT DEFAULT 0,
  is_active BOOLEAN DEFAULT true,
  created_at TIMESTAMPTZ DEFAULT now() NOT NULL,
  updated_at TIMESTAMPTZ DEFAULT now() NOT NULL
);

CREATE INDEX idx_faqs_sort ON faqs(sort_order);

-- ===================== CONTACT SUBMISSIONS =====================
CREATE TABLE IF NOT EXISTS contact_submissions (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  name TEXT NOT NULL,
  email TEXT NOT NULL,
  phone TEXT,
  message TEXT NOT NULL,
  status TEXT NOT NULL DEFAULT 'new' CHECK (status IN ('new', 'read', 'replied')),
  created_at TIMESTAMPTZ DEFAULT now() NOT NULL
);

CREATE INDEX idx_contact_submissions_status ON contact_submissions(status);
CREATE INDEX idx_contact_submissions_created ON contact_submissions(created_at DESC);

-- ===================== HERO SECTIONS =====================
CREATE TABLE IF NOT EXISTS hero_sections (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  page_key TEXT NOT NULL, -- e.g., 'home', 'about', 'services'
  section_key TEXT NOT NULL, -- e.g., 'hero', 'cta', 'features_intro'
  title TEXT,
  subtitle TEXT,
  description TEXT,
  cta_text TEXT,
  cta_link TEXT,
  background_image TEXT,
  extra_data JSONB, -- Flexible field for additional section-specific data
  is_active BOOLEAN DEFAULT true,
  sort_order INT DEFAULT 0,
  created_at TIMESTAMPTZ DEFAULT now() NOT NULL,
  updated_at TIMESTAMPTZ DEFAULT now() NOT NULL,
  UNIQUE(page_key, section_key)
);

-- ===================== SITE SETTINGS =====================
CREATE TABLE IF NOT EXISTS site_settings (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  key TEXT NOT NULL UNIQUE,
  value JSONB NOT NULL DEFAULT '{}',
  updated_at TIMESTAMPTZ DEFAULT now() NOT NULL
);

-- ===================== MEDIA =====================
CREATE TABLE IF NOT EXISTS media (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  file_name TEXT NOT NULL,
  file_path TEXT NOT NULL,
  file_type TEXT,
  file_size BIGINT,
  alt_text TEXT,
  bucket TEXT NOT NULL DEFAULT 'media',
  uploaded_by UUID REFERENCES auth.users(id) ON DELETE SET NULL,
  created_at TIMESTAMPTZ DEFAULT now() NOT NULL
);

CREATE INDEX idx_media_created ON media(created_at DESC);

-- ===================== UPDATED_AT TRIGGER =====================
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Apply trigger to all tables with updated_at
CREATE TRIGGER set_updated_at BEFORE UPDATE ON blog_posts
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER set_updated_at BEFORE UPDATE ON services
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER set_updated_at BEFORE UPDATE ON team_members
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER set_updated_at BEFORE UPDATE ON testimonials
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER set_updated_at BEFORE UPDATE ON faqs
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER set_updated_at BEFORE UPDATE ON hero_sections
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER set_updated_at BEFORE UPDATE ON site_settings
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

-- ===================== ROW LEVEL SECURITY =====================

-- Enable RLS on all tables
ALTER TABLE blog_posts ENABLE ROW LEVEL SECURITY;
ALTER TABLE services ENABLE ROW LEVEL SECURITY;
ALTER TABLE team_members ENABLE ROW LEVEL SECURITY;
ALTER TABLE testimonials ENABLE ROW LEVEL SECURITY;
ALTER TABLE faqs ENABLE ROW LEVEL SECURITY;
ALTER TABLE contact_submissions ENABLE ROW LEVEL SECURITY;
ALTER TABLE hero_sections ENABLE ROW LEVEL SECURITY;
ALTER TABLE site_settings ENABLE ROW LEVEL SECURITY;
ALTER TABLE media ENABLE ROW LEVEL SECURITY;

-- Public read access for published/active content
CREATE POLICY "Public can read published blog posts"
  ON blog_posts FOR SELECT
  USING (status = 'published');

CREATE POLICY "Public can read active services"
  ON services FOR SELECT
  USING (is_active = true);

CREATE POLICY "Public can read active team members"
  ON team_members FOR SELECT
  USING (is_active = true);

CREATE POLICY "Public can read active testimonials"
  ON testimonials FOR SELECT
  USING (is_active = true);

CREATE POLICY "Public can read active FAQs"
  ON faqs FOR SELECT
  USING (is_active = true);

CREATE POLICY "Public can read active hero sections"
  ON hero_sections FOR SELECT
  USING (is_active = true);

CREATE POLICY "Public can read site settings"
  ON site_settings FOR SELECT
  USING (true);

CREATE POLICY "Public can read media"
  ON media FOR SELECT
  USING (true);

-- Public can submit contact forms
CREATE POLICY "Public can submit contact forms"
  ON contact_submissions FOR INSERT
  WITH CHECK (true);

-- Authenticated users (admins) get full access
CREATE POLICY "Admins can manage blog posts"
  ON blog_posts FOR ALL
  USING (auth.role() = 'authenticated');

CREATE POLICY "Admins can manage services"
  ON services FOR ALL
  USING (auth.role() = 'authenticated');

CREATE POLICY "Admins can manage team members"
  ON team_members FOR ALL
  USING (auth.role() = 'authenticated');

CREATE POLICY "Admins can manage testimonials"
  ON testimonials FOR ALL
  USING (auth.role() = 'authenticated');

CREATE POLICY "Admins can manage FAQs"
  ON faqs FOR ALL
  USING (auth.role() = 'authenticated');

CREATE POLICY "Admins can manage contact submissions"
  ON contact_submissions FOR ALL
  USING (auth.role() = 'authenticated');

CREATE POLICY "Admins can manage hero sections"
  ON hero_sections FOR ALL
  USING (auth.role() = 'authenticated');

CREATE POLICY "Admins can manage site settings"
  ON site_settings FOR ALL
  USING (auth.role() = 'authenticated');

CREATE POLICY "Admins can manage media"
  ON media FOR ALL
  USING (auth.role() = 'authenticated');

-- ===================== STORAGE BUCKET =====================
-- Note: Run this in Supabase SQL Editor or via the dashboard:
-- INSERT INTO storage.buckets (id, name, public) VALUES ('media', 'media', true);

-- Storage policies for the media bucket
-- CREATE POLICY "Public can view media files"
--   ON storage.objects FOR SELECT
--   USING (bucket_id = 'media');
-- CREATE POLICY "Authenticated users can upload media"
--   ON storage.objects FOR INSERT
--   WITH CHECK (bucket_id = 'media' AND auth.role() = 'authenticated');
-- CREATE POLICY "Authenticated users can update media"
--   ON storage.objects FOR UPDATE
--   USING (bucket_id = 'media' AND auth.role() = 'authenticated');
-- CREATE POLICY "Authenticated users can delete media"
--   ON storage.objects FOR DELETE
--   USING (bucket_id = 'media' AND auth.role() = 'authenticated');

-- ===================== SEED DEFAULT SETTINGS =====================
INSERT INTO site_settings (key, value) VALUES
  ('company', '{"name": "Globonexo", "tagline": "International IT & AI Expert Hub", "email": "contact@globonexo.com", "phone": "+1 (555) 123-4567", "address": ""}'),
  ('social', '{"linkedin": "", "twitter": "", "github": "", "facebook": ""}'),
  ('footer', '{"text": "2026 Globonexo. All rights reserved.", "links": []}')
ON CONFLICT (key) DO NOTHING;

-- ============================================================
-- Add locale support to all CMS content tables
-- Supports multilingual content (en, de, etc.)
-- ============================================================

-- ===================== ADD LOCALE COLUMN =====================

-- Blog Posts
ALTER TABLE blog_posts ADD COLUMN IF NOT EXISTS locale TEXT NOT NULL DEFAULT 'en';
DROP INDEX IF EXISTS idx_blog_posts_slug;
CREATE UNIQUE INDEX idx_blog_posts_slug_locale ON blog_posts(slug, locale);

-- Services
ALTER TABLE services ADD COLUMN IF NOT EXISTS locale TEXT NOT NULL DEFAULT 'en';

-- Team Members
ALTER TABLE team_members ADD COLUMN IF NOT EXISTS locale TEXT NOT NULL DEFAULT 'en';

-- Testimonials
ALTER TABLE testimonials ADD COLUMN IF NOT EXISTS locale TEXT NOT NULL DEFAULT 'en';

-- FAQs
ALTER TABLE faqs ADD COLUMN IF NOT EXISTS locale TEXT NOT NULL DEFAULT 'en';

-- Hero Sections: change unique constraint from (page_key, section_key) to (page_key, section_key, locale)
ALTER TABLE hero_sections ADD COLUMN IF NOT EXISTS locale TEXT NOT NULL DEFAULT 'en';
ALTER TABLE hero_sections DROP CONSTRAINT IF EXISTS hero_sections_page_key_section_key_key;
ALTER TABLE hero_sections ADD CONSTRAINT hero_sections_page_key_section_key_locale_key UNIQUE (page_key, section_key, locale);

-- ===================== INDEXES =====================
CREATE INDEX IF NOT EXISTS idx_blog_posts_locale ON blog_posts(locale);
CREATE INDEX IF NOT EXISTS idx_services_locale ON services(locale);
CREATE INDEX IF NOT EXISTS idx_team_members_locale ON team_members(locale);
CREATE INDEX IF NOT EXISTS idx_testimonials_locale ON testimonials(locale);
CREATE INDEX IF NOT EXISTS idx_faqs_locale ON faqs(locale);
CREATE INDEX IF NOT EXISTS idx_hero_sections_locale ON hero_sections(locale);

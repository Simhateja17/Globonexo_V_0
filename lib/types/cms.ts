// Database types for the Globonexo CMS
// These types match the Supabase tables defined in migrations/001_cms_schema.sql

export interface BlogPost {
  id: string;
  title: string;
  slug: string;
  excerpt: string | null;
  content: Record<string, unknown> | null; // Tiptap JSON
  cover_image: string | null;
  meta_title: string | null;
  meta_description: string | null;
  status: "draft" | "published";
  published_at: string | null;
  author_id: string | null;
  created_at: string;
  updated_at: string;
}

export interface Service {
  id: string;
  title: string;
  description: string | null;
  icon: string | null;
  sort_order: number;
  is_active: boolean;
  created_at: string;
  updated_at: string;
}

export interface TeamMember {
  id: string;
  name: string;
  role: string | null;
  bio: string | null;
  photo_url: string | null;
  linkedin_url: string | null;
  sort_order: number;
  is_active: boolean;
  created_at: string;
  updated_at: string;
}

export interface Testimonial {
  id: string;
  author_name: string;
  author_role: string | null;
  author_company: string | null;
  author_photo: string | null;
  content: string;
  rating: number | null;
  sort_order: number;
  is_active: boolean;
  created_at: string;
  updated_at: string;
}

export interface FAQ {
  id: string;
  question: string;
  answer: string;
  sort_order: number;
  is_active: boolean;
  created_at: string;
  updated_at: string;
}

export interface ContactSubmission {
  id: string;
  name: string;
  email: string;
  phone: string | null;
  message: string;
  status: "new" | "read" | "replied";
  created_at: string;
}

export interface HeroSection {
  id: string;
  page_key: string;
  section_key: string;
  title: string | null;
  subtitle: string | null;
  description: string | null;
  cta_text: string | null;
  cta_link: string | null;
  background_image: string | null;
  extra_data: Record<string, unknown> | null;
  is_active: boolean;
  sort_order: number;
  created_at: string;
  updated_at: string;
}

export interface SiteSetting {
  id: string;
  key: string;
  value: Record<string, unknown>;
  updated_at: string;
}

export interface Media {
  id: string;
  file_name: string;
  file_path: string;
  file_type: string | null;
  file_size: number | null;
  alt_text: string | null;
  bucket: string;
  uploaded_by: string | null;
  created_at: string;
}

// Insert/Update types (omit auto-generated fields)
export type BlogPostInsert = Omit<BlogPost, "id" | "created_at" | "updated_at">;
export type BlogPostUpdate = Partial<BlogPostInsert>;

export type ServiceInsert = Omit<Service, "id" | "created_at" | "updated_at">;
export type ServiceUpdate = Partial<ServiceInsert>;

export type TeamMemberInsert = Omit<TeamMember, "id" | "created_at" | "updated_at">;
export type TeamMemberUpdate = Partial<TeamMemberInsert>;

export type TestimonialInsert = Omit<Testimonial, "id" | "created_at" | "updated_at">;
export type TestimonialUpdate = Partial<TestimonialInsert>;

export type FAQInsert = Omit<FAQ, "id" | "created_at" | "updated_at">;
export type FAQUpdate = Partial<FAQInsert>;

export type ContactSubmissionInsert = Omit<ContactSubmission, "id" | "created_at">;
export type ContactSubmissionUpdate = Partial<Pick<ContactSubmission, "status">>;

export type HeroSectionInsert = Omit<HeroSection, "id" | "created_at" | "updated_at">;
export type HeroSectionUpdate = Partial<HeroSectionInsert>;

export type SiteSettingUpdate = { value: Record<string, unknown> };

export type MediaInsert = Omit<Media, "id" | "created_at">;

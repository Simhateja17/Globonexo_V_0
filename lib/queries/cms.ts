import { unstable_cache as cache } from "next/cache";
import { createStaticClient } from "@/lib/supabase/static";
import type {
  Service,
  TeamMember,
  Testimonial,
  FAQ,
  HeroSection,
  SiteSetting,
  Locale,
} from "@/lib/types/cms";

// ======================== PUBLIC DATA FETCHING ========================
// These functions are for public-facing pages (not server actions).
// They read from Supabase with RLS public-read policies applied.
// All content queries accept a `locale` parameter (defaults to "en").
//
// Each query is wrapped with `unstable_cache` for instant responses.
// Cache is invalidated via revalidateTag() in server actions.

export const fetchServices = (locale: Locale = "en"): Promise<Service[]> =>
  cache(
    async () => {
      const supabase = createStaticClient();
      const { data, error } = await supabase
        .from("services")
        .select("*")
        .eq("is_active", true)
        .eq("locale", locale)
        .order("sort_order", { ascending: true });
      if (error) {
        console.error("Failed to fetch services:", error);
        return [];
      }
      return data ?? [];
    },
    [`services-${locale}`],
    { tags: ["services", `services-${locale}`], revalidate: 3600 }
  )();

export const fetchTeamMembers = (locale: Locale = "en"): Promise<TeamMember[]> =>
  cache(
    async () => {
      const supabase = createStaticClient();
      const { data, error } = await supabase
        .from("team_members")
        .select("*")
        .eq("is_active", true)
        .eq("locale", locale)
        .order("sort_order", { ascending: true });
      if (error) {
        console.error("Failed to fetch team members:", error);
        return [];
      }
      return data ?? [];
    },
    [`team-members-${locale}`],
    { tags: ["team-members", `team-members-${locale}`], revalidate: 3600 }
  )();

export const fetchTestimonials = (locale: Locale = "en"): Promise<Testimonial[]> =>
  cache(
    async () => {
      const supabase = createStaticClient();
      const { data, error } = await supabase
        .from("testimonials")
        .select("*")
        .eq("is_active", true)
        .eq("locale", locale)
        .order("sort_order", { ascending: true });
      if (error) {
        console.error("Failed to fetch testimonials:", error);
        return [];
      }
      return data ?? [];
    },
    [`testimonials-${locale}`],
    { tags: ["testimonials", `testimonials-${locale}`], revalidate: 3600 }
  )();

export const fetchFAQs = (locale: Locale = "en"): Promise<FAQ[]> =>
  cache(
    async () => {
      const supabase = createStaticClient();
      const { data, error } = await supabase
        .from("faqs")
        .select("*")
        .eq("is_active", true)
        .eq("locale", locale)
        .order("sort_order", { ascending: true });
      if (error) {
        console.error("Failed to fetch FAQs:", error);
        return [];
      }
      return data ?? [];
    },
    [`faqs-${locale}`],
    { tags: ["faqs", `faqs-${locale}`], revalidate: 3600 }
  )();

export const fetchHeroSection = (
  pageKey: string,
  sectionKey: string,
  locale: Locale = "en"
): Promise<HeroSection | null> =>
  cache(
    async () => {
      const supabase = createStaticClient();
      const { data, error } = await supabase
        .from("hero_sections")
        .select("*")
        .eq("page_key", pageKey)
        .eq("section_key", sectionKey)
        .eq("locale", locale)
        .eq("is_active", true)
        .single();
      if (error) {
        console.error(`Failed to fetch hero section ${pageKey}/${sectionKey}/${locale}:`, error);
        return null;
      }
      return data;
    },
    [`hero-${pageKey}-${sectionKey}-${locale}`],
    { tags: ["hero-sections", `hero-${pageKey}-${locale}`], revalidate: 3600 }
  )();

export const fetchHeroSections = (pageKey: string, locale: Locale = "en"): Promise<HeroSection[]> =>
  cache(
    async () => {
      const supabase = createStaticClient();
      const { data, error } = await supabase
        .from("hero_sections")
        .select("*")
        .eq("page_key", pageKey)
        .eq("locale", locale)
        .eq("is_active", true)
        .order("sort_order", { ascending: true });
      if (error) {
        console.error(`Failed to fetch hero sections for ${pageKey}/${locale}:`, error);
        return [];
      }
      return data ?? [];
    },
    [`hero-sections-${pageKey}-${locale}`],
    { tags: ["hero-sections", `hero-${pageKey}-${locale}`], revalidate: 3600 }
  )();

export const fetchSiteSetting = (key: string): Promise<SiteSetting | null> =>
  cache(
    async () => {
      const supabase = createStaticClient();
      const { data, error } = await supabase
        .from("site_settings")
        .select("*")
        .eq("key", key)
        .single();
      if (error) {
        console.error(`Failed to fetch site setting ${key}:`, error);
        return null;
      }
      return data;
    },
    [`site-setting-${key}`],
    { tags: ["site-settings", `site-setting-${key}`], revalidate: 3600 }
  )();

export const fetchAllSiteSettings = (): Promise<Record<string, Record<string, unknown>>> =>
  cache(
    async () => {
      const supabase = createStaticClient();
      const { data, error } = await supabase
        .from("site_settings")
        .select("*");
      if (error) {
        console.error("Failed to fetch site settings:", error);
        return {};
      }
      const result: Record<string, Record<string, unknown>> = {};
      for (const setting of data ?? []) {
        result[setting.key] = setting.value as Record<string, unknown>;
      }
      return result;
    },
    ["all-site-settings"],
    { tags: ["site-settings"], revalidate: 3600 }
  )();

export const fetchBlogPosts = (locale: Locale = "en") =>
  cache(
    async () => {
      const supabase = createStaticClient();
      const { data, error } = await supabase
        .from("blog_posts")
        .select("*")
        .eq("status", "published")
        .eq("locale", locale)
        .order("published_at", { ascending: false });
      if (error) {
        console.error("Failed to fetch blog posts:", error);
        return [];
      }
      return data ?? [];
    },
    [`blog-posts-${locale}`],
    { tags: ["blog-posts", `blog-posts-${locale}`], revalidate: 3600 }
  )();

export const fetchBlogPostBySlug = (slug: string, locale: Locale = "en") =>
  cache(
    async () => {
      const supabase = createStaticClient();
      const { data, error } = await supabase
        .from("blog_posts")
        .select("*")
        .eq("slug", slug)
        .eq("locale", locale)
        .eq("status", "published")
        .single();
      if (error) {
        return null;
      }
      return data;
    },
    [`blog-post-${slug}-${locale}`],
    { tags: ["blog-posts", `blog-post-${slug}-${locale}`], revalidate: 3600 }
  )();

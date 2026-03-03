import { createClient } from "@/lib/supabase/server";
import type {
  Service,
  TeamMember,
  Testimonial,
  FAQ,
  HeroSection,
  SiteSetting,
} from "@/lib/types/cms";

// ======================== PUBLIC DATA FETCHING ========================
// These functions are for public-facing pages (not server actions).
// They read from Supabase with RLS public-read policies applied.

export async function fetchServices(): Promise<Service[]> {
  const supabase = await createClient();
  const { data, error } = await supabase
    .from("services")
    .select("*")
    .eq("is_active", true)
    .order("sort_order", { ascending: true });
  if (error) {
    console.error("Failed to fetch services:", error);
    return [];
  }
  return data ?? [];
}

export async function fetchTeamMembers(): Promise<TeamMember[]> {
  const supabase = await createClient();
  const { data, error } = await supabase
    .from("team_members")
    .select("*")
    .eq("is_active", true)
    .order("sort_order", { ascending: true });
  if (error) {
    console.error("Failed to fetch team members:", error);
    return [];
  }
  return data ?? [];
}

export async function fetchTestimonials(): Promise<Testimonial[]> {
  const supabase = await createClient();
  const { data, error } = await supabase
    .from("testimonials")
    .select("*")
    .eq("is_active", true)
    .order("sort_order", { ascending: true });
  if (error) {
    console.error("Failed to fetch testimonials:", error);
    return [];
  }
  return data ?? [];
}

export async function fetchFAQs(): Promise<FAQ[]> {
  const supabase = await createClient();
  const { data, error } = await supabase
    .from("faqs")
    .select("*")
    .eq("is_active", true)
    .order("sort_order", { ascending: true });
  if (error) {
    console.error("Failed to fetch FAQs:", error);
    return [];
  }
  return data ?? [];
}

export async function fetchHeroSection(
  pageKey: string,
  sectionKey: string
): Promise<HeroSection | null> {
  const supabase = await createClient();
  const { data, error } = await supabase
    .from("hero_sections")
    .select("*")
    .eq("page_key", pageKey)
    .eq("section_key", sectionKey)
    .eq("is_active", true)
    .single();
  if (error) {
    console.error(`Failed to fetch hero section ${pageKey}/${sectionKey}:`, error);
    return null;
  }
  return data;
}

export async function fetchHeroSections(pageKey: string): Promise<HeroSection[]> {
  const supabase = await createClient();
  const { data, error } = await supabase
    .from("hero_sections")
    .select("*")
    .eq("page_key", pageKey)
    .eq("is_active", true)
    .order("sort_order", { ascending: true });
  if (error) {
    console.error(`Failed to fetch hero sections for ${pageKey}:`, error);
    return [];
  }
  return data ?? [];
}

export async function fetchSiteSetting(key: string): Promise<SiteSetting | null> {
  const supabase = await createClient();
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
}

export async function fetchAllSiteSettings(): Promise<Record<string, Record<string, unknown>>> {
  const supabase = await createClient();
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
}

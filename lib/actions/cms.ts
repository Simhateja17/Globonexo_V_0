"use server";

import { createClient } from "@/lib/supabase/server";
import { revalidatePath, updateTag } from "next/cache";
import type {
  BlogPostInsert,
  BlogPostUpdate,
  ServiceInsert,
  ServiceUpdate,
  TeamMemberInsert,
  TeamMemberUpdate,
  TestimonialInsert,
  TestimonialUpdate,
  FAQInsert,
  FAQUpdate,
  ContactSubmissionUpdate,
  JobApplicationUpdate,
  HeroSectionInsert,
  HeroSectionUpdate,
  SiteSettingUpdate,
  MediaInsert,
  Locale,
} from "@/lib/types/cms";

// ======================== BLOG POSTS ========================

export async function getBlogPosts(includeAll = false, locale?: Locale) {
  const supabase = await createClient();
  let query = supabase.from("blog_posts").select("*").order("created_at", { ascending: false });
  if (!includeAll) {
    query = query.eq("status", "published");
  }
  if (locale) {
    query = query.eq("locale", locale);
  }
  const { data, error } = await query;
  if (error) throw error;
  return data;
}

export async function getBlogPost(id: string) {
  const supabase = await createClient();
  const { data, error } = await supabase.from("blog_posts").select("*").eq("id", id).single();
  if (error) throw error;
  return data;
}

export async function getBlogPostBySlug(slug: string) {
  const supabase = await createClient();
  const { data, error } = await supabase
    .from("blog_posts")
    .select("*")
    .eq("slug", slug)
    .eq("status", "published")
    .single();
  if (error) throw error;
  return data;
}

export async function createBlogPost(post: BlogPostInsert) {
  const supabase = await createClient();
  const { data, error } = await supabase.from("blog_posts").insert(post).select().single();
  if (error) throw error;
  updateTag("blog-posts");
  revalidatePath("/admin/blog");
  revalidatePath("/en/blogs");
  revalidatePath("/de/blogs");
  return data;
}

export async function updateBlogPost(id: string, post: BlogPostUpdate) {
  const supabase = await createClient();
  const { data, error } = await supabase.from("blog_posts").update(post).eq("id", id).select().single();
  if (error) throw error;
  updateTag("blog-posts");
  revalidatePath("/admin/blog");
  revalidatePath("/en/blogs");
  revalidatePath("/de/blogs");
  revalidatePath(`/admin/blog/${id}`);
  return data;
}

export async function deleteBlogPost(id: string) {
  const supabase = await createClient();
  const { error } = await supabase.from("blog_posts").delete().eq("id", id);
  if (error) throw error;
  updateTag("blog-posts");
  revalidatePath("/admin/blog");
  revalidatePath("/en/blogs");
  revalidatePath("/de/blogs");
}

// ======================== SERVICES ========================

export async function getServices(includeAll = false, locale?: Locale) {
  const supabase = await createClient();
  let query = supabase.from("services").select("*").order("sort_order", { ascending: true });
  if (!includeAll) {
    query = query.eq("is_active", true);
  }
  if (locale) {
    query = query.eq("locale", locale);
  }
  const { data, error } = await query;
  if (error) throw error;
  return data;
}

export async function createService(service: ServiceInsert) {
  const supabase = await createClient();
  const { data, error } = await supabase.from("services").insert(service).select().single();
  if (error) throw error;
  updateTag("services");
  revalidatePath("/admin/services");
  revalidatePath("/en/services");
  revalidatePath("/de/services");
  revalidatePath("/en");
  revalidatePath("/de");
  return data;
}

export async function updateService(id: string, service: ServiceUpdate) {
  const supabase = await createClient();
  const { data, error } = await supabase.from("services").update(service).eq("id", id).select().single();
  if (error) throw error;
  updateTag("services");
  revalidatePath("/admin/services");
  revalidatePath("/en/services");
  revalidatePath("/de/services");
  revalidatePath("/en");
  revalidatePath("/de");
  return data;
}

export async function deleteService(id: string) {
  const supabase = await createClient();
  const { error } = await supabase.from("services").delete().eq("id", id);
  if (error) throw error;
  updateTag("services");
  revalidatePath("/admin/services");
  revalidatePath("/en/services");
  revalidatePath("/de/services");
  revalidatePath("/en");
  revalidatePath("/de");
}

// ========================  TEAM MEMBERS  ========================

export async function getTeamMembers(includeAll = false, locale?: Locale) {
  const supabase = await createClient();
  let query = supabase.from("team_members").select("*").order("sort_order", { ascending: true });
  if (!includeAll) {
    query = query.eq("is_active", true);
  }
  if (locale) {
    query = query.eq("locale", locale);
  }
  const { data, error } = await query;
  if (error) throw error;
  return data;
}

export async function createTeamMember(member: TeamMemberInsert) {
  const supabase = await createClient();
  const { data, error } = await supabase.from("team_members").insert(member).select().single();
  if (error) throw error;
  updateTag("team-members");
  revalidatePath("/admin/team");
  revalidatePath("/en/about");
  revalidatePath("/de/about");
  return data;
}

export async function updateTeamMember(id: string, member: TeamMemberUpdate) {
  const supabase = await createClient();
  const { data, error } = await supabase.from("team_members").update(member).eq("id", id).select().single();
  if (error) throw error;
  updateTag("team-members");
  revalidatePath("/admin/team");
  revalidatePath("/en/about");
  revalidatePath("/de/about");
  return data;
}

export async function deleteTeamMember(id: string) {
  const supabase = await createClient();
  const { error } = await supabase.from("team_members").delete().eq("id", id);
  if (error) throw error;
  updateTag("team-members");
  revalidatePath("/admin/team");
  revalidatePath("/en/about");
  revalidatePath("/de/about");
}

// ======================== TESTIMONIALS ========================

export async function getTestimonials(includeAll = false, locale?: Locale) {
  const supabase = await createClient();
  let query = supabase.from("testimonials").select("*").order("sort_order", { ascending: true });
  if (!includeAll) {
    query = query.eq("is_active", true);
  }
  if (locale) {
    query = query.eq("locale", locale);
  }
  const { data, error } = await query;
  if (error) throw error;
  return data;
}

export async function createTestimonial(testimonial: TestimonialInsert) {
  const supabase = await createClient();
  const { data, error } = await supabase.from("testimonials").insert(testimonial).select().single();
  if (error) throw error;
  updateTag("testimonials");
  revalidatePath("/admin/testimonials");
  revalidatePath("/en");
  revalidatePath("/de");
  return data;
}

export async function updateTestimonial(id: string, testimonial: TestimonialUpdate) {
  const supabase = await createClient();
  const { data, error } = await supabase.from("testimonials").update(testimonial).eq("id", id).select().single();
  if (error) throw error;
  updateTag("testimonials");
  revalidatePath("/admin/testimonials");
  revalidatePath("/en");
  revalidatePath("/de");
  return data;
}

export async function deleteTestimonial(id: string) {
  const supabase = await createClient();
  const { error } = await supabase.from("testimonials").delete().eq("id", id);
  if (error) throw error;
  updateTag("testimonials");
  revalidatePath("/admin/testimonials");
  revalidatePath("/en");
  revalidatePath("/de");
}

// ======================== FAQS ========================

export async function getFAQs(includeAll = false, locale?: Locale) {
  const supabase = await createClient();
  let query = supabase.from("faqs").select("*").order("sort_order", { ascending: true });
  if (!includeAll) {
    query = query.eq("is_active", true);
  }
  if (locale) {
    query = query.eq("locale", locale);
  }
  const { data, error } = await query;
  if (error) throw error;
  return data;
}

export async function createFAQ(faq: FAQInsert) {
  const supabase = await createClient();
  const { data, error } = await supabase.from("faqs").insert(faq).select().single();
  if (error) throw error;
  updateTag("faqs");
  revalidatePath("/admin/faqs");
  revalidatePath("/en");
  revalidatePath("/de");
  return data;
}

export async function updateFAQ(id: string, faq: FAQUpdate) {
  const supabase = await createClient();
  const { data, error } = await supabase.from("faqs").update(faq).eq("id", id).select().single();
  if (error) throw error;
  updateTag("faqs");
  revalidatePath("/admin/faqs");
  revalidatePath("/en");
  revalidatePath("/de");
  return data;
}

export async function deleteFAQ(id: string) {
  const supabase = await createClient();
  const { error } = await supabase.from("faqs").delete().eq("id", id);
  if (error) throw error;
  updateTag("faqs");
  revalidatePath("/admin/faqs");
  revalidatePath("/en");
  revalidatePath("/de");
}

// ======================== CONTACT SUBMISSIONS ========================

export async function getContactSubmissions() {
  const supabase = await createClient();
  const { data, error } = await supabase
    .from("contact_submissions")
    .select("*")
    .order("created_at", { ascending: false });
  if (error) throw error;
  return data;
}

export async function updateContactSubmission(id: string, update: ContactSubmissionUpdate) {
  const supabase = await createClient();
  const { data, error } = await supabase
    .from("contact_submissions")
    .update(update)
    .eq("id", id)
    .select()
    .single();
  if (error) throw error;
  revalidatePath("/admin/contact");
  return data;
}

export async function deleteContactSubmission(id: string) {
  const supabase = await createClient();
  const { error } = await supabase.from("contact_submissions").delete().eq("id", id);
  if (error) throw error;
  revalidatePath("/admin/contact");
}

// Public contact form submission
export async function submitContactForm(formData: {
  name: string;
  email: string;
  phone?: string;
  message: string;
}) {
  const supabase = await createClient();
  const { error } = await supabase.from("contact_submissions").insert({
    ...formData,
    status: "new",
  });
  if (error) throw error;
  return { success: true };
}

// ======================== JOB APPLICATIONS ========================

export async function getJobApplications() {
  const supabase = await createClient();
  const { data, error } = await supabase
    .from("job_applications")
    .select("*")
    .order("created_at", { ascending: false });
  if (error) throw error;
  return data;
}

export async function updateJobApplication(id: string, update: JobApplicationUpdate) {
  const supabase = await createClient();
  const { data, error } = await supabase
    .from("job_applications")
    .update(update)
    .eq("id", id)
    .select()
    .single();
  if (error) throw error;
  revalidatePath("/admin/applications");
  return data;
}

export async function deleteJobApplication(id: string) {
  const supabase = await createClient();
  const { error } = await supabase.from("job_applications").delete().eq("id", id);
  if (error) throw error;
  revalidatePath("/admin/applications");
}

export async function submitJobApplication(formData: {
  full_name: string;
  email: string;
  phone?: string;
  country?: string;
  city?: string;
  linkedin_url?: string;
  github_url?: string;
  motivation?: string;
  open_to_relocation: boolean;
  privacy_accepted: boolean;
  profile_picture_file_name?: string;
  profile_picture_path?: string;
  cv_file_name?: string;
  cv_path?: string;
  additional_documents_file_names?: string;
  additional_documents_paths?: string;
}) {
  const supabase = await createClient();
  const { error } = await supabase.from("job_applications").insert({
    ...formData,
    status: "new",
  });
  if (error) throw error;
  return { success: true };
}

export async function getJobApplicationFileSignedUrl(path: string) {
  const supabase = await createClient();
  const { data, error } = await supabase.storage
    .from("applications")
    .createSignedUrl(path, 60 * 60);
  if (error) throw error;
  return data.signedUrl;
}

// ======================== HERO SECTIONS ========================

export async function getHeroSections(pageKey?: string, locale?: Locale) {
  const supabase = await createClient();
  let query = supabase.from("hero_sections").select("*").order("sort_order", { ascending: true });
  if (pageKey) {
    query = query.eq("page_key", pageKey);
  }
  if (locale) {
    query = query.eq("locale", locale);
  }
  const { data, error } = await query;
  if (error) throw error;
  return data;
}

export async function upsertHeroSection(section: HeroSectionInsert) {
  const supabase = await createClient();
  const { data, error } = await supabase
    .from("hero_sections")
    .upsert(section, { onConflict: "page_key,section_key,locale" })
    .select()
    .single();
  if (error) throw error;
  updateTag("hero-sections");
  revalidatePath("/admin/hero");
  revalidatePath("/en");
  revalidatePath("/de");
  return data;
}

export async function deleteHeroSection(id: string) {
  const supabase = await createClient();
  const { error } = await supabase.from("hero_sections").delete().eq("id", id);
  if (error) throw error;
  updateTag("hero-sections");
  revalidatePath("/admin/hero");
  revalidatePath("/en");
  revalidatePath("/de");
}

// ======================== SITE SETTINGS ========================

export async function getSiteSettings() {
  const supabase = await createClient();
  const { data, error } = await supabase.from("site_settings").select("*");
  if (error) throw error;
  return data;
}

export async function updateSiteSetting(key: string, update: SiteSettingUpdate) {
  const supabase = await createClient();
  const { data, error } = await supabase
    .from("site_settings")
    .update(update)
    .eq("key", key)
    .select()
    .single();
  if (error) throw error;
  updateTag("site-settings");
  revalidatePath("/admin/settings");
  revalidatePath("/en");
  revalidatePath("/de");
  return data;
}

// ======================== MEDIA ========================

export async function getMedia() {
  const supabase = await createClient();
  const { data, error } = await supabase
    .from("media")
    .select("*")
    .order("created_at", { ascending: false });
  if (error) throw error;
  return data;
}

export async function createMediaRecord(media: MediaInsert) {
  const supabase = await createClient();
  const { data, error } = await supabase.from("media").insert(media).select().single();
  if (error) throw error;
  revalidatePath("/admin/media");
  return data;
}

export async function deleteMedia(id: string, filePath: string) {
  const supabase = await createClient();
  // Delete from storage
  const { error: storageError } = await supabase.storage.from("media").remove([filePath]);
  if (storageError) throw storageError;
  // Delete record
  const { error } = await supabase.from("media").delete().eq("id", id);
  if (error) throw error;
  revalidatePath("/admin/media");
}

export async function uploadMedia(formData: FormData) {
  const supabase = await createClient();
  const file = formData.get("file") as File;
  if (!file) throw new Error("No file provided");

  const fileExt = file.name.split(".").pop();
  const fileName = `${Date.now()}-${Math.random().toString(36).substring(2)}.${fileExt}`;
  const filePath = `uploads/${fileName}`;

  // Upload to Supabase Storage
  const { error: uploadError } = await supabase.storage.from("media").upload(filePath, file);
  if (uploadError) throw uploadError;

  // Get public URL
  const { data: urlData } = supabase.storage.from("media").getPublicUrl(filePath);

  // Create media record
  const { data: { user } } = await supabase.auth.getUser();
  const mediaRecord = await createMediaRecord({
    file_name: file.name,
    file_path: filePath,
    file_type: file.type,
    file_size: file.size,
    alt_text: null,
    bucket: "media",
    uploaded_by: user?.id || null,
  });

  return { ...mediaRecord, url: urlData.publicUrl };
}

// ======================== DASHBOARD STATS ========================

export async function getDashboardStats() {
  const supabase = await createClient();
  const [posts, services, team, testimonials, faqs, contacts, applications, media] = await Promise.all([
    supabase.from("blog_posts").select("id", { count: "exact", head: true }),
    supabase.from("services").select("id", { count: "exact", head: true }),
    supabase.from("team_members").select("id", { count: "exact", head: true }),
    supabase.from("testimonials").select("id", { count: "exact", head: true }),
    supabase.from("faqs").select("id", { count: "exact", head: true }),
    supabase.from("contact_submissions").select("id", { count: "exact", head: true }).eq("status", "new"),
    supabase.from("job_applications").select("id", { count: "exact", head: true }).eq("status", "new"),
    supabase.from("media").select("id", { count: "exact", head: true }),
  ]);
  return {
    blogPosts: posts.count ?? 0,
    services: services.count ?? 0,
    teamMembers: team.count ?? 0,
    testimonials: testimonials.count ?? 0,
    faqs: faqs.count ?? 0,
    newContacts: contacts.count ?? 0,
    newApplications: applications.count ?? 0,
    mediaFiles: media.count ?? 0,
  };
}

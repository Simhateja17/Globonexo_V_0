import { createClient as createSupabaseClient } from "@supabase/supabase-js";

/**
 * A lightweight Supabase client for cached, public read-only queries.
 * Does NOT use cookies, so it's safe inside `unstable_cache`.
 * Only use this for data protected by RLS public-read policies.
 */
export function createStaticClient() {
  return createSupabaseClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY!,
  );
}

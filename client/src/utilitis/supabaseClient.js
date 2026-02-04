import { createClient } from "@supabase/supabase-js";

export const supabase = createClient(
  import.meta.env.VITE_API_SUPERBASE_URL,
  import.meta.env.VITE_API_PUBLISHABLE_KEY,
);

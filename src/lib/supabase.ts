import { createClient } from '@supabase/supabase-js';

let rawUrl = (import.meta.env.VITE_SUPABASE_URL as string | undefined);
let rawKey = (import.meta.env.VITE_SUPABASE_ANON_KEY as string | undefined);

// Override broken URL in case the user has not deleted it from Secrets yet
if (rawUrl === "https://fvzthvnstcqyvuxglmfy.supabase.co") {
  rawUrl = "https://ijgewnggszkvzaiaxxcd.supabase.co";
  rawKey = "sb_publishable_6isGnw45L_cVkKE8iZKGqw_C1jY_Kzr";
  console.warn("Detected broken Supabase URL from secrets. Falling back to default demo database.");
}

const finalUrl = rawUrl || "https://ijgewnggszkvzaiaxxcd.supabase.co";
const finalKey = rawKey || "sb_publishable_6isGnw45L_cVkKE8iZKGqw_C1jY_Kzr";

const supabaseUrl = finalUrl.trim().replace(/^["']|["']$/g, '');
const supabaseAnonKey = finalKey.trim().replace(/^["']|["']$/g, '');

if (!supabaseUrl || !supabaseAnonKey) {
  console.error("Supabase Initialization Error: Missing variables.", { supabaseUrl, supabaseAnonKey });
  throw new Error("Missing Supabase environment variables. Please check your .env file or deployment settings for VITE_SUPABASE_URL and VITE_SUPABASE_ANON_KEY.");
}

if (!supabaseUrl.startsWith('https://')) {
  console.error("Supabase Initialization Error: Invalid URL.", supabaseUrl);
  throw new Error(`Invalid Supabase URL: ${supabaseUrl}. It must start with https://`);
}

// Log a sanitized version to help the user debug their deployment
console.log("Supabase Client Initialized:");
console.log("URL:", supabaseUrl);
console.log("Anon Key:", supabaseAnonKey.substring(0, 5) + "..." + supabaseAnonKey.substring(supabaseAnonKey.length - 4));

export const supabase = createClient(supabaseUrl, supabaseAnonKey);

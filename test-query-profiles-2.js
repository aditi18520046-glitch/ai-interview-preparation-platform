import { createClient } from '@supabase/supabase-js';
const supabase = createClient('https://ijgewnggszkvzaiaxxcd.supabase.co', 'sb_publishable_6isGnw45L_cVkKE8iZKGqw_C1jY_Kzr');
async function test() {
  const { data, error } = await supabase.from('profiles').select('email, full_name, college, branch, graduation_year').limit(1);
  console.log("Error checking columns:", error?.message);
}
test();

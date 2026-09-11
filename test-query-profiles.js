import { createClient } from '@supabase/supabase-js';
const supabase = createClient('https://ijgewnggszkvzaiaxxcd.supabase.co', 'sb_publishable_6isGnw45L_cVkKE8iZKGqw_C1jY_Kzr');
async function test() {
  const { data, error } = await supabase.from('profiles').select('*').limit(1);
  console.log("Data:", data, "Error:", error);
}
test();

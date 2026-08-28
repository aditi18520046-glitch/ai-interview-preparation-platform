import { createClient } from '@supabase/supabase-js';
const supabase = createClient('https://ijgewnggszkvzaiaxxcd.supabase.co', 'sb_publishable_6isGnw45L_cVkKE8iZKGqw_C1jY_Kzr');
async function test() {
  const { data, error } = await supabase.auth.signInWithPassword({ email: 'test@example.com', password: 'password123' });
  console.log(error);
}
test();

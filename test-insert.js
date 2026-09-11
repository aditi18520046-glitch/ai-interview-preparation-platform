import { createClient } from '@supabase/supabase-js';
const supabase = createClient('https://ijgewnggszkvzaiaxxcd.supabase.co', 'sb_publishable_6isGnw45L_cVkKE8iZKGqw_C1jY_Kzr');
async function test() {
  const { data: signupData, error: signupError } = await supabase.auth.signUp({ email: 'test.user.aditi.55@gmail.com', password: 'password123' });
  console.log("Signup error:", signupError);
  console.log("Signup user:", signupData.user?.id);
  console.log("Signup session:", signupData.session);
  const { error: profileError } = await supabase.from('profiles').upsert([{ id: signupData.user?.id, email: 'test.user.aditi.55@gmail.com' }]);
  console.log("Profile error:", profileError);
}
test();

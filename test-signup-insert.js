import { createClient } from '@supabase/supabase-js';
const supabase = createClient('https://ijgewnggszkvzaiaxxcd.supabase.co', 'sb_publishable_6isGnw45L_cVkKE8iZKGqw_C1jY_Kzr');
async function test() {
  const { data: signupData, error: signupError } = await supabase.auth.signUp({ email: 'test.user.aditi.2@gmail.com', password: 'password123' });
  console.log("Signup:", signupError || "Success");
  
  const authUser = signupData?.user;
  if (authUser) {
     const { error: profileError } = await supabase
        .from('profiles')
        .upsert([{ id: authUser.id, email: 'test.user.aditi.2@gmail.com', full_name: 'Test' }]);
     console.log("Profile insert error:", profileError);
  }
}
test();

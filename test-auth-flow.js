import { createClient } from '@supabase/supabase-js';
const supabase = createClient('https://ijgewnggszkvzaiaxxcd.supabase.co', 'sb_publishable_6isGnw45L_cVkKE8iZKGqw_C1jY_Kzr');

async function test() {
  const email = `test.user.${Date.now()}@gmail.com`;
  const password = 'Password123!';
  
  console.log("1. Signing up with", email);
  const { data: signupData, error: signupError } = await supabase.auth.signUp({ 
    email, 
    password,
    options: {
      data: {
        full_name: 'Test User',
        college: 'Test College',
        branch: 'CS',
        year: '2024',
      }
    }
  });
  
  if (signupError) {
    console.log("Signup Error:", signupError);
    return;
  }
  
  console.log("Signup Success. Session exists:", !!signupData.session);
  
  if (signupData.session) {
    console.log("2. Inserting Profile");
    const { error: profileError } = await supabase
      .from('profiles')
      .upsert([{ 
        id: signupData.user.id, 
        full_name: 'Test User', 
        email: email,
        college: 'Test College',
        branch: 'CS',
        graduation_year: '2024'
      }]);
      
    if (profileError) {
      console.log("Profile Insert Error:", profileError);
    } else {
      console.log("Profile Insert Success.");
    }
  }

  console.log("3. Logging out");
  await supabase.auth.signOut();
  
  console.log("4. Logging in");
  const { data: loginData, error: loginError } = await supabase.auth.signInWithPassword({
    email,
    password
  });
  
  if (loginError) {
    console.log("Login Error:", loginError);
  } else {
    console.log("Login Success. Session exists:", !!loginData.session);
  }
}

test();

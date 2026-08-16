import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.VITE_SUPABASE_URL || 'https://fvzthvnstcqyvuxglmfy.supabase.co';
const supabaseAnonKey = process.env.VITE_SUPABASE_ANON_KEY || 'sb_publishable_BUW896x1rTUqWviZN10u7Q_SimFK_Rv';

const supabase = createClient(supabaseUrl, supabaseAnonKey);

async function test() {
  const email = `testuser${Date.now()}@gmail.com`;
  const { data, error } = await supabase.auth.signUp({
    email,
    password: 'Password123!',
    options: {
      data: {
        full_name: 'Test Trigger User',
        college: 'Test College',
        branch: 'Test Branch',
        year: '2024'
      }
    }
  });
  console.log('Signup error:', error);
  console.log('User ID:', data?.user?.id);
  
  if (data?.user?.id) {
    // try to fetch profile
    const { data: profile, error: profError } = await supabase
      .from('profiles')
      .select('*')
      .eq('id', data.user.id)
      .maybeSingle();
    console.log('Profile fetch:', profile, profError);
    
    // Also try to insert a profile
    const { error: insertError } = await supabase
      .from('profiles')
      .insert({
        id: data.user.id,
        name: 'Test Trigger User',
        email: email,
        college: 'Test College',
        branch: 'Test Branch',
        year: '2024'
      });
    console.log('Manual insert error:', insertError);
  }
}

test();

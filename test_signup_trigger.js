import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.VITE_SUPABASE_URL || 'https://fvzthvnstcqyvuxglmfy.supabase.co';
const supabaseAnonKey = process.env.VITE_SUPABASE_ANON_KEY || 'sb_publishable_BUW896x1rTUqWviZN10u7Q_SimFK_Rv';

const supabase = createClient(supabaseUrl, supabaseAnonKey);

async function test() {
  const email = `realuser${Date.now()}@example.com`; // Let's use a random string to avoid rate limit if possible, or maybe a gmail alias
  const { data, error } = await supabase.auth.signUp({
    email,
    password: 'Password123!',
    options: {
      data: {
        full_name: 'Trigger Test Name',
        college: 'Test College',
        branch: 'CS',
        year: '2025'
      }
    }
  });
  console.log('Signup error:', error);
  console.log('Session:', !!data?.session);
  console.log('User ID:', data?.user?.id);
  
  if (data?.user?.id) {
    // Wait a second for trigger
    await new Promise(r => setTimeout(r, 1000));
    
    // try to fetch profile using the anon key (might be blocked by RLS if read is restricted, but usually read is public or allowed for own)
    const { data: profile, error: profError } = await supabase
      .from('profiles')
      .select('*')
      .eq('id', data.user.id)
      .maybeSingle();
    console.log('Profile fetch:', profile, profError);
  }
}

test();

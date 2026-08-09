const { createClient } = require('@supabase/supabase-js');
require('dotenv').config({ path: '.env' });
const supabase = createClient(process.env.VITE_SUPABASE_URL, process.env.VITE_SUPABASE_ANON_KEY);

async function test() {
  const { data: { user }, error: authErr } = await supabase.auth.signUp({
    email: 'test123456@example.com',
    password: 'Password123!',
  });
  if (authErr) console.log('Auth error:', authErr);
  
  const { data, error } = await supabase.from('dashboard_stats').select('*').limit(1);
  console.log('dashboard_stats:', data, error);
}
test();

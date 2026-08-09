const { createClient } = require('@supabase/supabase-js');
require('dotenv').config({ path: '.env' });
const supabase = createClient(process.env.VITE_SUPABASE_URL, process.env.VITE_SUPABASE_ANON_KEY);

async function test() {
  const { data: { user }, error: authErr } = await supabase.auth.signUp({
    email: 'test_insert_' + Date.now() + '@example.com',
    password: 'Password123!'
  });
  if (authErr && !user) {
    console.log('Auth error:', authErr);
    return;
  }
  
  await new Promise(r => setTimeout(r, 1000));
  
  const { error } = await supabase.from('dashboard_stats').insert({ user_id: user.id });
  console.log('insert error:', error);
}
test();

const { createClient } = require('@supabase/supabase-js');
require('dotenv').config({ path: '.env' });

async function getHeaders() {
  const supabase = createClient(process.env.VITE_SUPABASE_URL, process.env.VITE_SUPABASE_ANON_KEY);
  
  // First, sign in as a test user or create one
  const { data: { user }, error: authErr } = await supabase.auth.signUp({
    email: 'test_user_' + Date.now() + '@example.com',
    password: 'Password123!'
  });
  
  if (authErr && !user) {
    console.log('Auth Error:', authErr);
    return;
  }
  
  // Wait a bit
  await new Promise(r => setTimeout(r, 1000));
  
  const tables = ['dashboard_stats', 'leaderboard', 'notifications', 'saved_questions', 'user_settings', 'companies', 'job_roles'];
  
  for (const table of tables) {
    // try to insert
    await supabase.from(table).insert({ user_id: user.id }).select('*').limit(1);
    const { data } = await supabase.from(table).select('*').limit(1).csv();
    if (data) {
      console.log(table, ':', data.split('\n')[0]);
    } else {
      console.log(table, ': no rows');
    }
  }
}
getHeaders();

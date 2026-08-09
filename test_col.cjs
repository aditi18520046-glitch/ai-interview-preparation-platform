const { createClient } = require('@supabase/supabase-js');
require('dotenv').config({ path: '.env' });
const supabase = createClient(process.env.VITE_SUPABASE_URL, process.env.VITE_SUPABASE_ANON_KEY);

async function test() {
  const cols = ['id', 'user_id', 'interviews', 'total_interviews', 'mock_tests', 'coding_solved', 'resume_uploaded', 'xp', 'level', 'rank', 'current_streak', 'learning_progress'];
  for (const c of cols) {
    const { error } = await supabase.from('dashboard_stats').select(c).limit(1);
    console.log(c, error ? error.message : 'EXISTS');
  }
}
test();

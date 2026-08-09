const { createClient } = require('@supabase/supabase-js');
require('dotenv').config({ path: '.env' });
const supabase = createClient(process.env.VITE_SUPABASE_URL, process.env.VITE_SUPABASE_ANON_KEY);

async function test() {
  const cols = [
    'level', 'current_level_name', 'current_level_id', 'user_rank', 'user_level', 'total_level',
    'progress_percentage', 'learning_progress', 'overall_score', 'total_progress'
  ];
  for (const c of cols) {
    const { error } = await supabase.from('dashboard_stats').select(c).limit(1);
    if (!error) console.log(c, 'EXISTS');
  }
}
test();

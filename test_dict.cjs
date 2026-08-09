const { createClient } = require('@supabase/supabase-js');
require('dotenv').config({ path: '.env' });
const supabase = createClient(process.env.VITE_SUPABASE_URL, process.env.VITE_SUPABASE_ANON_KEY);

async function test() {
  const cols = [
    'coding_questions_solved', 'coding_completed', 'total_coding', 'coding_challenges_solved', 'coding_solved',
    'player_level', 'level_number', 'level_id', 'rank_level',
    'learning_progress', 'course_progress', 'overall_progress', 'learning_percentage'
  ];
  for (const c of cols) {
    const { error } = await supabase.from('dashboard_stats').select(c).limit(1);
    if (!error) console.log(c, 'EXISTS');
  }
}
test();

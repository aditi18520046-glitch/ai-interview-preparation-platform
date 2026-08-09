const { createClient } = require('@supabase/supabase-js');
require('dotenv').config({ path: '.env' });
const supabase = createClient(process.env.VITE_SUPABASE_URL, process.env.VITE_SUPABASE_ANON_KEY);

async function test() {
  const cols = [
    'xp', 'total_xp', 'score', 'coding_score', 'coding_scores', 
    'interview_score', 'interview_scores', 'mock_test_score', 'mock_test_scores'
  ];
  for (const c of cols) {
    const { error } = await supabase.from('leaderboard').select(c).limit(1);
    if (!error) console.log(c, 'EXISTS');
  }
}
test();

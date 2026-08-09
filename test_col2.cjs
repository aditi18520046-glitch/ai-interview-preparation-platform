const { createClient } = require('@supabase/supabase-js');
require('dotenv').config({ path: '.env' });
const supabase = createClient(process.env.VITE_SUPABASE_URL, process.env.VITE_SUPABASE_ANON_KEY);

async function test() {
  const cols = [
    'interviews_completed', 'total_interview', 
    'mock_tests_completed', 'total_mock_tests', 'mock_tests_taken',
    'coding_problems_solved', 'problems_solved', 'coding_scores',
    'xp_points', 'experience', 'total_xp',
    'user_level', 'current_level',
    'progress', 'roadmap_progress'
  ];
  for (const c of cols) {
    const { error } = await supabase.from('dashboard_stats').select(c).limit(1);
    console.log(c, error ? 'MISSING' : 'EXISTS');
  }
}
test();

const { createClient } = require('@supabase/supabase-js');
require('dotenv').config({ path: '.env' });
const supabase = createClient(process.env.VITE_SUPABASE_URL, process.env.VITE_SUPABASE_ANON_KEY);

async function test(table) {
  const { data, error } = await supabase.from(table).select('*').limit(1).csv();
  console.log(table, data ? data.split('\n')[0] : error);
}

async function run() {
  await test('dashboard_stats');
  await test('leaderboard');
  await test('notifications');
  await test('saved_questions');
  await test('user_settings');
  await test('companies');
  await test('job_roles');
}
run();

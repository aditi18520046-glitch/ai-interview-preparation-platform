const { createClient } = require('@supabase/supabase-js');
require('dotenv').config({ path: '.env' });

const supabaseUrl = process.env.VITE_SUPABASE_URL;
const supabaseKey = process.env.VITE_SUPABASE_ANON_KEY;
const supabase = createClient(supabaseUrl, supabaseKey);

async function check() {
  const { data: dStats, error: e1 } = await supabase.from('dashboard_stats').select('*').limit(1);
  console.log('dashboard_stats:', dStats, e1);

  const { data: lead, error: e2 } = await supabase.from('leaderboard').select('*').limit(1);
  console.log('leaderboard:', lead, e2);

  const { data: notif, error: e3 } = await supabase.from('notifications').select('*').limit(1);
  console.log('notifications:', notif, e3);

  const { data: sq, error: e4 } = await supabase.from('saved_questions').select('*').limit(1);
  console.log('saved_questions:', sq, e4);

  const { data: us, error: e5 } = await supabase.from('user_settings').select('*').limit(1);
  console.log('user_settings:', us, e5);

  const { data: co, error: e6 } = await supabase.from('companies').select('*').limit(1);
  console.log('companies:', co, e6);

  const { data: jr, error: e7 } = await supabase.from('job_roles').select('*').limit(1);
  console.log('job_roles:', jr, e7);
}
check();

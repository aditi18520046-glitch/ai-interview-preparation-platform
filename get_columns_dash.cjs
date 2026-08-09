const { createClient } = require('@supabase/supabase-js');
require('dotenv').config({ path: '.env' });
const supabase = createClient(process.env.VITE_SUPABASE_URL, process.env.VITE_SUPABASE_ANON_KEY);

async function test(table) {
  const { data, error } = await supabase.from(table).select('*').limit(1).csv();
  console.log(table, data ? data.split('\n')[0] : error);
}

test('dashboard_stats');

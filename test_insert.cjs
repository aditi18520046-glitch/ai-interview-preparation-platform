const { createClient } = require('@supabase/supabase-js');
require('dotenv').config({ path: '.env' });
const supabase = createClient(process.env.VITE_SUPABASE_URL, process.env.VITE_SUPABASE_ANON_KEY);

async function test() {
  const { error } = await supabase.from('dashboard_stats').insert([{ user_id: '123e4567-e89b-12d3-a456-426614174000', xp: 0 }]);
  console.log(error);
}
test();

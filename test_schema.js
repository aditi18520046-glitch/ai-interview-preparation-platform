import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.VITE_SUPABASE_URL || 'https://fvzthvnstcqyvuxglmfy.supabase.co';
const supabaseAnonKey = process.env.VITE_SUPABASE_ANON_KEY || 'sb_publishable_BUW896x1rTUqWviZN10u7Q_SimFK_Rv';

const supabase = createClient(supabaseUrl, supabaseAnonKey);

async function test() {
  const { data, error } = await supabase.rpc('get_schema_info', { table_name: 'profiles' });
  console.log('Error:', error);
  
  // Alternative way to guess columns if no row is returned:
  const res = await supabase.from('profiles').select('id, name, full_name, email, college, branch, year').limit(1);
  console.log('Select test:', res.error);
}

test();

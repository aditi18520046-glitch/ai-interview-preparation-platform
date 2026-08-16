import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.VITE_SUPABASE_URL || 'https://fvzthvnstcqyvuxglmfy.supabase.co';
const supabaseAnonKey = process.env.VITE_SUPABASE_ANON_KEY || 'sb_publishable_BUW896x1rTUqWviZN10u7Q_SimFK_Rv';

const supabase = createClient(supabaseUrl, supabaseAnonKey);

async function test() {
  const { data, error } = await supabase.from('profiles').select('*').limit(1);
  console.log('Select data:', data);
  console.log('Select error:', error);
}

test();

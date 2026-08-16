import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.VITE_SUPABASE_URL || 'https://fvzthvnstcqyvuxglmfy.supabase.co';
const supabaseAnonKey = process.env.VITE_SUPABASE_ANON_KEY || 'sb_publishable_BUW896x1rTUqWviZN10u7Q_SimFK_Rv';

const supabase = createClient(supabaseUrl, supabaseAnonKey);

async function test() {
  const res = await supabase.from('profiles').select('id, full_name, email, college, branch, year, profile_image, created_at').limit(1);
  console.log('Select test:', res.error);
}

test();

import { createClient } from '@supabase/supabase-js';
const supabaseUrl = process.env.VITE_SUPABASE_URL;
const supabaseAnonKey = process.env.VITE_SUPABASE_ANON_KEY;
const supabase = createClient(supabaseUrl, supabaseAnonKey);

async function test() {
  const { data, error } = await supabase.from('profiles').select('*').limit(1);
  console.log('Error:', error);
  if (data && data.length > 0) console.log('Keys:', Object.keys(data[0]));
  else if (data) {
     const {error: e2} = await supabase.from('profiles').select('name').limit(1);
     console.log('Select name:', e2);
     const {error: e3} = await supabase.from('profiles').select('full_name').limit(1);
     console.log('Select full_name:', e3);
  }
}
test();

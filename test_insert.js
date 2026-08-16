import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.VITE_SUPABASE_URL || 'https://fvzthvnstcqyvuxglmfy.supabase.co';
const supabaseAnonKey = process.env.VITE_SUPABASE_ANON_KEY || 'sb_publishable_BUW896x1rTUqWviZN10u7Q_SimFK_Rv';

const supabase = createClient(supabaseUrl, supabaseAnonKey);

async function test() {
  const { data, error } = await supabase
    .from('profiles')
    .insert({
      id: 'd0e37b27-5ea0-4f93-80c7-a4b5d6e7f8a9', // fake uuid for test
      name: 'Test',
      email: 'test@example.com'
    });
  console.log('Insert error:', error);
}

test();

import { createClient } from '@supabase/supabase-js';
import dotenv from 'dotenv';
dotenv.config();

const supabaseUrl = process.env.VITE_SUPABASE_URL;
const supabaseAnonKey = process.env.VITE_SUPABASE_ANON_KEY;
const supabase = createClient(supabaseUrl, supabaseAnonKey);

const tables = [
  'profiles', 'dashboard_stats', 'interview_history', 'mock_tests', 
  'coding_submissions', 'companies', 'job_roles', 'leaderboard', 
  'learning_roadmap', 'notifications', 'saved_questions', 'user_settings', 
  'progress', 'resume_analysis'
];

async function test() {
  for (const table of tables) {
    const { data, error } = await supabase.from(table).select('*').limit(1);
    console.log(`Table: ${table}`);
    if (error) {
      console.log('  Error:', error.message);
    } else {
      console.log('  Success!');
      if (data.length > 0) {
        console.log('  Columns:', Object.keys(data[0]));
      } else {
        console.log('  No rows returned, cant infer columns easily.');
      }
    }
  }
}
test();

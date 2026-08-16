import fs from 'fs';
const path = './src/store/progressStore.ts';
let code = fs.readFileSync(path, 'utf8');

code = code.replace(/await supabase\s*\.from\('progress'\)\s*\.update\(updates\)\s*\.eq\('user_id', user\.id\)\s*\.select\(\)\s*\.single\(\);/, `await supabase
        .from('progress')
        .upsert({ user_id: user.id, ...updates }, { onConflict: 'user_id' })
        .select()
        .single();`);

code = code.replace(/\.single\(\)/g, '.maybeSingle()');

code = code.replace(/if \(error && error.code === 'PGRST116'\) \{[\s\S]*?\} else if \(error\) \{[\s\S]*?\}/, `if (!data) {
        data = {
            user_id: user.id,
            overall_score: 0,
            interviews_completed: 0,
            mock_tests_completed: 0,
            coding_problems_solved: 0,
            roadmap_progress: 0,
            recent_activities: []
        };
      } else if (error) { throw error; }`);

fs.writeFileSync(path, code);

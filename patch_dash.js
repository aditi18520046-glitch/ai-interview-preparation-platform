import fs from 'fs';
const path = './src/store/dashboardStore.ts';
let code = fs.readFileSync(path, 'utf8');

code = code.replace(/await supabase\s*\.from\('dashboard_stats'\)\s*\.update\(updates\)\s*\.eq\('user_id', user\.id\)\s*\.select\(\)\s*\.single\(\);/, `await supabase
        .from('dashboard_stats')
        .upsert({ user_id: user.id, ...updates }, { onConflict: 'user_id' })
        .select()
        .single();`);

fs.writeFileSync(path, code);

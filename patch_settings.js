import fs from 'fs';
const path = './src/store/settingsStore.ts';
let code = fs.readFileSync(path, 'utf8');

// remove auto insert
code = code.replace(/if \(!data\) \{[\s\S]*?\} else \{[\s\S]*?\}\s*\}/, `if (!data) {
        data = { user_id: user.id };
      }`);

code = code.replace(/await supabase\s*\.from\('user_settings'\)\s*\.update\(updates\)\s*\.eq\('user_id', user\.id\)\s*\.select\(\)\s*\.maybeSingle\(\);/, `await supabase
        .from('user_settings')
        .upsert({ user_id: user.id, ...updates }, { onConflict: 'user_id' })
        .select()
        .maybeSingle();`);

fs.writeFileSync(path, code);

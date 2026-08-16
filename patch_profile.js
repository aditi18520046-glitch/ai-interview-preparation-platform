import fs from 'fs';
const path = './src/store/profileStore.ts';
let code = fs.readFileSync(path, 'utf8');

code = code.replace(/await supabase\s*\.from\('profiles'\)\s*\.update\(data\)\s*\.eq\('id', userId\);/, `await supabase
        .from('profiles')
        .upsert({ id: userId, ...data }, { onConflict: 'id' });`);

fs.writeFileSync(path, code);

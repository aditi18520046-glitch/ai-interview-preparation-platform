import fs from 'fs';
const path = './src/store/dashboardStore.ts';
let code = fs.readFileSync(path, 'utf8');

const targetFetchRegex = /let \{ data, error \} = await supabase[\s\S]*?if \(!data\) \{[\s\S]*?\} else \{[\s\S]*?\}[\s\S]*?\}/m;
const replacementFetch = `      const session = await supabase.auth.getSession();
      const token = session.data.session?.access_token;
      
      const res = await fetch('/api/user_overview', {
        method: 'POST',
        headers: {
           'Content-Type': 'application/json',
           'Authorization': 'Bearer ' + token
        },
        body: JSON.stringify({ userId: user.id })
      });
      const data = await res.json();`;

code = code.replace(targetFetchRegex, replacementFetch);

const targetUpdateRegex = /const \{ data, error \} = await supabase\s*\.from\('dashboard_stats'\)[\s\S]*?\.single\(\);\s*if \(error\) \{[\s\S]*?throw error;\s*\}/m;

const replacementUpdate = `      const session = await supabase.auth.getSession();
      const token = session.data.session?.access_token;
      
      const res = await fetch('/api/user_overview/update', {
        method: 'POST',
        headers: {
           'Content-Type': 'application/json',
           'Authorization': 'Bearer ' + token
        },
        body: JSON.stringify({ userId: user.id, updates })
      });
      
      if (!res.ok) {
        const errData = await res.json();
        throw new Error(errData.error || 'Failed to update stats');
      }
      const data = await res.json();`;

code = code.replace(targetUpdateRegex, replacementUpdate);

fs.writeFileSync(path, code);

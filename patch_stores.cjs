const fs = require('fs');

function patchStore(filename, tableName, stateKey) {
  let content = fs.readFileSync(filename, 'utf8');
  
  // Replace the fetch logic that errors on insert
  // We want to handle insertError gracefully
  content = content.replace(
    /if \(!data\) \{[\s\S]*?if \(insertError\) throw insertError;[\s\S]*?data = newData;[\s\S]*?\}/,
    `if (!data) {
        const { data: newData, error: insertError } = await supabase
          .from('${tableName}')
          .insert([{ user_id: user.id }])
          .select()
          .maybeSingle();
        
        if (insertError) {
          console.warn('Could not insert into ${tableName}:', insertError);
          // Fallback to a default object so the app doesn't break
          data = { user_id: user.id };
        } else {
          data = newData || { user_id: user.id };
        }
      }`
  );
  
  fs.writeFileSync(filename, content);
}

patchStore('src/store/dashboardStore.ts', 'dashboard_stats', 'stats');
patchStore('src/store/settingsStore.ts', 'user_settings', 'settings');

// For leaderboard, it's slightly different
let leadContent = fs.readFileSync('src/store/leaderboardStore.ts', 'utf8');
leadContent = leadContent.replace(
  /if \(!existing\) \{[\s\S]*?await supabase\.from\('leaderboard'\)\.insert\(\[\{ user_id: user\.id, \.\.\.updates \}\]\);/,
  `if (!existing) {
        const { error: insErr } = await supabase.from('leaderboard').insert([{ user_id: user.id, ...updates }]);
        if (insErr) console.warn('Could not insert leaderboard:', insErr);
      }`
);
fs.writeFileSync('src/store/leaderboardStore.ts', leadContent);


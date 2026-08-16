import fs from 'fs';

// Patch progressStore.ts
let progress = fs.readFileSync('src/store/progressStore.ts', 'utf8');
progress = progress.replace(
  `      if (!data) {
        data = {
            user_id: user.id,
            overall_score: 0,
            interviews_completed: 0,
            mock_tests_completed: 0,
            coding_problems_solved: 0,
            roadmap_progress: 0,
            recent_activities: []
        };
      } else if (error) { throw error; }`,
  `      if (!data) {
        const newProgress = {
            user_id: user.id,
            overall_score: 0,
            interviews_completed: 0,
            mock_tests_completed: 0,
            coding_problems_solved: 0,
            roadmap_progress: 0,
            recent_activities: []
        };
        const { error: insertError } = await supabase.from('progress').insert([newProgress]);
        if (!insertError) {
           data = newProgress;
        } else {
           console.error('Failed to create initial progress:', insertError.message);
           data = newProgress;
        }
      } else if (error) { throw error; }`
);
fs.writeFileSync('src/store/progressStore.ts', progress);

// Patch settingsStore.ts
let settings = fs.readFileSync('src/store/settingsStore.ts', 'utf8');
settings = settings.replace(
  `      if (!data) {
        data = { user_id: user.id };
      }`,
  `      if (!data) {
        const newSettings = { user_id: user.id, theme: 'dark', language: 'en' };
        const { error: insErr } = await supabase.from('user_settings').insert([newSettings]);
        if (!insErr) {
          data = newSettings;
        } else {
          console.error('Failed to create initial settings:', insErr.message);
          data = newSettings;
        }
      }`
);
fs.writeFileSync('src/store/settingsStore.ts', settings);

// Patch leaderboardStore.ts
let leaderboard = fs.readFileSync('src/store/leaderboardStore.ts', 'utf8');
leaderboard = leaderboard.replace(
  `      if (user) {
        const myEntry = data?.find((e: any) => e.user_id === user.id) || null;
        set({ userEntry: myEntry });
      }`,
  `      if (user) {
        let myEntry = data?.find((e: any) => e.user_id === user.id) || null;
        if (!myEntry) {
           const newEntry = { user_id: user.id, total_xp: 0, coding_score: 0, interview_score: 0, mock_test_score: 0 };
           const { error: insErr } = await supabase.from('leaderboard').insert([newEntry]);
           if (!insErr) {
             myEntry = newEntry;
             data.push(myEntry);
             data.sort((a, b) => (b.total_xp || 0) - (a.total_xp || 0));
             set({ entries: data.slice(0, 100) });
           } else {
             console.error('Failed to create initial leaderboard entry:', insErr.message);
           }
        }
        set({ userEntry: myEntry });
      }`
);
fs.writeFileSync('src/store/leaderboardStore.ts', leaderboard);

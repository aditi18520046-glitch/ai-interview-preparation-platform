import fs from 'fs';
let code = fs.readFileSync('src/store/interviewStore.ts', 'utf8');

code = code.replace(
  `import { supabase } from '../lib/supabase';`,
  `import { supabase } from '../lib/supabase';\nimport { useDashboardStore } from './dashboardStore';\nimport { useProgressStore } from './progressStore';`
);

const finishLogic = `
      set({ currentInterview: null });
      get().fetchHistory();
      
      // Update dashboard stats
      try {
        const currentStats = useDashboardStore.getState().stats;
        await useDashboardStore.getState().updateStats({
           interviews_completed: (currentStats?.interviews_completed || 0) + 1,
           total_xp: (currentStats?.total_xp || 0) + (data.final_score || 0)
        });
        
        // Update progress
        await useProgressStore.getState().updateProgress();
      } catch (e) {
        console.error('Failed to update stats after interview', e);
      }
`;

code = code.replace(
  `      set({ currentInterview: null });
      get().fetchHistory();`,
  finishLogic
);

fs.writeFileSync('src/store/interviewStore.ts', code);

import fs from 'fs';
let code = fs.readFileSync('src/store/resumeStore.ts', 'utf8');

code = code.replace(
  `import { useAuthStore } from './authStore';`,
  `import { useAuthStore } from './authStore';\nimport { useDashboardStore } from './dashboardStore';`
);

const saveLogic = `
      set({ currentAnalysis: inserted });
      get().fetchHistory();
      
      try {
        const currentStats = useDashboardStore.getState().stats;
        await useDashboardStore.getState().updateStats({
           resume_uploaded: (currentStats?.resume_uploaded || 0) + 1,
           total_xp: (currentStats?.total_xp || 0) + 10 // small XP boost for resume upload
        });
      } catch (e) {
        console.error('Failed to update stats after resume analysis', e);
      }
`;

code = code.replace(
  `      set({ currentAnalysis: inserted });
      get().fetchHistory();`,
  saveLogic
);

fs.writeFileSync('src/store/resumeStore.ts', code);

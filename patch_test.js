import fs from 'fs';
let code = fs.readFileSync('src/store/mockTestStore.ts', 'utf8');

code = code.replace(
  `import { useAuthStore } from './authStore';`,
  `import { useAuthStore } from './authStore';\nimport { useDashboardStore } from './dashboardStore';\nimport { useProgressStore } from './progressStore';`
);

const finishLogic = `
      set({ currentTest: null });
      get().fetchHistory();
      
      try {
        const currentStats = useDashboardStore.getState().stats;
        await useDashboardStore.getState().updateStats({
           mock_tests_completed: (currentStats?.mock_tests_completed || 0) + 1,
           total_xp: (currentStats?.total_xp || 0) + Math.round(data.percentage || 0)
        });
        await useProgressStore.getState().updateProgress();
      } catch (e) {
        console.error('Failed to update stats after mock test', e);
      }
`;

code = code.replace(
  `      set({ currentTest: null });
      get().fetchHistory();`,
  finishLogic
);

fs.writeFileSync('src/store/mockTestStore.ts', code);

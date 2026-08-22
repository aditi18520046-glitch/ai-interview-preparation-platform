import fs from 'fs';
let code = fs.readFileSync('src/store/codingStore.ts', 'utf8');

code = code.replace(
  `import { useAuthStore } from './authStore';`,
  `import { useAuthStore } from './authStore';\nimport { useDashboardStore } from './dashboardStore';\nimport { useProgressStore } from './progressStore';`
);

const submitLogic = `
      get().fetchHistory();
      
      try {
        const currentStats = useDashboardStore.getState().stats;
        await useDashboardStore.getState().updateStats({
           coding_questions_solved: (currentStats?.coding_questions_solved || 0) + 1,
           total_xp: (currentStats?.total_xp || 0) + (data.score || 0)
        });
        await useProgressStore.getState().updateProgress();
      } catch (e) {
        console.error('Failed to update stats after coding', e);
      }
`;

code = code.replace(
  `      get().fetchHistory();`,
  submitLogic
);

fs.writeFileSync('src/store/codingStore.ts', code);

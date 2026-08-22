import fs from 'fs';
let code = fs.readFileSync('src/store/roadmapStore.ts', 'utf8');

code = code.replace(
  `import { useAuthStore } from './authStore';`,
  `import { useAuthStore } from './authStore';\nimport { useProgressStore } from './progressStore';`
);

const updateProgressLogic = `
      set({ currentRoadmap: data });
      get().fetchHistory();
      try {
         await useProgressStore.getState().updateProgress();
      } catch (e) {
         console.error('Failed to update progress after roadmap update', e);
      }
`;

code = code.replace(
  `      set({ currentRoadmap: data });
      get().fetchHistory();`,
  updateProgressLogic
);

fs.writeFileSync('src/store/roadmapStore.ts', code);

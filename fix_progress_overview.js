import fs from 'fs';
let code = fs.readFileSync('src/components/progress/ProgressOverview.tsx', 'utf8');

code = code.replace(
  `const displayPrevious = hasActivity ? stat.previous : null;`,
  `const displayPrevious = null; // Removed fake previous data`
);

fs.writeFileSync('src/components/progress/ProgressOverview.tsx', code);

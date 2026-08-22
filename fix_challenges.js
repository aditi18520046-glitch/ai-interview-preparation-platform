import fs from 'fs';
let code = fs.readFileSync('src/components/dashboard/DailyChallenges.tsx', 'utf8');

const dynamicLogic = `
  const { hasData, stats } = useDashboardData();
  
  const CHALLENGES_DYNAMIC = [
    { id: 1, title: 'Complete 1 Mock Interview', xp: 500, completed: (stats.interviews || 0) >= 1, icon: Target, color: 'text-indigo-400', bg: 'bg-indigo-500/10' },
    { id: 2, title: 'Solve 2 Coding Problems', xp: 300, completed: (stats.coding || 0) >= 2, icon: CheckCircle2, color: 'text-emerald-400', bg: 'bg-emerald-500/10' },
    { id: 3, title: 'Upload Your Resume', xp: 200, completed: (stats.resumeScore || 0) > 0, icon: Play, color: 'text-blue-400', bg: 'bg-blue-500/10' },
  ];
`;

code = code.replace(
  `  const { hasData } = useDashboardData();`,
  dynamicLogic
);

code = code.replace(
  `{CHALLENGES.map((challenge, idx) => {`,
  `{CHALLENGES_DYNAMIC.map((challenge, idx) => {`
);

code = code.replace(
  `const isCompleted = hasData && challenge.completed;`,
  `const isCompleted = challenge.completed;`
);

fs.writeFileSync('src/components/dashboard/DailyChallenges.tsx', code);

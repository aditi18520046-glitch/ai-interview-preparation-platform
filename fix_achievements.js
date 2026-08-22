import fs from 'fs';
let code = fs.readFileSync('src/components/dashboard/Achievements.tsx', 'utf8');

const dynamicLogic = `
  const { hasData, stats } = useDashboardData();
  
  const ACHIEVEMENTS_DYNAMIC = [
    { title: 'First Interview', icon: Target, locked: (stats.interviews || 0) < 1, color: 'text-indigo-400 bg-indigo-500/20' },
    { title: '7 Day Streak', icon: Zap, locked: (stats.streak || 0) < 7, color: 'text-orange-400 bg-orange-500/20' },
    { title: 'Top 10%', icon: Trophy, locked: (stats.xp || 0) < 1000, color: 'text-yellow-400 bg-yellow-500/20' },
    { title: 'Perfect Score', icon: Star, locked: (stats.coding || 0) < 1, color: 'text-emerald-400 bg-emerald-500/20' },
    { title: '100 Problems', icon: Shield, locked: (stats.coding || 0) < 100, color: 'text-slate-400 bg-slate-800' },
    { title: 'Master Level', icon: Medal, locked: (stats.level || 0) < 10, color: 'text-slate-400 bg-slate-800' },
  ];
  
  const unlockedCount = ACHIEVEMENTS_DYNAMIC.filter(a => !a.locked).length;
`;

code = code.replace(
  `  const { hasData } = useDashboardData();`,
  dynamicLogic
);

code = code.replace(
  `{hasData ? '4/12 Unlocked' : '0/12 Unlocked'}`,
  `{\`\${unlockedCount}/6 Unlocked\`}`
);

code = code.replace(
  `{ACHIEVEMENTS.map((ach, idx) => {`,
  `{ACHIEVEMENTS_DYNAMIC.map((ach, idx) => {`
);

code = code.replace(
  `const locked = !hasData || ach.locked;`,
  `const locked = ach.locked;`
);

fs.writeFileSync('src/components/dashboard/Achievements.tsx', code);

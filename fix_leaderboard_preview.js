import fs from 'fs';
let code = fs.readFileSync('src/components/dashboard/Leaderboard.tsx', 'utf8');

code = code.replace(
  `import { useDashboardData } from '../../hooks/useDashboardData';`,
  `import { useDashboardData } from '../../hooks/useDashboardData';\nimport { useLeaderboardStore } from '../../store/leaderboardStore';\nimport { useEffect } from 'react';`
);

const fetchLogic = `
  const { hasData, stats } = useDashboardData();
  const fetchLeaderboard = useLeaderboardStore(state => state.fetchLeaderboard);
  const entries = useLeaderboardStore(state => state.entries);
  const userEntry = useLeaderboardStore(state => state.userEntry);
  
  useEffect(() => {
    if (hasData) {
      fetchLeaderboard();
    }
  }, [hasData, fetchLeaderboard]);
  
  const rank = entries.findIndex(e => e.id === userEntry?.id) + 1;
  const displayRank = rank > 0 ? \`#\${rank}\` : '--';
  const topPercent = rank > 0 ? Math.max(1, Math.round((rank / Math.max(1, entries.length)) * 100)) : 100;
`;

code = code.replace(
  `  const { hasData, stats } = useDashboardData();`,
  fetchLogic
);

code = code.replace(
  `#42`,
  `{displayRank}`
);

code = code.replace(
  `Top 5%`,
  `Top {topPercent}%`
);

code = code.replace(
  ` <span className="text-xs font-medium text-emerald-400 flex items-center bg-emerald-500/10 px-1.5 py-0.5 rounded">
                  <TrendingUp className="w-3 h-3 mr-0.5" /> 12
                </span>`,
  ``
);

fs.writeFileSync('src/components/dashboard/Leaderboard.tsx', code);

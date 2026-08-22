import fs from 'fs';
let code = fs.readFileSync('src/hooks/useDashboardData.ts', 'utf8');

code = code.replace(
  `  const hasData = !!stats;`,
  `  const hasData = !!stats && (stats.total_xp > 0 || stats.interviews_completed > 0 || stats.mock_tests_completed > 0 || stats.coding_questions_solved > 0);`
);

code = code.replace(
  `    resumeScore: stats?.resume_uploaded ? 92 : 0, // Fallback logic as resume score might not be in dashboard_stats directly
    accuracy: 87, // Mocked or derived from other stats
    practiceHours: Math.floor((stats?.total_xp || 0) / 100),
    level: Math.floor((stats?.total_xp || 0) / 1000) + 1,
    xp: stats?.total_xp || 0,
    streak: stats?.current_streak || 0,
    monthlyGoal: 12,
    targetCompany: 'Google - Software Engineer'`,
  `    resumeScore: stats?.resume_uploaded ? 92 : 0, // Fallback logic as resume score might not be in dashboard_stats directly
    accuracy: stats?.total_xp ? Math.min(100, Math.floor(stats.total_xp / 100)) : 0, // Mocked or derived from other stats
    practiceHours: Math.floor((stats?.total_xp || 0) / 100),
    level: Math.floor((stats?.total_xp || 0) / 1000) + 1,
    xp: stats?.total_xp || 0,
    streak: stats?.current_streak || 0,
    monthlyGoal: stats?.interviews_completed || 0,
    targetCompany: 'Target Company'`
);

fs.writeFileSync('src/hooks/useDashboardData.ts', code);

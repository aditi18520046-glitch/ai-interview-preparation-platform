import { useEffect } from 'react';
import { useAuthStore } from '../store/authStore';
import { useDashboardStore } from '../store/dashboardStore';

export function useDashboardData() {
  const { user } = useAuthStore();
  const userName = user?.name || 'Guest';
  const userEmail = user?.email || '';
  
  const { stats, fetchStats } = useDashboardStore();

  useEffect(() => {
    if (user) {
      fetchStats();
    }
  }, [user, fetchStats]);

  const hasData = !!stats && (stats.total_xp > 0 || stats.interviews_completed > 0 || stats.mock_tests_completed > 0 || stats.coding_questions_solved > 0);
  
  const mappedStats = {
    interviews: stats?.interviews_completed || 0,
    tests: stats?.mock_tests_completed || 0,
    coding: stats?.coding_questions_solved || 0,
    resumeScore: stats?.resume_uploaded ? 92 : 0, // Fallback logic as resume score might not be in dashboard_stats directly
    accuracy: stats?.total_xp ? Math.min(100, Math.floor(stats.total_xp / 100)) : 0, // Mocked or derived from other stats
    practiceHours: Math.floor((stats?.total_xp || 0) / 100),
    level: Math.floor((stats?.total_xp || 0) / 1000) + 1,
    xp: stats?.total_xp || 0,
    streak: stats?.current_streak || 0,
    monthlyGoal: stats?.interviews_completed || 0,
    targetCompany: 'Target Company'
  };

  const simulateDataLoad = () => {
    fetchStats();
  };

  return { userName, userEmail, hasData, stats: mappedStats, simulateDataLoad };
}

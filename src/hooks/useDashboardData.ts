import { useState, useEffect } from 'react';
import { useAuthStore } from '../store/authStore';

export function useDashboardData() {
  const { user } = useAuthStore();
  const userName = user?.name || 'Guest';
  const userEmail = user?.email || '';

  const [hasData, setHasData] = useState(false);
  const [stats, setStats] = useState({
    interviews: 0,
    tests: 0,
    coding: 0,
    resumeScore: 0,
    accuracy: 0,
    practiceHours: 0,
    level: 1,
    xp: 0,
    streak: 0,
    monthlyGoal: 0,
    targetCompany: 'Not Selected'
  });

  useEffect(() => {
    // Read from local storage
    const history = localStorage.getItem('hasHistory') === 'true';
    setHasData(history);
    
    if (history) {
      setStats({
        interviews: 12,
        tests: 8,
        coding: 145,
        resumeScore: 92,
        accuracy: 87,
        practiceHours: 45,
        level: 12,
        xp: 4500,
        streak: 7,
        monthlyGoal: 12,
        targetCompany: 'Google - Software Engineer'
      });
    }
  }, []);

  const simulateDataLoad = () => {
    localStorage.setItem('hasHistory', 'true');
    window.location.reload();
  };

  return { userName, userEmail, hasData, stats, simulateDataLoad };
}

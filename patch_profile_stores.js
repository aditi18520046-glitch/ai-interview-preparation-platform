import fs from 'fs';
let code = fs.readFileSync('src/pages/Profile.tsx', 'utf8');

const importsToAdd = `
import { useDashboardStore } from '../store/dashboardStore';
import { useInterviewStore } from '../store/interviewStore';
import { useMockTestStore } from '../store/mockTestStore';
import { useCodingStore } from '../store/codingStore';
import { useResumeStore } from '../store/resumeStore';
import { useRoadmapStore } from '../store/roadmapStore';
import { useEffect } from 'react';
`;

code = code.replace(
  `import { useProfileStore } from '../store/profileStore';`,
  `import { useProfileStore } from '../store/profileStore';\n${importsToAdd}`
);

const storeHooks = `
  const { profile } = useProfileStore();
  const dashboardStats = useDashboardStore(state => state.stats);
  const interviewHistory = useInterviewStore(state => state.history);
  const codingHistory = useCodingStore(state => state.history);
  const resumeHistory = useResumeStore(state => state.history);
  const roadmapHistory = useRoadmapStore(state => state.history);
  
  const fetchDashboard = useDashboardStore(state => state.fetchStats);
  const fetchInterviews = useInterviewStore(state => state.fetchHistory);
  const fetchCoding = useCodingStore(state => state.fetchHistory);
  const fetchResume = useResumeStore(state => state.fetchHistory);
  const fetchRoadmap = useRoadmapStore(state => state.fetchHistory);

  useEffect(() => {
    fetchDashboard();
    fetchInterviews();
    fetchCoding();
    fetchResume();
    fetchRoadmap();
  }, [fetchDashboard, fetchInterviews, fetchCoding, fetchResume, fetchRoadmap]);

  const careerGoals = profile?.career_goal ? { title: profile.career_goal } : null;
  const activities = interviewHistory.map(i => ({ type: 'interview', label: \`\${i.job_role} Mock Interview\`, date: i.start_time }));
  const interviews = interviewHistory;
  const codingStats = codingHistory.length > 0 ? { total: codingHistory.length, solved: codingHistory.filter(c => c.score > 0).length } : null;
  const resumeStats = resumeHistory.length > 0 ? resumeHistory[0] : null;
  const learningProgress = roadmapHistory.length > 0 ? roadmapHistory[0] : null;
  const achievements = (dashboardStats?.total_xp || 0) > 0 ? [{ title: 'First Steps' }] : [];
`;

code = code.replace(
  `  const { profile } = useProfileStore();
  // Empty states / user data
  const [careerGoals, setCareerGoals] = useState<any>(null);
  const [activities, setActivities] = useState<any[]>([]);
  const [interviews, setInterviews] = useState<any[]>([]);
  const [codingStats, setCodingStats] = useState<any>(null);
  const [resumeStats, setResumeStats] = useState<any>(null);
  const [learningProgress, setLearningProgress] = useState<any>(null);
  const [achievements, setAchievements] = useState<any[]>([]);`,
  storeHooks
);

fs.writeFileSync('src/pages/Profile.tsx', code);

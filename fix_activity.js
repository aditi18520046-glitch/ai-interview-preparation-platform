import fs from 'fs';
let code = fs.readFileSync('src/components/dashboard/Activity.tsx', 'utf8');

code = code.replace(
  `import { useDashboardData } from '../../hooks/useDashboardData';`,
  `import { useDashboardData } from '../../hooks/useDashboardData';\nimport { useInterviewStore } from '../../store/interviewStore';\nimport { useMockTestStore } from '../../store/mockTestStore';\nimport { useCodingStore } from '../../store/codingStore';\nimport { useEffect } from 'react';`
);

const fetchLogic = `
  const { hasData } = useDashboardData();
  const interviewHistory = useInterviewStore(state => state.history);
  const fetchInterviews = useInterviewStore(state => state.fetchHistory);
  const testHistory = useMockTestStore(state => state.history);
  const fetchTests = useMockTestStore(state => state.fetchHistory);
  const codingHistory = useCodingStore(state => state.history);
  const fetchCoding = useCodingStore(state => state.fetchHistory);

  useEffect(() => {
    fetchInterviews();
    fetchTests();
    fetchCoding();
  }, [fetchInterviews, fetchTests, fetchCoding]);

  const activities = [
    ...interviewHistory.map(i => ({ title: \`Mock Interview: \${i.job_role}\`, time: new Date(i.start_time).toLocaleDateString(), icon: PlayCircle, color: 'text-indigo-400', score: i.final_score ? \`\${i.final_score}%\` : null, ts: new Date(i.start_time).getTime() })),
    ...testHistory.map(t => ({ title: \`Mock Test: \${t.job_role}\`, time: new Date(t.created_at || Date.now()).toLocaleDateString(), icon: FileText, color: 'text-emerald-400', score: t.percentage ? \`\${Math.round(t.percentage)}%\` : null, ts: new Date(t.created_at || Date.now()).getTime() })),
    ...codingHistory.map(c => ({ title: \`Solved: \${c.question}\`, time: new Date(c.created_at || Date.now()).toLocaleDateString(), icon: Code2, color: 'text-fuchsia-400', score: c.score ? \`\${c.score}XP\` : null, ts: new Date(c.created_at || Date.now()).getTime() }))
  ].sort((a, b) => b.ts - a.ts).slice(0, 5);
`;

code = code.replace(
  `  const { hasData } = useDashboardData();`,
  fetchLogic
);

code = code.replace(
  `{ACTIVITIES.map((activity, idx) => (`,
  `{activities.map((activity, idx) => (`
);

fs.writeFileSync('src/components/dashboard/Activity.tsx', code);

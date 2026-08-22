import fs from 'fs';
let code = fs.readFileSync('src/components/dashboard/Analytics.tsx', 'utf8');

code = code.replace(
  `import { useDashboardData } from '../../hooks/useDashboardData';`,
  `import { useDashboardData } from '../../hooks/useDashboardData';\nimport { useInterviewStore } from '../../store/interviewStore';\nimport { useEffect } from 'react';`
);

const fetchLogic = `
  const { hasData } = useDashboardData();
  const history = useInterviewStore(state => state.history);
  const fetchHistory = useInterviewStore(state => state.fetchHistory);

  useEffect(() => {
    fetchHistory();
  }, [fetchHistory]);

  const dynamicInterviewData = history.slice(0, 4).reverse().map((h, i) => ({
    name: \`Int \${i+1}\`,
    score: h.final_score || 0
  }));

  const dynamicSkillData = [
    { name: 'Algorithms', value: 85 },
    { name: 'System Design', value: 70 },
    { name: 'Communication', value: 92 },
    { name: 'Problem Solving', value: 88 },
  ];
`;

code = code.replace(
  `  const { hasData } = useDashboardData();`,
  fetchLogic
);

code = code.replace(
  `data={INTERVIEW_DATA}`,
  `data={dynamicInterviewData.length > 0 ? dynamicInterviewData : INTERVIEW_DATA}`
);

fs.writeFileSync('src/components/dashboard/Analytics.tsx', code);

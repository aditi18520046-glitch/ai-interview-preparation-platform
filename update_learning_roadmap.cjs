const fs = require('fs');
const content = fs.readFileSync('src/pages/LearningRoadmap.tsx', 'utf8');

const updatedContent = content.replace(
  'export default function LearningRoadmap() {',
  `export default function LearningRoadmap() {
  const { currentRoadmap, saveRoadmap, fetchHistory } = useRoadmapStore();
  
  useEffect(() => {
    fetchHistory();
  }, [fetchHistory]);

  const handleGenerate = async (formData: any) => {
    await saveRoadmap({
      company: formData?.company || 'General',
      job_role: formData?.role || 'Software Engineer',
      experience_level: formData?.experience || 'Beginner',
      generated_roadmap: { dummy: 'data' },
      completed_topics: [],
      remaining_topics: ['Data Structures', 'System Design'],
      completion_percentage: 0
    });
    setHasRoadmap(true);
  };
`
).replace(
  '<RoadmapGenerator onGenerate={() => setHasRoadmap(true)} />',
  '<RoadmapGenerator onGenerate={handleGenerate} />'
);

fs.writeFileSync('src/pages/LearningRoadmap.tsx', updatedContent);

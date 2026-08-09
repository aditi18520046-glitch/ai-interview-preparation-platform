const fs = require('fs');
let content = fs.readFileSync('src/components/roadmap/RoadmapTimeline.tsx', 'utf8');
content = content.replace(
  "export default function RoadmapTimeline() {",
  `import { useRoadmapStore } from '../../store/roadmapStore';
export default function RoadmapTimeline() {
  const { currentRoadmap, updateProgress } = useRoadmapStore();
  const handleToggleTopic = (topic: string) => {
    if (!currentRoadmap) return;
    const isCompleted = currentRoadmap.completed_topics?.includes(topic);
    const completed = isCompleted ? currentRoadmap.completed_topics.filter(t => t !== topic) : [...(currentRoadmap.completed_topics || []), topic];
    const totalTopics = currentRoadmap.remaining_topics?.length + currentRoadmap.completed_topics?.length || 1;
    updateProgress(currentRoadmap.id!, {
      completed_topics: completed,
      completion_percentage: Math.round((completed.length / totalTopics) * 100)
    });
  };`
).replace(
  "const isCompleted = stage.status === 'completed';",
  "const isCompleted = currentRoadmap?.completed_topics?.includes(stage.title) || stage.status === 'completed';"
);
fs.writeFileSync('src/components/roadmap/RoadmapTimeline.tsx', content);

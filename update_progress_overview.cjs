const fs = require('fs');
const content = fs.readFileSync('src/components/progress/ProgressOverview.tsx', 'utf8');

const updatedContent = content.replace(
  "export default function ProgressOverview({ hasActivity }: { hasActivity?: boolean }) {",
  `import { useProgressStore } from '../../store/progressStore';\n\nexport default function ProgressOverview({ hasActivity }: { hasActivity?: boolean }) {
  const { progress } = useProgressStore();`
).replace(
  "current: 78,",
  "current: progress?.overall_score || 0,"
).replace(
  "current: 85,",
  "current: progress?.roadmap_progress || 0,"
).replace(
  "current: 72,",
  "current: (progress?.interviews_completed || 0) * 10," // Mock data calculation
).replace(
  "current: null,",
  "current: (progress?.coding_problems_solved || 0) * 10,"
);

fs.writeFileSync('src/components/progress/ProgressOverview.tsx', updatedContent);

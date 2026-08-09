const fs = require('fs');
const content = fs.readFileSync('src/components/progress/ProgressActivity.tsx', 'utf8');

const updatedContent = content.replace(
  "export default function ProgressActivity({ hasActivity }: { hasActivity?: boolean }) {",
  `import { useProgressStore } from '../../store/progressStore';\n\nexport default function ProgressActivity({ hasActivity }: { hasActivity?: boolean }) {
  const { progress } = useProgressStore();
  const displayActivities = progress?.recent_activities?.length ? progress.recent_activities : activities;`
).replace(
  "activities.map((activity, i)",
  "displayActivities.map((activity: any, i)"
);

fs.writeFileSync('src/components/progress/ProgressActivity.tsx', updatedContent);

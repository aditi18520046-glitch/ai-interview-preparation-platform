const fs = require('fs');
let content = fs.readFileSync('src/components/progress/ProgressOverview.tsx', 'utf8');
content = content.replace(
  'const stats = [',
  '// stats array moved inside'
).replace(
  'export default function ProgressOverview({ hasActivity }: { hasActivity?: boolean }) {\n  const { progress } = useProgressStore();',
  `export default function ProgressOverview({ hasActivity }: { hasActivity?: boolean }) {\n  const { progress } = useProgressStore();\n  const stats = [
  {
    title: 'Overall Progress',
    current: progress?.overall_score || 0,
    previous: 70,
    icon: Target,
    color: 'text-indigo-400',
    bg: 'bg-indigo-500/10'
  },
  {
    title: 'Resume Performance',
    current: progress?.roadmap_progress || 0,
    previous: 82,
    icon: FileText,
    color: 'text-emerald-400',
    bg: 'bg-emerald-500/10'
  },
  {
    title: 'Interview Performance',
    current: (progress?.interviews_completed || 0) * 10,
    previous: 65,
    icon: Video,
    color: 'text-purple-400',
    bg: 'bg-purple-500/10'
  },
  {
    title: 'Coding Performance',
    current: (progress?.coding_problems_solved || 0) * 10,
    previous: null,
    icon: Code2,
    color: 'text-pink-400',
    bg: 'bg-pink-500/10'
  }
];`
);
fs.writeFileSync('src/components/progress/ProgressOverview.tsx', content);

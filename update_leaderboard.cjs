const fs = require('fs');

let content = fs.readFileSync('src/components/leaderboard/RankingTable.tsx', 'utf8');
content = content.replace(
  "export default function RankingTable({ category, hasActivity }: RankingTableProps) {",
  `import { useLeaderboardStore } from '../../store/leaderboardStore';\n\nexport default function RankingTable({ category, hasActivity }: RankingTableProps) {
  const { entries, userEntry } = useLeaderboardStore();`
).replace(
  "const displayData = hasActivity ? tableData : tableData.filter(row => !row.isCurrentUser);",
  "const displayData = entries.length ? entries.map((e, i) => ({ rank: i + 1, name: e.user_id?.substring(0,8) || 'User', college: 'Unknown', score: e.total_xp || 0, level: 'Gold', badge: 'Pro', avatar: 'https://i.pravatar.cc/150?u='+i, isCurrentUser: e.user_id === userEntry?.user_id })) : (hasActivity ? tableData : tableData.filter(row => !row.isCurrentUser));"
);

fs.writeFileSync('src/components/leaderboard/RankingTable.tsx', content);

let pageContent = fs.readFileSync('src/pages/Leaderboard.tsx', 'utf8');
pageContent = pageContent.replace(
  "export default function Leaderboard() {",
  `import { useLeaderboardStore } from '../store/leaderboardStore';
import { useEffect } from 'react';\n
export default function Leaderboard() {
  const { fetchLeaderboard } = useLeaderboardStore();
  useEffect(() => { fetchLeaderboard(); }, [fetchLeaderboard]);`
);
fs.writeFileSync('src/pages/Leaderboard.tsx', pageContent);


const fs = require('fs');
let content = fs.readFileSync('src/components/leaderboard/TopChampions.tsx', 'utf8');
content = content.replace(
  "export default function TopChampions({ category, hasActivity }: TopChampionsProps) {",
  `import { useLeaderboardStore } from '../../store/leaderboardStore';\n\nexport default function TopChampions({ category, hasActivity }: TopChampionsProps) {
  const { entries } = useLeaderboardStore();
  const topUsersData = entries.length >= 3 ? [
    { rank: 2, name: entries[1].user_id?.substring(0,8), score: entries[1].total_xp || 0, level: 'Master', badge: 'Silver', avatar: 'https://i.pravatar.cc/150?u='+1, color: 'text-slate-300', bg: 'bg-slate-300', from: 'from-slate-400', to: 'to-slate-300' },
    { rank: 1, name: entries[0].user_id?.substring(0,8), score: entries[0].total_xp || 0, level: 'Grandmaster', badge: 'Gold', avatar: 'https://i.pravatar.cc/150?u='+0, color: 'text-yellow-400', bg: 'bg-yellow-400', from: 'from-yellow-500', to: 'to-yellow-300' },
    { rank: 3, name: entries[2].user_id?.substring(0,8), score: entries[2].total_xp || 0, level: 'Diamond', badge: 'Bronze', avatar: 'https://i.pravatar.cc/150?u='+2, color: 'text-orange-500', bg: 'bg-orange-500', from: 'from-orange-600', to: 'to-orange-400' },
  ] : topUsers;`
).replace(
  "topUsers.map((user, i)",
  "topUsersData.map((user: any, i)"
);
fs.writeFileSync('src/components/leaderboard/TopChampions.tsx', content);

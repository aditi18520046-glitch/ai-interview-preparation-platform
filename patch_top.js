import fs from 'fs';
const path = './src/components/leaderboard/TopChampions.tsx';
let code = fs.readFileSync(path, 'utf8');

code = code.replace(/if \(!hasActivity\) return null;/, '');
code = code.replace(/hasActivity\?: boolean;/, '');
code = code.replace(/hasActivity/g, '');

// Don't show top champions if there are no entries
code = code.replace(/const topUsersData = entries\.length >= 3 \? \[.*?\] : topUsers;/s, `
  const topUsersData = entries.length >= 3 ? [
    { rank: 2, name: entries[1].user_id?.substring(0,8), score: entries[1].total_xp || 0, level: 'Master', badge: 'Silver', avatar: 'https://ui-avatars.com/api/?name='+entries[1].user_id?.substring(0,2), color: 'text-slate-300', bg: 'bg-slate-300', from: 'from-slate-400', to: 'to-slate-300' },
    { rank: 1, name: entries[0].user_id?.substring(0,8), score: entries[0].total_xp || 0, level: 'Grandmaster', badge: 'Gold', avatar: 'https://ui-avatars.com/api/?name='+entries[0].user_id?.substring(0,2), color: 'text-yellow-400', bg: 'bg-yellow-400', from: 'from-yellow-500', to: 'to-yellow-300' },
    { rank: 3, name: entries[2].user_id?.substring(0,8), score: entries[2].total_xp || 0, level: 'Diamond', badge: 'Bronze', avatar: 'https://ui-avatars.com/api/?name='+entries[2].user_id?.substring(0,2), color: 'text-orange-500', bg: 'bg-orange-500', from: 'from-orange-600', to: 'to-orange-400' },
  ] : [];
  if (topUsersData.length === 0) return null;
`);

fs.writeFileSync(path, code);

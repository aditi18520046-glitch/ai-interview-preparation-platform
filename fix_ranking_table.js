import fs from 'fs';
const code = `import React from 'react';
import { Category } from '../../pages/Leaderboard';
import { Shield, Code2, Database, Layout, Cloud, Brain, MessageSquare } from 'lucide-react';

interface RankingTableProps {
  category: Category;
}

import { useLeaderboardStore } from '../../store/leaderboardStore';

export default function RankingTable({ category }: RankingTableProps) {
  const { entries, userEntry } = useLeaderboardStore();
  const displayData = entries.map((e, i) => ({ 
    rank: i + 1, 
    name: e.user_id?.substring(0,8) || 'User', 
    college: 'Unknown', 
    score: e.total_xp || 0, 
    level: 'Gold', 
    badge: 'Pro', 
    avatar: 'https://ui-avatars.com/api/?name='+(e.user_id?.substring(0,2) || 'U'), 
    isCurrentUser: e.user_id === userEntry?.user_id 
  }));

  return (
    <div className="bg-slate-900 border border-white/5 rounded-[32px] overflow-hidden">
      <div className="p-6 md:p-8 border-b border-white/5">
        <h2 className="text-xl font-bold text-white">Global Rankings</h2>
        <p className="text-sm text-slate-400 mt-1">Compare your performance against other learners.</p>
      </div>

      <div className="flex flex-col">
        {/* Table Header (Hidden on small screens) */}
        <div className="hidden md:grid md:grid-cols-12 gap-4 px-6 py-4 bg-slate-950 border-b border-white/5 text-xs uppercase tracking-wider text-slate-400 font-semibold">
          <div className="col-span-1">Rank</div>
          <div className="col-span-4">User</div>
          <div className="col-span-3">College</div>
          <div className="col-span-2 text-right">Score</div>
          <div className="col-span-2 text-center">Badge</div>
        </div>

        {/* Table Body */}
        <div className="divide-y divide-white/5">
          {displayData.map((row, i) => (
            <div 
              key={i} 
              className={\`flex flex-col md:grid md:grid-cols-12 gap-4 px-6 py-4 hover:bg-white/[0.02] transition-colors items-start md:items-center \${row.isCurrentUser ? 'bg-indigo-500/5' : ''}\`}
            >
              {/* Rank & User Info (Mobile: Top Row) */}
              <div className="w-full md:col-span-5 flex items-center gap-4">
                <span className={\`font-bold text-lg md:text-base w-8 md:w-auto \${row.isCurrentUser ? 'text-indigo-400' : 'text-slate-500'}\`}>
                  #{row.rank}
                </span>
                <div className="flex items-center gap-3">
                  <img src={row.avatar} alt={row.name} className="w-10 h-10 md:w-8 md:h-8 rounded-full" />
                  <span className={\`font-medium \${row.isCurrentUser ? 'text-indigo-400' : 'text-slate-200'}\`}>
                    {row.name}
                  </span>
                </div>
              </div>

              {/* College (Mobile: Second Row) */}
              <div className="w-full md:col-span-3 text-sm text-slate-400 pl-12 md:pl-0">
                {row.college}
              </div>

              {/* Score & Badge (Mobile: Third Row, flex-row) */}
              <div className="w-full md:col-span-4 flex items-center justify-between md:grid md:grid-cols-4 gap-4 pl-12 md:pl-0">
                <div className="md:col-span-2 text-left md:text-right">
                  <span className="md:hidden text-xs text-slate-500 uppercase tracking-wider mr-2">Score:</span>
                  <span className="font-bold text-white">{row.score.toLocaleString()}</span>
                </div>
                <div className="md:col-span-2 text-right md:text-center">
                  <div className="inline-flex items-center justify-center px-2.5 py-1 rounded-md bg-slate-800 border border-white/5 text-xs font-semibold text-slate-300">
                    {row.badge}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
`;
fs.writeFileSync('src/components/leaderboard/RankingTable.tsx', code);

import React from 'react';
import { Category } from '../../pages/Leaderboard';
import { Trophy, Star, Shield } from 'lucide-react';

interface TopChampionsProps {
  category: Category;
  
}

const topUsers = [
  { rank: 2, name: 'Sarah Chen', score: 9850, level: 'Master', badge: 'Silver', avatar: 'https://i.pravatar.cc/150?u=sarah', color: 'text-slate-300', bg: 'bg-slate-300', from: 'from-slate-400', to: 'to-slate-300' },
  { rank: 1, name: 'Alex Thompson', score: 12400, level: 'Grandmaster', badge: 'Gold', avatar: 'https://i.pravatar.cc/150?u=alex', color: 'text-yellow-400', bg: 'bg-yellow-400', from: 'from-yellow-500', to: 'to-yellow-300' },
  { rank: 3, name: 'Michael Rodriguez', score: 9200, level: 'Diamond', badge: 'Bronze', avatar: 'https://i.pravatar.cc/150?u=michael', color: 'text-orange-500', bg: 'bg-orange-500', from: 'from-orange-600', to: 'to-orange-400' },
];

import { useLeaderboardStore } from '../../store/leaderboardStore';

export default function TopChampions({ category,  }: TopChampionsProps) {
  const { entries } = useLeaderboardStore();
  
  const topUsersData = entries.length >= 3 ? [
    { rank: 2, name: entries[1].user_id?.substring(0,8), score: entries[1].total_xp || 0, level: 'Master', badge: 'Silver', avatar: 'https://ui-avatars.com/api/?name='+entries[1].user_id?.substring(0,2), color: 'text-slate-300', bg: 'bg-slate-300', from: 'from-slate-400', to: 'to-slate-300' },
    { rank: 1, name: entries[0].user_id?.substring(0,8), score: entries[0].total_xp || 0, level: 'Grandmaster', badge: 'Gold', avatar: 'https://ui-avatars.com/api/?name='+entries[0].user_id?.substring(0,2), color: 'text-yellow-400', bg: 'bg-yellow-400', from: 'from-yellow-500', to: 'to-yellow-300' },
    { rank: 3, name: entries[2].user_id?.substring(0,8), score: entries[2].total_xp || 0, level: 'Diamond', badge: 'Bronze', avatar: 'https://ui-avatars.com/api/?name='+entries[2].user_id?.substring(0,2), color: 'text-orange-500', bg: 'bg-orange-500', from: 'from-orange-600', to: 'to-orange-400' },
  ] : [];
  if (topUsersData.length === 0) return null;

  if (category === 'skills') return null; // Skills has a different layout rendered in RankingTable

  

  return (
    <div className="bg-slate-900 border border-white/5 rounded-[32px] p-6 md:p-8">
      <div className="flex items-center justify-between mb-10">
        <div>
          <h2 className="text-2xl font-bold text-white flex items-center gap-2">
            <Trophy className="w-6 h-6 text-yellow-400" /> Top Champions
          </h2>
          <p className="text-sm text-slate-400 mt-1">The best performers in this category</p>
        </div>
      </div>

      <div className="flex flex-col md:flex-row items-end justify-center gap-6 md:gap-8 min-h-[300px]">
        {topUsersData.map((user: any, i) => (
          <div 
            key={user.rank} 
            className={`relative flex flex-col items-center w-full md:w-1/3 max-w-[280px] bg-slate-950 border border-white/5 rounded-2xl p-6 ${
              user.rank === 1 ? 'order-first md:order-none md:-mt-8 transform md:scale-110 z-10 shadow-2xl shadow-yellow-500/10 border-yellow-500/20' : ''
            }`}
          >
            {/* Rank Badge */}
            <div className={`absolute -top-6 w-12 h-12 rounded-full bg-gradient-to-br ${user.from} ${user.to} p-1 shadow-lg`}>
              <div className="w-full h-full bg-slate-900 rounded-full flex items-center justify-center font-bold text-lg text-white">
                #{user.rank}
              </div>
            </div>

            {/* Avatar */}
            <div className={`w-24 h-24 rounded-full p-1 mt-4 mb-4 bg-gradient-to-br ${user.from} ${user.to}`}>
              <img src={user.avatar} alt={user.name} className="w-full h-full rounded-full object-cover border-2 border-slate-900" />
            </div>

            {/* Details */}
            <div className="text-center w-full">
              <h3 className="font-bold text-white text-lg mb-1 truncate">{user.name}</h3>
              <div className="flex items-center justify-center gap-1.5 mb-4">
                <Shield className={`w-4 h-4 ${user.color}`} />
                <span className={`text-xs font-semibold ${user.color} uppercase tracking-wider`}>{user.badge} Tier</span>
              </div>
              
              <div className="bg-slate-900 rounded-xl p-3 border border-white/5">
                <div className="text-xs text-slate-400 uppercase tracking-wider mb-1">Score</div>
                <div className="font-bold text-xl text-white">{user.score.toLocaleString()}</div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

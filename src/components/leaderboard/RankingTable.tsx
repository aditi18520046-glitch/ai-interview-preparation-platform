import React from 'react';
import { Category } from '../../pages/Leaderboard';
import { Shield, Code2, Database, Layout, Cloud, Brain, MessageSquare } from 'lucide-react';

interface RankingTableProps {
  category: Category;
  hasActivity?: boolean;
}

// Dummy data for generic tables
const tableData = [
  { rank: 4, name: 'Jessica Lee', college: 'Stanford University', score: 8900, level: 'Diamond', badge: 'Pro', avatar: 'https://i.pravatar.cc/150?u=4' },
  { rank: 5, name: 'Robert Chen', college: 'MIT', score: 8750, level: 'Platinum', badge: 'Pro', avatar: 'https://i.pravatar.cc/150?u=5' },
  { rank: 6, name: 'Emily Davis', college: 'UC Berkeley', score: 8600, level: 'Platinum', badge: 'Advanced', avatar: 'https://i.pravatar.cc/150?u=6' },
  { rank: 7, name: 'David Kim', college: 'Carnegie Mellon', score: 8400, level: 'Platinum', badge: 'Advanced', avatar: 'https://i.pravatar.cc/150?u=7' },
  { rank: 42, name: 'You', college: 'Your University', score: 4200, level: 'Gold', badge: 'Intermediate', avatar: 'https://i.pravatar.cc/150?u=you', isCurrentUser: true },
];

const skillChampions = [
  { skill: 'Java Champion', name: 'Robert Chen', score: 99, icon: Code2, color: 'text-orange-500', bg: 'bg-orange-500/10', avatar: 'https://i.pravatar.cc/150?u=5' },
  { skill: 'Python Champion', name: 'Sarah Chen', score: 98, icon: Code2, color: 'text-blue-400', bg: 'bg-blue-500/10', avatar: 'https://i.pravatar.cc/150?u=sarah' },
  { skill: 'DSA Champion', name: 'Alex Thompson', score: 100, icon: Brain, color: 'text-purple-400', bg: 'bg-purple-500/10', avatar: 'https://i.pravatar.cc/150?u=alex' },
  { skill: 'SQL Champion', name: 'Jessica Lee', score: 97, icon: Database, color: 'text-indigo-400', bg: 'bg-indigo-500/10', avatar: 'https://i.pravatar.cc/150?u=4' },
  { skill: 'React Champion', name: 'Emily Davis', score: 96, icon: Layout, color: 'text-emerald-400', bg: 'bg-emerald-500/10', avatar: 'https://i.pravatar.cc/150?u=6' },
  { skill: 'Cloud Champion', name: 'David Kim', score: 95, icon: Cloud, color: 'text-sky-400', bg: 'bg-sky-500/10', avatar: 'https://i.pravatar.cc/150?u=7' },
  { skill: 'Communication Champion', name: 'James Wilson', score: 98, icon: MessageSquare, color: 'text-pink-400', bg: 'bg-pink-500/10', avatar: 'https://i.pravatar.cc/150?u=8' },
];

export default function RankingTable({ category, hasActivity }: RankingTableProps) {
  const displayData = hasActivity ? tableData : tableData.filter(row => !row.isCurrentUser);

  if (category === 'skills') {
    if (!hasActivity) {
      return (
        <div className="bg-slate-900 border border-white/5 rounded-[32px] p-6 md:p-8 text-center">
          <h2 className="text-xl font-bold text-white mb-2">Skill Champions</h2>
          <p className="text-slate-400">Complete activities to see skill champions.</p>
        </div>
      );
    }

    return (
      <div className="bg-slate-900 border border-white/5 rounded-[32px] p-6 md:p-8">
        <h2 className="text-xl font-bold text-white mb-6">Skill Champions</h2>
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {skillChampions.map((champ, i) => (
            <div key={i} className="bg-slate-950 border border-white/5 rounded-2xl p-5 flex flex-col gap-4 hover:border-white/10 transition-colors">
              <div className="flex items-center gap-3">
                <div className={`w-12 h-12 rounded-xl ${champ.bg} flex items-center justify-center shrink-0`}>
                  <champ.icon className={`w-6 h-6 ${champ.color}`} />
                </div>
                <div>
                  <div className="text-sm font-semibold text-white">{champ.skill}</div>
                  <div className={`text-xs font-medium ${champ.color}`}>Highest Score: {champ.score}</div>
                </div>
              </div>
              <div className="flex items-center gap-3 bg-slate-900 rounded-xl p-3 border border-white/5">
                <img src={champ.avatar} alt={champ.name} className="w-8 h-8 rounded-full" />
                <span className="text-sm font-medium text-slate-300 truncate">{champ.name}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="bg-slate-900 border border-white/5 rounded-[32px] overflow-hidden">
      <div className="p-6 md:p-8 border-b border-white/5">
        <h2 className="text-xl font-bold text-white">Global Rankings</h2>
        <p className="text-sm text-slate-400 mt-1">Compare your performance against other learners.</p>
      </div>
      
      {!hasActivity ? (
        <div className="p-8 text-center">
          <p className="text-slate-400">No rankings available yet. Complete an activity to start climbing the leaderboard!</p>
        </div>
      ) : (
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
              className={`flex flex-col md:grid md:grid-cols-12 gap-4 px-6 py-4 hover:bg-white/[0.02] transition-colors items-start md:items-center ${row.isCurrentUser ? 'bg-indigo-500/5' : ''}`}
            >
              {/* Rank & User Info (Mobile: Top Row) */}
              <div className="w-full md:col-span-5 flex items-center gap-4">
                <span className={`font-bold text-lg md:text-base w-8 md:w-auto ${row.isCurrentUser ? 'text-indigo-400' : 'text-slate-500'}`}>
                  #{row.rank}
                </span>
                <div className="flex items-center gap-3">
                  <img src={row.avatar} alt={row.name} className="w-10 h-10 md:w-8 md:h-8 rounded-full" />
                  <span className={`font-medium ${row.isCurrentUser ? 'text-indigo-400' : 'text-slate-200'}`}>
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
      )}
    </div>
  );
}

import React from 'react';
import { Category } from '../../pages/Leaderboard';
import { FileText, Mic, Code2, Flame, TrendingUp, Rocket } from 'lucide-react';

interface HallOfFameProps {
  category: Category;
  hasActivity?: boolean;
}

const hallOfFameData = [
  { title: 'Highest Resume Score', name: 'Emily Davis', score: '99/100', icon: FileText, color: 'text-emerald-400', bg: 'bg-emerald-500/10' },
  { title: 'Best Interview Performer', name: 'James Wilson', score: '98% Avg', icon: Mic, color: 'text-purple-400', bg: 'bg-purple-500/10' },
  { title: 'Top Coding Performer', name: 'Alex Thompson', score: '500+ Solved', icon: Code2, color: 'text-indigo-400', bg: 'bg-indigo-500/10' },
  { title: 'Longest Learning Streak', name: 'Sarah Chen', score: '142 Days', icon: Flame, color: 'text-orange-400', bg: 'bg-orange-500/10' },
  { title: 'Fastest Improving Learner', name: 'David Kim', score: '+45% Rank', icon: TrendingUp, color: 'text-pink-400', bg: 'bg-pink-500/10' },
  { title: 'Placement Ready', name: 'Michael Rodriguez', score: 'All Objectives', icon: Rocket, color: 'text-yellow-400', bg: 'bg-yellow-500/10' },
];

export default function HallOfFame({ category, hasActivity }: HallOfFameProps) {
  if (category === 'skills') return null;
  if (!hasActivity) return null;

  return (
    <div className="space-y-4">
      <h3 className="text-lg font-bold text-white px-2">Hall of Fame</h3>
      <div className="flex overflow-x-auto pb-4 scrollbar-hide gap-4">
        {hallOfFameData.map((item, i) => (
          <div key={i} className="min-w-[260px] bg-slate-900 border border-white/5 rounded-2xl p-5 hover:border-white/10 transition-colors flex flex-col justify-between group">
            <div className="flex items-center gap-3 mb-4">
              <div className={`w-10 h-10 rounded-xl ${item.bg} flex items-center justify-center shrink-0`}>
                <item.icon className={`w-5 h-5 ${item.color}`} />
              </div>
              <div>
                <div className="text-xs text-slate-400 font-medium">{item.title}</div>
                <div className="font-bold text-white group-hover:text-indigo-300 transition-colors">{item.name}</div>
              </div>
            </div>
            <div className="text-sm font-semibold text-slate-300 bg-slate-950 px-3 py-2 rounded-lg border border-white/5 inline-block w-fit">
              {item.score}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

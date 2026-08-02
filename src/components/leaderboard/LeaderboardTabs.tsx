import React from 'react';
import { Category } from '../../pages/Leaderboard';
import { Trophy, FileText, Mic, Code2, Flame, Star } from 'lucide-react';

interface LeaderboardTabsProps {
  activeCategory: Category;
  onCategoryChange: (category: Category) => void;
}

const tabs: { id: Category; label: string; icon: React.ElementType; color: string; bg: string }[] = [
  { id: 'overall', label: 'Overall Leaderboard', icon: Trophy, color: 'text-yellow-400', bg: 'bg-yellow-500/10 hover:bg-yellow-500/20' },
  { id: 'resume', label: 'Resume Analyzer', icon: FileText, color: 'text-emerald-400', bg: 'bg-emerald-500/10 hover:bg-emerald-500/20' },
  { id: 'interview', label: 'Mock Interview', icon: Mic, color: 'text-purple-400', bg: 'bg-purple-500/10 hover:bg-purple-500/20' },
  { id: 'coding', label: 'Coding Practice', icon: Code2, color: 'text-indigo-400', bg: 'bg-indigo-500/10 hover:bg-indigo-500/20' },
  { id: 'streak', label: 'Weekly Streak', icon: Flame, color: 'text-orange-400', bg: 'bg-orange-500/10 hover:bg-orange-500/20' },
  { id: 'skills', label: 'Skill Champions', icon: Star, color: 'text-pink-400', bg: 'bg-pink-500/10 hover:bg-pink-500/20' },
];

export default function LeaderboardTabs({ activeCategory, onCategoryChange }: LeaderboardTabsProps) {
  return (
    <div className="flex overflow-x-auto pb-2 scrollbar-hide gap-3">
      {tabs.map((tab) => {
        const isActive = activeCategory === tab.id;
        return (
          <button
            key={tab.id}
            onClick={() => onCategoryChange(tab.id)}
            className={`flex items-center gap-2.5 px-5 py-3 rounded-xl whitespace-nowrap transition-all duration-300 font-medium ${
              isActive 
                ? 'bg-slate-800 text-white shadow-lg border border-white/10' 
                : 'bg-slate-900 text-slate-400 hover:text-slate-200 border border-white/5'
            }`}
          >
            <div className={`w-8 h-8 rounded-lg flex items-center justify-center transition-colors ${isActive ? tab.bg.split(' ')[0] : 'bg-slate-800 group-hover:bg-slate-700'}`}>
              <tab.icon className={`w-4 h-4 ${isActive ? tab.color : 'text-slate-400'}`} />
            </div>
            <span>{tab.label}</span>
          </button>
        );
      })}
    </div>
  );
}

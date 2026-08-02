import React from 'react';
import { Target, FileText, Code2, Video, TrendingUp, Minus } from 'lucide-react';

const stats = [
  {
    title: 'Overall Progress',
    current: 78,
    previous: 70,
    icon: Target,
    color: 'text-indigo-400',
    bg: 'bg-indigo-500/10'
  },
  {
    title: 'Resume Performance',
    current: 85,
    previous: 82,
    icon: FileText,
    color: 'text-emerald-400',
    bg: 'bg-emerald-500/10'
  },
  {
    title: 'Interview Performance',
    current: 72,
    previous: 65,
    icon: Video,
    color: 'text-purple-400',
    bg: 'bg-purple-500/10'
  },
  {
    title: 'Coding Performance',
    current: null, // Null to simulate uncompleted activity
    previous: null,
    icon: Code2,
    color: 'text-pink-400',
    bg: 'bg-pink-500/10'
  }
];

export default function ProgressOverview({ hasActivity }: { hasActivity?: boolean }) {
  return (
    <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
      {stats.map((stat, i) => {
        const displayCurrent = hasActivity ? stat.current : null;
        const displayPrevious = hasActivity ? stat.previous : null;
        const improvement = displayCurrent && displayPrevious ? displayCurrent - displayPrevious : 0;
        const isPositive = improvement > 0;
        const isNeutral = improvement === 0;

        return (
          <div key={i} className="bg-slate-900 border border-white/5 rounded-3xl p-6 hover:border-white/10 transition-colors">
            <div className="flex items-center justify-between mb-4">
              <div className={`w-12 h-12 rounded-xl ${stat.bg} flex items-center justify-center`}>
                <stat.icon className={`w-6 h-6 ${stat.color}`} />
              </div>
              
              {displayCurrent !== null && (
                <div className={`flex items-center gap-1 text-xs font-semibold px-2 py-1 rounded-lg ${isPositive ? 'bg-emerald-500/10 text-emerald-400' : isNeutral ? 'bg-slate-500/10 text-slate-400' : 'bg-red-500/10 text-red-400'}`}>
                  {isPositive ? <TrendingUp className="w-3 h-3" /> : <Minus className="w-3 h-3" />}
                  {isPositive ? '+' : ''}{improvement}%
                </div>
              )}
            </div>
            
            <h3 className="text-sm font-semibold text-slate-400 mb-2">{stat.title}</h3>
            
            {displayCurrent !== null ? (
              <div className="flex items-baseline gap-2">
                <span className="text-3xl font-bold text-white">{displayCurrent}%</span>
                <span className="text-sm text-slate-500 line-through">{displayPrevious}%</span>
              </div>
            ) : (
              <p className="text-xs text-slate-500 leading-relaxed mt-2">
                Complete this activity to view your progress.
              </p>
            )}
          </div>
        );
      })}
    </div>
  );
}

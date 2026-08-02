import React from 'react';
import { Target, CheckCircle2, Play, Flame } from 'lucide-react';
import { motion } from 'motion/react';
import { useDashboardData } from '../../hooks/useDashboardData';

const CHALLENGES = [
  { id: 1, title: 'Complete 1 Mock Interview', xp: 500, completed: false, icon: Target, color: 'text-indigo-400', bg: 'bg-indigo-500/10' },
  { id: 2, title: 'Solve 2 Medium Algorithms', xp: 300, completed: true, icon: CheckCircle2, color: 'text-emerald-400', bg: 'bg-emerald-500/10' },
  { id: 3, title: 'Review System Design Basics', xp: 200, completed: false, icon: Play, color: 'text-blue-400', bg: 'bg-blue-500/10' },
];

export default function DailyChallenges() {
  const { hasData } = useDashboardData();

  return (
    <div className="mb-8">
      <div className="flex items-center justify-between mb-5">
        <div className="flex items-center gap-2">
          <Flame className="w-5 h-5 text-orange-400" />
          <h2 className="text-base font-semibold text-white">Daily Challenges</h2>
        </div>
        <span className="text-xs font-medium text-slate-400">Resets in 12h 45m</span>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {CHALLENGES.map((challenge, idx) => {
          const isCompleted = hasData && challenge.completed;
          return (
            <motion.div
              key={challenge.id}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: idx * 0.05 }}
              className={`relative overflow-hidden rounded-[20px] p-5 border transition-all shadow-sm
                ${isCompleted 
                  ? 'bg-emerald-500/5 border-emerald-500/20' 
                  : 'bg-slate-900/40 backdrop-blur-md border-white/5 hover:border-white/10 hover:bg-slate-900/60'}
              `}
            >
              {isCompleted && (
                <div className="absolute top-0 right-0 w-24 h-24 bg-emerald-500/10 rounded-full blur-2xl pointer-events-none translate-x-1/2 -translate-y-1/2" />
              )}
              
              <div className="flex items-start justify-between mb-3 relative z-10">
                <div className={`w-10 h-10 rounded-xl flex items-center justify-center ${isCompleted ? 'bg-emerald-500/20 text-emerald-400' : challenge.bg + ' ' + challenge.color}`}>
                  <challenge.icon className="w-5 h-5" />
                </div>
                <div className="flex items-center gap-1 bg-white/5 px-2 py-1 rounded-md">
                  <span className="text-[11px] font-bold text-yellow-400">+{challenge.xp}</span>
                  <span className="text-[10px] text-slate-400 uppercase tracking-wider">XP</span>
                </div>
              </div>
              
              <h3 className={`text-[13px] font-semibold mb-1 relative z-10 ${isCompleted ? 'text-emerald-50' : 'text-white'}`}>
                {challenge.title}
              </h3>
              
              <div className="mt-4 relative z-10">
                {isCompleted ? (
                  <div className="flex items-center gap-1.5 text-[11px] font-semibold text-emerald-400">
                    <CheckCircle2 className="w-3.5 h-3.5" />
                    Completed
                  </div>
                ) : (
                  <button className="text-[11px] font-semibold text-indigo-400 hover:text-indigo-300 transition-colors flex items-center gap-1">
                    Start Challenge
                    <Play className="w-3 h-3" />
                  </button>
                )}
              </div>
            </motion.div>
          );
        })}
      </div>
    </div>
  );
}

cat << 'INNER_EOF' > src/components/dashboard/Achievements.tsx
import React from 'react';
import { Medal, Star, Target, Zap, Trophy, Shield } from 'lucide-react';
import { useDashboardData } from '../../hooks/useDashboardData';

const ACHIEVEMENTS = [
  { title: 'First Interview', icon: Target, locked: false, color: 'text-indigo-400 bg-indigo-500/20' },
  { title: '7 Day Streak', icon: Zap, locked: false, color: 'text-orange-400 bg-orange-500/20' },
  { title: 'Top 10%', icon: Trophy, locked: false, color: 'text-yellow-400 bg-yellow-500/20' },
  { title: 'Perfect Score', icon: Star, locked: false, color: 'text-emerald-400 bg-emerald-500/20' },
  { title: '100 Problems', icon: Shield, locked: true, color: 'text-slate-400 bg-slate-800' },
  { title: 'Master Level', icon: Medal, locked: true, color: 'text-slate-400 bg-slate-800' },
];

export default function Achievements() {
  const { hasData } = useDashboardData();

  return (
    <div className="bg-slate-900/40 backdrop-blur-md border border-white/5 rounded-[20px] p-6 h-[280px] flex flex-col shadow-sm">
      <div className="flex items-center justify-between mb-5">
        <h2 className="text-base font-semibold text-white">Achievements</h2>
        <span className="text-[10px] font-semibold text-indigo-400 bg-indigo-500/10 px-2 py-0.5 rounded-md">
          {hasData ? '4/12 Unlocked' : '0/12 Unlocked'}
        </span>
      </div>

      <div className="grid grid-cols-3 gap-3 flex-1">
        {ACHIEVEMENTS.map((ach, idx) => {
          const locked = !hasData || ach.locked;
          const color = locked ? 'text-slate-500 bg-slate-800/50' : ach.color;
          return (
            <div key={idx} className={\`flex flex-col items-center justify-center p-2 rounded-xl border transition-all \${locked ? 'border-white/5 opacity-50' : 'border-white/10 hover:border-white/20 bg-white/5'}\`}>
              <div className={\`w-8 h-8 rounded-full flex items-center justify-center mb-2 shadow-inner \${color}\`}>
                <ach.icon className="w-4 h-4" />
              </div>
              <p className="text-[10px] font-medium text-center text-slate-300 leading-tight px-1">
                {ach.title}
              </p>
            </div>
          );
        })}
      </div>
    </div>
  );
}
INNER_EOF

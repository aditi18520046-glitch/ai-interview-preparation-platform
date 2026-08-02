cat << 'INNER_EOF' > src/components/dashboard/Leaderboard.tsx
import React from 'react';
import { Trophy, TrendingUp, Zap, ChevronRight, Lock } from 'lucide-react';
import { useDashboardData } from '../../hooks/useDashboardData';

export default function Leaderboard() {
  const { hasData, stats } = useDashboardData();

  return (
    <div className="bg-slate-900/40 backdrop-blur-md border border-white/5 rounded-[20px] p-6 h-[280px] flex flex-col relative overflow-hidden group shadow-sm">
      {/* Glow effect */}
      <div className="absolute top-0 right-0 w-32 h-32 bg-yellow-500/10 rounded-full blur-[50px] pointer-events-none" />

      <div className="flex items-center gap-2 mb-5 relative z-10">
        <Trophy className="w-5 h-5 text-yellow-400" />
        <h2 className="text-base font-semibold text-white">Leaderboard Preview</h2>
      </div>

      {!hasData ? (
        <div className="flex-1 flex flex-col items-center justify-center text-center relative z-10">
          <div className="w-12 h-12 rounded-full bg-slate-800/50 flex items-center justify-center mb-3 border border-white/5">
            <Lock className="w-5 h-5 text-slate-500" />
          </div>
          <p className="text-xs text-slate-400 font-medium px-4">Start practicing to get placed on the global leaderboard.</p>
        </div>
      ) : (
        <div className="flex-1 flex flex-col justify-between relative z-10">
          <div className="flex items-center justify-between mb-4">
            <div className="flex flex-col">
              <span className="text-[11px] font-medium text-slate-400 uppercase tracking-wider mb-1">Current Rank</span>
              <span className="text-3xl font-bold text-white flex items-baseline gap-2 tracking-tight">
                #42 
                <span className="text-xs font-medium text-emerald-400 flex items-center bg-emerald-500/10 px-1.5 py-0.5 rounded">
                  <TrendingUp className="w-3 h-3 mr-0.5" /> 12
                </span>
              </span>
            </div>
            
            <div className="w-14 h-14 rounded-full border-4 border-yellow-400/20 border-t-yellow-400 flex items-center justify-center relative">
              <span className="text-[10px] font-bold text-yellow-400">Top 5%</span>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-3 mb-2">
            <div className="bg-white/5 rounded-xl p-3 border border-white/5">
              <div className="flex items-center gap-1.5 mb-1.5">
                <Zap className="w-3.5 h-3.5 text-orange-400" />
                <span className="text-[11px] font-medium text-slate-400">Streak</span>
              </div>
              <span className="text-base font-bold text-white">{stats.streak} Days</span>
            </div>
            <div className="bg-white/5 rounded-xl p-3 border border-white/5">
              <div className="flex items-center gap-1.5 mb-1.5">
                <Trophy className="w-3.5 h-3.5 text-indigo-400" />
                <span className="text-[11px] font-medium text-slate-400">XP Points</span>
              </div>
              <span className="text-base font-bold text-white">{stats.xp.toLocaleString()}</span>
            </div>
          </div>
        </div>
      )}
      
      <button className="w-full mt-4 py-2 bg-white/5 hover:bg-white/10 text-white text-[12px] font-medium rounded-xl transition-all flex items-center justify-center gap-1.5 border border-transparent hover:border-white/5 relative z-10 shrink-0">
        View Full Leaderboard
        <ChevronRight className="w-3 h-3" />
      </button>
    </div>
  );
}
INNER_EOF

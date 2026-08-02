import React from 'react';
import { Category } from '../../pages/Leaderboard';
import { Trophy, TrendingUp } from 'lucide-react';

interface MyRankingProps {
  category: Category;
  hasActivity?: boolean;
}

export default function MyRanking({ category, hasActivity }: MyRankingProps) {
  return (
    <div className="bg-slate-900 border border-white/5 rounded-[32px] p-6 md:p-8 relative overflow-hidden group">
      <div className="absolute top-0 right-0 w-32 h-32 bg-yellow-500/10 rounded-full blur-[50px] -translate-y-1/2 translate-x-1/2 group-hover:bg-yellow-500/20 transition-colors pointer-events-none" />
      
      <div className="flex items-center gap-3 mb-6 relative z-10">
        <div className="w-10 h-10 rounded-xl bg-yellow-500/10 flex items-center justify-center">
          <Trophy className="w-5 h-5 text-yellow-400" />
        </div>
        <div>
          <h2 className="text-xl font-bold text-white">My Ranking</h2>
          <p className="text-sm text-slate-400">Your current standing</p>
        </div>
      </div>

      {hasActivity ? (
        <div className="relative z-10 space-y-6">
          <div className="grid grid-cols-2 gap-4">
            <div className="bg-slate-950 border border-white/5 rounded-xl p-4">
              <div className="text-xs text-slate-400 uppercase tracking-wider mb-1">Current Rank</div>
              <div className="text-2xl font-bold text-white flex items-center gap-2">
                #42 <span className="text-sm font-semibold text-emerald-400 flex items-center"><TrendingUp className="w-3 h-3 mr-0.5" /> 5</span>
              </div>
            </div>
            <div className="bg-slate-950 border border-white/5 rounded-xl p-4">
              <div className="text-xs text-slate-400 uppercase tracking-wider mb-1">Overall Score</div>
              <div className="text-2xl font-bold text-white">4,200</div>
            </div>
          </div>

          <div>
            <div className="flex items-center justify-between text-sm mb-2">
              <span className="font-semibold text-slate-200">Progress to Rank #41</span>
              <span className="text-slate-400">200 pts needed</span>
            </div>
            <div className="h-2 w-full bg-slate-800 rounded-full overflow-hidden">
              <div className="h-full bg-yellow-500 rounded-full w-2/3" />
            </div>
          </div>
        </div>
      ) : (
        <div className="relative z-10 p-8 text-center bg-slate-950 border border-white/5 rounded-xl mt-6">
          <p className="text-slate-400">Complete an activity to see your ranking.</p>
        </div>
      )}
    </div>
  );
}

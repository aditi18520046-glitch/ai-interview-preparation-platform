import React from 'react';
import { Trophy, TrendingUp, BarChart2 } from 'lucide-react';

export default function LeaderboardHero({ hasActivity }: { hasActivity?: boolean }) {
  return (
    <div className="grid lg:grid-cols-2 gap-12 items-center bg-slate-900 border border-white/5 rounded-[32px] p-8 md:p-12 relative overflow-hidden">
      {/* Background Gradients */}
      <div className="absolute top-0 left-0 w-[500px] h-[500px] bg-yellow-500/10 rounded-full blur-[100px] -translate-x-1/2 -translate-y-1/2 pointer-events-none" />
      <div className="absolute bottom-0 right-0 w-[500px] h-[500px] bg-indigo-500/10 rounded-full blur-[100px] translate-x-1/2 translate-y-1/2 pointer-events-none" />

      {/* Left side */}
      <div className="relative z-10 text-center lg:text-left">
        <div className="flex flex-wrap items-center justify-center lg:justify-start gap-3 mb-6">
          <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-yellow-500/10 border border-yellow-500/20 text-yellow-400 text-xs font-semibold">
            <Trophy className="w-3.5 h-3.5" /> Live Rankings
          </div>
          <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-xs font-semibold">
            <TrendingUp className="w-3.5 h-3.5" /> Updated Daily
          </div>
          <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-indigo-500/10 border border-indigo-500/20 text-indigo-400 text-xs font-semibold">
            <BarChart2 className="w-3.5 h-3.5" /> AI Powered
          </div>
        </div>

        <h1 className="text-4xl md:text-5xl font-extrabold text-white mb-6 tracking-tight">
          Leaderboard
        </h1>
        
        <p className="text-lg text-slate-300 leading-relaxed max-w-2xl mx-auto lg:mx-0 mb-8">
          Recognize top performers, compare your progress, and stay motivated by competing with learners across resume analysis, mock interviews, coding practice, and overall interview preparation.
        </p>
        
        <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4">
          <button className="w-full sm:w-auto px-8 py-3.5 rounded-xl bg-gradient-to-r from-yellow-500 to-orange-500 text-white font-bold text-[15px] shadow-lg shadow-yellow-500/25 hover:-translate-y-0.5 hover:shadow-yellow-500/40 transition-all flex items-center justify-center gap-2">
            <Trophy className="w-5 h-5" /> My Ranking
          </button>
          <button className="w-full sm:w-auto px-8 py-3.5 rounded-xl bg-white/5 text-white font-bold text-[15px] border border-white/10 hover:bg-white/10 transition-all flex items-center justify-center gap-2">
            <BarChart2 className="w-5 h-5" /> View Performance
          </button>
        </div>
      </div>

      {/* Right side - Premium Card */}
      <div className="flex justify-center items-center lg:justify-end relative z-10">
        <div className="w-full max-w-sm bg-slate-950/50 backdrop-blur-xl border border-white/10 rounded-[32px] p-8 flex flex-col items-center justify-center text-center relative overflow-hidden group">
          <div className="absolute inset-0 bg-gradient-to-b from-yellow-500/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
          
          <div className="w-24 h-24 rounded-full bg-gradient-to-br from-yellow-400 to-orange-500 p-1 mb-6 shadow-xl shadow-yellow-500/20">
            <div className="w-full h-full bg-slate-950 rounded-full flex items-center justify-center">
              <Trophy className="w-10 h-10 text-yellow-400 drop-shadow-[0_0_8px_rgba(250,204,21,0.5)]" />
            </div>
          </div>
          
          <h3 className="text-sm font-semibold text-slate-400 mb-1 uppercase tracking-wider">My Current Rank</h3>
          <h2 className="text-5xl font-extrabold text-transparent bg-clip-text bg-gradient-to-b from-white to-slate-400 mb-6">{hasActivity ? '#42' : 'Unranked'}</h2>
          
          <div className="w-full h-px bg-white/5 mb-6" />
          
          <div className="grid grid-cols-3 w-full gap-4 text-center divide-x divide-white/5">
            <div>
              <div className="text-[10px] text-slate-400 uppercase tracking-wider mb-1">Score</div>
              <div className="text-lg font-bold text-white">{hasActivity ? '8,450' : '0'}</div>
            </div>
            <div>
              <div className="text-[10px] text-slate-400 uppercase tracking-wider mb-1">Level</div>
              <div className="text-lg font-bold text-white">{hasActivity ? 'Gold' : '--'}</div>
            </div>
            <div>
              <div className="text-[10px] text-slate-400 uppercase tracking-wider mb-1">Badge</div>
              <div className={`text-lg font-bold ${hasActivity ? 'text-yellow-400' : 'text-slate-500'}`}>{hasActivity ? 'Pro' : '--'}</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

import React from 'react';
import { Calendar, Clock, Zap, Play } from 'lucide-react';

export default function CodingDailyChallenge({ onSolve }: { onSolve: () => void }) {
  return (
    <div className="space-y-8">
      <div className="text-center md:text-left">
        <h2 className="text-2xl md:text-3xl font-bold text-white flex items-center gap-3 justify-center md:justify-start">
          <Calendar className="w-8 h-8 text-orange-400" /> Daily Coding Challenge
        </h2>
        <p className="text-slate-400 mt-2 text-lg">Keep your streak alive with today's featured problem.</p>
      </div>

      <div className="bg-gradient-to-br from-slate-900 to-slate-950 border border-white/5 rounded-[18px] p-6 md:p-8 flex flex-col md:flex-row items-center justify-between gap-8 shadow-xl shadow-black/20 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-64 h-64 bg-orange-500/10 rounded-full blur-[80px] pointer-events-none -translate-y-1/2 translate-x-1/2" />
        
        <div className="flex-1 space-y-4 relative z-10 w-full text-center md:text-left">
          <div className="flex items-center justify-center md:justify-start gap-3">
            <span className="px-3 py-1 rounded-lg text-xs font-bold border uppercase tracking-wider text-orange-400 bg-orange-500/10 border-orange-500/20">
              Medium
            </span>
            <span className="text-sm font-semibold text-slate-400">July 19, 2026</span>
          </div>
          
          <h3 className="text-2xl md:text-3xl font-bold text-slate-100">Longest Palindromic Substring</h3>
          
          <div className="flex flex-wrap items-center justify-center md:justify-start gap-4 text-sm font-medium">
            <div className="flex items-center gap-1.5 text-slate-300 bg-white/5 px-4 py-2 rounded-xl border border-white/5">
              <Clock className="w-4 h-4 text-slate-400" /> 25 mins estimated
            </div>
            <div className="flex items-center gap-1.5 text-amber-300 bg-amber-500/10 px-4 py-2 rounded-xl border border-amber-500/20">
              <Zap className="w-4 h-4 fill-amber-400 text-amber-400" /> +50 XP Reward
            </div>
          </div>
        </div>
        
        <div className="w-full md:w-auto relative z-10 shrink-0">
          <button 
            onClick={onSolve}
            className="w-full md:w-auto px-8 py-4 rounded-xl bg-orange-600 hover:bg-orange-500 text-white font-bold text-[16px] shadow-lg shadow-orange-600/20 transition-all flex items-center justify-center gap-2"
          >
            <Play className="w-5 h-5 fill-current" /> Start Challenge
          </button>
        </div>
      </div>
    </div>
  );
}

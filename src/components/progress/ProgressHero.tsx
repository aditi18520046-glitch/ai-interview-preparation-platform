import React from 'react';
import { Target, Activity, Zap, TrendingUp, BarChart2 } from 'lucide-react';

export default function ProgressHero({ hasActivity }: { hasActivity?: boolean }) {
  return (
    <div className="grid lg:grid-cols-2 gap-12 items-center bg-slate-900 border border-white/5 rounded-[32px] p-8 md:p-12 relative overflow-hidden">
      {/* Background Gradients */}
      <div className="absolute top-0 left-0 w-[500px] h-[500px] bg-indigo-500/10 rounded-full blur-[100px] -translate-x-1/2 -translate-y-1/2 pointer-events-none" />
      <div className="absolute bottom-0 right-0 w-[500px] h-[500px] bg-emerald-500/10 rounded-full blur-[100px] translate-x-1/2 translate-y-1/2 pointer-events-none" />

      {/* Left side */}
      <div className="relative z-10 text-center lg:text-left">
        <div className="flex flex-wrap items-center justify-center lg:justify-start gap-3 mb-6">
          <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-indigo-500/10 border border-indigo-500/20 text-indigo-400 text-xs font-semibold">
            <Zap className="w-3.5 h-3.5" /> AI Insights
          </div>
          <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-xs font-semibold">
            <Activity className="w-3.5 h-3.5" /> Personal Analytics
          </div>
          <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-purple-500/10 border border-purple-500/20 text-purple-400 text-xs font-semibold">
            <TrendingUp className="w-3.5 h-3.5" /> Real-Time Progress
          </div>
        </div>

        <h1 className="text-4xl md:text-5xl font-extrabold text-white mb-6 tracking-tight">
          My Progress
        </h1>
        
        <p className="text-lg text-slate-300 leading-relaxed max-w-2xl mx-auto lg:mx-0 mb-8">
          Monitor your interview preparation journey with AI-powered performance insights, skill development, and personalized recommendations.
        </p>
        
        <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4">
          <button className="w-full sm:w-auto px-8 py-3.5 rounded-xl bg-gradient-to-r from-indigo-600 to-purple-600 text-white font-bold text-[15px] shadow-lg shadow-indigo-500/25 hover:-translate-y-0.5 hover:shadow-indigo-500/40 transition-all flex items-center justify-center gap-2">
            <BarChart2 className="w-5 h-5" /> View Detailed Report
          </button>
          <button className="w-full sm:w-auto px-8 py-3.5 rounded-xl bg-white/5 text-white font-bold text-[15px] border border-white/10 hover:bg-white/10 transition-all flex items-center justify-center gap-2">
            <Target className="w-5 h-5" /> Continue Practice
          </button>
        </div>
      </div>

      {/* Right side - Summary Card */}
      <div className="flex justify-center items-center lg:justify-end relative z-10">
        <div className="w-full max-w-sm bg-slate-950/50 backdrop-blur-xl border border-white/10 rounded-[32px] p-8 flex flex-col items-center justify-center text-center">
          <div className="w-20 h-20 rounded-2xl bg-indigo-500/10 flex items-center justify-center mb-6">
            <TrendingUp className={`w-10 h-10 ${hasActivity ? 'text-indigo-400' : 'text-slate-500'}`} />
          </div>
          <h2 className="text-3xl font-bold text-white mb-2">{hasActivity ? '78%' : '0%'}</h2>
          <p className={`text-sm font-semibold mb-6 uppercase tracking-wider ${hasActivity ? 'text-indigo-400' : 'text-slate-500'}`}>Overall Progress</p>
          
          <div className="w-full h-px bg-white/5 mb-6" />
          
          <div className="flex justify-between w-full text-left mb-4">
            <div>
              <div className="text-xs text-slate-400 mb-1">Interview Readiness</div>
              <div className="text-lg font-bold text-white">{hasActivity ? '82%' : '0%'}</div>
            </div>
            <div className="text-right">
              <div className="text-xs text-slate-400 mb-1">Learning Streak</div>
              <div className="text-lg font-bold text-white">{hasActivity ? '12 Days' : '0 Days'}</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

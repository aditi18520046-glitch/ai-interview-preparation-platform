import React from 'react';
import { Target, TrendingUp, CheckCircle2, Clock, CalendarDays, BrainCircuit } from 'lucide-react';

export default function SkillProgressDashboard() {
  return (
    <div className="bg-slate-900 border border-white/5 rounded-[32px] p-6 md:p-8 h-full">
      <div className="flex items-center justify-between mb-8">
        <h3 className="text-xl font-bold text-white flex items-center gap-2">
          <TrendingUp className="w-5 h-5 text-indigo-400" />
          Progress Overview
        </h3>
        <select className="bg-slate-950 border border-white/10 rounded-lg px-3 py-1.5 text-sm text-slate-300 focus:outline-none">
          <option>This Week</option>
          <option>This Month</option>
          <option>All Time</option>
        </select>
      </div>

      <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        <div className="bg-slate-950/50 border border-white/5 rounded-2xl p-4">
          <div className="flex items-center justify-between mb-2">
            <span className="text-slate-400 text-sm">Overall Progress</span>
            <Target className="w-4 h-4 text-indigo-400" />
          </div>
          <div className="text-2xl font-bold text-white mb-1">16%</div>
          <div className="text-xs text-indigo-400 flex items-center gap-1">
            <TrendingUp className="w-3 h-3" /> +2% this week
          </div>
        </div>

        <div className="bg-slate-950/50 border border-white/5 rounded-2xl p-4">
          <div className="flex items-center justify-between mb-2">
            <span className="text-slate-400 text-sm">Completed Topics</span>
            <CheckCircle2 className="w-4 h-4 text-emerald-400" />
          </div>
          <div className="text-2xl font-bold text-white mb-1">12<span className="text-sm text-slate-500 font-medium">/64</span></div>
          <div className="text-xs text-emerald-400">On track</div>
        </div>

        <div className="bg-slate-950/50 border border-white/5 rounded-2xl p-4">
          <div className="flex items-center justify-between mb-2">
            <span className="text-slate-400 text-sm">Learning Streak</span>
            <CalendarDays className="w-4 h-4 text-orange-400" />
          </div>
          <div className="text-2xl font-bold text-white mb-1">5 <span className="text-sm text-slate-500 font-medium">Days</span></div>
          <div className="text-xs text-slate-500">Personal best: 14</div>
        </div>

        <div className="bg-slate-950/50 border border-white/5 rounded-2xl p-4">
          <div className="flex items-center justify-between mb-2">
            <span className="text-slate-400 text-sm">Avg. Daily Study</span>
            <Clock className="w-4 h-4 text-purple-400" />
          </div>
          <div className="text-2xl font-bold text-white mb-1">2.4<span className="text-sm text-slate-500 font-medium">h</span></div>
          <div className="text-xs text-purple-400">Target: 3.0h</div>
        </div>
      </div>

      <div className="grid md:grid-cols-2 gap-6">
        <div className="bg-slate-950/30 rounded-2xl p-5 border border-white/5">
          <h4 className="text-sm font-medium text-slate-300 mb-4 flex items-center gap-2">
            <BrainCircuit className="w-4 h-4 text-indigo-400" /> Weekly Goal Completion
          </h4>
          <div className="space-y-4">
            <div>
              <div className="flex justify-between text-xs mb-1">
                <span className="text-slate-400">Video Lessons</span>
                <span className="text-slate-300">4/5</span>
              </div>
              <div className="h-1.5 w-full bg-slate-800 rounded-full overflow-hidden">
                <div className="h-full bg-indigo-500 rounded-full" style={{ width: '80%' }} />
              </div>
            </div>
            <div>
              <div className="flex justify-between text-xs mb-1">
                <span className="text-slate-400">Coding Practice</span>
                <span className="text-slate-300">12/20</span>
              </div>
              <div className="h-1.5 w-full bg-slate-800 rounded-full overflow-hidden">
                <div className="h-full bg-purple-500 rounded-full" style={{ width: '60%' }} />
              </div>
            </div>
            <div>
              <div className="flex justify-between text-xs mb-1">
                <span className="text-slate-400">Mock Tests</span>
                <span className="text-slate-300">1/2</span>
              </div>
              <div className="h-1.5 w-full bg-slate-800 rounded-full overflow-hidden">
                <div className="h-full bg-emerald-500 rounded-full" style={{ width: '50%' }} />
              </div>
            </div>
          </div>
        </div>

        <div className="bg-slate-950/30 rounded-2xl p-5 border border-white/5 flex flex-col justify-center items-center text-center">
           <div className="relative w-32 h-32 mb-4">
             {/* Simple circular progress visualization */}
             <svg className="w-full h-full transform -rotate-90" viewBox="0 0 100 100">
               <circle cx="50" cy="50" r="40" stroke="currentColor" strokeWidth="8" fill="transparent" className="text-slate-800" />
               <circle cx="50" cy="50" r="40" stroke="currentColor" strokeWidth="8" fill="transparent" strokeDasharray="251.2" strokeDashoffset="211" className="text-indigo-500" />
             </svg>
             <div className="absolute inset-0 flex flex-col items-center justify-center">
               <span className="text-2xl font-bold text-white">16%</span>
             </div>
           </div>
           <h4 className="text-sm font-medium text-white mb-1">Roadmap Completion</h4>
           <p className="text-xs text-slate-400 max-w-[200px]">Keep up the momentum! You're making steady progress.</p>
        </div>
      </div>
    </div>
  );
}

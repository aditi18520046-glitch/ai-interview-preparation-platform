import React from 'react';
import { Target, CheckCircle2 } from 'lucide-react';

export default function ProgressGoal({ hasActivity }: { hasActivity?: boolean }) {
  return (
    <div className="bg-slate-900 border border-white/5 rounded-[32px] p-6 md:p-8 relative overflow-hidden group">
      {/* Background glow */}
      <div className="absolute top-0 right-0 w-32 h-32 bg-indigo-500/10 rounded-full blur-[50px] -translate-y-1/2 translate-x-1/2 group-hover:bg-indigo-500/20 transition-colors pointer-events-none" />

      <div className="flex items-center gap-3 mb-6 relative z-10">
        <div className="w-10 h-10 rounded-xl bg-indigo-500/10 flex items-center justify-center">
          <Target className="w-5 h-5 text-indigo-400" />
        </div>
        <div>
          <h2 className="text-xl font-bold text-white">Weekly Goal</h2>
          <p className="text-sm text-slate-400">Your current focus</p>
        </div>
      </div>

      <div className="relative z-10">
        <div className="flex items-center justify-between mb-4">
          <h3 className="font-semibold text-slate-200">Complete 3 Mock Interviews</h3>
          <span className={`${hasActivity ? 'text-indigo-400' : 'text-slate-500'} font-bold`}>{hasActivity ? '1 / 3' : '0 / 3'}</span>
        </div>
        
        <div className="h-2 w-full bg-slate-800 rounded-full overflow-hidden mb-4">
          <div className={`h-full ${hasActivity ? 'bg-indigo-500 w-1/3' : 'bg-slate-700 w-0'} rounded-full transition-all duration-1000`} />
        </div>

        <div className="space-y-3">
          <div className="flex justify-between items-center text-sm">
            <span className="text-slate-400">Remaining Tasks:</span>
            <span className="font-semibold text-slate-200">{hasActivity ? '2 Interviews' : '3 Interviews'}</span>
          </div>
          <div className="flex justify-between items-center text-sm">
            <span className="text-slate-400">Estimated Completion:</span>
            <span className="font-semibold text-slate-200">{hasActivity ? 'Thursday' : '--'}</span>
          </div>
        </div>
      </div>
    </div>
  );
}

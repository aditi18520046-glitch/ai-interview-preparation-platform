import React from 'react';
import { Target, Code2 } from 'lucide-react';

export default function ProgressCTA() {
  return (
    <div className="bg-gradient-to-r from-indigo-900/50 to-purple-900/50 border border-white/10 rounded-[32px] p-8 md:p-12 text-center relative overflow-hidden">
      {/* Decorative elements */}
      <div className="absolute top-0 right-0 w-64 h-64 bg-indigo-500/20 rounded-full blur-[80px] -translate-y-1/2 translate-x-1/2 pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-64 h-64 bg-purple-500/20 rounded-full blur-[80px] translate-y-1/2 -translate-x-1/2 pointer-events-none" />

      <div className="relative z-10 max-w-2xl mx-auto">
        <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">Keep Building Your Career</h2>
        <p className="text-lg text-slate-300 mb-8">
          Continue practicing to improve your interview readiness and unlock your next achievement.
        </p>
        
        <div className="flex flex-col sm:flex-row justify-center gap-4">
          <button className="px-8 py-3.5 rounded-xl bg-indigo-500 hover:bg-indigo-600 text-white font-bold text-[15px] shadow-lg shadow-indigo-500/25 transition-all flex items-center justify-center gap-2">
            <Target className="w-5 h-5" /> Practice Interview
          </button>
          <button className="px-8 py-3.5 rounded-xl bg-white/5 text-white font-bold text-[15px] border border-white/10 hover:bg-white/10 transition-all flex items-center justify-center gap-2">
            <Code2 className="w-5 h-5" /> Solve Coding Challenge
          </button>
        </div>
      </div>
    </div>
  );
}

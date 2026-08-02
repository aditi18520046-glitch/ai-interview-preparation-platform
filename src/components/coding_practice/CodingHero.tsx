import React from 'react';
import { Play, ArrowRight } from 'lucide-react';

export default function CodingHero({ onStart }: { onStart: () => void }) {
  return (
    <div className="relative overflow-hidden bg-slate-900 border border-white/5 rounded-[24px] shadow-sm flex flex-col items-center justify-center text-center py-16 md:py-24 px-6 md:px-12">
      <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-gradient-to-br from-indigo-500/20 via-purple-500/10 to-transparent rounded-full blur-[100px] pointer-events-none -translate-y-1/2 translate-x-1/4" />
      <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-gradient-to-tr from-blue-500/20 via-indigo-500/10 to-transparent rounded-full blur-[100px] pointer-events-none translate-y-1/2 -translate-x-1/4" />
      
      <div className="relative z-10 space-y-8 max-w-4xl mx-auto flex flex-col items-center">
        <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white leading-tight tracking-tight">
          Master Coding Interviews with <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 to-purple-400">AI</span>
        </h1>
        <p className="text-lg md:text-xl text-slate-300 leading-relaxed max-w-3xl">
          Practice programming languages, data structures, algorithms, SQL, and computer science concepts through structured learning paths, AI-assisted coding, and interview-focused challenges.
        </p>
        
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-4 w-full sm:w-auto">
          <button 
            onClick={onStart}
            className="w-full sm:w-auto px-8 py-4 rounded-xl bg-gradient-to-r from-indigo-600 to-purple-600 text-white font-bold text-[16px] shadow-lg shadow-indigo-500/25 hover:-translate-y-0.5 hover:shadow-indigo-500/40 transition-all flex items-center justify-center gap-2"
          >
            <Play className="w-5 h-5 fill-current" /> Start Coding
          </button>
          <button className="w-full sm:w-auto px-8 py-4 rounded-xl bg-white/5 text-white font-bold text-[16px] border border-white/10 hover:bg-white/10 transition-all flex items-center justify-center gap-2">
            Continue Practice <ArrowRight className="w-5 h-5" />
          </button>
        </div>
      </div>
    </div>
  );
}

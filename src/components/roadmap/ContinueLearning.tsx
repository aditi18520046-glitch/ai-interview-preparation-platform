import React from 'react';
import { PlayCircle, Clock, Bookmark, ArrowRight } from 'lucide-react';

export default function ContinueLearning() {
  return (
    <div className="bg-slate-900 border border-white/5 rounded-[32px] p-6 md:p-8 relative overflow-hidden">
      {/* Background Effect */}
      <div className="absolute top-0 right-0 w-64 h-64 bg-indigo-500/10 rounded-full blur-[80px] -translate-y-1/2 translate-x-1/3 pointer-events-none" />
      
      <div className="flex items-center justify-between mb-6 relative z-10">
        <div>
          <h3 className="text-xl font-bold text-white mb-1">Continue Learning</h3>
          <p className="text-sm text-slate-400">Pick up right where you left off</p>
        </div>
        <button className="text-sm font-medium text-indigo-400 hover:text-indigo-300 transition-colors flex items-center gap-1">
          View all <ArrowRight className="w-4 h-4" />
        </button>
      </div>

      <div className="bg-slate-950/50 border border-white/5 rounded-2xl p-5 flex flex-col md:flex-row gap-6 relative z-10 hover:border-indigo-500/30 transition-colors group cursor-pointer">
        <div className="w-full md:w-48 h-32 bg-slate-800 rounded-xl relative overflow-hidden shrink-0">
          <div className="absolute inset-0 bg-gradient-to-br from-indigo-500/20 to-purple-600/20" />
          <div className="absolute inset-0 flex items-center justify-center">
            <PlayCircle className="w-10 h-10 text-white/80 group-hover:text-white transition-colors group-hover:scale-110 duration-300" />
          </div>
          <div className="absolute bottom-2 right-2 px-2 py-1 bg-black/60 backdrop-blur-sm rounded text-[10px] font-medium text-white">
            12:45
          </div>
        </div>
        
        <div className="flex-1 flex flex-col justify-center">
          <div className="flex justify-between items-start mb-2">
            <div>
              <span className="text-xs font-bold text-indigo-400 uppercase tracking-wider mb-1 block">Stage 2 • Object-Oriented Programming</span>
              <h4 className="text-lg font-bold text-white group-hover:text-indigo-300 transition-colors">Understanding Polymorphism</h4>
            </div>
            <button className="p-2 text-slate-400 hover:text-white hover:bg-white/5 rounded-lg transition-colors">
              <Bookmark className="w-4 h-4" />
            </button>
          </div>
          
          <p className="text-sm text-slate-400 mb-4 line-clamp-2">
            A deep dive into how polymorphism allows objects of different types to be treated as instances of the same class through a common interface.
          </p>
          
          <div className="flex items-center justify-between mt-auto">
            <div className="flex items-center gap-4 text-xs font-medium text-slate-300">
              <span className="flex items-center gap-1.5"><Clock className="w-3.5 h-3.5 text-slate-500" /> 15 mins left</span>
              <span className="text-indigo-400">65% Completed</span>
            </div>
            <div className="w-32 h-1.5 bg-slate-800 rounded-full overflow-hidden hidden sm:block">
              <div className="h-full bg-indigo-500 rounded-full" style={{ width: '65%' }} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

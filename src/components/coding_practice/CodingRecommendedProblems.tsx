import React from 'react';
import { Target, ChevronRight, Brain } from 'lucide-react';

export default function CodingRecommendedProblems({ onSolve }: { onSolve: (id: string) => void }) {
  const recommendations = [
    { id: '1', title: 'Container With Most Water', reason: 'Matches your weak topic: Two Pointers', diff: 'Medium', color: 'text-orange-400' },
    { id: '2', title: 'Merge k Sorted Lists', reason: 'Next step in: Linked Lists', diff: 'Hard', color: 'text-red-400' },
    { id: '3', title: 'Valid Parentheses', reason: 'Language warm-up: Python', diff: 'Easy', color: 'text-emerald-400' },
    { id: '4', title: 'Climbing Stairs', reason: 'Introduction to: Dynamic Programming', diff: 'Easy', color: 'text-emerald-400' },
  ];

  return (
    <div className="space-y-8">
      <div className="text-center md:text-left">
        <h2 className="text-2xl md:text-3xl font-bold text-white flex items-center gap-3 justify-center md:justify-start">
          <Target className="w-8 h-8 text-cyan-400" /> Recommended Next Problems
        </h2>
        <p className="text-slate-400 mt-2 text-lg">AI-curated challenges based on your difficulty curve and weak topics.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {recommendations.map((rec, idx) => (
          <div key={idx} className="bg-slate-900 border border-white/5 rounded-[18px] p-6 flex flex-col hover:border-cyan-500/30 hover:bg-slate-800/80 transition-all cursor-pointer shadow-lg shadow-black/10 group" onClick={() => onSolve(rec.id)}>
            <div className="flex items-center gap-2 mb-4 text-xs font-semibold text-slate-400 bg-slate-950/50 px-3 py-1.5 rounded-lg border border-white/5 inline-flex self-start">
              <Brain className="w-4 h-4 text-cyan-400" /> {rec.reason}
            </div>
            <h3 className="text-lg font-bold text-slate-100 mb-6 group-hover:text-cyan-300 transition-colors line-clamp-2">{rec.title}</h3>
            
            <div className="flex items-center justify-between mt-auto border-t border-white/5 pt-4">
              <span className={`text-sm font-bold ${rec.color}`}>{rec.diff}</span>
              <button className="w-8 h-8 rounded-lg bg-white/5 text-slate-300 flex items-center justify-center group-hover:bg-cyan-500 group-hover:text-white transition-colors">
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

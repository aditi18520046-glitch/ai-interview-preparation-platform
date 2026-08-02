import React from 'react';
import { Route, Clock, BookOpen, ArrowRight } from 'lucide-react';

export default function CodingLearningPaths() {
  const paths = [
    { title: "Java Interview Preparation", difficulty: "Medium", time: "40 Hours", lessons: 120 },
    { title: "Python Programming Path", difficulty: "Easy", time: "25 Hours", lessons: 85 },
    { title: "Dynamic Programming Roadmap", difficulty: "Hard", time: "50 Hours", lessons: 75 },
    { title: "SQL Interview Track", difficulty: "Medium", time: "30 Hours", lessons: 90 },
    { title: "Frontend Development Path", difficulty: "Medium", time: "45 Hours", lessons: 110 },
    { title: "Backend Development Path", difficulty: "Hard", time: "60 Hours", lessons: 140 },
    { title: "Machine Learning Roadmap", difficulty: "Hard", time: "80 Hours", lessons: 150 },
  ];

  const getDiffColor = (diff: string) => {
    switch(diff) {
      case 'Easy': return 'text-emerald-400 bg-emerald-500/10 border-emerald-500/20';
      case 'Medium': return 'text-orange-400 bg-orange-500/10 border-orange-500/20';
      case 'Hard': return 'text-red-400 bg-red-500/10 border-red-500/20';
      default: return 'text-slate-400 bg-slate-500/10 border-slate-500/20';
    }
  };

  return (
    <div className="space-y-8">
      <div className="text-center md:text-left">
        <h2 className="text-2xl md:text-3xl font-bold text-white flex items-center gap-3 justify-center md:justify-start">
          <Route className="w-8 h-8 text-indigo-400" /> Recommended Learning Paths
        </h2>
        <p className="text-slate-400 mt-2 text-lg">Structured curricula designed to take you from beginner to interview-ready.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {paths.map((path, idx) => (
          <div key={idx} className="bg-slate-900 border border-white/5 rounded-[18px] p-6 flex flex-col hover:border-indigo-500/30 hover:bg-slate-800/50 transition-all group shadow-lg shadow-black/10">
            <div className="mb-4">
              <span className={`inline-block px-3 py-1 rounded-lg text-xs font-bold border uppercase tracking-wider ${getDiffColor(path.difficulty)}`}>
                {path.difficulty}
              </span>
            </div>
            <h3 className="text-xl font-bold text-slate-100 mb-4 group-hover:text-indigo-300 transition-colors">{path.title}</h3>
            
            <div className="flex items-center gap-4 text-sm text-slate-400 font-medium mb-8">
              <div className="flex items-center gap-1.5 bg-slate-950/50 px-3 py-1.5 rounded-lg border border-white/5">
                <Clock className="w-4 h-4 text-slate-500" /> {path.time}
              </div>
              <div className="flex items-center gap-1.5 bg-slate-950/50 px-3 py-1.5 rounded-lg border border-white/5">
                <BookOpen className="w-4 h-4 text-slate-500" /> {path.lessons} Lessons
              </div>
            </div>
            
            <div className="mt-auto pt-4 border-t border-white/5">
              <button className="w-full py-3 rounded-xl bg-white/5 text-white font-bold text-sm border border-white/10 hover:bg-indigo-600 hover:border-indigo-500 transition-all flex items-center justify-center gap-2 group-hover:shadow-lg group-hover:shadow-indigo-500/20">
                Start Learning <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

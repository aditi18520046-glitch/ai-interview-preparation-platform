import React from 'react';
import { BookOpen, Code2, Video, Route } from 'lucide-react';

const recommendations = [
  { title: 'Docker for Beginners', type: 'Course', icon: Video, color: 'text-blue-400', bg: 'bg-blue-500/10' },
  { title: 'Implement a CI/CD Pipeline', type: 'Project', icon: Code2, color: 'text-emerald-400', bg: 'bg-emerald-500/10' },
  { title: 'System Design Mock Interview', type: 'Practice', icon: BookOpen, color: 'text-purple-400', bg: 'bg-purple-500/10' },
  { title: 'DevOps Learning Roadmap', type: 'Roadmap', icon: Route, color: 'text-orange-400', bg: 'bg-orange-500/10' },
];

export default function RALearningRecommendations() {
  return (
    <div className="h-full bg-slate-900 border border-white/5 rounded-[32px] p-6 md:p-8">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h2 className="text-xl font-bold text-white flex items-center gap-2">
            <BookOpen className="w-5 h-5 text-cyan-400" /> Learning Recommendations
          </h2>
          <p className="text-sm text-slate-400 mt-1">Based on your skill gap analysis</p>
        </div>
      </div>

      <div className="space-y-4">
        {recommendations.map((rec, i) => (
          <div key={i} className="bg-slate-950 border border-white/5 rounded-xl p-4 flex items-start gap-4 hover:border-white/10 transition-colors cursor-pointer group">
            <div className={`w-10 h-10 rounded-lg ${rec.bg} flex items-center justify-center flex-shrink-0 mt-0.5`}>
              <rec.icon className={`w-5 h-5 ${rec.color}`} />
            </div>
            <div>
              <h3 className="font-semibold text-slate-200 group-hover:text-white transition-colors">{rec.title}</h3>
              <p className="text-sm text-slate-500 mt-1">{rec.type}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

import React from 'react';
import { Sparkles, ArrowRight, Video, FileText, Code2, Users } from 'lucide-react';

const RECOMMENDATIONS = [
  { icon: Video, title: 'Revise Graph Algorithms', desc: 'Your recent mock test showed weakness in BFS/DFS.', type: 'review', color: 'text-rose-400', bg: 'bg-rose-500/10' },
  { icon: Code2, title: 'Practice Amazon OA', desc: 'Highly relevant for your target timeline.', type: 'practice', color: 'text-emerald-400', bg: 'bg-emerald-500/10' },
  { icon: Users, title: 'Improve Communication', desc: 'Take a behavioral mock interview.', type: 'action', color: 'text-indigo-400', bg: 'bg-indigo-500/10' },
  { icon: FileText, title: 'Complete Resume Review', desc: 'Ensure your resume passes ATS systems.', type: 'action', color: 'text-purple-400', bg: 'bg-purple-500/10' }
];

export default function RoadmapRecommendations() {
  return (
    <div className="bg-slate-900 border border-white/5 rounded-[32px] p-6 md:p-8">
      <div className="flex items-center gap-2 mb-6">
        <Sparkles className="w-5 h-5 text-purple-400" />
        <h3 className="text-xl font-bold text-white">AI Recommendations</h3>
      </div>
      
      <div className="space-y-3">
        {RECOMMENDATIONS.map((rec, i) => (
          <div key={i} className="group p-4 rounded-xl bg-slate-950/50 border border-white/5 hover:border-purple-500/30 transition-all cursor-pointer">
            <div className="flex items-start gap-3">
              <div className={`w-8 h-8 rounded-lg ${rec.bg} flex items-center justify-center shrink-0 mt-0.5`}>
                <rec.icon className={`w-4 h-4 ${rec.color}`} />
              </div>
              <div>
                <h4 className="text-sm font-semibold text-white group-hover:text-purple-400 transition-colors mb-1">{rec.title}</h4>
                <p className="text-xs text-slate-400">{rec.desc}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

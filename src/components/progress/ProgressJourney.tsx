import React from 'react';
import { Route, CheckCircle2, FileText, Code2, Video, TrendingUp } from 'lucide-react';

const journey = [
  { text: 'Newest achievement unlocked', icon: TrendingUp, color: 'text-purple-400', bg: 'bg-purple-500/10' },
  { text: 'Resume ATS score improved', icon: FileText, color: 'text-emerald-400', bg: 'bg-emerald-500/10' },
  { text: 'Interview score increased', icon: Video, color: 'text-indigo-400', bg: 'bg-indigo-500/10' },
  { text: 'Coding challenge solved', icon: Code2, color: 'text-pink-400', bg: 'bg-pink-500/10' },
  { text: 'First Mock Interview completed', icon: Video, color: 'text-blue-400', bg: 'bg-blue-500/10' },
  { text: 'Resume improved', icon: FileText, color: 'text-emerald-400', bg: 'bg-emerald-500/10' },
  { text: 'Resume uploaded', icon: FileText, color: 'text-slate-400', bg: 'bg-slate-500/10' },
];

export default function ProgressJourney({ hasActivity }: { hasActivity?: boolean }) {
  return (
    <div className="bg-slate-900 border border-white/5 rounded-[32px] p-6 md:p-8">
      <div className="flex items-center gap-3 mb-8">
        <div className="w-10 h-10 rounded-xl bg-orange-500/10 flex items-center justify-center">
          <Route className="w-5 h-5 text-orange-400" />
        </div>
        <div>
          <h2 className="text-xl font-bold text-white">Personal Learning Journey</h2>
          <p className="text-sm text-slate-400">Your key milestones and progress</p>
        </div>
      </div>

      {hasActivity ? (
        <div className="relative pl-6">
          {/* Vertical Line */}
          <div className="absolute top-0 bottom-0 left-[27px] w-px bg-white/10" />

          <div className="space-y-8 relative">
            {journey.map((step, i) => (
              <div key={i} className="flex items-center gap-6 group">
                <div className={`relative z-10 w-8 h-8 rounded-full ${step.bg} border-4 border-slate-900 flex items-center justify-center shrink-0`}>
                  <div className={`w-2 h-2 rounded-full ${step.color.replace('text-', 'bg-')}`} />
                </div>
                
                <div className="flex-1 min-w-0 bg-slate-950 border border-white/5 rounded-xl p-4 flex flex-col sm:flex-row sm:items-center gap-4 group-hover:border-white/10 transition-colors">
                  <div className="flex items-center gap-4">
                    <div className={`w-10 h-10 shrink-0 rounded-lg ${step.bg} flex items-center justify-center`}>
                      <step.icon className={`w-5 h-5 ${step.color}`} />
                    </div>
                    <div className="font-medium text-slate-300">
                      {step.text}
                    </div>
                  </div>
                  {i === 0 && (
                     <div className="sm:ml-auto w-fit flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-emerald-500/10 text-emerald-400 text-xs font-semibold border border-emerald-500/20">
                       <CheckCircle2 className="w-3.5 h-3.5" /> Latest
                     </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      ) : (
        <div className="p-8 text-center bg-slate-950 border border-white/5 rounded-xl">
          <p className="text-slate-400">Your learning journey will appear here as you complete activities.</p>
        </div>
      )}
    </div>
  );
}

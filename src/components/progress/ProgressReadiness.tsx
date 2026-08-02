import React from 'react';
import { ShieldCheck } from 'lucide-react';

const readiness = [
  { label: 'Resume', score: 85, color: 'bg-emerald-500' },
  { label: 'Technical Skills', score: 70, color: 'bg-indigo-500' },
  { label: 'Coding', score: 65, color: 'bg-pink-500' },
  { label: 'Communication', score: 75, color: 'bg-orange-500' },
  { label: 'Problem Solving', score: 80, color: 'bg-purple-500' },
];

export default function ProgressReadiness({ hasActivity }: { hasActivity?: boolean }) {
  const overallScore = hasActivity ? 82 : 0;

  return (
    <div className="bg-slate-900 border border-white/5 rounded-[32px] p-6 md:p-8">
      <div className="flex items-center gap-3 mb-8">
        <div className="w-10 h-10 rounded-xl bg-emerald-500/10 flex items-center justify-center">
          <ShieldCheck className="w-5 h-5 text-emerald-400" />
        </div>
        <div>
          <h2 className="text-xl font-bold text-white">Interview Readiness</h2>
        </div>
      </div>

      <div className="flex flex-col items-center justify-center mb-8">
        {/* Circular Indicator */}
        <div className="relative w-40 h-40 flex-shrink-0">
          <svg className="w-full h-full transform -rotate-90">
            <circle cx="80" cy="80" r="72" fill="none" stroke="currentColor" strokeWidth="12" className="text-slate-800" />
            <circle cx="80" cy="80" r="72" fill="none" stroke="currentColor" strokeWidth="12" strokeDasharray="452.39" strokeDashoffset={452.39 * (1 - overallScore / 100)} className={`${hasActivity ? 'text-emerald-400' : 'text-slate-700'} transition-all duration-1000`} />
          </svg>
          <div className="absolute inset-0 flex flex-col items-center justify-center">
            <span className="text-4xl font-bold text-white">{overallScore}<span className="text-xl text-slate-500">%</span></span>
          </div>
        </div>
        <p className={`text-sm font-semibold mt-4 uppercase tracking-wider ${hasActivity ? 'text-emerald-400' : 'text-slate-500'}`}>Overall Readiness</p>
      </div>

      <div className="space-y-4">
        {readiness.map((item, i) => {
          const itemScore = hasActivity ? item.score : 0;
          return (
            <div key={i}>
              <div className="flex justify-between text-sm font-medium mb-1.5">
                <span className="text-slate-300">{item.label}</span>
                <span className="text-white">{itemScore}%</span>
              </div>
              <div className="h-2 w-full bg-slate-800 rounded-full overflow-hidden">
                <div className={`h-full ${hasActivity ? item.color : 'bg-slate-700'} rounded-full opacity-80 transition-all duration-1000`} style={{ width: `${itemScore}%` }} />
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

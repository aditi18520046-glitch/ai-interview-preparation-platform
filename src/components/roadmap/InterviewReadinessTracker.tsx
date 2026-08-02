import React from 'react';
import { ShieldCheck, Code2, Users, BrainCircuit, Target, Sparkles } from 'lucide-react';

const READINESS_METRICS = [
  { name: 'Coding Skills', score: 45, icon: Code2, color: 'text-indigo-400', bg: 'bg-indigo-500' },
  { name: 'Problem Solving', score: 35, icon: BrainCircuit, color: 'text-purple-400', bg: 'bg-purple-500' },
  { name: 'System Design', score: 10, icon: Target, color: 'text-rose-400', bg: 'bg-rose-500' },
  { name: 'Communication', score: 70, icon: Users, color: 'text-emerald-400', bg: 'bg-emerald-500' },
];

export default function InterviewReadinessTracker() {
  const overallScore = 40;

  return (
    <div className="bg-slate-900 border border-white/5 rounded-[32px] p-6 md:p-8 h-full">
      <div className="flex items-center justify-between mb-8">
        <h3 className="text-xl font-bold text-white flex items-center gap-2">
          <ShieldCheck className="w-5 h-5 text-emerald-400" />
          Readiness Score
        </h3>
        <span className="text-xs font-medium px-2.5 py-1 bg-emerald-500/10 text-emerald-400 rounded-full border border-emerald-500/20">
          Updating
        </span>
      </div>

      <div className="flex flex-col items-center justify-center mb-8">
        <div className="relative w-40 h-40 mb-4">
          <svg className="w-full h-full" viewBox="0 0 100 100">
            {/* Background track */}
            <path 
              d="M 10 90 A 40 40 0 1 1 90 90" 
              fill="none" 
              stroke="currentColor" 
              strokeWidth="10" 
              className="text-slate-800" 
              strokeLinecap="round"
            />
            {/* Progress track */}
            <path 
              d="M 10 90 A 40 40 0 0 1 70 20" 
              fill="none" 
              stroke="url(#gradient)" 
              strokeWidth="10" 
              strokeLinecap="round"
              className="animate-in fade-in duration-1000"
            />
            <defs>
              <linearGradient id="gradient" x1="0%" y1="0%" x2="100%" y2="0%">
                <stop offset="0%" stopColor="#818cf8" />
                <stop offset="100%" stopColor="#c084fc" />
              </linearGradient>
            </defs>
          </svg>
          <div className="absolute inset-0 flex flex-col items-center justify-center -mt-6">
            <span className="text-4xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 to-purple-400">
              {overallScore}
            </span>
            <span className="text-xs text-slate-400">/ 100</span>
          </div>
        </div>
        
        <div className="text-center">
          <h4 className="text-white font-medium mb-1">Needs Improvement</h4>
          <p className="text-sm text-slate-400 flex items-center justify-center gap-1.5">
            <Sparkles className="w-3.5 h-3.5 text-indigo-400" /> Focus on System Design next
          </p>
        </div>
      </div>

      <div className="space-y-4">
        {READINESS_METRICS.map((metric) => (
          <div key={metric.name}>
            <div className="flex justify-between text-sm mb-2">
              <span className="flex items-center gap-2 text-slate-300">
                <metric.icon className={`w-4 h-4 ${metric.color}`} /> {metric.name}
              </span>
              <span className="text-white font-medium">{metric.score}%</span>
            </div>
            <div className="h-1.5 w-full bg-slate-950 rounded-full overflow-hidden">
              <div 
                className={`h-full rounded-full ${metric.bg}`}
                style={{ width: `${metric.score}%` }}
              />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

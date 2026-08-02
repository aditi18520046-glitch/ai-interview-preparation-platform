import React from 'react';
import { Upload, Cpu, FileSearch, Target, TrendingUp, Building2, Sparkles, FileCheck } from 'lucide-react';

const steps = [
  { icon: Upload, label: 'Upload Resume', color: 'text-slate-300' },
  { icon: Cpu, label: 'AI Processing', color: 'text-indigo-400' },
  { icon: FileSearch, label: 'Resume Parsing', color: 'text-blue-400' },
  { icon: Target, label: 'ATS Evaluation', color: 'text-emerald-400' },
  { icon: TrendingUp, label: 'Skill Analysis', color: 'text-orange-400' },
  { icon: Building2, label: 'Company Matching', color: 'text-purple-400' },
  { icon: Sparkles, label: 'Improvement Suggestions', color: 'text-pink-400' },
  { icon: FileCheck, label: 'Final Report', color: 'text-cyan-400' },
];

export default function RAWorkflow() {
  return (
    <section className="bg-slate-900 border border-white/5 rounded-[32px] p-8 md:p-12 overflow-hidden relative">
      <div className="absolute top-0 right-0 w-[400px] h-[400px] bg-gradient-to-br from-indigo-500/10 to-transparent rounded-full blur-[80px] pointer-events-none -translate-y-1/2 translate-x-1/4" />
      
      <div className="text-center mb-12 relative z-10">
        <h2 className="text-2xl font-bold text-white mb-2">AI Analysis Workflow</h2>
        <p className="text-slate-400">How our engine evaluates your profile in seconds.</p>
      </div>

      <div className="relative z-10">
        {/* Mobile View (Vertical) */}
        <div className="lg:hidden space-y-6">
          {steps.map((step, i) => (
            <div key={i} className="flex items-center gap-4">
              <div className="w-10 h-10 rounded-full bg-slate-800 border border-white/10 flex items-center justify-center flex-shrink-0 z-10 relative">
                <step.icon className={`w-4 h-4 ${step.color}`} />
                {i !== steps.length - 1 && (
                  <div className="absolute top-10 left-1/2 -translate-x-1/2 w-0.5 h-6 bg-slate-800" />
                )}
              </div>
              <div className="text-sm font-semibold text-slate-300">{step.label}</div>
            </div>
          ))}
        </div>

        {/* Desktop View (Horizontal) */}
        <div className="hidden lg:flex items-center justify-between relative px-4">
          <div className="absolute top-1/2 left-8 right-8 h-0.5 bg-slate-800 -translate-y-1/2" />
          
          {steps.map((step, i) => (
            <div key={i} className="flex flex-col items-center gap-4 relative z-10 group">
              <div className="w-12 h-12 rounded-full bg-slate-900 border-2 border-slate-700 group-hover:border-indigo-500 flex items-center justify-center transition-colors">
                <step.icon className={`w-5 h-5 ${step.color}`} />
              </div>
              <div className="text-xs font-semibold text-slate-400 text-center max-w-[100px] group-hover:text-white transition-colors">
                {step.label}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

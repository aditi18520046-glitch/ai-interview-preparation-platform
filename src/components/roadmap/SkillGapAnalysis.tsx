import React from 'react';
import { Activity, AlertTriangle, ArrowRight } from 'lucide-react';

const SKILL_GAPS = [
  { skill: 'Dynamic Programming', current: 20, required: 80, time: '2 Weeks' },
  { skill: 'System Design', current: 10, required: 75, time: '3 Weeks' },
  { skill: 'Graph Algorithms', current: 30, required: 85, time: '1.5 Weeks' }
];

export default function SkillGapAnalysis() {
  return (
    <div className="bg-slate-900 border border-white/5 rounded-[32px] p-6 md:p-8">
      <div className="flex items-center gap-2 mb-6">
        <Activity className="w-5 h-5 text-rose-400" />
        <h3 className="text-xl font-bold text-white">Skill Gap Analysis</h3>
      </div>
      
      <p className="text-sm text-slate-400 mb-6">
        Based on your target role (Software Engineer at Google), we identified these key areas for improvement.
      </p>

      <div className="space-y-6">
        {SKILL_GAPS.map((gap, i) => (
          <div key={i} className="space-y-2">
            <div className="flex justify-between text-sm">
              <span className="font-medium text-white">{gap.skill}</span>
              <span className="text-slate-500 text-xs">Est: {gap.time}</span>
            </div>
            
            <div className="relative h-2 w-full bg-slate-800 rounded-full overflow-hidden">
              {/* Target Marker */}
              <div 
                className="absolute top-0 bottom-0 w-1 bg-white z-10" 
                style={{ left: `${gap.required}%` }} 
                title={`Required: ${gap.required}%`}
              />
              {/* Current Progress */}
              <div 
                className="absolute top-0 bottom-0 left-0 bg-gradient-to-r from-rose-500 to-orange-500 rounded-full"
                style={{ width: `${gap.current}%` }}
              />
            </div>
            
            <div className="flex justify-between text-[10px] text-slate-500">
              <span>Current</span>
              <span style={{ paddingRight: `${100 - gap.required}%` }}>Required</span>
            </div>
          </div>
        ))}
      </div>

      <div className="mt-6 p-4 rounded-xl bg-indigo-500/10 border border-indigo-500/20">
        <h4 className="text-sm font-bold text-indigo-400 flex items-center gap-2 mb-1">
          <AlertTriangle className="w-4 h-4" /> AI Suggestion
        </h4>
        <p className="text-xs text-slate-300 mb-3 leading-relaxed">
          Your system design fundamentals need the most attention. We recommend starting the "System Design" stage early to balance the heavy load.
        </p>
        <button className="text-xs font-semibold text-indigo-400 hover:text-indigo-300 transition-colors flex items-center gap-1">
          Adjust Roadmap <ArrowRight className="w-3 h-3" />
        </button>
      </div>
    </div>
  );
}

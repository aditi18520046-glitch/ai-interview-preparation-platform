import React from 'react';
import { Sparkles, Zap, Target, AlertTriangle } from 'lucide-react';

const skills = {
  strong: ['Java', 'React', 'Problem Solving'],
  improving: ['Python', 'System Design'],
  needsAttention: ['SQL', 'Communication', 'Docker']
};

export default function ProgressSkills({ hasActivity }: { hasActivity?: boolean }) {
  return (
    <div className="bg-slate-900 border border-white/5 rounded-[32px] p-6 md:p-8">
      <div className="flex items-center gap-3 mb-8">
        <div className="w-10 h-10 rounded-xl bg-purple-500/10 flex items-center justify-center">
          <Sparkles className="w-5 h-5 text-purple-400" />
        </div>
        <div>
          <h2 className="text-xl font-bold text-white">Skill Growth</h2>
          <p className="text-sm text-slate-400">Skills detected from your completed activities</p>
        </div>
      </div>

      {hasActivity ? (
        <div className="grid md:grid-cols-3 gap-6">
          {/* Strong Skills */}
          <div className="space-y-4">
            <div className="flex items-center gap-2">
              <Zap className="w-4 h-4 text-emerald-400" />
              <h3 className="text-sm font-semibold text-slate-300">Strong Skills</h3>
            </div>
            <div className="flex flex-wrap gap-2">
              {skills.strong.map((skill, i) => (
                <span key={i} className="px-3 py-1.5 rounded-lg bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-xs font-semibold">
                  {skill}
                </span>
              ))}
            </div>
          </div>

          {/* Improving */}
          <div className="space-y-4">
            <div className="flex items-center gap-2">
              <Target className="w-4 h-4 text-indigo-400" />
              <h3 className="text-sm font-semibold text-slate-300">Skills Improving</h3>
            </div>
            <div className="flex flex-wrap gap-2">
              {skills.improving.map((skill, i) => (
                <span key={i} className="px-3 py-1.5 rounded-lg bg-indigo-500/10 border border-indigo-500/20 text-indigo-400 text-xs font-semibold">
                  {skill}
                </span>
              ))}
            </div>
          </div>

          {/* Needs Attention */}
          <div className="space-y-4">
            <div className="flex items-center gap-2">
              <AlertTriangle className="w-4 h-4 text-orange-400" />
              <h3 className="text-sm font-semibold text-slate-300">Needs Attention</h3>
            </div>
            <div className="flex flex-wrap gap-2">
              {skills.needsAttention.map((skill, i) => (
                <span key={i} className="px-3 py-1.5 rounded-lg bg-orange-500/10 border border-orange-500/20 text-orange-400 text-xs font-semibold">
                  {skill}
                </span>
              ))}
            </div>
          </div>
        </div>
      ) : (
        <div className="p-8 text-center bg-slate-950 border border-white/5 rounded-xl">
          <p className="text-slate-400">Complete an activity to see your skill growth analysis.</p>
        </div>
      )}
    </div>
  );
}

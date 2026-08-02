import React from 'react';
import { Target, AlertCircle } from 'lucide-react';

const missingSkills = [
  { name: 'Docker', reason: 'Essential for modern containerized deployment.' },
  { name: 'AWS Basics', reason: 'Most target companies require cloud familiarity.' },
  { name: 'System Design', reason: 'Crucial for passing mid to senior technical interviews.' },
  { name: 'CI/CD Pipelines', reason: 'Needed for automated testing and deployment workflows.' },
];

export default function RAMissingSkills() {
  return (
    <div className="h-full bg-slate-900 border border-white/5 rounded-[32px] p-6 md:p-8">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h2 className="text-2xl font-bold text-white flex items-center gap-2">
            <Target className="w-6 h-6 text-pink-400" /> Missing Skills
          </h2>
          <p className="text-sm text-slate-400 mt-1">Highly requested in your target roles</p>
        </div>
      </div>

      <div className="space-y-4">
        {missingSkills.map((skill, i) => (
          <div key={i} className="bg-slate-950 border border-white/5 rounded-xl p-4 flex items-center justify-between">
            <div className="flex items-center gap-4">
              <div className="w-10 h-10 rounded-lg bg-slate-800 flex items-center justify-center font-bold text-slate-300 flex-shrink-0">
                {skill.name.charAt(0)}
              </div>
              <div>
                <h3 className="font-semibold text-white">{skill.name}</h3>
                <p className="text-xs font-medium text-slate-400 mt-1">
                  {skill.reason}
                </p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

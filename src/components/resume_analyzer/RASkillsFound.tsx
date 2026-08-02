import React from 'react';
import { CheckCircle } from 'lucide-react';

const skills = [
  'Java', 'Python', 'React', 'SQL', 'Git', 'Spring Boot', 'Problem Solving', 'Communication'
];

export default function RASkillsFound() {
  return (
    <div className="h-full bg-slate-900 border border-white/5 rounded-[32px] p-6 md:p-8">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h2 className="text-2xl font-bold text-white flex items-center gap-2">
            <CheckCircle className="w-6 h-6 text-emerald-400" /> Skills Found
          </h2>
          <p className="text-sm text-slate-400 mt-1">Detected from your uploaded resume</p>
        </div>
      </div>

      <div className="flex flex-wrap gap-3">
        {skills.map((skill, i) => (
          <span key={i} className="px-4 py-2 rounded-full bg-slate-800 text-sm font-medium text-slate-300 border border-white/5">
            {skill}
          </span>
        ))}
      </div>
    </div>
  );
}

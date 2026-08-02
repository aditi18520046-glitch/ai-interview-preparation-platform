import React from 'react';
import { Sparkles, ArrowRight } from 'lucide-react';

const suggestions = [
  'Rewrite your professional summary to focus on your main achievements.',
  'Add numbers to show project impact (e.g., "improved speed by 20%").',
  'Include functional links to your GitHub and LinkedIn profiles.',
  'Mention the exact technologies used in each of your projects.',
  'Add your technical certifications if you have any.',
  'Use stronger action verbs like "Developed", "Led", or "Designed".',
  'Remove unnecessary personal details like age or marital status.',
  'Keep the resume to one page if you are a fresher.'
];

export default function RAImprovements() {
  return (
    <div className="bg-slate-900 border border-white/5 rounded-[32px] p-6 md:p-8">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h2 className="text-2xl font-bold text-white flex items-center gap-2">
            <Sparkles className="w-6 h-6 text-emerald-400" /> AI Suggestions
          </h2>
          <p className="text-slate-400 mt-2">Practical tips to improve your resume</p>
        </div>
      </div>

      <div className="grid sm:grid-cols-2 gap-4">
        {suggestions.map((item, i) => (
          <div key={i} className="bg-slate-950 border border-white/5 rounded-xl p-4 flex items-start gap-3">
            <ArrowRight className="w-5 h-5 text-emerald-400 flex-shrink-0 mt-0.5" />
            <p className="text-slate-300 font-medium leading-relaxed">{item}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

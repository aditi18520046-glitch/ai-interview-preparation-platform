import React from 'react';
import { CheckCircle2, AlertTriangle, AlertCircle } from 'lucide-react';

const strengths = [
  { issue: 'Professional resume layout', reason: 'Your structure is clean and easy for recruiters to read.' },
  { issue: 'Relevant technical skills', reason: 'You have highlighted key technologies that are in demand.' },
  { issue: 'ATS-friendly formatting', reason: 'No complex tables or graphics that could confuse parsers.' },
  { issue: 'Clear contact information', reason: 'Email, phone, and LinkedIn are easily accessible.' },
];

const weaknesses = [
  { issue: 'Add a stronger professional summary', reason: 'Lacks quantifiable achievements and focuses too much on generic soft skills.', type: 'warning' },
  { issue: 'Include measurable achievements', reason: 'Use numbers (e.g., "Increased efficiency by 20%") to show impact.', type: 'error' },
  { issue: 'Improve project descriptions', reason: 'Detail the technologies used and the specific problem solved.', type: 'warning' },
  { issue: 'Add GitHub and LinkedIn links', reason: 'Missing links to your portfolio or code repository.', type: 'error' },
];

export default function RAStrengthsWeaknesses() {
  return (
    <div className="grid lg:grid-cols-2 gap-8">
      {/* What's Good */}
      <div className="bg-slate-900 border border-emerald-500/20 rounded-[32px] p-6 md:p-8">
        <h2 className="text-2xl font-bold text-white flex items-center gap-3 mb-6">
          <CheckCircle2 className="w-6 h-6 text-emerald-400" /> What's Good
        </h2>
        
        <div className="space-y-4">
          {strengths.map((item, i) => (
            <div key={i} className="flex items-start gap-3 p-4 bg-emerald-500/5 border border-emerald-500/10 rounded-xl">
              <CheckCircle2 className="w-5 h-5 text-emerald-400 flex-shrink-0 mt-0.5" />
              <div>
                <h3 className="text-slate-200 font-semibold mb-1">{item.issue}</h3>
                <p className="text-sm text-slate-400">{item.reason}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Needs Improvement */}
      <div className="bg-slate-900 border border-orange-500/20 rounded-[32px] p-6 md:p-8">
        <h2 className="text-2xl font-bold text-white flex items-center gap-3 mb-6">
          <AlertTriangle className="w-6 h-6 text-orange-400" /> Needs Improvement
        </h2>
        
        <div className="space-y-4">
          {weaknesses.map((item, i) => (
            <div key={i} className={`p-4 border rounded-xl flex items-start gap-3 ${item.type === 'error' ? 'bg-red-500/5 border-red-500/10' : 'bg-orange-500/5 border-orange-500/10'}`}>
              {item.type === 'error' ? (
                <AlertCircle className="w-5 h-5 text-red-400 flex-shrink-0 mt-0.5" />
              ) : (
                <AlertTriangle className="w-5 h-5 text-orange-400 flex-shrink-0 mt-0.5" />
              )}
              <div>
                <h3 className="font-semibold text-slate-200 mb-1">{item.issue}</h3>
                <p className="text-sm text-slate-400">{item.reason}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

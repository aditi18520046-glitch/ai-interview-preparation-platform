import React from 'react';
import { Building2 } from 'lucide-react';

const matches = [
  { name: 'Google', match: 92, explanation: 'Strong Java and DSA skills match this company well.', logo: 'G' },
  { name: 'Microsoft', match: 88, explanation: 'Add cloud technologies to improve your match.', logo: 'M' },
  { name: 'Amazon', match: 85, explanation: 'Improve project impact to increase compatibility.', logo: 'A' },
  { name: 'Stripe', match: 80, explanation: 'Good API design experience fits their core stack.', logo: 'S' },
  { name: 'Atlassian', match: 75, explanation: 'Your React and frontend skills align nicely.', logo: 'A' },
];

export default function RACompanyMatches() {
  return (
    <div className="h-full bg-slate-900 border border-white/5 rounded-[32px] p-6 md:p-8">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h2 className="text-2xl font-bold text-white flex items-center gap-2">
            <Building2 className="w-6 h-6 text-indigo-400" /> Top 5 Company Matches
          </h2>
          <p className="text-sm text-slate-400 mt-1">Based on your skills and experience</p>
        </div>
      </div>

      <div className="flex flex-col gap-4">
        {matches.map((company, i) => (
          <div key={i} className="bg-slate-950 border border-white/5 rounded-xl p-4 flex flex-col sm:flex-row sm:items-center gap-4">
            <div className="flex items-center gap-4 sm:w-1/3">
              <div className="w-12 h-12 flex-shrink-0 rounded-lg bg-white/5 flex items-center justify-center text-lg font-bold text-slate-300">
                {company.logo}
              </div>
              <div>
                <h3 className="font-semibold text-white">{company.name}</h3>
                <div className="text-sm font-medium text-emerald-400">{company.match}% Match</div>
              </div>
            </div>
            <div className="sm:w-2/3">
              <p className="text-sm text-slate-400">{company.explanation}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

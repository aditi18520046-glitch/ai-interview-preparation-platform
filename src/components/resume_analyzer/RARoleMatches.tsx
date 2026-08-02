import React from 'react';
import { Briefcase } from 'lucide-react';

const roles = [
  { title: 'Frontend Developer', match: 95, explanation: 'Your React and TypeScript experience makes this a perfect fit.' },
  { title: 'Full Stack Developer', match: 82, explanation: 'Adding backend projects would strengthen this profile.' },
  { title: 'UI Engineer', match: 78, explanation: 'Your design system knowledge is a strong asset here.' },
  { title: 'Web Developer', match: 75, explanation: 'Good match for general web agency roles.' },
  { title: 'Technical Lead', match: 60, explanation: 'Requires more system design and mentoring experience.' },
];

export default function RARoleMatches() {
  return (
    <div className="h-full bg-slate-900 border border-white/5 rounded-[32px] p-6 md:p-8">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h2 className="text-2xl font-bold text-white flex items-center gap-2">
            <Briefcase className="w-6 h-6 text-purple-400" /> Top 5 Recommended Roles
          </h2>
          <p className="text-sm text-slate-400 mt-1">Positions tailored to your profile</p>
        </div>
      </div>

      <div className="flex flex-col gap-4">
        {roles.map((role, i) => (
          <div key={i} className="bg-slate-950 border border-white/5 rounded-xl p-4 flex flex-col sm:flex-row sm:items-center gap-4">
            <div className="sm:w-1/3">
              <h3 className="font-semibold text-white">{role.title}</h3>
              <div className="text-sm font-medium text-emerald-400">{role.match}% Match</div>
            </div>
            <div className="sm:w-2/3">
               <p className="text-sm text-slate-400">{role.explanation}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

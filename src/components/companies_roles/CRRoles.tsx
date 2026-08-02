import React from 'react';
import { CRRole } from './types';
import { allRoles } from './data';
import { ChevronRight, Briefcase } from 'lucide-react';

export default function CRRoles({ 
  searchQuery, 
  onSelectRole 
}: { 
  searchQuery: string; 
  onSelectRole: (role: CRRole) => void 
}) {
  const filtered = allRoles.filter(r => 
    r.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    r.skills.some(s => s.toLowerCase().includes(searchQuery.toLowerCase()))
  );

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold text-white">Explore Job Roles</h2>
        <div className="text-sm text-slate-400">{filtered.length} roles</div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filtered.map(role => (
          <div 
            key={role.id}
            onClick={() => onSelectRole(role)}
            className="group bg-slate-900 border border-white/5 hover:border-purple-500/30 rounded-2xl p-6 shadow-sm hover:shadow-purple-500/10 transition-all cursor-pointer flex flex-col h-full"
          >
            <div className="flex items-start gap-4 mb-4">
              <div className="w-12 h-12 rounded-xl bg-purple-500/10 flex items-center justify-center flex-shrink-0">
                <Briefcase className="w-6 h-6 text-purple-400" />
              </div>
              <div>
                <h3 className="text-lg font-bold text-white group-hover:text-purple-400 transition-colors leading-tight">{role.title}</h3>
              </div>
            </div>
            
            <p className="text-sm text-slate-400 mb-6 line-clamp-2">
              {role.description}
            </p>

            <div className="space-y-3 flex-1">
              <div className="text-xs font-semibold text-slate-500 uppercase tracking-wider">Core Skills</div>
              <div className="flex flex-wrap gap-2">
                {role.skills.slice(0, 4).map(skill => (
                  <span key={skill} className="px-2.5 py-1 rounded-lg bg-slate-800 text-xs text-slate-300 border border-white/5">
                    {skill}
                  </span>
                ))}
                {role.skills.length > 4 && (
                  <span className="px-2.5 py-1 rounded-lg bg-slate-800/50 text-xs text-slate-400 border border-white/5">
                    +{role.skills.length - 4}
                  </span>
                )}
              </div>
            </div>

            <div className="mt-6 pt-6 border-t border-white/5 flex items-center justify-between">
              <span className="text-xs text-slate-500">{role.demand} Demand</span>
              <button className="text-sm font-medium text-purple-400 group-hover:text-purple-300 transition-colors flex items-center gap-1">
                View Details <ChevronRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        ))}
      </div>
      
      {filtered.length === 0 && (
        <div className="py-12 text-center border border-dashed border-white/10 rounded-2xl">
          <p className="text-slate-400">No roles found matching "{searchQuery}"</p>
        </div>
      )}
    </div>
  );
}

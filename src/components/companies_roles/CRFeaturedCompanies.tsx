import React from 'react';
import { MapPin, Users, Activity, Code, ChevronRight } from 'lucide-react';
import { CRCompany } from './types';
import { featuredCompanies } from './data'; // We'll create this later

export default function CRFeaturedCompanies({ onSelectCompany }: { onSelectCompany: (company: CRCompany) => void }) {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold text-white">Featured Companies</h2>
        <button className="text-sm font-medium text-indigo-400 hover:text-indigo-300 transition-colors flex items-center gap-1">
          View All <ChevronRight className="w-4 h-4" />
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {featuredCompanies.map((company) => (
          <div 
            key={company.id}
            className="group bg-slate-900 border border-white/5 hover:border-indigo-500/30 rounded-2xl p-6 shadow-sm hover:shadow-indigo-500/10 transition-all cursor-pointer flex flex-col h-full"
            onClick={() => onSelectCompany(company)}
          >
            <div className="flex items-start justify-between mb-4">
              <div className="flex items-center gap-4">
                <div className="w-14 h-14 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center text-xl font-bold text-white">
                  {/* Fallback logo if no image */}
                  {company.name.charAt(0)}
                </div>
                <div>
                  <h3 className="text-lg font-bold text-white group-hover:text-indigo-400 transition-colors">{company.name}</h3>
                  <p className="text-sm text-slate-400">{company.industry} • {company.type}</p>
                </div>
              </div>
              <div className={`px-2.5 py-1 rounded-full text-xs font-medium border ${
                company.hiringStatus === 'Actively Hiring' 
                  ? 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20' 
                  : 'bg-blue-500/10 text-blue-400 border-blue-500/20'
              }`}>
                {company.hiringStatus}
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4 mb-6">
              <div className="flex items-center gap-2 text-sm text-slate-400">
                <MapPin className="w-4 h-4 text-slate-500" />
                <span className="truncate">{company.headquarters}</span>
              </div>
              <div className="flex items-center gap-2 text-sm text-slate-400">
                <Users className="w-4 h-4 text-slate-500" />
                <span>{company.size}</span>
              </div>
            </div>

            <div className="space-y-4 flex-1">
              <div>
                <div className="text-xs font-semibold text-slate-500 uppercase tracking-wider mb-2">Popular Roles</div>
                <div className="flex flex-wrap gap-2">
                  {company.popularRoles.slice(0, 3).map(role => (
                    <span key={role} className="px-2.5 py-1 rounded-lg bg-slate-800 text-xs text-slate-300 border border-white/5">
                      {role}
                    </span>
                  ))}
                  {company.popularRoles.length > 3 && (
                    <span className="px-2.5 py-1 rounded-lg bg-slate-800/50 text-xs text-slate-400 border border-white/5">
                      +{company.popularRoles.length - 3}
                    </span>
                  )}
                </div>
              </div>

              <div>
                <div className="text-xs font-semibold text-slate-500 uppercase tracking-wider mb-2 flex items-center gap-1">
                  <Code className="w-3.5 h-3.5" /> Tech Stack
                </div>
                <div className="flex flex-wrap gap-1.5">
                  {company.technologies.slice(0, 5).map(tech => (
                    <span key={tech} className="text-xs text-slate-400">
                      {tech}{tech !== company.technologies.slice(0, 5).slice(-1)[0] ? ',' : ''}
                    </span>
                  ))}
                </div>
              </div>
            </div>

            <div className="mt-6 pt-6 border-t border-white/5 flex items-center justify-center">
              <button className="text-sm font-medium text-indigo-400 group-hover:text-indigo-300 transition-colors flex items-center gap-1">
                View Details <ChevronRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

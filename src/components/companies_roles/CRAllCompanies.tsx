import React, { useState } from 'react';
import { CRCompany } from './types';
import { allCompanies } from './data';
import { ChevronRight } from 'lucide-react';

export default function CRAllCompanies({ 
  searchQuery, 
  onSelectCompany 
}: { 
  searchQuery: string; 
  onSelectCompany: (company: CRCompany) => void 
}) {
  
  const [visibleCount, setVisibleCount] = useState(15);
  
  const filtered = allCompanies.filter(c => 
    c.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    c.industry.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const displayed = filtered.slice(0, visibleCount);

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold text-white">All Companies</h2>
        <div className="text-sm text-slate-400">{filtered.length} companies</div>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
        {displayed.map(company => (
          <div 
            key={company.id}
            onClick={() => onSelectCompany(company)}
            className="group bg-slate-900 border border-white/5 hover:border-white/10 rounded-xl p-5 cursor-pointer transition-all hover:bg-slate-800/50 flex flex-col items-center text-center gap-3"
          >
            <div className="w-12 h-12 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center text-lg font-bold text-white group-hover:scale-110 transition-transform">
              {company.name.charAt(0)}
            </div>
            <div>
              <div className="font-semibold text-slate-200 group-hover:text-white truncate max-w-[120px] mx-auto">{company.name}</div>
              <div className="text-xs text-slate-500 mt-0.5 truncate max-w-[120px] mx-auto">{company.industry}</div>
            </div>
          </div>
        ))}
      </div>
      
      {filtered.length === 0 && (
        <div className="py-12 text-center border border-dashed border-white/10 rounded-2xl">
          <p className="text-slate-400">No companies found matching "{searchQuery}"</p>
        </div>
      )}
      
      {filtered.length > visibleCount && (
        <div className="flex justify-center mt-8">
          <button 
            onClick={() => setVisibleCount(prev => prev + 15)}
            className="px-6 py-2.5 rounded-lg border border-white/10 text-sm font-medium text-slate-300 hover:text-white hover:bg-white/5 transition-colors"
          >
            Load More
          </button>
        </div>
      )}
    </div>
  );
}

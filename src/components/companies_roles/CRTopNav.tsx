import React from 'react';
import { Building2, Briefcase, ArrowLeft } from 'lucide-react';
import { Link } from 'react-router-dom';

export default function CRTopNav({ 
  activeTab, 
  onTabChange 
}: { 
  activeTab: 'companies' | 'roles'; 
  onTabChange: (tab: 'companies' | 'roles') => void;
}) {
  return (
    <nav className="sticky top-0 z-50 bg-slate-950/80 backdrop-blur-xl border-b border-white/5">
      <div className="max-w-[1440px] mx-auto px-4 md:px-6 lg:px-8 h-16 flex items-center justify-between">
        
        <div className="flex items-center gap-6">
          <Link to="/dashboard" className="flex items-center gap-2 text-slate-400 hover:text-white transition-colors text-sm font-medium">
            <ArrowLeft className="w-4 h-4" />
            <span className="hidden sm:inline">Back to Dashboard</span>
          </Link>
          
          <div className="h-6 w-px bg-white/10 hidden sm:block"></div>
          
          <div className="flex items-center gap-1">
            <button
              onClick={() => onTabChange('companies')}
              className={`px-4 py-2 rounded-lg text-sm font-semibold transition-all flex items-center gap-2 ${
                activeTab === 'companies' 
                  ? 'bg-indigo-500/10 text-indigo-400' 
                  : 'text-slate-400 hover:text-slate-200 hover:bg-white/5'
              }`}
            >
              <Building2 className="w-4 h-4" />
              Companies
            </button>
            <button
              onClick={() => onTabChange('roles')}
              className={`px-4 py-2 rounded-lg text-sm font-semibold transition-all flex items-center gap-2 ${
                activeTab === 'roles' 
                  ? 'bg-purple-500/10 text-purple-400' 
                  : 'text-slate-400 hover:text-slate-200 hover:bg-white/5'
              }`}
            >
              <Briefcase className="w-4 h-4" />
              Job Roles
            </button>
          </div>
        </div>

        <div className="flex items-center gap-4">
          {/* We could put user profile here, but let's keep it clean as requested */}
        </div>
      </div>
    </nav>
  );
}

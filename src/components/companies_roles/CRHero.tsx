import React from 'react';
import { Building2, Briefcase, Search, TrendingUp, Users, Building, Laptop } from 'lucide-react';

interface CRHeroProps {
  onTabChange?: (tab: 'companies' | 'roles') => void;
}

export default function CRHero({ onTabChange }: CRHeroProps) {
  return (
    <div className="relative overflow-hidden bg-slate-900/50 border-b border-white/5 pt-16 pb-20">
      <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-gradient-to-br from-indigo-500/20 via-purple-500/10 to-transparent rounded-full blur-[120px] pointer-events-none -translate-y-1/2 translate-x-1/3" />
      <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-gradient-to-tr from-emerald-500/10 via-cyan-500/10 to-transparent rounded-full blur-[100px] pointer-events-none translate-y-1/3 -translate-x-1/4" />
      
      <div className="relative z-10 max-w-[1440px] mx-auto px-4 md:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          
          {/* Left Side: Content */}
          <div className="space-y-8 text-center lg:text-left">
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-indigo-500/10 border border-indigo-500/20 text-indigo-400 text-sm font-semibold">
              <Building2 className="w-4 h-4" /> Company & Role Insights
            </div>
            
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white leading-tight tracking-tight">
              Explore Top Companies & Discover Your <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 to-purple-400">Perfect Role</span>
            </h1>
            
            <p className="text-lg text-slate-300 leading-relaxed max-w-2xl mx-auto lg:mx-0">
              Browse hundreds of leading companies, explore available job roles, understand hiring expectations, required skills, interview process, projects, and qualification requirements before you begin your preparation.
            </p>
            
            <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4">
              <button onClick={() => onTabChange && onTabChange('companies')} className="w-full sm:w-auto px-8 py-3.5 rounded-xl bg-gradient-to-r from-indigo-600 to-purple-600 text-white font-bold text-[15px] shadow-lg shadow-indigo-500/25 hover:-translate-y-0.5 hover:shadow-indigo-500/40 transition-all flex items-center justify-center gap-2">
                <Building2 className="w-5 h-5" /> Explore Companies
              </button>
              <button onClick={() => onTabChange && onTabChange('roles')} className="w-full sm:w-auto px-8 py-3.5 rounded-xl bg-white/5 text-white font-bold text-[15px] border border-white/10 hover:bg-white/10 transition-all flex items-center justify-center gap-2">
                <Briefcase className="w-5 h-5" /> Explore Roles
              </button>
            </div>
          </div>

          {/* Right Side: Abstract Illustration */}
          <div className="hidden lg:flex justify-center items-center relative h-[450px]">
            <div className="relative w-full max-w-[500px] h-full flex items-center justify-center">
              
              {/* Central Element */}
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-48 h-48 bg-slate-800/80 backdrop-blur-xl border border-white/10 rounded-2xl shadow-2xl flex flex-col items-center justify-center z-20 animate-[bounce_6s_ease-in-out_infinite]">
                <Building className="w-16 h-16 text-indigo-400 mb-4" />
                <div className="text-lg font-bold text-white">Top Tech</div>
                <div className="text-sm text-slate-400">Now Hiring</div>
              </div>

              {/* Floating Cards */}
              <div className="absolute top-10 left-10 w-40 p-4 bg-slate-800/60 backdrop-blur-md border border-white/5 rounded-xl shadow-xl z-10 animate-[pulse_4s_ease-in-out_infinite]">
                <div className="flex items-center gap-3 mb-2">
                  <div className="w-8 h-8 rounded-lg bg-emerald-500/20 flex items-center justify-center">
                    <TrendingUp className="w-4 h-4 text-emerald-400" />
                  </div>
                  <div className="text-sm font-semibold text-white">Analytics</div>
                </div>
                <div className="h-1.5 w-full bg-slate-700 rounded-full overflow-hidden">
                  <div className="h-full bg-emerald-400 w-[70%]" />
                </div>
              </div>

              <div className="absolute bottom-20 right-10 w-48 p-4 bg-slate-800/60 backdrop-blur-md border border-white/5 rounded-xl shadow-xl z-30 animate-[bounce_5s_ease-in-out_infinite_reverse]">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-lg bg-purple-500/20 flex items-center justify-center flex-shrink-0">
                    <Users className="w-5 h-5 text-purple-400" />
                  </div>
                  <div>
                    <div className="text-sm font-semibold text-white">10k+ Roles</div>
                    <div className="text-xs text-slate-400">Available globally</div>
                  </div>
                </div>
              </div>

              <div className="absolute top-20 right-5 w-32 p-3 bg-slate-800/60 backdrop-blur-md border border-white/5 rounded-xl shadow-xl z-10 animate-[pulse_5s_ease-in-out_infinite]">
                <div className="w-full h-2 bg-slate-700 rounded mb-2 w-3/4" />
                <div className="w-full h-2 bg-slate-700 rounded mb-2 w-1/2" />
                <div className="w-full h-2 bg-slate-700 rounded w-full" />
              </div>

              <div className="absolute bottom-32 left-5 w-14 h-14 bg-slate-800/80 backdrop-blur-xl border border-white/10 rounded-2xl shadow-xl flex items-center justify-center z-20 animate-[bounce_7s_ease-in-out_infinite]">
                <Laptop className="w-6 h-6 text-cyan-400" />
              </div>

              {/* Connecting Lines (Decorative) */}
              <svg className="absolute inset-0 w-full h-full pointer-events-none opacity-20" viewBox="0 0 500 500">
                <path d="M 120 100 Q 250 50 380 120" fill="none" stroke="currentColor" strokeWidth="2" strokeDasharray="4 4" className="text-indigo-400" />
                <path d="M 100 350 Q 250 450 400 380" fill="none" stroke="currentColor" strokeWidth="2" strokeDasharray="4 4" className="text-purple-400" />
              </svg>

            </div>
          </div>

        </div>
      </div>
    </div>
  );
}

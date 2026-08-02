cat << 'INNER_EOF' > src/components/dashboard/HeroSection.tsx
import React from 'react';
import { Play, RotateCcw, Target, Zap } from 'lucide-react';
import { motion } from 'motion/react';
import { useDashboardData } from '../../hooks/useDashboardData';

export default function HeroSection() {
  const { userName, hasData, stats } = useDashboardData();

  return (
    <div className="relative overflow-hidden bg-slate-900/40 backdrop-blur-md border border-white/5 rounded-[20px] p-6 lg:p-8">
      {/* Subtle Background Elements */}
      <div className="absolute top-0 right-0 w-[400px] h-[400px] bg-indigo-500/10 rounded-full blur-[100px] pointer-events-none translate-x-1/3 -translate-y-1/3" />
      <div className="absolute bottom-0 left-0 w-[300px] h-[300px] bg-purple-500/10 rounded-full blur-[80px] pointer-events-none -translate-x-1/2 translate-y-1/2" />

      <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div className="max-w-2xl">
          <div className="mb-6">
            <motion.h1 
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-2xl lg:text-3xl font-bold text-white mb-1.5"
            >
              Welcome back, {userName}
            </motion.h1>
            <p className="text-slate-400 text-sm">
              Ready to continue building your interview skills today?
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-3">
            {hasData ? (
              <button className="px-5 py-2.5 bg-indigo-500 hover:bg-indigo-600 text-white text-sm font-medium rounded-xl flex items-center gap-2 transition-colors shadow-sm shadow-indigo-500/20">
                <RotateCcw className="w-4 h-4" />
                Continue Last Interview
              </button>
            ) : (
              <button className="px-5 py-2.5 bg-indigo-500 hover:bg-indigo-600 text-white text-sm font-medium rounded-xl flex items-center gap-2 transition-colors shadow-sm shadow-indigo-500/20">
                <Play className="w-4 h-4" />
                Start First Interview
              </button>
            )}
            <button className="px-5 py-2.5 bg-white/5 hover:bg-white/10 text-white text-sm font-medium rounded-xl flex items-center gap-2 transition-colors border border-white/5">
              Practice Coding
            </button>
          </div>
        </div>

        <div className="grid grid-cols-2 sm:flex sm:items-center gap-4 lg:gap-8 bg-slate-950/30 p-4 lg:p-5 rounded-2xl border border-white/5 shrink-0 backdrop-blur-sm">
          {/* Level & XP */}
          <div>
            <div className="flex items-center gap-1.5 mb-1.5">
              <Zap className="w-4 h-4 text-orange-400" />
              <span className="text-[11px] font-medium text-slate-400 uppercase tracking-wider">Level {stats.level}</span>
            </div>
            <div className="flex items-baseline gap-1">
              <span className="text-xl font-bold text-white">{stats.xp.toLocaleString()}</span>
              <span className="text-xs text-slate-500">XP</span>
            </div>
          </div>
          
          <div className="hidden sm:block w-px h-10 bg-white/10" />

          {/* Goal Progress */}
          <div>
            <div className="flex items-center gap-1.5 mb-1.5">
              <Target className="w-4 h-4 text-emerald-400" />
              <span className="text-[11px] font-medium text-slate-400 uppercase tracking-wider">Monthly Goal</span>
            </div>
            <div className="flex items-center gap-3">
              <div className="w-24 bg-slate-800 rounded-full h-1.5 overflow-hidden">
                <div 
                  className="bg-emerald-500 h-1.5 rounded-full transition-all duration-1000" 
                  style={{ width: \`\${(stats.monthlyGoal / 20) * 100}%\` }}
                />
              </div>
              <span className="text-sm font-bold text-white">{stats.monthlyGoal}<span className="text-slate-500 font-medium">/20</span></span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
INNER_EOF

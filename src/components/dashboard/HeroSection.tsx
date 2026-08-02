import React, { useState, useRef, useEffect } from 'react';
import { Play, RotateCcw, Target, Zap, ChevronDown, MonitorPlay, FileText, Code2 } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { Link } from 'react-router-dom';
import { useDashboardData } from '../../hooks/useDashboardData';
import hologramImg from '../../assets/images/dashboard_ai_hologram_1784195369114.jpg';

export default function HeroSection() {
  const { userName, hasData, stats } = useDashboardData();
  const [openDropdown, setOpenDropdown] = useState<'first' | 'continue' | 'new' | null>(null);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setOpenDropdown(null);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div className="relative overflow-hidden bg-slate-900/40 backdrop-blur-md border border-white/5 rounded-[20px] p-6 lg:p-8">
      {/* Subtle Background Elements */}
      <div className="absolute top-0 right-0 w-[400px] h-[400px] bg-indigo-500/10 rounded-full blur-[100px] pointer-events-none translate-x-1/3 -translate-y-1/3" />
      <div className="absolute bottom-0 left-0 w-[300px] h-[300px] bg-purple-500/10 rounded-full blur-[80px] pointer-events-none -translate-x-1/2 translate-y-1/2" />

      <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div className="max-w-2xl flex-1">
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

          <div className="flex flex-wrap items-center gap-3" ref={dropdownRef}>
            {hasData ? (
              <div className="relative">
                <button 
                  onClick={() => setOpenDropdown(openDropdown === 'continue' ? null : 'continue')}
                  className="px-5 py-2.5 bg-indigo-500 hover:bg-indigo-600 text-white text-sm font-medium rounded-xl flex items-center gap-2 transition-colors shadow-sm shadow-indigo-500/20"
                >
                  <RotateCcw className="w-4 h-4" />
                  Continue Previous Practice
                  <ChevronDown className={`w-4 h-4 transition-transform duration-200 ${openDropdown === 'continue' ? 'rotate-180' : ''}`} />
                </button>
                
                <AnimatePresence>
                  {openDropdown === 'continue' && (
                    <motion.div 
                      initial={{ opacity: 0, y: 10, scale: 0.95 }}
                      animate={{ opacity: 1, y: 0, scale: 1 }}
                      exit={{ opacity: 0, y: 10, scale: 0.95 }}
                      transition={{ duration: 0.15 }}
                      className="absolute top-full left-0 mt-2 w-56 bg-slate-800 border border-white/10 rounded-xl shadow-xl overflow-hidden z-50 flex flex-col p-1"
                    >
                      <Link to="/dashboard/interview" onClick={() => setOpenDropdown(null)} className="flex items-center gap-3 px-3 py-2 text-sm text-slate-300 hover:text-white hover:bg-white/10 rounded-lg transition-colors">
                        <MonitorPlay className="w-4 h-4 text-indigo-400" />
                        Continue Mock Interview
                      </Link>
                      <Link to="/dashboard/test" onClick={() => setOpenDropdown(null)} className="flex items-center gap-3 px-3 py-2 text-sm text-slate-300 hover:text-white hover:bg-white/10 rounded-lg transition-colors">
                        <FileText className="w-4 h-4 text-emerald-400" />
                        Continue Mock Test
                      </Link>
                      <Link to="/dashboard/coding" onClick={() => setOpenDropdown(null)} className="flex items-center gap-3 px-3 py-2 text-sm text-slate-300 hover:text-white hover:bg-white/10 rounded-lg transition-colors">
                        <Code2 className="w-4 h-4 text-amber-400" />
                        Continue Coding Practice
                      </Link>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            ) : (
              <div className="relative">
                <button 
                  onClick={() => setOpenDropdown(openDropdown === 'first' ? null : 'first')}
                  className="px-5 py-2.5 bg-indigo-500 hover:bg-indigo-600 text-white text-sm font-medium rounded-xl flex items-center gap-2 transition-colors shadow-sm shadow-indigo-500/20"
                >
                  <Play className="w-4 h-4" />
                  Start First Interview
                  <ChevronDown className={`w-4 h-4 transition-transform duration-200 ${openDropdown === 'first' ? 'rotate-180' : ''}`} />
                </button>
                
                <AnimatePresence>
                  {openDropdown === 'first' && (
                    <motion.div 
                      initial={{ opacity: 0, y: 10, scale: 0.95 }}
                      animate={{ opacity: 1, y: 0, scale: 1 }}
                      exit={{ opacity: 0, y: 10, scale: 0.95 }}
                      transition={{ duration: 0.15 }}
                      className="absolute top-full left-0 mt-2 w-48 bg-slate-800 border border-white/10 rounded-xl shadow-xl overflow-hidden z-50 flex flex-col p-1"
                    >
                      <Link to="/dashboard/interview" onClick={() => setOpenDropdown(null)} className="flex items-center gap-3 px-3 py-2 text-sm text-slate-300 hover:text-white hover:bg-white/10 rounded-lg transition-colors">
                        <MonitorPlay className="w-4 h-4 text-indigo-400" />
                        Mock Interview
                      </Link>
                      <Link to="/dashboard/test" onClick={() => setOpenDropdown(null)} className="flex items-center gap-3 px-3 py-2 text-sm text-slate-300 hover:text-white hover:bg-white/10 rounded-lg transition-colors">
                        <FileText className="w-4 h-4 text-emerald-400" />
                        Mock Test
                      </Link>
                      <Link to="/dashboard/coding" onClick={() => setOpenDropdown(null)} className="flex items-center gap-3 px-3 py-2 text-sm text-slate-300 hover:text-white hover:bg-white/10 rounded-lg transition-colors">
                        <Code2 className="w-4 h-4 text-amber-400" />
                        Coding Practice
                      </Link>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            )}
            
            {hasData && (
              <div className="relative">
                <button 
                  onClick={() => setOpenDropdown(openDropdown === 'new' ? null : 'new')}
                  className="px-5 py-2.5 bg-white/5 hover:bg-white/10 text-white text-sm font-medium rounded-xl flex items-center gap-2 transition-colors border border-white/5"
                >
                  <Play className="w-4 h-4" />
                  Start New Session
                  <ChevronDown className={`w-4 h-4 transition-transform duration-200 ${openDropdown === 'new' ? 'rotate-180' : ''}`} />
                </button>
                
                <AnimatePresence>
                  {openDropdown === 'new' && (
                    <motion.div 
                      initial={{ opacity: 0, y: 10, scale: 0.95 }}
                      animate={{ opacity: 1, y: 0, scale: 1 }}
                      exit={{ opacity: 0, y: 10, scale: 0.95 }}
                      transition={{ duration: 0.15 }}
                      className="absolute top-full left-0 mt-2 w-48 bg-slate-800 border border-white/10 rounded-xl shadow-xl overflow-hidden z-50 flex flex-col p-1"
                    >
                      <Link to="/dashboard/interview" onClick={() => setOpenDropdown(null)} className="flex items-center gap-3 px-3 py-2 text-sm text-slate-300 hover:text-white hover:bg-white/10 rounded-lg transition-colors">
                        <MonitorPlay className="w-4 h-4 text-indigo-400" />
                        Mock Interview
                      </Link>
                      <Link to="/dashboard/test" onClick={() => setOpenDropdown(null)} className="flex items-center gap-3 px-3 py-2 text-sm text-slate-300 hover:text-white hover:bg-white/10 rounded-lg transition-colors">
                        <FileText className="w-4 h-4 text-emerald-400" />
                        Mock Test
                      </Link>
                      <Link to="/dashboard/coding" onClick={() => setOpenDropdown(null)} className="flex items-center gap-3 px-3 py-2 text-sm text-slate-300 hover:text-white hover:bg-white/10 rounded-lg transition-colors">
                        <Code2 className="w-4 h-4 text-amber-400" />
                        Coding Practice
                      </Link>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            )}
          </div>
        </div>

        <div className="flex flex-col lg:flex-row items-center gap-6 lg:gap-8 shrink-0">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8 }}
            className="w-32 sm:w-48 lg:w-64"
          >
            <img src={hologramImg} alt="AI Hologram Dashboard" className="w-full h-auto object-contain rounded-2xl drop-shadow-[0_0_20px_rgba(99,102,241,0.2)]" />
          </motion.div>

          <div className="grid grid-cols-2 sm:flex sm:items-center gap-4 lg:gap-8 bg-slate-950/30 p-4 lg:p-5 rounded-2xl border border-white/5 backdrop-blur-sm">
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
                    style={{ width: `${(stats.monthlyGoal / 20) * 100}%` }}
                  />
                </div>
                <span className="text-sm font-bold text-white">{stats.monthlyGoal}<span className="text-slate-500 font-medium">/20</span></span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

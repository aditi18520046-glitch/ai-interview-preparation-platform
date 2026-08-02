import React, { useState, useRef, useEffect } from 'react';
import { Briefcase, Search, Bell, Moon, Sun, Mic, FileEdit, Code2, Map } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useAuthStore } from '../store/authStore';

export default function Navbar() {
  const { isAuthenticated } = useAuthStore();
  const getFeatureLink = (path: string) => (isAuthenticated ? path : '/login');
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const searchRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (searchRef.current && !searchRef.current.contains(event.target as Node)) {
        setIsSearchOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  return (
    <nav className="fixed top-0 z-50 w-full bg-slate-950/80 backdrop-blur-xl border-b border-white/5 transition-all">
      <div className="max-w-7xl mx-auto px-2 sm:px-6 h-16 md:h-20 flex items-center justify-between gap-2 md:gap-4">
        {/* LEFT SIDE */}
        <Link to="/" className="flex items-center gap-1.5 md:gap-3 shrink-0">
          <div className="w-8 h-8 md:w-10 md:h-10 rounded-lg md:rounded-xl bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center shadow-lg shadow-indigo-500/20">
            <Briefcase className="w-4 h-4 md:w-5 md:h-5 text-white" />
          </div>
          <div className="flex flex-col justify-center">
            <h1 className="text-xs sm:text-sm md:text-xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-white to-slate-400 leading-tight">
              InterviewAI
            </h1>
            <p className="hidden sm:block text-[8px] md:text-[10px] text-slate-400 font-medium uppercase tracking-wider">
              AI Preparation Platform
            </p>
          </div>
        </Link>

        {/* CENTER */}
        <div ref={searchRef} className="flex flex-1 max-w-2xl mx-1 md:mx-8 relative group min-w-[50px]">
          <div className="absolute inset-0 bg-gradient-to-r from-indigo-500/20 to-purple-500/20 rounded-full blur-md opacity-0 group-hover:opacity-100 transition-opacity" />
          <div 
            onClick={() => setIsSearchOpen(true)}
            className="relative w-full flex items-center bg-white/5 border border-white/10 rounded-full px-2 md:px-4 py-1.5 md:py-2.5 backdrop-blur-sm transition-all focus-within:bg-white/10 focus-within:border-indigo-500/50 cursor-text"
          >
            <Search className="w-3 h-3 md:w-5 md:h-5 text-slate-400 md:mr-3 mr-1.5 shrink-0" />
            <input
              type="text"
              placeholder="Search features (Mock Interview, Mock Test...)"
              className="w-full bg-transparent border-none outline-none text-[10px] md:text-sm text-slate-200 placeholder-slate-500 min-w-0"
              onFocus={() => setIsSearchOpen(true)}
            />
            <div className="hidden md:flex items-center gap-1 bg-slate-800/50 rounded px-2 py-1 ml-3 border border-white/5 shrink-0">
              <span className="text-xs text-slate-400 font-mono">Ctrl</span>
              <span className="text-xs text-slate-400 font-mono">K</span>
            </div>
          </div>
          
          {/* Dropdown Menu */}
          {isSearchOpen && (
            <div className="absolute top-full mt-2 left-1/2 -translate-x-1/2 sm:translate-x-0 sm:left-0 w-[280px] sm:w-[380px] md:w-full min-w-[280px] sm:min-w-[380px] md:min-w-[440px] max-w-[92vw] bg-slate-900 border border-white/10 rounded-2xl shadow-2xl overflow-hidden py-2 z-50 animate-in fade-in slide-in-from-top-2 duration-200">
              <div className="px-4 py-2 text-xs font-semibold text-slate-400 uppercase tracking-wider">
                Platform Features
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-1 p-2">
                <Link to={getFeatureLink("/dashboard/interview")} onClick={() => setIsSearchOpen(false)} className="flex items-center gap-3 p-3 rounded-xl hover:bg-white/5 transition-colors group/link">
                  <div className="w-10 h-10 rounded-lg bg-indigo-500/10 flex items-center justify-center group-hover/link:bg-indigo-500/20 transition-colors shrink-0">
                    <Mic className="w-5 h-5 text-indigo-400" />
                  </div>
                  <div className="min-w-0 flex-1">
                    <div className="text-sm font-bold text-slate-200 group-hover/link:text-indigo-300 transition-colors whitespace-normal">Mock Interview</div>
                    <div className="text-xs text-slate-400 leading-snug whitespace-normal">AI-powered voice interviews</div>
                  </div>
                </Link>
                <Link to={getFeatureLink("/dashboard/test")} onClick={() => setIsSearchOpen(false)} className="flex items-center gap-3 p-3 rounded-xl hover:bg-white/5 transition-colors group/link">
                  <div className="w-10 h-10 rounded-lg bg-purple-500/10 flex items-center justify-center group-hover/link:bg-purple-500/20 transition-colors shrink-0">
                    <FileEdit className="w-5 h-5 text-purple-400" />
                  </div>
                  <div className="min-w-0 flex-1">
                    <div className="text-sm font-bold text-slate-200 group-hover/link:text-purple-300 transition-colors whitespace-normal">Mock Test</div>
                    <div className="text-xs text-slate-400 leading-snug whitespace-normal">Comprehensive skill assessments</div>
                  </div>
                </Link>
                <Link to={getFeatureLink("/dashboard/coding")} onClick={() => setIsSearchOpen(false)} className="flex items-center gap-3 p-3 rounded-xl hover:bg-white/5 transition-colors group/link">
                  <div className="w-10 h-10 rounded-lg bg-emerald-500/10 flex items-center justify-center group-hover/link:bg-emerald-500/20 transition-colors shrink-0">
                    <Code2 className="w-5 h-5 text-emerald-400" />
                  </div>
                  <div className="min-w-0 flex-1">
                    <div className="text-sm font-bold text-slate-200 group-hover/link:text-emerald-300 transition-colors whitespace-normal">Coding Practice</div>
                    <div className="text-xs text-slate-400 leading-snug whitespace-normal">Interactive coding challenges</div>
                  </div>
                </Link>
                <Link to={getFeatureLink("/dashboard/roadmap")} onClick={() => setIsSearchOpen(false)} className="flex items-center gap-3 p-3 rounded-xl hover:bg-white/5 transition-colors group/link">
                  <div className="w-10 h-10 rounded-lg bg-cyan-500/10 flex items-center justify-center group-hover/link:bg-cyan-500/20 transition-colors shrink-0">
                    <Map className="w-5 h-5 text-cyan-400" />
                  </div>
                  <div className="min-w-0 flex-1">
                    <div className="text-sm font-bold text-slate-200 group-hover/link:text-cyan-300 transition-colors whitespace-normal">Learning Roadmap</div>
                    <div className="text-xs text-slate-400 leading-snug whitespace-normal">Personalized study paths</div>
                  </div>
                </Link>
              </div>
            </div>
          )}
        </div>

        {/* RIGHT SIDE */}
        <div className="flex items-center gap-1.5 md:gap-6 shrink-0">
          <button className="text-slate-400 hover:text-white transition-colors relative">
            <Bell className="w-4 h-4 md:w-5 md:h-5" />
            <span className="absolute top-0 right-0 w-1.5 h-1.5 md:w-2 md:h-2 bg-purple-500 rounded-full shadow-[0_0_8px_rgba(168,85,247,0.8)]" />
          </button>
          
          <button className="text-slate-400 hover:text-white transition-colors">
            <Moon className="w-4 h-4 md:w-5 md:h-5" />
          </button>
          
          <div className="h-4 md:h-6 w-px bg-white/10 mx-0.5 md:mx-0"></div>
          
          <div className="flex items-center gap-1 md:gap-3">
            <Link to="/login" className="px-2 md:px-4 py-1 md:py-2 text-[10px] md:text-sm font-medium text-slate-300 hover:text-white transition-colors">
              Login
            </Link>
            <Link to="/signup" className="px-2 md:px-5 py-1 md:py-2 text-[10px] md:text-sm font-medium bg-white text-slate-950 rounded-full hover:bg-slate-200 transition-colors shadow-[0_0_20px_rgba(255,255,255,0.1)] whitespace-nowrap inline-block text-center">
              Sign Up
            </Link>
          </div>
        </div>
      </div>
    </nav>
  );
}

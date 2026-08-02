import React, { useState, useRef, useEffect } from 'react';
import { Search, Bell, Moon, Menu, User, PanelLeftClose, PanelLeftOpen, Briefcase, LogIn, ChevronDown, Settings, LogOut, TrendingUp, Mic, FileEdit, Code2, Map } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';
import { useDashboardData } from '../../hooks/useDashboardData';
import { useAuthStore } from '../../store/authStore';

interface TopNavProps {
  onMobileMenuClick?: () => void;
  onToggleSidebar?: () => void;
  isSidebarCollapsed?: boolean;
}

export default function TopNav({ onMobileMenuClick, onToggleSidebar, isSidebarCollapsed }: TopNavProps) {
  const { userName } = useDashboardData();
  const { isAuthenticated, logout } = useAuthStore();
  const navigate = useNavigate();
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const searchRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsDropdownOpen(false);
      }
      if (searchRef.current && !searchRef.current.contains(event.target as Node)) {
        setIsSearchOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleLogout = () => {
    logout();
    setIsDropdownOpen(false);
    navigate('/');
  };

  return (
    <header className="sticky top-0 z-30 flex items-center justify-between h-16 shrink-0 px-6 bg-slate-950/80 backdrop-blur-xl border-b border-white/10">
      <div className="flex items-center gap-4">
        {/* Mobile/Tablet menu toggle */}
        <button onClick={onMobileMenuClick} className="lg:hidden text-slate-400 hover:text-white transition-colors">
          <Menu className="w-5 h-5" />
        </button>
        
        {/* Desktop/Laptop sidebar toggle */}
        <button onClick={onToggleSidebar} className="hidden lg:flex text-slate-400 hover:text-white transition-colors">
          {isSidebarCollapsed ? <PanelLeftOpen className="w-5 h-5" /> : <PanelLeftClose className="w-5 h-5" />}
        </button>

        <Link to="/" className="flex items-center gap-2 lg:hidden group/brand overflow-hidden">
          <div className="w-7 h-7 rounded-lg bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center shadow-lg shadow-indigo-500/20">
            <Briefcase className="w-3.5 h-3.5 text-white" />
          </div>
        </Link>
      </div>

      <div ref={searchRef} className="hidden md:flex items-center flex-1 max-w-lg mx-6 relative group">
        <div className="absolute inset-0 bg-gradient-to-r from-indigo-500/10 to-purple-500/10 rounded-full blur-md opacity-0 group-hover:opacity-100 transition-opacity" />
        <div 
          onClick={() => setIsSearchOpen(true)}
          className="relative w-full flex items-center bg-white/5 border border-white/10 rounded-full px-4 py-2 backdrop-blur-sm transition-all focus-within:bg-white/10 focus-within:border-indigo-500/50 cursor-text"
        >
          <Search className="w-4 h-4 text-slate-400 mr-3 shrink-0" />
          <input
            type="text"
            placeholder="Search features (Mock Interview, Mock Test...)"
            className="w-full bg-transparent border-none outline-none text-sm text-slate-200 placeholder-slate-500 min-w-0"
            onFocus={() => setIsSearchOpen(true)}
          />
          {/* Dropdown Menu */}
        {isSearchOpen && (
          <div className="absolute top-full mt-2 left-0 w-[320px] lg:w-full min-w-[320px] lg:min-w-[400px] max-w-[90vw] bg-slate-900 border border-white/10 rounded-2xl shadow-2xl overflow-hidden py-2 z-50 animate-in fade-in slide-in-from-top-2 duration-200">
            <div className="px-4 py-2 text-xs font-semibold text-slate-400 uppercase tracking-wider">
              Quick Navigation
            </div>
            <div className="grid grid-cols-1 gap-1 p-2">
              <Link to="/dashboard/interview" onClick={() => setIsSearchOpen(false)} className="flex items-center gap-3 p-3 rounded-xl hover:bg-white/5 transition-colors group/link">
                <div className="w-10 h-10 rounded-lg bg-indigo-500/10 flex items-center justify-center group-hover/link:bg-indigo-500/20 transition-colors shrink-0">
                  <Mic className="w-5 h-5 text-indigo-400" />
                </div>
                <div className="min-w-0 flex-1">
                  <div className="text-sm font-bold text-slate-200 group-hover/link:text-indigo-300 transition-colors whitespace-normal">Mock Interview</div>
                  <div className="text-xs text-slate-400 leading-snug whitespace-normal">AI-powered voice interviews</div>
                </div>
              </Link>
              <Link to="/dashboard/test" onClick={() => setIsSearchOpen(false)} className="flex items-center gap-3 p-3 rounded-xl hover:bg-white/5 transition-colors group/link">
                <div className="w-10 h-10 rounded-lg bg-purple-500/10 flex items-center justify-center group-hover/link:bg-purple-500/20 transition-colors shrink-0">
                  <FileEdit className="w-5 h-5 text-purple-400" />
                </div>
                <div className="min-w-0 flex-1">
                  <div className="text-sm font-bold text-slate-200 group-hover/link:text-purple-300 transition-colors whitespace-normal">Mock Test</div>
                  <div className="text-xs text-slate-400 leading-snug whitespace-normal">Comprehensive skill assessments</div>
                </div>
              </Link>
              <Link to="/dashboard/coding" onClick={() => setIsSearchOpen(false)} className="flex items-center gap-3 p-3 rounded-xl hover:bg-white/5 transition-colors group/link">
                <div className="w-10 h-10 rounded-lg bg-emerald-500/10 flex items-center justify-center group-hover/link:bg-emerald-500/20 transition-colors shrink-0">
                  <Code2 className="w-5 h-5 text-emerald-400" />
                </div>
                <div className="min-w-0 flex-1">
                  <div className="text-sm font-bold text-slate-200 group-hover/link:text-emerald-300 transition-colors whitespace-normal">Coding Practice</div>
                  <div className="text-xs text-slate-400 leading-snug whitespace-normal">Interactive coding challenges</div>
                </div>
              </Link>
              <Link to="/dashboard/roadmap" onClick={() => setIsSearchOpen(false)} className="flex items-center gap-3 p-3 rounded-xl hover:bg-white/5 transition-colors group/link">
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
        
        <div className="hidden md:flex items-center gap-1 bg-slate-800/50 rounded px-1.5 py-0.5 ml-3 border border-white/5 shrink-0">
            <span className="text-[10px] text-slate-400 font-mono">⌘</span>
            <span className="text-[10px] text-slate-400 font-mono">K</span>
          </div>
      </div>

      <div className="flex items-center gap-3 sm:gap-5 ml-auto">
        <button className="text-slate-400 hover:text-white transition-colors relative">
          <Bell className="w-5 h-5" />
          <span className="absolute top-0 right-0 w-2 h-2 bg-indigo-500 rounded-full shadow-[0_0_8px_rgba(99,102,241,0.8)] border-2 border-slate-950" />
        </button>
        
        <button className="text-slate-400 hover:text-white transition-colors">
          <Moon className="w-5 h-5" />
        </button>
        
        <div className="h-5 w-px bg-white/10 hidden md:block"></div>

        {isAuthenticated ? (
          <div className="relative" ref={dropdownRef}>
            <div 
              className="flex items-center gap-3 cursor-pointer group"
              onClick={() => setIsDropdownOpen(!isDropdownOpen)}
            >
              <div className="text-right hidden sm:block">
                <p className="text-sm font-medium text-slate-200 group-hover:text-white transition-colors leading-tight">{userName}</p>
                <p className="text-[11px] text-slate-400">Free Plan</p>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-9 h-9 rounded-full bg-gradient-to-tr from-indigo-500 to-purple-500 p-[2px] shadow-sm shadow-indigo-500/20 shrink-0">
                  <div className="w-full h-full rounded-full bg-slate-900 border border-slate-900 overflow-hidden flex items-center justify-center">
                    <User className="w-4 h-4 text-slate-300" />
                  </div>
                </div>
                <ChevronDown className={`w-4 h-4 text-slate-400 transition-transform ${isDropdownOpen ? 'rotate-180' : ''}`} />
              </div>
            </div>

            {/* Profile Dropdown */}
            {isDropdownOpen && (
              <div className="absolute right-0 mt-2 w-48 bg-slate-900 border border-white/10 rounded-xl shadow-xl overflow-hidden py-1 z-50 animate-in fade-in slide-in-from-top-2 duration-200">
                <Link 
                  to="/dashboard/profile" 
                  className="flex items-center gap-2 px-4 py-2 text-sm text-slate-300 hover:text-white hover:bg-white/5 transition-colors"
                  onClick={() => setIsDropdownOpen(false)}
                >
                  <User className="w-4 h-4" />
                  My Profile
                </Link>
                <Link 
                  to="/dashboard/progress" 
                  className="flex items-center gap-2 px-4 py-2 text-sm text-slate-300 hover:text-white hover:bg-white/5 transition-colors"
                  onClick={() => setIsDropdownOpen(false)}
                >
                  <TrendingUp className="w-4 h-4" />
                  Progress
                </Link>
                <Link 
                  to="/dashboard/settings" 
                  className="flex items-center gap-2 px-4 py-2 text-sm text-slate-300 hover:text-white hover:bg-white/5 transition-colors"
                  onClick={() => setIsDropdownOpen(false)}
                >
                  <Settings className="w-4 h-4" />
                  Settings
                </Link>
                <Link 
                  to="/dashboard/notifications" 
                  className="flex items-center gap-2 px-4 py-2 text-sm text-slate-300 hover:text-white hover:bg-white/5 transition-colors"
                  onClick={() => setIsDropdownOpen(false)}
                >
                  <Bell className="w-4 h-4" />
                  Notifications
                </Link>
                <div className="h-px bg-white/10 my-1"></div>
                <button 
                  onClick={handleLogout}
                  className="w-full flex items-center gap-2 px-4 py-2 text-sm text-rose-400 hover:text-rose-300 hover:bg-rose-500/10 transition-colors text-left"
                >
                  <LogOut className="w-4 h-4" />
                  Logout
                </button>
              </div>
            )}
          </div>
        ) : (
          <Link to="/login">
            <button className="flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-indigo-500 to-purple-600 hover:from-indigo-400 hover:to-purple-500 text-white text-sm font-medium rounded-full transition-all shadow-[0_0_15px_rgba(99,102,241,0.3)] hover:shadow-[0_0_20px_rgba(99,102,241,0.5)] hover:-translate-y-0.5 duration-200">
              <User className="w-4 h-4" />
              Login
            </button>
          </Link>
        )}
      </div>
    </header>
  );
}

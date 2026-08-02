cat << 'INNER_EOF' > src/components/dashboard/TopNav.tsx
import React from 'react';
import { Search, Bell, Moon, Menu, User, PanelLeftClose, PanelLeftOpen } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useDashboardData } from '../../hooks/useDashboardData';

interface TopNavProps {
  onMobileMenuClick?: () => void;
  onToggleSidebar?: () => void;
  isSidebarCollapsed?: boolean;
}

export default function TopNav({ onMobileMenuClick, onToggleSidebar, isSidebarCollapsed }: TopNavProps) {
  const { userName } = useDashboardData();

  return (
    <header className="sticky top-0 z-30 flex items-center justify-between h-16 px-6 bg-slate-950/80 backdrop-blur-xl border-b border-white/10">
      <div className="flex items-center gap-4">
        {/* Mobile menu toggle */}
        <button onClick={onMobileMenuClick} className="lg:hidden text-slate-400 hover:text-white transition-colors">
          <Menu className="w-5 h-5" />
        </button>
        
        {/* Desktop/Laptop sidebar toggle */}
        <button onClick={onToggleSidebar} className="hidden lg:flex text-slate-400 hover:text-white transition-colors">
          {isSidebarCollapsed ? <PanelLeftOpen className="w-5 h-5" /> : <PanelLeftClose className="w-5 h-5" />}
        </button>

        <Link to="/" className="flex items-center gap-2 lg:hidden">
          <div className="w-7 h-7 rounded-lg bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center shadow-lg">
            <div className="w-4 h-4 text-white" />
          </div>
        </Link>
      </div>

      <div className="hidden md:flex items-center flex-1 max-w-lg mx-6 relative group">
        <div className="absolute inset-0 bg-gradient-to-r from-indigo-500/10 to-purple-500/10 rounded-full blur-md opacity-0 group-hover:opacity-100 transition-opacity" />
        <div className="relative w-full flex items-center bg-white/5 border border-white/10 rounded-full px-4 py-2 backdrop-blur-sm transition-all focus-within:bg-white/10 focus-within:border-indigo-500/50">
          <Search className="w-4 h-4 text-slate-400 mr-3 shrink-0" />
          <input
            type="text"
            placeholder="Search interviews, companies..."
            className="w-full bg-transparent border-none outline-none text-sm text-slate-200 placeholder-slate-500 min-w-0"
          />
          <div className="hidden md:flex items-center gap-1 bg-slate-800/50 rounded px-1.5 py-0.5 ml-3 border border-white/5 shrink-0">
            <span className="text-[10px] text-slate-400 font-mono">⌘</span>
            <span className="text-[10px] text-slate-400 font-mono">K</span>
          </div>
        </div>
      </div>

      <div className="flex items-center gap-5 ml-auto">
        <button className="text-slate-400 hover:text-white transition-colors relative">
          <Bell className="w-5 h-5" />
          <span className="absolute top-0 right-0 w-2 h-2 bg-indigo-500 rounded-full shadow-[0_0_8px_rgba(99,102,241,0.8)] border-2 border-slate-950" />
        </button>
        
        <button className="text-slate-400 hover:text-white transition-colors hidden sm:block">
          <Moon className="w-5 h-5" />
        </button>
        
        <div className="h-5 w-px bg-white/10 hidden md:block"></div>

        <div className="flex items-center gap-3 cursor-pointer group">
          <div className="text-right hidden sm:block">
            <p className="text-sm font-medium text-slate-200 group-hover:text-white transition-colors leading-tight">{userName}</p>
            <p className="text-[11px] text-slate-400">Free Plan</p>
          </div>
          <div className="w-9 h-9 rounded-full bg-gradient-to-tr from-indigo-500 to-purple-500 p-[2px] shadow-sm shadow-indigo-500/20">
            <div className="w-full h-full rounded-full bg-slate-900 border border-slate-900 overflow-hidden flex items-center justify-center">
              <User className="w-4 h-4 text-slate-300" />
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}
INNER_EOF

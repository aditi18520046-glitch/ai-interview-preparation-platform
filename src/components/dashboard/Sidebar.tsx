import React from 'react';
import { 
  LayoutDashboard, 
  Mic, 
  FileEdit, 
  Code2, 
  Building2, 
  Briefcase, 
  FileText, 
  TrendingUp, 
  Trophy, 
  Map, 
  History,
  Bookmark,
  Bell,
  User,
  Settings,
  HelpCircle,
  LogOut
} from 'lucide-react';

import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useAuthStore } from '../../store/authStore';

const MAIN_MENU = [
  { icon: LayoutDashboard, label: 'Dashboard', path: '/dashboard', iconColor: 'text-[#3B82F6]' },
  { icon: Mic, label: 'Mock Interview', path: '/dashboard/interview', iconColor: 'text-[#8B5CF6]' },
  { icon: FileEdit, label: 'Mock Test', path: '/dashboard/test', iconColor: 'text-[#F59E0B]' },
  { icon: Code2, label: 'Coding Practice', path: '/dashboard/coding', iconColor: 'text-[#10B981]' },
  { icon: Building2, label: 'Companies & Roles', path: '/dashboard/companies-roles', iconColor: 'text-[#EF4444]' },
  { icon: FileText, label: 'Resume Analyzer', path: '/dashboard/resume', iconColor: 'text-[#06B6D4]' },
  { icon: TrendingUp, label: 'My Progress', path: '/dashboard/progress', iconColor: 'text-[#22C55E]' },
  { icon: Trophy, label: 'Leaderboard', path: '/dashboard/leaderboard', iconColor: 'text-[#FACC15]' },
  { icon: Map, label: 'Learning Roadmap', path: '/dashboard/roadmap', iconColor: 'text-[#6366F1]' },
  { icon: History, label: 'Interview History', path: '/dashboard/history', iconColor: 'text-[#A855F7]' },
  { icon: Bookmark, label: 'Saved Questions', path: '/dashboard/saved', iconColor: 'text-[#EC4899]' },
];

const PERSONAL_MENU = [
  { icon: Bell, label: 'Notifications', path: '/dashboard/notifications', iconColor: 'text-[#FB923C]' },
  { icon: User, label: 'Profile', path: '/dashboard/profile', iconColor: 'text-[#14B8A6]' },
  { icon: Settings, label: 'Settings', path: '/dashboard/settings', iconColor: 'text-[#64748B]' },
  { icon: LogOut, label: 'Logout', path: '/login', iconColor: 'text-[#EF4444]' },
];

interface SidebarProps {
  isOpen?: boolean;
  onClose?: () => void;
  isCollapsed?: boolean;
}

export default function Sidebar({ isOpen = false, onClose = () => {}, isCollapsed = false }: SidebarProps) {
  const location = useLocation();
  const navigate = useNavigate();
  const { logout } = useAuthStore();

  return (
    <>
      {/* Mobile/Tablet Backdrop */}
      {isOpen && (
        <div 
          className="fixed inset-0 bg-slate-950/80 backdrop-blur-sm z-40 lg:hidden"
          onClick={onClose}
        />
      )}

      <aside className={`fixed left-0 top-0 bottom-0 bg-slate-900/95 backdrop-blur-xl border-r border-white/5 flex flex-col z-50 transition-all duration-300 group ${
        isOpen ? 'translate-x-0 w-64' : '-translate-x-full md:translate-x-0'
      } ${isCollapsed && !isOpen ? 'md:w-[76px] lg:hover:w-64' : 'w-64'}`}>
        <div className="p-5 flex items-center shrink-0 h-16">
          <Link to="/" className="flex items-center gap-3 group/brand overflow-hidden">
            <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center shadow-lg shadow-indigo-500/20 group-hover/brand:shadow-indigo-500/40 transition-shadow shrink-0 ml-0.5">
              <Briefcase className="w-4 h-4 text-white" />
            </div>
            <span className={`text-lg font-bold bg-clip-text text-transparent bg-gradient-to-r from-white to-slate-400 group-hover/brand:to-white transition-all duration-300 whitespace-nowrap ${
              isCollapsed && !isOpen ? 'opacity-0 lg:group-hover:opacity-100' : 'opacity-100'
            }`}>
              InterviewAI
            </span>
          </Link>
        </div>

        <div className="flex-1 overflow-y-auto py-4 px-3 space-y-6 scrollbar-hide flex flex-col">
          <div className="flex-1">
            <ul className="space-y-1.5">
              {MAIN_MENU.map((item, idx) => {
                const isActive = location.pathname === item.path || (item.path === '/dashboard' && location.pathname === '/dashboard');
                return (
                  <li key={idx} className="relative group/tooltip">
                    <Link
                      to={item.path}
                      onClick={() => {
                        if (window.innerWidth < 1024) onClose();
                      }}
                      className={`flex items-center gap-3 px-3 py-2.5 rounded-xl transition-all duration-300 font-medium text-sm overflow-hidden ${
                        isActive 
                          ? 'bg-gradient-to-br from-[#7C3AED] to-[#4F46E5] shadow-[0_8px_24px_rgba(124,58,237,0.35)] text-white' 
                          : 'text-slate-400 hover:text-slate-200 hover:bg-[rgba(255,255,255,0.08)] hover:translate-x-2'
                      }`}
                    >
                      <item.icon className={`w-5 h-5 shrink-0 transition-colors ${isActive ? 'text-white' : item.iconColor}`} />
                      <span className={`whitespace-nowrap transition-all duration-300 ${
                        isCollapsed && !isOpen ? 'opacity-0 lg:group-hover:opacity-100' : 'opacity-100'
                      }`}>
                        {item.label}
                      </span>
                    </Link>
                    
                    {/* Tooltip for collapsed state */}
                    {isCollapsed && !isOpen && (
                      <div className="hidden md:block absolute left-full ml-4 top-1/2 -translate-y-1/2 px-2.5 py-1.5 bg-slate-800 text-xs text-white font-medium rounded-lg opacity-0 pointer-events-none group-hover/tooltip:opacity-100 group-hover:opacity-0 transition-opacity z-50 whitespace-nowrap shadow-xl border border-white/10">
                        {item.label}
                      </div>
                    )}
                  </li>
                );
              })}
            </ul>
          </div>

          <div>
            <div className={`px-4 text-[10px] font-semibold text-slate-500 uppercase tracking-wider mb-3 transition-all duration-300 whitespace-nowrap ${
              isCollapsed && !isOpen ? 'opacity-0 lg:group-hover:opacity-100' : 'opacity-100'
            }`}>
              Personal
            </div>
            <ul className="space-y-1.5">
              {PERSONAL_MENU.map((item, idx) => {
                const isActive = location.pathname === item.path;
                return (
                  <li key={idx} className="relative group/tooltip">
                    <Link
                      to={item.path}
                      onClick={(e) => {
                        if (item.label === 'Logout') {
                          e.preventDefault();
                          logout();
                          navigate('/login');
                        }
                        if (window.innerWidth < 1024) onClose();
                      }}
                      className={`flex items-center gap-3 px-3 py-2.5 rounded-xl transition-all duration-300 font-medium text-sm overflow-hidden ${
                        isActive 
                          ? 'bg-gradient-to-br from-[#7C3AED] to-[#4F46E5] shadow-[0_8px_24px_rgba(124,58,237,0.35)] text-white' 
                          : `${item.iconColor === 'text-[#EF4444]' ? 'text-[#EF4444]' : 'text-slate-400 hover:text-slate-200'} hover:bg-[rgba(255,255,255,0.08)] hover:translate-x-2`
                      }`}
                    >
                      <item.icon className={`w-5 h-5 shrink-0 transition-colors ${isActive ? 'text-white' : item.iconColor}`} />
                      <span className={`whitespace-nowrap transition-all duration-300 ${
                        isCollapsed && !isOpen ? 'opacity-0 lg:group-hover:opacity-100' : 'opacity-100'
                      }`}>
                        {item.label}
                      </span>
                    </Link>
                    
                    {/* Tooltip for collapsed state */}
                    {isCollapsed && !isOpen && (
                      <div className="hidden md:block absolute left-full ml-4 top-1/2 -translate-y-1/2 px-2.5 py-1.5 bg-slate-800 text-xs text-white font-medium rounded-lg opacity-0 pointer-events-none group-hover/tooltip:opacity-100 group-hover:opacity-0 transition-opacity z-50 whitespace-nowrap shadow-xl border border-white/10">
                        {item.label}
                      </div>
                    )}
                  </li>
                );
              })}
            </ul>
          </div>
        </div>
      </aside>
    </>
  );
}

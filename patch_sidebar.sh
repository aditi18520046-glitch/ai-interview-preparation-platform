cat << 'INNER_EOF' > src/components/dashboard/Sidebar.tsx
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
  Bell,
  User,
  Settings,
  HelpCircle,
  LogOut
} from 'lucide-react';
import { Link, useLocation } from 'react-router-dom';

const MAIN_MENU = [
  { icon: LayoutDashboard, label: 'Dashboard', path: '/dashboard' },
  { icon: Mic, label: 'Mock Interview', path: '/dashboard/interview' },
  { icon: FileEdit, label: 'Mock Test', path: '/dashboard/test' },
  { icon: Code2, label: 'Coding Practice', path: '/dashboard/coding' },
  { icon: Building2, label: 'Companies', path: '/dashboard/companies' },
  { icon: Briefcase, label: 'Job Roles', path: '/dashboard/roles' },
  { icon: FileText, label: 'Resume Analyzer', path: '/dashboard/resume' },
  { icon: TrendingUp, label: 'My Progress', path: '/dashboard/progress' },
  { icon: Trophy, label: 'Leaderboard', path: '/dashboard/leaderboard' },
  { icon: Map, label: 'Learning Roadmap', path: '/dashboard/roadmap' },
  { icon: History, label: 'Interview History', path: '/dashboard/history' },
];

const PERSONAL_MENU = [
  { icon: Bell, label: 'Notifications', path: '/dashboard/notifications' },
  { icon: User, label: 'Profile', path: '/dashboard/profile' },
  { icon: Settings, label: 'Settings', path: '/dashboard/settings' },
  { icon: HelpCircle, label: 'Help & Support', path: '/dashboard/support' },
  { icon: LogOut, label: 'Logout', path: '/login', textClass: 'text-red-400 hover:text-red-300', iconClass: 'text-red-400' },
];

interface SidebarProps {
  isOpen?: boolean;
  onClose?: () => void;
  isCollapsed?: boolean;
}

export default function Sidebar({ isOpen = false, onClose = () => {}, isCollapsed = false }: SidebarProps) {
  const location = useLocation();

  return (
    <>
      {/* Mobile Backdrop */}
      {isOpen && (
        <div 
          className="fixed inset-0 bg-slate-950/80 backdrop-blur-sm z-40 lg:hidden"
          onClick={onClose}
        />
      )}

      <aside className={\`fixed left-0 top-0 h-screen bg-slate-900/95 backdrop-blur-xl border-r border-white/5 flex flex-col z-50 transition-all duration-300 group \${
        isOpen ? 'translate-x-0 w-64' : '-translate-x-full lg:translate-x-0'
      } \${isCollapsed ? 'lg:w-[76px] lg:hover:w-64' : 'w-64'}\`}>
        <div className="p-5 flex items-center shrink-0 h-16">
          <Link to="/" className="flex items-center gap-3 group/brand overflow-hidden">
            <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center shadow-lg shadow-indigo-500/20 group-hover/brand:shadow-indigo-500/40 transition-shadow shrink-0 ml-0.5">
              <Briefcase className="w-4 h-4 text-white" />
            </div>
            <span className={\`text-lg font-bold bg-clip-text text-transparent bg-gradient-to-r from-white to-slate-400 group-hover/brand:to-white transition-all duration-300 whitespace-nowrap \${
              isCollapsed ? 'opacity-0 lg:group-hover:opacity-100' : 'opacity-100'
            }\`}>
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
                      className={\`flex items-center gap-3 px-3 py-2.5 rounded-xl transition-all font-medium text-sm overflow-hidden \${
                        isActive 
                          ? 'bg-indigo-500/10 text-indigo-400 shadow-[inset_2px_0_0_0_rgba(99,102,241,1)]' 
                          : 'text-slate-400 hover:text-slate-200 hover:bg-white/5'
                      }\`}
                    >
                      <item.icon className={\`w-5 h-5 shrink-0 \${isActive ? 'text-indigo-400' : 'text-slate-500'}\`} />
                      <span className={\`whitespace-nowrap transition-all duration-300 \${
                        isCollapsed ? 'opacity-0 lg:group-hover:opacity-100' : 'opacity-100'
                      }\`}>
                        {item.label}
                      </span>
                    </Link>
                    
                    {/* Tooltip for collapsed state */}
                    {isCollapsed && (
                      <div className="hidden lg:block absolute left-full ml-4 top-1/2 -translate-y-1/2 px-2.5 py-1.5 bg-slate-800 text-xs text-white font-medium rounded-lg opacity-0 pointer-events-none group-hover/tooltip:opacity-100 group-hover:opacity-0 transition-opacity z-50 whitespace-nowrap shadow-xl border border-white/10">
                        {item.label}
                      </div>
                    )}
                  </li>
                );
              })}
            </ul>
          </div>

          <div>
            <div className={\`px-4 text-[10px] font-semibold text-slate-500 uppercase tracking-wider mb-3 transition-all duration-300 whitespace-nowrap \${
              isCollapsed ? 'opacity-0 lg:group-hover:opacity-100' : 'opacity-100'
            }\`}>
              Personal
            </div>
            <ul className="space-y-1.5">
              {PERSONAL_MENU.map((item, idx) => {
                return (
                  <li key={idx} className="relative group/tooltip">
                    <Link
                      to={item.path}
                      onClick={() => {
                        if (window.innerWidth < 1024) onClose();
                      }}
                      className={\`flex items-center gap-3 px-3 py-2.5 rounded-xl transition-all font-medium text-sm text-slate-400 hover:bg-white/5 overflow-hidden \${item.textClass || 'hover:text-slate-200'}\`}
                    >
                      <item.icon className={\`w-5 h-5 shrink-0 \${item.iconClass || 'text-slate-500'}\`} />
                      <span className={\`whitespace-nowrap transition-all duration-300 \${
                        isCollapsed ? 'opacity-0 lg:group-hover:opacity-100' : 'opacity-100'
                      }\`}>
                        {item.label}
                      </span>
                    </Link>
                    
                    {/* Tooltip for collapsed state */}
                    {isCollapsed && (
                      <div className="hidden lg:block absolute left-full ml-4 top-1/2 -translate-y-1/2 px-2.5 py-1.5 bg-slate-800 text-xs text-white font-medium rounded-lg opacity-0 pointer-events-none group-hover/tooltip:opacity-100 group-hover:opacity-0 transition-opacity z-50 whitespace-nowrap shadow-xl border border-white/10">
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
INNER_EOF

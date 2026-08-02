import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Sidebar from '../dashboard/Sidebar';
import TopNav from '../dashboard/TopNav';
import DashboardFooter from '../dashboard/DashboardFooter';
import { useAuthStore } from '../../store/authStore';

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false);
  const navigate = useNavigate();
  const { isAuthenticated } = useAuthStore();

  

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 1024) {
        setIsSidebarCollapsed(false); // Laptop/Desktop: expanded by default
      } else if (window.innerWidth >= 768) {
        setIsSidebarCollapsed(true); // Tablet: collapsed by default
      } else {
        setIsSidebarCollapsed(false); // Mobile: hidden entirely by default (handled by CSS)
      }
    };

    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const toggleSidebar = () => {
    setIsSidebarCollapsed(!isSidebarCollapsed);
  };

  return (
    <div className="fixed inset-0 bg-slate-950 text-slate-50 font-sans selection:bg-indigo-500/30 flex overflow-hidden">
      {/* Sidebar */}
      <Sidebar 
        isOpen={isMobileMenuOpen} 
        onClose={() => setIsMobileMenuOpen(false)} 
        isCollapsed={isSidebarCollapsed}
      />

      {/* Main Content Area */}
      <div className={`flex-1 flex flex-col min-w-0 h-full transition-all duration-300 relative ${isSidebarCollapsed ? 'lg:ml-[76px] md:ml-[76px]' : 'lg:ml-64'}`}>
        {/* Background Gradients */}
        <div className="fixed top-0 left-1/4 w-[800px] h-[800px] bg-indigo-600/5 rounded-full blur-[150px] pointer-events-none z-0" />
        <div className="fixed bottom-0 right-0 w-[600px] h-[600px] bg-purple-600/5 rounded-full blur-[120px] pointer-events-none z-0" />

        <TopNav 
          onMobileMenuClick={() => setIsMobileMenuOpen(true)} 
          onToggleSidebar={toggleSidebar}
          isSidebarCollapsed={isSidebarCollapsed}
        />

        <main className="flex-1 overflow-y-auto overflow-x-hidden relative z-10 scrollbar-hide">
          <div className="min-h-full flex flex-col">
            <div className="flex-1 p-4 md:p-6 lg:p-8">
              <div className="max-w-[1440px] mx-auto space-y-10">
                {children}
              </div>
            </div>
            <div className="px-4 md:px-6 lg:px-8 pb-4">
              <div className="max-w-[1440px] mx-auto">
                <DashboardFooter />
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}

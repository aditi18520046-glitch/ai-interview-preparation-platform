cat << 'INNER_EOF' > src/pages/Dashboard.tsx
import React, { useState, useEffect } from 'react';
import Sidebar from '../components/dashboard/Sidebar';
import TopNav from '../components/dashboard/TopNav';
import HeroSection from '../components/dashboard/HeroSection';
import QuickStats from '../components/dashboard/QuickStats';
import Analytics from '../components/dashboard/Analytics';
import ContinueLearning from '../components/dashboard/ContinueLearning';
import DailyChallenges from '../components/dashboard/DailyChallenges';
import Recommendations from '../components/dashboard/Recommendations';
import Reminders from '../components/dashboard/Reminders';
import Activity from '../components/dashboard/Activity';
import Leaderboard from '../components/dashboard/Leaderboard';
import Achievements from '../components/dashboard/Achievements';
import MiniCalendar from '../components/dashboard/MiniCalendar';
import DashboardFooter from '../components/dashboard/DashboardFooter';

export default function Dashboard() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 1024 && window.innerWidth < 1280) {
        setIsSidebarCollapsed(true);
      } else if (window.innerWidth >= 1280) {
        setIsSidebarCollapsed(false);
      }
    };
    handleResize(); // Initialize on mount
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const toggleSidebar = () => {
    setIsSidebarCollapsed(!isSidebarCollapsed);
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-50 font-sans selection:bg-indigo-500/30 flex">
      {/* Sidebar */}
      <Sidebar 
        isOpen={isMobileMenuOpen} 
        onClose={() => setIsMobileMenuOpen(false)} 
        isCollapsed={isSidebarCollapsed}
      />

      {/* Main Content Area */}
      <div className={`flex-1 flex flex-col min-w-0 transition-all duration-300 relative ${isSidebarCollapsed ? 'lg:ml-[76px]' : 'lg:ml-64'}`}>
        {/* Background Gradients */}
        <div className="fixed top-0 left-1/4 w-[800px] h-[800px] bg-indigo-600/5 rounded-full blur-[150px] pointer-events-none z-0" />
        <div className="fixed bottom-0 right-0 w-[600px] h-[600px] bg-purple-600/5 rounded-full blur-[120px] pointer-events-none z-0" />

        <TopNav 
          onMobileMenuClick={() => setIsMobileMenuOpen(true)} 
          onToggleSidebar={toggleSidebar}
          isSidebarCollapsed={isSidebarCollapsed}
        />

        <main className="flex-1 p-4 md:p-6 lg:p-8 overflow-y-auto overflow-x-hidden relative z-10 scrollbar-hide">
          <div className="max-w-[1440px] mx-auto space-y-10">
            <HeroSection />
            <QuickStats />
            
            <Analytics />

            <ContinueLearning />
            <DailyChallenges />

            {/* Responsive Grid for varied content */}
            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
              <div>
                <Recommendations />
              </div>
              <div>
                <Reminders />
              </div>
              <div>
                <Activity />
              </div>
            </div>

            {/* Bottom Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
              <div>
                <Leaderboard />
              </div>
              <div>
                <Achievements />
              </div>
              <div>
                <MiniCalendar />
              </div>
            </div>

            <DashboardFooter />
          </div>
        </main>
      </div>
    </div>
  );
}
INNER_EOF

const fs = require('fs');
let content = fs.readFileSync('src/pages/Dashboard.tsx', 'utf8');

// Replace everything above export default function Dashboard
const imports = `import React from 'react';
import DashboardLayout from '../components/layout/DashboardLayout';
import HeroSection from '../components/dashboard/HeroSection';
import QuickStats from '../components/dashboard/QuickStats';
import Analytics from '../components/dashboard/Analytics';
import DailyChallenges from '../components/dashboard/DailyChallenges';
import Recommendations from '../components/dashboard/Recommendations';
import Reminders from '../components/dashboard/Reminders';
import Activity from '../components/dashboard/Activity';
import Leaderboard from '../components/dashboard/Leaderboard';
import Achievements from '../components/dashboard/Achievements';

export default function Dashboard() {
  return (
    <DashboardLayout>
      <HeroSection />
      <QuickStats />
      
      <Analytics />
      
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
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <Leaderboard />
        </div>
        <div>
          <Achievements />
        </div>
      </div>
    </DashboardLayout>
  );
}
`;
fs.writeFileSync('src/pages/Dashboard.tsx', imports);

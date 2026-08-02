import React, { useState } from 'react';
import DashboardLayout from '../components/layout/DashboardLayout';
import ProgressHero from '../components/progress/ProgressHero';
import ProgressOverview from '../components/progress/ProgressOverview';
import ProgressInsights from '../components/progress/ProgressInsights';
import ProgressSkills from '../components/progress/ProgressSkills';
import ProgressReadiness from '../components/progress/ProgressReadiness';
import ProgressActivity from '../components/progress/ProgressActivity';
import ProgressRecommendations from '../components/progress/ProgressRecommendations';
import ProgressAchievements from '../components/progress/ProgressAchievements';
import ProgressGoal from '../components/progress/ProgressGoal';
import ProgressCTA from '../components/progress/ProgressCTA';
import ProgressJourney from '../components/progress/ProgressJourney';
import { Activity } from 'lucide-react';

export default function Progress() {
  const [hasActivity, setHasActivity] = useState(false);

  return (
    <DashboardLayout>
      <div className="max-w-[1440px] mx-auto space-y-12 animate-in fade-in slide-in-from-bottom-8 duration-700 pb-12">
        {/* Development Toggle - can be removed in production */}
        <div className="flex justify-end mb-4">
          <button 
            onClick={() => setHasActivity(!hasActivity)}
            className="flex items-center gap-2 px-4 py-2 bg-slate-800 border border-white/10 rounded-xl text-sm font-medium text-slate-300 hover:text-white transition-colors"
          >
            <Activity className="w-4 h-4" />
            {hasActivity ? 'Simulate Empty State' : 'Simulate Activity'}
          </button>
        </div>

        <ProgressHero hasActivity={hasActivity} />
        
        <ProgressOverview hasActivity={hasActivity} />
        
        <div className="grid lg:grid-cols-12 gap-8">
          <div className="lg:col-span-8 space-y-8">
            <ProgressInsights hasActivity={hasActivity} />
            <ProgressSkills hasActivity={hasActivity} />
            <ProgressJourney hasActivity={hasActivity} />
            <ProgressRecommendations hasActivity={hasActivity} />
          </div>
          
          <div className="lg:col-span-4 space-y-8">
            <ProgressReadiness hasActivity={hasActivity} />
            <ProgressGoal hasActivity={hasActivity} />
            <ProgressAchievements hasActivity={hasActivity} />
            <ProgressActivity hasActivity={hasActivity} />
          </div>
        </div>
        
        <ProgressCTA />
      </div>
    </DashboardLayout>
  );
}

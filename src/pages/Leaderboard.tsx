import React, { useState, useEffect } from 'react';
import DashboardLayout from '../components/layout/DashboardLayout';
import LeaderboardHero from '../components/leaderboard/LeaderboardHero';
import LeaderboardTabs from '../components/leaderboard/LeaderboardTabs';
import TopChampions from '../components/leaderboard/TopChampions';
import HallOfFame from '../components/leaderboard/HallOfFame';
import RankingTable from '../components/leaderboard/RankingTable';
import MyRanking from '../components/leaderboard/MyRanking';
import LeaderboardInsights from '../components/leaderboard/LeaderboardInsights';
import AchievementGallery from '../components/leaderboard/AchievementGallery';
import LeaderboardCTA from '../components/leaderboard/LeaderboardCTA';
import { Activity } from 'lucide-react';

export type Category = 'overall' | 'resume' | 'interview' | 'coding' | 'streak' | 'skills';

import { useLeaderboardStore } from '../store/leaderboardStore';
export default function Leaderboard() {
  const { fetchLeaderboard } = useLeaderboardStore();
  useEffect(() => { fetchLeaderboard(); }, [fetchLeaderboard]);
  const [activeCategory, setActiveCategory] = useState<Category>('overall');
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

        <LeaderboardHero hasActivity={hasActivity} />
        
        <div className="space-y-8">
          <LeaderboardTabs activeCategory={activeCategory} onCategoryChange={setActiveCategory} />
          
          <TopChampions category={activeCategory} hasActivity={hasActivity} />
          
          <HallOfFame category={activeCategory} hasActivity={hasActivity} />

          <div className="grid lg:grid-cols-12 gap-8">
            <div className="lg:col-span-8">
              <RankingTable category={activeCategory} hasActivity={hasActivity} />
            </div>
            
            <div className="lg:col-span-4 space-y-8">
              <MyRanking category={activeCategory} hasActivity={hasActivity} />
              <LeaderboardInsights category={activeCategory} hasActivity={hasActivity} />
              <AchievementGallery hasActivity={hasActivity} />
            </div>
          </div>
        </div>
        
        <LeaderboardCTA />
      </div>
    </DashboardLayout>
  );
}

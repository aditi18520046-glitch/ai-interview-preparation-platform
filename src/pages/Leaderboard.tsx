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
  

  return (
    <DashboardLayout>
      <div className="max-w-[1440px] mx-auto space-y-12 animate-in fade-in slide-in-from-bottom-8 duration-700 pb-12">
        {/* Development Toggle - can be removed in production */}
        

        <LeaderboardHero  />
        
        <div className="space-y-8">
          <LeaderboardTabs activeCategory={activeCategory} onCategoryChange={setActiveCategory} />
          
          <TopChampions category={activeCategory}  />
          
          <HallOfFame category={activeCategory}  />

          <div className="grid lg:grid-cols-12 gap-8">
            <div className="lg:col-span-8">
              <RankingTable category={activeCategory}  />
            </div>
            
            <div className="lg:col-span-4 space-y-8">
              <MyRanking category={activeCategory}  />
              <LeaderboardInsights category={activeCategory}  />
              <AchievementGallery  />
            </div>
          </div>
        </div>
        
        <LeaderboardCTA />
      </div>
    </DashboardLayout>
  );
}

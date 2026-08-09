import React, { useState, useEffect } from 'react';
import { useRoadmapStore } from '../store/roadmapStore';
import DashboardLayout from '../components/layout/DashboardLayout';
import RoadmapHero from '../components/roadmap/RoadmapHero';
import RoadmapGenerator from '../components/roadmap/RoadmapGenerator';
import RoadmapTimeline from '../components/roadmap/RoadmapTimeline';
import SkillProgressDashboard from '../components/roadmap/SkillProgressDashboard';
import WeeklyStudyPlanner from '../components/roadmap/WeeklyStudyPlanner';
import SkillGapAnalysis from '../components/roadmap/SkillGapAnalysis';
import DailyGoals from '../components/roadmap/DailyGoals';
import InterviewReadinessTracker from '../components/roadmap/InterviewReadinessTracker';
import RoadmapAchievements from '../components/roadmap/RoadmapAchievements';
import RoadmapRecommendations from '../components/roadmap/RoadmapRecommendations';
import ContinueLearning from '../components/roadmap/ContinueLearning';
import LearningHistory from '../components/roadmap/LearningHistory';
import RoadmapCertificate from '../components/roadmap/RoadmapCertificate';
import FloatingAIAssistant from '../components/roadmap/FloatingAIAssistant';
import { Activity } from 'lucide-react';

export default function LearningRoadmap() {
  const { currentRoadmap, saveRoadmap, fetchHistory } = useRoadmapStore();
  
  useEffect(() => {
    fetchHistory();
  }, [fetchHistory]);

  const handleGenerate = async (formData: any) => {
    await saveRoadmap({
      company: formData?.company || 'General',
      job_role: formData?.role || 'Software Engineer',
      experience_level: formData?.experience || 'Beginner',
      generated_roadmap: { dummy: 'data' },
      completed_topics: [],
      remaining_topics: ['Data Structures', 'System Design'],
      completion_percentage: 0
    });
    setHasRoadmap(true);
  };

  const [hasRoadmap, setHasRoadmap] = useState(false);
  useEffect(() => { if (currentRoadmap) setHasRoadmap(true); }, [currentRoadmap]);
  const [isCompleted, setIsCompleted] = useState(false);

  return (
    <DashboardLayout>
      <div className="max-w-[1440px] mx-auto space-y-12 animate-in fade-in slide-in-from-bottom-8 duration-700 pb-12">
        {/* Development Toggle */}
        <div className="flex justify-end mb-4 gap-2">
          <button 
            onClick={() => setHasRoadmap(!hasRoadmap)}
            className="flex items-center gap-2 px-4 py-2 bg-slate-800 border border-white/10 rounded-xl text-sm font-medium text-slate-300 hover:text-white transition-colors"
          >
            <Activity className="w-4 h-4" />
            {hasRoadmap ? 'Clear Roadmap' : 'Generate Mock Roadmap'}
          </button>
          {hasRoadmap && (
             <button 
             onClick={() => setIsCompleted(!isCompleted)}
             className="flex items-center gap-2 px-4 py-2 bg-slate-800 border border-white/10 rounded-xl text-sm font-medium text-slate-300 hover:text-white transition-colors"
           >
             <Activity className="w-4 h-4" />
             {isCompleted ? 'Mark Incomplete' : 'Complete Roadmap'}
           </button>
          )}
        </div>

        <RoadmapHero />

        {!hasRoadmap ? (
          <RoadmapGenerator onGenerate={handleGenerate} />
        ) : (
          <div className="space-y-12">
            {/* Quick Stats & Analytics at the top once generated */}
            <div className="grid lg:grid-cols-12 gap-8">
              <div className="lg:col-span-8">
                <SkillProgressDashboard />
              </div>
              <div className="lg:col-span-4">
                <InterviewReadinessTracker />
              </div>
            </div>

            <div className="grid lg:grid-cols-12 gap-8">
              <div className="lg:col-span-8 space-y-12">
                <ContinueLearning />
                <RoadmapTimeline />
              </div>
              
              <div className="lg:col-span-4 space-y-8">
                <DailyGoals />
                <SkillGapAnalysis />
                <RoadmapRecommendations />
                <RoadmapAchievements />
                <WeeklyStudyPlanner />
                <LearningHistory />
              </div>
            </div>

            {isCompleted && (
              <RoadmapCertificate />
            )}
          </div>
        )}
      </div>
      
      <FloatingAIAssistant />
    </DashboardLayout>
  );
}

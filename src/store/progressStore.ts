import { create } from 'zustand';
import { supabase } from '../lib/supabase';
import { db } from '../lib/db';
import { useAuthStore } from './authStore';

export interface Progress {
  id?: string;
  user_id: string;
  overall_score: number;
  interviews_completed: number;
  mock_tests_completed: number;
  coding_problems_solved: number;
  roadmap_progress: number;
  recent_activities: any[];
  last_updated?: string;
}

interface ProgressState {
  progress: Progress | null;
  isLoading: boolean;
  fetchProgress: () => Promise<void>;
  updateProgress: () => Promise<void>;
}

export const useProgressStore = create<ProgressState>((set, get) => ({
  progress: null,
  isLoading: false,

  fetchProgress: async () => {
    const user = useAuthStore.getState().user;
    if (!user) return;
    
    set({ isLoading: true });
    try {
      let data = await db.collection('progress').findOne({ user_id: user.id });
      let error = null;
        
      if (!data) {
        const newProgress = {
            user_id: user.id,
            overall_score: 0,
            interviews_completed: 0,
            mock_tests_completed: 0,
            coding_problems_solved: 0,
            roadmap_progress: 0,
            recent_activities: []
        };
        const insertError = null;
        await db.collection('progress').insert(newProgress);
        if (!insertError) {
           data = newProgress;
        } else {
           console.error('Failed to create initial progress:', insertError.message);
           data = newProgress;
        }
      } else if (error) { throw error; }
      
      set({ progress: data });
    } catch (error) {
      console.error('Error fetching progress:', error);
    } finally {
      set({ isLoading: false });
    }
  },

  updateProgress: async () => {
    const user = useAuthStore.getState().user;
    if (!user) return;

    try {
      // Calculate derived metrics
      // In a real app this would be a backend cron/trigger, but we simulate it here.
      
      // 1. Interviews
      const interviews = await db.collection('interview_history').find({ user_id: user.id, status: 'completed' });
      const interviewsCount = interviews.length;
        
      // 2. Mock Tests
      const mockTests = await db.collection('mock_tests').find({ user_id: user.id, status: 'completed' });
      const mockTestsCount = mockTests.length;
        
      // 3. Coding problems
      const codings = await db.collection('coding_submissions').find({ user_id: user.id });
      const codingCount = codings.length;
        
      // 4. Roadmap progress
      const roadmaps = await db.collection('learning_roadmap').find({ user_id: user.id }, { sort: { created_at: -1 }, limit: 1 });
        
      const latestRoadmapProgress = roadmaps && roadmaps.length > 0 ? roadmaps[0].completion_percentage : 0;
      
      const overallScore = Math.min(100, (
        ((interviewsCount || 0) * 5) + 
        ((mockTestsCount || 0) * 5) + 
        ((codingCount || 0) * 2) + 
        (latestRoadmapProgress * 0.5)
      ));
      
      const updates = {
        interviews_completed: interviewsCount || 0,
        mock_tests_completed: mockTestsCount || 0,
        coding_problems_solved: codingCount || 0,
        roadmap_progress: latestRoadmapProgress,
        overall_score: Math.round(overallScore)
      };

      const data = await db.collection('progress').upsert({ user_id: user.id }, updates);
      const error = null;
        
      if (error) throw error;
      set({ progress: data });
    } catch (error) {
      console.error('Error updating progress:', error);
    }
  }
}));

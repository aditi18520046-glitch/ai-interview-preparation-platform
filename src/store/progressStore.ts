import { create } from 'zustand';
import { supabase } from '../lib/supabase';
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
      let { data, error } = await supabase
        .from('progress')
        .select('*')
        .eq('user_id', user.id)
        .maybeSingle();
        
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
        const { error: insertError } = await supabase.from('progress').insert([newProgress]);
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
      const { count: interviewsCount } = await supabase
        .from('interview_history')
        .select('id', { count: 'exact', head: true })
        .eq('user_id', user.id)
        .eq('status', 'completed');
        
      // 2. Mock Tests
      const { count: mockTestsCount } = await supabase
        .from('mock_tests')
        .select('id', { count: 'exact', head: true })
        .eq('user_id', user.id)
        .eq('status', 'completed');
        
      // 3. Coding problems
      const { count: codingCount } = await supabase
        .from('coding_submissions')
        .select('id', { count: 'exact', head: true })
        .eq('user_id', user.id);
        
      // 4. Roadmap progress
      const { data: roadmaps } = await supabase
        .from('learning_roadmap')
        .select('completion_percentage')
        .eq('user_id', user.id)
        .order('created_at', { ascending: false })
        .limit(1);
        
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

      const { data, error } = await supabase
        .from('progress')
        .upsert({ user_id: user.id, ...updates }, { onConflict: 'user_id' })
        .select()
        .maybeSingle();
        
      if (error) throw error;
      set({ progress: data });
    } catch (error) {
      console.error('Error updating progress:', error);
    }
  }
}));

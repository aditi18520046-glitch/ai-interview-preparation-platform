import { create } from 'zustand';
import { supabase } from '../lib/supabase';
import { useAuthStore } from './authStore';

export interface Progress {
  id?: string;
  user_id: string;
  overall_progress: number;
  interview_readiness: number;
  resume_score: number;
  technical_skills_score: number;
  coding_score: number;
  communication_score: number;
  problem_solving_score: number;
  learning_streak: number;
  weekly_goal: number;
  weekly_completed: number;
  ai_insights?: any[];
  ai_recommendations?: any[];
  // Backwards compatibility
  recent_activities?: any[];
  overall_score?: number;
  roadmap_progress?: number;
  interviews_completed?: number;
  mock_tests_completed?: number;
  coding_problems_solved?: number;
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
      let { data, error } = await supabase.from('progress').select('*').eq('user_id', user.id).maybeSingle();
        
      if (!data && !error) {
        const newProgress: Progress = {
            user_id: user.id,
            overall_progress: 0,
            interview_readiness: 0,
            resume_score: 0,
            technical_skills_score: 0,
            coding_score: 0,
            communication_score: 0,
            problem_solving_score: 0,
            learning_streak: 0,
            weekly_goal: 5,
            weekly_completed: 0,
            ai_insights: [],
            ai_recommendations: []
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
      const { count: interviewsCount } = await supabase.from('interviews').select('id', { count: 'exact', head: true }).eq('user_id', user.id).eq('status', 'completed');
      const { count: mockTestsCount } = await supabase.from('mock_tests').select('id', { count: 'exact', head: true }).eq('user_id', user.id).eq('status', 'completed');
      const { count: codingCount } = await supabase.from('coding_submissions').select('id', { count: 'exact', head: true }).eq('user_id', user.id);
      const { data: roadmaps } = await supabase.from('learning_roadmap').select('*').eq('user_id', user.id).order('created_at', { ascending: false }).limit(1);
        
      const latestRoadmapProgress = roadmaps && roadmaps.length > 0 ? (roadmaps[0].completion_percentage || 0) : 0;
      
      const overallScore = Math.min(100, (
        ((interviewsCount || 0) * 5) + 
        ((mockTestsCount || 0) * 5) + 
        ((codingCount || 0) * 2) + 
        (latestRoadmapProgress * 0.5)
      ));
      
      const updates = {
        overall_progress: Math.round(overallScore),
        interview_readiness: Math.min(100, ((interviewsCount || 0) * 10)),
        coding_score: Math.min(100, ((codingCount || 0) * 10))
      };

      const { data, error } = await supabase.from('progress').upsert({ user_id: user.id, ...updates }, { onConflict: 'user_id' }).select().maybeSingle();
        
      if (error) throw error;
      set({ progress: data });
    } catch (error) {
      console.error('Error updating progress:', error);
    }
  }
}));

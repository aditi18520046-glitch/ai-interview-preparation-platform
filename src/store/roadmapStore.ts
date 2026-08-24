import { create } from 'zustand';
import { supabase } from '../lib/supabase';
import { useAuthStore } from './authStore';
import { useProgressStore } from './progressStore';

export interface LearningRoadmap {
  id?: string;
  user_id: string;
  target_company?: string;
  job_role?: string;
  programming_language?: string;
  experience_level?: string;
  skill_level?: string;
  learning_goal?: string;
  interview_type?: string;
  preferred_language?: string;
  roadmap_duration?: string;
  weekly_study_hours?: string;
  difficulty?: string;
  expected_readiness?: number;
  roadmap_data?: any;
  status?: string;
  
  // Keep for backwards compatibility
  company?: string;
  generated_roadmap?: any;
  completed_topics?: string[];
  remaining_topics?: string[];
  completion_percentage?: number;
  
  created_at?: string;
  updated_at?: string;
}

interface RoadmapState {
  currentRoadmap: LearningRoadmap | null;
  history: LearningRoadmap[];
  isLoading: boolean;
  saveRoadmap: (data: Partial<LearningRoadmap>) => Promise<void>;
  updateProgress: (id: string, updates: Partial<LearningRoadmap>) => Promise<void>;
  fetchHistory: () => Promise<void>;
  resumeRoadmap: (id: string) => Promise<void>;
}

export const useRoadmapStore = create<RoadmapState>((set, get) => ({
  currentRoadmap: null,
  history: [],
  isLoading: false,

  saveRoadmap: async (data) => {
    const user = useAuthStore.getState().user;
    if (!user) return;
    
    set({ isLoading: true });
    try {
      const newRoadmap = {
        user_id: user.id,
        target_company: data.target_company || data.company || '',
        job_role: data.job_role || '',
        experience_level: data.experience_level || '',
        programming_language: data.programming_language || '',
        skill_level: data.skill_level || '',
        learning_goal: data.learning_goal || '',
        interview_type: data.interview_type || '',
        preferred_language: data.preferred_language || '',
        roadmap_duration: data.roadmap_duration || '',
        weekly_study_hours: data.weekly_study_hours || '',
        difficulty: data.difficulty || '',
        expected_readiness: data.expected_readiness || 0,
        roadmap_data: data.roadmap_data || data.generated_roadmap || {},
        status: data.status || 'active',
        
        // Include old fields if DB relies on them
        completion_percentage: data.completion_percentage || 0
      };

      const { data: inserted, error } = await supabase.from('learning_roadmap').upsert(newRoadmap, { onConflict: 'user_id' }).select().maybeSingle();
      
      if (error) {
         if (error.code === 'PGRST116') {
             // Supabase sometimes returns this for upsert returning multiple, which shouldn't happen here.
         } else {
             throw error;
         }
      }
      set({ currentRoadmap: inserted });
      get().fetchHistory();
    } catch (error) {
      console.error('Error saving roadmap:', error);
    } finally {
      set({ isLoading: false });
    }
  },

  updateProgress: async (id, updates) => {
    try {
      const { data, error } = await supabase.from('learning_roadmap').update(updates).eq('id', id).select().single();
        
      if (error) throw error;
      set({ currentRoadmap: data });
      get().fetchHistory();
      
      try {
         await useProgressStore.getState().updateProgress();
      } catch (e) {
         console.error('Failed to update progress after roadmap update', e);
      }
    } catch (error) {
      console.error('Error updating roadmap:', error);
    }
  },

  fetchHistory: async () => {
    const user = useAuthStore.getState().user;
    if (!user) return;
    
    set({ isLoading: true });
    try {
      const { data, error } = await supabase.from('learning_roadmap').select('*').eq('user_id', user.id).order('created_at', { ascending: false });
        
      if (error) throw error;
      set({ history: data || [] });
      if (!get().currentRoadmap && data && data.length > 0) {
        set({ currentRoadmap: data[0] });
      }
    } catch (error) {
      console.error('Error fetching roadmap history:', error);
    } finally {
      set({ isLoading: false });
    }
  },

  resumeRoadmap: async (id) => {
    const roadmap = get().history.find(r => r.id === id);
    if (roadmap) {
      set({ currentRoadmap: roadmap });
    }
  }
}));

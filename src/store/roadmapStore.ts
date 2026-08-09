import { create } from 'zustand';
import { supabase } from '../lib/supabase';
import { useAuthStore } from './authStore';

export interface LearningRoadmap {
  id?: string;
  user_id: string;
  company: string;
  job_role: string;
  experience_level: string;
  generated_roadmap: any;
  completed_topics: string[];
  remaining_topics: string[];
  completion_percentage: number;
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
        company: data.company || '',
        job_role: data.job_role || '',
        experience_level: data.experience_level || '',
        generated_roadmap: data.generated_roadmap || {},
        completed_topics: data.completed_topics || [],
        remaining_topics: data.remaining_topics || [],
        completion_percentage: data.completion_percentage || 0
      };

      const { data: inserted, error } = await supabase
        .from('learning_roadmap')
        .insert([newRoadmap])
        .select()
        .single();

      if (error) throw error;
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
      const { data, error } = await supabase
        .from('learning_roadmap')
        .update(updates)
        .eq('id', id)
        .select()
        .single();
        
      if (error) throw error;
      set({ currentRoadmap: data });
      get().fetchHistory();
    } catch (error) {
      console.error('Error updating roadmap:', error);
    }
  },

  fetchHistory: async () => {
    const user = useAuthStore.getState().user;
    if (!user) return;
    
    set({ isLoading: true });
    try {
      const { data, error } = await supabase
        .from('learning_roadmap')
        .select('*')
        .eq('user_id', user.id)
        .order('created_at', { ascending: false });
        
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

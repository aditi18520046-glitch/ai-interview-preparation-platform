import { create } from 'zustand';
import { supabase } from '../lib/supabase';
import { db } from '../lib/db';
import { useAuthStore } from './authStore';
import { useProgressStore } from './progressStore';

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

      const inserted = await db.collection('learning_roadmap').insert(newRoadmap);
      const error = null;

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
      const data = await db.collection('learning_roadmap').update({ id }, updates);
      const error = null;
        
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
      const data = await db.collection('learning_roadmap').find({ user_id: user.id }, { sort: { created_at: -1 } });
      const error = null;
        
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

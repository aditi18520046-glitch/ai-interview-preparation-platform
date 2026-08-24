import { create } from 'zustand';
import { supabase } from '../lib/supabase';
import { useAuthStore } from './authStore';
import { useDashboardStore } from './dashboardStore';
import { useProgressStore } from './progressStore';

export interface MockTest {
  id?: string;
  user_id: string;
  company: string;
  job_role: string;
  difficulty?: string;
  duration?: number;
  language?: string;
  status: 'in_progress' | 'completed';
  total_questions?: number;
  correct_answers?: number;
  score?: number;
  communication_score?: number;
  coding_score?: number;
  started_at?: string;
  completed_at?: string;
  // Keep arrays for backward compatibility with frontend code
  questions?: any[];
  user_answers?: any[];
  created_at?: string;
  percentage?: number;
  marks?: number;
  time_taken?: number;
}

interface MockTestState {
  currentTest: MockTest | null;
  history: MockTest[];
  isLoading: boolean;
  startTest: (data: Partial<MockTest>) => Promise<void>;
  updateTest: (id: string, updates: Partial<MockTest>) => Promise<void>;
  finishTest: (id: string, data: Partial<MockTest>) => Promise<void>;
  fetchHistory: () => Promise<void>;
  resumeTest: (id: string) => Promise<void>;
}

export const useMockTestStore = create<MockTestState>((set, get) => ({
  currentTest: null,
  history: [],
  isLoading: false,

  startTest: async (data) => {
    const user = useAuthStore.getState().user;
    if (!user) return;
    
    set({ isLoading: true });
    try {
      const newTest: MockTest = {
        user_id: user.id,
        company: data.company || '',
        job_role: data.job_role || '',
        difficulty: data.difficulty || '',
        duration: data.duration || 0,
        language: data.language || '',
        status: 'in_progress',
        started_at: new Date().toISOString()
      };

      const { data: inserted, error } = await supabase.from('mock_tests').insert([newTest]).select().single();
      
      if (error) throw error;
      set({ currentTest: inserted });
    } catch (error) {
      console.error('Error starting mock test:', error);
    } finally {
      set({ isLoading: false });
    }
  },

  updateTest: async (id, updates) => {
    try {
      const { data, error } = await supabase.from('mock_tests').update(updates).eq('id', id).select().single();
        
      if (error) throw error;
      set({ currentTest: data });
    } catch (error) {
      console.error('Error updating mock test:', error);
    }
  },

  finishTest: async (id, data) => {
    try {
      const { data: updated, error } = await supabase.from('mock_tests').update({
          ...data,
          status: 'completed',
          completed_at: new Date().toISOString()
        }).eq('id', id).select().single();
        
      if (error) throw error;
      set({ currentTest: null });
      get().fetchHistory();
      
      try {
        const currentStats = useDashboardStore.getState().stats;
        await useDashboardStore.getState().updateStats({ 
          mock_tests_completed: (currentStats?.mock_tests_completed || 0) + 1,
          total_xp: (currentStats?.total_xp || 0) + Math.round(data.score || 0)
        });
        await useProgressStore.getState().updateProgress();
      } catch (e) {
        console.error('Failed to update stats after mock test', e);
      }
    } catch (error) {
      console.error('Error finishing mock test:', error);
    }
  },

  fetchHistory: async () => {
    const user = useAuthStore.getState().user;
    if (!user) return;
    
    set({ isLoading: true });
    try {
      const { data, error } = await supabase.from('mock_tests').select('*').eq('user_id', user.id).order('started_at', { ascending: false });
        
      if (error) throw error;
      set({ history: data || [] });
    } catch (error) {
      console.error('Error fetching mock tests:', error);
    } finally {
      set({ isLoading: false });
    }
  },

  resumeTest: async (id) => {
    const test = get().history.find(t => t.id === id);
    if (test) {
      set({ currentTest: test });
    }
  }
}));

import { create } from 'zustand';
import { supabase } from '../lib/supabase';
import { db } from '../lib/db';
import { useAuthStore } from './authStore';
import { useDashboardStore } from './dashboardStore';
import { useProgressStore } from './progressStore';

export interface MockTest {
  id?: string;
  user_id: string;
  company: string;
  job_role: string;
  questions: any[];
  user_answers: any[];
  correct_answers: any[];
  marks: number;
  percentage: number;
  time_taken: number;
  status: 'in_progress' | 'completed';
  created_at?: string;
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
        questions: data.questions || [],
        user_answers: data.user_answers || [],
        correct_answers: data.correct_answers || [],
        marks: 0,
        percentage: 0,
        time_taken: 0,
        status: 'in_progress'
      };

      const inserted = await db.collection('mock_tests').insert(newTest);
      const error = null;

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
      const data = await db.collection('mock_tests').update({ id }, updates);
      const error = null;
        
      if (error) throw error;
      set({ currentTest: data });
    } catch (error) {
      console.error('Error updating mock test:', error);
    }
  },

  finishTest: async (id, data) => {
    try {
      const updated = await db.collection('mock_tests').update({ id }, {
          ...data,
          status: 'completed'
        });
      const error = null;
        
      if (error) throw error;

      set({ currentTest: null });
      get().fetchHistory();
      
      try {
        const currentStats = useDashboardStore.getState().stats;
        await useDashboardStore.getState().updateStats({
           mock_tests_completed: (currentStats?.mock_tests_completed || 0) + 1,
           total_xp: (currentStats?.total_xp || 0) + Math.round(data.percentage || 0)
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
      const data = await db.collection('mock_tests').find({ user_id: user.id }, { sort: { created_at: -1 } });
      const error = null;
        
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

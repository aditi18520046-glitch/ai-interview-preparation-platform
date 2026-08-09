import { create } from 'zustand';
import { supabase } from '../lib/supabase';
import { useAuthStore } from './authStore';

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

      const { data: inserted, error } = await supabase
        .from('mock_tests')
        .insert([newTest])
        .select()
        .single();

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
      const { data, error } = await supabase
        .from('mock_tests')
        .update(updates)
        .eq('id', id)
        .select()
        .single();
        
      if (error) throw error;
      set({ currentTest: data });
    } catch (error) {
      console.error('Error updating mock test:', error);
    }
  },

  finishTest: async (id, data) => {
    try {
      const { data: updated, error } = await supabase
        .from('mock_tests')
        .update({
          ...data,
          status: 'completed'
        })
        .eq('id', id)
        .select()
        .single();
        
      if (error) throw error;
      set({ currentTest: null });
      get().fetchHistory();
    } catch (error) {
      console.error('Error finishing mock test:', error);
    }
  },

  fetchHistory: async () => {
    const user = useAuthStore.getState().user;
    if (!user) return;
    
    set({ isLoading: true });
    try {
      const { data, error } = await supabase
        .from('mock_tests')
        .select('*')
        .eq('user_id', user.id)
        .order('created_at', { ascending: false });
        
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

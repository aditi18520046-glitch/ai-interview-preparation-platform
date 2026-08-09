import { create } from 'zustand';
import { supabase } from '../lib/supabase';
import { useAuthStore } from './authStore';

export interface CodingSubmission {
  id?: string;
  user_id: string;
  programming_language: string;
  company: string;
  question: string;
  submitted_code: string;
  runtime: number;
  memory: number;
  passed_test_cases: number;
  failed_test_cases: number;
  score: number;
  created_at?: string;
}

interface CodingState {
  history: CodingSubmission[];
  isLoading: boolean;
  submitCode: (data: Partial<CodingSubmission>) => Promise<void>;
  fetchHistory: () => Promise<void>;
}

export const useCodingStore = create<CodingState>((set, get) => ({
  history: [],
  isLoading: false,

  submitCode: async (data) => {
    const user = useAuthStore.getState().user;
    if (!user) return;
    
    set({ isLoading: true });
    try {
      const newSubmission: CodingSubmission = {
        user_id: user.id,
        programming_language: data.programming_language || '',
        company: data.company || '',
        question: data.question || '',
        submitted_code: data.submitted_code || '',
        runtime: data.runtime || 0,
        memory: data.memory || 0,
        passed_test_cases: data.passed_test_cases || 0,
        failed_test_cases: data.failed_test_cases || 0,
        score: data.score || 0
      };

      const { error } = await supabase
        .from('coding_submissions')
        .insert([newSubmission]);

      if (error) throw error;
      get().fetchHistory();
    } catch (error) {
      console.error('Error submitting code:', error);
    } finally {
      set({ isLoading: false });
    }
  },

  fetchHistory: async () => {
    const user = useAuthStore.getState().user;
    if (!user) return;
    
    set({ isLoading: true });
    try {
      const { data, error } = await supabase
        .from('coding_submissions')
        .select('*')
        .eq('user_id', user.id)
        .order('created_at', { ascending: false });
        
      if (error) throw error;
      set({ history: data || [] });
    } catch (error) {
      console.error('Error fetching coding history:', error);
    } finally {
      set({ isLoading: false });
    }
  }
}));

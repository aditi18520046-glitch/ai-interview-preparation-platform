import { create } from 'zustand';
import { supabase } from '../lib/supabase';
import { useAuthStore } from './authStore';
import { useDashboardStore } from './dashboardStore';
import { useProgressStore } from './progressStore';

export interface CodingSubmission {
  id?: string;
  user_id: string;
  problem_title: string;
  language: string;
  status: string;
  score: number;
  execution_time: number;
  submitted_code: string;
  started_at?: string;
  submitted_at?: string;
  // For backwards compatibility
  question?: string;
  programming_language?: string;
  runtime?: number;
  created_at?: string;
  company?: string;
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
        problem_title: data.problem_title || data.question || '',
        language: data.language || data.programming_language || '',
        status: data.status || 'completed',
        score: data.score || 0,
        execution_time: data.execution_time || data.runtime || 0,
        submitted_code: data.submitted_code || '',
        started_at: data.started_at || new Date().toISOString(),
        submitted_at: data.submitted_at || new Date().toISOString()
      };

      const { error } = await supabase.from('coding_submissions').insert([newSubmission]);

      if (error) throw error;

      get().fetchHistory();
      
      try {
        const currentStats = useDashboardStore.getState().stats;
        await useDashboardStore.getState().updateStats({
           coding_questions_solved: (currentStats?.coding_questions_solved || 0) + 1,
           total_xp: (currentStats?.total_xp || 0) + (data.score || 0)
        });
        await useProgressStore.getState().updateProgress();
      } catch (e) {
        console.error('Failed to update stats after coding', e);
      }

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
      const { data, error } = await supabase.from('coding_submissions').select('*').eq('user_id', user.id).order('created_at', { ascending: false });
        
      if (error) throw error;
      set({ history: data || [] });
    } catch (error) {
      console.error('Error fetching coding history:', error);
    } finally {
      set({ isLoading: false });
    }
  }
}));

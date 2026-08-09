import { create } from 'zustand';
import { supabase } from '../lib/supabase';

export interface InterviewHistory {
  id?: string;
  user_id: string;
  company: string;
  job_role: string;
  interview_type: string;
  difficulty: string;
  start_time: string;
  questions?: any[];
  answers?: any[];
  ai_feedback?: string;
  final_score?: number;
  duration?: number;
  completion_time?: string;
  status: 'in_progress' | 'completed';
}

interface InterviewState {
  currentInterview: InterviewHistory | null;
  history: InterviewHistory[];
  isLoading: boolean;
  startInterview: (data: Partial<InterviewHistory>) => Promise<void>;
  updateInterview: (id: string, updates: Partial<InterviewHistory>) => Promise<void>;
  finishInterview: (id: string, data: Partial<InterviewHistory>) => Promise<void>;
  fetchHistory: () => Promise<void>;
  resumeInterview: (id: string) => Promise<void>;
}

const generateId = () => Math.random().toString(36).substring(2, 9);

export const useInterviewStore = create<InterviewState>((set, get) => ({
  currentInterview: null,
  history: [],
  isLoading: false,

  startInterview: async (data) => {
    set({ isLoading: true });
    try {
      const { data: { user }, error: authError } = await supabase.auth.getUser();
      if (authError || !user) {
        throw new Error('User must be authenticated to start an interview');
      }

      const newInterview: InterviewHistory = {
        user_id: user.id,
        company: data.company || '',
        job_role: data.job_role || '',
        interview_type: data.interview_type || '',
        difficulty: data.difficulty || '',
        start_time: new Date().toISOString(),
        status: 'in_progress',
        questions: [],
        answers: []
      };

      const { data: inserted, error } = await supabase
        .from('interview_history')
        .insert([newInterview])
        .select()
        .single();

      if (error) {
        console.error('Error starting interview:', error.message, error.details, error.hint);
        throw error;
      }
      
      set({ currentInterview: inserted });
    } catch (error) {
      console.error('Failed to start interview:', error);
      // Removed fallback to local state because it creates un-syncable records and bypasses RLS
      throw error; // Rethrow to let the UI handle the failure
    } finally {
      set({ isLoading: false });
    }
  },

  updateInterview: async (id, updates) => {
    try {
      const { data, error } = await supabase
        .from('interview_history')
        .update(updates)
        .eq('id', id)
        .select()
        .single();
        
      if (error) {
        console.error('Error updating interview:', error.message, error.details);
        throw error;
      }
      set({ currentInterview: data });
    } catch (error) {
      console.error('Failed to update interview:', error);
    }
  },

  finishInterview: async (id, data) => {
    try {
      const { data: updated, error } = await supabase
        .from('interview_history')
        .update({
          ...data,
          status: 'completed',
          completion_time: new Date().toISOString()
        })
        .eq('id', id)
        .select()
        .single();
        
      if (error) {
        console.error('Error finishing interview:', error.message, error.details);
        throw error;
      }
      set({ currentInterview: null });
      get().fetchHistory();
    } catch (error) {
      console.error('Failed to finish interview:', error);
    }
  },

  fetchHistory: async () => {
    set({ isLoading: true });
    try {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) {
        set({ isLoading: false });
        return;
      }

      const { data, error } = await supabase
        .from('interview_history')
        .select('*')
        .eq('user_id', user.id)
        .order('start_time', { ascending: false });
        
      if (error) {
        console.error('Error fetching interview history:', error.message, error.details);
        throw error;
      }
      set({ history: data || [] });
    } catch (error) {
      console.error('Failed to fetch interview history:', error);
    } finally {
      set({ isLoading: false });
    }
  },

  resumeInterview: async (id) => {
    const interview = get().history.find(i => i.id === id);
    if (interview) {
      set({ currentInterview: interview });
    }
  }
}));

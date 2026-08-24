import { create } from 'zustand';
import { supabase } from '../lib/supabase';
import { useDashboardStore } from './dashboardStore';
import { useProgressStore } from './progressStore';

export interface InterviewData {
  id?: string;
  user_id: string;
  company: string;
  job_role: string;
  interview_type: string;
  interview_mode?: string;
  interview_language?: string;
  skills_focus?: string;
  difficulty: string;
  started_at?: string;
  completed_at?: string;
  questions?: any[];
  answers?: any[];
  ai_feedback?: string;
  final_score?: number;
  duration?: number;
  status: 'in_progress' | 'completed';
  start_time?: string;
}

interface InterviewState {
  currentInterview: InterviewData | null;
  history: InterviewData[];
  isLoading: boolean;
  startInterview: (data: Partial<InterviewData>) => Promise<void>;
  updateInterview: (id: string, updates: Partial<InterviewData>) => Promise<void>;
  finishInterview: (id: string, data: Partial<InterviewData>) => Promise<void>;
  fetchHistory: () => Promise<void>;
  resumeInterview: (id: string) => Promise<void>;
}

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

      const newInterview: InterviewData = {
        user_id: user.id,
        company: data.company || '',
        job_role: data.job_role || '',
        interview_type: data.interview_type || '',
        interview_mode: data.interview_mode || '',
        interview_language: data.interview_language || '',
        skills_focus: data.skills_focus || '',
        difficulty: data.difficulty || '',
        started_at: new Date().toISOString(),
        status: 'in_progress',
        questions: [],
        answers: []
      };

      const { data: inserted, error } = await supabase.from('interviews').insert([newInterview]).select().single();
      
      if (error) {
        console.error('Error starting interview:', error.message, error.details, error.hint);
        throw error;
      }
      
      set({ currentInterview: inserted });
    } catch (error) {
      console.error('Failed to start interview:', error);
      throw error;
    } finally {
      set({ isLoading: false });
    }
  },

  updateInterview: async (id, updates) => {
    try {
      const { data, error } = await supabase.from('interviews').update(updates).eq('id', id).select().single();
        
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
      const { data: updated, error } = await supabase.from('interviews').update({
          ...data,
          status: 'completed',
          completed_at: new Date().toISOString()
        }).eq('id', id).select().single();
        
      if (error) {
        console.error('Error finishing interview:', error.message, error.details);
        throw error;
      }
      
      // Now create the interview_history record as requested
      const { data: { user } } = await supabase.auth.getUser();
      if (user) {
         await supabase.from('interview_history').insert([{
           user_id: user.id,
           company: updated.company,
           job_role: updated.job_role,
           difficulty: updated.difficulty,
           status: 'completed',
           overall_score: updated.final_score,
           transcript: updated.answers,
           feedback: updated.ai_feedback ? { raw: updated.ai_feedback } : {}
         }]);
      }

      set({ currentInterview: null });
      get().fetchHistory();
      
      try {
        const currentStats = useDashboardStore.getState().stats;
        await useDashboardStore.getState().updateStats({ 
          interviews_completed: (currentStats?.interviews_completed || 0) + 1,
          total_xp: (currentStats?.total_xp || 0) + (data.final_score || 0)
        });
        
        await useProgressStore.getState().updateProgress();
      } catch (e) {
        console.error('Failed to update stats after interview', e);
      }
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

      const { data, error } = await supabase.from('interviews').select('*').eq('user_id', user.id).order('started_at', { ascending: false });
        
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

import { create } from 'zustand';
import { supabase } from '../lib/supabase';
import { db } from '../lib/db';
import { useDashboardStore } from './dashboardStore';
import { useProgressStore } from './progressStore';

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

      const inserted = await db.collection('interview_history').insert(newInterview);
      const error = null;

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
      const data = await db.collection('interview_history').update({ id }, updates);
      const error = null;
        
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
      const updated = await db.collection('interview_history').update({ id }, {
          ...data,
          status: 'completed',
          completion_time: new Date().toISOString()
        });
      const error = null;
        
      if (error) {
        console.error('Error finishing interview:', error.message, error.details);
        throw error;
      }

      set({ currentInterview: null });
      get().fetchHistory();
      
      // Update dashboard stats
      try {
        const currentStats = useDashboardStore.getState().stats;
        await useDashboardStore.getState().updateStats({
           interviews_completed: (currentStats?.interviews_completed || 0) + 1,
           total_xp: (currentStats?.total_xp || 0) + (data.final_score || 0)
        });
        
        // Update progress
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

      const data = await db.collection('interview_history').find({ user_id: user.id }, { sort: { start_time: -1 } });
      const error = null;
        
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

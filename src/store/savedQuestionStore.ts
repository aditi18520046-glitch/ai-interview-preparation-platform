import { create } from 'zustand';
import { supabase } from '../lib/supabase';
import { useAuthStore } from './authStore';

export interface SavedQuestion {
  id?: string;
  user_id: string;
  question: string;
  question_type: string;
  company?: string;
  job_role?: string;
  difficulty?: string;
  source?: string;
  answer?: string;
  notes?: string;
  created_at?: string;
}

interface SavedQuestionState {
  questions: SavedQuestion[];
  isLoading: boolean;
  saveQuestion: (data: Partial<SavedQuestion>) => Promise<void>;
  deleteQuestion: (id: string) => Promise<void>;
  updateNotes: (id: string, notes: string) => Promise<void>;
  fetchQuestions: () => Promise<void>;
}

export const useSavedQuestionStore = create<SavedQuestionState>((set, get) => ({
  questions: [],
  isLoading: false,

  saveQuestion: async (data) => {
    const user = useAuthStore.getState().user;
    if (!user) return;
    
    set({ isLoading: true });
    try {
      const newQuestion = {
        user_id: user.id,
        question: data.question || '',
        question_type: data.question_type || 'technical',
        company: data.company || '',
        job_role: data.job_role || '',
        difficulty: data.difficulty || '',
        source: data.source || '',
        answer: data.answer || '',
        notes: data.notes || ''
      };

      const { error } = await supabase.from('saved_questions').insert([newQuestion]);
      if (error) throw error;
      
      get().fetchQuestions();
    } catch (error) {
      console.error('Error saving question:', error);
    } finally {
      set({ isLoading: false });
    }
  },

  deleteQuestion: async (id) => {
    try {
      const { error } = await supabase.from('saved_questions').delete().eq('id', id);
      if (error) throw error;
      get().fetchQuestions();
    } catch (error) {
      console.error('Error deleting question:', error);
    }
  },

  updateNotes: async (id, notes) => {
    try {
      const { error } = await supabase.from('saved_questions').update({ notes }).eq('id', id);
      if (error) throw error;
      get().fetchQuestions();
    } catch (error) {
      console.error('Error updating notes:', error);
    }
  },

  fetchQuestions: async () => {
    const user = useAuthStore.getState().user;
    if (!user) return;
    
    set({ isLoading: true });
    try {
      const { data, error } = await supabase.from('saved_questions').select('*').eq('user_id', user.id).order('created_at', { ascending: false });
        
      if (error) throw error;
      set({ questions: data || [] });
    } catch (error) {
      console.error('Error fetching saved questions:', error);
    } finally {
      set({ isLoading: false });
    }
  }
}));

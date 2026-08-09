import { create } from 'zustand';
import { supabase } from '../lib/supabase';
import { useAuthStore } from './authStore';

export interface SavedQuestion {
  id?: string;
  user_id: string;
  question_id?: string;
  question_text?: string;
  type: string;
  created_at?: string;
  [key: string]: any;
}

interface SavedQuestionState {
  savedQuestions: SavedQuestion[];
  isLoading: boolean;
  fetchSaved: () => Promise<void>;
  saveQuestion: (question: Partial<SavedQuestion>) => Promise<void>;
  removeQuestion: (id: string) => Promise<void>;
}

export const useSavedQuestionStore = create<SavedQuestionState>((set, get) => ({
  savedQuestions: [],
  isLoading: false,

  fetchSaved: async () => {
    const user = useAuthStore.getState().user;
    if (!user) return;
    set({ isLoading: true });
    try {
      const { data, error } = await supabase
        .from('saved_questions')
        .select('*')
        .eq('user_id', user.id);
      if (error) throw error;
      set({ savedQuestions: data || [] });
    } catch (error) {
      console.error('Error fetching saved questions:', error);
    } finally {
      set({ isLoading: false });
    }
  },

  saveQuestion: async (question) => {
    const user = useAuthStore.getState().user;
    if (!user) return;
    try {
      await supabase.from('saved_questions').insert([{ ...question, user_id: user.id }]);
      get().fetchSaved();
    } catch (error) {
      console.error('Error saving question:', error);
    }
  },

  removeQuestion: async (id) => {
    try {
      await supabase.from('saved_questions').delete().eq('id', id);
      get().fetchSaved();
    } catch (error) {
      console.error('Error removing question:', error);
    }
  }
}));

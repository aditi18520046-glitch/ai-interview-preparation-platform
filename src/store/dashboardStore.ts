import { create } from 'zustand';
import { supabase } from '../lib/supabase';
import { db } from '../lib/db';

export interface DashboardStats {
  id?: string;
  user_id: string;
  interviews_completed?: number;
  mock_tests_completed?: number;
  coding_questions_solved?: number;
  resume_uploaded?: number;
  total_xp?: number;
  rank?: string;
  current_streak?: number;
  [key: string]: any;
}

interface DashboardState {
  stats: DashboardStats | null;
  isLoading: boolean;
  fetchStats: () => Promise<void>;
  updateStats: (updates: Partial<DashboardStats>) => Promise<void>;
}

export const useDashboardStore = create<DashboardState>((set, get) => ({
  stats: null,
  isLoading: false,

  fetchStats: async () => {
    set({ isLoading: true });
    try {
      const { data: { user }, error: authError } = await supabase.auth.getUser();
      if (authError || !user) {
        console.warn('No authenticated user found for dashboard stats');
        set({ isLoading: false });
        return;
      }

            const session = await supabase.auth.getSession();
      const token = session.data.session?.access_token;
      
      const data = await db.collection('dashboard_stats').findOne({});
      set({ stats: data || { user_id: user.id } });
    } catch (error) {
      console.error('Error fetching dashboard stats:', error);
    } finally {
      set({ isLoading: false });
    }
  },

  updateStats: async (updates) => {
    try {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) return;

      const session = await supabase.auth.getSession();
      const token = session.data.session?.access_token;
      
      const data = await db.collection('dashboard_stats').upsert({}, updates);
      set({ stats: data });
    } catch (error) {
      console.error('Error in updateStats:', error);
    }
  }
}));

import { create } from 'zustand';
import { supabase } from '../lib/supabase';

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
      
      const res = await fetch('/api/user_overview', {
        method: 'POST',
        headers: {
           'Content-Type': 'application/json',
           'Authorization': 'Bearer ' + token
        },
        body: JSON.stringify({ userId: user.id })
      });
      const data = await res.json();
      set({ stats: data });
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
      
      const res = await fetch('/api/user_overview/update', {
        method: 'POST',
        headers: {
           'Content-Type': 'application/json',
           'Authorization': 'Bearer ' + token
        },
        body: JSON.stringify({ userId: user.id, updates })
      });
      
      if (!res.ok) {
        const errData = await res.json();
        throw new Error(errData.error || 'Failed to update stats');
      }
      const data = await res.json();

      set({ stats: data });
    } catch (error) {
      console.error('Error in updateStats:', error);
    }
  }
}));

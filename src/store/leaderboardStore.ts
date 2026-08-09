import { create } from 'zustand';
import { supabase } from '../lib/supabase';
import { useAuthStore } from './authStore';

export interface LeaderboardEntry {
  id?: string;
  user_id: string;
  total_xp?: number;
  coding_score?: number;
  interview_score?: number;
  mock_test_score?: number;
  [key: string]: any;
}

interface LeaderboardState {
  entries: LeaderboardEntry[];
  userEntry: LeaderboardEntry | null;
  isLoading: boolean;
  fetchLeaderboard: () => Promise<void>;
  updateUserScore: (updates: Partial<LeaderboardEntry>) => Promise<void>;
}

export const useLeaderboardStore = create<LeaderboardState>((set, get) => ({
  entries: [],
  userEntry: null,
  isLoading: false,

  fetchLeaderboard: async () => {
    const user = useAuthStore.getState().user;
    set({ isLoading: true });
    try {
      const { data, error } = await supabase
        .from('leaderboard')
        .select('*')
        .order('total_xp', { ascending: false })
        .limit(100);
        
      if (error) throw error;
      set({ entries: data || [] });
      if (user) {
        const myEntry = data?.find((e: any) => e.user_id === user.id) || null;
        set({ userEntry: myEntry });
      }
    } catch (error) {
      console.error('Error fetching leaderboard:', error);
    } finally {
      set({ isLoading: false });
    }
  },

  updateUserScore: async (updates) => {
    const user = useAuthStore.getState().user;
    if (!user) return;

    try {
      let { data: existing } = await supabase
        .from('leaderboard')
        .select('*')
        .eq('user_id', user.id)
        .maybeSingle();

      if (!existing) {
        const { error: insErr } = await supabase.from('leaderboard').insert([{ user_id: user.id, ...updates }]);
        if (insErr) console.warn('Could not insert leaderboard:', insErr);
      } else {
        await supabase
          .from('leaderboard')
          .update(updates)
          .eq('user_id', user.id);
      }
      get().fetchLeaderboard();
    } catch (error) {
      console.error('Error updating leaderboard:', error);
    }
  }
}));

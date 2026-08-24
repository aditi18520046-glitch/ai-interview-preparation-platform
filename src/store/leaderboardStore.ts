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
  score?: number;
  badge?: string;
  level?: string;
  // Merged profile info
  user?: string;
  college?: string;
  avatar_url?: string;
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
      const { data, error } = await supabase.from('leaderboard').select('*').order('total_xp', { ascending: false }).limit(100);
      if (error) throw error;
      
      const leaderboardData = data || [];
      
      // Fetch profiles manually because of lack of direct foreign key between leaderboard and profiles
      const userIds = leaderboardData.map(e => e.user_id);
      
      let profilesData: any[] = [];
      if (userIds.length > 0) {
          const { data: pData, error: pError } = await supabase.from('profiles').select('id, full_name, college, avatar_url').in('id', userIds);
          if (!pError && pData) {
              profilesData = pData;
          }
      }
      
      const mergedEntries = leaderboardData.map((entry) => {
         const profile = profilesData.find(p => p.id === entry.user_id);
         return {
            ...entry,
            score: entry.total_xp, // Map total_xp to score
            user: profile?.full_name || 'Anonymous',
            college: profile?.college || '',
            avatar_url: profile?.avatar_url || ''
         };
      });
      
      set({ entries: mergedEntries });
      
      if (user) {
        let myEntry = mergedEntries.find((e) => e.user_id === user.id) || null;
        if (!myEntry) {
           const newEntry = { user_id: user.id, total_xp: 0, coding_score: 0, interview_score: 0, mock_test_score: 0 };
           const { error: insErr } = await supabase.from('leaderboard').insert([newEntry]);
           if (!insErr) {
             const emptyMerged = { ...newEntry, score: 0, user: user.name || 'Anonymous', college: '', avatar_url: '' };
             mergedEntries.push(emptyMerged);
             mergedEntries.sort((a, b) => (b.total_xp || 0) - (a.total_xp || 0));
             set({ entries: mergedEntries.slice(0, 100), userEntry: emptyMerged });
           }
        } else {
           set({ userEntry: myEntry });
        }
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
      let { data: existing } = await supabase.from('leaderboard').select('*').eq('user_id', user.id).maybeSingle();
      if (!existing) {
        const { error: insErr } = await supabase.from('leaderboard').insert([{ user_id: user.id, ...updates }]);
        if (insErr) console.warn('Could not insert leaderboard:', insErr);
      } else {
        await supabase.from('leaderboard').update(updates).eq('user_id', user.id);
      }
      get().fetchLeaderboard();
    } catch (error) {
      console.error('Error updating leaderboard:', error);
    }
  }
}));

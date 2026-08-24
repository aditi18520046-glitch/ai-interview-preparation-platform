import { create } from 'zustand';
import { supabase } from '../lib/supabase';
import { useAuthStore } from './authStore';

export interface UserSettings {
  user_id?: string;
  default_interview_type?: string;
  default_interview_mode?: string;
  default_difficulty?: string;
  default_language?: string;
  ai_feedback?: boolean;
  ai_recommendations?: boolean;
  interview_reminders?: boolean;
  coding_reminders?: boolean;
  weekly_reports?: boolean;
  achievement_alerts?: boolean;
  roadmap_reminders?: boolean;
  email_notifications?: boolean;
  browser_notifications?: boolean;
  profile_visibility?: string;
  leaderboard_visibility?: boolean;
  theme?: string;
  preferred_language?: string;
}

interface SettingsState {
  settings: UserSettings | null;
  isLoading: boolean;
  fetchSettings: () => Promise<void>;
  updateSettings: (updates: Partial<UserSettings>) => Promise<void>;
}

export const useSettingsStore = create<SettingsState>((set) => ({
  settings: null,
  isLoading: false,

  fetchSettings: async () => {
    const user = useAuthStore.getState().user;
    if (!user) return;
    
    set({ isLoading: true });
    try {
      const { data, error } = await supabase.from('user_settings').select('*').eq('user_id', user.id).maybeSingle();
      
      if (!data && !error) {
        // Create defaults if not exist
        const defaults: UserSettings = {
           user_id: user.id,
           theme: 'dark',
           email_notifications: true
        };
        const { error: insErr } = await supabase.from('user_settings').insert([defaults]);
        if (!insErr) {
            set({ settings: defaults });
        }
      } else if (!error) {
        set({ settings: data });
      }
    } catch (error) {
      console.error('Error fetching settings:', error);
    } finally {
      set({ isLoading: false });
    }
  },

  updateSettings: async (updates) => {
    const user = useAuthStore.getState().user;
    if (!user) return;
    
    try {
      const { data, error } = await supabase.from('user_settings').upsert({ user_id: user.id, ...updates }, { onConflict: 'user_id' }).select().maybeSingle();
      if (error) throw error;
      set({ settings: data });
    } catch (error) {
      console.error('Error updating settings:', error);
    }
  }
}));

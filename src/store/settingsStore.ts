import { create } from 'zustand';
import { supabase } from '../lib/supabase';
import { db } from '../lib/db';
import { useAuthStore } from './authStore';

export interface UserSettings {
  id?: string;
  user_id: string;
  theme?: string;
  language?: string;
  notification_preferences?: any;
  privacy_settings?: any;
  [key: string]: any;
}

interface SettingsState {
  settings: UserSettings | null;
  isLoading: boolean;
  fetchSettings: () => Promise<void>;
  updateSettings: (updates: Partial<UserSettings>) => Promise<void>;
}

export const useSettingsStore = create<SettingsState>((set, get) => ({
  settings: null,
  isLoading: false,

  fetchSettings: async () => {
    const user = useAuthStore.getState().user;
    if (!user) return;
    set({ isLoading: true });
    try {
      let data = await db.collection('user_settings').findOne({ user_id: user.id });
      let error = null;
        
      if (error) {
         console.warn('Could not fetch settings:', error);
      }
        
      if (!data) {
        const newSettings = { user_id: user.id, theme: 'dark', language: 'en' };
        const insErr = null;
        await db.collection('user_settings').insert(newSettings);
        if (!insErr) {
          data = newSettings;
        } else {
          console.error('Failed to create initial settings:', insErr.message);
          data = newSettings;
        }
      }
      set({ settings: data });
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
      const data = await db.collection('user_settings').upsert({ user_id: user.id }, updates);
      const error = null;
      if (error) {
         console.warn('Could not update settings:', error);
      }
      if (data) {
        set({ settings: data });
      }
    } catch (error) {
      console.error('Error updating settings:', error);
    }
  }
}));

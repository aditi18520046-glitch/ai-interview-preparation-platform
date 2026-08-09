const fs = require('fs');

const dashboardStore = `import { create } from 'zustand';
import { supabase } from '../lib/supabase';
import { useAuthStore } from './authStore';

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
    const user = useAuthStore.getState().user;
    if (!user) return;
    
    set({ isLoading: true });
    try {
      let { data, error } = await supabase
        .from('dashboard_stats')
        .select('*')
        .eq('user_id', user.id)
        .maybeSingle();
        
      if (!data) {
        const { data: newData, error: insertError } = await supabase
          .from('dashboard_stats')
          .insert([{ user_id: user.id }])
          .select()
          .single();
        if (insertError) throw insertError;
        data = newData;
      }
      set({ stats: data });
    } catch (error) {
      console.error('Error fetching dashboard stats:', error);
    } finally {
      set({ isLoading: false });
    }
  },

  updateStats: async (updates) => {
    const user = useAuthStore.getState().user;
    if (!user) return;

    try {
      const { data, error } = await supabase
        .from('dashboard_stats')
        .update(updates)
        .eq('user_id', user.id)
        .select()
        .single();
        
      if (error) throw error;
      set({ stats: data });
    } catch (error) {
      console.error('Error updating dashboard stats:', error);
    }
  }
}));
`;

const leaderboardStore = `import { create } from 'zustand';
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
        await supabase.from('leaderboard').insert([{ user_id: user.id, ...updates }]);
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
`;

const notificationStore = `import { create } from 'zustand';
import { supabase } from '../lib/supabase';
import { useAuthStore } from './authStore';

export interface Notification {
  id: string;
  user_id: string;
  title: string;
  message: string;
  type: string;
  is_read: boolean;
  created_at: string;
}

interface NotificationState {
  notifications: Notification[];
  isLoading: boolean;
  fetchNotifications: () => Promise<void>;
  markAsRead: (id: string) => Promise<void>;
  deleteNotification: (id: string) => Promise<void>;
  createNotification: (title: string, message: string, type: string) => Promise<void>;
}

export const useNotificationStore = create<NotificationState>((set, get) => ({
  notifications: [],
  isLoading: false,

  fetchNotifications: async () => {
    const user = useAuthStore.getState().user;
    if (!user) return;
    set({ isLoading: true });
    try {
      const { data, error } = await supabase
        .from('notifications')
        .select('*')
        .eq('user_id', user.id)
        .order('created_at', { ascending: false });
      if (error) throw error;
      set({ notifications: data || [] });
    } catch (error) {
      console.error('Error fetching notifications:', error);
    } finally {
      set({ isLoading: false });
    }
  },

  markAsRead: async (id) => {
    try {
      await supabase.from('notifications').update({ is_read: true }).eq('id', id);
      get().fetchNotifications();
    } catch (error) {
      console.error('Error marking as read:', error);
    }
  },

  deleteNotification: async (id) => {
    try {
      await supabase.from('notifications').delete().eq('id', id);
      get().fetchNotifications();
    } catch (error) {
      console.error('Error deleting notification:', error);
    }
  },

  createNotification: async (title, message, type) => {
    const user = useAuthStore.getState().user;
    if (!user) return;
    try {
      await supabase.from('notifications').insert([{
        user_id: user.id,
        title,
        message,
        type,
        is_read: false
      }]);
      get().fetchNotifications();
    } catch (error) {
      console.error('Error creating notification:', error);
    }
  }
}));
`;

const settingsStore = `import { create } from 'zustand';
import { supabase } from '../lib/supabase';
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
      let { data, error } = await supabase
        .from('user_settings')
        .select('*')
        .eq('user_id', user.id)
        .maybeSingle();
        
      if (!data) {
        const { data: newData } = await supabase
          .from('user_settings')
          .insert([{ user_id: user.id }])
          .select()
          .single();
        data = newData;
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
      const { data, error } = await supabase
        .from('user_settings')
        .update(updates)
        .eq('user_id', user.id)
        .select()
        .single();
      if (error) throw error;
      set({ settings: data });
    } catch (error) {
      console.error('Error updating settings:', error);
    }
  }
}));
`;

const companyStore = `import { create } from 'zustand';
import { supabase } from '../lib/supabase';

interface Company {
  id: string;
  name: string;
  logo_url?: string;
  description?: string;
  [key: string]: any;
}

interface JobRole {
  id: string;
  title: string;
  department?: string;
  [key: string]: any;
}

interface CompanyRoleState {
  companies: Company[];
  roles: JobRole[];
  isLoading: boolean;
  fetchData: () => Promise<void>;
}

export const useCompanyRoleStore = create<CompanyRoleState>((set) => ({
  companies: [],
  roles: [],
  isLoading: false,

  fetchData: async () => {
    set({ isLoading: true });
    try {
      const [compRes, roleRes] = await Promise.all([
        supabase.from('companies').select('*'),
        supabase.from('job_roles').select('*')
      ]);
      set({ 
        companies: compRes.data || [], 
        roles: roleRes.data || [] 
      });
    } catch (error) {
      console.error('Error fetching companies and roles:', error);
    } finally {
      set({ isLoading: false });
    }
  }
}));
`;

const savedStore = `import { create } from 'zustand';
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
`;

fs.writeFileSync('src/store/dashboardStore.ts', dashboardStore);
fs.writeFileSync('src/store/leaderboardStore.ts', leaderboardStore);
fs.writeFileSync('src/store/notificationStore.ts', notificationStore);
fs.writeFileSync('src/store/settingsStore.ts', settingsStore);
fs.writeFileSync('src/store/companyRoleStore.ts', companyStore);
fs.writeFileSync('src/store/savedQuestionStore.ts', savedStore);


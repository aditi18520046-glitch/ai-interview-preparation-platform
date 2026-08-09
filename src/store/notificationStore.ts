import { create } from 'zustand';
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

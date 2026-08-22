import { create } from 'zustand';
import { supabase } from '../lib/supabase';
import { db } from '../lib/db';
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
      const data = await db.collection('notifications').find({ user_id: user.id }, { sort: { created_at: -1 } });
      const error = null;
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
      await db.collection('notifications').update({ id }, { is_read: true });
      get().fetchNotifications();
    } catch (error) {
      console.error('Error marking as read:', error);
    }
  },

  deleteNotification: async (id) => {
    try {
      await db.collection('notifications').delete({ id });
      get().fetchNotifications();
    } catch (error) {
      console.error('Error deleting notification:', error);
    }
  },

  createNotification: async (title, message, type) => {
    const user = useAuthStore.getState().user;
    if (!user) return;
    try {
      await db.collection('notifications').insert({
        user_id: user.id,
        title,
        message,
        type,
        is_read: false
      });
      get().fetchNotifications();
    } catch (error) {
      console.error('Error creating notification:', error);
    }
  }
}));

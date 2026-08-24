import { create } from 'zustand';
import { supabase } from '../lib/supabase';
import { useAuthStore } from './authStore';

export interface Notification {
  id: string;
  user_id: string;
  title: string;
  message: string;
  notification_type: string;
  read: boolean;
  scheduled_at?: string;
  created_at: string;
  // For backwards compatibility
  is_read?: boolean;
  type?: string;
}

interface NotificationState {
  notifications: Notification[];
  unreadCount: number;
  isLoading: boolean;
  fetchNotifications: () => Promise<void>;
  markAsRead: (id: string) => Promise<void>;
  markAllAsRead: () => Promise<void>;
  deleteNotification?: (id: string) => Promise<void>;
}

export const useNotificationStore = create<NotificationState>((set, get) => ({
  notifications: [],
  unreadCount: 0,
  isLoading: false,

  fetchNotifications: async () => {
    const user = useAuthStore.getState().user;
    if (!user) return;
    
    set({ isLoading: true });
    try {
      const { data, error } = await supabase.from('notifications').select('*').eq('user_id', user.id).order('created_at', { ascending: false });
        
      if (error) throw error;
      
      const notifs = data || [];
      const unread = notifs.filter(n => !n.read).length;
      
      set({ notifications: notifs, unreadCount: unread });
    } catch (error) {
      console.error('Error fetching notifications:', error);
    } finally {
      set({ isLoading: false });
    }
  },

  markAsRead: async (id) => {
    try {
      const { error } = await supabase.from('notifications').update({ read: true }).eq('id', id);
      if (error) throw error;
      
      const notifs = get().notifications.map(n => n.id === id ? { ...n, read: true } : n);
      set({ 
        notifications: notifs,
        unreadCount: notifs.filter(n => !n.read).length
      });
    } catch (error) {
      console.error('Error marking notification as read:', error);
    }
  },

  markAllAsRead: async () => {
    const user = useAuthStore.getState().user;
    if (!user) return;
    
    try {
      const { error } = await supabase.from('notifications').update({ read: true }).eq('user_id', user.id).eq('read', false);
      if (error) throw error;
      
      const notifs = get().notifications.map(n => ({ ...n, read: true }));
      set({ 
        notifications: notifs,
        unreadCount: 0
      });
    } catch (error) {
      console.error('Error marking all as read:', error);
    }
  }
}));

import { create } from 'zustand';
import { supabase } from '../lib/supabase';
import { useProfileStore } from './profileStore';

interface AuthState {
  user: { id: string; name: string; email: string } | null;
  isAuthenticated: boolean;
  login: (user: { id: string; name: string; email: string }) => void;
  logout: () => void;
}

export const useAuthStore = create<AuthState>((set) => ({
  user: null,
  isAuthenticated: false,
  login: (user) => set({ user, isAuthenticated: true }),
  logout: () => {
    useProfileStore.setState({ profile: null });
    set({ user: null, isAuthenticated: false });
  },
}));

// Set up auth state listener
supabase.auth.onAuthStateChange((event, session) => {
  if (session?.user) {
    useAuthStore.getState().login({
      id: session.user.id,
      name: session.user.user_metadata?.full_name || session.user.user_metadata?.name || session.user.email?.split('@')[0] || 'User',
      email: session.user.email || '',
    });
    useProfileStore.getState().fetchProfile(session.user.id);
  } else {
    useAuthStore.getState().logout();
  }
});

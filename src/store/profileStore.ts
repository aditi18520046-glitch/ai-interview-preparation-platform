import { create } from 'zustand';
import { supabase } from '../lib/supabase';

export interface ProfileData {
  id: string;
  full_name: string;
  email: string;
  phone: string;
  college: string;
  branch: string;
  year: string;
  skills: string;
  linkedin: string;
  github: string;
  portfolio: string;
  resume_url: string;
  profile_image: string;
  career_goal: string;
}

interface ProfileState {
  profile: ProfileData | null;
  isLoading: boolean;
  fetchProfile: (userId: string) => Promise<void>;
  updateProfile: (userId: string, data: Partial<ProfileData>) => Promise<void>;
  uploadProfilePicture: (userId: string, file: File) => Promise<string | null>;
}

export const useProfileStore = create<ProfileState>((set, get) => ({
  profile: null,
  isLoading: false,

  fetchProfile: async (userId: string) => {
    set({ isLoading: true });
    try {
      const { data, error } = await supabase
        .from('profiles')
        .select('*')
        .eq('id', userId)
        .maybeSingle();
        
      if (error) {
        console.error('Error fetching profile:', error.message, error.details);
      }
      

      if (data) {
        set({ profile: data });
      } else {
        // Auto-create profile on first fetch if it doesn't exist
        try {
          const { data: { session } } = await supabase.auth.getSession();
          if (session?.user && session.user.id === userId) {
            const userMeta = session.user.user_metadata || {};
            const newProfile = {
              id: userId,
              full_name: userMeta.full_name || userMeta.name || session.user.email?.split('@')[0] || 'User',
              email: session.user.email || '',
              college: userMeta.college || '',
              branch: userMeta.branch || '',
              year: userMeta.year || '',
              profile_image: null
            };
            
            const { error: insertError } = await supabase
              .from('profiles')
              .insert([newProfile]);
              
            if (!insertError) {
              set({ profile: newProfile as ProfileData });
              return; // exit early since we set it
            } else {
              console.error('Failed to create initial profile:', insertError.message);
            }
          }
        } catch (e) {
          console.error('Error in profile auto-creation:', e);
        }
        set({ profile: null });
      }

    } catch (err) {
      console.error('Failed to fetch profile:', err);
    } finally {
      set({ isLoading: false });
    }
  },

  updateProfile: async (userId: string, data: Partial<ProfileData>) => {
    try {
      const { error } = await supabase
        .from('profiles')
        .upsert({ id: userId, ...data }, { onConflict: 'id' });
        
      if (error) {
        console.error('Error updating profile:', error.message, error.details);
        throw error;
      }
      
      set((state) => ({
        profile: state.profile ? { ...state.profile, ...data } : { id: userId, ...data } as ProfileData
      }));
    } catch (error) {
      console.error('Failed to update profile:', error);
      throw error;
    }
  },

  uploadProfilePicture: async (userId: string, file: File) => {
    try {
      const fileExt = file.name.split('.').pop();
      const filePath = `${userId}-${Math.random()}.${fileExt}`;

      const { error: uploadError } = await supabase.storage
        .from('profile-images')
        .upload(filePath, file);

      if (uploadError) {
        console.error('Error uploading image:', uploadError.message);
        throw uploadError;
      }

      const { data } = supabase.storage
        .from('profile-images')
        .getPublicUrl(filePath);

      await get().updateProfile(userId, { profile_image: data.publicUrl });
      
      return data.publicUrl;
    } catch (error) {
      console.error('Failed to upload image:', error);
      throw error;
    }
  }
}));

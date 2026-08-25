import { create } from 'zustand';
import { supabase } from '../lib/supabase';

export interface ProfileData {
  id: string;
  name: string;
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
      let { data, error } = await supabase.from('profiles').select('*').eq('id', userId).maybeSingle();
        
      const userResp = await supabase.auth.getUser();
      const user = userResp.data.user;

      if (!data && !error && user) {
        // Attempt to create
        const email = user.email || '';
        const name = user.user_metadata?.full_name || '';
        const college = user.user_metadata?.college || '';
        const branch = user.user_metadata?.branch || '';
        const graduation_year = user.user_metadata?.year || '';
        
        const newProfile = {
            id: userId,
            full_name: name,
            email: email,
            college: college,
            branch: branch,
            graduation_year: graduation_year
        };
        const { error: insErr } = await supabase.from('profiles').insert([newProfile]);
        if (!insErr) {
            data = newProfile;
        } else {
            console.error('Failed to create profile:', insErr.message);
        }
      } else if (data && user) {
        // Check if profile exists but is missing metadata fields, update them
        let needsUpdate = false;
        const updates: any = {};
        
        if (!data.college && user.user_metadata?.college) {
            updates.college = user.user_metadata.college;
            needsUpdate = true;
        }
        if (!data.branch && user.user_metadata?.branch) {
            updates.branch = user.user_metadata.branch;
            needsUpdate = true;
        }
        if (!data.graduation_year && user.user_metadata?.year) {
            updates.graduation_year = user.user_metadata.year;
            needsUpdate = true;
        }
        if (!data.full_name && user.user_metadata?.full_name) {
            updates.full_name = user.user_metadata.full_name;
            needsUpdate = true;
        }
        
        if (needsUpdate) {
            const { error: updErr } = await supabase.from('profiles').update(updates).eq('id', userId);
            if (!updErr) {
                data = { ...data, ...updates };
            }
        }
      }

      if (data) {
        const mappedProfile: ProfileData = {
          id: data.id,
          name: data.full_name || '',
          email: data.email || '',
          phone: data.phone || '',
          college: data.college || '',
          branch: data.branch || '',
          year: data.graduation_year || '',
          skills: data.skills || '',
          linkedin: data.linkedin || '',
          github: data.github || '',
          portfolio: data.portfolio || '',
          resume_url: data.resume_url || '',
          profile_image: data.avatar_url || '',
          career_goal: data.career_goal || '',
        };
        set({ profile: mappedProfile });
      } else {
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
      const dbData = {
        id: userId,
        ...(data.name !== undefined && { full_name: data.name }),
        ...(data.email !== undefined && { email: data.email }),
        ...(data.phone !== undefined && { phone: data.phone }),
        ...(data.college !== undefined && { college: data.college }),
        ...(data.branch !== undefined && { branch: data.branch }),
        ...(data.year !== undefined && { graduation_year: data.year }),
        ...(data.skills !== undefined && { skills: data.skills }),
        ...(data.linkedin !== undefined && { linkedin: data.linkedin }),
        ...(data.github !== undefined && { github: data.github }),
        ...(data.portfolio !== undefined && { portfolio: data.portfolio }),
        ...(data.resume_url !== undefined && { resume_url: data.resume_url }),
        ...(data.profile_image !== undefined && { avatar_url: data.profile_image }),
        ...(data.career_goal !== undefined && { career_goal: data.career_goal }),
      };
      const { error } = await supabase.from('profiles').upsert(dbData, { onConflict: 'id' });
        
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

import { create } from 'zustand';
import { supabase } from '../lib/supabase';
import { db } from '../lib/db';
import { useAuthStore } from './authStore';
import { useDashboardStore } from './dashboardStore';

export interface ResumeAnalysis {
  id?: string;
  user_id: string;
  resume_url: string;
  ats_score: number;
  resume_score: number;
  missing_skills: string[];
  grammar_suggestions: string[];
  ai_suggestions: string[];
  upload_date?: string;
}

interface ResumeState {
  history: ResumeAnalysis[];
  currentAnalysis: ResumeAnalysis | null;
  isLoading: boolean;
  uploadResume: (file: File) => Promise<string | null>;
  saveAnalysis: (data: Partial<ResumeAnalysis>) => Promise<void>;
  fetchHistory: () => Promise<void>;
}

export const useResumeStore = create<ResumeState>((set, get) => ({
  history: [],
  currentAnalysis: null,
  isLoading: false,

  uploadResume: async (file: File) => {
    const user = useAuthStore.getState().user;
    if (!user) return null;
    
    try {
      const fileExt = file.name.split('.').pop();
      const fileName = `${user.id}-${Math.random()}.${fileExt}`;
      const filePath = `${fileName}`;

      const { error: uploadError } = await supabase.storage
        .from('resumes')
        .upload(filePath, file);

      if (uploadError) throw uploadError;

      const { data } = supabase.storage
        .from('resumes')
        .getPublicUrl(filePath);

      return data.publicUrl;
    } catch (error) {
      console.error('Error uploading resume:', error);
      return null;
    }
  },

  saveAnalysis: async (data) => {
    const user = useAuthStore.getState().user;
    if (!user) return;
    
    set({ isLoading: true });
    try {
      const newAnalysis = {
        user_id: user.id,
        resume_url: data.resume_url || '',
        ats_score: data.ats_score || 0,
        resume_score: data.resume_score || 0,
        missing_skills: data.missing_skills || [],
        grammar_suggestions: data.grammar_suggestions || [],
        ai_suggestions: data.ai_suggestions || []
      };

      const inserted = await db.collection('resume_analysis').insert(newAnalysis);
      const error = null;

      if (error) throw error;

      set({ currentAnalysis: inserted });
      get().fetchHistory();
      
      try {
        const currentStats = useDashboardStore.getState().stats;
        await useDashboardStore.getState().updateStats({
           resume_uploaded: (currentStats?.resume_uploaded || 0) + 1,
           total_xp: (currentStats?.total_xp || 0) + 10 // small XP boost for resume upload
        });
      } catch (e) {
        console.error('Failed to update stats after resume analysis', e);
      }

    } catch (error) {
      console.error('Error saving resume analysis:', error);
    } finally {
      set({ isLoading: false });
    }
  },

  fetchHistory: async () => {
    const user = useAuthStore.getState().user;
    if (!user) return;
    
    set({ isLoading: true });
    try {
      const data = await db.collection('resume_analysis').find({ user_id: user.id }, { sort: { upload_date: -1 } });
      const error = null;
        
      if (error) throw error;
      set({ history: data || [] });
      if (!get().currentAnalysis && data && data.length > 0) {
        set({ currentAnalysis: data[0] });
      }
    } catch (error) {
      console.error('Error fetching resume history:', error);
    } finally {
      set({ isLoading: false });
    }
  }
}));

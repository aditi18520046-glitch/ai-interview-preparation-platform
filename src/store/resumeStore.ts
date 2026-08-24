import { create } from 'zustand';
import { supabase } from '../lib/supabase';
import { useAuthStore } from './authStore';
import { useDashboardStore } from './dashboardStore';

export interface ResumeAnalysis {
  id?: string;
  user_id: string;
  file_url: string;
  file_name?: string;
  file_size?: number;
  ats_score?: number;
  quality_score?: number;
  company_matches?: any[];
  recommended_roles?: string[];
  skill_gaps?: string[];
  improvement_suggestions?: string[];
  grammar_feedback?: string[];
  keyword_suggestions?: string[];
  analysis_status?: string;
  created_at?: string;
  // Backwards compatibility
  resume_url?: string;
  upload_date?: string;
  resume_score?: number;
  missing_skills?: string[];
  grammar_suggestions?: string[];
  ai_suggestions?: string[];
}

interface ResumeState {
  history: ResumeAnalysis[];
  currentAnalysis: ResumeAnalysis | null;
  isLoading: boolean;
  uploadResume: (file: File) => Promise<{ fileUrl: string, fileName: string, fileSize: number } | null>;
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

      return {
        fileUrl: data.publicUrl,
        fileName: file.name,
        fileSize: file.size
      };
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
      const newAnalysis: ResumeAnalysis = {
        user_id: user.id,
        file_url: data.file_url || '',
        file_name: data.file_name || '',
        file_size: data.file_size || 0,
        ats_score: data.ats_score || 0,
        quality_score: data.quality_score || 0,
        company_matches: data.company_matches || [],
        recommended_roles: data.recommended_roles || [],
        skill_gaps: data.skill_gaps || [],
        improvement_suggestions: data.improvement_suggestions || [],
        grammar_feedback: data.grammar_feedback || [],
        keyword_suggestions: data.keyword_suggestions || [],
        analysis_status: data.analysis_status || 'completed'
      };

      const { data: inserted, error } = await supabase.from('resume_analysis').insert([newAnalysis]).select().single();
      
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
      const { data, error } = await supabase.from('resume_analysis').select('*').eq('user_id', user.id).order('created_at', { ascending: false });
        
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

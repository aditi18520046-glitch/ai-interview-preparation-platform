import { create } from 'zustand';
import { supabase } from '../lib/supabase';
import { db } from '../lib/db';

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
        db.collection('companies').find({}),
        db.collection('job_roles').find({})
      ]);
      set({ 
        companies: (compRes as any) || [], 
        roles: (roleRes as any) || [] 
      });
    } catch (error) {
      console.error('Error fetching companies and roles:', error);
    } finally {
      set({ isLoading: false });
    }
  }
}));

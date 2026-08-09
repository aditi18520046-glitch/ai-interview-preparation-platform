import { create } from 'zustand';
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

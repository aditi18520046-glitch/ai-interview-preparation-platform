import React, { useState } from 'react';
import DashboardLayout from '../components/layout/DashboardLayout';
import CRHero from '../components/companies_roles/CRHero';
import CRGlobalSearch from '../components/companies_roles/CRGlobalSearch';
import CRFilters from '../components/companies_roles/CRFilters';
import CRFeaturedCompanies from '../components/companies_roles/CRFeaturedCompanies';
import CRAllCompanies from '../components/companies_roles/CRAllCompanies';
import CRRoles from '../components/companies_roles/CRRoles';
import CRCompanyDrawer from '../components/companies_roles/CRCompanyDrawer';
import CRRoleDrawer from '../components/companies_roles/CRRoleDrawer';
import CRFooter from '../components/companies_roles/CRFooter';
import CRTopNav from '../components/companies_roles/CRTopNav';

export default function CompaniesRoles() {
  const [activeTab, setActiveTab] = useState<'companies' | 'roles'>('companies');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCompany, setSelectedCompany] = useState<any | null>(null);
  const [selectedRole, setSelectedRole] = useState<any | null>(null);

  return (
    <div className="min-h-screen bg-slate-950 text-slate-50 font-sans flex flex-col">
      {/* Top Nav for this independent page */}
      <CRTopNav activeTab={activeTab} onTabChange={setActiveTab} />
      
      <main className="flex-1 flex flex-col">
        <CRHero onTabChange={(tab) => {
          setActiveTab(tab);
          window.scrollTo({ top: 600, behavior: 'smooth' });
        }} />
        
        <div className="max-w-[1440px] mx-auto w-full px-4 md:px-6 lg:px-8 py-8 space-y-12">
          <CRGlobalSearch value={searchQuery} onChange={setSearchQuery} />
          
          <div className="flex flex-col lg:flex-row gap-8">
            {/* Filters */}
            <div className="w-full lg:w-72 flex-shrink-0">
              <CRFilters />
            </div>
            
            {/* Main Content Area */}
            <div className="flex-1 min-w-0 space-y-16">
              {activeTab === 'companies' ? (
                <>
                  <CRFeaturedCompanies onSelectCompany={setSelectedCompany} />
                  <CRAllCompanies searchQuery={searchQuery} onSelectCompany={setSelectedCompany} />
                </>
              ) : (
                <CRRoles searchQuery={searchQuery} onSelectRole={setSelectedRole} />
              )}
            </div>
          </div>
        </div>
      </main>

      <CRFooter />

      {/* Drawers */}
      <CRCompanyDrawer 
        company={selectedCompany} 
        isOpen={!!selectedCompany} 
        onClose={() => setSelectedCompany(null)} 
      />
      <CRRoleDrawer 
        role={selectedRole} 
        isOpen={!!selectedRole} 
        onClose={() => setSelectedRole(null)} 
      />
    </div>
  );
}

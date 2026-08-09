const fs = require('fs');

let content = fs.readFileSync('src/pages/MockInterview.tsx', 'utf8');
content = content.replace(
  "export default function MockInterview() {",
  `import { useCompanyRoleStore } from '../store/companyRoleStore';
import { useEffect } from 'react';

export default function MockInterview() {
  const { companies, roles, fetchData } = useCompanyRoleStore();
  useEffect(() => { fetchData(); }, [fetchData]);
  const mappedCompanies = companies.map(c => c.name) || COMPANIES;
  const mappedRoles = roles.map(r => r.title) || ROLES;
  `
);
content = content.replace("options={COMPANIES}", "options={mappedCompanies.length ? mappedCompanies : COMPANIES}");
content = content.replace("options={ROLES}", "options={mappedRoles.length ? mappedRoles : ROLES}");

fs.writeFileSync('src/pages/MockInterview.tsx', content);


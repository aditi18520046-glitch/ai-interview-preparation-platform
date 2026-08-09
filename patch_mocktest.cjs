const fs = require('fs');

let content = fs.readFileSync('src/pages/MockTest.tsx', 'utf8');
content = content.replace(
  "export default function MockTest() {",
  `import { useCompanyRoleStore } from '../store/companyRoleStore';
import { useEffect } from 'react';

export default function MockTest() {
  const { companies, fetchData } = useCompanyRoleStore();
  useEffect(() => { fetchData(); }, [fetchData]);
  
  const mappedTechCompanies = companies.length ? companies.map(c => ({
    name: c.name,
    color: "from-slate-500 to-slate-400",
    questions: 100,
    diff: "Medium",
    tag: c.description?.substring(0,10) || "General"
  })) : COMPANIES.Technology;
  `
);
content = content.replace("const filteredTechCompanies = COMPANIES.Technology.", "const filteredTechCompanies = mappedTechCompanies.");
content = content.replace("[...COMPANIES.Technology", "[...mappedTechCompanies");

fs.writeFileSync('src/pages/MockTest.tsx', content);

const fs = require('fs');
let content = fs.readFileSync('src/components/companies_roles/CRHero.tsx', 'utf-8');

content = content.replace(
  /<button className="w-full sm:w-auto px-8 py-3\.5 rounded-xl bg-gradient-to-r from-indigo-600 to-purple-600 text-white font-bold text-\[15px\] shadow-lg shadow-indigo-500\/25 hover:-translate-y-0\.5 hover:shadow-indigo-500\/40 transition-all flex items-center justify-center gap-2">/,
  "<button onClick={() => onTabChange && onTabChange('companies')} className=\"w-full sm:w-auto px-8 py-3.5 rounded-xl bg-gradient-to-r from-indigo-600 to-purple-600 text-white font-bold text-[15px] shadow-lg shadow-indigo-500/25 hover:-translate-y-0.5 hover:shadow-indigo-500/40 transition-all flex items-center justify-center gap-2\">"
);

fs.writeFileSync('src/components/companies_roles/CRHero.tsx', content);

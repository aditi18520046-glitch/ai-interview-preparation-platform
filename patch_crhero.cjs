const fs = require('fs');
let content = fs.readFileSync('src/components/companies_roles/CRHero.tsx', 'utf-8');

content = content.replace(
  /export default function CRHero\(\) \{/,
  "interface CRHeroProps {\n  onTabChange?: (tab: 'companies' | 'roles') => void;\n}\n\nexport default function CRHero({ onTabChange }: CRHeroProps) {"
);

content = content.replace(
  /<button className="w-full sm:w-auto px-8 py\.5 rounded-xl bg-gradient-to-r from-indigo-600 to-purple-600 text-white font-bold text-\[15px\] shadow-lg shadow-indigo-500\/25 hover:-translate-y-0\.5 hover:shadow-indigo-500\/40 transition-all flex items-center justify-center gap-2">/,
  "<button onClick={() => onTabChange && onTabChange('companies')} className=\"w-full sm:w-auto px-8 py-3.5 rounded-xl bg-gradient-to-r from-indigo-600 to-purple-600 text-white font-bold text-[15px] shadow-lg shadow-indigo-500/25 hover:-translate-y-0.5 hover:shadow-indigo-500/40 transition-all flex items-center justify-center gap-2\">"
);

content = content.replace(
  /<button className="w-full sm:w-auto px-8 py-3\.5 rounded-xl bg-white\/5 text-white font-bold text-\[15px\] border border-white\/10 hover:bg-white\/10 transition-all flex items-center justify-center gap-2">/,
  "<button onClick={() => onTabChange && onTabChange('roles')} className=\"w-full sm:w-auto px-8 py-3.5 rounded-xl bg-white/5 text-white font-bold text-[15px] border border-white/10 hover:bg-white/10 transition-all flex items-center justify-center gap-2\">"
);

fs.writeFileSync('src/components/companies_roles/CRHero.tsx', content);

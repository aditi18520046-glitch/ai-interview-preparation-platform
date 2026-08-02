const fs = require('fs');
let content = fs.readFileSync('src/pages/CompaniesRoles.tsx', 'utf-8');

content = content.replace(
  /<CRHero \/>/,
  `<CRHero onTabChange={(tab) => {
          setActiveTab(tab);
          window.scrollTo({ top: 600, behavior: 'smooth' });
        }} />`
);

fs.writeFileSync('src/pages/CompaniesRoles.tsx', content);

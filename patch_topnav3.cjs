const fs = require('fs');
let content = fs.readFileSync('src/components/dashboard/TopNav.tsx', 'utf-8');

content = content.replace(
  /<\/div>\s*<\/div>\s*<\/div>\s*<div className="flex items-center gap-3 sm:gap-5 ml-auto">/,
  `</div>
      </div>

      <div className="flex items-center gap-3 sm:gap-5 ml-auto">`
);

fs.writeFileSync('src/components/dashboard/TopNav.tsx', content);

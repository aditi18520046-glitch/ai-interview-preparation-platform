const fs = require('fs');
let content = fs.readFileSync('src/components/dashboard/TopNav.tsx', 'utf-8');

content = content.replace(
  /<\/div>\s*\}\)\s*<\/div>\s*<div className="hidden md:flex items-center gap-1 bg-slate-800\/50 rounded px-1\.5 py-0\.5 ml-3 border border-white\/5 shrink-0">/,
  `</div>
        )}
        
        <div className="hidden md:flex items-center gap-1 bg-slate-800/50 rounded px-1.5 py-0.5 ml-3 border border-white/5 shrink-0">`
);

fs.writeFileSync('src/components/dashboard/TopNav.tsx', content);

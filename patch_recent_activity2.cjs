const fs = require('fs');
let content = fs.readFileSync('src/pages/MockTest.tsx', 'utf8');

// Replace flex overflow-x-auto with grid
content = content.replace(
  '<div className="flex gap-4 overflow-x-auto pb-4 scrollbar-hide">',
  '<div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 pb-4">'
);

// Replace shrink-0 w-72 with w-full
content = content.replace(/className="shrink-0 w-72/g, 'className="w-full');

fs.writeFileSync('src/pages/MockTest.tsx', content);

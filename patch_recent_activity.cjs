const fs = require('fs');
let content = fs.readFileSync('src/pages/MockTest.tsx', 'utf8');

content = content.replace(
  '<div className="flex gap-4 overflow-x-auto pb-4 scrollbar-hide">',
  '<div className="flex flex-wrap gap-4 pb-4">'
);
// Also change the w-72 to w-full sm:w-auto or flex-1 maybe. 
// Actually w-72 on flex-wrap is fine, or we can use grid.
content = content.replace(
  '<div className="flex flex-wrap gap-4 pb-4">\\n                         <div className="shrink-0 w-72',
  '<div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 pb-4">\\n                         <div className="w-full'
);
// Let's just use string replacement carefully.

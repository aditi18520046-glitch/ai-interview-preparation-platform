const fs = require('fs');
let content = fs.readFileSync('src/store/resumeStore.ts', 'utf8');
content = content.replace(
  'set({ history: data || [] });',
  'set({ history: data || [] });\n      if (!get().currentAnalysis && data && data.length > 0) {\n        set({ currentAnalysis: data[0] });\n      }'
);
fs.writeFileSync('src/store/resumeStore.ts', content);

import fs from 'fs';
const path = './src/store/dashboardStore.ts';
let code = fs.readFileSync(path, 'utf8');
code = code.replace(/const data = await res\.json\(\);\s*\}\s*set\(\{ stats: data \}\);/, `const data = await res.json();
      set({ stats: data });`);
fs.writeFileSync(path, code);

import fs from 'fs';
let code = fs.readFileSync('src/components/dashboard/Recommendations.tsx', 'utf8');
code = code.replace(`!hasData ? (`, `true ? (`);
fs.writeFileSync('src/components/dashboard/Recommendations.tsx', code);

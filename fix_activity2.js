import fs from 'fs';
let code = fs.readFileSync('src/components/dashboard/Activity.tsx', 'utf8');
code = code.replace(`{!hasData ? (`, `{!hasData || activities.length === 0 ? (`);
fs.writeFileSync('src/components/dashboard/Activity.tsx', code);

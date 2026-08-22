import fs from 'fs';
let code = fs.readFileSync('src/components/dashboard/Reminders.tsx', 'utf8');
code = code.replace(`!hasData ? (`, `true ? (`);
fs.writeFileSync('src/components/dashboard/Reminders.tsx', code);

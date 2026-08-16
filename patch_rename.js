import fs from 'fs';
let code = fs.readFileSync('./server.ts', 'utf8');
code = code.replace(/\/api\/dashboard/g, '/api/user_overview');
fs.writeFileSync('./server.ts', code);

let code2 = fs.readFileSync('./src/store/dashboardStore.ts', 'utf8');
code2 = code2.replace(/\/api\/dashboard/g, '/api/user_overview');
fs.writeFileSync('./src/store/dashboardStore.ts', code2);

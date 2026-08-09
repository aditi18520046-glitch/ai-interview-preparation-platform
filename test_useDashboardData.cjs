const fs = require('fs');
const content = fs.readFileSync('src/hooks/useDashboardData.ts', 'utf8');
console.log(content);

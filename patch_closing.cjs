const fs = require('fs');
let content = fs.readFileSync('src/pages/MockTest.tsx', 'utf8');

content = content.replace('<DashboardFooter />', '</div>\n            <DashboardFooter />');
fs.writeFileSync('src/pages/MockTest.tsx', content);

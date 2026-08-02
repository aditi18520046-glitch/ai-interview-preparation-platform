const fs = require('fs');
let content = fs.readFileSync('src/App.tsx', 'utf8');

content = content.replace("import MockTest from './pages/MockTest';", "import MockTest from './pages/MockTest';\nimport CodingPractice from './pages/CodingPractice';");
content = content.replace("<Route path=\"/dashboard/test\" element={<MockTest />} />", "<Route path=\"/dashboard/test\" element={<MockTest />} />\n        <Route path=\"/dashboard/coding\" element={<CodingPractice />} />");

fs.writeFileSync('src/App.tsx', content);

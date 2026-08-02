const fs = require('fs');
let content = fs.readFileSync('src/pages/MockTest.tsx', 'utf8');

const startTag = '{/* 4. AI Recommendation (One large card) */}';
const endTag = '{/* 5. Featured Mock Tests */}';

const startIndex = content.indexOf(startTag);
const endIndex = content.indexOf(endTag);

if (startIndex !== -1 && endIndex !== -1) {
  content = content.substring(0, startIndex) + content.substring(endIndex);
  fs.writeFileSync('src/pages/MockTest.tsx', content);
  console.log("Removed AI Recommendation.");
} else {
  console.log("Could not find tags.");
}

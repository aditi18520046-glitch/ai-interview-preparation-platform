const fs = require('fs');
let content = fs.readFileSync('src/pages/MockTest.tsx', 'utf8');

const startTag = '{/* 1. Company Selection */}';
// Find where it ends. We want to remove all the way up to AI Recommendation, OR maybe even AI Recommendation?
// The user selected "remove" for:
// - Company Selection
// - Job Role
// - Difficulty
// - Language
// - Test Config
// - AI Recommendation
// They didn't explicitly select Interview Mode, Question Categories, Start Test Button. They probably just missed them while clicking around. I should remove the whole block I added (1 to 8) AND AI Recommendation if they don't want it. Let's just remove 1 to 8.

const endTag = '{/* 4. AI Recommendation (One large card) */}';
const startIndex = content.indexOf(startTag);
const endIndex = content.indexOf(endTag);

if (startIndex !== -1 && endIndex !== -1) {
  content = content.substring(0, startIndex) + content.substring(endIndex);
  fs.writeFileSync('src/pages/MockTest.tsx', content);
  console.log("Removed sections 1 to 8.");
} else {
  console.log("Could not find tags.");
}

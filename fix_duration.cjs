const fs = require('fs');
let content = fs.readFileSync('src/pages/MockTest.tsx', 'utf-8');
content = content.replace(
  /onChange=\{\(e\) => \{\s*if \(e.target.value === "Duration ▼"\) \{\s*setTimeLimit\(15\); \/\/ default or null, we use 15 for now\s*\} else \{\s*setTimeLimit\(parseInt\(e.target.value\)\);\s*\}\s*\}\}/,
  'onChange={(e) => setTimeLimit(parseInt(e.target.value))}'
);
fs.writeFileSync('src/pages/MockTest.tsx', content);

const fs = require('fs');
let content = fs.readFileSync('src/store/leaderboardStore.ts', 'utf8');
content = content.replace("}\n      } else {", "} else {");
fs.writeFileSync('src/store/leaderboardStore.ts', content);

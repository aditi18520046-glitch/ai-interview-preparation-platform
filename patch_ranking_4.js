import fs from 'fs';
const path = './src/components/leaderboard/RankingTable.tsx';
let code = fs.readFileSync(path, 'utf8');

code = code.replace(/if \(!hasActivity\) \{[\s\S]*?\}    return \(/, 'return (');
code = code.replace(/\s*\(\s*<div className="flex flex-col">/, '\n        <div className="flex flex-col">');
code = code.replace(/\s*\}\)\s*<\/div>\s*<\/div>\s*\)\}\s*<\/div>\s*\);\s*\}/, '\n        </div>\n      </div>\n    </div>\n  );\n}');

fs.writeFileSync(path, code);

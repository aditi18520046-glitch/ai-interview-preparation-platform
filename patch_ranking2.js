import fs from 'fs';
const path = './src/components/leaderboard/RankingTable.tsx';
let code = fs.readFileSync(path, 'utf8');

code = code.replace(/hasActivity\?: boolean;/, '');
code = code.replace(/, hasActivity /g, ' ');

// Remove hasActivity conditions
code = code.replace(/if \(!hasActivity\) \{[\s\S]*?return \([\s\S]*?Skill Champions[\s\S]*?\}    return \(/, 'return (');
code = code.replace(/\{!hasActivity \? \([\s\S]*?\) : \(/, '(');
code = code.replace(/\s*\}\s*\)\}\s*<\/div>\s*<\/div>\s*\)\}/, '        }\n      </div>\n    </div>\n    )');

fs.writeFileSync(path, code);

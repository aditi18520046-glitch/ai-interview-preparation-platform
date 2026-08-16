import fs from 'fs';
const path = './src/components/leaderboard/RankingTable.tsx';
let code = fs.readFileSync(path, 'utf8');

code = code.replace(/if \(\!hasActivity\) \{[\s\S]*?\}    return \(/, 'return (');

fs.writeFileSync(path, code);

import fs from 'fs';
let code = fs.readFileSync('src/components/leaderboard/RankingTable.tsx', 'utf8');

const regex = /const skillChampions = \[[\s\S]*?\];\n/m;
code = code.replace(regex, '');

const regex2 = /if \(category === 'skills'\) \{[\s\S]*?return \([\s\S]*?\}\n/m;
code = code.replace(regex2, '');

fs.writeFileSync('src/components/leaderboard/RankingTable.tsx', code);

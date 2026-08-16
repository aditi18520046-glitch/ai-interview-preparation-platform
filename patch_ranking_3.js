import fs from 'fs';
const path = './src/components/leaderboard/RankingTable.tsx';
let code = fs.readFileSync(path, 'utf8');

code = code.replace(/\/\/ Dummy data for generic tables[\s\S]*?\];/g, '');

fs.writeFileSync(path, code);

import fs from 'fs';
let code = fs.readFileSync('src/components/leaderboard/LeaderboardTabs.tsx', 'utf8');
code = code.replace(/\{\s*id:\s*'skills'[^}]+\},/g, '');
fs.writeFileSync('src/components/leaderboard/LeaderboardTabs.tsx', code);

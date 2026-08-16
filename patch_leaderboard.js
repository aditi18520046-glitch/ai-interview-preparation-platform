import fs from 'fs';
const path = './src/pages/Leaderboard.tsx';
let code = fs.readFileSync(path, 'utf8');

// Remove the Development Toggle block
code = code.replace(/<div className="flex justify-end mb-4">[\s\S]*?<\/div>/, '');

// Remove the hasActivity state
code = code.replace(/const \[hasActivity, setHasActivity\] = useState\(false\);/, '');

// Replace hasActivity={hasActivity} with hasActivity={true} or just remove if we handle it inside components
code = code.replace(/hasActivity=\{hasActivity\}/g, '');

fs.writeFileSync(path, code);

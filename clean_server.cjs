const fs = require('fs');

let serverCode = fs.readFileSync('server.ts', 'utf8');

// Remove the imports
serverCode = serverCode.replace(/import \{ MongoClient, ServerApiVersion \} from 'mongodb';\nimport crypto from 'crypto';\n/, '');

// Remove the setup and route
const setupStart = serverCode.indexOf('// MongoDB Setup');
const setupEnd = serverCode.indexOf("app.get('/api/leaderboard', async (req, res) => {");

if (setupStart !== -1 && setupEnd !== -1) {
    serverCode = serverCode.substring(0, setupStart) + serverCode.substring(setupEnd);
}

// Remove the leaderboard route since we now fetch directly via Supabase in the frontend
const routeEnd = serverCode.indexOf("  // Proxy for dashboard_stats to bypass adblockers");
if (routeEnd !== -1 && setupEnd !== -1) {
    serverCode = serverCode.substring(0, setupEnd) + serverCode.substring(routeEnd);
}


fs.writeFileSync('server.ts', serverCode);
console.log('Cleaned server.ts');

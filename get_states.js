const fs = require('fs');
const content = fs.readFileSync('src/components/roadmap/RoadmapGenerator.tsx', 'utf8');
const states = content.match(/const \[.*?\] = useState/g);
console.log(states);

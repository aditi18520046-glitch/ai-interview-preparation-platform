const fs = require('fs');
let content = fs.readFileSync('src/pages/MockTest.tsx', 'utf8');

content = content.replace(
  /} from 'lucide-react';/,
  ', Monitor, Mic, Video, MessageSquare, Compass, Calendar\n} from \'lucide-react\';'
);

fs.writeFileSync('src/pages/MockTest.tsx', content);

const fs = require('fs');

function removeDuplicateUseEffect(filepath) {
  let content = fs.readFileSync(filepath, 'utf8');
  content = content.replace("import { useEffect } from 'react';\n\nexport default function ", "export default function ");
  fs.writeFileSync(filepath, content);
}

removeDuplicateUseEffect('src/components/roadmap/RoadmapGenerator.tsx');
removeDuplicateUseEffect('src/pages/MockInterview.tsx');
removeDuplicateUseEffect('src/pages/MockTest.tsx');
removeDuplicateUseEffect('src/pages/Leaderboard.tsx');
removeDuplicateUseEffect('src/pages/Notifications.tsx');
removeDuplicateUseEffect('src/pages/SavedQuestions.tsx');
removeDuplicateUseEffect('src/pages/Settings.tsx');


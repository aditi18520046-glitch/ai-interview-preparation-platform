const fs = require('fs');

function addUseEffect(filepath) {
  let content = fs.readFileSync(filepath, 'utf8');
  // if not imported, add it to the React import line
  if (!content.includes('useEffect')) {
    content = content.replace("import React, { useState } from 'react';", "import React, { useState, useEffect } from 'react';");
    content = content.replace("import React from 'react';", "import React, { useEffect } from 'react';");
  } else {
    // If it was missing from the import statement
    if (!content.match(/import .*useEffect.* from 'react'/)) {
      content = content.replace("import React, { useState } from 'react';", "import React, { useState, useEffect } from 'react';");
    }
  }
  fs.writeFileSync(filepath, content);
}

addUseEffect('src/pages/Leaderboard.tsx');
addUseEffect('src/pages/Notifications.tsx');
addUseEffect('src/pages/SavedQuestions.tsx');


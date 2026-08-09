const fs = require('fs');
const content = fs.readFileSync('src/pages/Progress.tsx', 'utf8');

const updatedContent = content.replace(
  "import React, { useState } from 'react';",
  "import React, { useState, useEffect } from 'react';\nimport { useProgressStore } from '../store/progressStore';"
).replace(
  'export default function Progress() {',
  `export default function Progress() {
  const { progress, fetchProgress, updateProgress } = useProgressStore();
  
  useEffect(() => {
    fetchProgress();
    // In a real app we might not want to update blindly on load, but we do it to simulate auto-update
    updateProgress();
  }, [fetchProgress, updateProgress]);
`
);

fs.writeFileSync('src/pages/Progress.tsx', updatedContent);

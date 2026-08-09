const fs = require('fs');

// LearningRoadmap.tsx
let lrContent = fs.readFileSync('src/pages/LearningRoadmap.tsx', 'utf8');
lrContent = lrContent.replace(
  'const [hasRoadmap, setHasRoadmap] = useState(false);',
  'const [hasRoadmap, setHasRoadmap] = useState(false);\n  useEffect(() => { if (currentRoadmap) setHasRoadmap(true); }, [currentRoadmap]);'
);
fs.writeFileSync('src/pages/LearningRoadmap.tsx', lrContent);

// ResumeAnalyzer.tsx
let raContent = fs.readFileSync('src/pages/ResumeAnalyzer.tsx', 'utf8');
raContent = raContent.replace(
  'const [hasResults, setHasResults] = useState(false);',
  'const [hasResults, setHasResults] = useState(false);\n  useEffect(() => { if (currentAnalysis) setHasResults(true); }, [currentAnalysis]);'
);
fs.writeFileSync('src/pages/ResumeAnalyzer.tsx', raContent);

// Progress.tsx
let prContent = fs.readFileSync('src/pages/Progress.tsx', 'utf8');
prContent = prContent.replace(
  'const [hasActivity, setHasActivity] = useState(false);',
  'const [hasActivity, setHasActivity] = useState(false);\n  useEffect(() => { if (progress) setHasActivity(true); }, [progress]);'
);
fs.writeFileSync('src/pages/Progress.tsx', prContent);

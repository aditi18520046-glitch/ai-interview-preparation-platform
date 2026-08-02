const fs = require('fs');
let content = fs.readFileSync('src/pages/CodingPractice.tsx', 'utf8');

// Add imports
if (!content.includes('CodingPatterns')) {
  content = content.replace(
    "import CodingFilterBar from '../components/coding_practice/CodingFilterBar';",
    "import CodingFilterBar from '../components/coding_practice/CodingFilterBar';\nimport CodingPatterns from '../components/coding_practice/CodingPatterns';\nimport CodingTopCompanyQuestions from '../components/coding_practice/CodingTopCompanyQuestions';"
  );
}

// Insert sections
if (!content.includes('<CodingPatterns />')) {
  content = content.replace(
    "<CodingProblemList onSolve={(id) => setActiveProblem(id)} />",
    "<CodingPatterns />\n              <CodingTopCompanyQuestions onSolve={(id) => setActiveProblem(id)} />\n              <CodingProblemList onSolve={(id) => setActiveProblem(id)} />"
  );
}

fs.writeFileSync('src/pages/CodingPractice.tsx', content);

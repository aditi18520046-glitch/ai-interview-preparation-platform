const fs = require('fs');
let content = fs.readFileSync('src/pages/MockInterview.tsx', 'utf8');

// Add imports
if (!content.includes('MockInterviewWorkspace')) {
  content = content.replace(
    "import DashboardLayout from '../components/layout/DashboardLayout';",
    "import DashboardLayout from '../components/layout/DashboardLayout';\nimport MockInterviewWorkspace from '../components/interview/MockInterviewWorkspace';"
  );
}

// Add state
if (!content.includes('const [isStarted, setIsStarted] = useState(false);')) {
  content = content.replace(
    "export default function MockInterview() {",
    "export default function MockInterview() {\n  const [isStarted, setIsStarted] = useState(false);"
  );
}

// Add onClick to Start button
content = content.replace(
  "<button \n                     disabled={!isFormComplete}",
  "<button \n                     disabled={!isFormComplete}\n                    onClick={() => setIsStarted(true)}"
);

// Conditionally render workspace vs config
content = content.replace(
  "return (\n    <DashboardLayout>\n      <div className=\"space-y-12 pb-12\">",
  `if (isStarted) {
    return (
      <DashboardLayout>
        <MockInterviewWorkspace onEnd={() => setIsStarted(false)} />
      </DashboardLayout>
    );
  }

  return (
    <DashboardLayout>
      <div className="space-y-12 pb-12">`
);

fs.writeFileSync('src/pages/MockInterview.tsx', content);

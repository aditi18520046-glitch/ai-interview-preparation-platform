const fs = require('fs');
const content = fs.readFileSync('src/pages/ResumeAnalyzer.tsx', 'utf8');

const updatedContent = content.replace(
  'export default function ResumeAnalyzer() {',
  'export default function ResumeAnalyzer() {\n  const { uploadResume, saveAnalysis, fetchHistory } = useResumeStore();\n  useEffect(() => { fetchHistory(); }, [fetchHistory]);'
).replace(
  'const handleAnalyze = () => {',
  'const handleAnalyze = async () => {'
).replace(
  /setTimeout\(\(\) => \{[\s\S]*?\}, 5500\); \/\/ Wait long enough for all messages to show/,
  `const url = await uploadResume(file);
    if (url) {
      await saveAnalysis({
        resume_url: url,
        ats_score: 85,
        resume_score: 92,
        missing_skills: ['AWS', 'Docker'],
        grammar_suggestions: ['Change "did" to "achieved"'],
        ai_suggestions: ['Quantify your achievements']
      });
    }
    
    setIsAnalyzing(false);
    setHasResults(true);`
);

fs.writeFileSync('src/pages/ResumeAnalyzer.tsx', updatedContent);

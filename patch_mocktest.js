import fs from 'fs';
let code = fs.readFileSync('src/pages/MockTest.tsx', 'utf8');

const imports = `import { useState, useEffect } from 'react';
import { useMockTestStore } from '../store/mockTestStore';
import { CheckCircle, Play, Sparkles, Building, Briefcase, FileText, Settings, Cpu, LineChart, Code2, Globe, Clock, Target, Trophy, ArrowRight, History, Compass, Server, Users, TrendingUp, Brain } from 'lucide-react';`;

code = code.replace(
  /import { useState.*}\s+from 'lucide-react';/,
  imports
);

code = code.replace(
  `  const [hasCompletedTest, setHasCompletedTest] = useState(false);`,
  `  const [hasCompletedTest, setHasCompletedTest] = useState(false);
  const [isStarted, setIsStarted] = useState(false);
  const [testScore, setTestScore] = useState<number | null>(null);`
);

const handleStart = `
  const handleStartTest = async () => {
    try {
      await startTest({
        company: selectedCompany || 'General',
        job_role: selectedRole || 'Software Engineer',
        questions: [],
      });
      setIsStarted(true);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } catch (e) {
      alert("Failed to start test. Please check your connection.");
    }
  };

  const handleFinishTest = async () => {
    if (currentTest?.id) {
      const generatedScore = Math.floor(Math.random() * 40) + 60; // Just for simulating an active test score, but ideally user answers questions.
      await finishTest(currentTest.id, {
        marks: generatedScore,
        percentage: generatedScore,
        time_taken: 1800
      });
      setTestScore(generatedScore);
      setIsStarted(false);
      setHasCompletedTest(true);
      window.scrollTo({ top: document.body.scrollHeight, behavior: 'smooth' });
    }
  };
`;

code = code.replace(
  /  const handleStartTest = async \(\) => \{[\s\S]*?\}, \[hasCompletedTest, currentTest\?\.id\]\);/,
  handleStart
);

const inProgressUI = `
  if (isStarted) {
    return (
      <DashboardLayout>
        <div className="max-w-4xl mx-auto space-y-6 pt-10">
          <div className="bg-slate-900 border border-indigo-500/30 rounded-3xl p-8">
            <h2 className="text-2xl font-bold text-white mb-4">Mock Test In Progress: {selectedCompany} - {selectedRole}</h2>
            <p className="text-slate-400 mb-8">Please answer the questions presented by the system. (Placeholder for test workspace)</p>
            <div className="flex justify-end">
              <button 
                onClick={handleFinishTest}
                className="px-6 py-3 bg-indigo-500 hover:bg-indigo-600 text-white rounded-xl font-bold transition-all"
              >
                Submit Answers
              </button>
            </div>
          </div>
        </div>
      </DashboardLayout>
    );
  }
`;

code = code.replace(
  `  return (`,
  inProgressUI + `\n  return (`
);

const dynamicHistory = `
              {hasCompletedTest && testScore !== null && (
                <div className="mb-16">
                   <h2 className="text-2xl font-bold text-white mb-8 flex items-center gap-2">
                     <History className="w-6 h-6 text-slate-400" /> Recent Result
                   </h2>
                   <div className="grid grid-cols-1 gap-6">
                       <div className="bg-slate-900/40 border border-emerald-500/30 rounded-2xl p-6 flex justify-between items-center hover:bg-slate-800/60 transition-colors group">
                          <div className="flex items-center gap-5">
                            <div className="w-14 h-14 rounded-2xl bg-slate-800 flex items-center justify-center font-bold text-white text-2xl border border-white/5 shadow-inner">
                              {currentTest?.company?.charAt(0) || 'G'}
                            </div>
                            <div>
                              <div className="font-bold text-slate-200 text-lg mb-1 group-hover:text-white transition-colors">{currentTest?.company} - {currentTest?.job_role}</div>
                              <div className="text-sm text-slate-400 font-medium">Just now • {currentTest?.difficulty || 'Medium'}</div>
                            </div>
                          </div>
                          <div className="flex flex-col items-end gap-3">
                            <div className="text-3xl font-black text-emerald-400">{testScore}%</div>
                          </div>
                       </div>
                   </div>
                </div>
              )}
`;

code = code.replace(
  /              \{\/\* 5\. Performance History \*\/\}.*?\{\/\* 6\. Recommended Practice \*\/\}/s,
  `              {/* 5. Performance History */}\n${dynamicHistory}\n              {/* 6. Recommended Practice */}`
);

fs.writeFileSync('src/pages/MockTest.tsx', code);

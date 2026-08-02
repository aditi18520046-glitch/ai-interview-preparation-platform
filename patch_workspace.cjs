const fs = require('fs');
let content = fs.readFileSync('src/components/coding/CodingWorkspace.tsx', 'utf8');

const updatedHandleRun = `
  const handleRun = () => {
    setIsRunning(true);
    setTimeout(() => {
      setOutput('Running test cases...\\n\\nTest Case 1: Passed\\nInput: [2,7,11,15], 9\\nOutput: [0,1]\\nExpected: [0,1]\\n\\nTest Case 2: Passed\\nInput: [3,2,4], 6\\nOutput: [1,2]\\nExpected: [1,2]\\n\\nAll test cases passed!\\nRuntime: 52 ms\\nMemory Usage: 42.1 MB');
      setIsRunning(false);
    }, 1500);
  };

  const handleSubmit = () => {
    setIsRunning(true);
    setTimeout(() => {
      setOutput('Submission Successful!\\n\\nGenerating AI Review...\\n\\nAI Code Review:\\n✅ Correctness Score: 100/100\\n✨ Code Quality Score: 92/100\\n⏱️ Time Complexity: O(n) - Optimal using Hash Map\\n💾 Space Complexity: O(n) - Hash Map storage\\n\\nSuggestions: Consider using a Map object instead of a plain object for slightly better performance in V8.\\n\\nEdge Cases Handled: Empty array, negative numbers.\\nAlternative Solutions: Brute force O(n^2), Two-pass Hash Map O(n).\\n\\nInterview Tip: Always mention the time/space trade-off when explaining this solution to your interviewer!');
      setIsRunning(false);
      setActiveTab('submissions');
    }, 2000);
  };
`;

content = content.replace(/const handleRun = \(\) => {[\s\S]*?}, 1500\);\n  };/, updatedHandleRun);

const submitButtonRegex = /<button \n              className="flex items-center gap-2 px-6 py-2.5 rounded-xl text-sm font-bold bg-gradient-to-r from-indigo-500 to-purple-600 text-white hover:from-indigo-600 hover:to-purple-700 transition-all shadow-lg shadow-indigo-500\/25 hover:-translate-y-0.5"\n            >\n              <Send className="w-4 h-4" \/> Submit\n            <\/button>/;

content = content.replace(submitButtonRegex, `<button 
              onClick={handleSubmit}
              disabled={isRunning}
              className="flex items-center gap-2 px-6 py-2.5 rounded-xl text-sm font-bold bg-gradient-to-r from-indigo-500 to-purple-600 text-white hover:from-indigo-600 hover:to-purple-700 transition-all shadow-lg shadow-indigo-500/25 hover:-translate-y-0.5"
            >
              <Send className="w-4 h-4" /> Submit
            </button>`);

content = content.replace(/\{activeTab === 'submissions' && \([\s\S]*?No previous submissions found\.<\/p>\n             <\/div>\n          \)}/, `{activeTab === 'submissions' && (
             <div className="space-y-6">
               <h2 className="text-xl font-bold text-white mb-4">Submission History</h2>
               {output.includes('Submission Successful') ? (
                 <div className="p-5 rounded-2xl bg-emerald-500/10 border border-emerald-500/20 text-emerald-300">
                   <div className="flex items-center gap-2 mb-3 font-bold text-lg text-emerald-400">
                     <CheckCircle2 className="w-6 h-6" /> Accepted
                   </div>
                   <div className="whitespace-pre-wrap font-mono text-sm leading-relaxed text-slate-300">
                     {output.split('AI Code Review:\\n')[1]}
                   </div>
                 </div>
               ) : (
                 <div className="flex flex-col items-center justify-center py-20 text-slate-400">
                   <p className="font-medium">No previous submissions found.</p>
                 </div>
               )}
             </div>
          )}`);

// Need to import CheckCircle2
content = content.replace("import { Play, Send, RotateCcw, Settings, Maximize2, ChevronLeft, Lock } from 'lucide-react';", "import { Play, Send, RotateCcw, Settings, Maximize2, ChevronLeft, Lock, CheckCircle2 } from 'lucide-react';");

fs.writeFileSync('src/components/coding/CodingWorkspace.tsx', content);

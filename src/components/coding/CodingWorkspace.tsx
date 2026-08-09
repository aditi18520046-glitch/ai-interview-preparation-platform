import React, { useState } from 'react';
import { Play, Send, RotateCcw, Settings, Maximize2, ChevronLeft, Lock, CheckCircle2 } from 'lucide-react';
import { useCodingStore } from '../../store/codingStore';

export default function CodingWorkspace({ onBack }: { onBack: () => void }) {
  const { submitCode } = useCodingStore();
  const [activeTab, setActiveTab] = useState('problem');
  const [code, setCode] = useState('function twoSum(nums, target) {\n  // Write your code here\n  \n}');
  const [output, setOutput] = useState('');
  const [isRunning, setIsRunning] = useState(false);
  
  const handleRun = () => {
    setIsRunning(true);
    setTimeout(() => {
      setOutput('Running test cases...\n\nTest Case 1: Passed\nInput: [2,7,11,15], 9\nOutput: [0,1]\nExpected: [0,1]\n\nTest Case 2: Passed\nInput: [3,2,4], 6\nOutput: [1,2]\nExpected: [1,2]\n\nAll test cases passed!\nRuntime: 52 ms\nMemory Usage: 42.1 MB');
      setIsRunning(false);
    }, 1500);
  };

  const handleSubmit = async () => {
    setIsRunning(true);
    
    await submitCode({
      programming_language: 'JavaScript',
      company: 'General',
      question: 'Two Sum',
      submitted_code: code,
      runtime: 52,
      memory: 42.1,
      passed_test_cases: 2,
      failed_test_cases: 0,
      score: 100
    });

    setTimeout(() => {
      setOutput('Submission Successful!\n\nGenerating AI Review...\n\nAI Code Review:\n✅ Correctness Score: 100/100\n✨ Code Quality Score: 92/100\n⏱️ Time Complexity: O(n) - Optimal using Hash Map\n💾 Space Complexity: O(n) - Hash Map storage\n\nSuggestions: Consider using a Map object instead of a plain object for slightly better performance in V8.\n\nEdge Cases Handled: Empty array, negative numbers.\nAlternative Solutions: Brute force O(n^2), Two-pass Hash Map O(n).\n\nInterview Tip: Always mention the time/space trade-off when explaining this solution to your interviewer!');
      setIsRunning(false);
      setActiveTab('submissions');
    }, 2000);
  };


  return (
    <div className="h-[calc(100vh-140px)] flex flex-col lg:flex-row gap-6">
      {/* Left Panel */}
      <div className="w-full lg:w-1/2 flex flex-col bg-slate-900/40 backdrop-blur-md border border-white/5 rounded-[24px] overflow-hidden shadow-lg h-full">
        <div className="flex items-center gap-2 px-4 py-3 border-b border-white/5 bg-slate-800/80">
           <button onClick={onBack} className="p-2 hover:bg-white/5 rounded-lg text-slate-400 hover:text-white transition-colors mr-2">
             <ChevronLeft className="w-5 h-5" />
           </button>
           <div className="flex gap-2">
             {['problem', 'solution', 'submissions'].map(tab => (
               <button 
                 key={tab}
                 onClick={() => setActiveTab(tab)}
                 className={`px-4 py-1.5 rounded-lg text-sm font-medium capitalize transition-all ${activeTab === tab ? 'bg-indigo-500/10 text-indigo-400' : 'text-slate-400 hover:text-slate-200 hover:bg-white/5'}`}
               >
                 {tab}
               </button>
             ))}
           </div>
        </div>
        <div className="flex-1 p-6 overflow-y-auto scrollbar-hide text-slate-300 space-y-6">
          {activeTab === 'problem' && (
            <>
              <div>
                <h1 className="text-2xl font-bold text-white mb-3">1. Two Sum</h1>
                <div className="flex flex-wrap gap-2">
                  <span className="px-2.5 py-1 bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 rounded-lg text-xs font-semibold">Easy</span>
                  <span className="px-2.5 py-1 bg-white/5 text-slate-300 border border-white/10 rounded-lg text-xs font-semibold">Google</span>
                  <span className="px-2.5 py-1 bg-white/5 text-slate-300 border border-white/10 rounded-lg text-xs font-semibold">Amazon</span>
                </div>
              </div>
              <p className="leading-relaxed text-[15px]">
                Given an array of integers <code className="bg-white/10 px-1.5 py-0.5 rounded text-indigo-300 text-sm font-mono border border-white/10">nums</code> and an integer <code className="bg-white/10 px-1.5 py-0.5 rounded text-indigo-300 text-sm font-mono border border-white/10">target</code>, return <em>indices of the two numbers such that they add up to <code className="bg-white/10 px-1.5 py-0.5 rounded text-indigo-300 text-sm font-mono border border-white/10">target</code></em>.
              </p>
              <p className="leading-relaxed text-[15px]">
                You may assume that each input would have <strong><em>exactly</em> one solution</strong>, and you may not use the same element twice.
              </p>
              
              <div className="space-y-4">
                <h3 className="font-bold text-white text-lg">Example 1:</h3>
                <div className="bg-slate-950 p-4 rounded-xl border border-white/5 font-mono text-sm leading-relaxed shadow-inner">
                  <span className="text-slate-500">Input:</span> nums = [2,7,11,15], target = 9<br/>
                  <span className="text-slate-500">Output:</span> [0,1]<br/>
                  <span className="text-slate-500">Explanation:</span> Because nums[0] + nums[1] == 9, we return [0, 1].
                </div>
              </div>
              
              <div className="space-y-4">
                <h3 className="font-bold text-white text-lg">Constraints:</h3>
                <ul className="list-disc pl-5 space-y-2 text-sm font-mono text-slate-400">
                  <li>2 &lt;= nums.length &lt;= 10<sup>4</sup></li>
                  <li>-10<sup>9</sup> &lt;= nums[i] &lt;= 10<sup>9</sup></li>
                  <li>-10<sup>9</sup> &lt;= target &lt;= 10<sup>9</sup></li>
                </ul>
              </div>
            </>
          )}
          {activeTab === 'solution' && (
             <div className="flex flex-col items-center justify-center h-full text-slate-400 space-y-4 py-20">
               <div className="w-16 h-16 rounded-2xl bg-indigo-500/10 flex items-center justify-center border border-indigo-500/20">
                 <Lock className="w-8 h-8 text-indigo-400" />
               </div>
               <p className="font-medium text-center max-w-sm">Unlock premium to see the AI explanation and optimal solutions.</p>
             </div>
          )}
          {activeTab === 'submissions' && (
             <div className="space-y-6">
               <h2 className="text-xl font-bold text-white mb-4">Submission History</h2>
               {output.includes('Submission Successful') ? (
                 <div className="p-5 rounded-2xl bg-emerald-500/10 border border-emerald-500/20 text-emerald-300">
                   <div className="flex items-center gap-2 mb-3 font-bold text-lg text-emerald-400">
                     <CheckCircle2 className="w-6 h-6" /> Accepted
                   </div>
                   <div className="whitespace-pre-wrap font-mono text-sm leading-relaxed text-slate-300">
                     {output.split('AI Code Review:\n')[1]}
                   </div>
                 </div>
               ) : (
                 <div className="flex flex-col items-center justify-center py-20 text-slate-400">
                   <p className="font-medium">No previous submissions found.</p>
                 </div>
               )}
             </div>
          )}
        </div>
      </div>

      {/* Right Panel */}
      <div className="w-full lg:w-1/2 flex flex-col bg-slate-900/40 backdrop-blur-md border border-white/5 rounded-[24px] overflow-hidden shadow-lg h-full">
        {/* Editor Toolbar */}
        <div className="flex items-center justify-between px-4 py-3 border-b border-white/5 bg-slate-800/80">
          <select className="bg-slate-900 border border-white/10 rounded-lg px-3 py-1.5 text-sm text-slate-300 outline-none focus:border-indigo-500 font-medium">
            <option>JavaScript</option>
            <option>Python</option>
            <option>Java</option>
            <option>C++</option>
          </select>
          <div className="flex items-center gap-2 text-slate-400">
            <button className="p-2 hover:bg-white/5 rounded-lg transition-colors" title="Settings"><Settings className="w-4 h-4" /></button>
            <button className="p-2 hover:bg-white/5 rounded-lg transition-colors" title="Fullscreen"><Maximize2 className="w-4 h-4" /></button>
          </div>
        </div>
        
        {/* Code Editor */}
        <div className="flex-1 relative font-mono text-[15px] bg-slate-950 p-4 leading-relaxed flex">
          <div className="text-slate-600 text-right pr-4 select-none border-r border-white/10 mr-4 space-y-1">
            {code.split('\n').map((_, i) => (
              <div key={i}>{i + 1}</div>
            ))}
          </div>
          <textarea 
            value={code}
            onChange={(e) => setCode(e.target.value)}
            className="flex-1 bg-transparent text-indigo-300 outline-none resize-none space-y-1"
            spellCheck="false"
          />
        </div>

        {/* Console / Output */}
        <div className="h-48 bg-slate-900/80 border-t border-white/5 flex flex-col">
          <div className="flex items-center px-4 py-2.5 border-b border-white/5 bg-slate-800/50">
             <span className="text-xs font-bold text-slate-400 uppercase tracking-wider">Console Output</span>
          </div>
          <div className="flex-1 p-4 overflow-y-auto font-mono text-sm">
            {isRunning ? (
              <div className="flex items-center gap-2 text-slate-400">
                <div className="w-4 h-4 border-2 border-indigo-500 border-t-transparent rounded-full animate-spin"></div>
                Running code...
              </div>
            ) : output ? (
              <pre className="text-emerald-400 leading-relaxed">{output}</pre>
            ) : (
              <span className="text-slate-600 italic">Click 'Run' to compile and execute your code.</span>
            )}
          </div>
        </div>

        {/* Action Bar */}
        <div className="flex items-center justify-between px-5 py-4 border-t border-white/5 bg-slate-800/80">
          <button className="flex items-center gap-2 px-3 py-2 text-sm font-medium text-slate-400 hover:text-white hover:bg-white/5 rounded-lg transition-colors">
            <RotateCcw className="w-4 h-4" /> Reset
          </button>
          <div className="flex gap-3">
            <button 
              onClick={handleRun}
              disabled={isRunning}
              className="flex items-center gap-2 px-6 py-2.5 rounded-xl text-sm font-bold bg-slate-700 text-white hover:bg-slate-600 transition-colors shadow-lg"
            >
              <Play className="w-4 h-4" /> Run Code
            </button>
            <button 
              onClick={handleSubmit}
              disabled={isRunning}
              className="flex items-center gap-2 px-6 py-2.5 rounded-xl text-sm font-bold bg-gradient-to-r from-indigo-500 to-purple-600 text-white hover:from-indigo-600 hover:to-purple-700 transition-all shadow-lg shadow-indigo-500/25 hover:-translate-y-0.5"
            >
              <Send className="w-4 h-4" /> Submit
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

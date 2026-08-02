const fs = require('fs');
let content = fs.readFileSync('src/pages/MockTest.tsx', 'utf8');

const startTag2 = '<div className="grid grid-cols-1 lg:grid-cols-3 gap-8">\n                {/* 6. Continue Learning */}';
const endTag2 = '{/* 8. Why Choose AI Mock Tests? */}';

const section2 = `
              {/* Conditional Performance Dashboard */}
              <div>
                {hasCompletedTest ? (
                  <div className="space-y-12">
                    {/* 9. Mock Test Performance */}
                    <div>
                       <h2 className="text-2xl font-bold text-white flex items-center gap-2 mb-8">
                         <Trophy className="w-6 h-6 text-yellow-400" />
                         Mock Test Performance
                       </h2>
                       <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
                         <div className="bg-slate-900/40 rounded-2xl p-6 border border-white/5 shadow-sm">
                           <div className="text-slate-400 text-sm mb-2 font-medium">Overall Score</div>
                           <div className="text-4xl font-extrabold text-white">87%</div>
                         </div>
                         <div className="bg-slate-900/40 rounded-2xl p-6 border border-white/5 shadow-sm">
                           <div className="text-slate-400 text-sm mb-2 font-medium">Accuracy</div>
                           <div className="text-4xl font-extrabold text-emerald-400">92%</div>
                         </div>
                         <div className="bg-slate-900/40 rounded-2xl p-6 border border-white/5 shadow-sm">
                           <div className="text-slate-400 text-sm mb-2 font-medium">Time Taken</div>
                           <div className="text-4xl font-extrabold text-blue-400">42m</div>
                         </div>
                         <div className="bg-slate-900/40 rounded-2xl p-6 border border-white/5 shadow-sm">
                           <div className="text-slate-400 text-sm mb-2 font-medium">Percentile Rank</div>
                           <div className="text-4xl font-extrabold text-purple-400">94th</div>
                         </div>
                       </div>
                       
                       <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-8">
                         <div className="lg:col-span-2 bg-slate-900/40 rounded-3xl p-8 border border-white/5 shadow-sm">
                           <h3 className="text-lg font-bold text-white mb-6">Question Analysis</h3>
                           <div className="flex flex-wrap gap-8 mb-8">
                              <div>
                                 <div className="text-sm text-slate-400 mb-1 font-medium">Correct</div>
                                 <div className="text-2xl font-bold text-emerald-400">35</div>
                              </div>
                              <div>
                                 <div className="text-sm text-slate-400 mb-1 font-medium">Wrong</div>
                                 <div className="text-2xl font-bold text-red-400">3</div>
                              </div>
                              <div>
                                 <div className="text-sm text-slate-400 mb-1 font-medium">Skipped</div>
                                 <div className="text-2xl font-bold text-slate-400">2</div>
                              </div>
                              <div>
                                 <div className="text-sm text-slate-400 mb-1 font-medium">Avg Time/Q</div>
                                 <div className="text-2xl font-bold text-blue-400">1m 5s</div>
                              </div>
                           </div>
                           
                           {/* Fake Graph */}
                           <div className="h-40 flex items-end gap-2">
                             {[40, 60, 45, 80, 90, 75, 100, 85, 95, 87].map((h, i) => (
                               <div key={i} className="flex-1 bg-indigo-500/20 hover:bg-indigo-500/40 rounded-t-md transition-colors" style={{ height: \`\${h}%\` }}></div>
                             ))}
                           </div>
                         </div>
                         <div className="bg-slate-900/40 rounded-3xl p-8 border border-white/5 shadow-sm flex flex-col">
                           <h3 className="text-lg font-bold text-white mb-6">Topic Performance</h3>
                           <div className="space-y-6 flex-1">
                              <div>
                                <div className="flex justify-between text-sm font-bold mb-2"><span className="text-emerald-400">Strong:</span> <span className="text-slate-300">Arrays & Hashing</span></div>
                                <div className="h-2.5 bg-slate-800 rounded-full"><div className="h-full bg-emerald-500 rounded-full" style={{ width: '95%' }}></div></div>
                              </div>
                              <div>
                                <div className="flex justify-between text-sm font-bold mb-2"><span className="text-emerald-400">Strong:</span> <span className="text-slate-300">System Design</span></div>
                                <div className="h-2.5 bg-slate-800 rounded-full"><div className="h-full bg-emerald-500 rounded-full" style={{ width: '88%' }}></div></div>
                              </div>
                              <div>
                                <div className="flex justify-between text-sm font-bold mb-2"><span className="text-red-400">Weak:</span> <span className="text-slate-300">Dynamic Programming</span></div>
                                <div className="h-2.5 bg-slate-800 rounded-full"><div className="h-full bg-red-500 rounded-full" style={{ width: '45%' }}></div></div>
                              </div>
                           </div>
                         </div>
                       </div>
                       
                       {/* AI Feedback */}
                       <div className="bg-indigo-900/20 border border-indigo-500/20 rounded-3xl p-8 shadow-sm">
                          <h3 className="text-lg font-bold text-white flex items-center gap-2 mb-4">
                            <BrainCircuit className="w-6 h-6 text-indigo-400" />
                            AI Feedback & Suggestions
                          </h3>
                          <p className="text-slate-300 leading-relaxed mb-6">
                            Great job on the <strong className="text-white">{selectedCompany || 'Google'}</strong> <strong className="text-white">{selectedRole || 'Software Engineer'}</strong> mock test! Your problem-solving speed is in the top 10% of candidates. However, you struggled with Dynamic Programming edge cases (Q14, Q22). We recommend reviewing DP state transitions and space optimization before taking the next test.
                          </p>
                          <div className="flex flex-wrap gap-4">
                            <button className="px-6 py-3 bg-indigo-500 hover:bg-indigo-600 text-white rounded-xl font-bold flex items-center gap-2 transition-colors">
                               <RefreshCcw className="w-5 h-5" /> Retake Test
                            </button>
                            <button className="px-6 py-3 bg-slate-800 hover:bg-slate-700 text-white rounded-xl font-bold flex items-center gap-2 transition-colors border border-white/5">
                               <Download className="w-5 h-5" /> Download Report
                            </button>
                          </div>
                       </div>
                    </div>

                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                      {/* 10. Performance History */}
                      <div>
                         <h2 className="text-xl font-bold text-white mb-6">Performance History</h2>
                         <div className="space-y-4">
                           {[
                             { co: 'Amazon', role: 'SDE II', score: '82%', date: '2 days ago', diff: 'Hard', acc: '85%', dur: '45m' },
                             { co: 'Microsoft', role: 'Backend', score: '91%', date: '5 days ago', diff: 'Medium', acc: '94%', dur: '30m' }
                           ].map((hist, i) => (
                             <div key={i} className="bg-slate-900/40 border border-white/5 rounded-2xl p-5 flex justify-between items-center hover:bg-slate-800 transition-colors cursor-pointer">
                                <div>
                                  <div className="font-bold text-slate-200 text-lg mb-1">{hist.co} - {hist.role}</div>
                                  <div className="text-xs text-slate-400 font-medium">{hist.date} • {hist.diff} • {hist.dur} • Acc: {hist.acc}</div>
                                </div>
                                <div className="text-2xl font-black text-emerald-400">{hist.score}</div>
                             </div>
                           ))}
                         </div>
                      </div>

                      {/* 11. Recommended Practice */}
                      <div>
                         <h2 className="text-xl font-bold text-white mb-6">Recommended Practice</h2>
                         <div className="space-y-4">
                           <div className="bg-slate-900/40 border border-white/5 rounded-2xl p-5 flex items-center gap-5 hover:bg-slate-800 transition-colors cursor-pointer group">
                              <div className="w-12 h-12 rounded-xl bg-red-500/10 flex items-center justify-center shrink-0 group-hover:scale-105 transition-transform">
                                <Code className="w-6 h-6 text-red-400" />
                              </div>
                              <div>
                                <div className="font-bold text-slate-200 group-hover:text-white transition-colors text-lg mb-1">1D Dynamic Programming</div>
                                <div className="text-xs text-slate-400 font-medium">15 targeted questions to improve weak area</div>
                              </div>
                           </div>
                           <div className="bg-slate-900/40 border border-white/5 rounded-2xl p-5 flex items-center gap-5 hover:bg-slate-800 transition-colors cursor-pointer group">
                              <div className="w-12 h-12 rounded-xl bg-blue-500/10 flex items-center justify-center shrink-0 group-hover:scale-105 transition-transform">
                                <Play className="w-6 h-6 text-blue-400" />
                              </div>
                              <div>
                                <div className="font-bold text-slate-200 group-hover:text-white transition-colors text-lg mb-1">System Design: Rate Limiter</div>
                                <div className="text-xs text-slate-400 font-medium">Video Walkthrough • 24 mins</div>
                              </div>
                           </div>
                         </div>
                      </div>
                    </div>

                    {/* 12. Recent Activity */}
                    <div>
                       <h2 className="text-xl font-bold text-white mb-6">Recent Activity</h2>
                       <div className="flex gap-4 overflow-x-auto pb-4 scrollbar-hide">
                         <div className="shrink-0 w-72 bg-slate-900/40 border border-white/5 rounded-2xl p-5 flex items-start gap-4 hover:bg-slate-800 transition-colors cursor-pointer">
                            <CheckCircle className="w-6 h-6 text-emerald-400 shrink-0 mt-0.5" />
                            <div>
                              <div className="font-bold text-slate-200 mb-1">Completed Google Mock Test</div>
                              <div className="text-sm text-emerald-400 font-bold">Scored 87%</div>
                            </div>
                         </div>
                         <div className="shrink-0 w-72 bg-slate-900/40 border border-white/5 rounded-2xl p-5 flex items-start gap-4 hover:bg-slate-800 transition-colors cursor-pointer">
                            <CheckCircle className="w-6 h-6 text-emerald-400 shrink-0 mt-0.5" />
                            <div>
                              <div className="font-bold text-slate-200 mb-1">Completed Amazon HR Round</div>
                              <div className="text-sm text-emerald-400 font-bold">Feedback: Excellent</div>
                            </div>
                         </div>
                         <div className="shrink-0 w-72 bg-slate-900/40 border border-white/5 rounded-2xl p-5 flex items-start gap-4 hover:bg-slate-800 transition-colors cursor-pointer">
                            <CheckCircle className="w-6 h-6 text-emerald-400 shrink-0 mt-0.5" />
                            <div>
                              <div className="font-bold text-slate-200 mb-1">Completed Java Assessment</div>
                              <div className="text-sm text-emerald-400 font-bold">Passed with 92%</div>
                            </div>
                         </div>
                       </div>
                    </div>
                  </div>
                ) : (
                  /* 13. Empty State */
                  <div className="flex flex-col items-center justify-center py-24 text-center bg-slate-900/20 border border-white/5 rounded-3xl">
                     <div className="w-24 h-24 rounded-full bg-slate-900/50 flex items-center justify-center border border-white/5 mb-8 shadow-inner">
                        <BarChart className="w-10 h-10 text-slate-600" />
                     </div>
                     <h2 className="text-2xl sm:text-3xl font-bold text-white mb-4">No mock tests completed yet.</h2>
                     <p className="text-slate-400 max-w-lg mb-10 text-lg">Take your first AI-powered mock test to generate your performance dashboard, personalized insights, and recommendations.</p>
                     <button onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })} className="px-8 py-4 bg-white/5 hover:bg-white/10 text-white rounded-xl font-bold border border-white/10 transition-all hover:scale-105">
                        Start Your First Mock Test
                     </button>
                  </div>
                )}
              </div>

              {/* 8. Why Choose AI Mock Tests? */}
`;

// It replaces everything from `<div className="grid grid-cols-1 lg:grid-cols-3 gap-8">`
// up to `{/* 8. Why Choose AI Mock Tests? */}`

let idx1 = content.indexOf(startTag2);
if (idx1 === -1) {
  // Try another approach for start tag
  idx1 = content.indexOf('{/* 6. Continue Learning */}');
  // Need to find the parent div
  idx1 = content.lastIndexOf('<div className="grid grid-cols-1 lg:grid-cols-3 gap-8">', idx1);
}

const idx2 = content.indexOf(endTag2);

if (idx1 !== -1 && idx2 !== -1) {
  content = content.substring(0, idx1) + section2 + content.substring(idx2 + endTag2.length);
  fs.writeFileSync('src/pages/MockTest.tsx', content);
  console.log("Replaced successfully!");
} else {
  console.log("Could not find tags", idx1, idx2);
}

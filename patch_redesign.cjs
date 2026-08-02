const fs = require('fs');
let content = fs.readFileSync('src/pages/MockTest.tsx', 'utf8');

const startTag = '{/* 5. Featured Mock Tests */}';
const endTag = '<DashboardFooter />';

const startIndex = content.indexOf(startTag);
const endIndex = content.indexOf(endTag);

if (startIndex !== -1 && endIndex !== -1) {
  const newSection = `
              {/* 1. AI Mock Test Overview */}
              <div className="bg-slate-900/40 border border-white/5 rounded-[24px] p-6 lg:p-10 mb-12 backdrop-blur-xl shadow-lg mt-8">
                <h2 className="text-2xl font-bold text-white mb-8 flex items-center gap-3">
                  <Monitor className="w-6 h-6 text-indigo-400" />
                  AI Mock Test Overview
                </h2>
                
                <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-10">
                  <div className="bg-slate-800/40 p-5 rounded-2xl border border-white/5">
                    <div className="text-slate-400 text-sm mb-1">Company</div>
                    <div className="text-white font-semibold">{selectedCompany || 'Not selected'}</div>
                  </div>
                  <div className="bg-slate-800/40 p-5 rounded-2xl border border-white/5">
                    <div className="text-slate-400 text-sm mb-1">Job Role</div>
                    <div className="text-white font-semibold">{selectedRole || 'Not selected'}</div>
                  </div>
                  <div className="bg-slate-800/40 p-5 rounded-2xl border border-white/5">
                    <div className="text-slate-400 text-sm mb-1">Mode</div>
                    <div className="text-white font-semibold">{selectedMode || 'Video (Default)'}</div>
                  </div>
                  <div className="bg-slate-800/40 p-5 rounded-2xl border border-white/5">
                    <div className="text-slate-400 text-sm mb-1">Difficulty</div>
                    <div className="text-white font-semibold">{selectedDifficulty || 'Not selected'}</div>
                  </div>
                  <div className="bg-slate-800/40 p-5 rounded-2xl border border-white/5">
                    <div className="text-slate-400 text-sm mb-1">Type</div>
                    <div className="text-white font-semibold">{selectedCategory || 'Technical'}</div>
                  </div>
                  <div className="bg-slate-800/40 p-5 rounded-2xl border border-white/5">
                    <div className="text-slate-400 text-sm mb-1">Questions</div>
                    <div className="text-white font-semibold">{numQuestions}</div>
                  </div>
                  <div className="bg-slate-800/40 p-5 rounded-2xl border border-white/5">
                    <div className="text-slate-400 text-sm mb-1">Duration</div>
                    <div className="text-white font-semibold">{timeLimit} mins</div>
                  </div>
                  <div className="bg-slate-800/40 p-5 rounded-2xl border border-white/5">
                    <div className="text-slate-400 text-sm mb-1">Language</div>
                    <div className="text-white font-semibold">{selectedLanguage || 'Not selected'}</div>
                  </div>
                </div>

                <div className="flex justify-center">
                  <button 
                    disabled={!selectedCompany || !selectedRole || !selectedDifficulty}
                    onClick={() => {
                        setHasCompletedTest(true);
                        window.scrollTo({ top: document.body.scrollHeight, behavior: 'smooth' });
                    }} 
                    className="px-12 py-5 bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-500 hover:to-purple-500 disabled:from-slate-800 disabled:to-slate-900 disabled:text-slate-500 disabled:border disabled:border-white/5 text-white rounded-2xl font-bold text-lg shadow-xl shadow-indigo-500/25 transition-all flex items-center gap-3 cursor-pointer disabled:cursor-not-allowed"
                  >
                    🚀 Start AI Mock Test
                  </button>
                </div>
              </div>

              {/* 2. Mock Test Guidelines */}
              <div className="mb-12">
                <h2 className="text-2xl font-bold text-white mb-6">Mock Test Guidelines</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                  <div className="bg-slate-900/40 border border-white/5 rounded-[24px] p-6 hover:bg-slate-800/60 transition-colors">
                     <div className="w-12 h-12 rounded-xl bg-blue-500/10 flex items-center justify-center mb-5">
                       <FileText className="w-6 h-6 text-blue-400" />
                     </div>
                     <h3 className="font-bold text-white mb-3 text-lg">Test Instructions</h3>
                     <ul className="text-sm text-slate-400 space-y-2 list-disc pl-4">
                       <li>Read every question carefully.</li>
                       <li>Complete within the selected time.</li>
                       <li>AI evaluates accuracy and confidence.</li>
                     </ul>
                  </div>
                  <div className="bg-slate-900/40 border border-white/5 rounded-[24px] p-6 hover:bg-slate-800/60 transition-colors">
                     <div className="w-12 h-12 rounded-xl bg-purple-500/10 flex items-center justify-center mb-5">
                       <Mic className="w-6 h-6 text-purple-400" />
                     </div>
                     <h3 className="font-bold text-white mb-3 text-lg">Voice Mode</h3>
                     <ul className="text-sm text-slate-400 space-y-2 list-disc pl-4">
                       <li>Speak clearly.</li>
                       <li>Minimize background noise.</li>
                       <li>Avoid long pauses.</li>
                     </ul>
                  </div>
                  <div className="bg-slate-900/40 border border-white/5 rounded-[24px] p-6 hover:bg-slate-800/60 transition-colors">
                     <div className="w-12 h-12 rounded-xl bg-pink-500/10 flex items-center justify-center mb-5">
                       <Video className="w-6 h-6 text-pink-400" />
                     </div>
                     <h3 className="font-bold text-white mb-3 text-lg">Video Mode</h3>
                     <ul className="text-sm text-slate-400 space-y-2 list-disc pl-4">
                       <li>Maintain eye contact.</li>
                       <li>Ensure proper lighting.</li>
                       <li>Frame yourself well.</li>
                     </ul>
                  </div>
                  <div className="bg-slate-900/40 border border-white/5 rounded-[24px] p-6 hover:bg-slate-800/60 transition-colors">
                     <div className="w-12 h-12 rounded-xl bg-emerald-500/10 flex items-center justify-center mb-5">
                       <Code className="w-6 h-6 text-emerald-400" />
                     </div>
                     <h3 className="font-bold text-white mb-3 text-lg">Coding Test</h3>
                     <ul className="text-sm text-slate-400 space-y-2 list-disc pl-4">
                       <li>Write optimized code.</li>
                       <li>Use efficient algorithms.</li>
                       <li>Test for edge cases.</li>
                     </ul>
                  </div>
                </div>
              </div>

              {/* 3. AI Features */}
              <div className="mb-16">
                <h2 className="text-2xl font-bold text-white mb-6">AI Powered Features</h2>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                  {[
                    { icon: Zap, label: "Instant Feedback", color: "text-yellow-400" },
                    { icon: Mic, label: "Voice Analysis", color: "text-blue-400" },
                    { icon: MessageSquare, label: "Communication Score", color: "text-emerald-400" },
                    { icon: Code, label: "Coding Analysis", color: "text-pink-400" },
                    { icon: Flame, label: "Adaptive Difficulty", color: "text-orange-400" },
                    { icon: Target, label: "Performance Tracking", color: "text-cyan-400" },
                    { icon: Compass, label: "Personalized Recs", color: "text-indigo-400" },
                    { icon: BarChart, label: "Progress Analytics", color: "text-purple-400" },
                  ].map((feat, i) => (
                    <div key={i} className="bg-slate-900/40 border border-white/5 rounded-2xl p-5 flex items-center gap-4 hover:bg-slate-800/60 transition-colors cursor-pointer group">
                       <div className="w-12 h-12 rounded-xl bg-slate-800 flex items-center justify-center shrink-0 group-hover:scale-105 transition-transform border border-white/5">
                         <feat.icon className={\`w-6 h-6 \${feat.color}\`} />
                       </div>
                       <span className="font-semibold text-slate-200 text-sm group-hover:text-white transition-colors">{feat.label}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* 4. Performance Dashboard (Conditional) */}
              {hasCompletedTest && (
                <div className="mb-16">
                  <div className="bg-gradient-to-r from-emerald-900/20 to-teal-900/20 border border-emerald-500/20 rounded-[32px] p-8 lg:p-12 shadow-2xl">
                     <h2 className="text-3xl font-bold text-white flex items-center gap-3 mb-10">
                       <Trophy className="w-8 h-8 text-yellow-400" />
                       Performance Dashboard
                     </h2>
                     <div className="grid grid-cols-2 md:grid-cols-5 gap-6 mb-10">
                       <div className="bg-slate-900/60 rounded-2xl p-6 border border-white/5 hover:border-emerald-500/30 transition-colors">
                         <div className="text-slate-400 text-sm mb-2 font-medium">Overall Score</div>
                         <div className="text-4xl font-extrabold text-white">87%</div>
                       </div>
                       <div className="bg-slate-900/60 rounded-2xl p-6 border border-white/5 hover:border-emerald-500/30 transition-colors">
                         <div className="text-slate-400 text-sm mb-2 font-medium">Accuracy</div>
                         <div className="text-4xl font-extrabold text-emerald-400">92%</div>
                       </div>
                       <div className="bg-slate-900/60 rounded-2xl p-6 border border-white/5 hover:border-emerald-500/30 transition-colors">
                         <div className="text-slate-400 text-sm mb-2 font-medium">Correct Answers</div>
                         <div className="text-4xl font-extrabold text-blue-400">35</div>
                       </div>
                       <div className="bg-slate-900/60 rounded-2xl p-6 border border-white/5 hover:border-emerald-500/30 transition-colors">
                         <div className="text-slate-400 text-sm mb-2 font-medium">Wrong Answers</div>
                         <div className="text-4xl font-extrabold text-red-400">3</div>
                       </div>
                       <div className="bg-slate-900/60 rounded-2xl p-6 border border-white/5 hover:border-emerald-500/30 transition-colors">
                         <div className="text-slate-400 text-sm mb-2 font-medium">Time Taken</div>
                         <div className="text-4xl font-extrabold text-purple-400">42m</div>
                       </div>
                     </div>

                     <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                        <div className="lg:col-span-2 bg-slate-900/60 rounded-3xl p-8 border border-white/5">
                          <h3 className="text-xl font-bold text-white mb-6 flex items-center gap-2">
                            <BrainCircuit className="w-5 h-5 text-indigo-400" /> AI Evaluation
                          </h3>
                          <p className="text-slate-300 leading-relaxed mb-8 text-lg">
                            Great job on the <strong className="text-white">{selectedCompany || 'Google'}</strong> mock test! Your problem-solving speed is excellent. However, you struggled with Dynamic Programming edge cases. We recommend reviewing DP state transitions and space optimization.
                          </p>
                          <div className="grid grid-cols-3 gap-6 mb-8">
                            <div className="p-5 bg-slate-800/50 rounded-2xl border border-white/5">
                              <div className="text-slate-400 text-sm mb-2 font-medium">Communication Score</div>
                              <div className="text-2xl font-bold text-emerald-400">8/10</div>
                            </div>
                            <div className="p-5 bg-slate-800/50 rounded-2xl border border-white/5">
                              <div className="text-slate-400 text-sm mb-2 font-medium">Coding Score</div>
                              <div className="text-2xl font-bold text-indigo-400">9/10</div>
                            </div>
                            <div className="p-5 bg-slate-800/50 rounded-2xl border border-white/5">
                              <div className="text-slate-400 text-sm mb-2 font-medium">Confidence Score</div>
                              <div className="text-2xl font-bold text-blue-400">7.5/10</div>
                            </div>
                          </div>
                          
                          <div className="grid grid-cols-2 gap-8 p-6 bg-slate-800/30 rounded-2xl">
                            <div>
                              <h4 className="font-bold text-emerald-400 mb-4 text-lg">Strong Topics</h4>
                              <ul className="text-slate-300 space-y-3 list-disc pl-5">
                                <li>Arrays & Hashing</li>
                                <li>System Design (Microservices)</li>
                              </ul>
                            </div>
                            <div>
                              <h4 className="font-bold text-red-400 mb-4 text-lg">Weak Topics</h4>
                              <ul className="text-slate-300 space-y-3 list-disc pl-5">
                                <li>Dynamic Programming</li>
                                <li>Graph Traversal</li>
                              </ul>
                            </div>
                          </div>
                        </div>

                        <div className="bg-slate-900/60 rounded-3xl p-8 border border-white/5">
                           <h3 className="text-xl font-bold text-white mb-6 flex items-center gap-2">
                             <TrendingUp className="w-5 h-5 text-orange-400" /> Improvement Suggestions
                           </h3>
                           <div className="space-y-6">
                              <div className="flex gap-4">
                                <div className="w-10 h-10 rounded-xl bg-indigo-500/20 flex items-center justify-center shrink-0 border border-indigo-500/30">
                                  <span className="text-indigo-400 font-bold">1</span>
                                </div>
                                <p className="text-slate-300 mt-1">Review the top 15 Dynamic Programming questions commonly asked at {selectedCompany || 'top tech companies'}.</p>
                              </div>
                              <div className="flex gap-4">
                                <div className="w-10 h-10 rounded-xl bg-indigo-500/20 flex items-center justify-center shrink-0 border border-indigo-500/30">
                                  <span className="text-indigo-400 font-bold">2</span>
                                </div>
                                <p className="text-slate-300 mt-1">Practice speaking clearly while coding to improve your communication score.</p>
                              </div>
                              <div className="flex gap-4">
                                <div className="w-10 h-10 rounded-xl bg-indigo-500/20 flex items-center justify-center shrink-0 border border-indigo-500/30">
                                  <span className="text-indigo-400 font-bold">3</span>
                                </div>
                                <p className="text-slate-300 mt-1">Focus on edge cases when writing graph traversal algorithms (BFS/DFS).</p>
                              </div>
                           </div>
                        </div>
                     </div>
                  </div>
                </div>
              )}

              {/* 5. Performance History */}
              {hasCompletedTest && (
                <div className="mb-16">
                   <h2 className="text-2xl font-bold text-white mb-8 flex items-center gap-2">
                     <History className="w-6 h-6 text-slate-400" /> Performance History
                   </h2>
                   <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                     {[
                       { co: 'Amazon', role: 'SDE II', score: '82%', date: '2 days ago', diff: 'Hard', acc: '85%' },
                       { co: 'Microsoft', role: 'Backend', score: '91%', date: '5 days ago', diff: 'Medium', acc: '94%' }
                     ].map((hist, i) => (
                       <div key={i} className="bg-slate-900/40 border border-white/5 rounded-2xl p-6 flex justify-between items-center hover:bg-slate-800/60 transition-colors group">
                          <div className="flex items-center gap-5">
                            <div className="w-14 h-14 rounded-2xl bg-slate-800 flex items-center justify-center font-bold text-white text-2xl border border-white/5 shadow-inner">
                              {hist.co.charAt(0)}
                            </div>
                            <div>
                              <div className="font-bold text-slate-200 text-lg mb-1 group-hover:text-white transition-colors">{hist.co} - {hist.role}</div>
                              <div className="text-sm text-slate-400 font-medium">{hist.date} • {hist.diff} • Acc: {hist.acc}</div>
                            </div>
                          </div>
                          <div className="flex flex-col items-end gap-3">
                            <div className="text-3xl font-black text-emerald-400">{hist.score}</div>
                            <button className="text-sm font-bold text-indigo-400 hover:text-indigo-300 transition-colors">Retake</button>
                          </div>
                       </div>
                     ))}
                   </div>
                </div>
              )}

              {/* 6. Recommended Practice */}
              {hasCompletedTest && (
                <div className="mb-16">
                   <h2 className="text-2xl font-bold text-white mb-8 flex items-center gap-2">
                     <Compass className="w-6 h-6 text-indigo-400" /> Recommended Practice
                   </h2>
                   <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                      <div className="bg-slate-900/40 border border-white/5 rounded-3xl p-8 hover:bg-slate-800/60 transition-colors flex flex-col group">
                         <div className="w-14 h-14 rounded-2xl bg-red-500/10 flex items-center justify-center mb-6 group-hover:scale-105 transition-transform">
                           <Code className="w-7 h-7 text-red-400" />
                         </div>
                         <h3 className="text-lg font-bold text-white mb-2">Coding Problems</h3>
                         <div className="text-sm text-red-400 font-bold mb-4">Hard</div>
                         <p className="text-slate-400 mb-8 leading-relaxed flex-1">Master state transitions and memoization to ace DP rounds.</p>
                         <button className="w-full py-3.5 bg-white/5 hover:bg-white/10 text-white rounded-xl font-bold transition-colors border border-white/5">Practice Now</button>
                      </div>
                      <div className="bg-slate-900/40 border border-white/5 rounded-3xl p-8 hover:bg-slate-800/60 transition-colors flex flex-col group">
                         <div className="w-14 h-14 rounded-2xl bg-blue-500/10 flex items-center justify-center mb-6 group-hover:scale-105 transition-transform">
                           <Server className="w-7 h-7 text-blue-400" />
                         </div>
                         <h3 className="text-lg font-bold text-white mb-2">System Design</h3>
                         <div className="text-sm text-orange-400 font-bold mb-4">Medium</div>
                         <p className="text-slate-400 mb-8 leading-relaxed flex-1">Design highly scalable systems and understand tradeoffs.</p>
                         <button className="w-full py-3.5 bg-white/5 hover:bg-white/10 text-white rounded-xl font-bold transition-colors border border-white/5">Practice Now</button>
                      </div>
                      <div className="bg-slate-900/40 border border-white/5 rounded-3xl p-8 hover:bg-slate-800/60 transition-colors flex flex-col group">
                         <div className="w-14 h-14 rounded-2xl bg-pink-500/10 flex items-center justify-center mb-6 group-hover:scale-105 transition-transform">
                           <Users className="w-7 h-7 text-pink-400" />
                         </div>
                         <h3 className="text-lg font-bold text-white mb-2">Behavioral Questions</h3>
                         <div className="text-sm text-emerald-400 font-bold mb-4">Easy</div>
                         <p className="text-slate-400 mb-8 leading-relaxed flex-1">Master the STAR method for leadership principle rounds.</p>
                         <button className="w-full py-3.5 bg-white/5 hover:bg-white/10 text-white rounded-xl font-bold transition-colors border border-white/5">Practice Now</button>
                      </div>
                   </div>
                </div>
              )}

              {/* 7. Recent Activity */}
              {hasCompletedTest && (
                <div className="mb-16">
                   <h2 className="text-2xl font-bold text-white mb-8">Recent Activity</h2>
                   <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                     <div className="bg-slate-900/40 border border-white/5 rounded-2xl p-6 flex items-start gap-4">
                        <CheckCircle className="w-6 h-6 text-emerald-400 shrink-0 mt-0.5" />
                        <div>
                          <div className="font-bold text-slate-200 mb-1">Completed Google Mock Test</div>
                          <div className="text-sm text-slate-400">2 hours ago</div>
                        </div>
                     </div>
                     <div className="bg-slate-900/40 border border-white/5 rounded-2xl p-6 flex items-start gap-4">
                        <CheckCircle className="w-6 h-6 text-emerald-400 shrink-0 mt-0.5" />
                        <div>
                          <div className="font-bold text-slate-200 mb-1">Completed Amazon Coding Round</div>
                          <div className="text-sm text-slate-400">1 day ago</div>
                        </div>
                     </div>
                     <div className="bg-slate-900/40 border border-white/5 rounded-2xl p-6 flex items-start gap-4">
                        <TrendingUp className="w-6 h-6 text-blue-400 shrink-0 mt-0.5" />
                        <div>
                          <div className="font-bold text-slate-200 mb-1">Improved Communication Score</div>
                          <div className="text-sm text-slate-400">3 days ago</div>
                        </div>
                     </div>
                     <div className="bg-slate-900/40 border border-white/5 rounded-2xl p-6 flex items-start gap-4">
                        <CheckCircle className="w-6 h-6 text-emerald-400 shrink-0 mt-0.5" />
                        <div>
                          <div className="font-bold text-slate-200 mb-1">Completed Java Assessment</div>
                          <div className="text-sm text-slate-400">1 week ago</div>
                        </div>
                     </div>
                   </div>
                </div>
              )}

              {/* 8. Daily Challenge */}
              <div className="mb-16">
                <div className="bg-gradient-to-r from-orange-900/20 to-pink-900/20 border border-orange-500/20 rounded-[32px] p-8 md:p-12 flex flex-col md:flex-row items-center justify-between gap-8 shadow-2xl relative overflow-hidden">
                   <div className="absolute top-0 right-0 w-64 h-64 bg-orange-500/10 rounded-full blur-[60px] pointer-events-none -translate-y-1/2 translate-x-1/4" />
                   <div className="flex items-center gap-8 relative z-10">
                     <div className="w-20 h-20 rounded-[24px] bg-orange-500/20 border border-orange-500/30 flex items-center justify-center shrink-0 shadow-inner">
                       <Calendar className="w-10 h-10 text-orange-400" />
                     </div>
                     <div>
                       <h3 className="text-2xl font-bold text-white mb-3">Today's AI Challenge</h3>
                       <div className="flex flex-wrap items-center gap-4 text-sm font-bold">
                         <span className="px-3 py-1.5 rounded-lg bg-orange-500/10 text-orange-400 border border-orange-500/20">Hard</span>
                         <span className="text-slate-300">45 Mins</span>
                         <span className="flex items-center gap-1.5 text-yellow-400"><Star className="w-4 h-4 fill-current" /> 500 Pts Reward</span>
                       </div>
                     </div>
                   </div>
                   <button className="w-full md:w-auto px-10 py-5 bg-gradient-to-r from-orange-500 to-pink-500 hover:from-orange-400 hover:to-pink-400 text-white rounded-2xl font-bold text-lg transition-all shadow-xl shadow-orange-500/20 relative z-10 flex items-center justify-center gap-2">
                     Start Daily Challenge <Play className="w-5 h-5 fill-current" />
                   </button>
                </div>
              </div>

              {/* 9. Bottom CTA */}
              <div className="relative overflow-hidden bg-gradient-to-br from-indigo-600 via-purple-600 to-indigo-900 rounded-[40px] p-10 md:p-16 flex flex-col md:flex-row items-center justify-between gap-12 shadow-2xl mb-12">
                 <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-white/10 rounded-full blur-[100px] pointer-events-none -translate-y-1/3 translate-x-1/4" />
                 <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-indigo-400/20 rounded-full blur-[80px] pointer-events-none translate-y-1/3 -translate-x-1/4" />
                 
                 <div className="relative z-10 max-w-2xl">
                    <h2 className="text-4xl sm:text-5xl font-extrabold text-white mb-6 leading-tight">Ready to Ace Your Next Interview?</h2>
                    <p className="text-indigo-100 text-xl mb-10 leading-relaxed font-medium">
                      Continue practicing to improve your interview skills with AI-powered feedback, real-time analytics, and adaptive questioning.
                    </p>
                    <div className="flex flex-col sm:flex-row gap-5">
                      <button onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })} className="px-10 py-5 bg-white text-indigo-700 hover:bg-indigo-50 rounded-2xl font-bold text-lg transition-all shadow-2xl flex items-center justify-center gap-3">
                        🚀 Start Another Mock Test
                      </button>
                      <button onClick={() => {
                        if (!hasCompletedTest) {
                          alert("Complete a mock test first to view progress!");
                        } else {
                          window.scrollTo({ top: document.body.scrollHeight / 2, behavior: 'smooth' });
                        }
                      }} className="px-10 py-5 bg-indigo-900/40 hover:bg-indigo-900/60 text-white border border-white/20 rounded-2xl font-bold text-lg transition-all backdrop-blur-sm flex items-center justify-center gap-3">
                        📊 View Progress
                      </button>
                    </div>
                 </div>
                 
                 <div className="relative z-10 hidden lg:flex w-72 h-72 shrink-0 bg-white/5 border border-white/10 rounded-[40px] backdrop-blur-xl p-8 flex-col items-center justify-center transform rotate-3 shadow-2xl hover:rotate-0 transition-transform duration-500">
                    <Brain className="w-28 h-28 text-white mb-8 animate-pulse drop-shadow-2xl" />
                    <div className="w-full h-3 bg-white/10 rounded-full mb-4 overflow-hidden border border-white/10">
                      <div className="h-full bg-gradient-to-r from-blue-400 to-emerald-400 w-3/4 rounded-full" />
                    </div>
                    <div className="text-white/90 font-bold tracking-wide uppercase text-sm">AI Analyzing...</div>
                 </div>
              </div>

              `;

  content = content.substring(0, startIndex) + newSection + content.substring(endIndex);
  fs.writeFileSync('src/pages/MockTest.tsx', content);
  console.log("Replaced Mock Test Dashboard successfully.");
} else {
  console.log("Tags not found", startIndex, endIndex);
}

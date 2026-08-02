const fs = require('fs');
let content = fs.readFileSync('src/pages/CodingPractice.tsx', 'utf8');

const additionalContent = `
        {/* 5. Job Role Library */}
        <div className="space-y-6">
          <h2 className="text-2xl font-bold text-white flex items-center gap-2">
            <Briefcase className="w-6 h-6 text-pink-400" /> Job Role Path
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {ROLES.map((role, i) => (
              <div key={i} className="bg-slate-900/40 backdrop-blur-md border border-white/5 rounded-[24px] p-6 hover:bg-slate-800/60 transition-colors cursor-pointer group">
                <div className="flex justify-between items-start mb-4">
                  <div className="w-12 h-12 rounded-xl bg-pink-500/10 text-pink-400 flex items-center justify-center border border-pink-500/20 group-hover:scale-110 transition-transform">
                    <Briefcase className="w-6 h-6" />
                  </div>
                  <ChevronRight className="w-5 h-5 text-slate-500 group-hover:text-white transition-colors" />
                </div>
                <h3 className="font-bold text-white text-lg mb-1">{role.name}</h3>
                <div className="text-sm text-slate-400">{role.count} questions</div>
              </div>
            ))}
          </div>
        </div>

        {/* 12. Personalized Recommendations & 15. Recent Activity */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <div className="bg-slate-900/40 backdrop-blur-md border border-white/5 rounded-[24px] p-6 lg:p-8">
            <h2 className="text-xl font-bold text-white mb-6 flex items-center gap-2">
              <Compass className="w-5 h-5 text-indigo-400" /> Recommended for You
            </h2>
            <div className="space-y-4">
              <div className="flex items-center justify-between p-4 bg-white/5 rounded-2xl border border-white/5 hover:border-indigo-500/30 transition-colors cursor-pointer group">
                <div className="flex items-center gap-4">
                  <div className="w-10 h-10 rounded-full bg-indigo-500/20 flex items-center justify-center text-indigo-400">
                    <Target className="w-5 h-5" />
                  </div>
                  <div>
                    <div className="font-bold text-white group-hover:text-indigo-300 transition-colors">Improve Graph Traversal</div>
                    <div className="text-xs text-slate-400">Your weak point • 12 practice questions</div>
                  </div>
                </div>
                <ChevronRight className="w-5 h-5 text-slate-500 group-hover:text-white transition-colors" />
              </div>
              <div className="flex items-center justify-between p-4 bg-white/5 rounded-2xl border border-white/5 hover:border-indigo-500/30 transition-colors cursor-pointer group">
                <div className="flex items-center gap-4">
                  <div className="w-10 h-10 rounded-full bg-purple-500/20 flex items-center justify-center text-purple-400">
                    <Target className="w-5 h-5" />
                  </div>
                  <div>
                    <div className="font-bold text-white group-hover:text-purple-300 transition-colors">Google SDE I Mock</div>
                    <div className="text-xs text-slate-400">Based on your activity</div>
                  </div>
                </div>
                <ChevronRight className="w-5 h-5 text-slate-500 group-hover:text-white transition-colors" />
              </div>
            </div>
          </div>
          
          <div className="bg-slate-900/40 backdrop-blur-md border border-white/5 rounded-[24px] p-6 lg:p-8">
            <h2 className="text-xl font-bold text-white mb-6 flex items-center gap-2">
              <GitCommit className="w-5 h-5 text-emerald-400" /> Recent Activity
            </h2>
            <div className="space-y-6 relative before:absolute before:inset-0 before:ml-5 before:-translate-x-px md:before:mx-auto md:before:translate-x-0 before:h-full before:w-0.5 before:bg-gradient-to-b before:from-transparent before:via-white/10 before:to-transparent">
              <div className="relative flex items-center justify-between md:justify-normal md:odd:flex-row-reverse group is-active">
                <div className="flex items-center justify-center w-10 h-10 rounded-full border border-white/10 bg-slate-900 text-slate-400 shadow shrink-0 md:order-1 md:group-odd:-translate-x-1/2 md:group-even:translate-x-1/2 z-10 group-hover:text-emerald-400 group-hover:border-emerald-500/30 transition-colors">
                  <CheckCircle2 className="w-5 h-5" />
                </div>
                <div className="w-[calc(100%-4rem)] md:w-[calc(50%-2.5rem)] p-4 rounded-2xl bg-white/5 border border-white/5 group-hover:border-white/10 transition-colors">
                  <div className="font-bold text-white mb-1">Solved Two Sum</div>
                  <div className="text-xs text-slate-400">2 hours ago</div>
                </div>
              </div>
              <div className="relative flex items-center justify-between md:justify-normal md:odd:flex-row-reverse group">
                <div className="flex items-center justify-center w-10 h-10 rounded-full border border-white/10 bg-slate-900 text-slate-400 shadow shrink-0 md:order-1 md:group-odd:-translate-x-1/2 md:group-even:translate-x-1/2 z-10 group-hover:text-orange-400 group-hover:border-orange-500/30 transition-colors">
                  <Flame className="w-5 h-5" />
                </div>
                <div className="w-[calc(100%-4rem)] md:w-[calc(50%-2.5rem)] p-4 rounded-2xl bg-white/5 border border-white/5 group-hover:border-white/10 transition-colors">
                  <div className="font-bold text-white mb-1">7-Day Streak Achieved</div>
                  <div className="text-xs text-slate-400">Yesterday</div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* 16. Learning Resources */}
        <div className="bg-slate-900/40 backdrop-blur-md border border-white/5 rounded-[24px] p-6 lg:p-8">
           <h2 className="text-xl font-bold text-white mb-6 flex items-center gap-2">
             <BookOpen className="w-5 h-5 text-cyan-400" /> Learning Resources
           </h2>
           <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
             <div className="p-6 rounded-2xl bg-white/5 hover:bg-white/10 transition-colors border border-white/5 cursor-pointer flex flex-col items-center text-center">
               <Monitor className="w-10 h-10 text-indigo-400 mb-4" />
               <h3 className="font-bold text-white mb-2">Video Tutorials</h3>
               <p className="text-sm text-slate-400">Step-by-step DSA video guides</p>
             </div>
             <div className="p-6 rounded-2xl bg-white/5 hover:bg-white/10 transition-colors border border-white/5 cursor-pointer flex flex-col items-center text-center">
               <FileCode2 className="w-10 h-10 text-emerald-400 mb-4" />
               <h3 className="font-bold text-white mb-2">Cheat Sheets</h3>
               <p className="text-sm text-slate-400">Quick syntax and concept references</p>
             </div>
             <div className="p-6 rounded-2xl bg-white/5 hover:bg-white/10 transition-colors border border-white/5 cursor-pointer flex flex-col items-center text-center">
               <Briefcase className="w-10 h-10 text-orange-400 mb-4" />
               <h3 className="font-bold text-white mb-2">Company Guides</h3>
               <p className="text-sm text-slate-400">Targeted preparation roadmaps</p>
             </div>
           </div>
        </div>

        {/* 17. Footer CTA */}
        <div className="relative overflow-hidden bg-gradient-to-r from-indigo-600/20 to-purple-600/20 backdrop-blur-md border border-indigo-500/30 rounded-[32px] p-10 lg:p-16 text-center">
           <div className="absolute top-0 right-0 w-64 h-64 bg-indigo-500/20 rounded-full blur-[60px] pointer-events-none" />
           <div className="absolute bottom-0 left-0 w-64 h-64 bg-purple-500/20 rounded-full blur-[60px] pointer-events-none" />
           
           <h2 className="text-3xl md:text-4xl font-bold text-white mb-4 relative z-10">Ready to Crack Your Dream Company's Interview?</h2>
           <p className="text-lg text-indigo-200 max-w-2xl mx-auto mb-8 relative z-10">
             Continue practicing with AI-powered coding assistance and improve your interview performance.
           </p>
           
           <div className="flex flex-wrap justify-center gap-4 relative z-10">
             <button className="px-8 py-3.5 rounded-xl bg-indigo-500 hover:bg-indigo-600 text-white font-bold text-[15px] shadow-lg shadow-indigo-500/25 transition-all flex items-center gap-2">
               <Play className="w-5 h-5" /> Continue Practice
             </button>
             <button className="px-8 py-3.5 rounded-xl bg-white/10 hover:bg-white/20 text-white font-bold text-[15px] border border-white/10 transition-all flex items-center gap-2">
               <TrendingUp className="w-5 h-5" /> View Progress
             </button>
           </div>
        </div>
`;

content = content.replace("</div>\n    </DashboardLayout>", additionalContent + "\n      </div>\n    </DashboardLayout>");

// Add CheckCircle2 import
content = content.replace("Star, Activity, TrendingUp, Compass, Monitor, GitCommit, FileCode2", "Star, Activity, TrendingUp, Compass, Monitor, GitCommit, FileCode2, CheckCircle2");

fs.writeFileSync('src/pages/CodingPractice.tsx', content);

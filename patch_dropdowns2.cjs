const fs = require('fs');
let content = fs.readFileSync('src/pages/MockTest.tsx', 'utf8');

const targetStr = `{/* Quick Filter Bar (Sticky) */}
              <div className="sticky top-4 sm:top-6 md:top-8 z-50 bg-slate-900/80 backdrop-blur-xl border border-white/10 rounded-[24px] p-4 shadow-xl shadow-black/20">
                 <div className="flex flex-col xl:flex-row xl:items-center justify-between gap-4">
                   <div className="flex flex-wrap gap-3 flex-1">
                     <div className="flex-1 min-w-[130px]">
                       <select className="w-full bg-slate-950/50 border border-white/5 rounded-xl px-4 py-2.5 text-sm text-slate-200 focus:outline-none focus:border-indigo-500 appearance-none hover:bg-slate-900 transition-colors cursor-pointer">
                         <option className="bg-slate-900 text-slate-200">Company ▼</option>
                         <option className="bg-slate-900 text-slate-200">Google</option>
                         <option className="bg-slate-900 text-slate-200">Amazon</option>
                         <option className="bg-slate-900 text-slate-200">Microsoft</option>
                       </select>
                     </div>
                     <div className="flex-1 min-w-[130px]">
                       <select className="w-full bg-slate-950/50 border border-white/5 rounded-xl px-4 py-2.5 text-sm text-slate-200 focus:outline-none focus:border-indigo-500 appearance-none hover:bg-slate-900 transition-colors cursor-pointer">
                         <option className="bg-slate-900 text-slate-200">Role ▼</option>
                         <option className="bg-slate-900 text-slate-200">SDE</option>
                         <option className="bg-slate-900 text-slate-200">Frontend</option>
                         <option className="bg-slate-900 text-slate-200">Backend</option>
                       </select>
                     </div>
                     <div className="flex-1 min-w-[130px]">
                       <select className="w-full bg-slate-950/50 border border-white/5 rounded-xl px-4 py-2.5 text-sm text-slate-200 focus:outline-none focus:border-indigo-500 appearance-none hover:bg-slate-900 transition-colors cursor-pointer">
                         <option className="bg-slate-900 text-slate-200">Difficulty ▼</option>
                         <option className="bg-slate-900 text-slate-200">Easy</option>
                         <option className="bg-slate-900 text-slate-200">Medium</option>
                         <option className="bg-slate-900 text-slate-200">Hard</option>
                       </select>
                     </div>
                     <div className="flex-1 min-w-[130px]">
                       <select className="w-full bg-slate-950/50 border border-white/5 rounded-xl px-4 py-2.5 text-sm text-slate-200 focus:outline-none focus:border-indigo-500 appearance-none hover:bg-slate-900 transition-colors cursor-pointer">
                         <option className="bg-slate-900 text-slate-200">Duration ▼</option>
                         <option className="bg-slate-900 text-slate-200">30 Mins</option>
                         <option className="bg-slate-900 text-slate-200">60 Mins</option>
                         <option className="bg-slate-900 text-slate-200">90 Mins</option>
                       </select>
                     </div>
                     <div className="flex-1 min-w-[130px]">
                       <select className="w-full bg-slate-950/50 border border-white/5 rounded-xl px-4 py-2.5 text-sm text-slate-200 focus:outline-none focus:border-indigo-500 appearance-none hover:bg-slate-900 transition-colors cursor-pointer">
                         <option className="bg-slate-900 text-slate-200">Language ▼</option>
                         <option className="bg-slate-900 text-slate-200">English</option>
                         <option className="bg-slate-900 text-slate-200">Hindi</option>
                         <option className="bg-slate-900 text-slate-200">Hinglish</option>
                       </select>
                     </div>
                   </div>`;

const replacement = `{/* Quick Filter Bar (Sticky) */}
              <div className="sticky top-4 sm:top-6 md:top-8 z-50 bg-slate-900/80 backdrop-blur-xl border border-white/10 rounded-[24px] p-4 shadow-xl shadow-black/20">
                 <div className="flex flex-col xl:flex-row xl:items-center justify-between gap-4">
                   <div className="flex flex-wrap gap-3 flex-1">
                     <div className="flex-1 min-w-[130px]">
                       <select 
                         value={selectedCompany || ""}
                         onChange={(e) => setSelectedCompany(e.target.value === "Company ▼" ? null : e.target.value)}
                         className="w-full bg-slate-950/50 border border-white/5 rounded-xl px-4 py-2.5 text-sm text-slate-200 focus:outline-none focus:border-indigo-500 appearance-none hover:bg-slate-900 transition-colors cursor-pointer">
                         <option value="Company ▼" className="bg-slate-900 text-slate-200">Company ▼</option>
                         {[...COMPANIES.Technology, ...COMPANIES.IndianProduct, ...COMPANIES.Service].map(c => (
                           <option key={c.name} value={c.name} className="bg-slate-900 text-slate-200">{c.name}</option>
                         ))}
                       </select>
                     </div>
                     <div className="flex-1 min-w-[130px]">
                       <select 
                         value={selectedRole || ""}
                         onChange={(e) => setSelectedRole(e.target.value === "Role ▼" ? null : e.target.value)}
                         className="w-full bg-slate-950/50 border border-white/5 rounded-xl px-4 py-2.5 text-sm text-slate-200 focus:outline-none focus:border-indigo-500 appearance-none hover:bg-slate-900 transition-colors cursor-pointer">
                         <option value="Role ▼" className="bg-slate-900 text-slate-200">Role ▼</option>
                         {JOB_ROLES.map(r => (
                           <option key={r.name} value={r.name} className="bg-slate-900 text-slate-200">{r.name}</option>
                         ))}
                       </select>
                     </div>
                     <div className="flex-1 min-w-[130px]">
                       <select 
                         value={selectedDifficulty || ""}
                         onChange={(e) => setSelectedDifficulty(e.target.value === "Difficulty ▼" ? null : e.target.value)}
                         className="w-full bg-slate-950/50 border border-white/5 rounded-xl px-4 py-2.5 text-sm text-slate-200 focus:outline-none focus:border-indigo-500 appearance-none hover:bg-slate-900 transition-colors cursor-pointer">
                         <option value="Difficulty ▼" className="bg-slate-900 text-slate-200">Difficulty ▼</option>
                         {DIFFICULTIES.map(d => (
                           <option key={d.name} value={d.name} className="bg-slate-900 text-slate-200">{d.name}</option>
                         ))}
                       </select>
                     </div>
                     <div className="flex-1 min-w-[130px]">
                       <select 
                         value={timeLimit ? \`\${timeLimit} min\` : "Duration ▼"}
                         onChange={(e) => {
                           if (e.target.value === "Duration ▼") {
                             setTimeLimit(15); // default or null, we use 15 for now
                           } else {
                             setTimeLimit(parseInt(e.target.value));
                           }
                         }}
                         className="w-full bg-slate-950/50 border border-white/5 rounded-xl px-4 py-2.5 text-sm text-slate-200 focus:outline-none focus:border-indigo-500 appearance-none hover:bg-slate-900 transition-colors cursor-pointer">
                         <option value="Duration ▼" className="bg-slate-900 text-slate-200">Duration ▼</option>
                         <option value="15 min" className="bg-slate-900 text-slate-200">15 Mins</option>
                         <option value="30 min" className="bg-slate-900 text-slate-200">30 Mins</option>
                         <option value="45 min" className="bg-slate-900 text-slate-200">45 Mins</option>
                         <option value="60 min" className="bg-slate-900 text-slate-200">60 Mins</option>
                       </select>
                     </div>
                     <div className="flex-1 min-w-[130px]">
                       <select 
                         value={selectedLanguage || ""}
                         onChange={(e) => setSelectedLanguage(e.target.value === "Language ▼" ? null : e.target.value)}
                         className="w-full bg-slate-950/50 border border-white/5 rounded-xl px-4 py-2.5 text-sm text-slate-200 focus:outline-none focus:border-indigo-500 appearance-none hover:bg-slate-900 transition-colors cursor-pointer">
                         <option value="Language ▼" className="bg-slate-900 text-slate-200">Language ▼</option>
                         {LANGUAGES.map(l => (
                           <option key={l} value={l} className="bg-slate-900 text-slate-200">{l}</option>
                         ))}
                       </select>
                     </div>
                   </div>`;

content = content.replace(targetStr, replacement);
fs.writeFileSync('src/pages/MockTest.tsx', content);

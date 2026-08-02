const fs = require('fs');
let content = fs.readFileSync('src/pages/MockTest.tsx', 'utf8');

// Replace state
content = content.replace(
  'const [isSidebarCollapsed, setSidebarCollapsed] = useState(false);',
`const [isSidebarCollapsed, setSidebarCollapsed] = useState(false);
  const [companySearchQuery, setCompanySearchQuery] = useState('');
  const [selectedCompany, setSelectedCompany] = useState<string | null>(null);
  const [selectedRole, setSelectedRole] = useState<string | null>(null);
  const [selectedMode, setSelectedMode] = useState<string | null>(null);
  const [selectedDifficulty, setSelectedDifficulty] = useState<string | null>(null);
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [selectedLanguage, setSelectedLanguage] = useState<string | null>(null);
  
  const [numQuestions, setNumQuestions] = useState(10);
  const [timeLimit, setTimeLimit] = useState(15);
  const [negativeMarking, setNegativeMarking] = useState(false);
  const [randomQuestions, setRandomQuestions] = useState(true);
  const [aiAdaptive, setAiAdaptive] = useState(true);

  const [hasCompletedTest, setHasCompletedTest] = useState(false);

  const filteredTechCompanies = COMPANIES.Technology.filter(c => c.name.toLowerCase().includes(companySearchQuery.toLowerCase()));
  const filteredIndianCompanies = COMPANIES.IndianProduct.filter(c => c.name.toLowerCase().includes(companySearchQuery.toLowerCase()));
  const filteredServiceCompanies = COMPANIES.Service.filter(c => c.name.toLowerCase().includes(companySearchQuery.toLowerCase()));`
);

// Replace 2. Popular Companies ... to the start of 4. AI Recommendation
const startTag1 = '{/* 2. Popular Companies (Horizontal Scroll) */}';
const endTag1 = '{/* 4. AI Recommendation (One large card) */}';

const section1 = `
              {/* 1. Company Selection */}
              <div>
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
                  <h2 className="text-xl font-bold text-white flex items-center gap-2">
                    <Building2 className="w-5 h-5 text-indigo-400" />
                    Company Selection
                  </h2>
                  <div className="relative w-full max-w-sm">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <Search className="h-4 w-4 text-slate-400" />
                    </div>
                    <input 
                      type="text" 
                      placeholder="Search Company..." 
                      value={companySearchQuery}
                      onChange={(e) => setCompanySearchQuery(e.target.value)}
                      className="w-full bg-slate-900/50 border border-white/5 rounded-xl pl-10 pr-4 py-2.5 text-sm text-slate-200 focus:outline-none focus:border-indigo-500 transition-colors"
                    />
                  </div>
                </div>

                <div className="space-y-8">
                  {filteredTechCompanies.length > 0 && (
                     <div>
                       <h3 className="text-sm font-bold text-slate-400 uppercase tracking-wider mb-4">Technology Companies</h3>
                       <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                         {filteredTechCompanies.map((company, i) => (
                           <div key={i} onClick={() => setSelectedCompany(company.name)} className={\`bg-slate-900/40 border \${selectedCompany === company.name ? 'border-indigo-500 bg-indigo-500/10' : 'border-white/5 hover:border-white/20 hover:bg-slate-800'} rounded-2xl p-4 cursor-pointer transition-all flex flex-col gap-3 group\`}>
                             <div className="flex items-center gap-3">
                               <div className={\`w-10 h-10 rounded-lg bg-gradient-to-br \${company.color} flex items-center justify-center font-bold text-white shadow-lg shrink-0\`}>
                                 {company.name.charAt(0)}
                               </div>
                               <div className="overflow-hidden">
                                 <div className="font-bold text-slate-200 truncate group-hover:text-white transition-colors">{company.name}</div>
                                 <div className="text-xs text-slate-400 flex items-center gap-1">
                                   <Target className="w-3 h-3" /> {company.questions} Qs
                                 </div>
                               </div>
                             </div>
                             <div className="flex items-center gap-2 mt-auto pt-3 border-t border-white/5">
                               <span className={\`text-[10px] font-bold px-2 py-0.5 rounded-full \${company.diff === 'Hard' ? 'bg-red-500/10 text-red-400' : company.diff === 'Medium' ? 'bg-orange-500/10 text-orange-400' : 'bg-emerald-500/10 text-emerald-400'}\`}>{company.diff}</span>
                               <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-blue-500/10 text-blue-400">{company.tag}</span>
                             </div>
                           </div>
                         ))}
                       </div>
                     </div>
                  )}
                  
                  {filteredIndianCompanies.length > 0 && (
                     <div>
                       <h3 className="text-sm font-bold text-slate-400 uppercase tracking-wider mb-4 mt-6">Indian Product Companies</h3>
                       <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                         {filteredIndianCompanies.map((company, i) => (
                           <div key={i} onClick={() => setSelectedCompany(company.name)} className={\`bg-slate-900/40 border \${selectedCompany === company.name ? 'border-indigo-500 bg-indigo-500/10' : 'border-white/5 hover:border-white/20 hover:bg-slate-800'} rounded-2xl p-4 cursor-pointer transition-all flex flex-col gap-3 group\`}>
                             <div className="flex items-center gap-3">
                               <div className={\`w-10 h-10 rounded-lg bg-gradient-to-br \${company.color} flex items-center justify-center font-bold text-white shadow-lg shrink-0\`}>
                                 {company.name.charAt(0)}
                               </div>
                               <div className="overflow-hidden">
                                 <div className="font-bold text-slate-200 truncate group-hover:text-white transition-colors">{company.name}</div>
                                 <div className="text-xs text-slate-400 flex items-center gap-1">
                                   <Target className="w-3 h-3" /> {company.questions} Qs
                                 </div>
                               </div>
                             </div>
                             <div className="flex items-center gap-2 mt-auto pt-3 border-t border-white/5">
                               <span className={\`text-[10px] font-bold px-2 py-0.5 rounded-full \${company.diff === 'Hard' ? 'bg-red-500/10 text-red-400' : company.diff === 'Medium' ? 'bg-orange-500/10 text-orange-400' : 'bg-emerald-500/10 text-emerald-400'}\`}>{company.diff}</span>
                               <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-blue-500/10 text-blue-400">{company.tag}</span>
                             </div>
                           </div>
                         ))}
                       </div>
                     </div>
                  )}
                  
                  {filteredServiceCompanies.length > 0 && (
                     <div>
                       <h3 className="text-sm font-bold text-slate-400 uppercase tracking-wider mb-4 mt-6">Service Companies</h3>
                       <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                         {filteredServiceCompanies.map((company, i) => (
                           <div key={i} onClick={() => setSelectedCompany(company.name)} className={\`bg-slate-900/40 border \${selectedCompany === company.name ? 'border-indigo-500 bg-indigo-500/10' : 'border-white/5 hover:border-white/20 hover:bg-slate-800'} rounded-2xl p-4 cursor-pointer transition-all flex flex-col gap-3 group\`}>
                             <div className="flex items-center gap-3">
                               <div className={\`w-10 h-10 rounded-lg bg-gradient-to-br \${company.color} flex items-center justify-center font-bold text-white shadow-lg shrink-0\`}>
                                 {company.name.charAt(0)}
                               </div>
                               <div className="overflow-hidden">
                                 <div className="font-bold text-slate-200 truncate group-hover:text-white transition-colors">{company.name}</div>
                                 <div className="text-xs text-slate-400 flex items-center gap-1">
                                   <Target className="w-3 h-3" /> {company.questions} Qs
                                 </div>
                               </div>
                             </div>
                             <div className="flex items-center gap-2 mt-auto pt-3 border-t border-white/5">
                               <span className={\`text-[10px] font-bold px-2 py-0.5 rounded-full \${company.diff === 'Hard' ? 'bg-red-500/10 text-red-400' : company.diff === 'Medium' ? 'bg-orange-500/10 text-orange-400' : 'bg-emerald-500/10 text-emerald-400'}\`}>{company.diff}</span>
                               <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-blue-500/10 text-blue-400">{company.tag}</span>
                             </div>
                           </div>
                         ))}
                       </div>
                     </div>
                  )}
                </div>
              </div>

              {/* 2. Job Role Section */}
              <div>
                <h2 className="text-xl font-bold text-white flex items-center gap-2 mb-6">
                  <Briefcase className="w-5 h-5 text-pink-400" />
                  Job Role
                </h2>
                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
                  {JOB_ROLES.map((role, i) => (
                    <div key={i} onClick={() => setSelectedRole(role.name)} className={\`bg-slate-900/40 border \${selectedRole === role.name ? 'border-indigo-500 bg-indigo-500/10' : 'border-white/5 hover:border-white/20 hover:bg-slate-800'} rounded-2xl p-4 cursor-pointer transition-all flex flex-col items-center text-center gap-2 group\`}>
                       <role.icon className={\`w-6 h-6 \${selectedRole === role.name ? 'text-indigo-400' : 'text-slate-400 group-hover:text-indigo-400'} transition-colors\`} />
                       <div className="font-bold text-sm text-slate-200 group-hover:text-white mt-1">{role.name}</div>
                       <div className="text-xs text-slate-400">{role.questions} Qs</div>
                    </div>
                  ))}
                </div>
              </div>

              {/* 3. Interview Mode */}
              <div>
                <h2 className="text-xl font-bold text-white flex items-center gap-2 mb-6">
                  <Layout className="w-5 h-5 text-orange-400" />
                  Interview Mode
                </h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                  {MODES.map((mode, i) => (
                    <div key={i} onClick={() => setSelectedMode(mode.name)} className={\`bg-slate-900/40 border \${selectedMode === mode.name ? 'border-indigo-500 bg-indigo-500/10' : 'border-white/5 hover:border-white/20 hover:bg-slate-800'} rounded-2xl p-5 cursor-pointer transition-all flex flex-col gap-2\`}>
                       <div className="font-bold text-slate-200">{mode.name}</div>
                       <div className="text-sm text-slate-400 leading-relaxed">{mode.desc}</div>
                    </div>
                  ))}
                </div>
              </div>

              {/* 4. Difficulty Level */}
              <div>
                <h2 className="text-xl font-bold text-white flex items-center gap-2 mb-6">
                  <Flame className="w-5 h-5 text-red-400" />
                  Difficulty Level
                </h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                  {DIFFICULTIES.map((diff, i) => (
                    <div key={i} onClick={() => setSelectedDifficulty(diff.name)} className={\`bg-slate-900/40 border \${selectedDifficulty === diff.name ? 'border-indigo-500 bg-indigo-500/10' : 'border-white/5 hover:border-white/20 hover:bg-slate-800'} rounded-2xl p-5 cursor-pointer transition-all flex flex-col gap-2\`}>
                       <div className={\`font-bold \${diff.color}\`}>{diff.name}</div>
                       <div className="text-sm text-slate-400 leading-relaxed">{diff.desc}</div>
                    </div>
                  ))}
                </div>
              </div>

              {/* 5. Question Categories */}
              <div>
                <h2 className="text-xl font-bold text-white flex items-center gap-2 mb-6">
                  <Target className="w-5 h-5 text-emerald-400" />
                  Question Categories
                </h2>
                <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
                  {CATEGORIES.map((cat, i) => (
                    <div key={i} onClick={() => setSelectedCategory(cat.name)} className={\`bg-slate-900/40 border \${selectedCategory === cat.name ? 'border-indigo-500 bg-indigo-500/10' : 'border-white/5 hover:border-white/20 hover:bg-slate-800'} rounded-2xl p-4 flex items-center gap-4 cursor-pointer transition-all group\`}>
                       <div className={\`w-12 h-12 rounded-xl flex items-center justify-center bg-slate-900 border border-white/5 shrink-0 group-hover:scale-105 transition-transform\`}>
                          <cat.icon className={\`w-6 h-6 \${cat.color}\`} />
                       </div>
                       <span className="font-bold text-sm text-slate-200 group-hover:text-white">{cat.name}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* 6. Language Selection */}
              <div>
                <h2 className="text-xl font-bold text-white flex items-center gap-2 mb-6">
                  <Globe className="w-5 h-5 text-cyan-400" />
                  Language Selection
                </h2>
                <div className="flex flex-wrap gap-4">
                  {LANGUAGES.map((lang, i) => (
                    <div key={i} onClick={() => setSelectedLanguage(lang)} className={\`px-8 py-3.5 rounded-xl border \${selectedLanguage === lang ? 'border-indigo-500 bg-indigo-500/10 text-indigo-300' : 'border-white/5 bg-slate-900/40 text-slate-400 hover:border-white/20 hover:bg-slate-800'} cursor-pointer font-bold transition-all\`}>
                       {lang}
                    </div>
                  ))}
                </div>
              </div>

              {/* 7. Test Configuration */}
              <div>
                <h2 className="text-xl font-bold text-white flex items-center gap-2 mb-6">
                  <Settings className="w-5 h-5 text-slate-400" />
                  Test Configuration
                </h2>
                <div className="bg-slate-900/40 border border-white/5 rounded-[24px] p-6 lg:p-8 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 shadow-sm">
                   <div>
                     <div className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-4">Number of Questions</div>
                     <div className="flex flex-wrap gap-2">
                       {[10, 20, 30, 50].map(n => (
                         <div key={n} onClick={() => setNumQuestions(n)} className={\`px-4 py-2 rounded-xl border cursor-pointer text-sm font-bold transition-all \${numQuestions === n ? 'bg-indigo-500/20 border-indigo-500 text-indigo-300' : 'bg-slate-800/80 border-white/5 text-slate-400 hover:bg-slate-700'}\`}>{n}</div>
                       ))}
                     </div>
                   </div>
                   <div>
                     <div className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-4">Time Limit</div>
                     <div className="flex flex-wrap gap-2">
                       {[15, 30, 45, 60].map(t => (
                         <div key={t} onClick={() => setTimeLimit(t)} className={\`px-4 py-2 rounded-xl border cursor-pointer text-sm font-bold transition-all \${timeLimit === t ? 'bg-indigo-500/20 border-indigo-500 text-indigo-300' : 'bg-slate-800/80 border-white/5 text-slate-400 hover:bg-slate-700'}\`}>{t} min</div>
                       ))}
                     </div>
                   </div>
                   <div className="space-y-5">
                      <div className="flex items-center justify-between">
                         <span className="text-sm font-bold text-slate-300">Negative Marking</span>
                         <button onClick={() => setNegativeMarking(!negativeMarking)}>
                           {negativeMarking ? <ToggleRight className="w-8 h-8 text-indigo-400" /> : <ToggleLeft className="w-8 h-8 text-slate-500" />}
                         </button>
                      </div>
                      <div className="flex items-center justify-between">
                         <span className="text-sm font-bold text-slate-300">Random Questions</span>
                         <button onClick={() => setRandomQuestions(!randomQuestions)}>
                           {randomQuestions ? <ToggleRight className="w-8 h-8 text-indigo-400" /> : <ToggleLeft className="w-8 h-8 text-slate-500" />}
                         </button>
                      </div>
                      <div className="flex items-center justify-between">
                         <span className="text-sm font-bold text-slate-300">AI Adaptive Questions</span>
                         <button onClick={() => setAiAdaptive(!aiAdaptive)}>
                           {aiAdaptive ? <ToggleRight className="w-8 h-8 text-indigo-400" /> : <ToggleLeft className="w-8 h-8 text-slate-500" />}
                         </button>
                      </div>
                   </div>
                </div>
              </div>

              {/* 8. Start Test Button */}
              <div className="bg-gradient-to-r from-indigo-900/20 to-purple-900/20 backdrop-blur-sm border border-indigo-500/20 rounded-[24px] p-8 lg:p-12 flex flex-col items-center justify-center text-center shadow-lg shadow-indigo-500/5">
                 <h2 className="text-3xl font-bold text-white mb-6">Ready to Start?</h2>
                 <div className="flex flex-wrap justify-center gap-3 mb-8 max-w-4xl">
                   {[
                     { label: 'Company', val: selectedCompany },
                     { label: 'Job Role', val: selectedRole },
                     { label: 'Mode', val: selectedMode },
                     { label: 'Difficulty', val: selectedDifficulty },
                     { label: 'Category', val: selectedCategory },
                     { label: 'Language', val: selectedLanguage },
                     { label: 'Time', val: timeLimit ? \`\${timeLimit} min\` : null }
                   ].map((check, i) => (
                     <div key={i} className={\`flex items-center gap-2 px-4 py-2 rounded-full text-sm font-bold border transition-colors \${check.val ? 'bg-emerald-500/10 border-emerald-500/30 text-emerald-400' : 'bg-slate-900 border-white/10 text-slate-500'}\`}>
                       {check.val ? <Check className="w-4 h-4" /> : <span className="w-4 h-4 rounded-full border border-slate-600 flex items-center justify-center"><div className="w-1.5 h-1.5 rounded-full bg-slate-600" /></span>}
                       {check.label}: {check.val || 'Pending'}
                     </div>
                   ))}
                 </div>
                 <button onClick={() => {
                   setHasCompletedTest(true);
                   window.scrollTo({ top: document.body.scrollHeight, behavior: 'smooth' });
                 }} className="px-12 py-5 bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-500 hover:to-purple-500 text-white rounded-2xl font-bold text-lg shadow-xl shadow-indigo-500/25 transition-all flex items-center gap-3 group">
                   Start AI Mock Test
                   <Play className="w-6 h-6 fill-current group-hover:translate-x-1 transition-transform" />
                 </button>
              </div>

              {/* 4. AI Recommendation (One large card) */}
`;

const startIndex1 = content.indexOf(startTag1);
const endIndex1 = content.indexOf(endTag1);

content = content.substring(0, startIndex1) + section1 + content.substring(endIndex1 + endTag1.length);
fs.writeFileSync('src/pages/MockTest.tsx', content);

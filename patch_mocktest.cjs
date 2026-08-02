const fs = require('fs');
let content = fs.readFileSync('src/pages/MockTest.tsx', 'utf-8');

// 1. Add isFormComplete
content = content.replace(
  /const filteredServiceCompanies = COMPANIES.Service.filter\(c => c.name.toLowerCase\(\).includes\(companySearchQuery.toLowerCase\(\)\)\);/,
  `const filteredServiceCompanies = COMPANIES.Service.filter(c => c.name.toLowerCase().includes(companySearchQuery.toLowerCase()));
  
  const isFormComplete = selectedCompany && selectedRole && selectedDifficulty && selectedLanguage && timeLimit;`
);

// 2. Remove "Start Test" from Quick Filter Bar
content = content.replace(
  /<button onClick=\{\(\) => \{\s*setHasCompletedTest\(true\);\s*window.scrollTo\(\{ top: document.body.scrollHeight, behavior: 'smooth' \}\);\s*\}\} className="px-5 py-2.5 bg-indigo-500 hover:bg-indigo-600 text-white rounded-xl font-bold text-sm transition-colors shadow-lg shadow-indigo-500\/20 whitespace-nowrap">\s*Start Test\s*<\/button>/,
  ''
);

// 3. Remove "AI Mock Test Overview" and just keep the button
content = content.replace(
  /\{\/\* 1\. AI Mock Test Overview \*\/\}.*?🚀 Start AI Mock Test\s*<\/button>\s*<\/div>\s*<\/div>/s,
  `{/* Start Mock Test Button */}
              <div className="flex justify-center mt-8 mb-12">
                <button 
                  disabled={!isFormComplete}
                  onClick={() => {
                      setHasCompletedTest(true);
                      window.scrollTo({ top: document.body.scrollHeight, behavior: 'smooth' });
                  }} 
                  className={\`px-12 py-5 rounded-2xl font-bold text-lg transition-all flex items-center gap-3 shadow-xl \${
                    isFormComplete 
                      ? 'bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-500 hover:to-purple-500 text-white shadow-indigo-500/25 cursor-pointer' 
                      : 'bg-slate-800 text-slate-500 border border-slate-700 shadow-none cursor-not-allowed'
                  }\`}
                >
                  Start Mock Test
                </button>
              </div>`
);

// 4. Remove "Video Mode" from Guidelines
content = content.replace(
  /<div className="bg-slate-900\/40 border border-white\/5 rounded-\[24px\] p-6 hover:bg-slate-800\/60 transition-colors">\s*<div className="w-12 h-12 rounded-xl bg-pink-500\/10 flex items-center justify-center mb-5">\s*<Video className="w-6 h-6 text-pink-400" \/>\s*<\/div>\s*<h3 className="font-bold text-white mb-3 text-lg">Video Mode<\/h3>\s*<ul className="text-sm text-slate-400 space-y-2 list-disc pl-4">\s*<li>Maintain eye contact.<\/li>\s*<li>Ensure proper lighting.<\/li>\s*<li>Frame yourself well.<\/li>\s*<\/ul>\s*<\/div>/,
  ''
);

// 5. Remove "Coding Test" from Guidelines
content = content.replace(
  /<div className="bg-slate-900\/40 border border-white\/5 rounded-\[24px\] p-6 hover:bg-slate-800\/60 transition-colors">\s*<div className="w-12 h-12 rounded-xl bg-emerald-500\/10 flex items-center justify-center mb-5">\s*<Code className="w-6 h-6 text-emerald-400" \/>\s*<\/div>\s*<h3 className="font-bold text-white mb-3 text-lg">Coding Test<\/h3>\s*<ul className="text-sm text-slate-400 space-y-2 list-disc pl-4">\s*<li>Write optimized code.<\/li>\s*<li>Use efficient algorithms.<\/li>\s*<li>Test for edge cases.<\/li>\s*<\/ul>\s*<\/div>/,
  ''
);

// 6. Remove "Coding Problems" from Recommended Practice
content = content.replace(
  /<div className="bg-slate-900\/40 border border-white\/5 rounded-3xl p-8 hover:bg-slate-800\/60 transition-colors flex flex-col group">\s*<div className="w-14 h-14 rounded-2xl bg-red-500\/10 flex items-center justify-center mb-6 group-hover:scale-105 transition-transform">\s*<Code className="w-7 h-7 text-red-400" \/>\s*<\/div>\s*<h3 className="text-lg font-bold text-white mb-2">Coding Problems<\/h3>\s*<div className="text-sm text-red-400 font-bold mb-4">Hard<\/div>\s*<p className="text-slate-400 mb-8 leading-relaxed flex-1">Master state transitions and memoization to ace DP rounds.<\/p>\s*<button className="w-full py-3.5 bg-white\/5 hover:bg-white\/10 text-white rounded-xl font-bold transition-colors border border-white\/5">Practice Now<\/button>\s*<\/div>/,
  ''
);

fs.writeFileSync('src/pages/MockTest.tsx', content);

const fs = require('fs');
let content = fs.readFileSync('src/pages/MockTest.tsx', 'utf8');

const target = `<div className="relative w-full xl:w-64">
                     <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                       <Search className="h-4 w-4 text-slate-400" />
                     </div>
                     <input 
                       type="text" 
                       placeholder="Search tests..." 
                       className="w-full bg-slate-950/50 border border-white/5 rounded-xl pl-10 pr-4 py-2.5 text-sm text-slate-200 focus:outline-none focus:border-indigo-500 hover:bg-slate-900 transition-colors"
                     />
                   </div>`;
                   
const replacement = `<div className="flex items-center gap-3 w-full xl:w-auto">
                     <div className="relative flex-1 xl:w-64">
                       <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                         <Search className="h-4 w-4 text-slate-400" />
                       </div>
                       <input 
                         type="text" 
                         placeholder="Search tests..." 
                         className="w-full bg-slate-950/50 border border-white/5 rounded-xl pl-10 pr-4 py-2.5 text-sm text-slate-200 focus:outline-none focus:border-indigo-500 hover:bg-slate-900 transition-colors"
                       />
                     </div>
                     <button onClick={() => {
                        setHasCompletedTest(true);
                        window.scrollTo({ top: document.body.scrollHeight, behavior: 'smooth' });
                     }} className="px-5 py-2.5 bg-indigo-500 hover:bg-indigo-600 text-white rounded-xl font-bold text-sm transition-colors shadow-lg shadow-indigo-500/20 whitespace-nowrap">
                        Start Test
                     </button>
                   </div>`;

content = content.replace(target, replacement);
fs.writeFileSync('src/pages/MockTest.tsx', content);
console.log("Added Start Test button to filter bar.");

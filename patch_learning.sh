cat << 'INNER_EOF' > src/components/dashboard/ContinueLearning.tsx
import React from 'react';
import { ArrowRight, FileText, Mic, FileEdit, Code2, Map } from 'lucide-react';
import { motion } from 'motion/react';
import { useDashboardData } from '../../hooks/useDashboardData';

const LEARNING_MODULES = [
  { title: 'Resume Analyzer', desc: 'Optimize your CV', icon: FileText, color: 'from-blue-500 to-indigo-500', progress: 100, isDone: true },
  { title: 'System Design', desc: 'Architecture basics', icon: Map, color: 'from-fuchsia-500 to-pink-500', progress: 60, isDone: false },
  { title: 'Mock Interview', desc: 'Behavioral prep', icon: Mic, color: 'from-emerald-500 to-teal-500', progress: 0, isDone: false },
  { title: 'Coding Test', desc: 'Data structures', icon: Code2, color: 'from-orange-500 to-amber-500', progress: 25, isDone: false },
  { title: 'Peer Mock', desc: 'Practice with others', icon: FileEdit, color: 'from-purple-500 to-indigo-500', progress: 0, isDone: false },
];

export default function ContinueLearning() {
  const { hasData } = useDashboardData();

  return (
    <div>
      <div className="flex items-center justify-between mb-5">
        <h2 className="text-base font-semibold text-white">Continue Learning</h2>
      </div>
      
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
        {LEARNING_MODULES.map((module, idx) => {
          const progress = hasData ? module.progress : 0;
          const isDone = hasData ? module.isDone : false;

          return (
            <motion.div
              key={idx}
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: idx * 0.05 }}
              className="bg-slate-900/40 backdrop-blur-md border border-white/5 rounded-[20px] p-5 hover:bg-slate-900/60 hover:border-white/10 transition-all group flex flex-col h-full shadow-sm"
            >
              <div className={\`w-10 h-10 rounded-xl bg-gradient-to-br \${module.color} flex items-center justify-center shadow-lg mb-4 opacity-90 group-hover:opacity-100 shrink-0\`}>
                <module.icon className="w-4 h-4 text-white" />
              </div>
              
              <div className="flex-1">
                <h3 className="text-[13px] font-semibold text-white mb-1">{module.title}</h3>
                <p className="text-[11px] text-slate-400 mb-4">{module.desc}</p>
              </div>
              
              <div className="w-full mt-auto">
                <div className="flex items-center justify-between mb-1.5">
                  <span className="text-[10px] font-medium text-slate-400">Progress</span>
                  <span className="text-[10px] font-bold text-white">{progress}%</span>
                </div>
                <div className="w-full bg-white/10 rounded-full h-1.5 mb-4 overflow-hidden">
                  <div 
                    className={\`bg-gradient-to-r \${module.color} h-1.5 rounded-full transition-all duration-1000\`} 
                    style={{ width: \`\${progress}%\` }}
                  />
                </div>
                
                <button className="w-full py-2 bg-white/5 hover:bg-white/10 text-white text-[11px] font-semibold rounded-lg flex items-center justify-center gap-1.5 transition-colors border border-transparent hover:border-white/5">
                  {progress === 0 ? 'Start' : isDone ? 'Review' : 'Continue'}
                  <ArrowRight className="w-3 h-3 group-hover:translate-x-0.5 transition-transform" />
                </button>
              </div>
            </motion.div>
          );
        })}
      </div>
    </div>
  );
}
INNER_EOF

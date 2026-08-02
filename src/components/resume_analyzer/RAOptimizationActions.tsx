import React from 'react';
import { RefreshCw, FileEdit, Type, Code2, PenTool, Layout, Wand2, Download, Search, Briefcase } from 'lucide-react';

const actions = [
  { icon: FileEdit, label: 'Rewrite Summary' },
  { icon: Code2, label: 'Improve Projects' },
  { icon: Type, label: 'Optimize Skills' },
  { icon: Search, label: 'Add ATS Keywords' },
  { icon: Briefcase, label: 'Rewrite Experience' },
  { icon: Layout, label: 'Fix Formatting' },
];

export default function RAOptimizationActions() {
  return (
    <div className="h-full bg-slate-900 border border-white/5 rounded-[32px] p-6 md:p-8 flex flex-col">
      <h2 className="text-xl font-bold text-white mb-2">Resume Optimization</h2>
      <p className="text-sm text-slate-400 mb-8">Take action to improve your resume instantly.</p>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-1 gap-3 mb-8">
        {actions.map((action, i) => (
          <button key={i} className="flex items-center justify-between p-4 rounded-xl bg-slate-950 border border-white/5 hover:border-indigo-500/30 group transition-all text-left">
            <div className="flex items-center gap-3">
              <action.icon className="w-5 h-5 text-slate-400 group-hover:text-indigo-400 transition-colors" />
              <span className="font-semibold text-slate-300 group-hover:text-white transition-colors">{action.label}</span>
            </div>
            <RefreshCw className="w-4 h-4 text-slate-600 opacity-0 group-hover:opacity-100 transition-all" />
          </button>
        ))}
      </div>

      <div className="mt-auto space-y-3">
        <button className="w-full py-4 rounded-xl bg-gradient-to-r from-indigo-600 to-purple-600 text-white font-bold flex items-center justify-center gap-2 hover:opacity-90 transition-opacity shadow-lg shadow-indigo-500/20">
          <Wand2 className="w-5 h-5" /> Generate Better Resume
        </button>
        <button className="w-full py-4 rounded-xl bg-slate-800 text-slate-300 font-bold border border-white/5 hover:bg-white/5 hover:text-white transition-all flex items-center justify-center gap-2">
          <Download className="w-5 h-5" /> Download Optimized PDF
        </button>
      </div>
    </div>
  );
}

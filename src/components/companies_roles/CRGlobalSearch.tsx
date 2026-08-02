import React from 'react';
import { Search } from 'lucide-react';

export default function CRGlobalSearch({ 
  value, 
  onChange 
}: { 
  value: string; 
  onChange: (val: string) => void;
}) {
  return (
    <div className="relative max-w-3xl mx-auto w-full group">
      <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
        <Search className="h-5 w-5 text-slate-400 group-focus-within:text-indigo-400 transition-colors" />
      </div>
      <input
        type="text"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="block w-full pl-11 pr-4 py-4 bg-slate-900 border border-white/10 rounded-2xl text-slate-50 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-indigo-500/50 focus:border-indigo-500/50 shadow-sm transition-all text-lg"
        placeholder="Search Google, Amazon, SDE, Java, React..."
      />
      <div className="absolute inset-y-0 right-0 pr-2 flex items-center">
        <div className="hidden sm:flex items-center gap-1 px-2 py-1 rounded bg-slate-800 text-xs text-slate-400 font-mono border border-white/5">
          <span>⌘</span>
          <span>K</span>
        </div>
      </div>
    </div>
  );
}

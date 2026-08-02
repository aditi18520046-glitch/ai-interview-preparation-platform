import React from 'react';

export default function DashboardFooter() {
  return (
    <footer className="mt-12 py-6 border-t border-white/10 flex flex-col md:flex-row items-center justify-between gap-4">
      <div className="flex items-center gap-2">
        <div className="w-6 h-6 rounded bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center opacity-80">
          <div className="w-3 h-3 border-2 border-white rounded-sm" />
        </div>
        <p className="text-xs text-slate-500">&copy; {new Date().getFullYear()} InterviewAI Platform.</p>
      </div>
      
      <div className="flex items-center gap-6">
        <a href="#" className="text-xs font-medium text-slate-500 hover:text-slate-300 transition-colors">Privacy Policy</a>
        <a href="#" className="text-xs font-medium text-slate-500 hover:text-slate-300 transition-colors">Terms & Conditions</a>
        <a href="#" className="text-xs font-medium text-slate-500 hover:text-slate-300 transition-colors">About</a>
        <a href="#" className="text-xs font-medium text-slate-500 hover:text-slate-300 transition-colors">Support</a>
        <span className="text-xs font-medium text-slate-600">v2.4.0</span>
      </div>
    </footer>
  );
}

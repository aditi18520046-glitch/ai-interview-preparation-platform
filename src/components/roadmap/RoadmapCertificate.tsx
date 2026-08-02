import React from 'react';
import { Award, Download, Share2 } from 'lucide-react';

export default function RoadmapCertificate() {
  return (
    <div className="bg-gradient-to-r from-indigo-500 to-purple-600 rounded-[32px] p-1">
      <div className="bg-slate-900 rounded-[30px] p-8 md:p-12 text-center relative overflow-hidden">
        {/* Confetti or glow effects */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-full bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-indigo-500/20 via-transparent to-transparent pointer-events-none" />
        
        <div className="w-20 h-20 rounded-2xl bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center mx-auto mb-6 shadow-xl shadow-indigo-500/30">
          <Award className="w-10 h-10 text-white" />
        </div>
        
        <h2 className="text-3xl font-extrabold text-white mb-2 tracking-tight">Congratulations!</h2>
        <p className="text-lg text-slate-300 mb-8 max-w-xl mx-auto">
          You have successfully completed the entire interview preparation roadmap. Your readiness score indicates you are fully prepared for top tech interviews.
        </p>
        
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <button className="w-full sm:w-auto px-8 py-3.5 rounded-xl bg-white text-slate-900 font-bold text-[15px] shadow-lg hover:-translate-y-0.5 transition-all flex items-center justify-center gap-2">
            <Download className="w-5 h-5" /> Download Certificate
          </button>
          <button className="w-full sm:w-auto px-8 py-3.5 rounded-xl bg-slate-800 text-white font-bold text-[15px] border border-white/10 hover:bg-slate-700 transition-all flex items-center justify-center gap-2">
            <Share2 className="w-5 h-5" /> Share Achievement
          </button>
        </div>
      </div>
    </div>
  );
}

import React from 'react';
import { Target, Lightbulb } from 'lucide-react';

export default function RAScores() {
  const overallScore = 78;

  return (
    <div className="bg-slate-900 border border-white/5 rounded-[32px] p-8 md:p-12">
      <div className="flex flex-col md:flex-row items-center gap-10">
        
        {/* Circular Overall Score */}
        <div className="relative w-48 h-48 flex-shrink-0">
          {/* Background Circle */}
          <svg className="w-full h-full transform -rotate-90" viewBox="0 0 100 100">
            <circle cx="50" cy="50" r="45" fill="none" stroke="currentColor" strokeWidth="8" className="text-slate-800" />
            <circle 
              cx="50" cy="50" r="45" 
              fill="none" stroke="currentColor" strokeWidth="8" strokeLinecap="round"
              className="text-indigo-500 drop-shadow-[0_0_8px_rgba(99,102,241,0.5)]"
              strokeDasharray="282.7" 
              strokeDashoffset={282.7 - (282.7 * overallScore) / 100}
            />
          </svg>
          <div className="absolute inset-0 flex flex-col items-center justify-center">
            <span className="text-5xl font-bold text-white">{overallScore}</span>
            <span className="text-sm text-slate-400 font-medium">/ 100</span>
          </div>
        </div>

        {/* Text Explanation */}
        <div className="text-center md:text-left flex-1">
          <h2 className="text-3xl font-bold text-white mb-4">Overall Resume Quality</h2>
          <div className="bg-indigo-500/10 border border-indigo-500/20 rounded-2xl p-6 flex items-start gap-4">
            <Lightbulb className="w-6 h-6 text-indigo-400 flex-shrink-0 mt-1" />
            <p className="text-lg text-slate-300 leading-relaxed">
              Your resume is well structured but can be improved by adding stronger project descriptions and more role-specific keywords to pass ATS scans effectively.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

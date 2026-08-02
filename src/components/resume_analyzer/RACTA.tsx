import React from 'react';
import { ArrowRight, Code2, Video } from 'lucide-react';
import { Link } from 'react-router-dom';

export default function RACTA() {
  return (
    <section className="bg-gradient-to-br from-indigo-900/40 to-purple-900/40 border border-indigo-500/20 rounded-[32px] p-8 md:p-16 text-center relative overflow-hidden">
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-2xl h-1/2 bg-indigo-500/20 blur-[100px] pointer-events-none" />
      
      <div className="relative z-10 max-w-3xl mx-auto">
        <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">Ready to maximize your interview success?</h2>
        <p className="text-lg text-indigo-200/80 mb-10">Improve your resume, strengthen your skills, and prepare for top companies with AI-powered guidance.</p>
        
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <Link 
            to="/dashboard/test"
            className="w-full sm:w-auto px-8 py-4 rounded-xl bg-white text-indigo-950 font-bold hover:bg-indigo-50 transition-colors flex items-center justify-center gap-2"
          >
            <Video className="w-5 h-5" /> Start Mock Interview
          </Link>
          <Link 
            to="/dashboard/coding"
            className="w-full sm:w-auto px-8 py-4 rounded-xl bg-indigo-500/20 text-white font-bold border border-indigo-500/30 hover:bg-indigo-500/30 transition-colors flex items-center justify-center gap-2"
          >
            <Code2 className="w-5 h-5" /> Practice Coding
          </Link>
        </div>
      </div>
    </section>
  );
}

import React from 'react';
import { Map, Zap, BookOpen } from 'lucide-react';
import roadmapImg from '../../assets/images/ai_learning_roadmap_1784623639911.jpg';

export default function RoadmapHero() {
  return (
    <div className="grid lg:grid-cols-2 gap-12 items-center bg-slate-900 border border-white/5 rounded-[32px] p-8 md:p-12 relative overflow-hidden">
      {/* Background Gradients */}
      <div className="absolute top-0 left-0 w-[500px] h-[500px] bg-indigo-500/10 rounded-full blur-[100px] -translate-x-1/2 -translate-y-1/2 pointer-events-none" />
      <div className="absolute bottom-0 right-0 w-[500px] h-[500px] bg-purple-500/10 rounded-full blur-[100px] translate-x-1/2 translate-y-1/2 pointer-events-none" />

      {/* Left side */}
      <div className="relative z-10 text-center lg:text-left">
        <div className="flex flex-wrap items-center justify-center lg:justify-start gap-3 mb-6">
          <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-indigo-500/10 border border-indigo-500/20 text-indigo-400 text-xs font-semibold">
            <Zap className="w-3.5 h-3.5" /> AI-Powered
          </div>
          <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-purple-500/10 border border-purple-500/20 text-purple-400 text-xs font-semibold">
            <Map className="w-3.5 h-3.5" /> Personalized Journey
          </div>
        </div>

        <h1 className="text-4xl md:text-5xl font-extrabold text-white mb-6 tracking-tight">
          Personalized AI <br className="hidden lg:block" />
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 to-purple-400">Learning Roadmap</span>
        </h1>
        
        <p className="text-lg text-slate-300 leading-relaxed max-w-2xl mx-auto lg:mx-0 mb-8">
          Create your complete interview preparation journey based on your target company, job role, experience level, and current skills. Learn in the right sequence, track your growth, and stay interview-ready with AI guidance.
        </p>
        
        <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4">
          <button className="w-full sm:w-auto px-8 py-3.5 rounded-xl bg-gradient-to-r from-indigo-500 to-purple-600 text-white font-bold text-[15px] shadow-lg shadow-indigo-500/25 hover:-translate-y-0.5 hover:shadow-indigo-500/40 transition-all flex items-center justify-center gap-2">
            <Zap className="w-5 h-5" /> Generate My Roadmap
          </button>
          <button className="w-full sm:w-auto px-8 py-3.5 rounded-xl bg-white/5 text-white font-bold text-[15px] border border-white/10 hover:bg-white/10 transition-all flex items-center justify-center gap-2">
            <BookOpen className="w-5 h-5" /> Explore Learning Paths
          </button>
        </div>
      </div>

      {/* Right side - 3D Illustration / Graphic */}
      <div className="flex justify-center items-center relative z-10 lg:h-[400px]">
         <div className="relative w-full max-w-[400px] aspect-square rounded-2xl overflow-hidden shadow-2xl border border-white/10 animate-in fade-in zoom-in duration-700">
            <img 
              src={roadmapImg} 
              alt="AI Learning Roadmap Illustration" 
              className="w-full h-full object-cover"
              referrerPolicy="no-referrer"
            />
         </div>
      </div>
    </div>
  );
}

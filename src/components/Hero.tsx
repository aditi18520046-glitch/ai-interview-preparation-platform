import React from 'react';
import { motion } from 'motion/react';
import { ChevronRight, Sparkles } from 'lucide-react';
import { Link } from 'react-router-dom';

export default function Hero() {
  return (
    <section className="pt-32 pb-20 px-6 lg:px-12 max-w-7xl mx-auto flex flex-col items-center text-center relative z-10">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-slate-800/50 border border-white/10 text-slate-200 text-sm font-medium mb-8 backdrop-blur-sm">
          <span className="text-orange-400">✨</span>
          <span>The #1 AI Interview Preparation Platform</span>
        </div>
        <h1 className="text-5xl md:text-7xl font-bold tracking-tight mb-6">
          Master Every <br />
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 via-purple-400 to-pink-400">
            Interview with AI
          </span>
        </h1>
        <p className="text-lg md:text-xl text-slate-400 max-w-3xl mx-auto mb-10 leading-relaxed">
          Practice realistic interviews through Text, Voice, and AI Video. Receive instant AI feedback, improve confidence, track your progress, and prepare for 300+ top companies.
        </p>
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <Link to="/login">
            <button className="px-8 py-4 bg-white text-slate-950 font-semibold rounded-full hover:bg-slate-200 transition-colors flex items-center gap-2 shadow-[0_0_20px_rgba(255,255,255,0.1)]">
              🚀 Start Interview Prep
              <ChevronRight className="w-5 h-5" />
            </button>
          </Link>
          <button className="px-8 py-4 bg-white/5 border border-white/10 font-semibold rounded-full hover:bg-white/10 transition-colors">
            View Features
          </button>
        </div>
      
        
        
        </motion.div>
    </section>
  );
}

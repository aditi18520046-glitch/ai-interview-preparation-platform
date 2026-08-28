import React from 'react';
import { motion } from 'motion/react';
import heroImage from '../assets/images/hero_ai_platform_1787791594926.jpg';

export default function DashboardPreview() {
  return (
    <section className="pb-24 px-6 lg:px-12 max-w-7xl mx-auto relative z-10">
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{ duration: 0.7, delay: 0.1 }}
        className="w-full flex justify-center"
      >
        <div className="relative w-full max-w-[90%] sm:max-w-[80%] md:max-w-[700px] lg:max-w-[800px] mx-auto">
          {/* Background Glow */}
          <div className="absolute inset-0 bg-gradient-to-tr from-indigo-500/30 to-purple-600/30 rounded-[2.5rem] blur-[80px] mix-blend-screen animate-pulse pointer-events-none -z-10"></div>
          
          <div className="rounded-2xl md:rounded-[2rem] overflow-hidden border border-white/10 shadow-[0_0_100px_rgba(99,102,241,0.15)] relative p-2 md:p-4 bg-slate-900/40 backdrop-blur-xl group">
            <div className="absolute inset-0 bg-gradient-to-br from-indigo-500/10 via-purple-500/5 to-transparent pointer-events-none"></div>
            
            <img 
              src={heroImage} 
              alt="AI Interview Dashboard Platform" 
              className="w-full h-auto rounded-xl md:rounded-2xl border border-white/5 relative z-10 object-cover shadow-2xl transition-transform duration-700 group-hover:scale-[1.01]"
            />
            
            {/* Overlay highlights */}
            <div className="absolute inset-0 rounded-2xl md:rounded-[2rem] border border-white/10 pointer-events-none z-20"></div>
            <div className="absolute top-0 left-1/4 w-1/2 h-[1px] bg-gradient-to-r from-transparent via-indigo-400 to-transparent opacity-50 z-20"></div>
          </div>
        </div>
      </motion.div>
    </section>
  );
}

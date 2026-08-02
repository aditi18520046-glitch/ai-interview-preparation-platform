import React from 'react';
import { motion } from 'motion/react';

const steps = [
  { num: '01', title: 'Select Role', desc: 'Choose your target role and company format.' },
  { num: '02', title: 'Practice', desc: 'Engage in a realistic AI mock interview.' },
  { num: '03', title: 'Review', desc: 'Get actionable feedback and scoring.' },
  { num: '04', title: 'Improve', desc: 'Follow the personalized roadmap to master skills.' },
];

export default function HowItWorks() {
  return (
    <section className="py-24 px-6 lg:px-12 max-w-7xl mx-auto text-center overflow-hidden">
      <h2 className="text-3xl md:text-5xl font-bold mb-16 text-white">How it works</h2>
      <div className="flex overflow-x-auto gap-6 md:gap-8 pb-12 snap-x snap-mandatory custom-scrollbar relative px-4 -mx-4 md:px-0 md:mx-0">
        {steps.map((step, idx) => (
          <motion.div
            key={idx}
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ delay: idx * 0.1 }}
            className="relative min-w-[280px] md:min-w-[320px] flex-1 snap-center bg-slate-900/40 backdrop-blur-md p-8 text-left rounded-3xl border border-white/10 shadow-2xl shrink-0 hover:bg-slate-900/60 transition-colors group"
          >
            <div className="text-7xl font-bold text-slate-800/80 mb-6 group-hover:text-indigo-500/20 transition-colors">{step.num}</div>
            <h3 className="text-xl font-semibold mb-3 text-white">{step.title}</h3>
            <p className="text-slate-400">{step.desc}</p>
          </motion.div>
        ))}
      </div>
    </section>
  );
}

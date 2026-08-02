import React from 'react';
import { motion } from 'motion/react';

const stats = [
  { value: '10k+', label: 'Active Users' },
  { value: '50k+', label: 'Interviews Conducted' },
  { value: '300+', label: 'Company Formats' },
  { value: '95%', label: 'Offer Rate' },
];

export default function Stats() {
  return (
    <section className="py-20 border-y border-white/5 bg-gradient-to-b from-transparent to-slate-900/50">
      <div className="max-w-7xl mx-auto px-6 lg:px-12">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
          {stats.map((stat, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.1 }}
            >
              <div className="text-4xl md:text-5xl font-bold text-white mb-2">{stat.value}</div>
              <div className="text-slate-400 font-medium">{stat.label}</div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

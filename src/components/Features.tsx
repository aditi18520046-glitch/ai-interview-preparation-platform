import React from 'react';
import { motion } from 'motion/react';
import { Bot, Code, BarChart3, Mic } from 'lucide-react';

const features = [
  {
    icon: Mic,
    title: 'Voice-Based Interviews',
    description: 'Practice with realistic conversational AI that adapts to your responses.',
    color: 'text-indigo-400',
    bg: 'bg-indigo-500/10'
  },
  {
    icon: Code,
    title: 'Coding Assessments',
    description: 'Solve real-world algorithmic challenges with built-in IDE and compilation.',
    color: 'text-emerald-400',
    bg: 'bg-emerald-500/10'
  },
  {
    icon: BarChart3,
    title: 'Detailed Analytics',
    description: 'Get deep insights into your performance, pacing, and technical accuracy.',
    color: 'text-purple-400',
    bg: 'bg-purple-500/10'
  },
  {
    icon: Bot,
    title: 'Personalized Coaching',
    description: 'Receive tailored feedback and study roadmaps based on your weaknesses.',
    color: 'text-blue-400',
    bg: 'bg-blue-500/10'
  }
];

export default function Features() {
  return (
    <section className="py-24 px-6 lg:px-12 max-w-7xl mx-auto">
      <div className="text-center mb-16">
        <h2 className="text-3xl md:text-5xl font-bold mb-4">Everything you need to succeed</h2>
        <p className="text-slate-400 max-w-2xl mx-auto text-lg">
          Our platform provides a comprehensive suite of tools designed to prepare you for any technical interview scenario.
        </p>
      </div>
      
      <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
        {features.map((feature, idx) => (
          <motion.div
            key={idx}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: idx * 0.1 }}
            className="p-6 rounded-2xl bg-slate-900/50 border border-white/5 hover:border-white/10 transition-colors"
          >
            <div className={`w-12 h-12 rounded-xl flex items-center justify-center mb-6 ${feature.bg}`}>
              <feature.icon className={`w-6 h-6 ${feature.color}`} />
            </div>
            <h3 className="text-xl font-semibold mb-3">{feature.title}</h3>
            <p className="text-slate-400 leading-relaxed">{feature.description}</p>
          </motion.div>
        ))}
      </div>
    </section>
  );
}

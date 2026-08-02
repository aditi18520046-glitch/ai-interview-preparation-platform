import React from 'react';
import { Star } from 'lucide-react';
import { motion } from 'motion/react';

const TESTIMONIALS = [
  {
    name: "Sarah Chen",
    role: "Software Engineer @ Google",
    image: "https://i.pravatar.cc/150?u=sarah",
    review: "The AI mock interviews felt incredibly realistic. The feedback on my system design answers was spot on and helped me crack the Google interview."
  },
  {
    name: "David Kim",
    role: "Product Manager @ Meta",
    image: "https://i.pravatar.cc/150?u=david",
    review: "I loved the personalized roadmap and the behavioral question practice. It completely transformed how I structured my STAR method responses."
  },
  {
    name: "Emily Watson",
    role: "Frontend Developer @ Adobe",
    image: "https://i.pravatar.cc/150?u=emily",
    review: "The resume analyzer caught things I had missed for months. Combined with the coding practice, this platform is an absolute game-changer."
  }
];

export default function Testimonials() {
  return (
    <section className="py-32 relative z-10 bg-slate-950/30">
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#4f4f4f2e_1px,transparent_1px),linear-gradient(to_bottom,#4f4f4f2e_1px,transparent_1px)] bg-[size:14px_24px] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)] opacity-20 pointer-events-none" />
      
      <div className="max-w-7xl mx-auto px-6 relative z-10">
        <div className="text-center mb-20">
          <h2 className="text-3xl md:text-5xl font-bold text-white mb-6">
            Loved by <span className="text-transparent bg-clip-text bg-gradient-to-r from-pink-400 to-rose-400">Thousands</span>
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {TESTIMONIALS.map((testimonial, idx) => (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.2, duration: 0.5 }}
              key={idx}
              className="p-8 rounded-[32px] bg-white/5 border border-white/10 backdrop-blur-sm flex flex-col gap-6 hover:bg-white/10 transition-colors duration-300"
            >
              <div className="flex gap-1">
                {[1, 2, 3, 4, 5].map((star) => (
                  <Star key={star} className="w-5 h-5 fill-yellow-400 text-yellow-400" />
                ))}
              </div>
              
              <p className="text-slate-300 leading-relaxed text-lg flex-1">
                "{testimonial.review}"
              </p>
              
              <div className="flex items-center gap-4 pt-6 border-t border-white/10">
                <img 
                  src={testimonial.image} 
                  alt={testimonial.name}
                  className="w-12 h-12 rounded-full border-2 border-indigo-500/50 object-cover"
                />
                <div>
                  <h4 className="text-white font-semibold">{testimonial.name}</h4>
                  <p className="text-slate-400 text-sm">{testimonial.role}</p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

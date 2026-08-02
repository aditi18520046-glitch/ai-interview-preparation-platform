import React from 'react';

export default function TrustedBy() {
  return (
    <section className="py-10 border-y border-white/5 bg-white/[0.02]">
      <div className="max-w-7xl mx-auto px-6 lg:px-12 text-center">
        <p className="text-sm font-medium text-slate-500 mb-6 uppercase tracking-widest">
          Trusted by developers from
        </p>
        <div className="flex flex-wrap justify-center items-center gap-8 md:gap-16 opacity-50 grayscale">
          {['Google', 'Microsoft', 'Amazon', 'Meta', 'Apple'].map((company) => (
            <span key={company} className="text-xl md:text-2xl font-bold text-slate-300">
              {company}
            </span>
          ))}
        </div>
      </div>
    </section>
  );
}

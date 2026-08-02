import React from 'react';
import { Target, Star, Building2, Briefcase, TrendingUp, Sparkles, PenTool, Search } from 'lucide-react';

const features = [
  { icon: Target, title: 'ATS Compatibility Score', desc: 'See how well your resume parses through Applicant Tracking Systems.', color: 'text-blue-400', bg: 'bg-blue-500/10' },
  { icon: Star, title: 'Resume Quality Score', desc: 'Get an overall grade based on industry standards and best practices.', color: 'text-yellow-400', bg: 'bg-yellow-500/10' },
  { icon: Building2, title: 'Company Matching', desc: 'Discover which top tech companies are the best fit for your profile.', color: 'text-indigo-400', bg: 'bg-indigo-500/10' },
  { icon: Briefcase, title: 'Job Role Recommendation', desc: 'Find the ideal positions that align perfectly with your skillset.', color: 'text-purple-400', bg: 'bg-purple-500/10' },
  { icon: TrendingUp, title: 'Skill Gap Analysis', desc: 'Identify missing skills that are holding you back from top roles.', color: 'text-orange-400', bg: 'bg-orange-500/10' },
  { icon: Sparkles, title: 'Improvement Suggestions', desc: 'Actionable, AI-driven tips to rewrite and enhance your bullet points.', color: 'text-emerald-400', bg: 'bg-emerald-500/10' },
  { icon: PenTool, title: 'Grammar & Writing Check', desc: 'Ensure flawless spelling, grammar, and impactful action verbs.', color: 'text-pink-400', bg: 'bg-pink-500/10' },
  { icon: Search, title: 'Keyword Optimization', desc: 'Learn which keywords to add to get noticed by recruiters.', color: 'text-cyan-400', bg: 'bg-cyan-500/10' },
];

export default function RAFeatures() {
  return (
    <section>
      <div className="text-center mb-12">
        <h2 className="text-3xl font-bold text-white mb-4">AI Resume Analysis Features</h2>
        <p className="text-slate-400 max-w-2xl mx-auto">Our advanced AI engine breaks down every section of your resume to provide unparalleled insights and actionable feedback.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {features.map((feature, i) => (
          <div key={i} className="bg-slate-900 border border-white/5 rounded-2xl p-6 hover:border-indigo-500/30 transition-colors group">
            <div className={`w-12 h-12 rounded-xl ${feature.bg} flex items-center justify-center mb-6`}>
              <feature.icon className={`w-6 h-6 ${feature.color}`} />
            </div>
            <h3 className="text-lg font-bold text-white mb-2 group-hover:text-indigo-400 transition-colors">{feature.title}</h3>
            <p className="text-sm text-slate-400 leading-relaxed">{feature.desc}</p>
          </div>
        ))}
      </div>
    </section>
  );
}

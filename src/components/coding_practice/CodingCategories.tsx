import React from 'react';
import { 
  Code2, 
  Database, 
  Binary, 
  Server, 
  Cpu, 
  Globe, 
  Brain, 
  Cloud, 
  ShieldCheck, 
  Swords, 
  ArrowRight 
} from 'lucide-react';

export default function CodingCategories() {
  const categories = [
    {
      title: "Programming Languages",
      description: "Practice language-specific coding problems and syntax challenges.",
      topics: 24,
      icon: Code2,
      color: "text-blue-400",
      bg: "bg-blue-500/10",
      border: "border-blue-500/20"
    },
    {
      title: "Data Structures",
      description: "Master essential data structures used in technical interviews.",
      topics: 18,
      icon: Database,
      color: "text-emerald-400",
      bg: "bg-emerald-500/10",
      border: "border-emerald-500/20"
    },
    {
      title: "Algorithms",
      description: "Learn problem-solving techniques and algorithmic patterns.",
      topics: 45,
      icon: Binary,
      color: "text-purple-400",
      bg: "bg-purple-500/10",
      border: "border-purple-500/20"
    },
    {
      title: "SQL & Database",
      description: "Practice SQL queries, joins, indexing, normalization, and database concepts.",
      topics: 32,
      icon: Server,
      color: "text-orange-400",
      bg: "bg-orange-500/10",
      border: "border-orange-500/20"
    },
    {
      title: "Core Computer Science",
      description: "Operating Systems, DBMS, Computer Networks, OOP, System Design.",
      topics: 50,
      icon: Cpu,
      color: "text-indigo-400",
      bg: "bg-indigo-500/10",
      border: "border-indigo-500/20"
    },
    {
      title: "Web Development",
      description: "Frontend, Backend, APIs, Authentication, React, Node.js and related technologies.",
      topics: 60,
      icon: Globe,
      color: "text-cyan-400",
      bg: "bg-cyan-500/10",
      border: "border-cyan-500/20"
    },
    {
      title: "AI & Machine Learning",
      description: "Python, NumPy, Pandas, TensorFlow, PyTorch, Scikit-Learn, Prompt Engineering.",
      topics: 40,
      icon: Brain,
      color: "text-pink-400",
      bg: "bg-pink-500/10",
      border: "border-pink-500/20"
    },
    {
      title: "Cloud & DevOps",
      description: "AWS, Azure, Docker, Kubernetes, Linux, Git and deployment concepts.",
      topics: 28,
      icon: Cloud,
      color: "text-sky-400",
      bg: "bg-sky-500/10",
      border: "border-sky-500/20"
    },
    {
      title: "Cyber Security",
      description: "Networking, Cryptography, Web Security, Secure Coding, OWASP.",
      topics: 20,
      icon: ShieldCheck,
      color: "text-red-400",
      bg: "bg-red-500/10",
      border: "border-red-500/20"
    },
    {
      title: "Competitive Programming",
      description: "Timed coding challenges and contest preparation.",
      topics: 15,
      icon: Swords,
      color: "text-yellow-400",
      bg: "bg-yellow-500/10",
      border: "border-yellow-500/20"
    }
  ];

  return (
    <div className="space-y-8">
      <div className="text-center md:text-left">
        <h2 className="text-2xl md:text-3xl font-bold text-white">Choose Your Learning Area</h2>
        <p className="text-slate-400 mt-2 text-lg">Explore carefully curated categories tailored for interviews.</p>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
        {categories.map((category, idx) => (
          <div 
            key={idx} 
            className="group bg-slate-900 border border-white/5 rounded-[18px] p-6 hover:border-indigo-500/30 hover:bg-slate-800/80 transition-all duration-300 cursor-pointer flex flex-col h-full shadow-lg shadow-black/10"
          >
            <div className={`w-12 h-12 rounded-xl ${category.bg} border ${category.border} flex items-center justify-center mb-4 shrink-0 group-hover:scale-110 transition-transform`}>
              <category.icon className={`w-6 h-6 ${category.color}`} />
            </div>
            
            <h3 className="text-lg font-bold text-slate-100 mb-2 group-hover:text-indigo-300 transition-colors">{category.title}</h3>
            <p className="text-sm text-slate-400 leading-relaxed mb-6 flex-grow">{category.description}</p>
            
            <div className="flex items-center justify-between mt-auto pt-4 border-t border-white/5">
              <span className="text-xs font-semibold text-slate-500 bg-slate-800 px-3 py-1.5 rounded-lg">{category.topics} Topics</span>
              <ArrowRight className="w-4 h-4 text-slate-500 group-hover:text-indigo-400 transition-colors transform group-hover:translate-x-1" />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

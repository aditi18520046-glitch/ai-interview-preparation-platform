cat << 'INNER_EOF' > src/components/coding_practice/CodingHero.tsx
import React from 'react';
import { Play, ArrowRight } from 'lucide-react';

export default function CodingHero({ onStart }: { onStart: () => void }) {
  return (
    <div className="relative overflow-hidden bg-slate-900 border border-white/5 rounded-[24px] shadow-sm flex flex-col items-center justify-center text-center min-h-[420px] max-h-[480px] p-8 lg:p-16">
      <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-gradient-to-br from-indigo-500/20 via-purple-500/10 to-transparent rounded-full blur-[100px] pointer-events-none -translate-y-1/2 translate-x-1/4" />
      <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-gradient-to-tr from-blue-500/20 via-indigo-500/10 to-transparent rounded-full blur-[100px] pointer-events-none translate-y-1/2 -translate-x-1/4" />
      
      <div className="relative z-10 space-y-8 max-w-4xl mx-auto flex flex-col items-center">
        <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white leading-tight tracking-tight">
          Master Coding Interviews with <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 to-purple-400">AI</span>
        </h1>
        <p className="text-lg md:text-xl text-slate-300 leading-relaxed max-w-3xl">
          Practice programming languages, data structures, algorithms, SQL, and computer science concepts through structured learning paths, AI-assisted coding, and interview-focused challenges.
        </p>
        
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-4 w-full sm:w-auto">
          <button 
            onClick={onStart}
            className="w-full sm:w-auto px-8 py-4 rounded-xl bg-gradient-to-r from-indigo-600 to-purple-600 text-white font-bold text-[16px] shadow-lg shadow-indigo-500/25 hover:-translate-y-0.5 hover:shadow-indigo-500/40 transition-all flex items-center justify-center gap-2"
          >
            <Play className="w-5 h-5 fill-current" /> Start Coding
          </button>
          <button className="w-full sm:w-auto px-8 py-4 rounded-xl bg-white/5 text-white font-bold text-[16px] border border-white/10 hover:bg-white/10 transition-all flex items-center justify-center gap-2">
            Continue Practice <ArrowRight className="w-5 h-5" />
          </button>
        </div>
      </div>
    </div>
  );
}
INNER_EOF

cat << 'INNER_EOF' > src/components/coding_practice/CodingCategories.tsx
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
INNER_EOF

cat << 'INNER_EOF' > src/components/coding_practice/CodingLearningPaths.tsx
import React from 'react';
import { Route, Clock, BookOpen, ArrowRight } from 'lucide-react';

export default function CodingLearningPaths() {
  const paths = [
    { title: "Java Interview Preparation", difficulty: "Medium", time: "40 Hours", lessons: 120 },
    { title: "Python Programming Path", difficulty: "Easy", time: "25 Hours", lessons: 85 },
    { title: "Dynamic Programming Roadmap", difficulty: "Hard", time: "50 Hours", lessons: 75 },
    { title: "SQL Interview Track", difficulty: "Medium", time: "30 Hours", lessons: 90 },
    { title: "Frontend Development Path", difficulty: "Medium", time: "45 Hours", lessons: 110 },
    { title: "Backend Development Path", difficulty: "Hard", time: "60 Hours", lessons: 140 },
    { title: "Machine Learning Roadmap", difficulty: "Hard", time: "80 Hours", lessons: 150 },
  ];

  const getDiffColor = (diff: string) => {
    switch(diff) {
      case 'Easy': return 'text-emerald-400 bg-emerald-500/10 border-emerald-500/20';
      case 'Medium': return 'text-orange-400 bg-orange-500/10 border-orange-500/20';
      case 'Hard': return 'text-red-400 bg-red-500/10 border-red-500/20';
      default: return 'text-slate-400 bg-slate-500/10 border-slate-500/20';
    }
  };

  return (
    <div className="space-y-8">
      <div className="text-center md:text-left">
        <h2 className="text-2xl md:text-3xl font-bold text-white flex items-center gap-3 justify-center md:justify-start">
          <Route className="w-8 h-8 text-indigo-400" /> Recommended Learning Paths
        </h2>
        <p className="text-slate-400 mt-2 text-lg">Structured curricula designed to take you from beginner to interview-ready.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {paths.map((path, idx) => (
          <div key={idx} className="bg-slate-900 border border-white/5 rounded-[18px] p-6 flex flex-col hover:border-indigo-500/30 hover:bg-slate-800/50 transition-all group shadow-lg shadow-black/10">
            <div className="mb-4">
              <span className={`inline-block px-3 py-1 rounded-lg text-xs font-bold border uppercase tracking-wider ${getDiffColor(path.difficulty)}`}>
                {path.difficulty}
              </span>
            </div>
            <h3 className="text-xl font-bold text-slate-100 mb-4 group-hover:text-indigo-300 transition-colors">{path.title}</h3>
            
            <div className="flex items-center gap-4 text-sm text-slate-400 font-medium mb-8">
              <div className="flex items-center gap-1.5 bg-slate-950/50 px-3 py-1.5 rounded-lg border border-white/5">
                <Clock className="w-4 h-4 text-slate-500" /> {path.time}
              </div>
              <div className="flex items-center gap-1.5 bg-slate-950/50 px-3 py-1.5 rounded-lg border border-white/5">
                <BookOpen className="w-4 h-4 text-slate-500" /> {path.lessons} Lessons
              </div>
            </div>
            
            <div className="mt-auto pt-4 border-t border-white/5">
              <button className="w-full py-3 rounded-xl bg-white/5 text-white font-bold text-sm border border-white/10 hover:bg-indigo-600 hover:border-indigo-500 transition-all flex items-center justify-center gap-2 group-hover:shadow-lg group-hover:shadow-indigo-500/20">
                Start Learning <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
INNER_EOF

cat << 'INNER_EOF' > src/components/coding_practice/CodingDailyChallenge.tsx
import React from 'react';
import { Calendar, Clock, Zap, Play } from 'lucide-react';

export default function CodingDailyChallenge({ onSolve }: { onSolve: () => void }) {
  return (
    <div className="space-y-8">
      <div className="text-center md:text-left">
        <h2 className="text-2xl md:text-3xl font-bold text-white flex items-center gap-3 justify-center md:justify-start">
          <Calendar className="w-8 h-8 text-orange-400" /> Daily Coding Challenge
        </h2>
        <p className="text-slate-400 mt-2 text-lg">Keep your streak alive with today's featured problem.</p>
      </div>

      <div className="bg-gradient-to-br from-slate-900 to-slate-950 border border-white/5 rounded-[18px] p-6 md:p-8 flex flex-col md:flex-row items-center justify-between gap-8 shadow-xl shadow-black/20 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-64 h-64 bg-orange-500/10 rounded-full blur-[80px] pointer-events-none -translate-y-1/2 translate-x-1/2" />
        
        <div className="flex-1 space-y-4 relative z-10 w-full text-center md:text-left">
          <div className="flex items-center justify-center md:justify-start gap-3">
            <span className="px-3 py-1 rounded-lg text-xs font-bold border uppercase tracking-wider text-orange-400 bg-orange-500/10 border-orange-500/20">
              Medium
            </span>
            <span className="text-sm font-semibold text-slate-400">July 19, 2026</span>
          </div>
          
          <h3 className="text-2xl md:text-3xl font-bold text-slate-100">Longest Palindromic Substring</h3>
          
          <div className="flex flex-wrap items-center justify-center md:justify-start gap-4 text-sm font-medium">
            <div className="flex items-center gap-1.5 text-slate-300 bg-white/5 px-4 py-2 rounded-xl border border-white/5">
              <Clock className="w-4 h-4 text-slate-400" /> 25 mins estimated
            </div>
            <div className="flex items-center gap-1.5 text-amber-300 bg-amber-500/10 px-4 py-2 rounded-xl border border-amber-500/20">
              <Zap className="w-4 h-4 fill-amber-400 text-amber-400" /> +50 XP Reward
            </div>
          </div>
        </div>
        
        <div className="w-full md:w-auto relative z-10 shrink-0">
          <button 
            onClick={onSolve}
            className="w-full md:w-auto px-8 py-4 rounded-xl bg-orange-600 hover:bg-orange-500 text-white font-bold text-[16px] shadow-lg shadow-orange-600/20 transition-all flex items-center justify-center gap-2"
          >
            <Play className="w-5 h-5 fill-current" /> Start Challenge
          </button>
        </div>
      </div>
    </div>
  );
}
INNER_EOF

cat << 'INNER_EOF' > src/components/coding_practice/CodingProblemTable.tsx
import React from 'react';
import { CheckCircle2, Circle, Clock, Zap, Bookmark, ListTodo } from 'lucide-react';

export default function CodingProblemTable({ onSolve }: { onSolve: (id: string) => void }) {
  const problems = [
    { id: '1', status: 'Solved', name: 'Two Sum', diff: 'Easy', topic: 'Arrays, Hash Table', time: '15m', xp: 10, bookmarked: true },
    { id: '2', status: 'Attempted', name: 'Add Two Numbers', diff: 'Medium', topic: 'Linked List, Math', time: '30m', xp: 20, bookmarked: false },
    { id: '3', status: 'Not Started', name: 'Longest Substring Without Repeating Characters', diff: 'Medium', topic: 'Hash Table, String, Sliding Window', time: '35m', xp: 25, bookmarked: true },
    { id: '4', status: 'Not Started', name: 'Median of Two Sorted Arrays', diff: 'Hard', topic: 'Array, Binary Search, Divide and Conquer', time: '45m', xp: 40, bookmarked: false },
    { id: '5', status: 'Solved', name: 'Longest Palindromic Substring', diff: 'Medium', topic: 'String, Dynamic Programming', time: '35m', xp: 25, bookmarked: false },
    { id: '6', status: 'Not Started', name: 'Zigzag Conversion', diff: 'Medium', topic: 'String', time: '30m', xp: 20, bookmarked: false },
    { id: '7', status: 'Solved', name: 'Reverse Integer', diff: 'Medium', topic: 'Math', time: '20m', xp: 15, bookmarked: false },
  ];

  const getDiffColor = (diff: string) => {
    switch(diff) {
      case 'Easy': return 'text-emerald-400 bg-emerald-500/10 border-emerald-500/20';
      case 'Medium': return 'text-orange-400 bg-orange-500/10 border-orange-500/20';
      case 'Hard': return 'text-red-400 bg-red-500/10 border-red-500/20';
      default: return 'text-slate-400 bg-slate-500/10 border-slate-500/20';
    }
  };

  const getStatusIcon = (status: string) => {
    if (status === 'Solved') return <CheckCircle2 className="w-5 h-5 text-emerald-400" />;
    if (status === 'Attempted') return <div className="w-5 h-5 rounded-full border-2 border-orange-400 border-t-transparent animate-spin" />;
    return <Circle className="w-5 h-5 text-slate-600" />;
  };

  return (
    <div className="space-y-8">
      <div className="text-center md:text-left flex flex-col md:flex-row md:items-end justify-between gap-4">
        <div>
          <h2 className="text-2xl md:text-3xl font-bold text-white flex items-center gap-3 justify-center md:justify-start">
            <ListTodo className="w-8 h-8 text-indigo-400" /> Coding Problems
          </h2>
          <p className="text-slate-400 mt-2 text-lg">Browse, filter, and solve problems from our extensive library.</p>
        </div>
      </div>

      <div className="bg-slate-900 border border-white/5 rounded-[18px] overflow-hidden shadow-lg shadow-black/10">
        <div className="hidden lg:block overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="border-b border-white/5 bg-slate-950/50">
                <th className="px-6 py-4 text-sm font-semibold text-slate-400 w-16 text-center">Status</th>
                <th className="px-6 py-4 text-sm font-semibold text-slate-400">Problem</th>
                <th className="px-6 py-4 text-sm font-semibold text-slate-400 w-32">Difficulty</th>
                <th className="px-6 py-4 text-sm font-semibold text-slate-400 hidden xl:table-cell">Topic</th>
                <th className="px-6 py-4 text-sm font-semibold text-slate-400 w-32">Time</th>
                <th className="px-6 py-4 text-sm font-semibold text-slate-400 w-24">XP</th>
                <th className="px-6 py-4 text-sm font-semibold text-slate-400 w-16 text-center">Save</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/5">
              {problems.map((p) => (
                <tr 
                  key={p.id} 
                  className="hover:bg-slate-800/50 transition-colors group cursor-pointer"
                  onClick={() => onSolve(p.id)}
                >
                  <td className="px-6 py-4 whitespace-nowrap text-center">
                    <div className="flex justify-center" title={p.status}>
                      {getStatusIcon(p.status)}
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <span className="text-[15px] font-bold text-slate-200 group-hover:text-indigo-400 transition-colors">{p.name}</span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`inline-block px-2.5 py-1 rounded-lg text-xs font-bold border uppercase tracking-wider ${getDiffColor(p.diff)}`}>
                      {p.diff}
                    </span>
                  </td>
                  <td className="px-6 py-4 hidden xl:table-cell">
                    <span className="text-sm font-medium text-slate-400 truncate max-w-[200px] block">{p.topic}</span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center gap-1.5 text-sm font-medium text-slate-400">
                      <Clock className="w-4 h-4 text-slate-500" /> {p.time}
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center gap-1.5 text-sm font-bold text-slate-300">
                      <Zap className="w-4 h-4 fill-amber-400/20 text-amber-400" /> {p.xp}
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-center">
                    <button 
                      className={`p-2 rounded-lg transition-colors ${p.bookmarked ? 'text-indigo-400 bg-indigo-500/10' : 'text-slate-500 hover:text-slate-300 hover:bg-white/5'}`}
                      onClick={(e) => { e.stopPropagation(); }}
                    >
                      <Bookmark className={`w-5 h-5 ${p.bookmarked ? 'fill-current' : ''}`} />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div className="lg:hidden flex flex-col divide-y divide-white/5">
          {problems.map(p => (
            <div 
              key={p.id} 
              className="p-5 hover:bg-slate-800/50 transition-colors cursor-pointer"
              onClick={() => onSolve(p.id)}
            >
              <div className="flex items-start justify-between mb-3">
                <div className="flex items-center gap-3">
                  {getStatusIcon(p.status)}
                  <h3 className="text-base font-bold text-slate-200">{p.name}</h3>
                </div>
                <button 
                  className={`p-1.5 shrink-0 rounded-lg transition-colors ${p.bookmarked ? 'text-indigo-400' : 'text-slate-500'}`}
                  onClick={(e) => { e.stopPropagation(); }}
                >
                  <Bookmark className={`w-5 h-5 ${p.bookmarked ? 'fill-current' : ''}`} />
                </button>
              </div>
              
              <div className="flex flex-wrap items-center gap-3 mt-4">
                <span className={`px-2.5 py-1 rounded-lg text-xs font-bold border uppercase tracking-wider ${getDiffColor(p.diff)}`}>
                  {p.diff}
                </span>
                <span className="flex items-center gap-1 text-xs font-medium text-slate-400 bg-slate-950/50 px-2 py-1 rounded-md border border-white/5">
                  <Clock className="w-3.5 h-3.5" /> {p.time}
                </span>
                <span className="flex items-center gap-1 text-xs font-bold text-slate-300 bg-slate-950/50 px-2 py-1 rounded-md border border-white/5">
                  <Zap className="w-3.5 h-3.5 fill-amber-400/20 text-amber-400" /> {p.xp} XP
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
INNER_EOF

cat << 'INNER_EOF' > src/components/coding_practice/CodingAIFeatures.tsx
import React from 'react';
import { BrainCircuit, MessageSquare, Lightbulb, Bug, SearchCode, Gauge, Sparkles } from 'lucide-react';

export default function CodingAIFeatures() {
  const features = [
    { title: "Explain Problem", description: "Get a clear, jargon-free breakdown of complex questions.", icon: MessageSquare, color: "text-blue-400", bg: "bg-blue-500/10" },
    { title: "AI Hint", description: "Receive progressive, subtle hints without spoiling the solution.", icon: Lightbulb, color: "text-yellow-400", bg: "bg-yellow-500/10" },
    { title: "AI Debugger", description: "Instantly locate logic errors and syntax mistakes in your code.", icon: Bug, color: "text-red-400", bg: "bg-red-500/10" },
    { title: "Complexity Analysis", description: "Detailed Time (O) and Space complexity breakdowns.", icon: Gauge, color: "text-purple-400", bg: "bg-purple-500/10" },
    { title: "Optimize Code", description: "Learn how to refactor your solution to run faster.", icon: Sparkles, color: "text-emerald-400", bg: "bg-emerald-500/10" },
    { title: "Similar Problems", description: "Discover problems using the exact same underlying pattern.", icon: SearchCode, color: "text-cyan-400", bg: "bg-cyan-500/10" },
  ];

  return (
    <div className="space-y-8">
      <div className="text-center md:text-left">
        <h2 className="text-2xl md:text-3xl font-bold text-white flex items-center gap-3 justify-center md:justify-start">
          <BrainCircuit className="w-8 h-8 text-purple-400" /> AI Coding Assistant
        </h2>
        <p className="text-slate-400 mt-2 text-lg">Your personal expert pair programmer, available 24/7.</p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {features.map((feature, idx) => (
          <div key={idx} className="bg-slate-900 border border-white/5 rounded-[18px] p-6 hover:border-purple-500/30 hover:bg-slate-800/80 transition-all group flex items-start gap-4 shadow-lg shadow-black/10">
            <div className={`w-12 h-12 rounded-xl ${feature.bg} flex items-center justify-center shrink-0`}>
              <feature.icon className={`w-6 h-6 ${feature.color}`} />
            </div>
            <div>
              <h3 className="text-lg font-bold text-slate-100 mb-1">{feature.title}</h3>
              <p className="text-sm text-slate-400 leading-relaxed">{feature.description}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
INNER_EOF

cat << 'INNER_EOF' > src/components/coding_practice/CodingRecommendedProblems.tsx
import React from 'react';
import { Target, ChevronRight, Brain } from 'lucide-react';

export default function CodingRecommendedProblems({ onSolve }: { onSolve: (id: string) => void }) {
  const recommendations = [
    { id: '1', title: 'Container With Most Water', reason: 'Matches your weak topic: Two Pointers', diff: 'Medium', color: 'text-orange-400' },
    { id: '2', title: 'Merge k Sorted Lists', reason: 'Next step in: Linked Lists', diff: 'Hard', color: 'text-red-400' },
    { id: '3', title: 'Valid Parentheses', reason: 'Language warm-up: Python', diff: 'Easy', color: 'text-emerald-400' },
    { id: '4', title: 'Climbing Stairs', reason: 'Introduction to: Dynamic Programming', diff: 'Easy', color: 'text-emerald-400' },
  ];

  return (
    <div className="space-y-8">
      <div className="text-center md:text-left">
        <h2 className="text-2xl md:text-3xl font-bold text-white flex items-center gap-3 justify-center md:justify-start">
          <Target className="w-8 h-8 text-cyan-400" /> Recommended Next Problems
        </h2>
        <p className="text-slate-400 mt-2 text-lg">AI-curated challenges based on your difficulty curve and weak topics.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {recommendations.map((rec, idx) => (
          <div key={idx} className="bg-slate-900 border border-white/5 rounded-[18px] p-6 flex flex-col hover:border-cyan-500/30 hover:bg-slate-800/80 transition-all cursor-pointer shadow-lg shadow-black/10 group" onClick={() => onSolve(rec.id)}>
            <div className="flex items-center gap-2 mb-4 text-xs font-semibold text-slate-400 bg-slate-950/50 px-3 py-1.5 rounded-lg border border-white/5 inline-flex self-start">
              <Brain className="w-4 h-4 text-cyan-400" /> {rec.reason}
            </div>
            <h3 className="text-lg font-bold text-slate-100 mb-6 group-hover:text-cyan-300 transition-colors line-clamp-2">{rec.title}</h3>
            
            <div className="flex items-center justify-between mt-auto border-t border-white/5 pt-4">
              <span className={`text-sm font-bold ${rec.color}`}>{rec.diff}</span>
              <button className="w-8 h-8 rounded-lg bg-white/5 text-slate-300 flex items-center justify-center group-hover:bg-cyan-500 group-hover:text-white transition-colors">
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
INNER_EOF

cat << 'INNER_EOF' > src/components/coding_practice/CodingProgress.tsx
import React from 'react';
import { TrendingUp, Target, BarChart3, Activity } from 'lucide-react';

export default function CodingProgress({ hasProgress = false }: { hasProgress?: boolean }) {
  if (!hasProgress) return null;

  return (
    <div className="space-y-8">
      <div className="text-center md:text-left">
        <h2 className="text-2xl md:text-3xl font-bold text-white flex items-center gap-3 justify-center md:justify-start">
          <TrendingUp className="w-8 h-8 text-emerald-400" /> Your Progress
        </h2>
        <p className="text-slate-400 mt-2 text-lg">Track your consistency, topic mastery, and interview readiness.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="bg-slate-900 border border-white/5 rounded-[18px] p-6 shadow-lg shadow-black/10">
          <div className="flex items-center gap-3 mb-4 text-slate-400">
            <Target className="w-5 h-5 text-indigo-400" />
            <span className="font-semibold">Problems Solved</span>
          </div>
          <div className="text-4xl font-bold text-white mb-2">124</div>
          <div className="w-full bg-slate-800 rounded-full h-2 mt-4">
            <div className="bg-indigo-500 h-2 rounded-full w-[45%]"></div>
          </div>
          <p className="text-xs text-slate-500 mt-2">Goal: 300 problems</p>
        </div>

        <div className="bg-slate-900 border border-white/5 rounded-[18px] p-6 shadow-lg shadow-black/10">
          <div className="flex items-center gap-3 mb-4 text-slate-400">
            <Activity className="w-5 h-5 text-orange-400" />
            <span className="font-semibold">Current Streak</span>
          </div>
          <div className="text-4xl font-bold text-white mb-2">12 <span className="text-xl text-slate-500">Days</span></div>
          <div className="flex gap-1 mt-4">
            {[1,1,1,1,1,1,0].map((active, i) => (
              <div key={i} className={`flex-1 h-2 rounded-full ${active ? 'bg-orange-500' : 'bg-slate-800'}`}></div>
            ))}
          </div>
          <p className="text-xs text-slate-500 mt-2">Keep it up!</p>
        </div>

        <div className="bg-slate-900 border border-white/5 rounded-[18px] p-6 shadow-lg shadow-black/10">
          <div className="flex items-center gap-3 mb-4 text-slate-400">
            <BarChart3 className="w-5 h-5 text-pink-400" />
            <span className="font-semibold">AI Skill Score</span>
          </div>
          <div className="text-4xl font-bold text-white mb-2">1450</div>
          <div className="w-full bg-slate-800 rounded-full h-2 mt-4">
            <div className="bg-pink-500 h-2 rounded-full w-[70%]"></div>
          </div>
          <p className="text-xs text-emerald-400 font-medium mt-2">+25 this week</p>
        </div>
        
        <div className="bg-slate-900 border border-white/5 rounded-[18px] p-6 shadow-lg shadow-black/10">
          <div className="flex items-center gap-3 mb-4 text-slate-400">
            <Target className="w-5 h-5 text-emerald-400" />
            <span className="font-semibold">Interview Readiness</span>
          </div>
          <div className="text-4xl font-bold text-white mb-2">68%</div>
          <div className="w-full bg-slate-800 rounded-full h-2 mt-4">
            <div className="bg-emerald-500 h-2 rounded-full w-[68%]"></div>
          </div>
          <p className="text-xs text-slate-500 mt-2">Strong in Arrays, Weak in DP</p>
        </div>
      </div>
    </div>
  );
}
INNER_EOF

cat << 'INNER_EOF' > src/components/coding_practice/CodingAchievements.tsx
import React from 'react';
import { Trophy, Lock, Medal, Star } from 'lucide-react';

export default function CodingAchievements() {
  const achievements = [
    { title: "First Problem Solved", locked: false, icon: Star, color: "text-amber-400", bg: "bg-amber-500/10" },
    { title: "10 Problems Completed", locked: false, icon: Medal, color: "text-slate-300", bg: "bg-slate-500/10" },
    { title: "50 Problems Completed", locked: true, icon: Trophy, color: "text-yellow-400", bg: "bg-yellow-500/10" },
    { title: "100 Problems Completed", locked: true, icon: Trophy, color: "text-emerald-400", bg: "bg-emerald-500/10" },
    { title: "7-Day Streak", locked: false, icon: Star, color: "text-orange-400", bg: "bg-orange-500/10" },
    { title: "30-Day Streak", locked: true, icon: Star, color: "text-pink-400", bg: "bg-pink-500/10" },
    { title: "DP Master", locked: true, icon: Trophy, color: "text-purple-400", bg: "bg-purple-500/10" },
    { title: "Graph Expert", locked: true, icon: Trophy, color: "text-blue-400", bg: "bg-blue-500/10" },
  ];

  return (
    <div className="space-y-8">
      <div className="text-center md:text-left">
        <h2 className="text-2xl md:text-3xl font-bold text-white flex items-center gap-3 justify-center md:justify-start">
          <Trophy className="w-8 h-8 text-amber-400" /> Achievements
        </h2>
        <p className="text-slate-400 mt-2 text-lg">Earn badges as you master new skills and maintain your streak.</p>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
        {achievements.map((achieve, idx) => (
          <div key={idx} className={`bg-slate-900 border border-white/5 rounded-[18px] p-6 flex flex-col items-center text-center transition-all shadow-lg shadow-black/10 ${achieve.locked ? 'opacity-50 grayscale hover:grayscale-0' : 'hover:border-white/10 hover:bg-slate-800/50'}`}>
            <div className={`w-16 h-16 rounded-full flex items-center justify-center mb-4 ${achieve.locked ? 'bg-slate-800' : achieve.bg}`}>
              {achieve.locked ? <Lock className="w-6 h-6 text-slate-500" /> : <achieve.icon className={`w-8 h-8 ${achieve.color}`} />}
            </div>
            <h3 className="text-sm font-bold text-slate-200">{achieve.title}</h3>
            {achieve.locked && <p className="text-xs text-slate-500 mt-2 font-medium uppercase tracking-wider">Locked</p>}
          </div>
        ))}
      </div>
    </div>
  );
}
INNER_EOF

cat << 'INNER_EOF' > src/components/coding_practice/CodingRecentActivity.tsx
import React from 'react';
import { Activity, Clock, FileCode2 } from 'lucide-react';

export default function CodingRecentActivity({ hasActivity = false }: { hasActivity?: boolean }) {
  if (!hasActivity) {
    return (
      <div className="space-y-8">
        <div className="text-center md:text-left">
          <h2 className="text-2xl md:text-3xl font-bold text-white flex items-center gap-3 justify-center md:justify-start">
            <Activity className="w-8 h-8 text-blue-400" /> Recent Activity
          </h2>
          <p className="text-slate-400 mt-2 text-lg">Your latest problem attempts and completions.</p>
        </div>

        <div className="bg-slate-900 border border-white/5 rounded-[18px] p-12 flex flex-col items-center justify-center text-center shadow-lg shadow-black/10 border-dashed">
          <div className="w-16 h-16 bg-slate-800 rounded-full flex items-center justify-center mb-4">
            <Activity className="w-8 h-8 text-slate-600" />
          </div>
          <h3 className="text-xl font-bold text-slate-300 mb-2">No activity yet</h3>
          <p className="text-slate-500 max-w-md">Start solving problems to see your history, attempts, and XP earned appear here.</p>
        </div>
      </div>
    );
  }

  const activities = [
    { type: 'solved', problem: 'Two Sum', time: '2 hours ago', xp: 10 },
    { type: 'attempted', problem: 'LRU Cache', time: '5 hours ago', xp: 0 },
    { type: 'solved', problem: 'Valid Parentheses', time: '1 day ago', xp: 15 },
  ];

  return (
    <div className="space-y-8">
      <div className="text-center md:text-left">
        <h2 className="text-2xl md:text-3xl font-bold text-white flex items-center gap-3 justify-center md:justify-start">
          <Activity className="w-8 h-8 text-blue-400" /> Recent Activity
        </h2>
        <p className="text-slate-400 mt-2 text-lg">Your latest problem attempts and completions.</p>
      </div>

      <div className="bg-slate-900 border border-white/5 rounded-[18px] p-6 shadow-lg shadow-black/10">
        <div className="space-y-4">
          {activities.map((act, idx) => (
            <div key={idx} className="flex items-center justify-between p-4 bg-slate-950/50 rounded-xl border border-white/5">
              <div className="flex items-center gap-4">
                <div className={`w-10 h-10 rounded-full flex items-center justify-center ${act.type === 'solved' ? 'bg-emerald-500/10 text-emerald-400' : 'bg-orange-500/10 text-orange-400'}`}>
                  <FileCode2 className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="text-base font-bold text-slate-200">{act.problem}</h4>
                  <div className="flex items-center gap-2 mt-1">
                    <Clock className="w-3.5 h-3.5 text-slate-500" />
                    <span className="text-xs font-medium text-slate-500">{act.time}</span>
                  </div>
                </div>
              </div>
              <div className="text-right">
                <span className={`text-sm font-bold ${act.type === 'solved' ? 'text-emerald-400' : 'text-slate-400'}`}>
                  {act.type === 'solved' ? 'Solved' : 'Attempted'}
                </span>
                {act.xp > 0 && <div className="text-xs font-bold text-amber-400 mt-1">+{act.xp} XP</div>}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
INNER_EOF

cat << 'INNER_EOF' > src/pages/CodingPractice.tsx
import React, { useState } from 'react';
import DashboardLayout from '../components/layout/DashboardLayout';
import CodingWorkspace from '../components/coding/CodingWorkspace';

import CodingHero from '../components/coding_practice/CodingHero';
import CodingCategories from '../components/coding_practice/CodingCategories';
import CodingLearningPaths from '../components/coding_practice/CodingLearningPaths';
import CodingDailyChallenge from '../components/coding_practice/CodingDailyChallenge';
import CodingProblemTable from '../components/coding_practice/CodingProblemTable';
import CodingAIFeatures from '../components/coding_practice/CodingAIFeatures';
import CodingRecommendedProblems from '../components/coding_practice/CodingRecommendedProblems';
import CodingProgress from '../components/coding_practice/CodingProgress';
import CodingAchievements from '../components/coding_practice/CodingAchievements';
import CodingRecentActivity from '../components/coding_practice/CodingRecentActivity';

export default function CodingPractice() {
  const [activeProblem, setActiveProblem] = useState<string | null>(null);
  
  // Set to true to see the populated states for Progress and Activity
  const hasHistory = true; 

  if (activeProblem) {
    return (
      <DashboardLayout>
        <CodingWorkspace onBack={() => setActiveProblem(null)} />
      </DashboardLayout>
    );
  }

  return (
    <DashboardLayout>
      <div className="max-w-[1400px] mx-auto w-full px-4 sm:px-6 lg:px-8 py-8 space-y-24">
        
        {/* 1. Hero Section */}
        <section>
          <CodingHero onStart={() => setActiveProblem('two-sum')} />
        </section>

        {/* 2. Coding Categories */}
        <section>
          <CodingCategories />
        </section>

        {/* 3. Featured Learning Paths */}
        <section>
          <CodingLearningPaths />
        </section>

        {/* 4. Daily Coding Challenge */}
        <section>
          <CodingDailyChallenge onSolve={() => setActiveProblem('daily')} />
        </section>

        {/* 5. Coding Problems */}
        <section>
          <CodingProblemTable onSolve={(id) => setActiveProblem(id)} />
        </section>

        {/* 6. AI Coding Assistant */}
        <section>
          <CodingAIFeatures />
        </section>

        {/* 7. Recommended Next Problems */}
        <section>
          <CodingRecommendedProblems onSolve={(id) => setActiveProblem(id)} />
        </section>

        {/* 8. Progress Section */}
        <section>
          <CodingProgress hasProgress={hasHistory} />
        </section>

        {/* 9. Achievements */}
        <section>
          <CodingAchievements />
        </section>

        {/* 10. Recent Activity */}
        <section>
          <CodingRecentActivity hasActivity={hasHistory} />
        </section>

      </div>
    </DashboardLayout>
  );
}
INNER_EOF

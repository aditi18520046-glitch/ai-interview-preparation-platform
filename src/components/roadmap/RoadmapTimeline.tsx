import React from 'react';
import { 
  CheckCircle2, 
  Circle, 
  Code2, 
  Database, 
  Network, 
  Server, 
  Users, 
  Building2, 
  PlaySquare, 
  PenTool, 
  BookOpen,
  FileText,
  MonitorPlay,
  Lock,
  ChevronDown
} from 'lucide-react';

const ROADMAP_STAGES = [
  {
    id: 1,
    title: 'Programming Fundamentals',
    description: 'Master the basics of programming including variables, loops, and functions.',
    duration: '2 Weeks',
    difficulty: 'Beginner',
    status: 'completed',
    progress: 100,
    icon: Code2,
    topics: ['Variables', 'Loops', 'Functions', 'Arrays', 'Strings', 'Recursion'],
    resources: [
      { name: 'Fundamentals Video Course', type: 'video', time: '4h', difficulty: 'Beginner', icon: PlaySquare },
      { name: 'Basic Coding Practice', type: 'practice', time: '2h', difficulty: 'Beginner', icon: PenTool },
      { name: 'Syntax Cheat Sheet', type: 'notes', time: '30m', difficulty: 'Beginner', icon: FileText }
    ]
  },
  {
    id: 2,
    title: 'Object-Oriented Programming',
    description: 'Learn to structure your code using classes, objects, and inheritance.',
    duration: '2 Weeks',
    difficulty: 'Beginner',
    status: 'in-progress',
    progress: 60,
    icon: Code2,
    topics: ['Classes', 'Objects', 'Inheritance', 'Polymorphism', 'Encapsulation', 'Abstraction'],
    resources: [
      { name: 'OOP Concepts Deep Dive', type: 'video', time: '3h', difficulty: 'Intermediate', icon: MonitorPlay },
      { name: 'Class Design Exercises', type: 'practice', time: '3h', difficulty: 'Intermediate', icon: PenTool }
    ]
  },
  {
    id: 3,
    title: 'Data Structures',
    description: 'Understand how to organize and store data efficiently.',
    duration: '4 Weeks',
    difficulty: 'Intermediate',
    status: 'locked',
    progress: 0,
    icon: Database,
    topics: ['Arrays', 'Linked Lists', 'Stacks', 'Queues', 'Trees', 'BST', 'Heap', 'Graph', 'Trie', 'Hashing'],
    resources: [
      { name: 'Data Structures Crash Course', type: 'video', time: '5h', difficulty: 'Intermediate', icon: PlaySquare },
      { name: '100 Essential DS Problems', type: 'practice', time: '10h', difficulty: 'Intermediate', icon: Code2 },
      { name: 'DS Cheat Sheet', type: 'notes', time: '1h', difficulty: 'Beginner', icon: BookOpen }
    ]
  },
  {
    id: 4,
    title: 'Algorithms',
    description: 'Learn techniques to solve complex computational problems.',
    duration: '4 Weeks',
    difficulty: 'Advanced',
    status: 'locked',
    progress: 0,
    icon: Network,
    topics: ['Sorting', 'Searching', 'Binary Search', 'Greedy', 'Dynamic Programming', 'Graph Algorithms', 'Backtracking', 'Divide and Conquer'],
    resources: []
  },
  {
    id: 5,
    title: 'SQL & Database',
    description: 'Master relational databases, querying, and schema design.',
    duration: '2 Weeks',
    difficulty: 'Intermediate',
    status: 'locked',
    progress: 0,
    icon: Database,
    topics: ['SQL Queries', 'Joins', 'Indexing', 'Transactions', 'Normalization', 'Database Design'],
    resources: []
  },
  {
    id: 6,
    title: 'Operating System',
    description: 'Understand core OS concepts crucial for systems engineering.',
    duration: '1.5 Weeks',
    difficulty: 'Intermediate',
    status: 'locked',
    progress: 0,
    icon: Server,
    topics: ['Process', 'Thread', 'Scheduling', 'Deadlock', 'Memory Management', 'Virtual Memory'],
    resources: []
  },
  {
    id: 7,
    title: 'Computer Networks',
    description: 'Learn how computers communicate over the internet.',
    duration: '1.5 Weeks',
    difficulty: 'Intermediate',
    status: 'locked',
    progress: 0,
    icon: Network,
    topics: ['TCP/IP', 'HTTP', 'HTTPS', 'DNS', 'Routing', 'Security'],
    resources: []
  },
  {
    id: 8,
    title: 'System Design',
    description: 'Design scalable, highly available, and reliable distributed systems.',
    duration: '3 Weeks',
    difficulty: 'Advanced',
    status: 'locked',
    progress: 0,
    icon: Server,
    topics: ['Scalability', 'Load Balancing', 'Caching', 'Databases', 'APIs', 'Microservices'],
    resources: []
  },
  {
    id: 9,
    title: 'Behavioral & HR Preparation',
    description: 'Master the STAR method and prepare for behavioral rounds.',
    duration: '1 Week',
    difficulty: 'Beginner',
    status: 'locked',
    progress: 0,
    icon: Users,
    topics: ['Self Introduction', 'STAR Method', 'HR Questions', 'Communication', 'Leadership', 'Teamwork'],
    resources: []
  },
  {
    id: 10,
    title: 'Company Interview Preparation',
    description: 'Targeted preparation based on recent company trends.',
    duration: '2 Weeks',
    difficulty: 'Advanced',
    status: 'locked',
    progress: 0,
    icon: Building2,
    topics: ['Frequently Asked Questions', 'Coding Pattern', 'Interview Rounds', 'Hiring Process', 'Recent Interview Experiences', 'Company Expectations', 'Recommended Learning Resources'],
    resources: []
  }
];

export default function RoadmapTimeline() {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h2 className="text-2xl font-bold text-white mb-2">Your Personalized Journey</h2>
          <p className="text-slate-400">Follow these stages in sequence to maximize your chances of success.</p>
        </div>
      </div>

      <div className="relative space-y-8 before:absolute before:inset-0 before:ml-[27px] before:-translate-x-px md:before:mx-auto md:before:translate-x-0 before:h-full before:w-0.5 before:bg-gradient-to-b before:from-indigo-500/50 before:via-purple-500/50 before:to-transparent">
        {ROADMAP_STAGES.map((stage, index) => {
          const isLeft = index % 2 === 0;
          const isCompleted = stage.status === 'completed';
          const isInProgress = stage.status === 'in-progress';
          const isLocked = stage.status === 'locked';

          return (
            <div key={stage.id} className="relative flex items-center justify-between md:justify-normal md:odd:flex-row-reverse group">
              {/* Timeline dot */}
              <div className={`flex items-center justify-center w-14 h-14 rounded-full border-4 border-slate-950 shrink-0 md:order-1 md:group-odd:-translate-x-1/2 md:group-even:translate-x-1/2 shadow-xl z-10 transition-colors duration-300 ${
                isCompleted ? 'bg-emerald-500 text-white' : 
                isInProgress ? 'bg-indigo-500 text-white' : 
                'bg-slate-800 text-slate-500'
              }`}>
                {isCompleted ? <CheckCircle2 className="w-6 h-6" /> : 
                 isLocked ? <Lock className="w-5 h-5" /> : 
                 <stage.icon className="w-6 h-6" />}
              </div>

              {/* Content Card */}
              <div className={`w-[calc(100%-4rem)] md:w-[calc(50%-3rem)] p-6 rounded-[24px] border transition-all duration-300 ${
                isInProgress ? 'bg-slate-800/80 border-indigo-500/30 shadow-[0_0_30px_rgba(99,102,241,0.1)]' : 
                isCompleted ? 'bg-slate-800/50 border-emerald-500/20' : 
                'bg-slate-900/50 border-white/5 opacity-75'
              }`}>
                <div className="flex items-center justify-between mb-4">
                  <span className="text-sm font-bold text-indigo-400 tracking-wider">STAGE {stage.id}</span>
                  <div className="flex items-center gap-3">
                    <span className="text-xs font-medium text-slate-400">{stage.duration}</span>
                    <span className={`text-[10px] uppercase font-bold px-2 py-1 rounded-full ${
                      stage.difficulty === 'Beginner' ? 'bg-emerald-500/10 text-emerald-400' :
                      stage.difficulty === 'Intermediate' ? 'bg-yellow-500/10 text-yellow-400' :
                      'bg-red-500/10 text-red-400'
                    }`}>
                      {stage.difficulty}
                    </span>
                  </div>
                </div>

                <h3 className={`text-xl font-bold mb-2 ${isLocked ? 'text-slate-300' : 'text-white'}`}>
                  {stage.title}
                </h3>
                <p className="text-sm text-slate-400 mb-6">{stage.description}</p>

                {/* Progress Bar */}
                {!isLocked && (
                  <div className="mb-6">
                    <div className="flex justify-between text-xs font-medium mb-2">
                      <span className={isCompleted ? 'text-emerald-400' : 'text-indigo-400'}>
                        {stage.progress}% Completed
                      </span>
                    </div>
                    <div className="h-2 w-full bg-slate-950 rounded-full overflow-hidden">
                      <div 
                        className={`h-full rounded-full transition-all duration-1000 ${isCompleted ? 'bg-emerald-500' : 'bg-indigo-500'}`}
                        style={{ width: `${stage.progress}%` }}
                      />
                    </div>
                  </div>
                )}

                {/* Topics */}
                <div className="mb-6">
                  <h4 className="text-xs font-semibold text-slate-500 uppercase tracking-wider mb-3">Topics Covered</h4>
                  <div className="flex flex-wrap gap-2">
                    {stage.topics.map(topic => (
                      <span key={topic} className="text-xs font-medium px-2.5 py-1 rounded-md bg-slate-950 text-slate-300 border border-white/5">
                        {topic}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Resources (only if not locked and has resources) */}
                {!isLocked && stage.resources.length > 0 && (
                  <div className="pt-4 border-t border-white/5">
                    <h4 className="text-xs font-semibold text-slate-500 uppercase tracking-wider mb-3">Resources</h4>
                    <div className="space-y-2">
                      {stage.resources.map((resource, i) => (
                        <div key={i} className="flex items-center justify-between p-3 rounded-xl bg-slate-950/50 border border-white/5 hover:border-indigo-500/30 transition-colors cursor-pointer group/resource">
                          <div className="flex items-center gap-3">
                            <div className="w-8 h-8 rounded-lg bg-indigo-500/10 flex items-center justify-center">
                              <resource.icon className="w-4 h-4 text-indigo-400" />
                            </div>
                            <div>
                              <p className="text-sm font-medium text-slate-200 group-hover/resource:text-indigo-400 transition-colors">{resource.name}</p>
                              <div className="flex items-center gap-2 text-[10px] text-slate-500 mt-0.5">
                                <span className="uppercase">{resource.type}</span>
                                <span>•</span>
                                <span>{resource.time}</span>
                              </div>
                            </div>
                          </div>
                          <ChevronDown className="w-4 h-4 text-slate-600 -rotate-90 group-hover/resource:text-indigo-400" />
                        </div>
                      ))}
                    </div>
                  </div>
                )}
                
                {isLocked && (
                  <button className="w-full py-3 rounded-xl bg-slate-950 text-slate-500 font-medium text-sm flex items-center justify-center gap-2 border border-white/5 opacity-50 cursor-not-allowed">
                    <Lock className="w-4 h-4" /> Locked - Complete previous stages
                  </button>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

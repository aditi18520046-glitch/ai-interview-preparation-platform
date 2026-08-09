import React, { useState, useEffect } from 'react';
import DashboardLayout from '../components/layout/DashboardLayout';
import { 
  Bookmark, Search, Filter, Play, ChevronDown, 
  Target, BarChart, Code2, MessageSquare, 
  Clock, CheckCircle2, TrendingUp,
  BrainCircuit, BookOpen, Layers, Briefcase, 
  Zap, Plus, Building2, Map, Code
} from 'lucide-react';

interface SavedQuestion {
  id: string;
  title: string;
  company?: string;
  role: string;
  category: string;
  difficulty: string;
  topic: string;
  dateSaved: string;
  source: string;
  preview: string;
  fullQuestion: string;
  userNotes: string;
  aiSuggestedAnswer: string;
  keyConcepts: string[];
  bestAnswerStructure: string[];
  commonMistakes: string[];
  importantKeywords: string[];
  relatedTopics: string[];
  estimatedDifficulty: string;
  interviewTips: string[];
  learningResources: string[];
}

import { useSavedQuestionStore } from '../store/savedQuestionStore';
export default function SavedQuestions() {
  const { savedQuestions, fetchSaved, removeQuestion } = useSavedQuestionStore();
  useEffect(() => { fetchSaved(); }, [fetchSaved]);
  
  // Always strictly empty as per instructions
   
  const [searchQuery, setSearchQuery] = useState('');
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [expandedId, setExpandedId] = useState<string | null>(null);

  // Derived stats (all 0 initially since questions are empty)
  const stats = {
    total: savedQuestions.length,
    technical: savedQuestions.filter(q => q.category === 'Technical').length,
    hr: savedQuestions.filter(q => q.category === 'HR').length,
    behavioral: savedQuestions.filter(q => q.category === 'Behavioral').length,
    coding: savedQuestions.filter(q => q.category === 'Coding').length,
    systemDesign: savedQuestions.filter(q => q.category === 'System Design').length,
    companySpecific: savedQuestions.filter(q => q.company).length,
    recentlySaved: 0 // Logic to check recent dates would go here
  };

  const smartCollections = savedQuestions.length > 0 ? [] : [];
  const revisionProgress = {
    reviewed: 0,
    pending: 0,
    completion: 0,
    recentlyRevised: 0,
    streak: 0,
    weakTopics: [],
    strongTopics: []
  };
  const recommendations: string[] = [];

  return (
    <DashboardLayout>
      <div className="space-y-8 animate-in fade-in duration-500 pb-12">
        
        {/* Hero Section */}
        <div className="bg-slate-900/80 backdrop-blur-xl border border-white/10 rounded-3xl p-8 md:p-10 relative overflow-hidden">
          <div className="absolute top-0 right-0 w-[400px] h-[400px] bg-indigo-500/10 rounded-full blur-[100px] -translate-y-1/2 translate-x-1/3 pointer-events-none" />
          
          <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-8 relative z-10">
            <div className="max-w-2xl">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center shadow-lg shadow-indigo-500/20">
                  <Bookmark className="w-6 h-6 text-white" />
                </div>
                <h1 className="text-3xl md:text-4xl font-bold text-white tracking-tight">Saved Questions</h1>
              </div>
              <p className="text-slate-400 text-lg leading-relaxed">
                Build your personal interview question library. Save important questions during mock interviews, coding practice, and assessments so you can revise them anytime.
              </p>
            </div>
            
            {/* Minimal Illustration */}
            <div className="hidden lg:flex shrink-0 w-48 h-48 relative items-center justify-center">
              <div className="absolute inset-0 bg-purple-500/10 rounded-full blur-2xl animate-pulse" />
              <div className="relative w-32 h-32 bg-slate-800/80 rounded-2xl border border-white/10 shadow-2xl flex flex-col p-4 transform -rotate-6 hover:rotate-0 transition-all duration-500 cursor-default">
                <div className="w-8 h-8 rounded-full bg-indigo-500/20 flex items-center justify-center mb-3">
                  <BrainCircuit className="w-4 h-4 text-indigo-400" />
                </div>
                <div className="space-y-2 flex-1">
                  <div className="h-2 w-full bg-slate-700 rounded-full" />
                  <div className="h-2 w-5/6 bg-slate-700 rounded-full" />
                  <div className="h-2 w-4/6 bg-slate-700 rounded-full" />
                </div>
                <div className="mt-auto flex items-center justify-between">
                  <div className="w-16 h-2 rounded-full bg-indigo-500/50" />
                  <Bookmark className="w-4 h-4 text-indigo-400" fill="currentColor" />
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Compact Statistics Row */}
        <div className="grid grid-cols-2 md:grid-cols-4 xl:grid-cols-8 gap-4">
          <StatCard label="Total Saved" value={stats.total} icon={BookOpen} />
          <StatCard label="Technical" value={stats.technical} icon={Code2} />
          <StatCard label="HR" value={stats.hr} icon={MessageSquare} />
          <StatCard label="Behavioral" value={stats.behavioral} icon={Target} />
          <StatCard label="Coding" value={stats.coding} icon={Code} />
          <StatCard label="System Design" value={stats.systemDesign} icon={Layers} />
          <StatCard label="Company Specific" value={stats.companySpecific} icon={Building2} />
          <StatCard label="Recently Saved" value={stats.recentlySaved} icon={Clock} color="text-yellow-400" />
        </div>

        {savedQuestions.length === 0 ? (
          /* Empty State */
          <div className="bg-slate-900/50 border border-white/5 rounded-3xl p-12 flex flex-col items-center justify-center text-center min-h-[400px]">
            <div className="w-24 h-24 rounded-3xl bg-slate-800/80 border border-white/10 flex items-center justify-center mb-6 shadow-2xl relative">
              <Bookmark className="w-10 h-10 text-slate-500" />
              <div className="absolute -bottom-2 -right-2 w-8 h-8 rounded-full bg-indigo-500 flex items-center justify-center border-4 border-slate-900">
                <Plus className="w-4 h-4 text-white" />
              </div>
            </div>
            <h3 className="text-2xl font-bold text-white mb-3">No Saved Questions Yet</h3>
            <p className="text-slate-400 max-w-lg mb-8 leading-relaxed">
              Save important interview questions while practicing mock interviews, coding challenges, and assessments. Your personal question library will grow here, making revision faster and more organized.
            </p>
            <button className="px-8 py-4 bg-indigo-500 hover:bg-indigo-600 text-white font-semibold rounded-xl shadow-lg shadow-indigo-500/25 transition-all flex items-center gap-2 hover:-translate-y-0.5">
              <Play className="w-5 h-5 fill-white" /> Start Practicing
            </button>
          </div>
        ) : (
          /* Populated State (Only rendered if questions exist) */
          <div className="space-y-8">
            {/* Search & Filter Bar */}
            <div className="bg-slate-900 border border-white/10 rounded-2xl p-4">
              <div className="flex flex-col lg:flex-row gap-4">
                <div className="flex-1 relative">
                  <Search className="w-5 h-5 text-slate-500 absolute left-4 top-1/2 -translate-y-1/2" />
                  <input 
                    type="text" 
                    placeholder="Search questions by keyword, topic, or company..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="w-full bg-slate-950 border border-white/10 rounded-xl pl-11 pr-4 py-3.5 text-white focus:outline-none focus:border-indigo-500 transition-colors placeholder:text-slate-500"
                  />
                </div>
                <button 
                  onClick={() => setIsFilterOpen(!isFilterOpen)}
                  className={`px-6 py-3.5 rounded-xl border flex items-center justify-center gap-2 font-medium transition-colors ${
                    isFilterOpen ? 'bg-indigo-500/20 text-indigo-400 border-indigo-500/30' : 'bg-slate-950 text-slate-300 border-white/10 hover:bg-slate-800'
                  }`}
                >
                  <Filter className="w-4 h-4" /> Filters
                  <ChevronDown className={`w-4 h-4 transition-transform ${isFilterOpen ? 'rotate-180' : ''}`} />
                </button>
              </div>

              {isFilterOpen && (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 pt-4 mt-4 border-t border-white/5 animate-in fade-in slide-in-from-top-2">
                  <FilterSelect label="Company" options={['Google', 'Amazon', 'Microsoft']} />
                  <FilterSelect label="Job Role" options={['Software Engineer', 'Frontend', 'Backend']} />
                  <FilterSelect label="Question Type" options={['Technical', 'HR', 'Behavioral', 'System Design', 'Coding']} />
                  <FilterSelect label="Difficulty" options={['Easy', 'Medium', 'Hard']} />
                  <FilterSelect label="Topic" options={['Dynamic Programming', 'Operating System', 'Database', 'Leadership']} />
                  <FilterSelect label="Language" options={['Python', 'Java', 'JavaScript', 'C++']} />
                  <FilterSelect label="Interview Mode" options={['Voice', 'Text', 'Video']} />
                  <FilterSelect label="Sort By" options={['Recently Saved', 'Oldest', 'Frequently Reviewed', 'Alphabetical', 'Difficulty', 'Company']} />
                </div>
              )}
            </div>

            {/* Smart Collections & Progress (Only shown if populated) */}
            <div className="grid lg:grid-cols-3 gap-8">
              <div className="lg:col-span-2 space-y-6">
                {smartCollections.length > 0 && (
                  <div>
                    <h3 className="text-lg font-bold text-white mb-4 flex items-center gap-2">
                      <Layers className="w-5 h-5 text-indigo-400" /> Smart Collections
                    </h3>
                    {/* Collection pills would go here */}
                  </div>
                )}
                
                {/* Question Cards */}
                <div className="space-y-4">
                  {savedQuestions.map(q => (
                    <QuestionCard 
                      key={q.id} 
                      question={q} 
                      isExpanded={expandedId === q.id}
                      onToggle={() => setExpandedId(expandedId === q.id ? null : q.id)}
                    />
                  ))}
                </div>
              </div>

              <div className="space-y-6">
                {/* Revision Progress */}
                <div className="bg-slate-900 border border-white/10 rounded-3xl p-6">
                  <h3 className="text-lg font-bold text-white mb-4 flex items-center gap-2">
                    <TrendingUp className="w-5 h-5 text-emerald-400" /> Revision Progress
                  </h3>
                  <div className="space-y-4 text-sm text-slate-300">
                    <div className="flex justify-between items-center pb-2 border-b border-white/5">
                      <span>Questions Reviewed</span>
                      <span className="font-bold text-white">{revisionProgress.reviewed}</span>
                    </div>
                    <div className="flex justify-between items-center pb-2 border-b border-white/5">
                      <span>Questions Pending</span>
                      <span className="font-bold text-white">{revisionProgress.pending}</span>
                    </div>
                    <div className="flex justify-between items-center pb-2 border-b border-white/5">
                      <span>Completion</span>
                      <span className="font-bold text-emerald-400">{revisionProgress.completion}%</span>
                    </div>
                    <div className="flex justify-between items-center pb-2 border-b border-white/5">
                      <span>Revision Streak</span>
                      <span className="font-bold text-orange-400">{revisionProgress.streak} Days</span>
                    </div>
                  </div>
                </div>

                {/* AI Recommendations */}
                {recommendations.length > 0 && (
                  <div className="bg-slate-900 border border-white/10 rounded-3xl p-6">
                    <h3 className="text-lg font-bold text-white mb-4 flex items-center gap-2">
                      <Zap className="w-5 h-5 text-yellow-400" /> AI Recommendations
                    </h3>
                    <ul className="space-y-3">
                      {recommendations.map((rec, i) => (
                        <li key={i} className="flex items-start gap-2 text-sm text-slate-300 bg-slate-950 p-3 rounded-xl border border-white/5">
                          <BrainCircuit className="w-4 h-4 text-indigo-400 shrink-0 mt-0.5" />
                          {rec}
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>
            </div>
          </div>
        )}

        {/* Continue Learning Section */}
        <div className="bg-gradient-to-r from-indigo-900/40 to-slate-900 border border-indigo-500/20 rounded-3xl p-8 relative overflow-hidden mt-8">
          <div className="absolute right-0 top-0 w-64 h-full bg-gradient-to-l from-indigo-500/10 to-transparent pointer-events-none" />
          <h2 className="text-xl font-bold text-white mb-2 relative z-10">Continue Learning</h2>
          <p className="text-slate-400 mb-6 max-w-2xl relative z-10">
            {savedQuestions.length === 0 
              ? "Start practicing to build your knowledge base."
              : "Keep up the momentum. Choose your next action based on your saved questions."}
          </p>
          
          <div className="flex flex-wrap gap-4 relative z-10">
            <button className="px-6 py-3 bg-indigo-500 hover:bg-indigo-600 text-white font-semibold rounded-xl shadow-lg shadow-indigo-500/25 transition-all flex items-center gap-2">
              <Play className="w-4 h-4 fill-white" /> Continue Mock Interview
            </button>
            <button className="px-6 py-3 bg-slate-800 hover:bg-slate-700 text-white font-semibold rounded-xl border border-white/10 transition-all flex items-center gap-2">
              <Code className="w-4 h-4" /> Resume Coding Practice
            </button>
            <button className="px-6 py-3 bg-slate-800 hover:bg-slate-700 text-white font-semibold rounded-xl border border-white/10 transition-all flex items-center gap-2">
              <Map className="w-4 h-4" /> Open Learning Roadmap
            </button>
            {savedQuestions.length > 0 && (
              <button className="px-6 py-3 bg-slate-800 hover:bg-slate-700 text-white font-semibold rounded-xl border border-white/10 transition-all flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4" /> Take Revision Quiz
              </button>
            )}
          </div>
        </div>

      </div>
    </DashboardLayout>
  );
}

// Subcomponents

function StatCard({ label, value, icon: Icon, color = 'text-indigo-400' }: { label: string, value: string | number, icon: any, color?: string }) {
  return (
    <div className="bg-slate-900 border border-white/10 rounded-2xl p-4 flex flex-col justify-between h-28 hover:bg-slate-800/80 transition-colors group shadow-lg shadow-black/20">
      <div className="flex items-center justify-between mb-2">
        <span className="text-xs font-medium text-slate-400">{label}</span>
        <Icon className={`w-4 h-4 ${color} opacity-70 group-hover:opacity-100 transition-opacity`} />
      </div>
      <div className="text-2xl font-bold text-white">{value}</div>
    </div>
  );
}

function FilterSelect({ label, options }: { label: string, options: string[] }) {
  return (
    <div>
      <label className="block text-[10px] font-semibold text-slate-500 uppercase tracking-wider mb-1.5 ml-1">{label}</label>
      <div className="relative">
        <select className="w-full bg-slate-950 border border-white/10 rounded-xl px-3 py-2.5 text-sm text-slate-300 focus:outline-none focus:border-indigo-500 appearance-none cursor-pointer">
          <option value="">All {label}s</option>
          {options.map(o => <option key={o} value={o}>{o}</option>)}
        </select>
        <ChevronDown className="w-3.5 h-3.5 text-slate-500 absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none" />
      </div>
    </div>
  );
}

const QuestionCard: React.FC<{ question: SavedQuestion, isExpanded: boolean, onToggle: () => void }> = ({ question, isExpanded, onToggle }) => {
  // Empty since we don't display populated questions right now based on instructions
  return <div />;
}

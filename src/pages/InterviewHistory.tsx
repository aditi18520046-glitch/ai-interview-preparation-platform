import React, { useState } from 'react';
import DashboardLayout from '../components/layout/DashboardLayout';
import { 
  History, Search, Filter, Play, ChevronDown, ChevronUp, Download, RotateCcw, 
  Plus, Target, BarChart, TrendingUp, Trophy, Star, BookOpen, Clock, Activity, 
  Zap, CheckCircle2, AlertCircle, Calendar, Briefcase, Building2, Map, Mic, Video, MessageSquare, Code2
} from 'lucide-react';

interface InterviewQuestion {
  id: string;
  question: string;
  userAnswer: string;
  aiEvaluation: string;
  correctApproach: string;
  improvement: string;
}

interface InterviewRecord {
  id: string;
  company: string;
  role: string;
  type: string;
  difficulty: string;
  mode: string;
  date: string;
  duration: number; // minutes
  score: number;
  status: 'Completed' | 'Interrupted';
  readiness: string;
  trend: 'Improved' | 'Stable' | 'Needs Improvement';
  
  scores: {
    technical: number;
    communication: number;
    confidence: number;
    problemSolving: number;
    behavioral?: number;
  };
  questions: InterviewQuestion[];
  strengths: string[];
  weaknesses: string[];
  recommendedTopics: string[];
}

export default function InterviewHistory() {
  const [interviews, setInterviews] = useState<InterviewRecord[]>([]); // Strictly empty as per instructions
  const [searchQuery, setSearchQuery] = useState('');
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [expandedId, setExpandedId] = useState<string | null>(null);

  // Derived stats (all will be 0 initially since interviews is empty)
  const stats = {
    total: interviews.length,
    technical: interviews.filter(i => i.type === 'Technical').length,
    hr: interviews.filter(i => i.type === 'HR').length,
    behavioral: interviews.filter(i => i.type === 'Behavioral').length,
    coding: interviews.filter(i => i.type === 'Coding').length,
    avgScore: interviews.length ? Math.round(interviews.reduce((acc, i) => acc + i.score, 0) / interviews.length) : 0,
    bestScore: interviews.length ? Math.max(...interviews.map(i => i.score)) : 0,
    totalTime: interviews.reduce((acc, i) => acc + (i.duration || 0), 0)
  };

  const earnedAchievements = interviews.length > 0 ? [] : []; // Populate based on real data when available

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
                  <History className="w-6 h-6 text-white" />
                </div>
                <h1 className="text-3xl md:text-4xl font-bold text-white tracking-tight">Interview History</h1>
              </div>
              <p className="text-slate-400 text-lg leading-relaxed">
                Review every AI interview you've completed, revisit your feedback, monitor your improvement over time, and continue preparing for your target role.
              </p>
            </div>
            
            {/* Minimal Illustration */}
            <div className="hidden lg:flex shrink-0 w-48 h-48 relative items-center justify-center">
              <div className="absolute inset-0 bg-purple-500/10 rounded-full blur-2xl animate-pulse" />
              <div className="relative w-32 h-32 bg-slate-800/80 rounded-2xl border border-white/10 shadow-2xl flex flex-col p-4 transform rotate-6 hover:rotate-0 transition-all duration-500 cursor-default">
                <div className="w-8 h-8 rounded-full bg-indigo-500/20 flex items-center justify-center mb-3">
                  <Activity className="w-4 h-4 text-indigo-400" />
                </div>
                <div className="space-y-2 flex-1">
                  <div className="h-2 w-full bg-slate-700 rounded-full" />
                  <div className="h-2 w-3/4 bg-slate-700 rounded-full" />
                  <div className="h-2 w-5/6 bg-slate-700 rounded-full" />
                </div>
                <div className="mt-auto flex items-center justify-between">
                  <div className="text-[10px] font-bold text-emerald-400">92% Match</div>
                  <div className="w-4 h-4 rounded-full bg-emerald-500/20 flex items-center justify-center">
                    <CheckCircle2 className="w-2.5 h-2.5 text-emerald-400" />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Compact Statistics Row */}
        <div className="grid grid-cols-2 md:grid-cols-4 xl:grid-cols-8 gap-4">
          <StatCard label="Total Interviews" value={stats.total} icon={Briefcase} />
          <StatCard label="Technical" value={stats.technical} icon={Code2} />
          <StatCard label="HR" value={stats.hr} icon={MessageSquare} />
          <StatCard label="Behavioral" value={stats.behavioral} icon={Target} />
          <StatCard label="Coding" value={stats.coding} icon={Zap} />
          <StatCard label="Avg AI Score" value={`${stats.avgScore}%`} icon={BarChart} />
          <StatCard label="Best Score" value={`${stats.bestScore}%`} icon={Trophy} color="text-yellow-400" />
          <StatCard label="Total Time" value={`${stats.totalTime}m`} icon={Clock} />
        </div>

        {interviews.length === 0 ? (
          /* Empty State */
          <div className="bg-slate-900/50 border border-white/5 rounded-3xl p-12 flex flex-col items-center justify-center text-center min-h-[400px]">
            <div className="w-24 h-24 rounded-3xl bg-slate-800/80 border border-white/10 flex items-center justify-center mb-6 shadow-2xl relative">
              <History className="w-10 h-10 text-slate-500" />
              <div className="absolute -bottom-2 -right-2 w-8 h-8 rounded-full bg-indigo-500 flex items-center justify-center border-4 border-slate-900">
                <Plus className="w-4 h-4 text-white" />
              </div>
            </div>
            <h3 className="text-2xl font-bold text-white mb-3">No Interview History Yet</h3>
            <p className="text-slate-400 max-w-lg mb-8 leading-relaxed">
              Complete your first AI mock interview to build your personalized interview history. Every completed session will be saved here with detailed AI feedback, progress tracking, strengths, improvement areas, and recommendations.
            </p>
            <button className="px-8 py-4 bg-indigo-500 hover:bg-indigo-600 text-white font-semibold rounded-xl shadow-lg shadow-indigo-500/25 transition-all flex items-center gap-2 hover:-translate-y-0.5">
              <Play className="w-5 h-5 fill-white" /> Start Your First Interview
            </button>
          </div>
        ) : (
          /* Populated State (Only rendered if interviews exist) */
          <div className="space-y-8">
            {/* Search & Filter Bar */}
            <div className="bg-slate-900 border border-white/10 rounded-2xl p-4">
              <div className="flex flex-col lg:flex-row gap-4">
                <div className="flex-1 relative">
                  <Search className="w-5 h-5 text-slate-500 absolute left-4 top-1/2 -translate-y-1/2" />
                  <input 
                    type="text" 
                    placeholder="Search past interviews by company, role, or topic..."
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
                <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-6 gap-4 pt-4 mt-4 border-t border-white/5 animate-in fade-in slide-in-from-top-2">
                  <FilterSelect label="Company" options={['Google', 'Amazon', 'Microsoft']} />
                  <FilterSelect label="Job Role" options={['Software Engineer', 'Frontend', 'Backend']} />
                  <FilterSelect label="Type" options={['Technical', 'HR', 'Behavioral', 'System Design']} />
                  <FilterSelect label="Difficulty" options={['Easy', 'Medium', 'Hard']} />
                  <FilterSelect label="Mode" options={['Voice', 'Text', 'Video']} />
                  <FilterSelect label="Status" options={['Completed', 'Interrupted']} />
                </div>
              )}
            </div>

            {/* Timeline Cards */}
            <div className="space-y-4 relative before:absolute before:inset-y-4 before:left-8 before:w-px before:bg-white/10 hidden md:block">
              {interviews.map((interview) => (
                <InterviewCard 
                  key={interview.id} 
                  interview={interview} 
                  isExpanded={expandedId === interview.id}
                  onToggle={() => setExpandedId(expandedId === interview.id ? null : interview.id)}
                />
              ))}
            </div>
            
            {/* Mobile Timeline Cards */}
            <div className="space-y-4 md:hidden">
              {interviews.map((interview) => (
                <InterviewCard 
                  key={interview.id} 
                  interview={interview} 
                  isExpanded={expandedId === interview.id}
                  onToggle={() => setExpandedId(expandedId === interview.id ? null : interview.id)}
                />
              ))}
            </div>

            {/* AI Insights Section */}
            <div className="bg-slate-900 border border-white/10 rounded-3xl p-8">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-10 h-10 rounded-lg bg-indigo-500/20 flex items-center justify-center">
                  <Zap className="w-5 h-5 text-indigo-400" />
                </div>
                <h2 className="text-xl font-bold text-white">AI Insights</h2>
              </div>
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                {/* Dynamically generated insights would go here based on interviews */}
              </div>
            </div>

            {/* Progress Trends */}
            <div className="bg-slate-900 border border-white/10 rounded-3xl p-8">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-10 h-10 rounded-lg bg-purple-500/20 flex items-center justify-center">
                  <TrendingUp className="w-5 h-5 text-purple-400" />
                </div>
                <h2 className="text-xl font-bold text-white">Progress Trends</h2>
              </div>
              <div className="h-64 flex items-center justify-center border border-white/5 rounded-xl bg-slate-950/50">
                <p className="text-slate-500">Visual trends will appear after your 3rd interview.</p>
              </div>
            </div>
          </div>
        )}

        {/* Achievements (Only shown if earned) */}
        {earnedAchievements.length > 0 && (
          <div className="bg-slate-900 border border-white/10 rounded-3xl p-8 mt-8">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-10 h-10 rounded-lg bg-yellow-500/20 flex items-center justify-center">
                <Trophy className="w-5 h-5 text-yellow-500" />
              </div>
              <h2 className="text-xl font-bold text-white">Earned Achievements</h2>
            </div>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {/* Earned achievements mapped here */}
            </div>
          </div>
        )}

        {/* Continue Preparation */}
        <div className="bg-gradient-to-r from-indigo-900/40 to-slate-900 border border-indigo-500/20 rounded-3xl p-8 relative overflow-hidden mt-8">
          <div className="absolute right-0 top-0 w-64 h-full bg-gradient-to-l from-indigo-500/10 to-transparent pointer-events-none" />
          <h2 className="text-xl font-bold text-white mb-2 relative z-10">Continue Preparation</h2>
          <p className="text-slate-400 mb-6 max-w-2xl relative z-10">
            {interviews.length === 0 
              ? "Ready to start your journey? Begin with a comprehensive mock interview to establish your baseline."
              : "Based on your recent performance, here are the recommended next steps to improve your readiness."}
          </p>
          
          <div className="flex flex-wrap gap-4 relative z-10">
            <button className="px-6 py-3 bg-indigo-500 hover:bg-indigo-600 text-white font-semibold rounded-xl shadow-lg shadow-indigo-500/25 transition-all flex items-center gap-2">
              <Play className="w-4 h-4 fill-white" /> Start New Interview
            </button>
            <button className="px-6 py-3 bg-slate-800 hover:bg-slate-700 text-white font-semibold rounded-xl border border-white/10 transition-all flex items-center gap-2">
              <Map className="w-4 h-4" /> Continue Learning Roadmap
            </button>
            {interviews.length > 0 && (
              <button className="px-6 py-3 bg-slate-800 hover:bg-slate-700 text-white font-semibold rounded-xl border border-white/10 transition-all flex items-center gap-2">
                <Target className="w-4 h-4" /> Practice Weak Topics
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

const InterviewCard: React.FC<{ interview: InterviewRecord, isExpanded: boolean, onToggle: () => void }> = ({ interview, isExpanded, onToggle }) => {
  return (
    <div className="relative md:pl-16">
      {/* Timeline Node */}
      <div className="hidden md:flex absolute left-4 top-8 w-8 h-8 -translate-x-1/2 rounded-full border-4 border-slate-950 bg-indigo-500 items-center justify-center z-10 shadow-lg shadow-indigo-500/20">
        <div className="w-2 h-2 rounded-full bg-white" />
      </div>

      <div className={`bg-slate-900 border ${isExpanded ? 'border-indigo-500/50 shadow-[0_0_30px_rgba(99,102,241,0.1)]' : 'border-white/10'} rounded-2xl overflow-hidden transition-all duration-300 hover:border-white/20`}>
        {/* Card Header (Always visible) */}
        <div 
          className="p-6 flex flex-col lg:flex-row lg:items-center justify-between gap-6 cursor-pointer"
          onClick={onToggle}
        >
          <div className="flex items-start gap-4">
            <div className="w-12 h-12 rounded-xl bg-slate-800 border border-white/5 flex items-center justify-center shrink-0 text-lg font-bold text-white uppercase">
              {interview.company.substring(0, 2)}
            </div>
            <div>
              <div className="flex flex-wrap items-center gap-2 mb-1">
                <h3 className="text-lg font-bold text-white">{interview.role}</h3>
                <span className="px-2 py-0.5 rounded text-[10px] font-bold uppercase tracking-wider bg-indigo-500/20 text-indigo-400">
                  {interview.type}
                </span>
                <span className={`px-2 py-0.5 rounded text-[10px] font-bold uppercase tracking-wider ${
                  interview.difficulty === 'Easy' ? 'bg-emerald-500/20 text-emerald-400' :
                  interview.difficulty === 'Medium' ? 'bg-yellow-500/20 text-yellow-400' :
                  'bg-red-500/20 text-red-400'
                }`}>
                  {interview.difficulty}
                </span>
              </div>
              <div className="flex flex-wrap items-center gap-4 text-sm text-slate-400">
                <span className="flex items-center gap-1.5"><Building2 className="w-3.5 h-3.5" /> {interview.company}</span>
                <span className="flex items-center gap-1.5"><Calendar className="w-3.5 h-3.5" /> {interview.date}</span>
                <span className="flex items-center gap-1.5"><Clock className="w-3.5 h-3.5" /> {interview.duration} mins</span>
                <span className="flex items-center gap-1.5"><Mic className="w-3.5 h-3.5" /> {interview.mode}</span>
              </div>
            </div>
          </div>

          <div className="flex items-center justify-between lg:justify-end gap-6 border-t lg:border-t-0 border-white/5 pt-4 lg:pt-0">
            <div className="text-center lg:text-right">
              <div className="text-[10px] font-semibold text-slate-500 uppercase tracking-wider mb-1">Readiness</div>
              <div className="text-sm font-medium text-slate-300">{interview.readiness}</div>
            </div>
            <div className="text-center lg:text-right">
              <div className="text-[10px] font-semibold text-slate-500 uppercase tracking-wider mb-1">Status</div>
              <div className={`text-sm font-medium flex items-center gap-1 ${interview.status === 'Completed' ? 'text-emerald-400' : 'text-yellow-400'}`}>
                {interview.status === 'Completed' ? <CheckCircle2 className="w-3.5 h-3.5" /> : <AlertCircle className="w-3.5 h-3.5" />}
                {interview.status}
              </div>
            </div>
            <div className="flex items-center gap-4">
              <div className="text-right">
                <div className="text-[10px] font-semibold text-slate-500 uppercase tracking-wider mb-1">AI Score</div>
                <div className={`text-2xl font-bold ${
                  interview.score >= 80 ? 'text-emerald-400' : 
                  interview.score >= 60 ? 'text-yellow-400' : 'text-red-400'
                }`}>
                  {interview.score}%
                </div>
              </div>
              <button className={`p-2 rounded-lg bg-slate-800 text-slate-400 hover:text-white transition-colors ${isExpanded ? 'rotate-180' : ''}`}>
                <ChevronDown className="w-5 h-5" />
              </button>
            </div>
          </div>
        </div>

        {/* Expanded Details */}
        {isExpanded && (
          <div className="border-t border-white/5 bg-slate-950/50 p-6 lg:p-8 animate-in slide-in-from-top-2 duration-300">
            
            {/* Overview Scores */}
            <div className="mb-8">
              <h4 className="text-sm font-bold text-white uppercase tracking-wider mb-4 flex items-center gap-2">
                <BarChart className="w-4 h-4 text-indigo-400" /> Interview Overview
              </h4>
              <div className="grid grid-cols-2 lg:grid-cols-5 gap-4">
                <ScoreBar label="Technical" score={interview.scores.technical} />
                <ScoreBar label="Communication" score={interview.scores.communication} />
                <ScoreBar label="Confidence" score={interview.scores.confidence} />
                <ScoreBar label="Problem Solving" score={interview.scores.problemSolving} />
                {interview.scores.behavioral !== undefined && (
                  <ScoreBar label="Behavioral" score={interview.scores.behavioral} />
                )}
              </div>
            </div>

            <div className="grid lg:grid-cols-3 gap-8">
              {/* Left Column: Strengths & Weaknesses */}
              <div className="space-y-6">
                <div>
                  <h4 className="text-sm font-bold text-emerald-400 uppercase tracking-wider mb-3 flex items-center gap-2">
                    <TrendingUp className="w-4 h-4" /> Strengths
                  </h4>
                  <ul className="space-y-2">
                    {interview.strengths.map((str, idx) => (
                      <li key={idx} className="flex items-start gap-2 text-sm text-slate-300">
                        <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0 mt-0.5" />
                        {str}
                      </li>
                    ))}
                  </ul>
                </div>

                <div>
                  <h4 className="text-sm font-bold text-red-400 uppercase tracking-wider mb-3 flex items-center gap-2">
                    <AlertCircle className="w-4 h-4" /> Weak Areas
                  </h4>
                  <ul className="space-y-2">
                    {interview.weaknesses.map((wk, idx) => (
                      <li key={idx} className="flex items-start gap-2 text-sm text-slate-300">
                        <div className="w-1.5 h-1.5 rounded-full bg-red-500 shrink-0 mt-1.5 ml-1.5 mr-0.5" />
                        {wk}
                      </li>
                    ))}
                  </ul>
                </div>

                <div>
                  <h4 className="text-sm font-bold text-indigo-400 uppercase tracking-wider mb-3 flex items-center gap-2">
                    <Target className="w-4 h-4" /> Recommended Next Topics
                  </h4>
                  <div className="flex flex-wrap gap-2">
                    {interview.recommendedTopics.map((topic, idx) => (
                      <span key={idx} className="px-3 py-1 bg-slate-800 border border-white/10 rounded-lg text-xs font-medium text-slate-300">
                        {topic}
                      </span>
                    ))}
                  </div>
                </div>
              </div>

              {/* Right Column: Q&A Breakdown */}
              <div className="lg:col-span-2 space-y-6">
                <h4 className="text-sm font-bold text-white uppercase tracking-wider mb-4 flex items-center gap-2">
                  <MessageSquare className="w-4 h-4 text-indigo-400" /> Questions Asked
                </h4>
                <div className="space-y-4">
                  {interview.questions.map((q, idx) => (
                    <div key={q.id} className="bg-slate-900 border border-white/5 rounded-xl p-5 space-y-4">
                      <div className="font-medium text-white text-sm">
                        <span className="text-indigo-400 mr-2">Q{idx + 1}.</span> {q.question}
                      </div>
                      <div className="bg-slate-950/50 rounded-lg p-4 text-sm text-slate-400 italic border-l-2 border-slate-700">
                        "{q.userAnswer}"
                      </div>
                      <div className="grid md:grid-cols-2 gap-4 mt-4 text-sm">
                        <div className="space-y-2">
                          <div className="text-[10px] font-bold text-slate-500 uppercase tracking-wider">AI Evaluation</div>
                          <div className="text-slate-300">{q.aiEvaluation}</div>
                        </div>
                        <div className="space-y-2">
                          <div className="text-[10px] font-bold text-slate-500 uppercase tracking-wider">Correct Approach</div>
                          <div className="text-slate-300">{q.correctApproach}</div>
                        </div>
                      </div>
                      <div className="pt-3 mt-3 border-t border-white/5 flex items-start gap-2 text-sm">
                        <Zap className="w-4 h-4 text-yellow-500 shrink-0 mt-0.5" />
                        <span className="text-slate-300">
                          <strong className="text-slate-200">Improvement:</strong> {q.improvement}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex flex-wrap items-center gap-3 mt-8 pt-6 border-t border-white/5">
              <button className="px-4 py-2 bg-indigo-500 hover:bg-indigo-600 text-white text-sm font-medium rounded-lg flex items-center gap-2 transition-colors">
                <RotateCcw className="w-4 h-4" /> Retake Interview
              </button>
              <button className="px-4 py-2 bg-slate-800 hover:bg-slate-700 text-white text-sm font-medium rounded-lg border border-white/10 flex items-center gap-2 transition-colors">
                <Download className="w-4 h-4" /> Download Feedback Report
              </button>
              <button className="px-4 py-2 bg-slate-800 hover:bg-slate-700 text-white text-sm font-medium rounded-lg border border-white/10 flex items-center gap-2 transition-colors">
                <BookOpen className="w-4 h-4" /> Add to Revision List
              </button>
            </div>

          </div>
        )}
      </div>
    </div>
  );
}

function ScoreBar({ label, score }: { label: string, score: number }) {
  const colorClass = score >= 80 ? 'bg-emerald-500' : score >= 60 ? 'bg-yellow-500' : 'bg-red-500';
  return (
    <div className="bg-slate-900 border border-white/5 rounded-xl p-4">
      <div className="flex items-center justify-between mb-2">
        <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">{label}</span>
        <span className={`text-sm font-bold ${score >= 80 ? 'text-emerald-400' : score >= 60 ? 'text-yellow-400' : 'text-red-400'}`}>
          {score}%
        </span>
      </div>
      <div className="h-1.5 w-full bg-slate-800 rounded-full overflow-hidden">
        <div className={`h-full ${colorClass} rounded-full`} style={{ width: `${score}%` }} />
      </div>
    </div>
  );
}

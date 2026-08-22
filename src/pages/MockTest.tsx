import React, { useState, useEffect } from 'react';
import { useMockTestStore } from '../store/mockTestStore';
import DashboardLayout from '../components/layout/DashboardLayout';

import DashboardFooter from '../components/dashboard/DashboardFooter';
import { motion } from 'motion/react';
import mockTestImg from '../assets/images/mock_test_ai_illustration_1784198447302.jpg';
import { 
  Building2, Briefcase, Clock, Play, BarChart, 
  Settings, Target, Trophy, CheckCircle, 
  Brain, Sparkles, Shield, ChevronRight, Zap, 
  Search, Code, Layout, Server, Database, Cloud, 
  ShieldCheck, BrainCircuit, FileCode2, History,
  TrendingUp, Award, Activity, Flame, Filter, Star, Layers,
  Bookmark, Edit3, Users, XCircle, FileText, ToggleLeft, ToggleRight, Download, RefreshCcw, LineChart, Heart, Shuffle, Check, Globe
, Monitor, Mic, Video, MessageSquare, Compass, Calendar
} from 'lucide-react';


const COMPANIES = {
  Technology: [
    { name: "Google", color: "from-blue-500 to-green-500", questions: 1240, diff: "Hard", tag: "FAANG" }, 
    { name: "Microsoft", color: "from-blue-400 to-cyan-500", questions: 980, diff: "Medium", tag: "Popular" }, 
    { name: "Amazon", color: "from-orange-500 to-yellow-500", questions: 1100, diff: "Hard", tag: "FAANG" }, 
    { name: "Apple", color: "from-gray-400 to-gray-200", questions: 850, diff: "Hard", tag: "FAANG" }, 
    { name: "Meta", color: "from-blue-600 to-blue-400", questions: 920, diff: "Hard", tag: "FAANG" }, 
    { name: "Netflix", color: "from-red-600 to-red-400", questions: 430, diff: "Expert", tag: "FAANG" }, 
    { name: "Adobe", color: "from-red-500 to-orange-500", questions: 560, diff: "Medium", tag: "Design" }, 
    { name: "Oracle", color: "from-red-500 to-rose-400", questions: 450, diff: "Medium", tag: "Cloud" }, 
    { name: "IBM", color: "from-blue-500 to-indigo-500", questions: 320, diff: "Medium", tag: "Enterprise" }, 
    { name: "Intel", color: "from-blue-600 to-cyan-400", questions: 280, diff: "Hard", tag: "Hardware" }, 
    { name: "NVIDIA", color: "from-green-500 to-green-400", questions: 410, diff: "Hard", tag: "AI/ML" }, 
    { name: "Cisco", color: "from-blue-500 to-blue-300", questions: 390, diff: "Medium", tag: "Networking" }, 
    { name: "Salesforce", color: "from-blue-400 to-blue-300", questions: 510, diff: "Medium", tag: "CRM" }, 
    { name: "Uber", color: "from-gray-900 to-gray-700", questions: 480, diff: "Hard", tag: "Tech" }, 
    { name: "Airbnb", color: "from-rose-500 to-rose-400", questions: 350, diff: "Medium", tag: "Product" }, 
    { name: "Atlassian", color: "from-blue-500 to-blue-400", questions: 290, diff: "Medium", tag: "SaaS" }, 
    { name: "SAP", color: "from-blue-600 to-blue-500", questions: 250, diff: "Medium", tag: "Enterprise" }, 
    { name: "ServiceNow", color: "from-emerald-500 to-emerald-400", questions: 210, diff: "Medium", tag: "Cloud" }, 
    { name: "VMware", color: "from-slate-500 to-slate-400", questions: 180, diff: "Hard", tag: "Virtualization" }, 
    { name: "Qualcomm", color: "from-blue-600 to-indigo-500", questions: 190, diff: "Hard", tag: "Hardware" }
  ],
  IndianProduct: [
    { name: "Flipkart", color: "from-blue-500 to-yellow-400", questions: 420, diff: "Hard", tag: "E-comm" },
    { name: "Meesho", color: "from-pink-500 to-pink-400", questions: 280, diff: "Medium", tag: "E-comm" },
    { name: "Razorpay", color: "from-blue-500 to-blue-400", questions: 350, diff: "Hard", tag: "Fintech" },
    { name: "CRED", color: "from-gray-800 to-gray-600", questions: 210, diff: "Medium", tag: "Fintech" },
    { name: "PhonePe", color: "from-purple-500 to-purple-400", questions: 380, diff: "Hard", tag: "Fintech" },
    { name: "Paytm", color: "from-blue-400 to-blue-300", questions: 450, diff: "Medium", tag: "Fintech" },
    { name: "Zoho", color: "from-red-500 to-red-400", questions: 310, diff: "Medium", tag: "SaaS" },
    { name: "Freshworks", color: "from-orange-500 to-orange-400", questions: 260, diff: "Medium", tag: "SaaS" },
    { name: "Ola", color: "from-green-500 to-green-400", questions: 290, diff: "Medium", tag: "Mobility" },
    { name: "Swiggy", color: "from-orange-500 to-orange-400", questions: 340, diff: "Hard", tag: "Foodtech" },
    { name: "Zomato", color: "from-red-500 to-red-400", questions: 320, diff: "Hard", tag: "Foodtech" },
    { name: "Dream11", color: "from-red-600 to-red-500", questions: 200, diff: "Medium", tag: "Gaming" },
    { name: "Groww", color: "from-teal-500 to-teal-400", questions: 180, diff: "Medium", tag: "Fintech" }
  ],
  Service: [
    { name: "TCS", color: "from-blue-600 to-blue-500", questions: 850, diff: "Easy", tag: "Mass IT" },
    { name: "Infosys", color: "from-blue-500 to-blue-400", questions: 720, diff: "Easy", tag: "Mass IT" },
    { name: "Wipro", color: "from-green-500 to-green-400", questions: 680, diff: "Easy", tag: "Mass IT" },
    { name: "HCLTech", color: "from-blue-600 to-cyan-500", questions: 550, diff: "Easy", tag: "IT" },
    { name: "Tech Mahindra", color: "from-red-600 to-red-500", questions: 490, diff: "Easy", tag: "IT" },
    { name: "Cognizant", color: "from-blue-600 to-blue-400", questions: 610, diff: "Medium", tag: "IT" },
    { name: "Capgemini", color: "from-blue-500 to-blue-300", questions: 540, diff: "Medium", tag: "IT" },
    { name: "Accenture", color: "from-purple-600 to-purple-500", questions: 760, diff: "Medium", tag: "Consulting" },
    { name: "Deloitte", color: "from-green-600 to-green-500", questions: 420, diff: "Medium", tag: "Big 4" },
    { name: "EY", color: "from-yellow-500 to-yellow-400", questions: 380, diff: "Medium", tag: "Big 4" },
    { name: "PwC", color: "from-orange-600 to-orange-500", questions: 350, diff: "Medium", tag: "Big 4" },
    { name: "KPMG", color: "from-blue-600 to-blue-500", questions: 340, diff: "Medium", tag: "Big 4" }
  ]
};

const JOB_ROLES = [
  { name: "Software Engineer", icon: Code, questions: 1200 },
  { name: "Frontend Developer", icon: Layout, questions: 850 },
  { name: "Backend Developer", icon: Server, questions: 920 },
  { name: "Full Stack Developer", icon: Layers, questions: 1050 },
  { name: "Java Developer", icon: FileCode2, questions: 640 },
  { name: "Python Developer", icon: FileCode2, questions: 720 },
  { name: "Data Analyst", icon: BarChart, questions: 580 },
  { name: "Data Scientist", icon: Brain, questions: 690 },
  { name: "AI Engineer", icon: BrainCircuit, questions: 420 },
  { name: "Machine Learning Engineer", icon: BrainCircuit, questions: 450 },
  { name: "DevOps Engineer", icon: Settings, questions: 380 },
  { name: "Cloud Engineer", icon: Cloud, questions: 410 },
  { name: "Cyber Security Engineer", icon: ShieldCheck, questions: 320 },
  { name: "QA Engineer", icon: CheckCircle, questions: 290 },
  { name: "Android Developer", icon: Target, questions: 340 },
  { name: "iOS Developer", icon: Target, questions: 310 },
  { name: "Product Manager", icon: Briefcase, questions: 480 },
  { name: "Business Analyst", icon: LineChart, questions: 360 },
  { name: "UI UX Designer", icon: Edit3, questions: 270 },
  { name: "HR", icon: Users, questions: 410 },
  { name: "Marketing", icon: Target, questions: 290 },
  { name: "Finance", icon: BarChart, questions: 240 },
  { name: "Sales", icon: TrendingUp, questions: 310 }
];

const MODES = [
  { name: "📝 Text Mode", desc: "Type answers, AI evaluates writing quality" }
];

const DIFFICULTIES = [
  { name: "Easy", desc: "Beginner, Fundamental Questions", color: "text-emerald-400" },
  { name: "Medium", desc: "Interview Standard", color: "text-orange-400" },
  { name: "Hard", desc: "FAANG Level", color: "text-red-400" },
  { name: "Adaptive", desc: "AI changes difficulty based on previous answers", color: "text-purple-400" }
];

const CATEGORIES = [
  { name: "Technical", icon: Code, color: "text-blue-400" },
  { name: "HR", icon: Users, color: "text-pink-400" },
  { name: "Behavioral", icon: Heart, color: "text-rose-400" },
  { name: "Aptitude", icon: Brain, color: "text-orange-400" },
  { name: "System Design", icon: Layers, color: "text-indigo-400" },
  { name: "Case Study", icon: FileText, color: "text-purple-400" },
  { name: "Mixed Interview", icon: Shuffle, color: "text-cyan-400" }
];

const LANGUAGES = ["English", "Hindi"];


import { useCompanyRoleStore } from '../store/companyRoleStore';
export default function MockTest() {
  const { companies, fetchData } = useCompanyRoleStore();
  useEffect(() => { fetchData(); }, [fetchData]);
  
  const mappedTechCompanies = companies.length ? companies.map(c => ({
    name: c.name,
    color: "from-slate-500 to-slate-400",
    questions: 100,
    diff: "Medium",
    tag: c.description?.substring(0,10) || "General"
  })) : COMPANIES.Technology;
  
  const [hasCompletedTest, setHasCompletedTest] = useState(false);
  const [isStarted, setIsStarted] = useState(false);
  const [testScore, setTestScore] = useState<number | null>(null);
  const { startTest, finishTest, fetchHistory, currentTest } = useMockTestStore();

  useEffect(() => {
    fetchHistory();
  }, [fetchHistory]);


  const handleStartTest = async () => {
    try {
      await startTest({
        company: selectedCompany || 'General',
        job_role: selectedRole || 'Software Engineer',
        questions: [],
      });
      setIsStarted(true);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } catch (e) {
      alert("Failed to start test. Please check your connection.");
    }
  };

  const handleFinishTest = async () => {
    if (currentTest?.id) {
      const generatedScore = Math.floor(Math.random() * 40) + 60; // Just for simulating an active test score, but ideally user answers questions.
      await finishTest(currentTest.id, {
        marks: generatedScore,
        percentage: generatedScore,
        time_taken: 1800
      });
      setTestScore(generatedScore);
      setIsStarted(false);
      setHasCompletedTest(true);
      window.scrollTo({ top: document.body.scrollHeight, behavior: 'smooth' });
    }
  };

  
  const [companySearchQuery, setCompanySearchQuery] = useState('');
  const [selectedCompany, setSelectedCompany] = useState<string | null>(null);
  const [selectedRole, setSelectedRole] = useState<string | null>(null);
  const [selectedMode, setSelectedMode] = useState<string | null>(null);
  const [selectedDifficulty, setSelectedDifficulty] = useState<string | null>(null);
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [selectedLanguage, setSelectedLanguage] = useState<string | null>(null);
  
  const [numQuestions, setNumQuestions] = useState(10);
  const [timeLimit, setTimeLimit] = useState<number | null>(null);
  const [negativeMarking, setNegativeMarking] = useState(false);
  const [randomQuestions, setRandomQuestions] = useState(true);
  const [aiAdaptive, setAiAdaptive] = useState(true);


  const filteredTechCompanies = mappedTechCompanies.filter(c => c.name.toLowerCase().includes(companySearchQuery.toLowerCase()));
  const filteredIndianCompanies = COMPANIES.IndianProduct.filter(c => c.name.toLowerCase().includes(companySearchQuery.toLowerCase()));
  const filteredServiceCompanies = COMPANIES.Service.filter(c => c.name.toLowerCase().includes(companySearchQuery.toLowerCase()));
  
  const isFormComplete = selectedCompany && selectedRole && selectedDifficulty && selectedLanguage && timeLimit;


  if (isStarted) {
    return (
      <DashboardLayout>
        <div className="max-w-4xl mx-auto space-y-6 pt-10">
          <div className="bg-slate-900 border border-indigo-500/30 rounded-3xl p-8">
            <h2 className="text-2xl font-bold text-white mb-4">Mock Test In Progress: {selectedCompany} - {selectedRole}</h2>
            <p className="text-slate-400 mb-8">Please answer the questions presented by the system. (Placeholder for test workspace)</p>
            <div className="flex justify-end">
              <button 
                onClick={handleFinishTest}
                className="px-6 py-3 bg-indigo-500 hover:bg-indigo-600 text-white rounded-xl font-bold transition-all"
              >
                Submit Answers
              </button>
            </div>
          </div>
        </div>
      </DashboardLayout>
    );
  }

  return (
    <DashboardLayout>
      <div className="space-y-12 pb-12">

              
              {/* 1. Hero Section */}
              <div className="relative overflow-hidden bg-slate-900/40 backdrop-blur-md border border-white/5 rounded-[24px] p-6 lg:p-10 flex flex-col md:flex-row items-center justify-between gap-6 md:gap-8 shadow-sm">
                <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-gradient-to-br from-purple-500/10 via-pink-500/10 to-orange-500/10 rounded-full blur-[80px] pointer-events-none -translate-y-1/2 translate-x-1/4" />
                
                <div className="flex-1 md:max-w-[50%] lg:max-w-2xl relative z-10 flex flex-col items-center md:items-start text-center md:text-left">
                  <div className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-gradient-to-r from-purple-500/10 to-orange-500/10 border border-purple-500/20 text-purple-300 text-[10px] md:text-xs font-bold uppercase tracking-wider mb-3 md:mb-5 shadow-[inset_0_0_10px_rgba(168,85,247,0.1)]">
                     <Sparkles className="w-3 h-3 md:w-3.5 md:h-3.5" />
                     AI-Powered Mock Tests
                  </div>
                  <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white mb-3 md:mb-5 leading-[1.1] tracking-tight">
                     Simulate Real Interviews. <br className="hidden md:block" /> <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 via-purple-400 to-pink-400">Master Your Skills.</span>
                  </h1>
                  <p className="text-sm md:text-base text-slate-300 mb-6 md:mb-8 max-w-xl leading-relaxed">
                     Experience company-specific mock tests with adaptive difficulty, AI analysis, and detailed performance insights. Prepare for the exact questions you'll face.
                  </p>
                  <div className="flex flex-col sm:flex-row gap-3 w-full sm:w-auto">
                     <button className="px-6 py-3 bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-500 hover:to-purple-500 text-white rounded-xl font-bold shadow-lg shadow-indigo-500/25 transition-all flex items-center justify-center gap-2 group">
                        Start Test
                        <Play className="w-4 h-4 fill-current group-hover:translate-x-1 transition-transform" />
                     </button>
                     <button className="px-6 py-3 bg-white/5 hover:bg-white/10 text-white border border-white/10 rounded-xl font-semibold transition-colors flex items-center justify-center gap-2">
                        Continue Test
                        <History className="w-4 h-4 text-slate-400" />
                     </button>
                  </div>
                </div>

                <div className="flex-1 md:max-w-[50%] relative z-10 flex items-center justify-center mt-8 md:mt-0 lg:mr-12">
                   <motion.div
                     initial={{ opacity: 0, y: 20 }}
                     animate={{ opacity: 1, y: 0 }}
                     transition={{ duration: 0.8, ease: "easeOut" }}
                     className="relative w-full max-w-[320px] sm:max-w-[400px] lg:max-w-[450px]"
                   >
                      <div className="absolute inset-0 bg-gradient-to-tr from-indigo-500/20 to-purple-500/20 rounded-2xl blur-2xl transform -rotate-6 scale-105"></div>
                      <img 
                        src={mockTestImg} 
                        alt="AI Mock Test Illustration" 
                        className="relative rounded-2xl shadow-2xl border border-white/10 w-full h-auto object-cover z-10"
                      />
                      <div className="absolute -bottom-4 -left-4 bg-slate-900 border border-white/10 p-3 rounded-xl shadow-xl z-20 flex items-center gap-3">
                         <div className="w-10 h-10 rounded-full bg-emerald-500/20 flex items-center justify-center">
                            <CheckCircle className="w-5 h-5 text-emerald-400" />
                         </div>
                         <div>
                            <div className="text-xs text-slate-400 font-medium">Readiness</div>
                            <div className="text-sm text-white font-bold">94% Score</div>
                         </div>
                      </div>
                   </motion.div>
                </div>
              </div>

              {/* Quick Filter Bar */}
              <div className="relative z-20 bg-slate-900/80 backdrop-blur-xl border border-white/10 rounded-[24px] p-4 shadow-xl shadow-black/20">
                 <div className="flex flex-col xl:flex-row xl:items-center justify-between gap-4">
                   <div className="flex flex-wrap gap-3 flex-1">
                     <div className="flex-1 min-w-[130px]">
                       <select 
                         value={selectedCompany || ""}
                         onChange={(e) => setSelectedCompany(e.target.value)}
                         className="w-full bg-slate-950/50 border border-white/5 rounded-xl px-4 py-2.5 text-sm text-slate-200 focus:outline-none focus:border-indigo-500 appearance-none hover:bg-slate-900 transition-colors cursor-pointer">
                         <option value="" disabled hidden>Company</option>
                         {[...mappedTechCompanies, ...COMPANIES.IndianProduct, ...COMPANIES.Service].map(c => (
                           <option key={c.name} value={c.name} className="bg-slate-900 text-slate-200">{c.name}</option>
                         ))}
                       </select>
                     </div>
                     <div className="flex-1 min-w-[130px]">
                       <select 
                         value={selectedRole || ""}
                         onChange={(e) => setSelectedRole(e.target.value)}
                         className="w-full bg-slate-950/50 border border-white/5 rounded-xl px-4 py-2.5 text-sm text-slate-200 focus:outline-none focus:border-indigo-500 appearance-none hover:bg-slate-900 transition-colors cursor-pointer">
                         <option value="" disabled hidden>Role</option>
                         {JOB_ROLES.map(r => (
                           <option key={r.name} value={r.name} className="bg-slate-900 text-slate-200">{r.name}</option>
                         ))}
                       </select>
                     </div>
                     <div className="flex-1 min-w-[130px]">
                       <select 
                         value={selectedDifficulty || ""}
                         onChange={(e) => setSelectedDifficulty(e.target.value)}
                         className="w-full bg-slate-950/50 border border-white/5 rounded-xl px-4 py-2.5 text-sm text-slate-200 focus:outline-none focus:border-indigo-500 appearance-none hover:bg-slate-900 transition-colors cursor-pointer">
                         <option value="" disabled hidden>Difficulty</option>
                         {DIFFICULTIES.map(d => (
                           <option key={d.name} value={d.name} className="bg-slate-900 text-slate-200">{d.name}</option>
                         ))}
                       </select>
                     </div>
                     <div className="flex-1 min-w-[130px]">
                       <select 
                         value={timeLimit ? `${timeLimit} min` : ""}
                         onChange={(e) => setTimeLimit(parseInt(e.target.value))}
                         className="w-full bg-slate-950/50 border border-white/5 rounded-xl px-4 py-2.5 text-sm text-slate-200 focus:outline-none focus:border-indigo-500 appearance-none hover:bg-slate-900 transition-colors cursor-pointer">
                         <option value="" disabled hidden>Duration</option>
                         <option value="15 min" className="bg-slate-900 text-slate-200">15 Mins</option>
                         <option value="30 min" className="bg-slate-900 text-slate-200">30 Mins</option>
                         <option value="45 min" className="bg-slate-900 text-slate-200">45 Mins</option>
                         <option value="60 min" className="bg-slate-900 text-slate-200">60 Mins</option>
                       </select>
                     </div>
                     <div className="flex-1 min-w-[130px]">
                       <select 
                         value={selectedLanguage || ""}
                         onChange={(e) => setSelectedLanguage(e.target.value)}
                         className="w-full bg-slate-950/50 border border-white/5 rounded-xl px-4 py-2.5 text-sm text-slate-200 focus:outline-none focus:border-indigo-500 appearance-none hover:bg-slate-900 transition-colors cursor-pointer">
                         <option value="" disabled hidden>Language</option>
                         {LANGUAGES.map(l => (
                           <option key={l} value={l} className="bg-slate-900 text-slate-200">{l}</option>
                         ))}
                       </select>
                     </div>
                   </div>
                   <div className="flex items-center gap-3 w-full xl:w-auto">
                     <div className="relative flex-1 xl:w-64">
                       <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                         <Search className="h-4 w-4 text-slate-400" />
                       </div>
                       <input 
                         type="text" 
                         placeholder="Search tests..." 
                         className="w-full bg-slate-950/50 border border-white/5 rounded-xl pl-10 pr-4 py-2.5 text-sm text-slate-200 focus:outline-none focus:border-indigo-500 hover:bg-slate-900 transition-colors"
                       />
                     </div>
                     
                   </div>
                 </div>
              </div>

              
              
              {/* Start Mock Test Button */}
              <div className="flex justify-center mt-8 mb-12">
                <button 
                  disabled={!isFormComplete}
                  onClick={handleStartTest} 
                  className={`px-12 py-5 rounded-2xl font-bold text-lg transition-all flex items-center gap-3 shadow-xl ${
                    isFormComplete 
                      ? 'bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-500 hover:to-purple-500 text-white shadow-indigo-500/25 cursor-pointer' 
                      : 'bg-slate-800 text-slate-500 border border-slate-700 shadow-none cursor-not-allowed'
                  }`}
                >
                  Start Mock Test
                </button>
              </div>

              {/* 2. Mock Test Guidelines */}
              <div className="mb-12">
                <h2 className="text-2xl font-bold text-white mb-6">Mock Test Guidelines</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                  <div className="bg-slate-900/40 border border-white/5 rounded-[24px] p-6 hover:bg-slate-800/60 transition-colors">
                     <div className="w-12 h-12 rounded-xl bg-blue-500/10 flex items-center justify-center mb-5">
                       <FileText className="w-6 h-6 text-blue-400" />
                     </div>
                     <h3 className="font-bold text-white mb-3 text-lg">Test Instructions</h3>
                     <ul className="text-sm text-slate-400 space-y-2 list-disc pl-4">
                       <li>Read every question carefully.</li>
                       <li>Complete within the selected time.</li>
                       <li>AI evaluates accuracy and confidence.</li>
                     </ul>
                  </div>
                  <div className="bg-slate-900/40 border border-white/5 rounded-[24px] p-6 hover:bg-slate-800/60 transition-colors">
                     <div className="w-12 h-12 rounded-xl bg-purple-500/10 flex items-center justify-center mb-5">
                       <Mic className="w-6 h-6 text-purple-400" />
                     </div>
                     <h3 className="font-bold text-white mb-3 text-lg">Voice Mode</h3>
                     <ul className="text-sm text-slate-400 space-y-2 list-disc pl-4">
                       <li>Speak clearly.</li>
                       <li>Minimize background noise.</li>
                       <li>Avoid long pauses.</li>
                     </ul>
                  </div>
                  
                  
                </div>
              </div>

              {/* 3. AI Features */}
              <div className="mb-16">
                <h2 className="text-2xl font-bold text-white mb-6">AI Powered Features</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                  {[
                    { icon: Zap, label: "Instant Feedback", color: "text-yellow-400" },
                    { icon: Mic, label: "Voice Analysis", color: "text-blue-400" },
                    { icon: MessageSquare, label: "Communication Score", color: "text-emerald-400" },
                    { icon: Code, label: "Coding Analysis", color: "text-pink-400" },
                    { icon: Flame, label: "Adaptive Difficulty", color: "text-orange-400" },
                    { icon: Target, label: "Performance Tracking", color: "text-cyan-400" },
                    { icon: Compass, label: "Personalized Recs", color: "text-indigo-400" },
                    { icon: BarChart, label: "Progress Analytics", color: "text-purple-400" },
                  ].map((feat, i) => (
                    <div key={i} className="bg-slate-900/40 border border-white/5 rounded-2xl p-5 flex items-center gap-4 hover:bg-slate-800/60 transition-colors cursor-pointer group">
                       <div className="w-12 h-12 rounded-xl bg-slate-800 flex items-center justify-center shrink-0 group-hover:scale-105 transition-transform border border-white/5">
                         <feat.icon className={`w-6 h-6 ${feat.color}`} />
                       </div>
                       <span className="font-semibold text-slate-200 text-sm group-hover:text-white transition-colors">{feat.label}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* 4. Performance Dashboard (Conditional) */}
              {hasCompletedTest && (
                <div className="mb-16">
                  <div className="bg-gradient-to-r from-emerald-900/20 to-teal-900/20 border border-emerald-500/20 rounded-[32px] p-8 lg:p-12 shadow-2xl">
                     <h2 className="text-3xl font-bold text-white flex items-center gap-3 mb-10">
                       <Trophy className="w-8 h-8 text-yellow-400" />
                       Performance Dashboard
                     </h2>
                     <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-6 mb-10">
                       <div className="bg-slate-900/60 rounded-2xl p-6 border border-white/5 hover:border-emerald-500/30 transition-colors">
                         <div className="text-slate-400 text-sm mb-2 font-medium">Overall Score</div>
                         <div className="text-4xl font-extrabold text-white">87%</div>
                       </div>
                       <div className="bg-slate-900/60 rounded-2xl p-6 border border-white/5 hover:border-emerald-500/30 transition-colors">
                         <div className="text-slate-400 text-sm mb-2 font-medium">Accuracy</div>
                         <div className="text-4xl font-extrabold text-emerald-400">92%</div>
                       </div>
                       <div className="bg-slate-900/60 rounded-2xl p-6 border border-white/5 hover:border-emerald-500/30 transition-colors">
                         <div className="text-slate-400 text-sm mb-2 font-medium">Correct Answers</div>
                         <div className="text-4xl font-extrabold text-blue-400">35</div>
                       </div>
                       <div className="bg-slate-900/60 rounded-2xl p-6 border border-white/5 hover:border-emerald-500/30 transition-colors">
                         <div className="text-slate-400 text-sm mb-2 font-medium">Wrong Answers</div>
                         <div className="text-4xl font-extrabold text-red-400">3</div>
                       </div>
                       <div className="bg-slate-900/60 rounded-2xl p-6 border border-white/5 hover:border-emerald-500/30 transition-colors">
                         <div className="text-slate-400 text-sm mb-2 font-medium">Time Taken</div>
                         <div className="text-4xl font-extrabold text-purple-400">42m</div>
                       </div>
                     </div>

                     <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                        <div className="lg:col-span-2 bg-slate-900/60 rounded-3xl p-8 border border-white/5">
                          <h3 className="text-xl font-bold text-white mb-6 flex items-center gap-2">
                            <BrainCircuit className="w-5 h-5 text-indigo-400" /> AI Evaluation
                          </h3>
                          <p className="text-slate-300 leading-relaxed mb-8 text-lg">
                            Great job on the <strong className="text-white">{selectedCompany || 'Google'}</strong> mock test! Your problem-solving speed is excellent. However, you struggled with Dynamic Programming edge cases. We recommend reviewing DP state transitions and space optimization.
                          </p>
                          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                            <div className="p-5 bg-slate-800/50 rounded-2xl border border-white/5">
                              <div className="text-slate-400 text-sm mb-2 font-medium">Communication Score</div>
                              <div className="text-2xl font-bold text-emerald-400">8/10</div>
                            </div>
                            <div className="p-5 bg-slate-800/50 rounded-2xl border border-white/5">
                              <div className="text-slate-400 text-sm mb-2 font-medium">Coding Score</div>
                              <div className="text-2xl font-bold text-indigo-400">9/10</div>
                            </div>
                            <div className="p-5 bg-slate-800/50 rounded-2xl border border-white/5">
                              <div className="text-slate-400 text-sm mb-2 font-medium">Confidence Score</div>
                              <div className="text-2xl font-bold text-blue-400">7.5/10</div>
                            </div>
                          </div>
                          
                          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 p-6 bg-slate-800/30 rounded-2xl">
                            <div>
                              <h4 className="font-bold text-emerald-400 mb-4 text-lg">Strong Topics</h4>
                              <ul className="text-slate-300 space-y-3 list-disc pl-5">
                                <li>Arrays & Hashing</li>
                                <li>System Design (Microservices)</li>
                              </ul>
                            </div>
                            <div>
                              <h4 className="font-bold text-red-400 mb-4 text-lg">Weak Topics</h4>
                              <ul className="text-slate-300 space-y-3 list-disc pl-5">
                                <li>Dynamic Programming</li>
                                <li>Graph Traversal</li>
                              </ul>
                            </div>
                          </div>
                        </div>

                        <div className="bg-slate-900/60 rounded-3xl p-8 border border-white/5">
                           <h3 className="text-xl font-bold text-white mb-6 flex items-center gap-2">
                             <TrendingUp className="w-5 h-5 text-orange-400" /> Improvement Suggestions
                           </h3>
                           <div className="space-y-6">
                              <div className="flex gap-4">
                                <div className="w-10 h-10 rounded-xl bg-indigo-500/20 flex items-center justify-center shrink-0 border border-indigo-500/30">
                                  <span className="text-indigo-400 font-bold">1</span>
                                </div>
                                <p className="text-slate-300 mt-1">Review the top 15 Dynamic Programming questions commonly asked at {selectedCompany || 'top tech companies'}.</p>
                              </div>
                              <div className="flex gap-4">
                                <div className="w-10 h-10 rounded-xl bg-indigo-500/20 flex items-center justify-center shrink-0 border border-indigo-500/30">
                                  <span className="text-indigo-400 font-bold">2</span>
                                </div>
                                <p className="text-slate-300 mt-1">Practice speaking clearly while coding to improve your communication score.</p>
                              </div>
                              <div className="flex gap-4">
                                <div className="w-10 h-10 rounded-xl bg-indigo-500/20 flex items-center justify-center shrink-0 border border-indigo-500/30">
                                  <span className="text-indigo-400 font-bold">3</span>
                                </div>
                                <p className="text-slate-300 mt-1">Focus on edge cases when writing graph traversal algorithms (BFS/DFS).</p>
                              </div>
                           </div>
                        </div>
                     </div>
                  </div>
                </div>
              )}

              {/* 5. Performance History */}

              {hasCompletedTest && testScore !== null && (
                <div className="mb-16">
                   <h2 className="text-2xl font-bold text-white mb-8 flex items-center gap-2">
                     <History className="w-6 h-6 text-slate-400" /> Recent Result
                   </h2>
                   <div className="grid grid-cols-1 gap-6">
                       <div className="bg-slate-900/40 border border-emerald-500/30 rounded-2xl p-6 flex justify-between items-center hover:bg-slate-800/60 transition-colors group">
                          <div className="flex items-center gap-5">
                            <div className="w-14 h-14 rounded-2xl bg-slate-800 flex items-center justify-center font-bold text-white text-2xl border border-white/5 shadow-inner">
                              {currentTest?.company?.charAt(0) || 'G'}
                            </div>
                            <div>
                              <div className="font-bold text-slate-200 text-lg mb-1 group-hover:text-white transition-colors">{currentTest?.company} - {currentTest?.job_role}</div>
                              <div className="text-sm text-slate-400 font-medium">Just now • {currentTest?.difficulty || 'Medium'}</div>
                            </div>
                          </div>
                          <div className="flex flex-col items-end gap-3">
                            <div className="text-3xl font-black text-emerald-400">{testScore}%</div>
                          </div>
                       </div>
                   </div>
                </div>
              )}

              {/* 6. Recommended Practice */}
              {hasCompletedTest && (
                <div className="mb-16">
                   <h2 className="text-2xl font-bold text-white mb-8 flex items-center gap-2">
                     <Compass className="w-6 h-6 text-indigo-400" /> Recommended Practice
                   </h2>
                   <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                      
                      <div className="bg-slate-900/40 border border-white/5 rounded-3xl p-8 hover:bg-slate-800/60 transition-colors flex flex-col group">
                         <div className="w-14 h-14 rounded-2xl bg-blue-500/10 flex items-center justify-center mb-6 group-hover:scale-105 transition-transform">
                           <Server className="w-7 h-7 text-blue-400" />
                         </div>
                         <h3 className="text-lg font-bold text-white mb-2">System Design</h3>
                         <div className="text-sm text-orange-400 font-bold mb-4">Medium</div>
                         <p className="text-slate-400 mb-8 leading-relaxed flex-1">Design highly scalable systems and understand tradeoffs.</p>
                         <button className="w-full py-3.5 bg-white/5 hover:bg-white/10 text-white rounded-xl font-bold transition-colors border border-white/5">Practice Now</button>
                      </div>
                      <div className="bg-slate-900/40 border border-white/5 rounded-3xl p-8 hover:bg-slate-800/60 transition-colors flex flex-col group">
                         <div className="w-14 h-14 rounded-2xl bg-pink-500/10 flex items-center justify-center mb-6 group-hover:scale-105 transition-transform">
                           <Users className="w-7 h-7 text-pink-400" />
                         </div>
                         <h3 className="text-lg font-bold text-white mb-2">Behavioral Questions</h3>
                         <div className="text-sm text-emerald-400 font-bold mb-4">Easy</div>
                         <p className="text-slate-400 mb-8 leading-relaxed flex-1">Master the STAR method for leadership principle rounds.</p>
                         <button className="w-full py-3.5 bg-white/5 hover:bg-white/10 text-white rounded-xl font-bold transition-colors border border-white/5">Practice Now</button>
                      </div>
                   </div>
                </div>
              )}

              {/* 7. Recent Activity */}
              {hasCompletedTest && (
                <div className="mb-16">
                   <h2 className="text-2xl font-bold text-white mb-8">Recent Activity</h2>
                   <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                     <div className="bg-slate-900/40 border border-white/5 rounded-2xl p-6 flex items-start gap-4">
                        <CheckCircle className="w-6 h-6 text-emerald-400 shrink-0 mt-0.5" />
                        <div>
                          <div className="font-bold text-slate-200 mb-1">Completed Google Mock Test</div>
                          <div className="text-sm text-slate-400">2 hours ago</div>
                        </div>
                     </div>
                     <div className="bg-slate-900/40 border border-white/5 rounded-2xl p-6 flex items-start gap-4">
                        <CheckCircle className="w-6 h-6 text-emerald-400 shrink-0 mt-0.5" />
                        <div>
                          <div className="font-bold text-slate-200 mb-1">Completed Amazon Coding Round</div>
                          <div className="text-sm text-slate-400">1 day ago</div>
                        </div>
                     </div>
                     <div className="bg-slate-900/40 border border-white/5 rounded-2xl p-6 flex items-start gap-4">
                        <TrendingUp className="w-6 h-6 text-blue-400 shrink-0 mt-0.5" />
                        <div>
                          <div className="font-bold text-slate-200 mb-1">Improved Communication Score</div>
                          <div className="text-sm text-slate-400">3 days ago</div>
                        </div>
                     </div>
                     <div className="bg-slate-900/40 border border-white/5 rounded-2xl p-6 flex items-start gap-4">
                        <CheckCircle className="w-6 h-6 text-emerald-400 shrink-0 mt-0.5" />
                        <div>
                          <div className="font-bold text-slate-200 mb-1">Completed Java Assessment</div>
                          <div className="text-sm text-slate-400">1 week ago</div>
                        </div>
                     </div>
                   </div>
                </div>
              )}

              {/* 8. Daily Challenge */}
              <div className="mb-16">
                <div className="bg-gradient-to-r from-orange-900/20 to-pink-900/20 border border-orange-500/20 rounded-[32px] p-8 md:p-12 flex flex-col md:flex-row items-center justify-between gap-8 shadow-2xl relative overflow-hidden">
                   <div className="absolute top-0 right-0 w-64 h-64 bg-orange-500/10 rounded-full blur-[60px] pointer-events-none -translate-y-1/2 translate-x-1/4" />
                   <div className="flex items-center gap-8 relative z-10">
                     <div className="w-20 h-20 rounded-[24px] bg-orange-500/20 border border-orange-500/30 flex items-center justify-center shrink-0 shadow-inner">
                       <Calendar className="w-10 h-10 text-orange-400" />
                     </div>
                     <div>
                       <h3 className="text-2xl font-bold text-white mb-3">Today's AI Challenge</h3>
                       <div className="flex flex-wrap items-center gap-4 text-sm font-bold">
                         <span className="px-3 py-1.5 rounded-lg bg-orange-500/10 text-orange-400 border border-orange-500/20">Hard</span>
                         <span className="text-slate-300">45 Mins</span>
                         <span className="flex items-center gap-1.5 text-yellow-400"><Star className="w-4 h-4 fill-current" /> 500 Pts Reward</span>
                       </div>
                     </div>
                   </div>
                   <button className="w-full md:w-auto px-10 py-5 bg-gradient-to-r from-orange-500 to-pink-500 hover:from-orange-400 hover:to-pink-400 text-white rounded-2xl font-bold text-lg transition-all shadow-xl shadow-orange-500/20 relative z-10 flex items-center justify-center gap-2">
                     Start Daily Challenge <Play className="w-5 h-5 fill-current" />
                   </button>
                </div>
              </div>

              {/* 9. Bottom CTA */}
              <div className="relative overflow-hidden bg-gradient-to-br from-indigo-600 via-purple-600 to-indigo-900 rounded-[40px] p-10 md:p-16 flex flex-col md:flex-row items-center justify-between gap-12 shadow-2xl mb-12">
                 <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-white/10 rounded-full blur-[100px] pointer-events-none -translate-y-1/3 translate-x-1/4" />
                 <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-indigo-400/20 rounded-full blur-[80px] pointer-events-none translate-y-1/3 -translate-x-1/4" />
                 
                 <div className="relative z-10 max-w-2xl">
                    <h2 className="text-4xl sm:text-5xl font-extrabold text-white mb-6 leading-tight">Ready to Ace Your Next Interview?</h2>
                    <p className="text-indigo-100 text-xl mb-10 leading-relaxed font-medium">
                      Continue practicing to improve your interview skills with AI-powered feedback, real-time analytics, and adaptive questioning.
                    </p>
                    <div className="flex flex-col sm:flex-row gap-5">
                      <button onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })} className="px-10 py-5 bg-white text-indigo-700 hover:bg-indigo-50 rounded-2xl font-bold text-lg transition-all shadow-2xl flex items-center justify-center gap-3">
                        🚀 Start Another Mock Test
                      </button>
                      <button onClick={() => {
                        if (!hasCompletedTest) {
                          alert("Complete a mock test first to view progress!");
                        } else {
                          window.scrollTo({ top: document.body.scrollHeight / 2, behavior: 'smooth' });
                        }
                      }} className="px-10 py-5 bg-indigo-900/40 hover:bg-indigo-900/60 text-white border border-white/20 rounded-2xl font-bold text-lg transition-all backdrop-blur-sm flex items-center justify-center gap-3">
                        📊 View Progress
                      </button>
                    </div>
                 </div>
                 
                 <div className="relative z-10 hidden lg:flex w-72 h-72 shrink-0 bg-white/5 border border-white/10 rounded-[40px] backdrop-blur-xl p-8 flex-col items-center justify-center transform rotate-3 shadow-2xl hover:rotate-0 transition-transform duration-500">
                    <Brain className="w-28 h-28 text-white mb-8 animate-pulse drop-shadow-2xl" />
                    <div className="w-full h-3 bg-white/10 rounded-full mb-4 overflow-hidden border border-white/10">
                      <div className="h-full bg-gradient-to-r from-blue-400 to-emerald-400 w-3/4 rounded-full" />
                    </div>
                    <div className="text-white/90 font-bold tracking-wide uppercase text-sm">AI Analyzing...</div>
                 </div>
              </div>

                    </div>
    </DashboardLayout>
  );
}

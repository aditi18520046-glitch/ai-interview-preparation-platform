cat << 'INNER_EOF' > src/pages/MockInterview.tsx
import React, { useState, useEffect } from 'react';
import Sidebar from '../components/dashboard/Sidebar';
import TopNav from '../components/dashboard/TopNav';
import DashboardFooter from '../components/dashboard/DashboardFooter';
import { motion } from 'motion/react';
import { 
  Building2, Briefcase, Clock, Play, BarChart, 
  Settings, Languages, Mic, Target, Trophy, 
  Activity, Star, CheckCircle2, ChevronRight,
  TrendingUp, Sparkles, BrainCircuit, Globe,
  MessageSquare, Video, FileText, ChevronDown,
  Search, Calendar, Timer, Zap, X, Upload, Info, Monitor, Bot, User, Code2
} from 'lucide-react';
import { useDashboardData } from '../hooks/useDashboardData';

const COMPANIES = ['Google', 'Microsoft', 'Amazon', 'Apple', 'Meta', 'Netflix', 'Adobe', 'Oracle', 'IBM', 'Intel', 'NVIDIA', 'AMD', 'Cisco', 'Salesforce', 'SAP', 'Dell', 'HP', 'Qualcomm', 'OpenAI', 'Anthropic', 'Uber', 'Airbnb', 'Spotify', 'LinkedIn', 'Tesla', 'SpaceX', 'TCS', 'Infosys', 'Wipro', 'HCL', 'Accenture', 'Capgemini', 'Cognizant', 'Tech Mahindra', 'Deloitte', 'EY', 'PwC', 'KPMG', 'JP Morgan', 'Goldman Sachs', 'Morgan Stanley', 'American Express', 'Visa', 'Mastercard', 'PayPal', 'Reliance', 'Jio', 'Airtel', 'Flipkart', 'Myntra', 'Meesho', 'Swiggy', 'Zomato', 'Ola', 'Samsung', 'Sony', 'Bosch', 'Siemens'];

const ROLES = ['Software Engineer', 'Frontend Developer', 'Backend Developer', 'Full Stack Developer', 'Java Developer', 'Python Developer', 'AI Engineer', 'Machine Learning Engineer', 'Data Scientist', 'Cloud Engineer', 'Cyber Security Engineer', 'DevOps Engineer', 'Android Developer', 'Flutter Developer', 'Product Manager', 'Business Analyst', 'QA Engineer', 'UI Designer', 'HR', 'Marketing', 'Finance', 'Sales', 'Support Engineer'];

const EXPERIENCES = ['Fresher', 'Internship', '0–1 Years', '1–3 Years', '3–5 Years', '5–10 Years', '10+ Years'];
const DIFFICULTIES = ['Easy', 'Medium', 'Hard', 'Expert'];
const TYPES = ['Technical', 'HR', 'Behavioral', 'Coding', 'System Design', 'Aptitude', 'Mixed'];
const MODES = ['Text', 'Voice', 'Video'];
const PROGRAMMING_LANGUAGES = ['Java', 'Python', 'C++', 'JavaScript', 'C#', 'Go', 'Rust', 'PHP', 'Kotlin', 'Swift', 'SQL'];
const LANGUAGES = ['English', 'Hindi', 'Hinglish'];
const DURATIONS = ['10 Minutes', '20 Minutes', '30 Minutes', '45 Minutes', '60 Minutes'];
const FOCUS_TOPICS = ['DSA', 'OOP', 'Operating System', 'DBMS', 'Computer Networks', 'SQL', 'System Design', 'Java', 'Python', 'React', 'Node.js', 'Machine Learning', 'Cloud', 'Behavioral', 'HR', 'Projects', 'Resume Based Questions'];

function Dropdown({ icon: Icon, label, options, value, onChange, placeholder, colorClass, searchable = false }) {
  const [isOpen, setIsOpen] = useState(false);
  const [search, setSearch] = useState('');

  const filteredOptions = searchable 
    ? options.filter(opt => opt.toLowerCase().includes(search.toLowerCase()))
    : options;

  return (
    <div className="relative">
      <label className="flex items-center gap-2 text-[11px] font-bold text-slate-400 uppercase tracking-wider mb-2">
        <Icon className={`w-3.5 h-3.5 ${colorClass}`} />
        {label}
      </label>
      <div 
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center justify-between w-full bg-slate-900/40 border border-white/5 hover:border-white/10 rounded-xl px-4 py-3 cursor-pointer transition-colors backdrop-blur-sm shadow-sm"
      >
        <span className={value ? "text-slate-200 text-sm font-medium" : "text-slate-500 text-sm"}>
          {value || placeholder}
        </span>
        <ChevronDown className={`w-4 h-4 text-slate-400 transition-transform ${isOpen ? 'rotate-180' : ''}`} />
      </div>

      {isOpen && (
        <div className="absolute top-full left-0 right-0 mt-2 bg-slate-800 border border-white/10 rounded-xl shadow-xl overflow-hidden z-30">
          {searchable && (
            <div className="p-2 border-b border-white/10">
              <div className="flex items-center bg-slate-900/50 rounded-lg px-3 py-2 border border-white/5 focus-within:border-indigo-500/50 transition-colors">
                <Search className="w-4 h-4 text-slate-400 mr-2" />
                <input 
                  type="text" 
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  placeholder="Search..." 
                  className="bg-transparent border-none outline-none text-sm text-slate-200 w-full"
                  onClick={(e) => e.stopPropagation()}
                />
              </div>
            </div>
          )}
          <div className="max-h-60 overflow-y-auto scrollbar-hide py-1">
            {filteredOptions.length > 0 ? filteredOptions.map((opt, idx) => (
              <div 
                key={idx}
                onClick={() => { onChange(opt); setIsOpen(false); setSearch(''); }}
                className="px-4 py-2.5 text-sm text-slate-300 hover:text-white hover:bg-indigo-500/20 cursor-pointer transition-colors"
              >
                {opt}
              </div>
            )) : (
              <div className="px-4 py-3 text-sm text-slate-500 text-center">No results found</div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}

function MultiSelect({ icon: Icon, label, options, values, onChange, colorClass }) {
  const toggle = (opt) => {
    if (values.includes(opt)) {
      onChange(values.filter(v => v !== opt));
    } else {
      onChange([...values, opt]);
    }
  };

  return (
    <div className="col-span-full">
      <label className="flex items-center gap-2 text-[11px] font-bold text-slate-400 uppercase tracking-wider mb-3">
        <Icon className={`w-3.5 h-3.5 ${colorClass}`} />
        {label}
      </label>
      <div className="flex flex-wrap gap-2">
        {options.map((opt, idx) => {
          const isSelected = values.includes(opt);
          return (
            <div 
              key={idx}
              onClick={() => toggle(opt)}
              className={`px-3 py-1.5 rounded-lg text-[13px] font-medium cursor-pointer transition-all border ${
                isSelected 
                  ? 'bg-gradient-to-r from-indigo-500/20 to-purple-500/20 border-indigo-500/30 text-indigo-300 shadow-sm' 
                  : 'bg-slate-900/40 border-white/5 text-slate-400 hover:border-white/20 hover:text-slate-300 hover:bg-slate-800'
              }`}
            >
              {opt}
            </div>
          );
        })}
      </div>
    </div>
  );
}

function FileUpload({ icon: Icon, label, description, colorClass }) {
  return (
    <div className="relative group cursor-pointer">
      <div className="absolute inset-0 bg-gradient-to-r from-indigo-500/5 to-purple-500/5 rounded-2xl blur-md opacity-0 group-hover:opacity-100 transition-opacity" />
      <div className="relative bg-slate-900/40 backdrop-blur-md border border-white/5 hover:border-white/20 rounded-2xl p-6 transition-all flex flex-col items-center justify-center text-center h-full border-dashed">
        <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${colorClass} flex items-center justify-center mb-3 shadow-lg group-hover:scale-110 transition-transform`}>
          <Icon className="w-6 h-6 text-white" />
        </div>
        <h3 className="text-sm font-semibold text-slate-200 mb-1">{label}</h3>
        <p className="text-[11px] text-slate-400 mb-4">{description}</p>
        <button className="px-4 py-2 bg-white/5 hover:bg-white/10 text-slate-300 text-xs font-semibold rounded-lg transition-colors border border-white/5">
          Browse Files
        </button>
      </div>
    </div>
  );
}

export default function MockInterview() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false);

  // Form State
  const [company, setCompany] = useState('');
  const [role, setRole] = useState('');
  const [experience, setExperience] = useState('');
  const [difficulty, setDifficulty] = useState('');
  const [type, setType] = useState('');
  const [mode, setMode] = useState('');
  const [language, setLanguage] = useState('');
  const [duration, setDuration] = useState('');
  const [progLanguage, setProgLanguage] = useState('');
  const [focusTopics, setFocusTopics] = useState([]);

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 1024 && window.innerWidth < 1280) {
        setIsSidebarCollapsed(true);
      } else if (window.innerWidth >= 1280) {
        setIsSidebarCollapsed(false);
      }
    };
    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const toggleSidebar = () => setIsSidebarCollapsed(!isSidebarCollapsed);

  const isFormComplete = company && role && experience && difficulty && type && mode && language && duration && focusTopics.length > 0 && (type !== 'Coding' || progLanguage);

  return (
    <div className="min-h-screen bg-slate-950 text-slate-50 font-sans selection:bg-indigo-500/30 flex">
      <Sidebar 
        isOpen={isMobileMenuOpen} 
        onClose={() => setIsMobileMenuOpen(false)} 
        isCollapsed={isSidebarCollapsed}
      />
      
      <div className={`flex-1 flex flex-col min-w-0 transition-all duration-300 relative ${isSidebarCollapsed ? 'lg:ml-[76px]' : 'lg:ml-64'}`}>
        <div className="fixed top-0 left-1/4 w-[800px] h-[800px] bg-indigo-600/5 rounded-full blur-[150px] pointer-events-none z-0" />
        <div className="fixed bottom-0 right-0 w-[600px] h-[600px] bg-purple-600/5 rounded-full blur-[120px] pointer-events-none z-0" />

        <TopNav 
          onMobileMenuClick={() => setIsMobileMenuOpen(true)} 
          onToggleSidebar={toggleSidebar}
          isSidebarCollapsed={isSidebarCollapsed}
        />

        <main className="flex-1 p-4 md:p-6 lg:p-8 overflow-y-auto overflow-x-hidden relative z-10 scrollbar-hide">
          <div className="max-w-[1440px] mx-auto space-y-8">
            
            {/* 1. Hero Section */}
            <div className="relative overflow-hidden bg-slate-900/40 backdrop-blur-md border border-white/5 rounded-[24px] p-6 lg:p-10 flex flex-col md:flex-row items-center justify-between gap-8 shadow-sm">
              <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-gradient-to-br from-purple-500/10 via-pink-500/10 to-orange-500/10 rounded-full blur-[80px] pointer-events-none -translate-y-1/2 translate-x-1/4" />
              <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-gradient-to-tr from-cyan-500/10 via-emerald-500/10 to-blue-500/10 rounded-full blur-[80px] pointer-events-none translate-y-1/2 -translate-x-1/4" />
              
              <div className="max-w-2xl relative z-10">
                <div className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-gradient-to-r from-purple-500/10 to-orange-500/10 border border-purple-500/20 text-purple-300 text-xs font-bold uppercase tracking-wider mb-5 shadow-[inset_0_0_10px_rgba(168,85,247,0.1)]">
                  <Sparkles className="w-4 h-4 text-orange-400" />
                  AI Mock Interview Practice
                </div>
                <h1 className="text-3xl lg:text-4xl font-extrabold text-white mb-4 tracking-tight leading-tight">
                  Simulate Your Dream Interview
                </h1>
                <p className="text-slate-300 text-sm leading-relaxed max-w-xl font-medium">
                  "Prepare with realistic AI-powered interviews, receive instant feedback, improve confidence, and get ready for your dream company."
                </p>
              </div>
              
              <div className="hidden md:flex relative z-10 shrink-0 items-center justify-center mr-4 lg:mr-12">
                 <div className="relative w-64 h-64">
                    {/* Colorful AI Illustration using shapes and icons */}
                    <div className="absolute inset-0 bg-gradient-to-br from-purple-500/20 via-cyan-500/20 to-orange-500/20 rounded-full blur-3xl animate-pulse" />
                    
                    {/* Main Robot/Screen Concept */}
                    <div className="absolute inset-4 bg-slate-900/80 backdrop-blur-md rounded-3xl border border-white/10 shadow-2xl flex items-center justify-center overflow-hidden">
                       <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-purple-500 via-cyan-500 to-green-500" />
                       <Bot className="w-20 h-20 text-cyan-400 drop-shadow-[0_0_15px_rgba(34,211,238,0.5)] mb-4" strokeWidth={1.5} />
                       <div className="absolute bottom-6 flex gap-2">
                          <div className="w-2 h-2 rounded-full bg-orange-400 animate-bounce" style={{ animationDelay: '0ms' }} />
                          <div className="w-2 h-2 rounded-full bg-purple-400 animate-bounce" style={{ animationDelay: '150ms' }} />
                          <div className="w-2 h-2 rounded-full bg-green-400 animate-bounce" style={{ animationDelay: '300ms' }} />
                       </div>
                    </div>

                    {/* Floating Elements */}
                    <motion.div 
                      animate={{ y: [0, -10, 0] }}
                      transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                      className="absolute -top-4 -right-4 w-14 h-14 bg-gradient-to-br from-orange-400 to-pink-500 rounded-2xl flex items-center justify-center shadow-lg shadow-orange-500/20 border border-white/10 rotate-12"
                    >
                      <User className="w-6 h-6 text-white" />
                    </motion.div>
                    
                    <motion.div 
                      animate={{ y: [0, 15, 0] }}
                      transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
                      className="absolute bottom-4 -left-6 w-12 h-12 bg-gradient-to-br from-cyan-400 to-blue-500 rounded-full flex items-center justify-center shadow-lg shadow-cyan-500/20 border border-white/10 -rotate-12"
                    >
                      <MessageSquare className="w-5 h-5 text-white" />
                    </motion.div>

                    <motion.div 
                      animate={{ scale: [1, 1.1, 1] }}
                      transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
                      className="absolute -top-2 left-8 w-8 h-8 bg-gradient-to-br from-green-400 to-emerald-500 rounded-lg flex items-center justify-center shadow-lg shadow-green-500/20 border border-white/10"
                    >
                      <Building2 className="w-4 h-4 text-white" />
                    </motion.div>
                 </div>
              </div>
            </div>

            {/* 2. Configuration Grid */}
            <div className="bg-slate-900/40 backdrop-blur-md border border-white/5 rounded-[24px] p-6 lg:p-8 shadow-sm relative overflow-hidden">
              <div className="flex items-center gap-3 mb-8 relative z-10">
                <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-purple-500 to-pink-500 flex items-center justify-center shadow-lg">
                  <Settings className="w-5 h-5 text-white" />
                </div>
                <div>
                  <h2 className="text-xl font-bold text-white">Interview Configuration</h2>
                  <p className="text-xs text-slate-400 mt-0.5">Customize your AI mock interview experience</p>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 relative z-10 mb-8">
                <Dropdown 
                  icon={Building2} label="Company" colorClass="text-purple-400" 
                  options={COMPANIES} value={company} onChange={setCompany} placeholder="Select Company" searchable={true}
                />
                <Dropdown 
                  icon={Briefcase} label="Job Role" colorClass="text-pink-400" 
                  options={ROLES} value={role} onChange={setRole} placeholder="Select Role" searchable={true}
                />
                <Dropdown 
                  icon={Star} label="Experience" colorClass="text-orange-400" 
                  options={EXPERIENCES} value={experience} onChange={setExperience} placeholder="Select Level" 
                />
                <Dropdown 
                  icon={Target} label="Difficulty" colorClass="text-red-400" 
                  options={DIFFICULTIES} value={difficulty} onChange={setDifficulty} placeholder="Select Difficulty" 
                />
                <Dropdown 
                  icon={FileText} label="Interview Type" colorClass="text-emerald-400" 
                  options={TYPES} value={type} onChange={setType} placeholder="Select Type" 
                />
                {type === 'Coding' && (
                  <Dropdown 
                    icon={Code2} label="Programming Language" colorClass="text-blue-400" 
                    options={PROGRAMMING_LANGUAGES} value={progLanguage} onChange={setProgLanguage} placeholder="Select Language" 
                  />
                )}
                <Dropdown 
                  icon={Monitor} label="Interview Mode" colorClass="text-cyan-400" 
                  options={MODES} value={mode} onChange={setMode} placeholder="Select Mode" 
                />
                <Dropdown 
                  icon={Globe} label="Interview Language" colorClass="text-yellow-400" 
                  options={LANGUAGES} value={language} onChange={setLanguage} placeholder="Select Language" 
                />
                <Dropdown 
                  icon={Timer} label="Duration" colorClass="text-indigo-400" 
                  options={DURATIONS} value={duration} onChange={setDuration} placeholder="Select Duration" 
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 relative z-10 mb-8">
                <FileUpload 
                  icon={FileText} 
                  label="Upload Resume (Optional)" 
                  description="Supported: PDF (Max 5MB). AI will personalize questions based on your resume."
                  colorClass="from-blue-500 to-cyan-500"
                />
                <FileUpload 
                  icon={Briefcase} 
                  label="Upload Job Description (Optional)" 
                  description="Supported: PDF/TXT (Max 5MB). AI will tailor questions to the specific role."
                  colorClass="from-purple-500 to-indigo-500"
                />
              </div>

              <div className="relative z-10">
                <MultiSelect 
                  icon={BrainCircuit} label="Skills Focus (Optional)" colorClass="text-green-400"
                  options={FOCUS_TOPICS} values={focusTopics} onChange={setFocusTopics}
                />
              </div>
            </div>

            {/* 3. Instructions & Start */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              
              {/* Instructions */}
              <div className="lg:col-span-2 bg-slate-900/40 backdrop-blur-md border border-white/5 rounded-[24px] p-6 lg:p-8 shadow-sm">
                <div className="flex items-center gap-3 mb-6">
                  <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-cyan-500 to-blue-500 flex items-center justify-center shadow-lg">
                    <Info className="w-5 h-5 text-white" />
                  </div>
                  <div>
                    <h2 className="text-xl font-bold text-white">Interview Instructions</h2>
                    <p className="text-xs text-slate-400 mt-0.5">Please read before starting</p>
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {[
                    'Grant Camera and Microphone permissions',
                    'Ensure a quiet environment',
                    'Maintain a stable internet connection',
                    'Keep your resume ready for reference',
                    'Do not switch tabs during the interview',
                    'Complete the interview honestly',
                    'Expect AI-generated personalized questions',
                    'Receive instant AI feedback after completion'
                  ].map((instruction, idx) => (
                    <div key={idx} className="flex items-start gap-3 bg-white/5 border border-white/5 rounded-xl p-3.5 hover:bg-white/10 transition-colors">
                      <div className="w-5 h-5 rounded-full bg-emerald-500/20 flex items-center justify-center shrink-0 mt-0.5">
                        <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
                      </div>
                      <span className="text-[13px] font-medium text-slate-300 leading-tight">{instruction}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Start Card */}
              <div className="lg:col-span-1 bg-slate-900/40 backdrop-blur-md border border-white/5 rounded-[24px] p-6 lg:p-8 shadow-sm flex flex-col items-center text-center">
                <div className="flex-1 flex flex-col items-center justify-center w-full">
                  <div className="w-full bg-slate-800/50 rounded-2xl p-4 mb-6 border border-white/5">
                    <div className="flex justify-between items-center mb-3">
                      <span className="text-xs font-semibold text-slate-400 uppercase">Est. Questions</span>
                      <span className="text-sm font-bold text-white">10–15</span>
                    </div>
                    <div className="flex justify-between items-center mb-4">
                      <span className="text-xs font-semibold text-slate-400 uppercase">Est. Duration</span>
                      <span className="text-sm font-bold text-white">{duration || '30 Minutes'}</span>
                    </div>
                    <div className="pt-3 border-t border-white/10">
                      <p className="text-[11px] font-semibold text-slate-400 uppercase mb-2">AI Evaluation Criteria</p>
                      <div className="flex flex-wrap justify-center gap-1.5">
                        {['Communication', 'Technical Skills', 'Confidence', 'Problem Solving', 'Behavior'].map((crit, i) => (
                          <span key={i} className="text-[10px] font-medium px-2 py-1 bg-white/5 text-slate-300 rounded-md border border-white/5">
                            {crit}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>

                  <button 
                    disabled={!isFormComplete}
                    className={`w-full py-4 rounded-xl text-[15px] font-bold flex items-center justify-center gap-2 transition-all shadow-xl
                      ${isFormComplete 
                        ? 'bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 hover:from-indigo-600 hover:via-purple-600 hover:to-pink-600 text-white hover:-translate-y-1 shadow-indigo-500/25 cursor-pointer' 
                        : 'bg-slate-800 text-slate-500 border border-slate-700 shadow-none cursor-not-allowed'
                      }
                    `}
                  >
                    <Sparkles className={`w-5 h-5 ${isFormComplete ? 'animate-pulse text-yellow-300' : ''}`} />
                    {isFormComplete ? '🚀 Start AI Mock Interview' : 'Complete Setup to Start'}
                  </button>
                </div>
              </div>

            </div>

            <DashboardFooter />
          </div>
        </main>
      </div>
    </div>
  );
}
INNER_EOF

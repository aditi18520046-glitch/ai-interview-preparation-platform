import React, { useState } from 'react';
import DashboardLayout from '../components/layout/DashboardLayout';
import MockInterviewWorkspace from '../components/interview/MockInterviewWorkspace';
import { motion } from 'motion/react';
import interviewImg from '../assets/images/ai_hologram_interview_1784197892421.jpg';
import { 
  Building2, Briefcase, Settings, Target, 
  Star, CheckCircle2, Monitor, Mic, Video, Globe,
  MessageSquare, FileText, Code2, BrainCircuit, Info,
  Timer, ChevronDown, Search, Zap, Sparkles
} from 'lucide-react';

const COMPANIES = ['Google', 'Microsoft', 'Amazon', 'Apple', 'Meta', 'Netflix', 'Adobe', 'Oracle', 'IBM', 'Intel', 'NVIDIA', 'Cisco', 'Salesforce'];
const ROLES = ['Software Engineer', 'Frontend Developer', 'Backend Developer', 'Full Stack Developer', 'Java Developer', 'Python Developer', 'Data Scientist', 'Product Manager'];
const EXPERIENCES = ['Fresher', 'Internship', '0–1 Years', '1–3 Years', '3–5 Years', '5–10 Years', '10+ Years'];
const DIFFICULTIES = ['Easy', 'Medium', 'Hard', 'Expert'];
const TYPES = ['Technical', 'HR', 'Behavioral', 'Coding', 'System Design', 'Aptitude', 'Mixed'];
const MODES = ['Text', 'Voice', 'Video'];
const PROGRAMMING_LANGUAGES = ['Java', 'Python', 'C++', 'JavaScript', 'C#', 'Go', 'Rust', 'Swift', 'SQL'];
const LANGUAGES = ['English', 'Hindi', 'Hinglish'];
const DURATIONS = ['10 Minutes', '20 Minutes', '30 Minutes', '45 Minutes', '60 Minutes'];
const FOCUS_TOPICS = ['DSA', 'OOP', 'Operating System', 'DBMS', 'Computer Networks', 'SQL', 'System Design', 'React', 'Node.js', 'Behavioral'];

function Dropdown({ id, openDropdownId, setOpenDropdownId, icon: Icon, label, options, value, onChange, placeholder, colorClass, searchable = false }) {
  const isOpen = openDropdownId === id;
  const setIsOpen = (open) => {
    setOpenDropdownId(open ? id : null);
    if (!open) setSearch('');
  };
  const [search, setSearch] = useState('');
  const dropdownRef = React.useRef(null);
  
  React.useEffect(() => {
    function handleClickOutside(event) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        if (isOpen) setIsOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [isOpen, setIsOpen]);
  
  const filteredOptions = searchable 
    ? options.filter(opt => opt.toLowerCase().includes(search.toLowerCase()))
    : options;

  return (
    <div className={`relative ${isOpen ? 'z-50' : ''}`} ref={dropdownRef}>
      <label className="block text-xs font-semibold text-slate-400 uppercase tracking-wider mb-2">{label}</label>
      <div 
        onClick={() => setIsOpen(!isOpen)}
        className={`w-full bg-slate-900/50 border ${isOpen ? 'border-indigo-500' : 'border-white/10'} rounded-xl px-4 py-3.5 flex items-center justify-between cursor-pointer hover:border-white/20 transition-all`}
      >
        <div className="flex items-center gap-3 overflow-hidden">
          <Icon className={`w-4 h-4 ${colorClass}`} />
          <span className={`text-sm truncate ${value ? 'text-white' : 'text-slate-500'}`}>{value || placeholder}</span>
        </div>
        <ChevronDown className={`w-4 h-4 text-slate-400 transition-transform ${isOpen ? 'rotate-180' : ''}`} />
      </div>
      
      {isOpen && (
        <div className="absolute z-50 top-full left-0 right-0 mt-2 bg-slate-800 border border-white/10 rounded-xl shadow-xl overflow-hidden">
          {searchable && (
            <div className="p-2 border-b border-white/10">
              <div className="relative">
                <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
                <input 
                  type="text" 
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  placeholder="Search..."
                  className="w-full bg-slate-900/50 border border-white/5 rounded-lg pl-9 pr-3 py-2 text-sm text-white focus:outline-none focus:border-indigo-500"
                  onClick={(e) => e.stopPropagation()}
                />
              </div>
            </div>
          )}
          <div className="max-h-60 overflow-y-auto scrollbar-hide py-1">
            {filteredOptions.length > 0 ? filteredOptions.map((opt, i) => (
              <div 
                key={i} 
                onClick={() => { onChange(opt); setIsOpen(false); setSearch(''); }}
                className={`px-4 py-2.5 text-sm cursor-pointer hover:bg-slate-700/50 transition-colors flex items-center gap-2 ${value === opt ? 'text-indigo-400 font-bold bg-indigo-500/10' : 'text-slate-300'}`}
              >
                {value === opt && <CheckCircle2 className="w-4 h-4" />}
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
  const toggleOption = (opt) => {
    if (values.includes(opt)) {
      onChange(values.filter(v => v !== opt));
    } else {
      onChange([...values, opt]);
    }
  };

  return (
    <div className="w-full">
      <div className="flex items-center gap-2 mb-3">
        <Icon className={`w-4 h-4 ${colorClass}`} />
        <label className="block text-xs font-semibold text-slate-400 uppercase tracking-wider">{label}</label>
      </div>
      <div className="flex flex-wrap gap-2">
        {options.map((opt, i) => {
          const isSelected = values.includes(opt);
          return (
            <div 
              key={i} 
              onClick={(e) => { e.stopPropagation(); toggleOption(opt); }}
              className={`px-3 py-1.5 rounded-lg text-xs font-medium cursor-pointer transition-all border ${isSelected ? 'bg-indigo-500/20 border-indigo-500/50 text-indigo-300' : 'bg-slate-900/50 border-white/5 text-slate-400 hover:text-white hover:border-white/20'}`}
            >
              {opt}
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default function MockInterview() {
  const [openDropdownId, setOpenDropdownId] = useState(null);
  const [isStarted, setIsStarted] = useState(false);
  const [company, setCompany] = useState(null);
  const [role, setRole] = useState(null);
  const [experience, setExperience] = useState(null);
  const [difficulty, setDifficulty] = useState(null);
  const [type, setType] = useState(null);
  const [progLanguage, setProgLanguage] = useState(null);
  const [mode, setMode] = useState(null);
  const [language, setLanguage] = useState(null);
  const [duration, setDuration] = useState(null);
  const [focusTopics, setFocusTopics] = useState([]);

  const isFormComplete = company && role && experience && difficulty && type && mode && language && duration && (type !== 'Coding' || progLanguage);

  if (isStarted) {
    return (
      <DashboardLayout>
        <MockInterviewWorkspace onEnd={() => setIsStarted(false)} />
      </DashboardLayout>
    );
  }

  return (
    <DashboardLayout>
      <div className="space-y-8">

            
            {/* 1. Hero Section */}
            <div className="relative overflow-hidden bg-slate-900/40 backdrop-blur-md border border-white/5 rounded-[24px] p-6 lg:p-10 flex flex-col md:flex-row items-center justify-between gap-6 md:gap-8 shadow-sm">
              <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-gradient-to-br from-purple-500/10 via-pink-500/10 to-orange-500/10 rounded-full blur-[80px] pointer-events-none -translate-y-1/2 translate-x-1/4" />
              <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-gradient-to-tr from-cyan-500/10 via-emerald-500/10 to-blue-500/10 rounded-full blur-[80px] pointer-events-none translate-y-1/2 -translate-x-1/4" />
              
              <div className="flex-1 md:max-w-[50%] lg:max-w-2xl relative z-10 flex flex-col items-center md:items-start text-center md:text-left">
                <div className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-gradient-to-r from-purple-500/10 to-orange-500/10 border border-purple-500/20 text-purple-300 text-[10px] md:text-xs font-bold uppercase tracking-wider mb-3 md:mb-5 shadow-[inset_0_0_10px_rgba(168,85,247,0.1)]">
                  <Sparkles className="w-3 h-3 md:w-4 md:h-4 text-orange-400" />
                  AI Mock Interview Practice
                </div>
                <h1 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-white mb-2 md:mb-4 tracking-tight leading-tight">
                  Simulate Your Dream Interview
                </h1>
                <p className="text-slate-300 text-xs sm:text-sm leading-relaxed max-w-xl font-medium">
                  "Prepare with realistic AI-powered interviews, receive instant feedback, improve confidence, and get ready for your dream company."
                </p>
              </div>
              
              <div className="flex-1 md:max-w-[50%] relative z-10 flex items-center justify-center mt-8 md:mt-0 mr-0 lg:mr-12">
                 <motion.div
                   initial={{ opacity: 0, scale: 0.9 }}
                   animate={{ opacity: 1, scale: 1 }}
                   transition={{ duration: 0.8 }}
                   className="w-full max-w-[280px] sm:max-w-[320px] md:max-w-md lg:max-w-lg"
                 >
                   <img src={interviewImg} alt="AI Mock Interview" className="w-full h-auto object-contain rounded-2xl drop-shadow-[0_0_30px_rgba(168,85,247,0.3)]" />
                 </motion.div>
              </div>
            </div>

            {/* 2. Configuration Grid */}
            <div className="bg-slate-900/40 backdrop-blur-md border border-white/5 rounded-[24px] p-6 lg:p-8 shadow-sm relative">
              <div className="flex items-center gap-3 mb-8 relative z-10">
                <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-purple-500 to-pink-500 flex items-center justify-center shadow-lg">
                  <Settings className="w-5 h-5 text-white" />
                </div>
                <div>
                  <h2 className="text-xl font-bold text-white">Interview Configuration</h2>
                  <p className="text-xs text-slate-400 mt-0.5">Customize your AI mock interview experience</p>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 mb-8">
                <Dropdown 
                  id="company" openDropdownId={openDropdownId} setOpenDropdownId={setOpenDropdownId}
                  icon={Building2} label="Company" colorClass="text-purple-400" 
                  options={COMPANIES} value={company} onChange={setCompany} placeholder="Select Company" searchable={true}
                />
                <Dropdown 
                  id="role" openDropdownId={openDropdownId} setOpenDropdownId={setOpenDropdownId}
                  icon={Briefcase} label="Job Role" colorClass="text-pink-400" 
                  options={ROLES} value={role} onChange={setRole} placeholder="Select Role" searchable={true}
                />
                <Dropdown 
                  id="experience" openDropdownId={openDropdownId} setOpenDropdownId={setOpenDropdownId}
                  icon={Star} label="Experience" colorClass="text-orange-400" 
                  options={EXPERIENCES} value={experience} onChange={setExperience} placeholder="Select Level" 
                />
                <Dropdown 
                  id="difficulty" openDropdownId={openDropdownId} setOpenDropdownId={setOpenDropdownId}
                  icon={Target} label="Difficulty" colorClass="text-red-400" 
                  options={DIFFICULTIES} value={difficulty} onChange={setDifficulty} placeholder="Select Difficulty" 
                />
                <Dropdown 
                  id="type" openDropdownId={openDropdownId} setOpenDropdownId={setOpenDropdownId}
                  icon={FileText} label="Interview Type" colorClass="text-emerald-400" 
                  options={TYPES} value={type} onChange={setType} placeholder="Select Type" 
                />
                {type === 'Coding' && (
                  <Dropdown 
                    id="progLanguage" openDropdownId={openDropdownId} setOpenDropdownId={setOpenDropdownId}
                    icon={Code2} label="Programming Language" colorClass="text-blue-400" 
                    options={PROGRAMMING_LANGUAGES} value={progLanguage} onChange={setProgLanguage} placeholder="Select Language" 
                  />
                )}
                <Dropdown 
                  id="mode" openDropdownId={openDropdownId} setOpenDropdownId={setOpenDropdownId}
                  icon={Monitor} label="Interview Mode" colorClass="text-cyan-400" 
                  options={MODES} value={mode} onChange={setMode} placeholder="Select Mode" 
                />
                <Dropdown 
                  id="language" openDropdownId={openDropdownId} setOpenDropdownId={setOpenDropdownId}
                  icon={Globe} label="Interview Language" colorClass="text-yellow-400" 
                  options={LANGUAGES} value={language} onChange={setLanguage} placeholder="Select Language" 
                />
                <Dropdown 
                  id="duration" openDropdownId={openDropdownId} setOpenDropdownId={setOpenDropdownId}
                  icon={Timer} label="Duration" colorClass="text-indigo-400" 
                  options={DURATIONS} value={duration} onChange={setDuration} placeholder="Select Duration" 
                />
              </div>

              <div className="mt-8">
                <MultiSelect 
                  icon={BrainCircuit} label="Skills Focus (Optional)" colorClass="text-green-400"
                  options={FOCUS_TOPICS} values={focusTopics} onChange={setFocusTopics}
                />
              </div>

              <div className="mt-8 pt-8 border-t border-white/10 flex flex-col sm:flex-row justify-end items-center gap-4">
                {!isFormComplete && (
                  <span className="text-sm text-slate-400 font-medium">Select all mandatory fields to start</span>
                )}
                <button 
                  disabled={!isFormComplete}
                  onClick={() => setIsStarted(true)}
                  className={`w-full sm:w-auto px-10 py-4 rounded-xl text-[15px] font-bold flex items-center justify-center gap-2 transition-all shadow-xl
                    ${isFormComplete 
                      ? 'bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 hover:from-indigo-600 hover:via-purple-600 hover:to-pink-600 text-white hover:-translate-y-1 shadow-indigo-500/25 cursor-pointer' 
                      : 'bg-slate-800 text-slate-500 border border-slate-700 shadow-none cursor-not-allowed'
                    }
                  `}
                >
                  <Sparkles className={`w-5 h-5 ${isFormComplete ? 'animate-pulse text-yellow-300' : ''}`} />
                  {isFormComplete ? 'Start Mock Interview' : 'Start Mock Interview'}
                </button>
              </div>
            </div>
      </div>
    </DashboardLayout>
  );
}

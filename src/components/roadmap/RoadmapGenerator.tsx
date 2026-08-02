import React, { useState, useRef, useEffect } from 'react';
import { 
  Building2, Briefcase, Code2, BarChart, Target, Zap, 
  MessageSquare, Globe, Clock, CalendarDays, Search, 
  ChevronDown, Check, Sparkles, Star
} from 'lucide-react';

interface RoadmapGeneratorProps {
  onGenerate: () => void;
}

const COMPANIES = [
  'Google', 'Amazon', 'Microsoft', 'Apple', 'Meta', 'Netflix', 'OpenAI', 'NVIDIA', 'Adobe', 'Uber', 
  'Airbnb', 'Stripe', 'Salesforce', 'Oracle', 'Intel', 'Cisco', 'Qualcomm', 'AMD', 'IBM', 'Dell', 
  'HP', 'VMware', 'Atlassian', 'PayPal', 'LinkedIn', 'Spotify', 'Dropbox', 'Pinterest', 'Twitter/X', 
  'Snap', 'TikTok', 'Reddit', 'Discord', 'Cloudflare', 'Databricks', 'Palantir', 'Snowflake', 'Coinbase', 
  'Tesla', 'SpaceX', 'Samsung', 'Sony', 'Accenture', 'Capgemini', 'TCS', 'Infosys', 'Wipro', 'HCL', 
  'Tech Mahindra', 'Cognizant', 'Persistent', 'LTIMindtree', 'Mphasis', 'Flipkart', 'PhonePe', 'Paytm', 
  'Razorpay', 'Swiggy', 'Zomato', 'Meesho', 'Myntra', 'Groww', 'CRED', 'Dream11', 'Juspay', 'Freshworks', 
  'Zoho', 'BrowserStack', 'Postman', 'ShareChat', 'InMobi'
];

const ROLES = [
  'Software Engineer', 'SDE Intern', 'SDE-1', 'SDE-2', 'Backend Engineer', 'Frontend Engineer', 
  'Full Stack Engineer', 'Mobile Developer', 'Android', 'iOS', 'Flutter', 'React Native', 'Game Developer', 
  'AI Engineer', 'Machine Learning Engineer', 'Deep Learning Engineer', 'NLP Engineer', 'Computer Vision Engineer', 
  'Prompt Engineer', 'Generative AI Engineer', 'Data Scientist', 'Data Analyst', 'Business Analyst', 
  'Cloud Engineer', 'AWS Engineer', 'Azure Engineer', 'DevOps Engineer', 'Platform Engineer', 
  'Site Reliability Engineer', 'Cyber Security Engineer', 'Penetration Tester', 'Ethical Hacker', 
  'Blockchain Developer', 'Embedded Engineer', 'IoT Engineer', 'Robotics Engineer', 'QA Engineer', 
  'Automation Tester', 'Product Manager', 'Project Manager', 'Technical Program Manager', 'Solutions Architect', 
  'Database Administrator', 'Network Engineer', 'Research Engineer', 'Support Engineer', 'Consultant'
];

const LANGUAGES = [
  'C', 'C++', 'Java', 'Python', 'JavaScript', 'TypeScript', 'Go', 'Rust', 'Kotlin', 'Swift', 'PHP', 
  'Ruby', 'Scala', 'Dart', 'C#', 'SQL', 'R', 'MATLAB', 'Perl', 'Lua', 'Assembly', 'Bash', 'PowerShell'
];

const EXPERIENCES = ['Fresher', 'Intern', '0-1 Years', '1-3 Years', '3-5 Years', '5-8 Years', 'Senior', 'Lead', 'Manager'];
const SKILLS = ['Beginner', 'Intermediate', 'Advanced', 'Expert'];
const GOALS = ['Placement Preparation', 'Internship', 'Product Companies', 'Service Companies', 'Campus Placement', 'Career Switch', 'Promotion', 'Skill Improvement', 'Interview Revision'];
const INTERVIEW_TYPES = ['Technical', 'Coding', 'HR', 'Behavioral', 'System Design', 'Machine Coding', 'Case Study', 'Group Discussion', 'Managerial', 'Mixed Interview'];
const SPOKEN_LANGUAGES = ['English', 'Hindi', 'Hinglish', 'Tamil', 'Telugu', 'Kannada', 'Malayalam', 'Marathi', 'Gujarati', 'Bengali', 'Punjabi', 'Odia'];
const DURATIONS = ['1 Week', '2 Weeks', '1 Month', '2 Months', '3 Months', '6 Months', 'Custom'];

const TEMPLATES = [
  { name: 'Google SDE', icon: Star, data: { company: 'Google', role: 'Software Engineer', experience: 'Fresher', skill: 'Intermediate', lang: 'C++', goal: 'Product Companies', type: 'Coding', spoken: 'English', hours: 20, duration: '3 Months' } },
  { name: 'Amazon SDE', icon: Star, data: { company: 'Amazon', role: 'Software Engineer', experience: '0-1 Years', skill: 'Intermediate', lang: 'Java', goal: 'Placement Preparation', type: 'System Design', spoken: 'English', hours: 15, duration: '2 Months' } },
  { name: 'TCS Ninja', icon: Star, data: { company: 'TCS', role: 'Software Engineer', experience: 'Fresher', skill: 'Beginner', lang: 'Python', goal: 'Service Companies', type: 'Mixed Interview', spoken: 'English', hours: 10, duration: '1 Month' } },
  { name: 'AI Engineer', icon: Star, data: { company: 'OpenAI', role: 'AI Engineer', experience: '1-3 Years', skill: 'Advanced', lang: 'Python', goal: 'Career Switch', type: 'Technical', spoken: 'English', hours: 25, duration: '6 Months' } },
];

function SearchableDropdown({ label, icon: Icon, options, value, onChange, placeholder }: any) {
  const [isOpen, setIsOpen] = useState(false);
  const [search, setSearch] = useState('');
  const wrapperRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (wrapperRef.current && !wrapperRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const filteredOptions = options.filter((opt: string) => opt.toLowerCase().includes(search.toLowerCase()));

  return (
    <div className="relative space-y-2" ref={wrapperRef}>
      <label className="text-sm font-medium text-slate-300 flex items-center gap-2">
        <Icon className="w-4 h-4 text-indigo-400" /> {label}
      </label>
      <div 
        onClick={() => setIsOpen(!isOpen)}
        className="w-full bg-slate-950 border border-white/10 rounded-xl px-4 py-3 flex items-center justify-between cursor-pointer hover:border-indigo-500/50 transition-colors"
      >
        <span className={value ? "text-white" : "text-slate-500"}>{value || placeholder}</span>
        <ChevronDown className={`w-4 h-4 text-slate-400 transition-transform ${isOpen ? 'rotate-180' : ''}`} />
      </div>
      
      {isOpen && (
        <div className="absolute z-50 top-[calc(100%+8px)] left-0 w-full bg-slate-800 border border-white/10 rounded-xl shadow-2xl overflow-hidden animate-in fade-in slide-in-from-top-2 duration-200">
          <div className="p-2 border-b border-white/10 flex items-center gap-2 bg-slate-900/50">
            <Search className="w-4 h-4 text-slate-400" />
            <input 
              type="text" 
              autoFocus
              placeholder="Search..." 
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              onClick={(e) => e.stopPropagation()}
              className="bg-transparent border-none text-white text-sm focus:outline-none w-full placeholder:text-slate-500"
            />
          </div>
          <div className="max-h-60 overflow-y-auto p-1 scrollbar-hide">
            {filteredOptions.length === 0 ? (
              <div className="p-3 text-sm text-slate-500 text-center">No results found</div>
            ) : (
              filteredOptions.map((opt: string) => (
                <div 
                  key={opt}
                  onClick={() => {
                    onChange(opt);
                    setIsOpen(false);
                    setSearch('');
                  }}
                  className={`flex items-center justify-between px-3 py-2.5 rounded-lg cursor-pointer text-sm transition-colors ${
                    value === opt ? 'bg-indigo-500/20 text-indigo-400' : 'text-slate-300 hover:bg-white/5 hover:text-white'
                  }`}
                >
                  <div className="flex items-center gap-2">
                    {label === 'Target Company' && <div className="w-5 h-5 rounded-md bg-slate-700 flex items-center justify-center text-[10px] font-bold text-white uppercase">{opt.substring(0,2)}</div>}
                    {opt}
                  </div>
                  {value === opt && <Check className="w-4 h-4" />}
                </div>
              ))
            )}
          </div>
        </div>
      )}
    </div>
  );
}

function StandardDropdown({ label, icon: Icon, options, value, onChange, placeholder }: any) {
  return (
    <div className="space-y-2">
      <label className="text-sm font-medium text-slate-300 flex items-center gap-2">
        <Icon className="w-4 h-4 text-indigo-400" /> {label}
      </label>
      <div className="relative">
        <select 
          value={value}
          onChange={(e) => onChange(e.target.value)}
          className="w-full bg-slate-950 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-indigo-500 transition-colors appearance-none cursor-pointer"
        >
          <option value="" disabled hidden>{placeholder}</option>
          {options.map((opt: string) => (
            <option key={opt} value={opt}>{opt}</option>
          ))}
        </select>
        <ChevronDown className="w-4 h-4 text-slate-400 absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none" />
      </div>
    </div>
  );
}

export default function RoadmapGenerator({ onGenerate }: RoadmapGeneratorProps) {
  const [formData, setFormData] = useState({
    company: '',
    role: '',
    lang: '',
    experience: '',
    skill: 'Intermediate',
    goal: '',
    type: '',
    spoken: '',
    hours: 15,
    duration: ''
  });

  const updateField = (field: string, value: any) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const applyTemplate = (data: any) => {
    setFormData(data);
  };

  return (
    <div className="space-y-8">
      {/* Quick Templates */}
      <div>
        <h3 className="text-sm font-semibold text-slate-400 uppercase tracking-wider mb-4">Quick Templates</h3>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {TEMPLATES.map((t, i) => (
            <button 
              key={i}
              onClick={() => applyTemplate(t.data)}
              className="flex items-center gap-2 p-3 bg-slate-900 border border-white/5 hover:border-indigo-500/30 rounded-xl text-left transition-all hover:bg-slate-800/50 group"
            >
              <div className="w-8 h-8 rounded-lg bg-indigo-500/10 flex items-center justify-center shrink-0 group-hover:scale-110 transition-transform">
                <t.icon className="w-4 h-4 text-indigo-400" />
              </div>
              <span className="text-sm font-medium text-slate-300 group-hover:text-white transition-colors">{t.name}</span>
            </button>
          ))}
        </div>
      </div>

      {/* Main Configuration Panel */}
      <div className="bg-slate-900/80 backdrop-blur-xl border border-white/10 rounded-[32px] p-6 md:p-10 shadow-2xl relative overflow-visible z-10">
        <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-indigo-500/5 rounded-full blur-[100px] -translate-y-1/2 translate-x-1/3 pointer-events-none" />
        
        <div className="mb-8">
          <h2 className="text-2xl font-bold text-white mb-2">Configure Your Roadmap</h2>
          <p className="text-slate-400">Personalize your interview preparation journey with our AI-powered generator.</p>
        </div>

        <div className="grid lg:grid-cols-2 gap-x-8 gap-y-6">
          <SearchableDropdown 
            label="Target Company" 
            icon={Building2} 
            options={COMPANIES} 
            value={formData.company} 
            onChange={(val: string) => updateField('company', val)} 
            placeholder="Search company..."
          />

          <SearchableDropdown 
            label="Job Role" 
            icon={Briefcase} 
            options={ROLES} 
            value={formData.role} 
            onChange={(val: string) => updateField('role', val)} 
            placeholder="Search role..."
          />

          <SearchableDropdown 
            label="Programming Language" 
            icon={Code2} 
            options={LANGUAGES} 
            value={formData.lang} 
            onChange={(val: string) => updateField('lang', val)} 
            placeholder="Search language..."
          />

          <StandardDropdown 
            label="Experience Level" 
            icon={BarChart} 
            options={EXPERIENCES} 
            value={formData.experience} 
            onChange={(val: string) => updateField('experience', val)} 
            placeholder="Select experience"
          />

          <div className="space-y-2 lg:col-span-2">
            <label className="text-sm font-medium text-slate-300 flex items-center gap-2">
              <Target className="w-4 h-4 text-indigo-400" /> Current Skill Level
            </label>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
              {SKILLS.map(skill => (
                <button
                  key={skill}
                  onClick={() => updateField('skill', skill)}
                  className={`p-3 rounded-xl border text-center transition-all ${
                    formData.skill === skill 
                      ? 'bg-indigo-500/20 border-indigo-500/50 text-indigo-300 shadow-[0_0_15px_rgba(99,102,241,0.15)]' 
                      : 'bg-slate-950 border-white/5 text-slate-400 hover:text-slate-200 hover:border-white/10'
                  }`}
                >
                  <span className="text-sm font-semibold">{skill}</span>
                </button>
              ))}
            </div>
          </div>

          <StandardDropdown 
            label="Learning Goal" 
            icon={Zap} 
            options={GOALS} 
            value={formData.goal} 
            onChange={(val: string) => updateField('goal', val)} 
            placeholder="Select goal"
          />

          <StandardDropdown 
            label="Target Interview Type" 
            icon={MessageSquare} 
            options={INTERVIEW_TYPES} 
            value={formData.type} 
            onChange={(val: string) => updateField('type', val)} 
            placeholder="Select interview type"
          />

          <StandardDropdown 
            label="Preferred Language" 
            icon={Globe} 
            options={SPOKEN_LANGUAGES} 
            value={formData.spoken} 
            onChange={(val: string) => updateField('spoken', val)} 
            placeholder="Select spoken language"
          />

          <StandardDropdown 
            label="Roadmap Duration" 
            icon={CalendarDays} 
            options={DURATIONS} 
            value={formData.duration} 
            onChange={(val: string) => updateField('duration', val)} 
            placeholder="Select duration"
          />

          <div className="space-y-4 lg:col-span-2 mt-4 bg-slate-950/50 p-6 rounded-2xl border border-white/5">
            <div className="flex justify-between items-center">
              <label className="text-sm font-medium text-slate-300 flex items-center gap-2">
                <Clock className="w-4 h-4 text-indigo-400" /> Weekly Study Hours
              </label>
              <span className="text-indigo-400 font-bold bg-indigo-500/10 px-3 py-1 rounded-lg">
                {formData.hours} Hours
              </span>
            </div>
            <div className="relative pt-2">
              <input 
                type="range" 
                min="5" 
                max="40" 
                step="1"
                value={formData.hours}
                onChange={(e) => updateField('hours', parseInt(e.target.value))}
                className="w-full h-2 bg-slate-800 rounded-lg appearance-none cursor-pointer accent-indigo-500"
              />
              <div className="flex justify-between text-[10px] text-slate-500 font-medium mt-2">
                <span>5h</span>
                <span>10h</span>
                <span>15h</span>
                <span>20h</span>
                <span>25h</span>
                <span>30h</span>
                <span>40h+</span>
              </div>
            </div>
            <p className="text-xs text-slate-400 text-center mt-2">
              Based on {formData.hours} hours/week, estimated completion time is ~{Math.max(1, Math.round(150 / formData.hours))} weeks.
            </p>
          </div>
        </div>
      </div>

      {/* AI Recommendation Card */}
      <div className="bg-gradient-to-r from-indigo-500/10 to-purple-600/10 border border-indigo-500/20 rounded-2xl p-6 relative overflow-hidden">
        <div className="flex items-start gap-4 relative z-10">
          <div className="w-10 h-10 rounded-full bg-indigo-500/20 flex items-center justify-center shrink-0">
            <Sparkles className="w-5 h-5 text-indigo-400" />
          </div>
          <div>
            <h4 className="text-sm font-bold text-white mb-1">AI Recommendation</h4>
            <p className="text-xs text-slate-300 leading-relaxed max-w-3xl mb-4">
              Based on your profile, focusing on {formData.company || 'Top Tech'} for {formData.role || 'Software Engineering'} with {formData.lang || 'your preferred language'} requires approximately {Math.max(1, Math.round(150 / formData.hours))} weeks of preparation at {formData.hours} hours/week. Your interview readiness is currently projected at 91% if you follow the generated roadmap.
            </p>
            <div className="flex flex-wrap gap-4">
              <div className="flex flex-col">
                <span className="text-[10px] text-slate-500 uppercase font-bold tracking-wider mb-1">Difficulty</span>
                <span className="text-sm font-medium text-yellow-400">Medium</span>
              </div>
              <div className="w-px h-8 bg-white/10" />
              <div className="flex flex-col">
                <span className="text-[10px] text-slate-500 uppercase font-bold tracking-wider mb-1">Expected Readiness</span>
                <span className="text-sm font-medium text-emerald-400">91%</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Generate Button */}
      <div className="flex justify-center pt-4 pb-12">
        <button 
          onClick={onGenerate}
          className="group relative w-full md:w-auto px-10 py-5 rounded-2xl bg-gradient-to-r from-indigo-500 via-purple-500 to-indigo-500 bg-[length:200%_auto] text-white font-bold text-lg shadow-xl shadow-indigo-500/25 hover:shadow-indigo-500/40 hover:-translate-y-1 transition-all overflow-hidden flex items-center justify-center gap-3 animate-gradient"
        >
          <div className="absolute inset-0 bg-white/20 opacity-0 group-hover:opacity-100 transition-opacity" />
          <Sparkles className="w-6 h-6 fill-white/20" />
          ✨ Generate Personalized AI Learning Roadmap
        </button>
      </div>
    </div>
  );
}

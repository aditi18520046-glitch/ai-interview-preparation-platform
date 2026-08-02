const fs = require('fs');
let content = fs.readFileSync('src/pages/MockInterview.tsx', 'utf8');

const returnIdx = content.indexOf('return (\n    <DashboardLayout>\n');
let newContent = content.substring(returnIdx);

const imports = `import React, { useState } from 'react';
import DashboardLayout from '../components/layout/DashboardLayout';
import { motion } from 'motion/react';
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

function Dropdown({ icon: Icon, label, options, value, onChange, placeholder, colorClass, searchable = false }) {
  const [isOpen, setIsOpen] = useState(false);
  const [search, setSearch] = useState('');
  
  const filteredOptions = searchable 
    ? options.filter(opt => opt.toLowerCase().includes(search.toLowerCase()))
    : options;

  return (
    <div className="relative">
      <label className="block text-xs font-semibold text-slate-400 uppercase tracking-wider mb-2">{label}</label>
      <div 
        onClick={() => setIsOpen(!isOpen)}
        className={\`w-full bg-slate-900/50 border \${isOpen ? 'border-indigo-500' : 'border-white/10'} rounded-xl px-4 py-3.5 flex items-center justify-between cursor-pointer hover:border-white/20 transition-all\`}
      >
        <div className="flex items-center gap-3 overflow-hidden">
          <Icon className={\`w-4 h-4 \${colorClass}\`} />
          <span className={\`text-sm truncate \${value ? 'text-white' : 'text-slate-500'}\`}>{value || placeholder}</span>
        </div>
        <ChevronDown className={\`w-4 h-4 text-slate-400 transition-transform \${isOpen ? 'rotate-180' : ''}\`} />
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
                className={\`px-4 py-2.5 text-sm cursor-pointer hover:bg-slate-700/50 transition-colors flex items-center gap-2 \${value === opt ? 'text-indigo-400 font-bold bg-indigo-500/10' : 'text-slate-300'}\`}
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
  const [isOpen, setIsOpen] = useState(false);

  const toggleOption = (opt) => {
    if (values.includes(opt)) {
      onChange(values.filter(v => v !== opt));
    } else {
      onChange([...values, opt]);
    }
  };

  return (
    <div className="relative">
      <label className="block text-xs font-semibold text-slate-400 uppercase tracking-wider mb-2">{label}</label>
      <div 
        onClick={() => setIsOpen(!isOpen)}
        className={\`w-full bg-slate-900/50 border \${isOpen ? 'border-indigo-500' : 'border-white/10'} rounded-xl px-4 py-3.5 flex items-center justify-between cursor-pointer hover:border-white/20 transition-all\`}
      >
        <div className="flex items-center gap-3 overflow-hidden">
          <Icon className={\`w-4 h-4 \${colorClass}\`} />
          <span className={\`text-sm truncate \${values.length > 0 ? 'text-white' : 'text-slate-500'}\`}>
            {values.length > 0 ? \`\${values.length} Selected\` : 'Select Topics'}
          </span>
        </div>
        <ChevronDown className={\`w-4 h-4 text-slate-400 transition-transform \${isOpen ? 'rotate-180' : ''}\`} />
      </div>
      
      {isOpen && (
        <div className="absolute z-50 top-full left-0 right-0 mt-2 bg-slate-800 border border-white/10 rounded-xl shadow-xl overflow-hidden">
          <div className="max-h-60 overflow-y-auto scrollbar-hide p-2 flex flex-wrap gap-2">
            {options.map((opt, i) => {
              const isSelected = values.includes(opt);
              return (
                <div 
                  key={i} 
                  onClick={(e) => { e.stopPropagation(); toggleOption(opt); }}
                  className={\`px-3 py-1.5 rounded-lg text-xs font-medium cursor-pointer transition-all border \${isSelected ? 'bg-indigo-500/20 border-indigo-500/50 text-indigo-300' : 'bg-slate-900/50 border-white/5 text-slate-400 hover:text-white hover:border-white/20'}\`}
                >
                  {opt}
                </div>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
}

export default function MockInterview() {
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

`;

fs.writeFileSync('src/pages/MockInterview.tsx', imports + newContent);

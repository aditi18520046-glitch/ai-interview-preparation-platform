const fs = require('fs');
let content = fs.readFileSync('src/components/dashboard/TopNav.tsx', 'utf-8');

// Add Mic, FileEdit, Code2, Map to lucide-react import
content = content.replace(
  /import \{ Search, Bell, Moon, Menu, User, PanelLeftClose, PanelLeftOpen, Briefcase, LogIn, ChevronDown, Settings, LogOut, TrendingUp \} from 'lucide-react';/,
  "import { Search, Bell, Moon, Menu, User, PanelLeftClose, PanelLeftOpen, Briefcase, LogIn, ChevronDown, Settings, LogOut, TrendingUp, Mic, FileEdit, Code2, Map } from 'lucide-react';"
);

// Add isSearchOpen state
content = content.replace(
  /const \[isDropdownOpen, setIsDropdownOpen\] = useState\(false\);/,
  "const [isDropdownOpen, setIsDropdownOpen] = useState(false);\n  const [isSearchOpen, setIsSearchOpen] = useState(false);"
);

// Add searchRef
content = content.replace(
  /const dropdownRef = useRef<HTMLDivElement>\(null\);/,
  "const dropdownRef = useRef<HTMLDivElement>(null);\n  const searchRef = useRef<HTMLDivElement>(null);"
);

// Add searchRef check in handleClickOutside
content = content.replace(
  /if \(dropdownRef\.current && !dropdownRef\.current\.contains\(event\.target as Node\)\) \{\s*setIsDropdownOpen\(false\);\s*\}/,
  `if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsDropdownOpen(false);
      }
      if (searchRef.current && !searchRef.current.contains(event.target as Node)) {
        setIsSearchOpen(false);
      }`
);

// Update search input container
content = content.replace(
  /<div className="hidden md:flex items-center flex-1 max-w-lg mx-6 relative group">/,
  '<div ref={searchRef} className="hidden md:flex items-center flex-1 max-w-lg mx-6 relative group">'
);

content = content.replace(
  /<div className="relative w-full flex items-center bg-white\/5 border border-white\/10 rounded-full px-4 py-2 backdrop-blur-sm transition-all focus-within:bg-white\/10 focus-within:border-indigo-500\/50">/,
  `<div 
          onClick={() => setIsSearchOpen(true)}
          className="relative w-full flex items-center bg-white/5 border border-white/10 rounded-full px-4 py-2 backdrop-blur-sm transition-all focus-within:bg-white/10 focus-within:border-indigo-500/50 cursor-text"
        >`
);

content = content.replace(
  /<input\s*type="text"\s*placeholder="Search interviews, companies..."\s*className="w-full bg-transparent border-none outline-none text-sm text-slate-200 placeholder-slate-500 min-w-0"\s*\/>/,
  `<input
            type="text"
            placeholder="Search features (Mock Interview, Mock Test...)"
            className="w-full bg-transparent border-none outline-none text-sm text-slate-200 placeholder-slate-500 min-w-0"
            onFocus={() => setIsSearchOpen(true)}
          />`
);

content = content.replace(
  /<div className="hidden md:flex items-center gap-1 bg-slate-800\/50 rounded px-1\.5 py-0\.5 ml-3 border border-white\/5 shrink-0">/,
  `{/* Dropdown Menu */}
        {isSearchOpen && (
          <div className="absolute top-full mt-2 left-0 w-full bg-slate-900 border border-white/10 rounded-2xl shadow-2xl overflow-hidden py-2 z-50 animate-in fade-in slide-in-from-top-2 duration-200">
            <div className="px-4 py-2 text-xs font-semibold text-slate-500 uppercase tracking-wider">
              Quick Navigation
            </div>
            <div className="grid grid-cols-1 gap-1 p-2">
              <Link to="/dashboard/interview" onClick={() => setIsSearchOpen(false)} className="flex items-center gap-3 p-3 rounded-xl hover:bg-white/5 transition-colors group/link">
                <div className="w-10 h-10 rounded-lg bg-indigo-500/10 flex items-center justify-center group-hover/link:bg-indigo-500/20 transition-colors">
                  <Mic className="w-5 h-5 text-indigo-400" />
                </div>
                <div>
                  <div className="text-sm font-bold text-slate-200 group-hover/link:text-indigo-300 transition-colors">Mock Interview</div>
                  <div className="text-xs text-slate-400">AI-powered voice interviews</div>
                </div>
              </Link>
              <Link to="/dashboard/test" onClick={() => setIsSearchOpen(false)} className="flex items-center gap-3 p-3 rounded-xl hover:bg-white/5 transition-colors group/link">
                <div className="w-10 h-10 rounded-lg bg-purple-500/10 flex items-center justify-center group-hover/link:bg-purple-500/20 transition-colors">
                  <FileEdit className="w-5 h-5 text-purple-400" />
                </div>
                <div>
                  <div className="text-sm font-bold text-slate-200 group-hover/link:text-purple-300 transition-colors">Mock Test</div>
                  <div className="text-xs text-slate-400">Comprehensive skill assessments</div>
                </div>
              </Link>
              <Link to="/dashboard/coding" onClick={() => setIsSearchOpen(false)} className="flex items-center gap-3 p-3 rounded-xl hover:bg-white/5 transition-colors group/link">
                <div className="w-10 h-10 rounded-lg bg-emerald-500/10 flex items-center justify-center group-hover/link:bg-emerald-500/20 transition-colors">
                  <Code2 className="w-5 h-5 text-emerald-400" />
                </div>
                <div>
                  <div className="text-sm font-bold text-slate-200 group-hover/link:text-emerald-300 transition-colors">Coding Practice</div>
                  <div className="text-xs text-slate-400">Interactive coding challenges</div>
                </div>
              </Link>
              <Link to="/dashboard/roadmap" onClick={() => setIsSearchOpen(false)} className="flex items-center gap-3 p-3 rounded-xl hover:bg-white/5 transition-colors group/link">
                <div className="w-10 h-10 rounded-lg bg-cyan-500/10 flex items-center justify-center group-hover/link:bg-cyan-500/20 transition-colors">
                  <Map className="w-5 h-5 text-cyan-400" />
                </div>
                <div>
                  <div className="text-sm font-bold text-slate-200 group-hover/link:text-cyan-300 transition-colors">Learning Roadmap</div>
                  <div className="text-xs text-slate-400">Personalized study paths</div>
                </div>
              </Link>
            </div>
          </div>
        )}
        </div>
        
        <div className="hidden md:flex items-center gap-1 bg-slate-800/50 rounded px-1.5 py-0.5 ml-3 border border-white/5 shrink-0">`
);

fs.writeFileSync('src/components/dashboard/TopNav.tsx', content);

const fs = require('fs');
let content = fs.readFileSync('src/components/Navbar.tsx', 'utf-8');

// Add useState, useRef, useEffect
content = content.replace(
  /import React from 'react';/,
  "import React, { useState, useRef, useEffect } from 'react';"
);

// Add icons to lucide-react import
content = content.replace(
  /import \{ Briefcase, Search, Bell, Moon, Sun \} from 'lucide-react';/,
  "import { Briefcase, Search, Bell, Moon, Sun, Mic, FileEdit, Code2, Map } from 'lucide-react';"
);

// Add state to Navbar
content = content.replace(
  /export default function Navbar\(\) \{/,
  `export default function Navbar() {
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const searchRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (searchRef.current && !searchRef.current.contains(event.target as Node)) {
        setIsSearchOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);
`
);

// Add ref and click handler to the center div, and add the dropdown
content = content.replace(
  /\{?\/\* CENTER \*\/\}?\s*<div className="flex flex-1 max-w-2xl mx-1 md:mx-8 relative group min-w-\[50px\]">/,
  `{/* CENTER */}
        <div ref={searchRef} className="flex flex-1 max-w-2xl mx-1 md:mx-8 relative group min-w-[50px]">`
);

content = content.replace(
  /<div className="relative w-full flex items-center bg-white\/5 border border-white\/10 rounded-full px-2 md:px-4 py-1\.5 md:py-2\.5 backdrop-blur-sm transition-all focus-within:bg-white\/10 focus-within:border-indigo-500\/50">/,
  `<div 
            onClick={() => setIsSearchOpen(true)}
            className="relative w-full flex items-center bg-white/5 border border-white/10 rounded-full px-2 md:px-4 py-1.5 md:py-2.5 backdrop-blur-sm transition-all focus-within:bg-white/10 focus-within:border-indigo-500/50 cursor-text"
          >`
);

content = content.replace(
  /<input\s*type="text"\s*placeholder="Search..."\s*className="w-full bg-transparent border-none outline-none text-\[10px\] md:text-sm text-slate-200 placeholder-slate-500 min-w-0"\s*\/>/,
  `<input
              type="text"
              placeholder="Search features (Mock Interview, Mock Test...)"
              className="w-full bg-transparent border-none outline-none text-[10px] md:text-sm text-slate-200 placeholder-slate-500 min-w-0"
              onFocus={() => setIsSearchOpen(true)}
            />`
);

content = content.replace(
  /<\/div>\s*<\/div>\s*\{?\/\* RIGHT SIDE \*\/\}?/,
  `</div>
          
          {/* Dropdown Menu */}
          {isSearchOpen && (
            <div className="absolute top-full mt-2 left-0 w-full bg-slate-900 border border-white/10 rounded-2xl shadow-2xl overflow-hidden py-2 z-50 animate-in fade-in slide-in-from-top-2 duration-200">
              <div className="px-4 py-2 text-xs font-semibold text-slate-500 uppercase tracking-wider">
                Platform Features
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-1 p-2">
                <Link to="/dashboard/interview" className="flex items-center gap-3 p-3 rounded-xl hover:bg-white/5 transition-colors group/link">
                  <div className="w-10 h-10 rounded-lg bg-indigo-500/10 flex items-center justify-center group-hover/link:bg-indigo-500/20 transition-colors">
                    <Mic className="w-5 h-5 text-indigo-400" />
                  </div>
                  <div>
                    <div className="text-sm font-bold text-slate-200 group-hover/link:text-indigo-300 transition-colors">Mock Interview</div>
                    <div className="text-xs text-slate-400">AI-powered voice interviews</div>
                  </div>
                </Link>
                <Link to="/dashboard/test" className="flex items-center gap-3 p-3 rounded-xl hover:bg-white/5 transition-colors group/link">
                  <div className="w-10 h-10 rounded-lg bg-purple-500/10 flex items-center justify-center group-hover/link:bg-purple-500/20 transition-colors">
                    <FileEdit className="w-5 h-5 text-purple-400" />
                  </div>
                  <div>
                    <div className="text-sm font-bold text-slate-200 group-hover/link:text-purple-300 transition-colors">Mock Test</div>
                    <div className="text-xs text-slate-400">Comprehensive skill assessments</div>
                  </div>
                </Link>
                <Link to="/dashboard/coding" className="flex items-center gap-3 p-3 rounded-xl hover:bg-white/5 transition-colors group/link">
                  <div className="w-10 h-10 rounded-lg bg-emerald-500/10 flex items-center justify-center group-hover/link:bg-emerald-500/20 transition-colors">
                    <Code2 className="w-5 h-5 text-emerald-400" />
                  </div>
                  <div>
                    <div className="text-sm font-bold text-slate-200 group-hover/link:text-emerald-300 transition-colors">Coding Practice</div>
                    <div className="text-xs text-slate-400">Interactive coding challenges</div>
                  </div>
                </Link>
                <Link to="/dashboard/roadmap" className="flex items-center gap-3 p-3 rounded-xl hover:bg-white/5 transition-colors group/link">
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

        {/* RIGHT SIDE */}`
);

fs.writeFileSync('src/components/Navbar.tsx', content);

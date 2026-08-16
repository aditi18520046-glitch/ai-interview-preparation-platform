import fs from 'fs';

let code = fs.readFileSync('src/pages/Signup.tsx', 'utf8');

// Add state variables
code = code.replace(
  "const [password, setPassword] = useState('');",
  "const [password, setPassword] = useState('');\n  const [college, setCollege] = useState('');\n  const [branch, setBranch] = useState('');\n  const [year, setYear] = useState('');"
);

// Add missing icon imports if needed
code = code.replace(
  "import { User, Lock, Eye, EyeOff, Loader2, Mail, CheckCircle2, XCircle } from 'lucide-react';",
  "import { User, Lock, Eye, EyeOff, Loader2, Mail, CheckCircle2, XCircle, GraduationCap, BookOpen, Calendar } from 'lucide-react';"
);

// Add fields to signup call
code = code.replace(
  "full_name: name,",
  "full_name: name,\n            college,\n            branch,\n            year,"
);

// Add inputs to form
const inputHTML = `
              <div>
                <label className="block text-sm font-medium text-slate-300 mb-1.5 ml-1">College</label>
                <div className="relative group">
                  <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-slate-500 group-focus-within:text-indigo-400 transition-colors">
                    <GraduationCap className="w-5 h-5" />
                  </div>
                  <input
                    type="text"
                    required
                    value={college}
                    onChange={(e) => setCollege(e.target.value)}
                    className="w-full bg-slate-950/50 border border-white/10 text-white rounded-xl py-3 pl-11 pr-4 focus:outline-none focus:ring-2 focus:ring-indigo-500/50 focus:border-indigo-500/50 transition-all placeholder:text-slate-600"
                    placeholder="University Name"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-slate-300 mb-1.5 ml-1">Branch</label>
                <div className="relative group">
                  <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-slate-500 group-focus-within:text-indigo-400 transition-colors">
                    <BookOpen className="w-5 h-5" />
                  </div>
                  <input
                    type="text"
                    required
                    value={branch}
                    onChange={(e) => setBranch(e.target.value)}
                    className="w-full bg-slate-950/50 border border-white/10 text-white rounded-xl py-3 pl-11 pr-4 focus:outline-none focus:ring-2 focus:ring-indigo-500/50 focus:border-indigo-500/50 transition-all placeholder:text-slate-600"
                    placeholder="Computer Science"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-slate-300 mb-1.5 ml-1">Graduation Year</label>
                <div className="relative group">
                  <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-slate-500 group-focus-within:text-indigo-400 transition-colors">
                    <Calendar className="w-5 h-5" />
                  </div>
                  <input
                    type="text"
                    required
                    value={year}
                    onChange={(e) => setYear(e.target.value)}
                    className="w-full bg-slate-950/50 border border-white/10 text-white rounded-xl py-3 pl-11 pr-4 focus:outline-none focus:ring-2 focus:ring-indigo-500/50 focus:border-indigo-500/50 transition-all placeholder:text-slate-600"
                    placeholder="2024"
                  />
                </div>
              </div>
`;

code = code.replace(
  "<div>\n                <label className=\"block text-sm font-medium text-slate-300 mb-1.5 ml-1\">Password</label>",
  inputHTML + "\n              <div>\n                <label className=\"block text-sm font-medium text-slate-300 mb-1.5 ml-1\">Password</label>"
);

fs.writeFileSync('src/pages/Signup.tsx', code);

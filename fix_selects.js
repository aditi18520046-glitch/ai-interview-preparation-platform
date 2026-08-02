const fs = require('fs');
let content = fs.readFileSync('src/pages/MockTest.tsx', 'utf-8');

// Fix Company select
content = content.replace(
  /onChange=\{\(e\) => setSelectedCompany\(e.target.value === "Company ▼" \? null : e.target.value\)\}/,
  'onChange={(e) => setSelectedCompany(e.target.value)}'
);
content = content.replace(
  /<option value="Company ▼" className="bg-slate-900 text-slate-200">Company ▼<\/option>/,
  '<option value="" disabled hidden>Company</option>'
);

// Fix Role select
content = content.replace(
  /onChange=\{\(e\) => setSelectedRole\(e.target.value === "Role ▼" \? null : e.target.value\)\}/,
  'onChange={(e) => setSelectedRole(e.target.value)}'
);
content = content.replace(
  /<option value="Role ▼" className="bg-slate-900 text-slate-200">Role ▼<\/option>/,
  '<option value="" disabled hidden>Role</option>'
);

// Fix Difficulty select
content = content.replace(
  /onChange=\{\(e\) => setSelectedDifficulty\(e.target.value === "Difficulty ▼" \? null : e.target.value\)\}/,
  'onChange={(e) => setSelectedDifficulty(e.target.value)}'
);
content = content.replace(
  /<option value="Difficulty ▼" className="bg-slate-900 text-slate-200">Difficulty ▼<\/option>/,
  '<option value="" disabled hidden>Difficulty</option>'
);

// Fix Language select
content = content.replace(
  /onChange=\{\(e\) => setSelectedLanguage\(e.target.value === "Language ▼" \? null : e.target.value\)\}/,
  'onChange={(e) => setSelectedLanguage(e.target.value)}'
);
content = content.replace(
  /<option value="Language ▼" className="bg-slate-900 text-slate-200">Language ▼<\/option>/,
  '<option value="" disabled hidden>Language</option>'
);

// Fix Duration select
content = content.replace(
  /value=\{timeLimit \? `\$\{timeLimit\} min` : "Duration ▼"\}/,
  'value={timeLimit ? `${timeLimit} min` : ""}'
);
content = content.replace(
  /if \(e.target.value === "Duration ▼"\) \{[\s\S]*?\} else \{[\s\S]*?setTimeLimit\(parseInt\(e.target.value\)\);[\s\S]*?\}/,
  'setTimeLimit(parseInt(e.target.value));'
);
content = content.replace(
  /<option value="Duration ▼" className="bg-slate-900 text-slate-200">Duration ▼<\/option>/,
  '<option value="" disabled hidden>Duration</option>'
);

fs.writeFileSync('src/pages/MockTest.tsx', content);

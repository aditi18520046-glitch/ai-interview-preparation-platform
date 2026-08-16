import fs from 'fs';
const path = './src/pages/InterviewHistory.tsx';
let code = fs.readFileSync(path, 'utf8');

code = code.replace(/let feedback = \{\};/, 'let feedback: any = {};');

fs.writeFileSync(path, code);

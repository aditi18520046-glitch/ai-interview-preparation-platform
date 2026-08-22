import fs from 'fs';
let code = fs.readFileSync('src/pages/Settings.tsx', 'utf8');
code = code.replace(
  `const handleChangePassword = (e: React.FormEvent) => {`,
  `const handleChangePassword = async (e: React.FormEvent) => {`
);
fs.writeFileSync('src/pages/Settings.tsx', code);

import fs from 'fs';

function replaceInFile(filePath) {
  let content = fs.readFileSync(filePath, 'utf8');
  content = content.replace(/full_name/g, 'name');
  fs.writeFileSync(filePath, content);
}

replaceInFile('src/store/profileStore.ts');
replaceInFile('src/pages/Profile.tsx');
replaceInFile('src/pages/Settings.tsx');

// In authStore, let's keep it as is, or maybe leave user_metadata.full_name as user_metadata.full_name.
// Actually, `user_metadata?.full_name` is fine.

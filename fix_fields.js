import fs from 'fs';
import path from 'path';

function replaceInFile(filePath) {
  let content = fs.readFileSync(filePath, 'utf8');
  content = content.replace(/graduation_year/g, 'year');
  content = content.replace(/profile_picture/g, 'profile_image');
  fs.writeFileSync(filePath, content);
}

replaceInFile('src/store/profileStore.ts');
replaceInFile('src/pages/Profile.tsx');
replaceInFile('src/pages/Settings.tsx');

// Also update the insert type in profileStore
let profileContent = fs.readFileSync('src/store/profileStore.ts', 'utf8');
profileContent = profileContent.replace(
  `set({ profile: newProfile });`,
  `set({ profile: newProfile as ProfileData });`
);
fs.writeFileSync('src/store/profileStore.ts', profileContent);

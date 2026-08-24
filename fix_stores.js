const fs = require('fs');
const glob = require('glob');

const files = glob.sync('src/store/*.ts');
for (const file of files) {
  let content = fs.readFileSync(file, 'utf8');
  
  // Remove db imports
  content = content.replace(/import \{ db \} from '\.\.\/lib\/db';\n/g, '');
  content = content.replace(/import \{ db \} from '\.\.\/\.\.\/lib\/db';\n/g, '');
  
  fs.writeFileSync(file, content);
}

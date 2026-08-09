const fs = require('fs');

function patchSelectError(filename) {
  let content = fs.readFileSync(filename, 'utf8');
  content = content.replace(
    /\.maybeSingle\(\);\s*if \(\!data\)/g,
    `.maybeSingle();\n      if (error) console.error('Select error in ' + filename, error);\n      if (!data)`
  );
  fs.writeFileSync(filename, content);
}

patchSelectError('src/store/dashboardStore.ts');
patchSelectError('src/store/settingsStore.ts');


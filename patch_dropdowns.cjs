const fs = require('fs');
let content = fs.readFileSync('src/pages/MockTest.tsx', 'utf8');

const filterBarRegex = /\{\/\* Quick Filter Bar \(Sticky\) \*\/\}([\s\S]*?)<div className="relative w-full xl:w-64">/;
const filterBarMatch = content.match(filterBarRegex);

if (filterBarMatch) {
  // We want to replace the options in the selects.
  console.log("Found Filter Bar!");
} else {
  console.log("Could not find Filter Bar");
}

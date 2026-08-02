const axios = require('axios');
const fs = require('fs');

async function getLogo(url, filename) {
  try {
    const res = await axios.get(url);
    fs.writeFileSync('src/assets/logos/' + filename, res.data);
    console.log('Saved', filename);
  } catch(e) {
    console.log('Failed', filename);
  }
}

// Adobe
getLogo('https://upload.wikimedia.org/wikipedia/commons/8/8d/Adobe_Corporate_Logo.png', 'adobe.png'); // Actually need SVG

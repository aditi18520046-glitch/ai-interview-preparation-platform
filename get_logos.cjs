const axios = require('axios');
const fs = require('fs');

async function getLogo(url, filename) {
  try {
    const res = await axios.get(url, { headers: { 'User-Agent': 'Mozilla/5.0' } });
    fs.writeFileSync('src/assets/logos/' + filename, res.data);
    console.log('Saved', filename);
  } catch(e) {
    console.log('Failed', filename);
  }
}

getLogo('https://upload.wikimedia.org/wikipedia/commons/7/7b/Adobe_Systems_logo_and_wordmark.svg', 'adobe.svg');
getLogo('https://upload.wikimedia.org/wikipedia/commons/5/51/IBM_logo.svg', 'ibm.svg');
getLogo('https://upload.wikimedia.org/wikipedia/commons/5/50/Oracle_logo.svg', 'oracle.svg');

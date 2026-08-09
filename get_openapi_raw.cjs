require('dotenv').config({ path: '.env' });

async function getOpenAPI() {
  const url = process.env.VITE_SUPABASE_URL + '/rest/v1/?apikey=' + process.env.VITE_SUPABASE_ANON_KEY;
  const res = await fetch(url, { headers: { 'Accept-Profile': 'public' }});
  const text = await res.text();
  console.log(text.substring(0, 500));
  const fs = require('fs');
  fs.writeFileSync('openapi.json', text);
}
getOpenAPI();

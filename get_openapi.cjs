require('dotenv').config({ path: '.env' });

async function getOpenAPI() {
  const url = process.env.VITE_SUPABASE_URL + '/rest/v1/?apikey=' + process.env.VITE_SUPABASE_ANON_KEY;
  const res = await fetch(url);
  const json = await res.json();
  const schemas = json.definitions || json.components?.schemas || {};
  console.log(Object.keys(schemas));
}
getOpenAPI();

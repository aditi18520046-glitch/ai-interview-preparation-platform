import fs from 'fs';
const path = './server.ts';
let code = fs.readFileSync(path, 'utf8');

const target = '// Vite middleware for development';
const replacement = `
  // Proxy for dashboard_stats to bypass adblockers
  app.post('/api/dashboard', async (req, res) => {
    try {
      const authHeader = req.headers.authorization;
      if (!authHeader) return res.status(401).json({error: 'Unauthorized'});
      
      const { createClient } = await import('@supabase/supabase-js');
      const supabase = createClient(process.env.VITE_SUPABASE_URL, process.env.VITE_SUPABASE_ANON_KEY, {
        global: { headers: { Authorization: authHeader } }
      });

      let { data, error } = await supabase
        .from('dashboard_stats')
        .select('*')
        .eq('user_id', req.body.userId)
        .maybeSingle();

      if (error) throw error;
      
      if (!data) {
        const { data: newData, error: insertError } = await supabase
          .from('dashboard_stats')
          .insert([{ user_id: req.body.userId }])
          .select()
          .maybeSingle();
        if (insertError) {
           data = { user_id: req.body.userId };
        } else {
           data = newData;
        }
      }
      res.json(data);
    } catch (e) {
      res.status(500).json({error: e.message});
    }
  });

  app.post('/api/dashboard/update', async (req, res) => {
    try {
      const authHeader = req.headers.authorization;
      if (!authHeader) return res.status(401).json({error: 'Unauthorized'});
      
      const { createClient } = await import('@supabase/supabase-js');
      const supabase = createClient(process.env.VITE_SUPABASE_URL, process.env.VITE_SUPABASE_ANON_KEY, {
        global: { headers: { Authorization: authHeader } }
      });

      const { data, error } = await supabase
        .from('dashboard_stats')
        .upsert({ user_id: req.body.userId, ...req.body.updates }, { onConflict: 'user_id' })
        .select()
        .single();
        
      if (error) throw error;
      res.json(data);
    } catch (e) {
      res.status(500).json({error: e.message});
    }
  });

  // Vite middleware for development`;

code = code.replace(target, replacement);
fs.writeFileSync(path, code);

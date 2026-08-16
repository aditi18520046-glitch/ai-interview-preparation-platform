import fs from 'fs';
const path = './src/store/dashboardStore.ts';
let code = fs.readFileSync(path, 'utf8');

const targetFetch = `      let { data, error } = await supabase
        .from('dashboard_stats')
        .select('*')
        .eq('user_id', user.id)
        .maybeSingle();
      if (error) {
        console.error('Select error in dashboard_stats:', error.message, error.details, error.hint);
      }
      if (!data) {
        const { data: newData, error: insertError } = await supabase
          .from('dashboard_stats')
          .insert([{ user_id: user.id }])
          .select()
          .maybeSingle();
        
        if (insertError) {
          console.error('Could not insert into dashboard_stats:', insertError.message, insertError.details, insertError.hint);
          // Fallback to a default object so the app doesn't break
          data = { user_id: user.id };
        } else {
          data = newData || { user_id: user.id };
        }
      }`;

const replacementFetch = `      const session = await supabase.auth.getSession();
      const token = session.data.session?.access_token;
      
      const res = await fetch('/api/dashboard', {
        method: 'POST',
        headers: {
           'Content-Type': 'application/json',
           'Authorization': 'Bearer ' + token
        },
        body: JSON.stringify({ userId: user.id })
      });
      const data = await res.json();`;

code = code.replace(targetFetch, replacementFetch);

const targetUpdate = `      const { data, error } = await supabase
        .from('dashboard_stats')
        .upsert({ user_id: user.id, ...updates }, { onConflict: 'user_id' })
        .select()
        .single();
        
      if (error) {
        console.error('Error updating dashboard stats:', error.message, error.details);
        throw error;
      }`;

const replacementUpdate = `      const session = await supabase.auth.getSession();
      const token = session.data.session?.access_token;
      
      const res = await fetch('/api/dashboard/update', {
        method: 'POST',
        headers: {
           'Content-Type': 'application/json',
           'Authorization': 'Bearer ' + token
        },
        body: JSON.stringify({ userId: user.id, updates })
      });
      
      if (!res.ok) {
        const errData = await res.json();
        throw new Error(errData.error || 'Failed to update stats');
      }
      const data = await res.json();`;

code = code.replace(targetUpdate, replacementUpdate);

fs.writeFileSync(path, code);

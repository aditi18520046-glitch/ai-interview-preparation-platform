import fs from 'fs';
let code = fs.readFileSync('src/store/profileStore.ts', 'utf8');

// I will just add the auto-creation logic inside fetchProfile
const insertLogic = `
      if (data) {
        set({ profile: data });
      } else {
        // Auto-create profile on first fetch if it doesn't exist
        try {
          const { data: { session } } = await supabase.auth.getSession();
          if (session?.user && session.user.id === userId) {
            const userMeta = session.user.user_metadata || {};
            const newProfile = {
              id: userId,
              full_name: userMeta.full_name || userMeta.name || session.user.email?.split('@')[0] || 'User',
              email: session.user.email || '',
              college: userMeta.college || '',
              branch: userMeta.branch || '',
              year: userMeta.year || '',
              profile_image: null
            };
            
            const { error: insertError } = await supabase
              .from('profiles')
              .insert([newProfile]);
              
            if (!insertError) {
              set({ profile: newProfile });
              return; // exit early since we set it
            } else {
              console.error('Failed to create initial profile:', insertError.message);
            }
          }
        } catch (e) {
          console.error('Error in profile auto-creation:', e);
        }
        set({ profile: null });
      }
`;

code = code.replace(
  `      if (data) {
        set({ profile: data });
      } else {
        set({ profile: null });
      }`,
  insertLogic
);

fs.writeFileSync('src/store/profileStore.ts', code);

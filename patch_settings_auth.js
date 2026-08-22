import fs from 'fs';
let code = fs.readFileSync('src/pages/Settings.tsx', 'utf8');

code = code.replace(
  `import { getAuthUsers, saveAuthUsers, hashPassword, checkPassword } from '../lib/auth';`,
  `import { supabase } from '../lib/supabase';`
);

const handlePasswordLogic = `
    setIsLoading(true);
    try {
      const { error } = await supabase.auth.updateUser({ password: newPassword });
      if (error) throw error;
      toast.success('Password updated successfully');
      setIsChangingPassword(false);
      setCurrentPassword('');
      setNewPassword('');
      setConfirmPassword('');
    } catch (error: any) {
      toast.error(error.message || 'Failed to update password');
    } finally {
      setIsLoading(false);
    }
`;

// we need to replace the body of handleChangePassword
code = code.replace(
  /setIsLoading\(true\);\s*setTimeout\(\(\) => \{[\s\S]*?\}, 800\);/g,
  handlePasswordLogic
);

fs.writeFileSync('src/pages/Settings.tsx', code);

const fs = require('fs');

let content = fs.readFileSync('src/pages/Settings.tsx', 'utf8');
content = content.replace(
  "export default function Settings() {",
  `import { useSettingsStore } from '../store/settingsStore';\n\nexport default function Settings() {
  const { settings, updateSettings, fetchSettings } = useSettingsStore();
  
  useEffect(() => {
    fetchSettings();
  }, [fetchSettings]);`
);
// replace handleSettingChange to use updateSettings
content = content.replace(
  "const handleSettingChange = () => {",
  `const handleSettingChange = async (key?: string, value?: any) => {
    setHasChanges(true);
    if (key) {
      // Very naive mapping to the generic JSON columns
      if (['theme', 'language'].includes(key)) {
        await updateSettings({ [key]: value });
      } else {
        // Just mock updating privacy_settings and notification_preferences
        const type = key.includes('Privacy') || key.includes('Visibility') ? 'privacy_settings' : 'notification_preferences';
        await updateSettings({ [type]: { ...(settings?.[type] || {}), [key]: value } });
      }
    }`
);
fs.writeFileSync('src/pages/Settings.tsx', content);

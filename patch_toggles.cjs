const fs = require('fs');
let content = fs.readFileSync('src/pages/Settings.tsx', 'utf8');

content = content.replace(
  `function ToggleSetting({ label, description, defaultOn, onChange }: { label: string, description?: string, defaultOn: boolean, onChange: () => void }) {
  const [isOn, setIsOn] = useState(defaultOn);
  
  const handleToggle = () => {
    setIsOn(!isOn);
    onChange();
  };`,
  `function ToggleSetting({ label, description, defaultOn, onChange }: { label: string, description?: string, defaultOn: boolean, onChange: (key?: string, val?: any) => void }) {
  const [isOn, setIsOn] = useState(defaultOn);
  
  const handleToggle = () => {
    setIsOn(!isOn);
    onChange(label, !isOn);
  };`
);

fs.writeFileSync('src/pages/Settings.tsx', content);

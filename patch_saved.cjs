const fs = require('fs');

let content = fs.readFileSync('src/pages/SavedQuestions.tsx', 'utf8');
content = content.replace(
  "export default function SavedQuestions() {",
  `import { useSavedQuestionStore } from '../store/savedQuestionStore';
import { useEffect } from 'react';

export default function SavedQuestions() {
  const { savedQuestions, fetchSaved, removeQuestion } = useSavedQuestionStore();
  useEffect(() => { fetchSaved(); }, [fetchSaved]);
  `
);
content = content.replace("const [savedQuestions, setSavedQuestions] = useState<SavedQuestion[]>([]);", "");

// The original file used removeSavedQuestion to delete them. Let's patch it.
content = content.replace(
  "const removeSavedQuestion = (id: string, e: React.MouseEvent) => {",
  "const removeSavedQuestion = (id: string, e: React.MouseEvent) => {\n removeQuestion(id);\n/*"
);
content = content.replace(
  "setSavedQuestions(savedQuestions.filter(q => q.id !== id));",
  "*/"
);

fs.writeFileSync('src/pages/SavedQuestions.tsx', content);


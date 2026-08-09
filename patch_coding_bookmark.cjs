const fs = require('fs');
let content = fs.readFileSync('src/components/coding_practice/CodingProblemTable.tsx', 'utf8');

if (!content.includes('useSavedQuestionStore')) {
  content = content.replace("import React from 'react';", "import React, { useState } from 'react';\nimport { useSavedQuestionStore } from '../../store/savedQuestionStore';");
  
  content = content.replace("export default function CodingProblemTable({ onSolve }: { onSolve: (id: string) => void }) {", 
  `export default function CodingProblemTable({ onSolve }: { onSolve: (id: string) => void }) {
  const { saveQuestion, removeQuestion, savedQuestions } = useSavedQuestionStore();
  
  const handleBookmarkToggle = (p: any, e: React.MouseEvent) => {
    e.stopPropagation();
    const isSaved = savedQuestions.some(q => q.question_id === p.id);
    if (isSaved) {
      const q = savedQuestions.find(q => q.question_id === p.id);
      if (q && q.id) removeQuestion(q.id);
    } else {
      saveQuestion({
        question_id: p.id,
        question_text: p.name,
        type: 'coding',
        difficulty: p.diff,
        topic: p.topic
      });
    }
  };`
  );

  content = content.replace(/p\.bookmarked/g, "savedQuestions.some(q => q.question_id === p.id)");
  content = content.replace(/onClick=\{\(e\) => \{ e\.stopPropagation\(\); \}\}/g, "onClick={(e) => handleBookmarkToggle(p, e)}");
  
  fs.writeFileSync('src/components/coding_practice/CodingProblemTable.tsx', content);
}

import fs from 'fs';
let code = fs.readFileSync('src/pages/Progress.tsx', 'utf8');

code = code.replace(
  `useEffect(() => { if (progress) setHasActivity(true); }, [progress]);`,
  `useEffect(() => { if (progress && (progress.interviews_completed > 0 || progress.mock_tests_completed > 0 || progress.coding_problems_solved > 0 || progress.overall_score > 0)) setHasActivity(true); else setHasActivity(false); }, [progress]);`
);

fs.writeFileSync('src/pages/Progress.tsx', code);

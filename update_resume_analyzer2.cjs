const fs = require('fs');
const content = fs.readFileSync('src/pages/ResumeAnalyzer.tsx', 'utf8');

const updatedContent = content.replace(
  'export default function ResumeAnalyzer() {',
  'export default function ResumeAnalyzer() {\n  const { history, currentAnalysis } = useResumeStore();'
).replace(
  '<RAWorkflow />\n          </>',
  `<RAWorkflow />
            {history && history.length > 0 && (
              <div className="mt-12 bg-slate-900 border border-white/5 rounded-3xl p-8">
                <h3 className="text-xl font-bold text-white mb-6">Previous Analyses</h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                  {history.map((item, i) => (
                    <div key={i} className="p-4 bg-slate-800 rounded-xl border border-white/5 flex flex-col gap-2">
                      <span className="text-slate-300 font-medium">Analysis from {new Date(item.upload_date || Date.now()).toLocaleDateString()}</span>
                      <span className="text-indigo-400 font-bold">ATS Score: {item.ats_score}%</span>
                      <button onClick={() => {
                        useResumeStore.setState({ currentAnalysis: item });
                        setHasResults(true);
                      }} className="text-sm bg-indigo-500/20 text-indigo-300 py-1.5 px-3 rounded-lg hover:bg-indigo-500/30 mt-2">View Analysis</button>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </>`
);

fs.writeFileSync('src/pages/ResumeAnalyzer.tsx', updatedContent);

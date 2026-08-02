cat << 'INNER_EOF' > src/components/dashboard/Recommendations.tsx
import React from 'react';
import { Sparkles, AlertCircle, TrendingUp, CheckCircle2 } from 'lucide-react';
import { useDashboardData } from '../../hooks/useDashboardData';

const RECOMMENDATIONS = [
  { text: 'Improve Operating Systems knowledge', priority: 'High', type: 'improve' },
  { text: 'Practice more Dynamic Programming', priority: 'Medium', type: 'practice' },
  { text: 'Review Amazon leadership principles', priority: 'High', type: 'review' },
];

export default function Recommendations() {
  const { hasData } = useDashboardData();

  return (
    <div className="bg-slate-900/40 backdrop-blur-md border border-white/5 rounded-[20px] p-6 h-[320px] flex flex-col shadow-sm">
      <div className="flex items-center gap-2 mb-5">
        <Sparkles className="w-5 h-5 text-indigo-400" />
        <h2 className="text-base font-semibold text-white">AI Recommendations</h2>
      </div>

      <div className="space-y-3 flex-1 overflow-y-auto pr-2 scrollbar-hide flex flex-col">
        {!hasData ? (
          <div className="flex-1 flex flex-col items-center justify-center text-center">
            <div className="w-12 h-12 rounded-full bg-slate-800/50 flex items-center justify-center mb-3 border border-white/5">
              <Sparkles className="w-5 h-5 text-slate-500" />
            </div>
            <p className="text-xs text-slate-400 font-medium">Complete your first interview to receive AI recommendations.</p>
          </div>
        ) : (
          RECOMMENDATIONS.map((rec, idx) => (
            <div key={idx} className="flex items-start gap-3 p-3.5 rounded-xl bg-white/5 hover:bg-white/10 transition-colors group border border-white/5">
              <div className="shrink-0 mt-0.5">
                {rec.type === 'improve' ? <TrendingUp className="w-4 h-4 text-orange-400" /> :
                 rec.type === 'practice' ? <CheckCircle2 className="w-4 h-4 text-emerald-400" /> :
                 <AlertCircle className="w-4 h-4 text-blue-400" />}
              </div>
              <div className="flex-1">
                <p className="text-[13px] text-slate-200 font-medium group-hover:text-white transition-colors">{rec.text}</p>
              </div>
              <span className={\`shrink-0 text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-md \${
                rec.priority === 'High' ? 'bg-rose-500/10 text-rose-400' : 'bg-yellow-500/10 text-yellow-400'
              }\`}>
                {rec.priority}
              </span>
            </div>
          ))
        )}
      </div>
    </div>
  );
}
INNER_EOF

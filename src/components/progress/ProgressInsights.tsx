import React from 'react';
import { Lightbulb, ArrowRight } from 'lucide-react';

const insights = [
  'Your resume quality has improved since your last upload.',
  'Your coding accuracy has increased.',
  'Your interview confidence is improving.',
  'Communication needs more practice.',
  'Behavioral interview performance has improved.'
];

export default function ProgressInsights({ hasActivity }: { hasActivity?: boolean }) {
  return (
    <div className="bg-slate-900 border border-white/5 rounded-[32px] p-6 md:p-8">
      <div className="flex items-center gap-3 mb-6">
        <div className="w-10 h-10 rounded-xl bg-indigo-500/10 flex items-center justify-center">
          <Lightbulb className="w-5 h-5 text-indigo-400" />
        </div>
        <div>
          <h2 className="text-xl font-bold text-white">AI Progress Insights</h2>
          <p className="text-sm text-slate-400">Observations based on your recent activity</p>
        </div>
      </div>

      {hasActivity ? (
        <div className="space-y-4">
          {insights.map((insight, i) => (
            <div key={i} className="flex items-start gap-4 p-4 rounded-xl bg-slate-950 border border-white/5">
              <div className="mt-0.5">
                <ArrowRight className="w-5 h-5 text-indigo-400" />
              </div>
              <p className="text-slate-300 font-medium leading-relaxed">{insight}</p>
            </div>
          ))}
        </div>
      ) : (
        <div className="p-8 text-center bg-slate-950 border border-white/5 rounded-xl">
          <p className="text-slate-400">Complete an activity to generate personalized AI insights.</p>
        </div>
      )}
    </div>
  );
}

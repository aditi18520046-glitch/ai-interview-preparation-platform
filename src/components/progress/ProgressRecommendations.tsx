import React from 'react';
import { Compass, ArrowRight } from 'lucide-react';

const recommendations = [
  'Improve project descriptions in your resume.',
  'Practice behavioral interviews.',
  'Strengthen DSA concepts.',
  'Continue Java practice.',
  'Complete one more coding challenge.'
];

export default function ProgressRecommendations({ hasActivity }: { hasActivity?: boolean }) {
  return (
    <div className="bg-slate-900 border border-white/5 rounded-[32px] p-6 md:p-8">
      <div className="flex items-center gap-3 mb-6">
        <div className="w-10 h-10 rounded-xl bg-pink-500/10 flex items-center justify-center">
          <Compass className="w-5 h-5 text-pink-400" />
        </div>
        <div>
          <h2 className="text-xl font-bold text-white">AI Recommendations</h2>
          <p className="text-sm text-slate-400">Next steps based on your performance</p>
        </div>
      </div>

      {hasActivity ? (
        <div className="grid sm:grid-cols-2 gap-4">
          {recommendations.map((rec, i) => (
            <div key={i} className="flex items-start gap-3 p-4 rounded-xl bg-slate-950 border border-white/5">
              <ArrowRight className="w-5 h-5 text-pink-400 flex-shrink-0 mt-0.5" />
              <p className="text-slate-300 font-medium leading-relaxed">{rec}</p>
            </div>
          ))}
        </div>
      ) : (
        <div className="p-8 text-center bg-slate-950 border border-white/5 rounded-xl">
          <p className="text-slate-400">Complete an activity to receive personalized AI recommendations.</p>
        </div>
      )}
    </div>
  );
}

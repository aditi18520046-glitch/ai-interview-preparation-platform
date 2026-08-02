import React from 'react';
import { History, CheckCircle2 } from 'lucide-react';

const HISTORY = [
  { date: 'Today, 2:30 PM', topic: 'Two Pointers Practice', type: 'Coding', score: '100%' },
  { date: 'Today, 10:00 AM', topic: 'Array Fundamentals', type: 'Video', time: '45m' },
  { date: 'Yesterday', topic: 'Big O Notation', type: 'Notes', time: '15m' },
  { date: 'Yesterday', topic: 'Intro to Platform', type: 'Achievement', score: 'Unlocked' }
];

export default function LearningHistory() {
  return (
    <div className="bg-slate-900 border border-white/5 rounded-[32px] p-6 md:p-8">
      <div className="flex items-center gap-2 mb-6">
        <History className="w-5 h-5 text-indigo-400" />
        <h3 className="text-xl font-bold text-white">Recent Activity</h3>
      </div>
      
      <div className="space-y-4 relative before:absolute before:inset-0 before:ml-[11px] before:-translate-x-px md:before:mx-0 md:before:translate-x-0 before:h-full before:w-0.5 before:bg-white/5">
        {HISTORY.map((item, i) => (
          <div key={i} className="relative flex gap-4">
            <div className="w-6 h-6 rounded-full bg-slate-800 border-2 border-slate-950 flex items-center justify-center shrink-0 z-10">
              <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500" />
            </div>
            <div className="pt-0.5">
              <h4 className="text-sm font-medium text-white mb-0.5">{item.topic}</h4>
              <div className="flex items-center gap-2 text-xs text-slate-500">
                <span>{item.date}</span>
                <span>•</span>
                <span className="text-indigo-400">{item.type}</span>
                {(item.time || item.score) && (
                  <>
                    <span>•</span>
                    <span className="text-slate-400">{item.time || item.score}</span>
                  </>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

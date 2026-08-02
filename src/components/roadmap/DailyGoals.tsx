import React from 'react';
import { Target, CheckCircle2, Circle } from 'lucide-react';

const GOALS = [
  { id: 1, title: 'Complete Binary Search Lesson', completed: true },
  { id: 2, title: 'Practice 5 SQL Problems', completed: false },
  { id: 3, title: 'Watch Dynamic Programming Lesson', completed: false },
  { id: 4, title: 'Complete Mock Quiz', completed: false },
  { id: 5, title: 'Review System Design Notes', completed: false }
];

export default function DailyGoals() {
  return (
    <div className="bg-slate-900 border border-white/5 rounded-[32px] p-6 md:p-8">
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-xl font-bold text-white flex items-center gap-2">
          <Target className="w-5 h-5 text-indigo-400" />
          Today's Goals
        </h3>
        <span className="text-xs font-medium bg-slate-800 text-slate-300 px-2.5 py-1 rounded-full">
          1 / 5 Completed
        </span>
      </div>

      <div className="space-y-3">
        {GOALS.map((goal) => (
          <div 
            key={goal.id} 
            className={`flex items-center gap-3 p-3 rounded-xl border transition-all cursor-pointer ${
              goal.completed 
                ? 'bg-emerald-500/5 border-emerald-500/20 text-slate-300 line-through' 
                : 'bg-slate-950/50 border-white/5 text-white hover:border-indigo-500/30'
            }`}
          >
            {goal.completed ? (
              <CheckCircle2 className="w-5 h-5 text-emerald-500 shrink-0" />
            ) : (
              <Circle className="w-5 h-5 text-slate-600 shrink-0" />
            )}
            <span className="text-sm font-medium">{goal.title}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

import React, { useState } from 'react';
import { Calendar, Clock, Edit2 } from 'lucide-react';

const DAYS = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];
const PLAN = [
  { day: 'Mon', topics: 'Arrays & Strings', hours: 2, status: 'completed' },
  { day: 'Tue', topics: 'Two Pointers', hours: 2, status: 'completed' },
  { day: 'Wed', topics: 'Sliding Window', hours: 2.5, status: 'current' },
  { day: 'Thu', topics: 'Binary Search', hours: 2, status: 'upcoming' },
  { day: 'Fri', topics: 'Linked Lists', hours: 2, status: 'upcoming' },
  { day: 'Sat', topics: 'Mock Test', hours: 3, status: 'upcoming' },
  { day: 'Sun', topics: 'Rest & Review', hours: 1, status: 'upcoming' }
];

export default function WeeklyStudyPlanner() {
  const [activeDay, setActiveDay] = useState('Wed');

  return (
    <div className="bg-slate-900 border border-white/5 rounded-[32px] p-6 md:p-8">
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-xl font-bold text-white flex items-center gap-2">
          <Calendar className="w-5 h-5 text-indigo-400" />
          Weekly Planner
        </h3>
        <button className="text-slate-400 hover:text-white transition-colors">
          <Edit2 className="w-4 h-4" />
        </button>
      </div>
      
      <div className="flex justify-between mb-6">
        {DAYS.map(day => (
          <button 
            key={day}
            onClick={() => setActiveDay(day)}
            className={`w-10 h-10 rounded-full flex items-center justify-center text-xs font-bold transition-all ${
              activeDay === day 
                ? 'bg-indigo-500 text-white shadow-lg shadow-indigo-500/30' 
                : 'text-slate-400 hover:bg-slate-800 hover:text-white'
            }`}
          >
            {day[0]}
          </button>
        ))}
      </div>

      <div className="space-y-3">
        {PLAN.filter(p => p.day === activeDay).map((plan, i) => (
          <div key={i} className="p-4 rounded-xl bg-slate-950 border border-white/5">
            <div className="flex items-center justify-between mb-3">
              <span className={`text-[10px] font-bold uppercase px-2 py-1 rounded-sm ${
                plan.status === 'completed' ? 'bg-emerald-500/20 text-emerald-400' :
                plan.status === 'current' ? 'bg-indigo-500/20 text-indigo-400' :
                'bg-slate-800 text-slate-400'
              }`}>
                {plan.status}
              </span>
              <span className="flex items-center gap-1 text-xs text-slate-400 font-medium">
                <Clock className="w-3.5 h-3.5" /> {plan.hours}h
              </span>
            </div>
            <h4 className="text-sm font-bold text-white mb-2">{plan.topics}</h4>
            <p className="text-xs text-slate-500">Scheduled for today based on your 15h/week target.</p>
          </div>
        ))}
      </div>
    </div>
  );
}

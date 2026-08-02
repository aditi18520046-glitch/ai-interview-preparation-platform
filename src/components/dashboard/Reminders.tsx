import React from 'react';
import { CalendarClock, AlertTriangle, Clock } from 'lucide-react';
import { useDashboardData } from '../../hooks/useDashboardData';

const REMINDERS = [
  { 
    title: 'Google Mock Interview', 
    time: 'Today, 2:00 PM', 
    type: 'interview',
    priority: 'High',
    color: 'from-blue-500 to-indigo-500'
  },
  { 
    title: 'Complete Weekly Goal', 
    time: '2 days left', 
    type: 'goal',
    priority: 'Medium',
    color: 'from-purple-500 to-pink-500'
  },
  { 
    title: 'Update Resume', 
    time: 'Due tomorrow', 
    type: 'alert',
    priority: 'High',
    color: 'from-orange-500 to-red-500'
  }
];

export default function Reminders() {
  const { hasData } = useDashboardData();

  return (
    <div className="bg-slate-900/40 backdrop-blur-md border border-white/5 rounded-[20px] p-6 h-full min-h-[320px] flex flex-col shadow-sm">
      <div className="flex items-center justify-between mb-5">
        <h2 className="text-base font-semibold text-white">Upcoming Reminders</h2>
        {hasData && (
          <div className="w-5 h-5 rounded-full bg-indigo-500/20 flex items-center justify-center">
            <span className="text-[10px] font-bold text-indigo-400">3</span>
          </div>
        )}
      </div>

      <div className="space-y-3 flex-1 overflow-y-auto pr-2 scrollbar-hide flex flex-col">
        {!hasData ? (
          <div className="flex-1 flex flex-col items-center justify-center text-center">
            <div className="w-12 h-12 rounded-full bg-slate-800/50 flex items-center justify-center mb-3 border border-white/5">
              <CalendarClock className="w-5 h-5 text-slate-500" />
            </div>
            <p className="text-xs text-slate-400 font-medium">No upcoming reminders right now.</p>
          </div>
        ) : (
          REMINDERS.map((reminder, idx) => (
            <div key={idx} className="flex items-center gap-3 p-3.5 rounded-xl bg-white/5 border border-white/5 hover:border-white/10 transition-colors group relative overflow-hidden">
              <div className={`absolute left-0 top-0 bottom-0 w-1 bg-gradient-to-b ${reminder.color}`} />
              
              <div className={`w-9 h-9 rounded-lg bg-gradient-to-br ${reminder.color} flex items-center justify-center opacity-80 group-hover:opacity-100 transition-opacity shrink-0 ml-1`}>
                {reminder.type === 'interview' ? <CalendarClock className="w-4 h-4 text-white" /> :
                 reminder.type === 'goal' ? <Clock className="w-4 h-4 text-white" /> :
                 <AlertTriangle className="w-4 h-4 text-white" />}
              </div>
              
              <div className="flex-1">
                <h3 className="text-[13px] font-medium text-slate-200 group-hover:text-white transition-colors leading-tight mb-1">{reminder.title}</h3>
                <p className="text-[11px] text-slate-400">{reminder.time}</p>
              </div>
              
              <span className={`text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-md shrink-0 ${
                reminder.priority === 'High' ? 'bg-rose-500/10 text-rose-400' : 'bg-orange-500/10 text-orange-400'
              }`}>
                {reminder.priority}
              </span>
            </div>
          ))
        )}
      </div>
    </div>
  );
}

import React from 'react';

export default function MiniCalendar() {
  const days = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
  const dates = Array.from({ length: 35 }, (_, i) => i - 3);

  return (
    <div className="bg-slate-900/40 backdrop-blur-md border border-white/5 rounded-[20px] p-6 h-full min-h-[280px] flex flex-col shadow-sm">
      <div className="flex items-center justify-between mb-5">
        <h2 className="text-base font-semibold text-white">October 2023</h2>
        <div className="flex gap-1">
          <button className="w-6 h-6 flex items-center justify-center rounded-md hover:bg-white/10 text-slate-400 transition-colors">
            {'<'}
          </button>
          <button className="w-6 h-6 flex items-center justify-center rounded-md hover:bg-white/10 text-slate-400 transition-colors">
            {'>'}
          </button>
        </div>
      </div>

      <div className="grid grid-cols-7 gap-1 mb-2">
        {days.map(day => (
          <div key={day} className="text-[10px] font-medium text-slate-500 text-center uppercase tracking-wider">
            {day}
          </div>
        ))}
      </div>

      <div className="grid grid-cols-7 gap-1 flex-1">
        {dates.map((date, idx) => {
          const isCurrentMonth = date > 0 && date <= 31;
          const isToday = date === 15;
          const hasActivity = [12, 14, 15, 18].includes(date);

          return (
            <div key={idx} className="aspect-square flex items-center justify-center p-0.5">
              <div 
                className={`w-full h-full flex items-center justify-center rounded-lg text-xs transition-colors cursor-pointer
                  ${!isCurrentMonth ? 'text-slate-700' : 'text-slate-300 hover:bg-white/5'}
                  ${isToday ? 'bg-indigo-500 text-white font-bold shadow-md shadow-indigo-500/20' : ''}
                  ${hasActivity && !isToday ? 'bg-indigo-500/20 text-indigo-300 font-medium' : ''}
                `}
              >
                {date > 0 ? (date > 31 ? date - 31 : date) : 30 + date}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

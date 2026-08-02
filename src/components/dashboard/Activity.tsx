import React from 'react';
import { CheckCircle2, PlayCircle, FileText, Code2, Users, History } from 'lucide-react';
import { useDashboardData } from '../../hooks/useDashboardData';

const ACTIVITIES = [
  { title: 'Completed Google Mock Interview', time: '2 hours ago', icon: PlayCircle, color: 'text-indigo-400', score: '92%' },
  { title: 'Solved "Two Sum" (Arrays)', time: '5 hours ago', icon: Code2, color: 'text-fuchsia-400' },
  { title: 'Updated Resume ATS check', time: 'Yesterday', icon: FileText, color: 'text-emerald-400', score: '88%' },
  { title: 'Joined Peer Interview Session', time: 'Yesterday', icon: Users, color: 'text-blue-400' },
];

export default function Activity() {
  const { hasData } = useDashboardData();

  return (
    <div className="bg-slate-900/40 backdrop-blur-md border border-white/5 rounded-[20px] p-6 h-full min-h-[320px] flex flex-col shadow-sm">
      <h2 className="text-base font-semibold text-white mb-5">Recent Activity</h2>
      
      {!hasData ? (
        <div className="flex-1 flex flex-col items-center justify-center text-center">
          <div className="w-12 h-12 rounded-full bg-slate-800/50 flex items-center justify-center mb-3 border border-white/5">
            <History className="w-5 h-5 text-slate-500" />
          </div>
          <p className="text-xs text-slate-400 font-medium">No recent activity.</p>
          <p className="text-[11px] text-slate-500 mt-1">Start practicing to see your history here.</p>
        </div>
      ) : (
        <div className="flex-1 flex flex-col min-h-0">
          <div className="relative flex-1 overflow-y-auto pr-2 scrollbar-hide">
            {/* Timeline line */}
            <div className="absolute left-3.5 top-2 bottom-2 w-px bg-white/10" />
            
            <div className="space-y-5 relative">
              {ACTIVITIES.map((activity, idx) => (
                <div key={idx} className="flex items-start gap-4 group cursor-pointer">
                  <div className="relative z-10 w-7 h-7 rounded-full bg-slate-900 border border-white/10 flex items-center justify-center shrink-0 group-hover:border-white/30 transition-colors">
                    <activity.icon className={`w-3.5 h-3.5 ${activity.color}`} />
                  </div>
                  <div className="flex-1 pb-1">
                    <div className="flex items-center justify-between mb-1">
                      <p className="text-[13px] font-medium text-slate-200 group-hover:text-white transition-colors leading-tight">{activity.title}</p>
                      {activity.score && (
                        <span className="text-[10px] font-bold text-emerald-400 bg-emerald-500/10 px-2 py-0.5 rounded-md shrink-0 ml-2">
                          {activity.score}
                        </span>
                      )}
                    </div>
                    <p className="text-[11px] text-slate-500">{activity.time}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
          
          <button className="w-full mt-4 py-2 border border-white/5 rounded-xl text-[12px] font-medium text-slate-300 hover:text-white hover:bg-white/5 transition-all shrink-0">
            View Full History
          </button>
        </div>
      )}
    </div>
  );
}

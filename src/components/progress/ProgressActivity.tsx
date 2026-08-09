import React from 'react';
import { Clock } from 'lucide-react';

const activities = [
  { action: 'Skill improved', date: 'Today, 2:30 PM' },
  { action: 'Resume updated', date: 'Today, 10:15 AM' },
  { action: 'Coding challenge completed', date: 'Yesterday' },
  { action: 'Mock Interview completed', date: 'Jul 18' },
  { action: 'Resume analyzed', date: 'Jul 15' }
];

import { useProgressStore } from '../../store/progressStore';

export default function ProgressActivity({ hasActivity }: { hasActivity?: boolean }) {
  const { progress } = useProgressStore();
  const displayActivities = progress?.recent_activities?.length ? progress.recent_activities : activities;
  return (
    <div className="bg-slate-900 border border-white/5 rounded-[32px] p-6 md:p-8">
      <div className="flex items-center gap-3 mb-6">
        <div className="w-10 h-10 rounded-xl bg-slate-800 flex items-center justify-center">
          <Clock className="w-5 h-5 text-slate-400" />
        </div>
        <div>
          <h2 className="text-xl font-bold text-white">Recent Activity</h2>
          <p className="text-sm text-slate-400">Your latest actions</p>
        </div>
      </div>

      {hasActivity ? (
        <div className="space-y-4">
          {displayActivities.map((activity: any, i) => (
            <div key={i} className="flex justify-between items-center py-3 border-b border-white/5 last:border-0 last:pb-0">
              <span className="text-sm font-medium text-slate-300">{activity.action}</span>
              <span className="text-xs text-slate-500">{activity.date}</span>
            </div>
          ))}
        </div>
      ) : (
        <div className="p-8 text-center bg-slate-950 border border-white/5 rounded-xl">
          <p className="text-slate-400">Your recent activity will appear here.</p>
        </div>
      )}
    </div>
  );
}

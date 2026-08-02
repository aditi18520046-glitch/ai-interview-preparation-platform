import React from 'react';
import { Award } from 'lucide-react';

const achievements = [
  { name: 'First Resume Uploaded', date: 'Jul 15' },
  { name: 'Completed First Interview', date: 'Jul 16' },
  { name: 'Solved 50 Coding Problems', date: 'Jul 18' },
  { name: 'Resume Improved', date: 'Jul 19' },
  { name: 'Interview Ready', date: 'Jul 20' }
];

export default function ProgressAchievements({ hasActivity }: { hasActivity?: boolean }) {
  return (
    <div className="bg-slate-900 border border-white/5 rounded-[32px] p-6 md:p-8">
      <div className="flex items-center gap-3 mb-6">
        <div className="w-10 h-10 rounded-xl bg-yellow-500/10 flex items-center justify-center">
          <Award className="w-5 h-5 text-yellow-400" />
        </div>
        <div>
          <h2 className="text-xl font-bold text-white">Achievements</h2>
          <p className="text-sm text-slate-400">Milestones you have earned</p>
        </div>
      </div>

      {hasActivity ? (
        <div className="space-y-4">
          {achievements.map((achievement, i) => (
            <div key={i} className="flex items-center justify-between p-4 rounded-xl bg-slate-950 border border-white/5">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-lg bg-yellow-500/10 flex items-center justify-center">
                  <Award className="w-4 h-4 text-yellow-500" />
                </div>
                <span className="font-semibold text-slate-300">{achievement.name}</span>
              </div>
              <span className="text-xs text-slate-500">{achievement.date}</span>
            </div>
          ))}
        </div>
      ) : (
        <div className="p-8 text-center bg-slate-950 border border-white/5 rounded-xl">
          <p className="text-slate-400">Complete activities to earn achievements.</p>
        </div>
      )}
    </div>
  );
}

import React from 'react';
import { Award, Shield, Star, Flame, Zap, Target } from 'lucide-react';

const earnedBadges = [
  { name: 'Resume Expert', icon: Award, color: 'text-emerald-400', bg: 'bg-emerald-500/10' },
  { name: 'Coding Pro', icon: Star, color: 'text-indigo-400', bg: 'bg-indigo-500/10' },
  { name: 'Consistency Award', icon: Flame, color: 'text-orange-400', bg: 'bg-orange-500/10' },
  { name: 'Fast Learner', icon: Zap, color: 'text-pink-400', bg: 'bg-pink-500/10' },
];

export default function AchievementGallery({ hasActivity }: { hasActivity?: boolean }) {
  return (
    <div className="bg-slate-900 border border-white/5 rounded-[32px] p-6 md:p-8">
      <div className="flex items-center gap-3 mb-6">
        <div className="w-10 h-10 rounded-xl bg-purple-500/10 flex items-center justify-center">
          <Shield className="w-5 h-5 text-purple-400" />
        </div>
        <div>
          <h2 className="text-xl font-bold text-white">Achievement Gallery</h2>
          <p className="text-sm text-slate-400">Your earned badges</p>
        </div>
      </div>

      {hasActivity ? (
        <div className="grid grid-cols-2 gap-4">
          {earnedBadges.map((badge, i) => (
            <div key={i} className="bg-slate-950 border border-white/5 rounded-xl p-4 flex flex-col items-center justify-center text-center gap-2 group hover:border-white/10 transition-colors">
              <div className={`w-12 h-12 rounded-full ${badge.bg} flex items-center justify-center group-hover:scale-110 transition-transform`}>
                <badge.icon className={`w-6 h-6 ${badge.color}`} />
              </div>
              <span className="text-xs font-semibold text-slate-300">{badge.name}</span>
            </div>
          ))}
        </div>
      ) : (
        <div className="p-8 text-center bg-slate-950 border border-white/5 rounded-xl">
          <p className="text-slate-400">Complete activities to earn badges.</p>
        </div>
      )}
    </div>
  );
}

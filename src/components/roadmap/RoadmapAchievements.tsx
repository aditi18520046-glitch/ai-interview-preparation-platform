import React from 'react';
import { Trophy, Star, Medal, Zap, Shield, Flame } from 'lucide-react';

const ACHIEVEMENTS = [
  { icon: Flame, name: '7 Day Streak', date: 'Just now', color: 'text-orange-400', bg: 'bg-orange-500/10' },
  { icon: Star, name: 'First Lesson', date: '2 days ago', color: 'text-yellow-400', bg: 'bg-yellow-500/10' },
  { icon: Shield, name: 'Resume Ready', date: 'Locked', color: 'text-slate-500', bg: 'bg-slate-800' },
  { icon: Medal, name: '50 Problems', date: 'Locked', color: 'text-slate-500', bg: 'bg-slate-800' },
  { icon: Trophy, name: 'Interview Ready', date: 'Locked', color: 'text-slate-500', bg: 'bg-slate-800' },
  { icon: Zap, name: 'Roadmap Master', date: 'Locked', color: 'text-slate-500', bg: 'bg-slate-800' }
];

export default function RoadmapAchievements() {
  return (
    <div className="bg-slate-900 border border-white/5 rounded-[32px] p-6 md:p-8">
      <div className="flex items-center gap-2 mb-6">
        <Trophy className="w-5 h-5 text-yellow-400" />
        <h3 className="text-xl font-bold text-white">Achievements</h3>
      </div>
      
      <div className="grid grid-cols-2 gap-3">
        {ACHIEVEMENTS.map((ach, i) => (
          <div key={i} className={`p-3 rounded-xl border flex flex-col items-center text-center transition-all ${
            ach.date === 'Locked' 
              ? 'bg-slate-950 border-white/5 opacity-50' 
              : 'bg-slate-800/50 border-white/10 hover:-translate-y-1 hover:shadow-lg hover:shadow-white/5'
          }`}>
            <div className={`w-10 h-10 rounded-full ${ach.bg} flex items-center justify-center mb-2`}>
              <ach.icon className={`w-5 h-5 ${ach.color}`} />
            </div>
            <h4 className="text-xs font-bold text-white mb-1 line-clamp-1">{ach.name}</h4>
            <span className="text-[10px] text-slate-400">{ach.date}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

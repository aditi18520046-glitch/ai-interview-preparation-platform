import React from 'react';
import { Mic, FileEdit, Code2, FileText, Target, Clock } from 'lucide-react';
import { motion } from 'motion/react';
import { useDashboardData } from '../../hooks/useDashboardData';

export default function QuickStats() {
  const { hasData, stats } = useDashboardData();

  const STATS = [
    { label: 'Interviews Completed', value: hasData ? stats.interviews : '0', icon: Mic, trend: hasData ? '+2 this week' : 'Start your first interview', color: 'text-blue-400 bg-blue-500/10' },
    { label: 'Mock Tests Taken', value: hasData ? stats.tests : '0', icon: FileEdit, trend: hasData ? '+1 this week' : 'No tests taken', color: 'text-indigo-400 bg-indigo-500/10' },
    { label: 'Problems Solved', value: hasData ? stats.coding : '0', icon: Code2, trend: hasData ? '+15 this week' : 'Start coding practice', color: 'text-fuchsia-400 bg-fuchsia-500/10' },
    { label: 'Resume ATS Score', value: hasData ? `${stats.resumeScore}%` : '--', icon: FileText, trend: hasData ? '+5% improvement' : 'Upload your resume', color: 'text-emerald-400 bg-emerald-500/10' },
    { label: 'Overall Accuracy', value: hasData ? `${stats.accuracy}%` : '--', icon: Target, trend: hasData ? '+2% this week' : 'Not enough data', color: 'text-orange-400 bg-orange-500/10' },
    { label: 'Practice Hours', value: hasData ? `${stats.practiceHours}h` : '0h', icon: Clock, trend: hasData ? '+4h this week' : 'Start practicing', color: 'text-rose-400 bg-rose-500/10' },
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
      {STATS.map((stat, idx) => (
        <motion.div
          key={idx}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: idx * 0.05 }}
          className="bg-slate-900/40 backdrop-blur-md border border-white/5 rounded-[20px] p-5 shadow-sm hover:bg-slate-900/60 hover:border-white/10 transition-all flex flex-col h-full"
        >
          <div className="flex items-start justify-between mb-4">
            <div className={`w-10 h-10 rounded-xl flex items-center justify-center shrink-0 ${stat.color}`}>
              <stat.icon className="w-5 h-5" />
            </div>
          </div>
          <div>
            <h3 className="text-2xl font-bold text-white tracking-tight mb-1">{stat.value}</h3>
            <p className="text-[13px] font-medium text-slate-400">{stat.label}</p>
          </div>
          <div className="mt-3 pt-3 border-t border-white/5">
            <p className="text-[11px] text-slate-500 font-medium">
              {stat.trend}
            </p>
          </div>
        </motion.div>
      ))}
    </div>
  );
}

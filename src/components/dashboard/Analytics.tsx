import React from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, BarChart, Bar, Cell, PieChart, Pie } from 'recharts';
import { useDashboardData } from '../../hooks/useDashboardData';
import { Lock } from 'lucide-react';

const INTERVIEW_DATA = [
  { name: 'Week 1', score: 65 },
  { name: 'Week 2', score: 72 },
  { name: 'Week 3', score: 85 },
  { name: 'Week 4', score: 92 },
];

const SKILL_DATA = [
  { name: 'Algorithms', value: 85 },
  { name: 'System Design', value: 70 },
  { name: 'Communication', value: 92 },
  { name: 'Problem Solving', value: 88 },
];

const WEAKNESS_DATA = [
  { name: 'Dynamic Prog.', value: 45, color: '#f43f5e' },
  { name: 'Databases', value: 60, color: '#f59e0b' },
  { name: 'Graphs', value: 55, color: '#8b5cf6' },
  { name: 'OS Concepts', value: 65, color: '#3b82f6' },
];

export default function Analytics() {
  const { hasData } = useDashboardData();

  if (!hasData) {
    return (
      <div className="bg-slate-900/40 backdrop-blur-md border border-white/5 rounded-[20px] p-12 flex flex-col items-center justify-center text-center">
        <div className="w-16 h-16 rounded-full bg-slate-800/50 flex items-center justify-center mb-4 border border-white/5">
          <Lock className="w-6 h-6 text-slate-500" />
        </div>
        <h3 className="text-lg font-semibold text-white mb-2">Analytics Locked</h3>
        <p className="text-sm text-slate-400 max-w-sm">
          Complete your first interview to unlock personalized performance analytics and insights.
        </p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
      {/* Main Chart */}
      <div className="lg:col-span-2 bg-slate-900/40 backdrop-blur-md border border-white/5 rounded-[20px] p-6 shadow-sm">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h2 className="text-base font-semibold text-white">Interview Performance</h2>
            <p className="text-[13px] text-slate-400 mt-1">Your average scores over the last 4 weeks</p>
          </div>
          <select className="bg-slate-950 border border-white/10 text-slate-300 text-xs rounded-lg px-3 py-1.5 focus:outline-none focus:border-indigo-500">
            <option>Last 30 Days</option>
            <option>Last 3 Months</option>
            <option>All Time</option>
          </select>
        </div>
        
        <div className="h-64 w-full">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={INTERVIEW_DATA} margin={{ top: 5, right: 10, left: -20, bottom: 0 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="#ffffff10" vertical={false} />
              <XAxis dataKey="name" stroke="#ffffff40" fontSize={11} tickLine={false} axisLine={false} />
              <YAxis stroke="#ffffff40" fontSize={11} tickLine={false} axisLine={false} />
              <Tooltip 
                contentStyle={{ backgroundColor: '#0f172a', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '12px', fontSize: '12px' }}
                itemStyle={{ color: '#818cf8' }}
              />
              <Line 
                type="monotone" 
                dataKey="score" 
                stroke="#6366f1" 
                strokeWidth={3}
                dot={{ fill: '#0f172a', stroke: '#6366f1', strokeWidth: 2, r: 4 }}
                activeDot={{ r: 6, fill: '#6366f1' }}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Mini Charts */}
      <div className="space-y-6">
        <div className="bg-slate-900/40 backdrop-blur-md border border-white/5 rounded-[20px] p-6 shadow-sm h-[calc(50%-12px)]">
          <h3 className="text-sm font-semibold text-white mb-4">Skills Overview</h3>
          <div className="h-32 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={SKILL_DATA}
                  cx="50%"
                  cy="50%"
                  innerRadius={30}
                  outerRadius={50}
                  paddingAngle={5}
                  dataKey="value"
                  stroke="none"
                >
                  {SKILL_DATA.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={['#6366f1', '#8b5cf6', '#ec4899', '#14b8a6'][index % 4]} />
                  ))}
                </Pie>
                <Tooltip 
                  contentStyle={{ backgroundColor: '#0f172a', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '8px', fontSize: '12px' }}
                />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="bg-slate-900/40 backdrop-blur-md border border-white/5 rounded-[20px] p-6 shadow-sm h-[calc(50%-12px)]">
          <h3 className="text-sm font-semibold text-white mb-4">Areas to Improve</h3>
          <div className="h-32 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={WEAKNESS_DATA} layout="vertical" margin={{ top: 0, right: 0, left: -20, bottom: 0 }}>
                <XAxis type="number" hide />
                <YAxis dataKey="name" type="category" stroke="#ffffff60" fontSize={10} tickLine={false} axisLine={false} />
                <Tooltip 
                  cursor={{ fill: '#ffffff05' }}
                  contentStyle={{ backgroundColor: '#0f172a', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '8px', fontSize: '12px' }}
                />
                <Bar dataKey="value" radius={[0, 4, 4, 0]} barSize={10}>
                  {WEAKNESS_DATA.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>
    </div>
  );
}

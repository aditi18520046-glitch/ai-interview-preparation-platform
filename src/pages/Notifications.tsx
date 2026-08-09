import React, { useState, useEffect } from 'react';
import DashboardLayout from '../components/layout/DashboardLayout';
import { 
  Bell, Search, Filter, ChevronDown, Settings, CheckCircle2, 
  Calendar, Trophy, BrainCircuit, Activity, Zap, Info,
  BookOpen, Code, Play, Check, Trash2, Mail, Layout, X,
  Clock, CheckSquare, Layers, MessageSquare, AlertCircle
} from 'lucide-react';
import notificationHero from '../assets/images/notifications_hero_1784644968071.jpg';

interface NotificationRecord {
  id: string;
  title: string;
  description: string;
  time: string;
  category: string;
  priority: 'High' | 'Medium' | 'Low';
  isRead: boolean;
  relatedCompany?: string;
  relatedInterview?: string;
  relatedTask?: string;
  recommendedAction?: string;
}

import { useNotificationStore } from '../store/notificationStore';
export default function Notifications() {
  const { notifications, fetchNotifications, markAsRead, deleteNotification } = useNotificationStore();
  
  useEffect(() => {
    fetchNotifications();
  }, [fetchNotifications]);
  // Empty initially based on instructions
   
  const [searchQuery, setSearchQuery] = useState('');
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [expandedId, setExpandedId] = useState<string | null>(null);

  // Derived stats (all 0 initially since notifications is empty)
  const stats = {
    total: notifications.length,
    unread: notifications.filter(n => !n.is_read).length,
    read: notifications.filter(n => n.is_read).length,
    today: 0, // Logic for today's alerts
    upcoming: 0,
    achievements: notifications.filter(n => n.type === 'Achievement').length,
    aiRecommendations: notifications.filter(n => n.type === 'AI Recommendation').length,
    systemUpdates: notifications.filter(n => n.type === 'System Update').length,
  };

  const reminders = notifications.length > 0 ? [] : [];
  const weeklySummary = notifications.length > 0 ? {
    hoursPracticed: 0,
    interviewsCompleted: 0,
    questionsSolved: 0,
    roadmapProgress: 0,
    codingAccuracy: 0,
    resumeScoreChange: 0,
    aiReadiness: 0
  } : null;

  return (
    <DashboardLayout>
      <div className="space-y-8 animate-in fade-in duration-500 pb-12">
        
        {/* Hero Section */}
        <div className="bg-slate-900/80 backdrop-blur-xl border border-white/10 rounded-3xl p-8 md:p-10 relative overflow-hidden">
          <div className="absolute top-0 right-0 w-[400px] h-[400px] bg-indigo-500/10 rounded-full blur-[100px] -translate-y-1/2 translate-x-1/3 pointer-events-none" />
          
          <div className="flex flex-col md:flex-row items-center justify-between gap-8 relative z-10">
            <div className="max-w-2xl">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center shadow-lg shadow-indigo-500/20">
                  <Bell className="w-6 h-6 text-white" />
                </div>
                <h1 className="text-3xl md:text-4xl font-bold text-white tracking-tight">Notifications</h1>
              </div>
              <p className="text-slate-400 text-lg leading-relaxed">
                Stay updated with interview reminders, learning progress, AI recommendations, achievements, coding challenges, and important preparation milestones—all in one place.
              </p>
            </div>
            
            {/* Minimal Illustration */}
            <div className="w-64 h-64 shrink-0 rounded-2xl overflow-hidden shadow-2xl border border-white/10 relative">
              <div className="absolute inset-0 bg-indigo-500/20 mix-blend-overlay z-10" />
              <img 
                src={notificationHero} 
                alt="AI Notification Assistant" 
                className="w-full h-full object-cover object-center"
              />
            </div>
          </div>
        </div>

        {/* Compact Statistics Row */}
        <div className="grid grid-cols-2 md:grid-cols-4 xl:grid-cols-8 gap-4">
          <StatCard label="Total Alerts" value={stats.total} icon={Bell} />
          <StatCard label="Unread" value={stats.unread} icon={MessageSquare} color="text-indigo-400" />
          <StatCard label="Read" value={stats.read} icon={CheckSquare} color="text-slate-400" />
          <StatCard label="Today's Alerts" value={stats.today} icon={Calendar} color="text-emerald-400" />
          <StatCard label="Upcoming Reminders" value={stats.upcoming} icon={Clock} color="text-yellow-400" />
          <StatCard label="Achievements" value={stats.achievements} icon={Trophy} color="text-orange-400" />
          <StatCard label="AI Insights" value={stats.aiRecommendations} icon={BrainCircuit} color="text-purple-400" />
          <StatCard label="System Updates" value={stats.systemUpdates} icon={Settings} color="text-blue-400" />
        </div>

        {notifications.length === 0 ? (
          /* Empty State */
          <div className="bg-slate-900/50 border border-white/5 rounded-3xl p-12 flex flex-col items-center justify-center text-center min-h-[400px]">
            <div className="w-24 h-24 rounded-3xl bg-slate-800/80 border border-white/10 flex items-center justify-center mb-6 shadow-2xl relative">
              <CheckCircle2 className="w-12 h-12 text-emerald-400" />
              <div className="absolute -bottom-2 -right-2 w-8 h-8 rounded-full bg-slate-900 flex items-center justify-center border-4 border-slate-900">
                <Bell className="w-4 h-4 text-slate-500" />
              </div>
            </div>
            <h3 className="text-2xl font-bold text-white mb-3">You're All Caught Up!</h3>
            <p className="text-slate-400 max-w-lg mb-8 leading-relaxed">
              No notifications yet. As you complete mock interviews, coding practice, resume analysis, and roadmap activities, personalized updates, reminders, achievements, and AI recommendations will appear here.
            </p>
            <button className="px-8 py-4 bg-indigo-500 hover:bg-indigo-600 text-white font-semibold rounded-xl shadow-lg shadow-indigo-500/25 transition-all flex items-center gap-2 hover:-translate-y-0.5">
              <Play className="w-5 h-5 fill-white" /> Start Practicing
            </button>
          </div>
        ) : (
          /* Populated State (Only rendered if notifications exist) */
          <div className="space-y-8">
            {/* Search & Filter Bar */}
            <div className="bg-slate-900 border border-white/10 rounded-2xl p-4">
              <div className="flex flex-col lg:flex-row gap-4">
                <div className="flex-1 relative">
                  <Search className="w-5 h-5 text-slate-500 absolute left-4 top-1/2 -translate-y-1/2" />
                  <input 
                    type="text" 
                    placeholder="Search notifications..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="w-full bg-slate-950 border border-white/10 rounded-xl pl-11 pr-4 py-3.5 text-white focus:outline-none focus:border-indigo-500 transition-colors placeholder:text-slate-500"
                  />
                </div>
                <button 
                  onClick={() => setIsFilterOpen(!isFilterOpen)}
                  className={`px-6 py-3.5 rounded-xl border flex items-center justify-center gap-2 font-medium transition-colors ${
                    isFilterOpen ? 'bg-indigo-500/20 text-indigo-400 border-indigo-500/30' : 'bg-slate-950 text-slate-300 border-white/10 hover:bg-slate-800'
                  }`}
                >
                  <Filter className="w-4 h-4" /> Filters
                  <ChevronDown className={`w-4 h-4 transition-transform ${isFilterOpen ? 'rotate-180' : ''}`} />
                </button>
                <button className="px-6 py-3.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-white font-medium border border-white/10 transition-colors flex items-center gap-2">
                  <Check className="w-4 h-4" /> Mark All as Read
                </button>
              </div>

              {isFilterOpen && (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 pt-4 mt-4 border-t border-white/5 animate-in fade-in slide-in-from-top-2">
                  <FilterSelect label="Category" options={['Interview Reminder', 'Learning Milestone', 'Coding Challenge', 'Resume Feedback', 'Company Recommendation', 'Mock Interview Feedback', 'Achievement', 'Weekly Progress', 'System Update']} />
                  <FilterSelect label="Status" options={['All', 'Unread', 'Read']} />
                  <FilterSelect label="Priority" options={['All', 'High', 'Medium', 'Low']} />
                  <FilterSelect label="Sort By" options={['Newest First', 'Oldest First', 'Priority']} />
                </div>
              )}
            </div>

            {/* Layout for Sidebar/Main Feed */}
            <div className="grid lg:grid-cols-3 gap-8">
              
              {/* Notification Feed */}
              <div className="lg:col-span-2 space-y-4">
                {notifications.map(notification => (
                  <NotificationCard 
                    key={notification.id} 
                    notification={notification} 
                    isExpanded={expandedId === notification.id}
                    onToggle={() => setExpandedId(expandedId === notification.id ? null : notification.id)}
                  />
                ))}
              </div>

              {/* Right Sidebar */}
              <div className="space-y-6">
                
                {/* Reminder Center */}
                <div className="bg-slate-900 border border-white/10 rounded-3xl p-6">
                  <h3 className="text-lg font-bold text-white mb-4 flex items-center gap-2">
                    <Calendar className="w-5 h-5 text-indigo-400" /> Reminder Center
                  </h3>
                  {reminders.length === 0 ? (
                    <p className="text-sm text-slate-500 italic">No upcoming reminders.</p>
                  ) : (
                    <div className="space-y-3">
                      {/* Reminder items go here */}
                    </div>
                  )}
                </div>

                {/* Weekly Activity Summary */}
                {weeklySummary && (
                  <div className="bg-slate-900 border border-white/10 rounded-3xl p-6">
                    <h3 className="text-lg font-bold text-white mb-4 flex items-center gap-2">
                      <Activity className="w-5 h-5 text-emerald-400" /> Weekly Summary
                    </h3>
                    <div className="space-y-4 text-sm text-slate-300">
                      <div className="flex justify-between items-center pb-2 border-b border-white/5">
                        <span>Hours Practiced</span>
                        <span className="font-bold text-white">{weeklySummary.hoursPracticed}h</span>
                      </div>
                      <div className="flex justify-between items-center pb-2 border-b border-white/5">
                        <span>Interviews Completed</span>
                        <span className="font-bold text-white">{weeklySummary.interviewsCompleted}</span>
                      </div>
                      <div className="flex justify-between items-center pb-2 border-b border-white/5">
                        <span>Questions Solved</span>
                        <span className="font-bold text-white">{weeklySummary.questionsSolved}</span>
                      </div>
                      <div className="flex justify-between items-center pb-2 border-b border-white/5">
                        <span>Readiness</span>
                        <span className="font-bold text-emerald-400">{weeklySummary.aiReadiness}%</span>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        )}

        {/* Notification Settings Preview (Always show at bottom) */}
        <div className="bg-slate-900 border border-white/10 rounded-3xl p-8 mt-8">
          <div className="flex items-center gap-3 mb-6">
            <div className="w-10 h-10 rounded-lg bg-slate-800 flex items-center justify-center">
              <Settings className="w-5 h-5 text-slate-400" />
            </div>
            <div>
              <h2 className="text-xl font-bold text-white">Notification Settings</h2>
              <p className="text-sm text-slate-500">Manage what alerts you receive</p>
            </div>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            <ToggleSetting label="Interview Reminders" defaultOn={true} />
            <ToggleSetting label="Coding Reminders" defaultOn={true} />
            <ToggleSetting label="Weekly Reports" defaultOn={true} />
            <ToggleSetting label="AI Recommendations" defaultOn={true} />
            <ToggleSetting label="Achievement Alerts" defaultOn={true} />
            <ToggleSetting label="Roadmap Reminders" defaultOn={true} />
            <ToggleSetting label="Email Notifications" defaultOn={false} />
            <ToggleSetting label="Browser Notifications" defaultOn={false} />
          </div>
        </div>

      </div>
    </DashboardLayout>
  );
}

// Subcomponents

function StatCard({ label, value, icon: Icon, color = 'text-indigo-400' }: { label: string, value: string | number, icon: any, color?: string }) {
  return (
    <div className="bg-slate-900 border border-white/10 rounded-2xl p-4 flex flex-col justify-between h-28 hover:bg-slate-800/80 transition-colors group shadow-lg shadow-black/20">
      <div className="flex items-center justify-between mb-2">
        <span className="text-xs font-medium text-slate-400">{label}</span>
        <Icon className={`w-4 h-4 ${color} opacity-70 group-hover:opacity-100 transition-opacity`} />
      </div>
      <div className="text-2xl font-bold text-white">{value}</div>
    </div>
  );
}

function FilterSelect({ label, options }: { label: string, options: string[] }) {
  return (
    <div>
      <label className="block text-[10px] font-semibold text-slate-500 uppercase tracking-wider mb-1.5 ml-1">{label}</label>
      <div className="relative">
        <select className="w-full bg-slate-950 border border-white/10 rounded-xl px-3 py-2.5 text-sm text-slate-300 focus:outline-none focus:border-indigo-500 appearance-none cursor-pointer">
          <option value="">{label}s</option>
          {options.map(o => <option key={o} value={o}>{o}</option>)}
        </select>
        <ChevronDown className="w-3.5 h-3.5 text-slate-500 absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none" />
      </div>
    </div>
  );
}

const NotificationCard: React.FC<{ notification: NotificationRecord, isExpanded: boolean, onToggle: () => void }> = ({ notification, isExpanded, onToggle }) => {
  // Empty since we don't display populated notifications right now based on instructions
  return <div />;
}

function ToggleSetting({ label, defaultOn }: { label: string, defaultOn: boolean }) {
  const [isOn, setIsOn] = useState(defaultOn);
  return (
    <div className="flex items-center justify-between p-4 bg-slate-950 rounded-xl border border-white/5">
      <span className="text-sm font-medium text-slate-300">{label}</span>
      <button 
        onClick={() => setIsOn(!isOn)}
        className={`w-10 h-5 rounded-full p-0.5 transition-colors duration-200 ease-in-out ${isOn ? 'bg-indigo-500' : 'bg-slate-700'}`}
      >
        <div className={`w-4 h-4 rounded-full bg-white shadow transform transition-transform duration-200 ease-in-out ${isOn ? 'translate-x-5' : 'translate-x-0'}`} />
      </button>
    </div>
  );
}

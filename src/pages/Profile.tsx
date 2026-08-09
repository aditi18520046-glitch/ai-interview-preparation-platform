import React, { useState } from 'react';
import DashboardLayout from '../components/layout/DashboardLayout';
import { 
  User, Edit3, MapPin, Mail, Phone, GraduationCap, Briefcase, 
  Github, Linkedin, Globe, Target, Calendar, DollarSign, 
  Code2, Database, Cloud, Zap, BrainCircuit, Activity,
  Clock, CheckCircle2, Award, TrendingUp, BarChart, FileText,
  BookOpen, Lock, Play, Download
} from 'lucide-react';
import { Link } from 'react-router-dom';
import profileHero from '../assets/images/profile_hero_1784645278930.jpg';
import { useProfileStore } from '../store/profileStore';

export default function Profile() {
  const { profile } = useProfileStore();

  // Empty states / user data
  const [careerGoals, setCareerGoals] = useState<any>(null);
  const [activities, setActivities] = useState<any[]>([]);
  const [interviews, setInterviews] = useState<any[]>([]);
  const [codingStats, setCodingStats] = useState<any>(null);
  const [resumeStats, setResumeStats] = useState<any>(null);
  const [learningProgress, setLearningProgress] = useState<any>(null);
  const [achievements, setAchievements] = useState<any[]>([]);
  
  const skills = profile?.skills ? profile.skills.split(',').map(s => s.trim()) : [];

  const completionPercentage = profile ? 
    Math.round((Object.values(profile).filter(v => v !== null && v !== '').length / 14) * 100) : 0;

  const emptyStateMessage = (title: string, message: string, btnText: string, icon: any) => (
    <div className="bg-slate-900/50 border border-white/5 rounded-3xl p-8 flex flex-col items-center justify-center text-center">
      <div className="w-16 h-16 rounded-2xl bg-slate-800/80 border border-white/10 flex items-center justify-center mb-4 text-slate-500">
        {React.createElement(icon, { className: "w-8 h-8" })}
      </div>
      <h3 className="text-xl font-bold text-white mb-2">{title}</h3>
      <p className="text-slate-400 max-w-md mb-6">{message}</p>
      <button className="px-6 py-3 bg-indigo-500 hover:bg-indigo-600 text-white font-semibold rounded-xl transition-all">
        {btnText}
      </button>
    </div>
  );

  return (
    <DashboardLayout>
      <div className="space-y-8 animate-in fade-in duration-500 pb-12">
        
        {/* Hero Section */}
        <div className="bg-slate-900/80 backdrop-blur-xl border border-white/10 rounded-3xl p-8 md:p-10 relative overflow-hidden">
          <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-indigo-500/10 rounded-full blur-[120px] -translate-y-1/2 translate-x-1/3 pointer-events-none" />
          
          <div className="flex flex-col md:flex-row items-center justify-between gap-8 relative z-10">
            <div className="max-w-2xl">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center shadow-lg shadow-indigo-500/20 overflow-hidden">
                  {profile?.profile_picture ? (
                    <img src={profile.profile_picture} alt="Profile" className="w-full h-full object-cover" />
                  ) : (
                    <User className="w-6 h-6 text-white" />
                  )}
                </div>
                <h1 className="text-3xl md:text-4xl font-bold text-white tracking-tight">{profile?.full_name || 'My Career Profile'}</h1>
              </div>
              <p className="text-slate-400 text-lg leading-relaxed mb-6">
                View your complete interview preparation journey, monitor your progress, manage your skills, and receive AI-powered recommendations tailored to your career goals.
              </p>
              <div className="flex items-center gap-4 bg-slate-950/50 rounded-xl p-4 border border-white/5 inline-flex">
                <div className="relative w-16 h-16 flex items-center justify-center">
                  <svg className="w-full h-full transform -rotate-90" viewBox="0 0 100 100">
                    <circle cx="50" cy="50" r="40" stroke="currentColor" strokeWidth="8" fill="transparent" className="text-slate-800" />
                    <circle cx="50" cy="50" r="40" stroke="currentColor" strokeWidth="8" fill="transparent" strokeDasharray="251.2" strokeDashoffset={251.2 - (251.2 * completionPercentage) / 100} className="text-indigo-500 transition-all duration-1000" />
                  </svg>
                  <span className="absolute text-sm font-bold text-white">{completionPercentage}%</span>
                </div>
                <div>
                  <h3 className="font-bold text-white">Profile Completion</h3>
                  <p className="text-xs text-slate-400">Complete sections to unlock full AI capabilities</p>
                </div>
              </div>
            </div>
            
            <div className="w-64 h-64 shrink-0 rounded-2xl overflow-hidden shadow-2xl border border-white/10 relative">
              <div className="absolute inset-0 bg-indigo-500/20 mix-blend-overlay z-10" />
              {profile?.profile_picture ? (
                <img src={profile.profile_picture} alt="AI Career Profile" className="w-full h-full object-cover object-center" />
              ) : (
                <img src={profileHero} alt="AI Career Profile" className="w-full h-full object-cover object-center" />
              )}
            </div>
          </div>
        </div>

        {/* Two Column Layout for Core Info */}
        <div className="grid lg:grid-cols-2 gap-8">
          
          {/* Personal Information */}
          <div className="bg-slate-900 border border-white/10 rounded-3xl p-8 relative">
            <Link to="/dashboard/settings" className="absolute top-6 right-6 p-2 rounded-lg bg-slate-800 text-slate-400 hover:text-white transition-colors">
              <Edit3 className="w-4 h-4" />
            </Link>
            <h2 className="text-xl font-bold text-white mb-6 flex items-center gap-2">
              <User className="w-5 h-5 text-indigo-400" /> Personal Information
            </h2>
            
            <div className="space-y-4">
              <div className="flex items-center gap-4">
                <div className="w-16 h-16 rounded-full bg-slate-800 flex items-center justify-center text-slate-500 overflow-hidden">
                  {profile?.profile_picture ? (
                    <img src={profile.profile_picture} alt="Profile" className="w-full h-full object-cover" />
                  ) : (
                    <User className="w-8 h-8" />
                  )}
                </div>
                <div>
                  <h3 className="text-lg font-bold text-white">{profile?.full_name || 'Not Added Yet'}</h3>
                  <p className="text-sm text-slate-500">{profile?.career_goal || 'Add your professional headline'}</p>
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4 pt-4 border-t border-white/5">
                <InfoItem icon={Mail} label="Email" value={profile?.email || 'Not Added'} />
                <InfoItem icon={Phone} label="Phone" value={profile?.phone || 'Not Added'} />
                <InfoItem icon={GraduationCap} label="College" value={profile?.college || 'Not Added'} />
                <InfoItem icon={BookOpen} label="Branch" value={profile?.branch || 'Not Added'} />
                <InfoItem icon={Calendar} label="Graduation Year" value={profile?.graduation_year || 'Not Added'} />
                <InfoItem icon={Linkedin} label="LinkedIn" value={profile?.linkedin ? 'Linked' : 'Not Added'} />
                <InfoItem icon={Github} label="GitHub" value={profile?.github ? 'Linked' : 'Not Added'} />
                <InfoItem icon={Globe} label="Portfolio" value={profile?.portfolio ? 'Linked' : 'Not Added'} />
              </div>
            </div>
          </div>

          {/* Career Goals */}
          <div className="bg-slate-900 border border-white/10 rounded-3xl p-8 relative">
            <Link to="/dashboard/settings" className="absolute top-6 right-6 p-2 rounded-lg bg-slate-800 text-slate-400 hover:text-white transition-colors">
              <Edit3 className="w-4 h-4" />
            </Link>
            <h2 className="text-xl font-bold text-white mb-6 flex items-center gap-2">
              <Target className="w-5 h-5 text-emerald-400" /> Career Goals
            </h2>
            
            <div className="space-y-4">
              <InfoItem icon={Briefcase} label="Target Job Role" value={profile?.career_goal || 'Not Added'} />
              <InfoItem icon={Building2} label="Target Company" value="Not Added" />
              <InfoItem icon={Calendar} label="Expected Placement" value="Not Added" />
              <InfoItem icon={DollarSign} label="Expected Salary" value="Not Added" />
              <InfoItem icon={MapPin} label="Preferred Location" value="Not Added" />
              
              {!profile?.career_goal && (
                <div className="mt-6 pt-6 border-t border-white/5 text-center">
                  <p className="text-sm text-slate-400 mb-4">Set your career goals to get personalized AI recommendations and roadmaps.</p>
                  <Link to="/dashboard/settings" className="px-4 py-2 bg-slate-800 hover:bg-slate-700 text-white font-medium rounded-lg transition-colors text-sm">
                    Set Career Goals
                  </Link>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Activity Summary (Stats) */}
        <div className="bg-slate-900 border border-white/10 rounded-3xl p-8">
          <h2 className="text-xl font-bold text-white mb-6 flex items-center gap-2">
            <Activity className="w-5 h-5 text-purple-400" /> Activity Summary
          </h2>
          <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4">
            <StatCard label="Mock Interviews" value="0" />
            <StatCard label="Coding Solved" value="0" />
            <StatCard label="Mock Tests" value="0" />
            <StatCard label="Roadmap Progress" value="0%" />
            <StatCard label="Saved Questions" value="0" />
            <StatCard label="Resume Analyses" value="0" />
            <StatCard label="Certificates" value="0" />
            <StatCard label="Practice Hours" value="0" />
            <StatCard label="Weekly Streak" value="0" />
            <StatCard label="Monthly Activity" value="0" />
          </div>
        </div>

        {/* Skills Dashboard */}
        <div className="bg-slate-900 border border-white/10 rounded-3xl p-8">
          <h2 className="text-xl font-bold text-white mb-6 flex items-center gap-2">
            <Zap className="w-5 h-5 text-yellow-400" /> Skills Dashboard
          </h2>
          {skills.length > 0 ? (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {skills.map((skill, i) => (
                <div key={i} className="flex items-center gap-3 p-4 bg-slate-950 border border-white/5 rounded-xl">
                  <div className="w-10 h-10 rounded-lg bg-indigo-500/10 flex items-center justify-center text-indigo-400">
                    <Code2 className="w-5 h-5" />
                  </div>
                  <span className="text-white font-medium">{skill}</span>
                </div>
              ))}
            </div>
          ) : (
            emptyStateMessage(
              "No Skills Added Yet",
              "Add your skills manually or let our AI detect them automatically as you complete mock interviews and coding challenges.",
              "Add Skills",
              Code2
            )
          )}
        </div>

        {/* Responsive Grid for Performance & Progress */}
        <div className="grid lg:grid-cols-2 gap-8">
          
          {/* Interview Performance */}
          <div className="bg-slate-900 border border-white/10 rounded-3xl p-8">
            <h2 className="text-xl font-bold text-white mb-6 flex items-center gap-2">
              <BarChart className="w-5 h-5 text-indigo-400" /> Interview Performance
            </h2>
            {interviews.length > 0 ? (
               <div>{/* Real charts go here */}</div>
            ) : (
              emptyStateMessage("No Interviews Yet", "Complete your first AI mock interview to unlock detailed performance analytics.", "Start Mock Interview", Play)
            )}
          </div>

          {/* Coding Performance */}
          <div className="bg-slate-900 border border-white/10 rounded-3xl p-8">
            <h2 className="text-xl font-bold text-white mb-6 flex items-center gap-2">
              <Code2 className="w-5 h-5 text-emerald-400" /> Coding Performance
            </h2>
            {codingStats ? (
              <div>{/* Real stats go here */}</div>
            ) : (
              emptyStateMessage("No Coding Practice Yet", "Solve coding challenges to build your performance profile and track your accuracy.", "Practice Coding", Code2)
            )}
          </div>

          {/* Resume Overview */}
          <div className="bg-slate-900 border border-white/10 rounded-3xl p-8">
            <h2 className="text-xl font-bold text-white mb-6 flex items-center gap-2">
              <FileText className="w-5 h-5 text-blue-400" /> Resume Overview
            </h2>
            {resumeStats || profile?.resume_url ? (
              <div className="flex flex-col items-center gap-4">
                <a href={profile?.resume_url} target="_blank" rel="noreferrer" className="px-4 py-2 bg-slate-800 rounded-lg text-white font-medium inline-flex items-center gap-2 border border-white/10 hover:bg-slate-700 transition-colors">
                  <FileText className="w-4 h-4" /> View Current Resume
                </a>
              </div>
            ) : (
              emptyStateMessage("Resume Not Uploaded", "Upload your resume for AI analysis, ATS scoring, and personalized improvement suggestions.", "Upload Resume", FileText)
            )}
          </div>

          {/* Learning Progress */}
          <div className="bg-slate-900 border border-white/10 rounded-3xl p-8">
            <h2 className="text-xl font-bold text-white mb-6 flex items-center gap-2">
              <BookOpen className="w-5 h-5 text-purple-400" /> Learning Progress
            </h2>
            {learningProgress ? (
              <div>{/* Real stats go here */}</div>
            ) : (
              emptyStateMessage("No Learning Activity", "Generate a learning roadmap or start practicing to track your educational progress.", "View Roadmap", BookOpen)
            )}
          </div>
        </div>

        {/* Achievements & Badges */}
        <div className="bg-slate-900 border border-white/10 rounded-3xl p-8">
          <h2 className="text-xl font-bold text-white mb-6 flex items-center gap-2">
            <Award className="w-5 h-5 text-orange-400" /> Achievements & Badges
          </h2>
          {achievements.length > 0 ? (
             <div>{/* Real achievements go here */}</div>
          ) : (
            <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4">
              <LockedBadge title="First Interview" />
              <LockedBadge title="Resume Optimized" />
              <LockedBadge title="Coding Master" />
              <LockedBadge title="Consistent Learner" />
              <LockedBadge title="Roadmap Explorer" />
              <LockedBadge title="Top Performer" />
            </div>
          )}
        </div>

        {/* AI Career Insights & Recommendations */}
        <div className="grid lg:grid-cols-2 gap-8">
          <div className="bg-slate-900 border border-white/10 rounded-3xl p-8">
            <h2 className="text-xl font-bold text-white mb-6 flex items-center gap-2">
              <BrainCircuit className="w-5 h-5 text-indigo-400" /> AI Career Insights
            </h2>
            {activities.length > 0 ? (
               <ul className="space-y-4">
                 {/* Real insights go here */}
               </ul>
            ) : (
              <div className="text-center py-8">
                <BrainCircuit className="w-12 h-12 text-slate-700 mx-auto mb-4" />
                <p className="text-slate-400">No AI insights available yet. Complete more activities to unlock personalized career analysis.</p>
              </div>
            )}
          </div>

          <div className="bg-slate-900 border border-white/10 rounded-3xl p-8">
            <h2 className="text-xl font-bold text-white mb-6 flex items-center gap-2">
              <Zap className="w-5 h-5 text-yellow-400" /> Personalized Recommendations
            </h2>
            {activities.length > 0 ? (
               <ul className="space-y-4">
                 {/* Real recommendations go here */}
               </ul>
            ) : (
              <div className="text-center py-8">
                <Zap className="w-12 h-12 text-slate-700 mx-auto mb-4" />
                <p className="text-slate-400">Complete your first interview, coding challenge, or resume analysis to unlock AI recommendations.</p>
              </div>
            )}
          </div>
        </div>

        {/* Recent Activity Timeline */}
        <div className="bg-slate-900 border border-white/10 rounded-3xl p-8">
          <h2 className="text-xl font-bold text-white mb-6 flex items-center gap-2">
            <Clock className="w-5 h-5 text-slate-400" /> Recent Activity Timeline
          </h2>
          {activities.length > 0 ? (
            <div>{/* Real timeline goes here */}</div>
          ) : (
            <div className="text-center py-12">
              <Clock className="w-12 h-12 text-slate-700 mx-auto mb-4" />
              <h3 className="text-lg font-bold text-white mb-2">No Recent Activity</h3>
              <p className="text-slate-400 max-w-sm mx-auto">Your timeline is empty. Start preparing to see your history logged here.</p>
            </div>
          )}
        </div>

        {/* Quick Actions (Floating or bottom section) */}
        <div className="bg-gradient-to-r from-indigo-900/40 to-slate-900 border border-indigo-500/20 rounded-3xl p-8">
          <h2 className="text-xl font-bold text-white mb-6">Quick Actions</h2>
          <div className="flex flex-wrap gap-4">
            <ActionButton icon={Play} label="Start Mock Interview" primary />
            <ActionButton icon={Code2} label="Practice Coding" />
            <ActionButton icon={FileText} label="Resume Analysis" />
            <ActionButton icon={BookOpen} label="Continue Roadmap" />
            <ActionButton icon={Download} label="Download Report" />
          </div>
        </div>

      </div>
    </DashboardLayout>
  );
}

// Subcomponents

function InfoItem({ icon: Icon, label, value }: { icon: any, label: string, value: string }) {
  return (
    <div className="flex items-start gap-3">
      <div className="p-2 rounded-lg bg-slate-950 border border-white/5 text-slate-400">
        <Icon className="w-4 h-4" />
      </div>
      <div>
        <div className="text-[10px] font-semibold text-slate-500 uppercase tracking-wider">{label}</div>
        <div className="text-sm font-medium text-slate-300 mt-0.5 max-w-[200px] truncate">{value}</div>
      </div>
    </div>
  );
}

const Building2 = ({ className }: { className?: string }) => (
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
    <path d="M6 22V4a2 2 0 0 1 2-2h8a2 2 0 0 1 2 2v18Z"/>
    <path d="M6 12H4a2 2 0 0 0-2 2v6a2 2 0 0 0 2 2h2"/>
    <path d="M18 9h2a2 2 0 0 1 2 2v9a2 2 0 0 1-2 2h-2"/>
    <path d="M10 6h4"/>
    <path d="M10 10h4"/>
    <path d="M10 14h4"/>
    <path d="M10 18h4"/>
  </svg>
);

function StatCard({ label, value }: { label: string, value: string }) {
  return (
    <div className="bg-slate-950 border border-white/5 rounded-xl p-4 flex flex-col justify-between">
      <span className="text-[10px] font-semibold text-slate-500 uppercase tracking-wider mb-2">{label}</span>
      <div className="text-xl font-bold text-white">{value}</div>
    </div>
  );
}

function LockedBadge({ title }: { title: string }) {
  return (
    <div className="bg-slate-950 border border-white/5 rounded-xl p-4 flex flex-col items-center justify-center text-center opacity-50 grayscale">
      <div className="w-12 h-12 rounded-full bg-slate-900 border border-white/10 flex items-center justify-center mb-3">
        <Lock className="w-5 h-5 text-slate-500" />
      </div>
      <span className="text-xs font-medium text-slate-400">{title}</span>
    </div>
  );
}

function ActionButton({ icon: Icon, label, primary = false }: { icon: any, label: string, primary?: boolean }) {
  return (
    <button className={`px-5 py-3 rounded-xl font-medium flex items-center gap-2 transition-all ${
      primary 
        ? 'bg-indigo-500 hover:bg-indigo-600 text-white shadow-lg shadow-indigo-500/25' 
        : 'bg-slate-800 hover:bg-slate-700 text-white border border-white/10'
    }`}>
      <Icon className="w-4 h-4" /> {label}
    </button>
  );
}

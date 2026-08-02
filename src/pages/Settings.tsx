import React, { useState, useEffect } from 'react';
import DashboardLayout from '../components/layout/DashboardLayout';
import { toast } from 'react-hot-toast';
import { useAuthStore } from '../store/authStore';
import { getAuthUsers, saveAuthUsers, hashPassword, checkPassword } from '../lib/auth';
import { 
  User, Target, BrainCircuit, Bell, Lock, Shield, Palette, 
  Globe, Link as LinkIcon, FileText, HelpCircle, Info, Search,
  ChevronRight, ChevronDown, Check, Save, X, Smartphone, Mail,
  LogOut, Trash2, Download, ExternalLink, Moon, Sun, Monitor,
  Github, Play
} from 'lucide-react';

const CATEGORIES = [
  { id: 'account', label: 'Account', icon: User, color: 'text-blue-400' },
  { id: 'interview', label: 'Interview Preferences', icon: Target, color: 'text-emerald-400' },
  { id: 'ai', label: 'AI Preferences', icon: BrainCircuit, color: 'text-purple-400' },
  { id: 'notifications', label: 'Notifications', icon: Bell, color: 'text-yellow-400' },
  { id: 'privacy', label: 'Privacy', icon: Lock, color: 'text-rose-400' },
  { id: 'security', label: 'Security', icon: Shield, color: 'text-orange-400' },
  { id: 'appearance', label: 'Appearance', icon: Palette, color: 'text-pink-400' },
  { id: 'language', label: 'Language & Region', icon: Globe, color: 'text-cyan-400' },
  { id: 'connected', label: 'Connected Accounts', icon: LinkIcon, color: 'text-indigo-400' },
  { id: 'data', label: 'Data & Reports', icon: FileText, color: 'text-teal-400' },
  { id: 'help', label: 'Help & Support', icon: HelpCircle, color: 'text-slate-400' },
  { id: 'about', label: 'About', icon: Info, color: 'text-slate-500' },
];

export default function Settings() {
  const [activeCategory, setActiveCategory] = useState(CATEGORIES[0].id);
  const [searchQuery, setSearchQuery] = useState('');
  const [hasChanges, setHasChanges] = useState(false);
  const [expandedMobileCategory, setExpandedMobileCategory] = useState<string | null>(CATEGORIES[0].id);

  const toggleMobileCategory = (id: string) => {
    setExpandedMobileCategory(prev => prev === id ? null : id);
  };

  const handleSettingChange = () => {
    setHasChanges(true);
  };

  const renderSettingsContent = (categoryId: string) => {
    switch (categoryId) {
      case 'account':
        return (
          <div className="space-y-6 animate-in fade-in slide-in-from-bottom-2">
            <h2 className="text-xl font-bold text-white mb-6">Account Settings</h2>
            
            <div className="flex items-center gap-6 pb-6 border-b border-white/5">
              <div className="w-20 h-20 rounded-full bg-slate-800 border border-white/10 flex items-center justify-center text-slate-500 overflow-hidden">
                <User className="w-10 h-10" />
              </div>
              <div className="space-y-2">
                <button className="px-4 py-2 bg-indigo-500 hover:bg-indigo-600 text-white text-sm font-medium rounded-lg transition-colors">
                  Upload Photo
                </button>
                <p className="text-xs text-slate-400">JPG, GIF or PNG. Max size of 2MB.</p>
              </div>
            </div>

            <div className="grid md:grid-cols-2 gap-6">
              <InputField label="Full Name" placeholder="John Doe" onChange={handleSettingChange} />
              <InputField label="Email Address" type="email" placeholder="john@example.com" onChange={handleSettingChange} />
              <InputField label="Phone Number" type="tel" placeholder="+1 (555) 000-0000" onChange={handleSettingChange} />
              <InputField label="College/University" placeholder="University Name" onChange={handleSettingChange} />
              <InputField label="Current Company (Optional)" placeholder="Company Name" onChange={handleSettingChange} />
              <InputField label="Career Goal" placeholder="e.g. Senior Software Engineer" onChange={handleSettingChange} />
              <InputField label="LinkedIn Profile" placeholder="https://linkedin.com/in/username" onChange={handleSettingChange} />
              <InputField label="GitHub Profile" placeholder="https://github.com/username" onChange={handleSettingChange} />
              <InputField label="Portfolio Website" placeholder="https://yourwebsite.com" onChange={handleSettingChange} />
            </div>
          </div>
        );
      case 'interview':
        return (
          <div className="space-y-6 animate-in fade-in slide-in-from-bottom-2">
            <h2 className="text-xl font-bold text-white mb-6">Interview Preferences</h2>
            
            <div className="space-y-8">
              <div>
                <h3 className="text-sm font-semibold text-slate-300 uppercase tracking-wider mb-4">Mode & Format</h3>
                <div className="grid md:grid-cols-2 gap-6">
                  <SelectField label="Preferred Interview Mode" options={['Video', 'Voice', 'Text']} onChange={handleSettingChange} />
                  <SelectField label="Preferred Interview Language" options={['English', 'Spanish', 'French']} onChange={handleSettingChange} />
                  <SelectField label="Preferred Coding Language" options={['Python', 'Java', 'JavaScript', 'C++']} onChange={handleSettingChange} />
                  <SelectField label="Default Difficulty" options={['Adaptive', 'Easy', 'Medium', 'Hard']} onChange={handleSettingChange} />
                  <SelectField label="Default Interview Duration" options={['30 minutes', '45 minutes', '60 minutes', '90 minutes']} onChange={handleSettingChange} />
                </div>
              </div>

              <div>
                <h3 className="text-sm font-semibold text-slate-300 uppercase tracking-wider mb-4">Device & Session</h3>
                <div className="space-y-4">
                  <ToggleSetting label="Enable Camera by Default" description="Automatically request camera access when starting an interview" defaultOn={true} onChange={handleSettingChange} />
                  <ToggleSetting label="Enable Microphone by Default" description="Automatically request microphone access when starting an interview" defaultOn={true} onChange={handleSettingChange} />
                  <ToggleSetting label="Auto Save Responses" description="Automatically save your code and text responses as drafts" defaultOn={true} onChange={handleSettingChange} />
                  <ToggleSetting label="AI Follow-up Questions" description="Allow the AI to ask dynamic follow-up questions based on your answers" defaultOn={true} onChange={handleSettingChange} />
                </div>
              </div>
            </div>
          </div>
        );
      case 'ai':
        return (
          <div className="space-y-6 animate-in fade-in slide-in-from-bottom-2">
            <h2 className="text-xl font-bold text-white mb-6">AI Preferences</h2>
            
            <div className="space-y-4">
              <SelectField label="AI Feedback Detail" options={['Detailed', 'Standard', 'Basic']} description="Control how verbose the AI feedback is after an interview." onChange={handleSettingChange} />
              
              <div className="pt-4 space-y-4">
                <ToggleSetting label="Personalized Learning Roadmap" description="Allow AI to dynamically adjust your learning roadmap based on performance" defaultOn={true} onChange={handleSettingChange} />
                <ToggleSetting label="Adaptive Difficulty" description="Automatically scale question difficulty during mock interviews" defaultOn={true} onChange={handleSettingChange} />
                <ToggleSetting label="AI Resume Suggestions" description="Receive proactive suggestions to improve your uploaded resume" defaultOn={true} onChange={handleSettingChange} />
                <ToggleSetting label="AI Weekly Reports" description="Generate AI-powered summaries of your weekly progress" defaultOn={true} onChange={handleSettingChange} />
                <ToggleSetting label="Auto Skill Detection" description="Automatically infer and add skills to your profile based on performance" defaultOn={true} onChange={handleSettingChange} />
                <ToggleSetting label="AI Voice Assistant" description="Use realistic voice synthesis for mock interviews" defaultOn={true} onChange={handleSettingChange} />
                <ToggleSetting label="Smart Recommendations" description="Show next best actions and recommended topics on dashboards" defaultOn={true} onChange={handleSettingChange} />
              </div>
            </div>
          </div>
        );
      case 'notifications':
        return (
          <div className="space-y-6 animate-in fade-in slide-in-from-bottom-2">
            <h2 className="text-xl font-bold text-white mb-6">Notification Settings</h2>
            
            <div className="space-y-8">
              <div>
                <h3 className="text-sm font-semibold text-slate-300 uppercase tracking-wider mb-4">Channels</h3>
                <div className="space-y-4">
                  <ToggleSetting label="Email Notifications" description="Receive important updates via email" defaultOn={true} onChange={handleSettingChange} />
                  <ToggleSetting label="Browser Notifications" description="Show push notifications in your browser" defaultOn={false} onChange={handleSettingChange} />
                </div>
              </div>

              <div>
                <h3 className="text-sm font-semibold text-slate-300 uppercase tracking-wider mb-4">Alerts & Reminders</h3>
                <div className="space-y-4">
                  <ToggleSetting label="Interview Reminders" description="Get notified before scheduled mock interviews" defaultOn={true} onChange={handleSettingChange} />
                  <ToggleSetting label="Coding Practice Reminders" description="Reminders to maintain your coding streak" defaultOn={true} onChange={handleSettingChange} />
                  <ToggleSetting label="Learning Roadmap Reminders" description="Updates on your next roadmap milestone" defaultOn={true} onChange={handleSettingChange} />
                  <ToggleSetting label="Resume Analysis Alerts" description="Get notified when a new resume analysis is complete" defaultOn={true} onChange={handleSettingChange} />
                  <ToggleSetting label="Achievement Notifications" description="Alerts when you unlock new badges or milestones" defaultOn={true} onChange={handleSettingChange} />
                  <ToggleSetting label="Weekly Progress Reports" description="Weekly summary of your learning activity" defaultOn={true} onChange={handleSettingChange} />
                  <ToggleSetting label="Daily Study Reminder" description="A quick nudge to study every day" defaultOn={false} onChange={handleSettingChange} />
                  <ToggleSetting label="Placement Updates" description="News about hiring trends and company-specific tips" defaultOn={false} onChange={handleSettingChange} />
                </div>
              </div>
            </div>
          </div>
        );
      case 'privacy':
        return (
          <div className="space-y-6 animate-in fade-in slide-in-from-bottom-2">
            <h2 className="text-xl font-bold text-white mb-6">Privacy</h2>
            
            <div className="space-y-4">
              <ToggleSetting label="Public Profile" description="Allow your profile to be viewed by via a public link" defaultOn={false} onChange={handleSettingChange} />
              <ToggleSetting label="Leaderboard Visibility" description="Show your rank and score on global or company-specific leaderboards" defaultOn={true} onChange={handleSettingChange} />
              <ToggleSetting label="Activity Visibility" description="Make your recent activity visible to connections" defaultOn={false} onChange={handleSettingChange} />
              <ToggleSetting label="Share Achievements" description="Automatically display earned achievements on your public profile" defaultOn={true} onChange={handleSettingChange} />
              <ToggleSetting label="Share Certificates" description="Make platform certificates publicly verifiable" defaultOn={true} onChange={handleSettingChange} />
              <ToggleSetting label="Anonymous Analytics" description="Share anonymous usage data to help improve the platform" defaultOn={true} onChange={handleSettingChange} />
            </div>
          </div>
        );
      case 'security':
        return <SecuritySettings />;
      case 'appearance':
        return (
          <div className="space-y-6 animate-in fade-in slide-in-from-bottom-2">
            <h2 className="text-xl font-bold text-white mb-6">Appearance</h2>
            
            <div className="space-y-6">
              <div>
                <h3 className="text-sm font-semibold text-slate-300 uppercase tracking-wider mb-4">Theme</h3>
                <div className="grid grid-cols-3 gap-4">
                  <button className="p-4 rounded-xl border border-white/10 bg-slate-900 hover:bg-slate-800 flex flex-col items-center gap-3 transition-colors">
                    <Sun className="w-6 h-6 text-slate-400" />
                    <span className="text-sm font-medium text-slate-300">Light</span>
                  </button>
                  <button className="p-4 rounded-xl border-2 border-indigo-500 bg-slate-950 flex flex-col items-center gap-3 transition-colors">
                    <Moon className="w-6 h-6 text-indigo-400" />
                    <span className="text-sm font-medium text-white">Dark</span>
                  </button>
                  <button className="p-4 rounded-xl border border-white/10 bg-slate-900 hover:bg-slate-800 flex flex-col items-center gap-3 transition-colors">
                    <Monitor className="w-6 h-6 text-slate-400" />
                    <span className="text-sm font-medium text-slate-300">System</span>
                  </button>
                </div>
              </div>

              <div className="space-y-4 pt-6 border-t border-white/5">
                <SelectField label="Font Size" options={['Small', 'Medium (Default)', 'Large']} onChange={handleSettingChange} />
                <ToggleSetting label="Compact Layout" description="Reduce padding and margins to show more information on screen" defaultOn={false} onChange={handleSettingChange} />
                <ToggleSetting label="Animation Effects" description="Enable smooth transitions and interface animations" defaultOn={true} onChange={handleSettingChange} />
              </div>
            </div>
          </div>
        );
      case 'language':
        return (
          <div className="space-y-6 animate-in fade-in slide-in-from-bottom-2">
            <h2 className="text-xl font-bold text-white mb-6">Language & Region</h2>
            
            <div className="grid md:grid-cols-2 gap-6">
              <SelectField label="Language" options={['English (US)', 'English (UK)', 'Spanish', 'French', 'German']} onChange={handleSettingChange} />
              <SelectField label="Time Zone" options={['Pacific Time (PT)', 'Eastern Time (ET)', 'UTC', 'Central European Time (CET)']} onChange={handleSettingChange} />
              <SelectField label="Date Format" options={['MM/DD/YYYY', 'DD/MM/YYYY', 'YYYY-MM-DD']} onChange={handleSettingChange} />
              <SelectField label="Time Format" options={['12-hour (AM/PM)', '24-hour']} onChange={handleSettingChange} />
            </div>
          </div>
        );
      case 'connected':
        return (
          <div className="space-y-6 animate-in fade-in slide-in-from-bottom-2">
            <h2 className="text-xl font-bold text-white mb-6">Connected Accounts</h2>
            
            <div className="space-y-4">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between p-5 bg-slate-950 border border-white/5 rounded-xl gap-4">
                <div className="flex items-center gap-4">
                  <div className="w-10 h-10 rounded-full bg-white flex items-center justify-center p-2">
                    <svg viewBox="0 0 24 24" className="w-full h-full"><path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/><path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/><path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/><path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/></svg>
                  </div>
                  <div>
                    <h4 className="text-white font-medium">Google</h4>
                    <p className="text-sm text-emerald-400">Connected</p>
                  </div>
                </div>
                <button className="px-4 py-2 bg-slate-900 hover:bg-slate-800 text-slate-300 text-sm font-medium rounded-lg border border-white/10 transition-colors">
                  Disconnect
                </button>
              </div>

              <div className="flex flex-col sm:flex-row sm:items-center justify-between p-5 bg-slate-950 border border-white/5 rounded-xl gap-4">
                <div className="flex items-center gap-4">
                  <div className="w-10 h-10 rounded-full bg-slate-800 flex items-center justify-center text-white">
                    <Github className="w-5 h-5" />
                  </div>
                  <div>
                    <h4 className="text-white font-medium">GitHub</h4>
                    <p className="text-sm text-slate-400">Not connected</p>
                  </div>
                </div>
                <button className="px-4 py-2 bg-slate-800 hover:bg-slate-700 text-white text-sm font-medium rounded-lg border border-white/10 transition-colors">
                  Connect
                </button>
              </div>

              <div className="flex flex-col sm:flex-row sm:items-center justify-between p-5 bg-slate-950 border border-white/5 rounded-xl gap-4">
                <div className="flex items-center gap-4">
                  <div className="w-10 h-10 rounded-full bg-[#0077b5] flex items-center justify-center text-white">
                    <svg viewBox="0 0 24 24" className="w-5 h-5" fill="currentColor"><path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/></svg>
                  </div>
                  <div>
                    <h4 className="text-white font-medium">LinkedIn</h4>
                    <p className="text-sm text-slate-400">Not connected</p>
                  </div>
                </div>
                <button className="px-4 py-2 bg-slate-800 hover:bg-slate-700 text-white text-sm font-medium rounded-lg border border-white/10 transition-colors">
                  Connect
                </button>
              </div>
            </div>
          </div>
        );
      case 'data':
        return (
          <div className="space-y-6 animate-in fade-in slide-in-from-bottom-2">
            <h2 className="text-xl font-bold text-white mb-6">Data & Reports</h2>
            
            <div className="space-y-4">
              <div className="p-5 bg-slate-950 border border-white/5 rounded-xl space-y-4">
                <div className="flex items-center gap-3 mb-2">
                  <Download className="w-5 h-5 text-indigo-400" />
                  <h4 className="text-white font-medium">Export Your Data</h4>
                </div>
                <p className="text-sm text-slate-400">Download a copy of your interview history, coding stats, and resume analyses.</p>
                
                <div className="grid sm:grid-cols-2 gap-3 pt-4">
                  <button className="px-4 py-2 bg-slate-900 hover:bg-slate-800 text-slate-300 text-sm font-medium rounded-lg border border-white/10 transition-colors flex items-center justify-center gap-2">
                    <Download className="w-4 h-4" /> Interview Reports (Empty)
                  </button>
                  <button className="px-4 py-2 bg-slate-900 hover:bg-slate-800 text-slate-300 text-sm font-medium rounded-lg border border-white/10 transition-colors flex items-center justify-center gap-2">
                    <Download className="w-4 h-4" /> Coding Reports (Empty)
                  </button>
                  <button className="px-4 py-2 bg-slate-900 hover:bg-slate-800 text-slate-300 text-sm font-medium rounded-lg border border-white/10 transition-colors flex items-center justify-center gap-2">
                    <Download className="w-4 h-4" /> Resume Reports (Empty)
                  </button>
                  <button className="px-4 py-2 bg-slate-900 hover:bg-slate-800 text-slate-300 text-sm font-medium rounded-lg border border-white/10 transition-colors flex items-center justify-center gap-2">
                    <Download className="w-4 h-4" /> Export All Progress
                  </button>
                </div>
              </div>

              <div className="p-5 border border-red-500/20 rounded-xl space-y-4 mt-6">
                <h4 className="text-red-400 font-medium">Delete Data</h4>
                <p className="text-sm text-slate-400">Permanently delete all your personal data, reports, and histories without deleting your account.</p>
                <button className="px-4 py-2 bg-red-500/10 hover:bg-red-500/20 text-red-400 text-sm font-medium rounded-lg border border-red-500/20 transition-colors">
                  Delete Personal Data
                </button>
              </div>
            </div>
          </div>
        );
      case 'help':
        return (
          <div className="space-y-6 animate-in fade-in slide-in-from-bottom-2">
            <h2 className="text-xl font-bold text-white mb-6">Help & Support</h2>
            
            <div className="grid sm:grid-cols-2 gap-4">
              <a href="#" className="p-5 bg-slate-950 border border-white/5 rounded-xl hover:bg-slate-900 transition-colors flex flex-col gap-2 group">
                <HelpCircle className="w-6 h-6 text-indigo-400 mb-1" />
                <h4 className="text-white font-medium group-hover:text-indigo-300 transition-colors">Frequently Asked Questions</h4>
                <p className="text-sm text-slate-400">Find answers to common questions about the platform.</p>
              </a>
              <a href="#" className="p-5 bg-slate-950 border border-white/5 rounded-xl hover:bg-slate-900 transition-colors flex flex-col gap-2 group">
                <Mail className="w-6 h-6 text-emerald-400 mb-1" />
                <h4 className="text-white font-medium group-hover:text-emerald-300 transition-colors">Contact Support</h4>
                <p className="text-sm text-slate-400">Get in touch with our team for personalized help.</p>
              </a>
              <a href="#" className="p-5 bg-slate-950 border border-white/5 rounded-xl hover:bg-slate-900 transition-colors flex flex-col gap-2 group">
                <AlertCircleIcon className="w-6 h-6 text-rose-400 mb-1" />
                <h4 className="text-white font-medium group-hover:text-rose-300 transition-colors">Report a Bug</h4>
                <p className="text-sm text-slate-400">Let us know if something isn't working right.</p>
              </a>
              <a href="#" className="p-5 bg-slate-950 border border-white/5 rounded-xl hover:bg-slate-900 transition-colors flex flex-col gap-2 group">
                <Sun className="w-6 h-6 text-yellow-400 mb-1" />
                <h4 className="text-white font-medium group-hover:text-yellow-300 transition-colors">Request a Feature</h4>
                <p className="text-sm text-slate-400">Have an idea? We'd love to hear it.</p>
              </a>
              <a href="#" className="p-5 bg-slate-950 border border-white/5 rounded-xl hover:bg-slate-900 transition-colors flex flex-col gap-2 group sm:col-span-2">
                <Play className="w-6 h-6 text-purple-400 mb-1" />
                <h4 className="text-white font-medium group-hover:text-purple-300 transition-colors">Tutorials</h4>
                <p className="text-sm text-slate-400">Watch guides on how to make the most of your preparation.</p>
              </a>
            </div>
            
            <div className="flex gap-4 pt-6 border-t border-white/5">
              <a href="#" className="text-sm text-slate-400 hover:text-white transition-colors">Privacy Policy</a>
              <a href="#" className="text-sm text-slate-400 hover:text-white transition-colors">Terms of Service</a>
            </div>
          </div>
        );
      case 'about':
        return (
          <div className="space-y-6 animate-in fade-in slide-in-from-bottom-2">
            <h2 className="text-xl font-bold text-white mb-6">About</h2>
            
            <div className="p-8 bg-slate-950 border border-white/5 rounded-xl flex flex-col items-center justify-center text-center">
              <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center shadow-lg shadow-indigo-500/20 mb-6">
                <Target className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-2xl font-bold text-white mb-1">AI Interview Platform</h3>
              <p className="text-slate-400 mb-6">Version 2.4.0</p>
              
              <div className="flex gap-3">
                <span className="px-3 py-1 rounded-full bg-emerald-500/10 text-emerald-400 text-xs font-bold uppercase tracking-wider">
                  Pro Plan
                </span>
                <span className="px-3 py-1 rounded-full bg-slate-800 text-slate-300 text-xs font-bold uppercase tracking-wider">
                  Updated Today
                </span>
              </div>
            </div>
            
            <div className="bg-slate-950 border border-white/5 rounded-xl overflow-hidden">
              <button className="w-full p-4 flex items-center justify-between hover:bg-slate-900 transition-colors text-left">
                <span className="font-medium text-white">Release Notes</span>
                <ExternalLink className="w-4 h-4 text-slate-400" />
              </button>
              <div className="h-px w-full bg-white/5" />
              <button className="w-full p-4 flex items-center justify-between hover:bg-slate-900 transition-colors text-left">
                <span className="font-medium text-white">Application Information</span>
                <ExternalLink className="w-4 h-4 text-slate-400" />
              </button>
            </div>
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <DashboardLayout>
      <div className="animate-in fade-in duration-500 pb-24 lg:pb-12 h-full flex flex-col">
        
        {/* Compact Page Header */}
        <div className="mb-8">
          <h1 className="text-2xl md:text-3xl font-bold text-white tracking-tight mb-2 flex items-center gap-2">
            ⚙️ Settings
          </h1>
          <p className="text-slate-400 text-sm md:text-base max-w-3xl mb-6">
            Manage your account, interview preferences, AI behavior, notifications, privacy, and security.
          </p>
          <div className="relative max-w-md">
            <Search className="w-4 h-4 text-slate-500 absolute left-3 top-1/2 -translate-y-1/2" />
            <input 
              type="text" 
              placeholder="Search settings..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full bg-slate-900 border border-white/10 rounded-lg pl-10 pr-4 py-2 text-sm text-white focus:outline-none focus:border-indigo-500 transition-colors placeholder:text-slate-500"
            />
          </div>
        </div>

        <div className="flex-1 flex flex-col md:flex-row gap-8 min-h-[600px]">
          
          {/* Desktop Sidebar (hidden on mobile) */}
          <div className="hidden md:flex flex-col w-64 shrink-0 gap-1 overflow-y-auto pr-4 custom-scrollbar">
            {CATEGORIES.map(category => {
              const Icon = category.icon;
              const isActive = activeCategory === category.id;
              
              // Apply simple text filter if searching
              if (searchQuery && !category.label.toLowerCase().includes(searchQuery.toLowerCase())) {
                return null;
              }

              return (
                <button
                  key={category.id}
                  onClick={() => setActiveCategory(category.id)}
                  className={`flex items-center gap-3 px-4 py-3 rounded-xl transition-all text-left ${
                    isActive 
                      ? 'bg-slate-800 text-white' 
                      : 'text-slate-400 hover:bg-slate-900 hover:text-slate-200'
                  }`}
                >
                  <Icon className={`w-5 h-5 ${isActive ? category.color : 'opacity-70'}`} />
                  <span className="font-medium text-sm">{category.label}</span>
                </button>
              );
            })}
          </div>

          {/* Mobile Accordion View (hidden on desktop) */}
          <div className="md:hidden space-y-3">
             {CATEGORIES.map(category => {
              const Icon = category.icon;
              const isExpanded = expandedMobileCategory === category.id;
              
              if (searchQuery && !category.label.toLowerCase().includes(searchQuery.toLowerCase())) {
                return null;
              }

              return (
                <div key={category.id} className="bg-slate-900 border border-white/5 rounded-xl overflow-hidden">
                  <button
                    onClick={() => toggleMobileCategory(category.id)}
                    className="w-full flex items-center justify-between p-4 bg-slate-900"
                  >
                    <div className="flex items-center gap-3">
                      <Icon className={`w-5 h-5 ${category.color}`} />
                      <span className="font-medium text-white">{category.label}</span>
                    </div>
                    <ChevronDown className={`w-5 h-5 text-slate-500 transition-transform ${isExpanded ? 'rotate-180' : ''}`} />
                  </button>
                  {isExpanded && (
                    <div className="p-4 border-t border-white/5 bg-slate-950/50">
                      {renderSettingsContent(category.id)}
                    </div>
                  )}
                </div>
              );
            })}
          </div>

          {/* Desktop Content Area */}
          <div className="hidden md:block flex-1 bg-slate-900 border border-white/5 rounded-3xl p-8 overflow-y-auto custom-scrollbar">
            {renderSettingsContent(activeCategory)}
          </div>
        </div>

        {/* Sticky Save Bar */}
        {hasChanges && (
          <div className="fixed bottom-6 left-1/2 -translate-x-1/2 bg-slate-800 border border-white/10 rounded-2xl p-4 shadow-2xl flex items-center gap-6 animate-in slide-in-from-bottom-10 z-50">
            <span className="text-white font-medium text-sm">Unsaved changes</span>
            <div className="flex items-center gap-3">
              <button 
                onClick={() => setHasChanges(false)}
                className="px-4 py-2 text-sm font-medium text-slate-300 hover:text-white transition-colors"
              >
                Cancel
              </button>
              <button 
                onClick={() => {
                  setHasChanges(false);
                  // Optional: add toast notification here
                }}
                className="px-4 py-2 bg-indigo-500 hover:bg-indigo-600 text-white text-sm font-medium rounded-lg flex items-center gap-2 transition-colors"
              >
                <Save className="w-4 h-4" /> Save Changes
              </button>
            </div>
          </div>
        )}

      </div>
    </DashboardLayout>
  );
}

// Subcomponents

function InputField({ label, type = "text", placeholder, onChange }: { label: string, type?: string, placeholder?: string, onChange: () => void }) {
  return (
    <div>
      <label className="block text-xs font-semibold text-slate-400 uppercase tracking-wider mb-2 ml-1">{label}</label>
      <input 
        type={type} 
        placeholder={placeholder}
        onChange={onChange}
        className="w-full bg-slate-950 border border-white/10 rounded-xl px-4 py-3 text-sm text-white focus:outline-none focus:border-indigo-500 transition-colors placeholder:text-slate-600"
      />
    </div>
  );
}

function SelectField({ label, options, description, onChange }: { label: string, options: string[], description?: string, onChange: () => void }) {
  return (
    <div>
      <label className="block text-xs font-semibold text-slate-400 uppercase tracking-wider mb-2 ml-1">{label}</label>
      <div className="relative">
        <select 
          onChange={onChange}
          className="w-full bg-slate-950 border border-white/10 rounded-xl px-4 py-3 text-sm text-white focus:outline-none focus:border-indigo-500 appearance-none cursor-pointer transition-colors"
        >
          {options.map(o => <option key={o} value={o}>{o}</option>)}
        </select>
        <ChevronDown className="w-4 h-4 text-slate-500 absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none" />
      </div>
      {description && <p className="mt-2 text-xs text-slate-500 ml-1">{description}</p>}
    </div>
  );
}

function ToggleSetting({ label, description, defaultOn, onChange }: { label: string, description?: string, defaultOn: boolean, onChange: () => void }) {
  const [isOn, setIsOn] = useState(defaultOn);
  
  const handleToggle = () => {
    setIsOn(!isOn);
    onChange();
  };

  return (
    <div className="flex items-center justify-between p-4 bg-slate-950 rounded-xl border border-white/5 gap-4">
      <div className="flex-1">
        <span className="block text-sm font-medium text-slate-200">{label}</span>
        {description && <span className="block text-xs text-slate-500 mt-1">{description}</span>}
      </div>
      <button 
        onClick={handleToggle}
        className={`w-11 h-6 rounded-full p-0.5 transition-colors duration-200 ease-in-out shrink-0 focus:outline-none focus:ring-2 focus:ring-indigo-500/50 ${isOn ? 'bg-indigo-500' : 'bg-slate-700'}`}
      >
        <div className={`w-5 h-5 rounded-full bg-white shadow-sm transform transition-transform duration-200 ease-in-out ${isOn ? 'translate-x-5' : 'translate-x-0'}`} />
      </button>
    </div>
  );
}

const AlertCircleIcon = ({ className }: { className?: string }) => (
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
    <circle cx="12" cy="12" r="10"/>
    <line x1="12" y1="8" x2="12" y2="12"/>
    <line x1="12" y1="16" x2="12.01" y2="16"/>
  </svg>
);
function SecuritySettings() {
  const { user } = useAuthStore();
  const [isChangingPassword, setIsChangingPassword] = useState(false);
  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  
  const [reqLength, setReqLength] = useState(false);
  const [reqUpper, setReqUpper] = useState(false);
  const [reqLower, setReqLower] = useState(false);
  const [reqNumber, setReqNumber] = useState(false);
  const [reqSpecial, setReqSpecial] = useState(false);

  useEffect(() => {
    setReqLength(newPassword.length >= 8);
    setReqUpper(/[A-Z]/.test(newPassword));
    setReqLower(/[a-z]/.test(newPassword));
    setReqNumber(/[0-9]/.test(newPassword));
    setReqSpecial(/[^A-Za-z0-9]/.test(newPassword));
  }, [newPassword]);

  const passwordStrength = [reqLength, reqUpper, reqLower, reqNumber, reqSpecial].filter(Boolean).length;
  const isPasswordValid = passwordStrength === 5;

  const handleChangePassword = (e: React.FormEvent) => {
    e.preventDefault();
    if (!currentPassword || !newPassword || !confirmPassword) {
      toast.error('Please fill in all fields');
      return;
    }
    if (newPassword !== confirmPassword) {
      toast.error('New passwords do not match');
      return;
    }
    if (!isPasswordValid) {
      toast.error('Please meet all password requirements');
      return;
    }

    if (!user) {
      toast.error('You must be logged in');
      return;
    }

    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
      const users = getAuthUsers();
      const userIndex = users.findIndex(u => u.email === user.email);
      
      if (userIndex === -1) {
        toast.error('User not found');
        return;
      }
      
      const dbUser = users[userIndex];
      const isValid = checkPassword(currentPassword, dbUser.passwordHash);
      if (!isValid) {
        toast.error('Incorrect current password');
        return;
      }
      
      // Update password
      users[userIndex].passwordHash = hashPassword(newPassword);
      saveAuthUsers(users);
      
      toast.success('Password updated successfully');
      setIsChangingPassword(false);
      setCurrentPassword('');
      setNewPassword('');
      setConfirmPassword('');
    }, 800);
  };

  const getStrengthColor = () => {
    if (passwordStrength <= 2) return 'bg-rose-500';
    if (passwordStrength <= 4) return 'bg-yellow-500';
    return 'bg-emerald-500';
  };

  const renderRequirement = (met: boolean, text: string) => (
    <div className={`flex items-center gap-2 text-xs ${met ? 'text-emerald-400' : 'text-slate-500'}`}>
      <div className={`w-1.5 h-1.5 rounded-full ${met ? 'bg-emerald-400' : 'bg-slate-600'}`} />
      <span>{text}</span>
    </div>
  );

  return (
    <div className="space-y-6 animate-in fade-in slide-in-from-bottom-2">
      <h2 className="text-xl font-bold text-white mb-6">Security</h2>
      
      <div className="space-y-6">
        <div className="p-5 bg-slate-950 border border-white/5 rounded-xl space-y-4">
          {!isChangingPassword ? (
            <div className="flex items-center justify-between">
              <div>
                <h4 className="text-white font-medium">Password</h4>
                <p className="text-sm text-slate-400">Keep your account secure with a strong password</p>
              </div>
              <button 
                onClick={() => setIsChangingPassword(true)}
                className="px-4 py-2 bg-slate-800 hover:bg-slate-700 text-white text-sm font-medium rounded-lg transition-colors"
              >
                Change Password
              </button>
            </div>
          ) : (
            <form onSubmit={handleChangePassword} className="space-y-4">
              <div className="flex items-center justify-between mb-2">
                <h4 className="text-white font-medium">Change Password</h4>
                <button 
                  type="button" 
                  onClick={() => setIsChangingPassword(false)}
                  className="text-sm text-slate-400 hover:text-white"
                >
                  Cancel
                </button>
              </div>
              
              <div>
                <label className="block text-xs font-semibold text-slate-400 uppercase tracking-wider mb-2 ml-1">Current Password</label>
                <input
                  type="password"
                  value={currentPassword}
                  onChange={e => setCurrentPassword(e.target.value)}
                  className="w-full bg-slate-900 border border-white/10 rounded-xl px-4 py-3 text-sm text-white focus:outline-none focus:border-indigo-500 transition-colors"
                  placeholder="Enter current password"
                />
              </div>
              
              <div>
                <label className="block text-xs font-semibold text-slate-400 uppercase tracking-wider mb-2 ml-1">New Password</label>
                <input
                  type="password"
                  value={newPassword}
                  onChange={e => setNewPassword(e.target.value)}
                  className="w-full bg-slate-900 border border-white/10 rounded-xl px-4 py-3 text-sm text-white focus:outline-none focus:border-indigo-500 transition-colors"
                  placeholder="Enter new password"
                />
                
                {newPassword.length > 0 && (
                  <div className="mt-3 bg-slate-900/50 p-3 rounded-lg border border-white/5">
                    <div className="flex gap-1 h-1 mb-2">
                      {[1, 2, 3, 4, 5].map((level) => (
                        <div 
                          key={level} 
                          className={`flex-1 rounded-full transition-colors duration-300 ${passwordStrength >= level ? getStrengthColor() : 'bg-slate-700'}`} 
                        />
                      ))}
                    </div>
                    <div className="grid grid-cols-2 gap-y-1">
                      {renderRequirement(reqLength, 'At least 8 characters')}
                      {renderRequirement(reqUpper, 'One uppercase letter')}
                      {renderRequirement(reqLower, 'One lowercase letter')}
                      {renderRequirement(reqNumber, 'One number')}
                      {renderRequirement(reqSpecial, 'One special character')}
                    </div>
                  </div>
                )}
              </div>
              
              <div>
                <label className="block text-xs font-semibold text-slate-400 uppercase tracking-wider mb-2 ml-1">Confirm New Password</label>
                <input
                  type="password"
                  value={confirmPassword}
                  onChange={e => setConfirmPassword(e.target.value)}
                  className="w-full bg-slate-900 border border-white/10 rounded-xl px-4 py-3 text-sm text-white focus:outline-none focus:border-indigo-500 transition-colors"
                  placeholder="Confirm new password"
                />
              </div>
              
              <button
                type="submit"
                disabled={isLoading}
                className="w-full py-3 bg-indigo-500 hover:bg-indigo-600 text-white text-sm font-medium rounded-xl transition-colors disabled:opacity-50"
              >
                {isLoading ? 'Updating...' : 'Update Password'}
              </button>
            </form>
          )}
        </div>

        <div className="p-5 bg-slate-950 border border-white/5 rounded-xl space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <h4 className="text-white font-medium">Two-Factor Authentication</h4>
              <p className="text-sm text-slate-400">Add an extra layer of security to your account</p>
            </div>
            <button className="px-4 py-2 bg-indigo-500 hover:bg-indigo-600 text-white text-sm font-medium rounded-lg transition-colors">
              Enable 2FA
            </button>
          </div>
        </div>

        <div className="p-5 bg-slate-950 border border-white/5 rounded-xl space-y-4">
          <h4 className="text-white font-medium mb-2">Active Sessions</h4>
          <div className="space-y-3">
            <div className="flex items-center justify-between p-3 bg-slate-900 rounded-lg">
              <div className="flex items-center gap-3">
                <Monitor className="w-5 h-5 text-emerald-400" />
                <div>
                  <p className="text-sm font-medium text-white">MacBook Pro - Chrome</p>
                  <p className="text-xs text-slate-400">San Francisco, CA • Current Session</p>
                </div>
              </div>
              <span className="text-xs font-medium text-emerald-400 bg-emerald-400/10 px-2 py-1 rounded">Active</span>
            </div>
            <div className="flex items-center justify-between p-3 bg-slate-900 rounded-lg">
              <div className="flex items-center gap-3">
                <Smartphone className="w-5 h-5 text-slate-400" />
                <div>
                  <p className="text-sm font-medium text-white">iPhone 13 - Safari</p>
                  <p className="text-xs text-slate-400">San Francisco, CA • 2 hours ago</p>
                </div>
              </div>
              <button className="text-xs font-medium text-slate-400 hover:text-white transition-colors">
                Revoke
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

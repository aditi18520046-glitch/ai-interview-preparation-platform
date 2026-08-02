import React from 'react';
import { CRCompany } from './types';
import { X, MapPin, Users, Calendar, Building2, ExternalLink, Code2, CheckCircle2, Layout, BookOpen, Heart, Briefcase, Activity, TrendingUp } from 'lucide-react';

export default function CRCompanyDrawer({ 
  company, 
  isOpen, 
  onClose 
}: { 
  company: CRCompany | null; 
  isOpen: boolean; 
  onClose: () => void 
}) {
  if (!isOpen || !company) return null;

  return (
    <>
      <div 
        className="fixed inset-0 bg-black/60 backdrop-blur-sm z-[100]" 
        onClick={onClose}
      />
      <div 
        className={`fixed inset-y-0 right-0 w-full max-w-4xl bg-slate-950 border-l border-white/10 z-[110] shadow-2xl transform transition-transform duration-300 flex flex-col ${
          isOpen ? 'translate-x-0' : 'translate-x-full'
        }`}
      >
        <div className="flex items-center justify-between p-6 border-b border-white/5 bg-slate-900/50">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-xl bg-slate-800 border border-white/10 flex items-center justify-center text-xl font-bold text-white">
              {company.name.charAt(0)}
            </div>
            <div>
              <h2 className="text-xl font-bold text-white">{company.name}</h2>
              <p className="text-sm text-slate-400">{company.industry}</p>
            </div>
          </div>
          <button 
            onClick={onClose}
            className="p-2 rounded-lg bg-white/5 hover:bg-white/10 text-slate-400 hover:text-white transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="flex-1 overflow-y-auto p-6 space-y-10 scrollbar-hide">
          
          {/* Overview */}
          <section>
            <h3 className="text-lg font-semibold text-white mb-4 flex items-center gap-2">
              <Building2 className="w-5 h-5 text-indigo-400" /> Company Overview
            </h3>
            <p className="text-slate-300 leading-relaxed mb-6">
              {company.description || `${company.name} is a leading company in the ${company.industry} sector, known for its innovative solutions and world-class engineering team.`}
            </p>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
              <div className="bg-slate-900 border border-white/5 rounded-xl p-4">
                <div className="text-xs text-slate-500 mb-1">Headquarters</div>
                <div className="font-medium text-slate-200 flex items-center gap-1.5"><MapPin className="w-3.5 h-3.5" /> {company.headquarters}</div>
              </div>
              <div className="bg-slate-900 border border-white/5 rounded-xl p-4">
                <div className="text-xs text-slate-500 mb-1">Employees</div>
                <div className="font-medium text-slate-200 flex items-center gap-1.5"><Users className="w-3.5 h-3.5" /> {company.size}</div>
              </div>
              <div className="bg-slate-900 border border-white/5 rounded-xl p-4">
                <div className="text-xs text-slate-500 mb-1">Founded</div>
                <div className="font-medium text-slate-200 flex items-center gap-1.5"><Calendar className="w-3.5 h-3.5" /> {company.founded || '2000'}</div>
              </div>
              <div className="bg-slate-900 border border-white/5 rounded-xl p-4">
                <div className="text-xs text-slate-500 mb-1">Company Type</div>
                <div className="font-medium text-slate-200 flex items-center gap-1.5"><Building2 className="w-3.5 h-3.5" /> {company.type}</div>
              </div>
            </div>
          </section>

          {/* Hiring Roles & Eligibility */}
          <section className="grid md:grid-cols-2 gap-8">
            <div>
              <h3 className="text-lg font-semibold text-white mb-4 flex items-center gap-2">
                <Briefcase className="w-5 h-5 text-purple-400" /> Hiring Roles
              </h3>
              <div className="flex flex-wrap gap-2">
                {company.popularRoles.map(role => (
                  <span key={role} className="px-3 py-1.5 rounded-lg bg-purple-500/10 text-purple-300 border border-purple-500/20 text-sm">
                    {role}
                  </span>
                ))}
              </div>
            </div>
            
            <div className="bg-slate-900 border border-white/5 rounded-xl p-5">
              <h3 className="text-sm font-semibold text-white mb-4 uppercase tracking-wider text-slate-400">Eligibility Criteria</h3>
              <ul className="space-y-3 text-sm">
                <li className="flex items-start gap-2 text-slate-300">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400 mt-0.5 flex-shrink-0" />
                  <span><strong className="text-slate-200">Degree:</strong> B.Tech, M.Tech, MCA</span>
                </li>
                <li className="flex items-start gap-2 text-slate-300">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400 mt-0.5 flex-shrink-0" />
                  <span><strong className="text-slate-200">Branches:</strong> CS, IT, ECE, EE</span>
                </li>
                <li className="flex items-start gap-2 text-slate-300">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400 mt-0.5 flex-shrink-0" />
                  <span><strong className="text-slate-200">Min CGPA:</strong> 7.0+ or 70%</span>
                </li>
                <li className="flex items-start gap-2 text-slate-300">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400 mt-0.5 flex-shrink-0" />
                  <span><strong className="text-slate-200">Experience:</strong> Fresher to 3 years</span>
                </li>
              </ul>
            </div>
          </section>

          {/* Required Skills & Technologies */}
          <section>
            <h3 className="text-lg font-semibold text-white mb-4 flex items-center gap-2">
              <Code2 className="w-5 h-5 text-cyan-400" /> Skills & Technologies
            </h3>
            <div className="flex flex-wrap gap-2">
              {company.technologies.map(tech => (
                <span key={tech} className="px-3 py-1.5 rounded-lg bg-slate-800 text-slate-200 border border-white/10 text-sm">
                  {tech}
                </span>
              ))}
              {/* Add some general ones if list is short */}
              {company.technologies.length < 5 && ['DSA', 'System Design', 'DBMS', 'OS', 'Computer Networks'].map(t => (
                <span key={t} className="px-3 py-1.5 rounded-lg bg-slate-800 text-slate-200 border border-white/10 text-sm">{t}</span>
              ))}
            </div>
          </section>

          {/* Interview Process */}
          <section>
            <h3 className="text-lg font-semibold text-white mb-4 flex items-center gap-2">
              <Layout className="w-5 h-5 text-emerald-400" /> Interview Process
            </h3>
            <div className="bg-slate-900 border border-white/5 rounded-xl overflow-hidden">
              {[
                { step: 1, name: 'Online Assessment', desc: 'Aptitude, Core CS, and 2-3 Coding questions.' },
                { step: 2, name: 'Coding Round', desc: 'Focus on DSA (Arrays, Strings, Trees, DP).' },
                { step: 3, name: 'Technical Round 1 & 2', desc: 'In-depth discussion on projects, CS fundamentals, and advanced problem solving.' },
                { step: 4, name: 'System Design (If applicable)', desc: 'HLD and LLD for experienced roles.' },
                { step: 5, name: 'HR / Behavioral Round', desc: 'Cultural fit, past experiences, and scenario-based questions.' },
              ].map((round, i, arr) => (
                <div key={round.step} className={`p-4 flex gap-4 ${i !== arr.length -1 ? 'border-b border-white/5' : ''}`}>
                  <div className="w-8 h-8 rounded-full bg-emerald-500/10 text-emerald-400 flex items-center justify-center font-bold flex-shrink-0">
                    {round.step}
                  </div>
                  <div>
                    <h4 className="font-semibold text-slate-200">{round.name}</h4>
                    <p className="text-sm text-slate-400 mt-1">{round.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* Frequently Asked Topics & Logistics */}
          <section className="grid sm:grid-cols-2 gap-8">
            <div>
              <h3 className="text-lg font-semibold text-white mb-4 flex items-center gap-2">
                <BookOpen className="w-5 h-5 text-blue-400" /> Frequently Asked Topics
              </h3>
              <div className="flex flex-wrap gap-2">
                {['Arrays', 'Trees', 'Graphs', 'Dynamic Programming', 'System Design', 'DBMS', 'OS', 'Networking', 'Behavioral Questions'].map(topic => (
                  <span key={topic} className="px-2.5 py-1 rounded-md bg-blue-500/10 text-blue-300 border border-blue-500/20 text-sm">
                    {topic}
                  </span>
                ))}
              </div>
            </div>

            <div className="space-y-4">
              <div className="bg-slate-900 border border-white/5 rounded-xl p-4 flex items-center justify-between">
                <div>
                  <h4 className="text-xs font-semibold text-slate-500 uppercase tracking-wider">Difficulty</h4>
                  <div className="font-semibold text-orange-400 mt-1">Medium to Hard</div>
                </div>
                <Activity className="w-6 h-6 text-orange-400/50" />
              </div>
              <div className="bg-slate-900 border border-white/5 rounded-xl p-4 flex items-center justify-between">
                <div>
                  <h4 className="text-xs font-semibold text-slate-500 uppercase tracking-wider">Salary Range</h4>
                  <div className="font-semibold text-emerald-400 mt-1">Competitive (Tier 1)</div>
                </div>
                <TrendingUp className="w-6 h-6 text-emerald-400/50" />
              </div>
              <div className="bg-slate-900 border border-white/5 rounded-xl p-4 flex items-center justify-between">
                <div>
                  <h4 className="text-xs font-semibold text-slate-500 uppercase tracking-wider">Hiring Locations</h4>
                  <div className="font-semibold text-white mt-1">Global & Remote Options</div>
                </div>
                <MapPin className="w-6 h-6 text-slate-400/50" />
              </div>
            </div>
          </section>

          {/* Similar Companies */}
          <section>
            <h3 className="text-lg font-semibold text-white mb-4 flex items-center gap-2">
              <Building2 className="w-5 h-5 text-purple-400" /> Similar Companies
            </h3>
            <div className="flex gap-4 overflow-x-auto pb-4 scrollbar-hide">
              {['Amazon', 'Microsoft', 'Meta', 'Netflix', 'Apple'].filter(c => c !== company.name).map(c => (
                <div key={c} className="flex-shrink-0 w-32 bg-slate-900 border border-white/5 rounded-xl p-4 flex flex-col items-center justify-center text-center gap-2">
                  <div className="w-10 h-10 rounded-lg bg-white/5 border border-white/10 flex items-center justify-center text-sm font-bold text-white">
                    {c.charAt(0)}
                  </div>
                  <div className="text-sm font-semibold text-slate-300">{c}</div>
                </div>
              ))}
            </div>
          </section>
        </div>
      </div>
    </>
  );
}

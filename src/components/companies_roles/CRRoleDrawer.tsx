import React from 'react';
import { CRRole } from './types';
import { X, Briefcase, Code2, GraduationCap, TrendingUp, Building2, Target, Lightbulb, Activity, CheckCircle2 } from 'lucide-react';

export default function CRRoleDrawer({ 
  role, 
  isOpen, 
  onClose 
}: { 
  role: CRRole | null; 
  isOpen: boolean; 
  onClose: () => void 
}) {
  if (!isOpen || !role) return null;

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
            <div className="w-12 h-12 rounded-xl bg-purple-500/10 border border-purple-500/20 flex items-center justify-center">
              <Briefcase className="w-6 h-6 text-purple-400" />
            </div>
            <div>
              <h2 className="text-xl font-bold text-white">{role.title}</h2>
              <p className="text-sm text-slate-400">{role.demand} Demand</p>
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
              <Activity className="w-5 h-5 text-indigo-400" /> Role Overview
            </h3>
            <p className="text-slate-300 leading-relaxed mb-6">
              {role.description} This role involves designing, developing, and maintaining complex systems while ensuring scalability, security, and performance.
            </p>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <div className="bg-slate-900 border border-white/5 rounded-xl p-4">
                <div className="text-xs text-slate-500 mb-1">Average Salary</div>
                <div className="font-medium text-emerald-400">Competitive</div>
              </div>
              <div className="bg-slate-900 border border-white/5 rounded-xl p-4">
                <div className="text-xs text-slate-500 mb-1">Future Demand</div>
                <div className="font-medium text-blue-400">{role.demand}</div>
              </div>
              <div className="bg-slate-900 border border-white/5 rounded-xl p-4">
                <div className="text-xs text-slate-500 mb-1">Career Path</div>
                <div className="font-medium text-purple-400">High Growth</div>
              </div>
              <div className="bg-slate-900 border border-white/5 rounded-xl p-4">
                <div className="text-xs text-slate-500 mb-1">Remote Friendly</div>
                <div className="font-medium text-slate-200">Yes</div>
              </div>
            </div>
          </section>

          <div className="grid md:grid-cols-2 gap-8">
            {/* Responsibilities */}
            <section>
              <h3 className="text-lg font-semibold text-white mb-4 flex items-center gap-2">
                <Target className="w-5 h-5 text-orange-400" /> Key Responsibilities
              </h3>
              <ul className="space-y-3">
                {[
                  'Designing and developing scalable software solutions.',
                  'Writing clean, maintainable, and efficient code.',
                  'Collaborating with cross-functional teams to define features.',
                  'Participating in code reviews and architectural discussions.',
                  'Troubleshooting, debugging, and upgrading existing systems.'
                ].map((item, i) => (
                  <li key={i} className="flex items-start gap-3 text-slate-300 text-sm">
                    <CheckCircle2 className="w-4 h-4 text-orange-400 mt-0.5 flex-shrink-0" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </section>

            {/* Qualifications */}
            <section>
              <h3 className="text-lg font-semibold text-white mb-4 flex items-center gap-2">
                <GraduationCap className="w-5 h-5 text-cyan-400" /> Educational Qualification
              </h3>
              <div className="bg-slate-900 border border-white/5 rounded-xl p-5 space-y-4">
                <div>
                  <div className="text-sm font-semibold text-slate-200 mb-1">Degree</div>
                  <div className="text-sm text-slate-400">B.S. / M.S. in Computer Science, Engineering or related field.</div>
                </div>
                <div>
                  <div className="text-sm font-semibold text-slate-200 mb-1">Important Subjects</div>
                  <div className="flex flex-wrap gap-2 mt-2">
                    {['Data Structures', 'Algorithms', 'DBMS', 'Operating Systems', 'Networking'].map(subj => (
                      <span key={subj} className="px-2.5 py-1 rounded-md bg-slate-800 text-xs text-slate-300">{subj}</span>
                    ))}
                  </div>
                </div>
              </div>
            </section>
          </div>

          {/* Skills & Technologies */}
          <section>
            <h3 className="text-lg font-semibold text-white mb-4 flex items-center gap-2">
              <Code2 className="w-5 h-5 text-emerald-400" /> Skills & Technologies
            </h3>
            <div className="space-y-4">
              <div>
                <div className="text-sm text-slate-400 mb-2">Required Core Skills</div>
                <div className="flex flex-wrap gap-2">
                  {role.skills.map(skill => (
                    <span key={skill} className="px-3 py-1.5 rounded-lg bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 text-sm font-medium">
                      {skill}
                    </span>
                  ))}
                </div>
              </div>
              <div>
                <div className="text-sm text-slate-400 mb-2">Preferred / Good to Have</div>
                <div className="flex flex-wrap gap-2">
                  {['Cloud (AWS/GCP/Azure)', 'Docker & Kubernetes', 'CI/CD Pipelines', 'System Design', 'Agile Methodologies'].map(skill => (
                    <span key={skill} className="px-3 py-1.5 rounded-lg bg-slate-800 text-slate-300 border border-white/5 text-sm">
                      {skill}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </section>

          {/* Interview Focus Areas */}
          <section>
            <h3 className="text-lg font-semibold text-white mb-4 flex items-center gap-2">
              <Lightbulb className="w-5 h-5 text-yellow-400" /> Interview Focus Areas
            </h3>
            <div className="grid sm:grid-cols-2 gap-4">
              {[
                { title: 'Data Structures & Algorithms', desc: 'Arrays, Strings, Trees, Graphs, DP' },
                { title: 'System Design', desc: 'Scalability, Load Balancing, Microservices' },
                { title: 'Domain Knowledge', desc: 'Language-specific deep dives and frameworks' },
                { title: 'Behavioral', desc: 'Leadership, conflict resolution, teamwork' }
              ].map((focus, i) => (
                <div key={i} className="bg-slate-900 border border-white/5 rounded-xl p-4">
                  <div className="font-semibold text-slate-200">{focus.title}</div>
                  <div className="text-sm text-slate-400 mt-1">{focus.desc}</div>
                </div>
              ))}
            </div>
          </section>

          {/* Companies Hiring & Projects */}
          <div className="grid md:grid-cols-2 gap-8">
            {/* Preferred Projects */}
            <section>
              <h3 className="text-lg font-semibold text-white mb-4 flex items-center gap-2">
                <Code2 className="w-5 h-5 text-pink-400" /> Projects Companies Prefer
              </h3>
              <div className="bg-slate-900 border border-white/5 rounded-xl p-5 h-full">
                <ul className="space-y-3">
                  <li className="text-slate-300 text-sm flex items-start gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-pink-400 mt-1.5 flex-shrink-0" />
                    Scalable Web Applications with active users
                  </li>
                  <li className="text-slate-300 text-sm flex items-start gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-pink-400 mt-1.5 flex-shrink-0" />
                    RESTful APIs or GraphQL endpoints
                  </li>
                  <li className="text-slate-300 text-sm flex items-start gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-pink-400 mt-1.5 flex-shrink-0" />
                    Open Source Contributions (merged PRs)
                  </li>
                  <li className="text-slate-300 text-sm flex items-start gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-pink-400 mt-1.5 flex-shrink-0" />
                    Cloud-native projects (deployed on AWS/GCP)
                  </li>
                </ul>
              </div>
            </section>

            {/* Companies Hiring */}
            <section>
              <h3 className="text-lg font-semibold text-white mb-4 flex items-center gap-2">
                <Building2 className="w-5 h-5 text-blue-400" /> Companies Hiring
              </h3>
              <div className="bg-slate-900 border border-white/5 rounded-xl p-5 h-full">
                <p className="text-sm text-slate-400 mb-4">Top companies actively looking for this role:</p>
                <div className="flex flex-wrap gap-2">
                  {['Google', 'Microsoft', 'Amazon', 'Meta', 'Netflix', 'Uber', 'Atlassian', 'Stripe'].map(company => (
                    <span key={company} className="px-3 py-1.5 rounded-lg bg-slate-800 text-slate-300 border border-white/5 text-sm">
                      {company}
                    </span>
                  ))}
                </div>
              </div>
            </section>
          </div>

        </div>
      </div>
    </>
  );
}

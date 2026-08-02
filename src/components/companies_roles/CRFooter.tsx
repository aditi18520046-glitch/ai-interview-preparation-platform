import React from 'react';
import { Code2 } from 'lucide-react';
import { Link } from 'react-router-dom';

export default function CRFooter() {
  return (
    <footer className="border-t border-white/5 bg-slate-950 pt-16 pb-8 mt-12">
      <div className="max-w-[1440px] mx-auto px-4 md:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-12">
          
          <div className="md:col-span-1">
            <Link to="/" className="flex items-center gap-2 mb-4">
              <div className="w-8 h-8 rounded-lg bg-indigo-500 flex items-center justify-center">
                <Code2 className="w-5 h-5 text-white" />
              </div>
              <span className="font-bold text-lg text-white">AI Interview Prep</span>
            </Link>
            <p className="text-slate-400 text-sm leading-relaxed">
              Empowering developers to land their dream jobs with AI-driven insights, practice, and preparation.
            </p>
          </div>

          <div>
            <h3 className="font-semibold text-white mb-4">Explore</h3>
            <ul className="space-y-3 text-sm text-slate-400">
              <li><button className="hover:text-white transition-colors">Top Companies</button></li>
              <li><button className="hover:text-white transition-colors">Job Roles</button></li>
              <li><button className="hover:text-white transition-colors">Hiring Trends</button></li>
            </ul>
          </div>

          <div>
            <h3 className="font-semibold text-white mb-4">Platform</h3>
            <ul className="space-y-3 text-sm text-slate-400">
              <li><button className="hover:text-white transition-colors">About Platform</button></li>
              <li><button className="hover:text-white transition-colors">Contact Us</button></li>
              <li><button className="hover:text-white transition-colors">Help Center</button></li>
            </ul>
          </div>

          <div>
            <h3 className="font-semibold text-white mb-4">Legal</h3>
            <ul className="space-y-3 text-sm text-slate-400">
              <li><button className="hover:text-white transition-colors">Privacy Policy</button></li>
              <li><button className="hover:text-white transition-colors">Terms of Service</button></li>
              <li><button className="hover:text-white transition-colors">Cookie Policy</button></li>
            </ul>
          </div>
        </div>
        
        <div className="pt-8 border-t border-white/5 flex flex-col md:flex-row items-center justify-between gap-4 text-sm text-slate-500">
          <p>© {new Date().getFullYear()} AI Interview Prep. All rights reserved.</p>
          <div className="flex items-center gap-6">
            <button className="hover:text-white transition-colors">Twitter</button>
            <button className="hover:text-white transition-colors">LinkedIn</button>
            <button className="hover:text-white transition-colors">GitHub</button>
          </div>
        </div>
      </div>
    </footer>
  );
}

import React from 'react';
import { Mic, Code2 } from 'lucide-react';
import { Link } from 'react-router-dom';

export default function LeaderboardCTA() {
  return (
    <div className="relative overflow-hidden bg-slate-900 border border-white/5 rounded-[32px] p-8 md:p-12 text-center group">
      {/* Background elements */}
      <div className="absolute top-0 left-1/4 w-[500px] h-[500px] bg-yellow-500/10 rounded-full blur-[100px] -translate-y-1/2 pointer-events-none transition-opacity group-hover:opacity-75" />
      <div className="absolute bottom-0 right-1/4 w-[400px] h-[400px] bg-indigo-500/10 rounded-full blur-[80px] translate-y-1/2 pointer-events-none transition-opacity group-hover:opacity-75" />

      <div className="relative z-10 max-w-2xl mx-auto">
        <h2 className="text-3xl md:text-4xl font-extrabold text-white mb-6">
          Ready to Climb the Leaderboard?
        </h2>
        <p className="text-lg text-slate-300 mb-8 leading-relaxed">
          Complete more interviews, improve your resume, solve coding challenges, and earn your place among the top performers.
        </p>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <Link to="/dashboard/interview" className="w-full sm:w-auto px-8 py-4 rounded-xl bg-gradient-to-r from-yellow-500 to-orange-500 text-white font-bold text-[15px] shadow-lg shadow-yellow-500/25 hover:-translate-y-0.5 hover:shadow-yellow-500/40 transition-all flex items-center justify-center gap-2">
            <Mic className="w-5 h-5" /> Start Mock Interview
          </Link>
          <Link to="/dashboard/coding" className="w-full sm:w-auto px-8 py-4 rounded-xl bg-slate-800 text-white font-bold text-[15px] border border-white/10 hover:bg-slate-700 transition-all flex items-center justify-center gap-2">
            <Code2 className="w-5 h-5" /> Solve Coding Challenge
          </Link>
        </div>
      </div>
    </div>
  );
}

import React, { useState } from 'react';
import { useSavedQuestionStore } from '../../store/savedQuestionStore';
import { CheckCircle2, Circle, Clock, Zap, Bookmark, ListTodo } from 'lucide-react';

export default function CodingProblemTable({ onSolve }: { onSolve: (id: string) => void }) {
  const { saveQuestion, deleteQuestion, questions } = useSavedQuestionStore();
  
  const handleBookmarkToggle = (p: any, e: React.MouseEvent) => {
    e.stopPropagation();
    const isSaved = questions.some(q => q.question === p.name);
    if (isSaved) {
      const q = questions.find(q => q.question === p.name);
      if (q && q.id) deleteQuestion(q.id);
    } else {
      saveQuestion({
        question: p.name,
        question_type: 'coding',
        difficulty: p.diff,
        source: p.topic
      });
    }
  };
  const problems = [
    { id: '1', status: 'Solved', name: 'Two Sum', diff: 'Easy', topic: 'Arrays, Hash Table', time: '15m', xp: 10, bookmarked: true },
    { id: '2', status: 'Attempted', name: 'Add Two Numbers', diff: 'Medium', topic: 'Linked List, Math', time: '30m', xp: 20, bookmarked: false },
    { id: '3', status: 'Not Started', name: 'Longest Substring Without Repeating Characters', diff: 'Medium', topic: 'Hash Table, String, Sliding Window', time: '35m', xp: 25, bookmarked: true },
    { id: '4', status: 'Not Started', name: 'Median of Two Sorted Arrays', diff: 'Hard', topic: 'Array, Binary Search, Divide and Conquer', time: '45m', xp: 40, bookmarked: false },
    { id: '5', status: 'Solved', name: 'Longest Palindromic Substring', diff: 'Medium', topic: 'String, Dynamic Programming', time: '35m', xp: 25, bookmarked: false },
    { id: '6', status: 'Not Started', name: 'Zigzag Conversion', diff: 'Medium', topic: 'String', time: '30m', xp: 20, bookmarked: false },
    { id: '7', status: 'Solved', name: 'Reverse Integer', diff: 'Medium', topic: 'Math', time: '20m', xp: 15, bookmarked: false },
  ];

  const getDiffColor = (diff: string) => {
    switch(diff) {
      case 'Easy': return 'text-emerald-400 bg-emerald-500/10 border-emerald-500/20';
      case 'Medium': return 'text-orange-400 bg-orange-500/10 border-orange-500/20';
      case 'Hard': return 'text-red-400 bg-red-500/10 border-red-500/20';
      default: return 'text-slate-400 bg-slate-500/10 border-slate-500/20';
    }
  };

  const getStatusIcon = (status: string) => {
    if (status === 'Solved') return <CheckCircle2 className="w-5 h-5 text-emerald-400" />;
    if (status === 'Attempted') return <div className="w-5 h-5 rounded-full border-2 border-orange-400 border-t-transparent animate-spin" />;
    return <Circle className="w-5 h-5 text-slate-600" />;
  };

  return (
    <div className="space-y-8">
      <div className="text-center md:text-left flex flex-col md:flex-row md:items-end justify-between gap-4">
        <div>
          <h2 className="text-2xl md:text-3xl font-bold text-white flex items-center gap-3 justify-center md:justify-start">
            <ListTodo className="w-8 h-8 text-indigo-400" /> Coding Problems
          </h2>
          <p className="text-slate-400 mt-2 text-lg">Browse, filter, and solve problems from our extensive library.</p>
        </div>
      </div>

      <div className="bg-slate-900 border border-white/5 rounded-[18px] overflow-hidden shadow-lg shadow-black/10">
        <div className="hidden lg:block overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="border-b border-white/5 bg-slate-950/50">
                <th className="px-6 py-4 text-sm font-semibold text-slate-400 w-16 text-center">Status</th>
                <th className="px-6 py-4 text-sm font-semibold text-slate-400">Problem</th>
                <th className="px-6 py-4 text-sm font-semibold text-slate-400 w-32">Difficulty</th>
                <th className="px-6 py-4 text-sm font-semibold text-slate-400 hidden xl:table-cell">Topic</th>
                <th className="px-6 py-4 text-sm font-semibold text-slate-400 w-32">Time</th>
                <th className="px-6 py-4 text-sm font-semibold text-slate-400 w-24">XP</th>
                <th className="px-6 py-4 text-sm font-semibold text-slate-400 w-16 text-center">Save</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/5">
              {problems.map((p) => (
                <tr 
                  key={p.id} 
                  className="hover:bg-slate-800/50 transition-colors group cursor-pointer"
                  onClick={() => onSolve(p.id)}
                >
                  <td className="px-6 py-4 whitespace-nowrap text-center">
                    <div className="flex justify-center" title={p.status}>
                      {getStatusIcon(p.status)}
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <span className="text-[15px] font-bold text-slate-200 group-hover:text-indigo-400 transition-colors">{p.name}</span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`inline-block px-2.5 py-1 rounded-lg text-xs font-bold border uppercase tracking-wider ${getDiffColor(p.diff)}`}>
                      {p.diff}
                    </span>
                  </td>
                  <td className="px-6 py-4 hidden xl:table-cell">
                    <span className="text-sm font-medium text-slate-400 truncate max-w-[200px] block">{p.topic}</span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center gap-1.5 text-sm font-medium text-slate-400">
                      <Clock className="w-4 h-4 text-slate-500" /> {p.time}
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center gap-1.5 text-sm font-bold text-slate-300">
                      <Zap className="w-4 h-4 fill-amber-400/20 text-amber-400" /> {p.xp}
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-center">
                    <button 
                      className={`p-2 rounded-lg transition-colors ${questions.some(q => q.question === p.id) ? 'text-indigo-400 bg-indigo-500/10' : 'text-slate-500 hover:text-slate-300 hover:bg-white/5'}`}
                      onClick={(e) => handleBookmarkToggle(p, e)}
                    >
                      <Bookmark className={`w-5 h-5 ${questions.some(q => q.question === p.id) ? 'fill-current' : ''}`} />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div className="lg:hidden flex flex-col divide-y divide-white/5">
          {problems.map(p => (
            <div 
              key={p.id} 
              className="p-5 hover:bg-slate-800/50 transition-colors cursor-pointer"
              onClick={() => onSolve(p.id)}
            >
              <div className="flex items-start justify-between mb-3">
                <div className="flex items-center gap-3">
                  {getStatusIcon(p.status)}
                  <h3 className="text-base font-bold text-slate-200">{p.name}</h3>
                </div>
                <button 
                  className={`p-1.5 shrink-0 rounded-lg transition-colors ${questions.some(q => q.question === p.id) ? 'text-indigo-400' : 'text-slate-500'}`}
                  onClick={(e) => handleBookmarkToggle(p, e)}
                >
                  <Bookmark className={`w-5 h-5 ${questions.some(q => q.question === p.id) ? 'fill-current' : ''}`} />
                </button>
              </div>
              
              <div className="flex flex-wrap items-center gap-3 mt-4">
                <span className={`px-2.5 py-1 rounded-lg text-xs font-bold border uppercase tracking-wider ${getDiffColor(p.diff)}`}>
                  {p.diff}
                </span>
                <span className="flex items-center gap-1 text-xs font-medium text-slate-400 bg-slate-950/50 px-2 py-1 rounded-md border border-white/5">
                  <Clock className="w-3.5 h-3.5" /> {p.time}
                </span>
                <span className="flex items-center gap-1 text-xs font-bold text-slate-300 bg-slate-950/50 px-2 py-1 rounded-md border border-white/5">
                  <Zap className="w-3.5 h-3.5 fill-amber-400/20 text-amber-400" /> {p.xp} XP
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

import React, { useState, useEffect, useRef } from 'react';
import { Mic, MicOff, Video, VideoOff, Monitor, PhoneOff, Settings, Maximize2, ChevronLeft, Bot, User, Play, Square, Send, Loader2 } from 'lucide-react';
import { motion } from 'motion/react';
import { useInterviewStore } from '../../store/interviewStore';

export default function MockInterviewWorkspace({ onEnd }: { onEnd: () => void }) {
  const { currentInterview, updateInterview, finishInterview } = useInterviewStore();
  const [isMicOn, setIsMicOn] = useState(true);
  const [isVideoOn, setIsVideoOn] = useState(true);
  
  const [transcript, setTranscript] = useState<{role: string, text: string, evaluation?: any}[]>([]);
  const [timeElapsed, setTimeElapsed] = useState(0);
  const [isGenerating, setIsGenerating] = useState(false);
  const [inputText, setInputText] = useState("");
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    let timer: any;
    timer = setInterval(() => setTimeElapsed(prev => prev + 1), 1000);
    return () => clearInterval(timer);
  }, []);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [transcript, isGenerating]);

  // Initial greeting / question generation
  useEffect(() => {
    if (transcript.length === 0 && !isGenerating && currentInterview) {
      generateNextQuestion();
    }
  }, [currentInterview]);

  const generateNextQuestion = async (userAnswer?: string) => {
    setIsGenerating(true);
    try {
      const response = await fetch('/api/interview/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          config: {
            company: currentInterview?.company,
            job_role: currentInterview?.job_role,
            interview_type: currentInterview?.interview_type,
            difficulty: currentInterview?.difficulty,
          },
          history: transcript,
          answer: userAnswer
        })
      });
      
      if (!response.ok) {
        throw new Error(`Failed to generate question: ${response.status}`);
      }
      
      const data = await response.json();
      
      if (userAnswer && data.evaluation) {
         // Update the last user message with its evaluation
         setTranscript(prev => {
            const newTranscript = [...prev];
            const lastMsg = newTranscript[newTranscript.length - 1];
            if (lastMsg.role === 'user') {
                lastMsg.evaluation = data.evaluation;
            }
            return newTranscript;
         });
      }

      if (!data || !data.nextQuestion) {
        throw new Error("Invalid response format: missing nextQuestion");
      }

      setTranscript(prev => [...prev, { role: 'ai', text: data.nextQuestion }]);
      
      if (currentInterview?.id) {
        updateInterview(currentInterview.id, {
          questions: [...transcript.filter(t => t.role === 'ai'), { role: 'ai', text: data.nextQuestion }],
          answers: transcript.filter(t => t.role === 'user'),
          // We can also save the most recent evaluation or cumulative score here if we wanted
        });
      }
    } catch (err) {
      console.error(err);
      setTranscript(prev => [...prev, { role: 'ai', text: "Unable to generate interview question. Please try again." }]);
    } finally {
      setIsGenerating(false);
    }
  };

  const handleSend = () => {
    if (!inputText.trim() || isGenerating) return;
    const newAnswer = inputText.trim();
    setInputText("");
    setTranscript(prev => [...prev, { role: 'user', text: newAnswer }]);
    generateNextQuestion(newAnswer);
  };

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  const handleEnd = async () => {
    if (currentInterview?.id) {
      // Get final report
      setIsGenerating(true);
      try {
          const response = await fetch('/api/interview/report', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
              config: currentInterview,
              history: transcript,
            })
          });
          
          if (!response.ok) {
            throw new Error(`Failed to generate report: ${response.status}`);
          }
          
          const report = await response.json();
          await finishInterview(currentInterview.id, {
              ai_feedback: JSON.stringify(report),
              final_score: report.overallScore || 0,
              duration: timeElapsed
          });
      } catch (err) {
          console.error(err);
          await finishInterview(currentInterview.id, {
              duration: timeElapsed
          });
      }
    }
    onEnd();
  };

  return (
    <div className="h-[calc(100vh-140px)] flex flex-col gap-6">
      {/* Top Bar */}
      <div className="flex items-center justify-between px-6 py-4 bg-slate-900/40 backdrop-blur-md border border-white/5 rounded-2xl shadow-sm">
        <div className="flex items-center gap-4">
          <button onClick={handleEnd} className="p-2 hover:bg-white/5 rounded-lg text-white transition-colors">
            <ChevronLeft className="w-5 h-5" />
          </button>
          <div>
            <h2 className="text-lg font-bold text-white">{currentInterview?.job_role || 'Software Engineer'} Mock Interview</h2>
            <div className="flex items-center gap-2 text-xs font-medium text-slate-400">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" /> Live Session
              <span className="px-1.5 py-0.5 rounded-md bg-white/5 border border-white/10">{formatTime(timeElapsed)}</span>
            </div>
          </div>
        </div>
        <div className="flex items-center gap-3">
          <button className="p-2 hover:bg-white/5 rounded-lg text-slate-400 transition-colors"><Settings className="w-5 h-5" /></button>
          <button className="p-2 hover:bg-white/5 rounded-lg text-slate-400 transition-colors"><Maximize2 className="w-5 h-5" /></button>
          <button onClick={handleEnd} className="px-4 py-2 bg-red-500/10 text-red-400 hover:bg-red-500/20 rounded-xl font-bold text-sm transition-colors flex items-center gap-2 border border-red-500/20">
            <PhoneOff className="w-4 h-4" /> End Interview
          </button>
        </div>
      </div>

      <div className="flex-1 flex flex-col lg:flex-row gap-6 min-h-0">
        {/* Left: Video Area */}
        <div className="w-full lg:w-3/5 flex flex-col gap-4">
          {/* Main AI Video Feed */}
          <div className="flex-1 relative bg-slate-950 rounded-2xl border border-white/5 overflow-hidden flex items-center justify-center shadow-inner">
             {/* Abstract AI Avatar Animation */}
             <div className="absolute inset-0 bg-gradient-to-br from-indigo-900/20 to-purple-900/20" />
             <motion.div 
                animate={{ scale: isGenerating ? [1, 1.1, 1] : [1, 1.05, 1], opacity: [0.8, 1, 0.8] }}
                transition={{ duration: isGenerating ? 2 : 4, repeat: Infinity, ease: "easeInOut" }}
                className="w-48 h-48 rounded-full bg-gradient-to-br from-indigo-500/20 to-purple-500/20 border-4 border-indigo-500/30 flex items-center justify-center backdrop-blur-xl shadow-[0_0_60px_rgba(99,102,241,0.2)]"
             >
               <Bot className="w-20 h-20 text-indigo-400" />
             </motion.div>
             <div className="absolute bottom-4 left-4 px-3 py-1.5 bg-black/60 backdrop-blur-md rounded-lg text-sm font-medium text-white border border-white/10 flex items-center gap-2">
               <Bot className="w-4 h-4 text-indigo-400" /> AI Interviewer {isGenerating && ' (Thinking...)'}
             </div>
             
             {/* User Video Picture-in-Picture */}
             <div className="absolute bottom-4 right-4 w-48 h-32 bg-slate-900 rounded-xl border-2 border-slate-700 overflow-hidden shadow-2xl flex items-center justify-center">
               {isVideoOn ? (
                 <div className="w-full h-full bg-slate-800 flex items-center justify-center relative">
                   <User className="w-12 h-12 text-slate-500" />
                   <div className="absolute bottom-2 left-2 px-2 py-1 bg-black/60 backdrop-blur-md rounded text-xs font-medium text-white">You</div>
                 </div>
               ) : (
                 <div className="flex flex-col items-center gap-2 text-slate-500">
                   <VideoOff className="w-6 h-6" />
                   <span className="text-xs font-medium">Camera Off</span>
                 </div>
               )}
             </div>
          </div>
          
          {/* Control Bar - Changed to Chat Input */}
          <div className="min-h-[80px] bg-slate-900/40 backdrop-blur-md border border-white/5 rounded-2xl flex items-center gap-4 px-4 py-2 shadow-sm">
             <button onClick={() => setIsMicOn(!isMicOn)} className={`w-10 h-10 shrink-0 rounded-full flex items-center justify-center transition-all ${isMicOn ? 'bg-white/10 text-white hover:bg-white/20' : 'bg-red-500/20 text-red-400 hover:bg-red-500/30'}`}>
               {isMicOn ? <Mic className="w-4 h-4" /> : <MicOff className="w-4 h-4" />}
             </button>
             <button onClick={() => setIsVideoOn(!isVideoOn)} className={`w-10 h-10 shrink-0 rounded-full flex items-center justify-center transition-all ${isVideoOn ? 'bg-white/10 text-white hover:bg-white/20' : 'bg-red-500/20 text-red-400 hover:bg-red-500/30'}`}>
               {isVideoOn ? <Video className="w-4 h-4" /> : <VideoOff className="w-4 h-4" />}
             </button>
             
             <div className="w-px h-8 bg-white/10 mx-1 shrink-0" />
             
             <div className="flex-1 flex items-center bg-slate-950/50 rounded-xl border border-white/10 p-1">
                <textarea 
                  value={inputText}
                  onChange={(e) => setInputText(e.target.value)}
                  onKeyDown={(e) => {
                     if (e.key === 'Enter' && !e.shiftKey) {
                        e.preventDefault();
                        handleSend();
                     }
                  }}
                  placeholder="Type your answer here..."
                  className="flex-1 bg-transparent border-none text-white text-sm px-3 py-2 focus:ring-0 resize-none h-10 max-h-32"
                  rows={1}
                />
                <button 
                  onClick={handleSend}
                  disabled={!inputText.trim() || isGenerating}
                  className="w-10 h-10 shrink-0 bg-indigo-500 hover:bg-indigo-600 disabled:bg-slate-700 disabled:text-slate-400 text-white rounded-lg flex items-center justify-center transition-colors"
                >
                  <Send className="w-4 h-4" />
                </button>
             </div>
          </div>
        </div>

        {/* Right: Transcript Area */}
        <div className="w-full lg:w-2/5 flex flex-col bg-slate-900/40 backdrop-blur-md border border-white/5 rounded-2xl overflow-hidden shadow-sm">
          <div className="px-6 py-4 border-b border-white/5 bg-slate-800/50 flex items-center justify-between">
            <h3 className="font-bold text-white text-sm uppercase tracking-wider">Live Transcript</h3>
          </div>
          <div ref={scrollRef} className="flex-1 p-6 overflow-y-auto space-y-6">
            {transcript.map((msg, i) => (
              <div key={i} className={`flex flex-col ${msg.role === 'user' ? 'items-end' : 'items-start'}`}>
                <div className={`flex items-center gap-2 mb-1.5 ${msg.role === 'user' ? 'flex-row-reverse' : ''}`}>
                  <div className={`w-6 h-6 rounded-md flex items-center justify-center ${msg.role === 'ai' ? 'bg-indigo-500/20 text-indigo-400' : 'bg-emerald-500/20 text-emerald-400'}`}>
                    {msg.role === 'ai' ? <Bot className="w-3.5 h-3.5" /> : <User className="w-3.5 h-3.5" />}
                  </div>
                  <span className="text-xs font-semibold text-slate-400 uppercase">{msg.role === 'ai' ? 'AI Interviewer' : 'You'}</span>
                </div>
                <div className={`p-4 rounded-2xl max-w-[85%] text-[15px] leading-relaxed shadow-sm ${msg.role === 'user' ? 'bg-emerald-500/10 text-emerald-100 border border-emerald-500/20 rounded-tr-sm' : 'bg-slate-800/80 text-slate-200 border border-white/5 rounded-tl-sm'}`}>
                  {msg.text}
                </div>
                {msg.evaluation && (
                  <div className="mt-2 p-3 bg-slate-950 border border-white/5 rounded-xl max-w-[85%] text-xs text-slate-300">
                     <div className="flex items-center justify-between mb-2">
                        <span className="font-bold text-slate-400 uppercase tracking-wider">AI Evaluation</span>
                        <span className={`px-2 py-0.5 rounded font-bold ${msg.evaluation.overall >= 80 ? 'bg-emerald-500/20 text-emerald-400' : msg.evaluation.overall >= 60 ? 'bg-yellow-500/20 text-yellow-400' : 'bg-red-500/20 text-red-400'}`}>
                           Score: {msg.evaluation.overall}/100
                        </span>
                     </div>
                     <div className="grid grid-cols-2 gap-2 mb-2">
                        <div><span className="text-slate-500">Correctness:</span> {msg.evaluation.correctness}</div>
                        <div><span className="text-slate-500">Relevance:</span> {msg.evaluation.relevance}</div>
                        <div><span className="text-slate-500">Completeness:</span> {msg.evaluation.completeness}</div>
                        <div><span className="text-slate-500">Clarity:</span> {msg.evaluation.clarity}</div>
                     </div>
                  </div>
                )}
              </div>
            ))}
            {isGenerating && (
              <div className="flex flex-col items-start">
                <div className="flex items-center gap-2 mb-1.5">
                  <div className="w-6 h-6 rounded-md flex items-center justify-center bg-indigo-500/20 text-indigo-400">
                    <Bot className="w-3.5 h-3.5" />
                  </div>
                  <span className="text-xs font-semibold text-slate-400 uppercase">AI Interviewer</span>
                </div>
                <div className="p-4 rounded-2xl bg-slate-800/80 text-slate-200 border border-white/5 rounded-tl-sm flex items-center gap-2">
                  <Loader2 className="w-4 h-4 animate-spin text-indigo-400" />
                  <span className="text-sm italic">Analyzing & generating next question...</span>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

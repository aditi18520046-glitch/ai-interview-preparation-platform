import React, { useState, useEffect } from 'react';
import { Mic, MicOff, Video, VideoOff, Monitor, PhoneOff, Settings, Maximize2, ChevronLeft, Bot, User, Play, Square } from 'lucide-react';
import { motion } from 'motion/react';

export default function MockInterviewWorkspace({ onEnd }: { onEnd: () => void }) {
  const [isMicOn, setIsMicOn] = useState(true);
  const [isVideoOn, setIsVideoOn] = useState(true);
  const [isRecording, setIsRecording] = useState(false);
  const [transcript, setTranscript] = useState([
    { role: 'ai', text: 'Hello! I am your AI interviewer. To get started, could you please introduce yourself?' }
  ]);
  const [timeElapsed, setTimeElapsed] = useState(0);

  useEffect(() => {
    let timer: any;
    if (isRecording) {
      timer = setInterval(() => setTimeElapsed(prev => prev + 1), 1000);
    }
    return () => clearInterval(timer);
  }, [isRecording]);

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  const handleToggleRecording = () => {
    if (!isRecording) {
      setIsRecording(true);
      // Simulate user speaking
      setTimeout(() => {
        setTranscript(prev => [...prev, { role: 'user', text: "Hi, I'm a software engineer with 3 years of experience..." }]);
      }, 3000);
      
      // Simulate AI response
      setTimeout(() => {
        setIsRecording(false);
        setTranscript(prev => [...prev, { role: 'ai', text: "That's great. Let's move on to some technical questions. Can you explain the difference between a process and a thread?" }]);
      }, 7000);
    } else {
      setIsRecording(false);
    }
  };

  return (
    <div className="h-[calc(100vh-140px)] flex flex-col gap-6">
      {/* Top Bar */}
      <div className="flex items-center justify-between px-6 py-4 bg-slate-900/40 backdrop-blur-md border border-white/5 rounded-2xl shadow-sm">
        <div className="flex items-center gap-4">
          <button onClick={onEnd} className="p-2 hover:bg-white/5 rounded-lg text-slate-400 hover:text-white transition-colors">
            <ChevronLeft className="w-5 h-5" />
          </button>
          <div>
            <h2 className="text-lg font-bold text-white">Software Engineer Mock Interview</h2>
            <div className="flex items-center gap-2 text-xs font-medium text-slate-400">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" /> Live Session
              <span className="px-1.5 py-0.5 rounded-md bg-white/5 border border-white/10">{formatTime(timeElapsed)}</span>
            </div>
          </div>
        </div>
        <div className="flex items-center gap-3">
          <button className="p-2 hover:bg-white/5 rounded-lg text-slate-400 transition-colors"><Settings className="w-5 h-5" /></button>
          <button className="p-2 hover:bg-white/5 rounded-lg text-slate-400 transition-colors"><Maximize2 className="w-5 h-5" /></button>
          <button onClick={onEnd} className="px-4 py-2 bg-red-500/10 text-red-400 hover:bg-red-500/20 rounded-xl font-bold text-sm transition-colors flex items-center gap-2 border border-red-500/20">
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
                animate={{ scale: [1, 1.05, 1], opacity: [0.8, 1, 0.8] }}
                transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                className="w-48 h-48 rounded-full bg-gradient-to-br from-indigo-500/20 to-purple-500/20 border-4 border-indigo-500/30 flex items-center justify-center backdrop-blur-xl shadow-[0_0_60px_rgba(99,102,241,0.2)]"
             >
               <Bot className="w-20 h-20 text-indigo-400" />
             </motion.div>
             <div className="absolute bottom-4 left-4 px-3 py-1.5 bg-black/60 backdrop-blur-md rounded-lg text-sm font-medium text-white border border-white/10 flex items-center gap-2">
               <Bot className="w-4 h-4 text-indigo-400" /> AI Interviewer
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

          {/* Control Bar */}
          <div className="h-20 bg-slate-900/40 backdrop-blur-md border border-white/5 rounded-2xl flex items-center justify-center gap-4 px-6 shadow-sm">
             <button 
               onClick={() => setIsMicOn(!isMicOn)}
               className={`w-12 h-12 rounded-full flex items-center justify-center transition-all ${isMicOn ? 'bg-white/10 text-white hover:bg-white/20' : 'bg-red-500/20 text-red-400 hover:bg-red-500/30'}`}
             >
               {isMicOn ? <Mic className="w-5 h-5" /> : <MicOff className="w-5 h-5" />}
             </button>
             <button 
               onClick={() => setIsVideoOn(!isVideoOn)}
               className={`w-12 h-12 rounded-full flex items-center justify-center transition-all ${isVideoOn ? 'bg-white/10 text-white hover:bg-white/20' : 'bg-red-500/20 text-red-400 hover:bg-red-500/30'}`}
             >
               {isVideoOn ? <Video className="w-5 h-5" /> : <VideoOff className="w-5 h-5" />}
             </button>
             <button className="w-12 h-12 rounded-full bg-white/10 hover:bg-white/20 text-white flex items-center justify-center transition-all">
               <Monitor className="w-5 h-5" />
             </button>
             
             <div className="w-px h-8 bg-white/10 mx-2" />
             
             <button 
               onClick={handleToggleRecording}
               className={`px-6 py-3 rounded-full font-bold text-sm flex items-center gap-2 transition-all shadow-lg ${isRecording ? 'bg-red-500 hover:bg-red-600 text-white shadow-red-500/25' : 'bg-gradient-to-r from-indigo-500 to-purple-500 hover:from-indigo-600 hover:to-purple-600 text-white shadow-indigo-500/25'}`}
             >
               {isRecording ? (
                 <><Square className="w-4 h-4 fill-current" /> Stop Answering</>
               ) : (
                 <><Play className="w-4 h-4 fill-current" /> Answer Question</>
               )}
             </button>
          </div>
        </div>

        {/* Right: Transcript Area */}
        <div className="w-full lg:w-2/5 flex flex-col bg-slate-900/40 backdrop-blur-md border border-white/5 rounded-2xl overflow-hidden shadow-sm">
          <div className="px-6 py-4 border-b border-white/5 bg-slate-800/50 flex items-center justify-between">
            <h3 className="font-bold text-white text-sm uppercase tracking-wider">Live Transcript</h3>
          </div>
          <div className="flex-1 p-6 overflow-y-auto space-y-6">
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
              </div>
            ))}
            {isRecording && (
              <div className="flex flex-col items-end">
                <div className="flex items-center gap-2 mb-1.5 flex-row-reverse">
                  <div className="w-6 h-6 rounded-md flex items-center justify-center bg-emerald-500/20 text-emerald-400">
                    <User className="w-3.5 h-3.5" />
                  </div>
                  <span className="text-xs font-semibold text-slate-400 uppercase">You</span>
                </div>
                <div className="p-4 rounded-2xl bg-emerald-500/5 text-emerald-200/50 border border-emerald-500/10 rounded-tr-sm flex items-center gap-2">
                  <div className="flex gap-1">
                    <div className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-bounce" style={{ animationDelay: '0ms' }} />
                    <div className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-bounce" style={{ animationDelay: '150ms' }} />
                    <div className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-bounce" style={{ animationDelay: '300ms' }} />
                  </div>
                  <span className="text-sm italic">Listening...</span>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

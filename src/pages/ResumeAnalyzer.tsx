import React, { useState, useEffect } from 'react';
import { useResumeStore } from '../store/resumeStore';
import DashboardLayout from '../components/layout/DashboardLayout';
import RAHero from '../components/resume_analyzer/RAHero';
import RAFeatures from '../components/resume_analyzer/RAFeatures';
import RAWorkflow from '../components/resume_analyzer/RAWorkflow';
import RAResults from '../components/resume_analyzer/RAResults';
import RACTA from '../components/resume_analyzer/RACTA';

const loadingMessages = [
  "Reading your resume...",
  "Identifying your skills...",
  "Checking ATS compatibility...",
  "Comparing with industry expectations...",
  "Preparing your report..."
];

export default function ResumeAnalyzer() {
  const { history, currentAnalysis } = useResumeStore();
  const { uploadResume, saveAnalysis, fetchHistory } = useResumeStore();
  useEffect(() => { fetchHistory(); }, [fetchHistory]);
  const [file, setFile] = useState<File | null>(null);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [hasResults, setHasResults] = useState(false);
  useEffect(() => { if (currentAnalysis) setHasResults(true); }, [currentAnalysis]);
  const [loadingStep, setLoadingStep] = useState(0);

  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (isAnalyzing) {
      setLoadingStep(0);
      interval = setInterval(() => {
        setLoadingStep((prev) => {
          if (prev < loadingMessages.length - 1) return prev + 1;
          clearInterval(interval);
          return prev;
        });
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [isAnalyzing]);

  const handleUpload = (uploadedFile: File) => {
    setFile(uploadedFile);
    setHasResults(false);
  };

  const handleAnalyze = async () => {
    if (!file) return;
    setIsAnalyzing(true);
    // Simulate AI processing
    const url = await uploadResume(file);
    if (url) {
      await saveAnalysis({
        resume_url: url,
        ats_score: 85,
        resume_score: 92,
        missing_skills: ['AWS', 'Docker'],
        grammar_suggestions: ['Change "did" to "achieved"'],
        ai_suggestions: ['Quantify your achievements']
      });
    }
    
    setIsAnalyzing(false);
    setHasResults(true);
  };

  const handleReset = () => {
    setFile(null);
    setHasResults(false);
  };

  const handleRemoveFile = () => {
    setFile(null);
    setHasResults(false);
  };

  return (
    <DashboardLayout>
      <div className="max-w-[1440px] mx-auto px-4 md:px-6 lg:px-8 py-8 space-y-16">
        
        {/* Top Hero & Upload Section */}
        <RAHero 
          onUpload={handleUpload}
          onAnalyze={handleAnalyze}
          onRemoveFile={handleRemoveFile}
          file={file}
          isAnalyzing={isAnalyzing} 
          hasResults={hasResults}
          onReset={handleReset}
        />

        {!hasResults && !isAnalyzing && (
          <>
            <div className="text-center bg-slate-900 border border-white/5 rounded-3xl p-12">
               <h3 className="text-xl text-slate-300 font-medium">
                 Upload your resume to receive an AI-powered analysis with personalized suggestions to improve your chances of getting shortlisted.
               </h3>
            </div>
            {/* Features */}
            <RAFeatures />
            
            {/* Workflow */}
            <RAWorkflow />
            {history && history.length > 0 && (
              <div className="mt-12 bg-slate-900 border border-white/5 rounded-3xl p-8">
                <h3 className="text-xl font-bold text-white mb-6">Previous Analyses</h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                  {history.map((item, i) => (
                    <div key={i} className="p-4 bg-slate-800 rounded-xl border border-white/5 flex flex-col gap-2">
                      <span className="text-slate-300 font-medium">Analysis from {new Date(item.upload_date || Date.now()).toLocaleDateString()}</span>
                      <span className="text-indigo-400 font-bold">ATS Score: {item.ats_score}%</span>
                      <button onClick={() => {
                        useResumeStore.setState({ currentAnalysis: item });
                        setHasResults(true);
                      }} className="text-sm bg-indigo-500/20 text-indigo-300 py-1.5 px-3 rounded-lg hover:bg-indigo-500/30 mt-2">View Analysis</button>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </>
        )}

        {isAnalyzing && (
          <div className="flex flex-col items-center justify-center py-20">
            <div className="relative w-24 h-24 mb-8">
              <div className="absolute inset-0 border-t-2 border-indigo-500 rounded-full animate-spin"></div>
              <div className="absolute inset-2 border-r-2 border-purple-500 rounded-full animate-spin direction-reverse"></div>
              <div className="absolute inset-4 border-b-2 border-cyan-500 rounded-full animate-spin"></div>
            </div>
            <h3 className="text-2xl font-bold text-white mb-2 animate-pulse">{loadingMessages[loadingStep]}</h3>
            <p className="text-slate-400">Please wait while our AI engine analyzes your profile.</p>
          </div>
        )}

        {hasResults && (
          <RAResults file={file} onReplace={handleReset} />
        )}

        {hasResults && (
          <RACTA />
        )}
      </div>
    </DashboardLayout>
  );
}

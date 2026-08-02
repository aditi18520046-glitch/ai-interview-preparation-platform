import React, { useState, useEffect } from 'react';
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
  const [file, setFile] = useState<File | null>(null);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [hasResults, setHasResults] = useState(false);
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

  const handleAnalyze = () => {
    if (!file) return;
    setIsAnalyzing(true);
    // Simulate AI processing
    setTimeout(() => {
      setIsAnalyzing(false);
      setHasResults(true);
    }, 5500); // Wait long enough for all messages to show
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

import React, { useRef, useState } from 'react';
import { UploadCloud, FileText, CheckCircle2, RotateCcw, X, AlertCircle } from 'lucide-react';

interface RAHeroProps {
  onUpload: (file: File) => void;
  onAnalyze: () => void;
  onRemoveFile: () => void;
  file: File | null;
  isAnalyzing: boolean;
  hasResults: boolean;
  onReset: () => void;
}

export default function RAHero({ onUpload, onAnalyze, onRemoveFile, file, isAnalyzing, hasResults, onReset }: RAHeroProps) {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [error, setError] = useState<string | null>(null);

  const handleFileClick = () => {
    if (!file && !hasResults && !isAnalyzing) {
      fileInputRef.current?.click();
    }
  };

  const validateAndUpload = (selectedFile: File) => {
    setError(null);
    const validTypes = ['application/pdf', 'application/msword', 'application/vnd.openxmlformats-officedocument.wordprocessingml.document'];
    
    if (!validTypes.includes(selectedFile.type)) {
      setError('Please upload a PDF, DOC, or DOCX file.');
      return;
    }
    
    if (selectedFile.size > 5 * 1024 * 1024) {
      setError('File size must be less than 5 MB.');
      return;
    }

    onUpload(selectedFile);
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = e.target.files?.[0];
    if (selectedFile) {
      validateAndUpload(selectedFile);
    }
    // Reset input value to allow uploading the same file again if removed
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    if (hasResults || isAnalyzing || file) return;
    const droppedFile = e.dataTransfer.files?.[0];
    if (droppedFile) {
      validateAndUpload(droppedFile);
    }
  };

  return (
    <div className="grid lg:grid-cols-2 gap-12 items-center">
      
      {/* Left Content */}
      <div className="space-y-8 text-center lg:text-left">
        <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-indigo-500/10 border border-indigo-500/20 text-indigo-400 text-sm font-semibold">
          <FileText className="w-4 h-4" /> Resume Intelligence
        </div>
        
        <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white leading-tight tracking-tight">
          AI Resume <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 to-purple-400">Analyzer</span>
        </h1>
        
        <p className="text-lg text-slate-300 leading-relaxed max-w-2xl mx-auto lg:mx-0">
          Upload your resume to receive an AI-powered analysis with personalized suggestions to improve your chances of getting shortlisted.
        </p>
        
        <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4">
          {!hasResults ? (
            <>
              {file ? (
                <button 
                  onClick={onAnalyze}
                  disabled={isAnalyzing}
                  className="w-full sm:w-auto px-8 py-3.5 rounded-xl bg-gradient-to-r from-indigo-600 to-purple-600 text-white font-bold text-[15px] shadow-lg shadow-indigo-500/25 hover:-translate-y-0.5 hover:shadow-indigo-500/40 transition-all flex items-center justify-center gap-2 disabled:opacity-50 disabled:hover:translate-y-0"
                >
                  <UploadCloud className="w-5 h-5" /> 
                  {isAnalyzing ? 'Analyzing...' : 'Analyze Resume'}
                </button>
              ) : (
                <button 
                  onClick={handleFileClick}
                  className="w-full sm:w-auto px-8 py-3.5 rounded-xl bg-white/5 text-white font-bold text-[15px] border border-white/10 hover:bg-white/10 transition-all flex items-center justify-center gap-2"
                >
                  <UploadCloud className="w-5 h-5" /> Upload Resume
                </button>
              )}
            </>
          ) : (
             <button 
                onClick={onReset}
                className="w-full sm:w-auto px-8 py-3.5 rounded-xl bg-white/5 text-white font-bold text-[15px] border border-white/10 hover:bg-white/10 transition-all flex items-center justify-center gap-2"
              >
                <RotateCcw className="w-5 h-5" /> Analyze Another Resume
              </button>
          )}
        </div>

        <div className="flex flex-wrap justify-center lg:justify-start gap-4">
          <div className="flex items-center gap-1.5 text-sm text-slate-400 font-medium">
            <CheckCircle2 className="w-4 h-4 text-emerald-400" /> PDF, DOC, DOCX
          </div>
          <div className="flex items-center gap-1.5 text-sm text-slate-400 font-medium">
            <CheckCircle2 className="w-4 h-4 text-emerald-400" /> Max 5 MB
          </div>
          <div className="flex items-center gap-1.5 text-sm text-slate-400 font-medium">
            <CheckCircle2 className="w-4 h-4 text-emerald-400" /> Secure Upload
          </div>
          <div className="flex items-center gap-1.5 text-sm text-slate-400 font-medium">
            <CheckCircle2 className="w-4 h-4 text-emerald-400" /> AI Powered
          </div>
        </div>
      </div>

      {/* Right Upload Card */}
      <div className="flex justify-center items-center lg:justify-end">
        <input 
          type="file" 
          ref={fileInputRef} 
          className="hidden" 
          accept=".pdf,.doc,.docx,application/pdf,application/msword,application/vnd.openxmlformats-officedocument.wordprocessingml.document"
          onChange={handleFileChange}
        />
        <div 
          onClick={handleFileClick}
          onDragOver={handleDragOver}
          onDrop={handleDrop}
          className={`relative w-full max-w-md aspect-square bg-slate-900/50 backdrop-blur-xl border-2 border-dashed ${hasResults || file ? 'border-emerald-500/50' : 'border-indigo-500/30'} rounded-[32px] flex flex-col items-center justify-center p-8 text-center transition-all ${!hasResults && !isAnalyzing && !file ? 'hover:border-indigo-400 hover:bg-slate-900/80 cursor-pointer group' : ''}`}
        >
          {hasResults ? (
            <>
               <div className="w-24 h-24 rounded-full bg-emerald-500/10 flex items-center justify-center mb-6">
                <CheckCircle2 className="w-12 h-12 text-emerald-400" />
              </div>
              <h3 className="text-2xl font-bold text-white mb-2">Resume Analyzed</h3>
              <p className="text-slate-400 mb-6">Review your detailed report below.</p>
              <div className="flex items-center gap-3 px-4 py-3 rounded-xl bg-slate-800 border border-white/5">
                <FileText className="w-6 h-6 text-indigo-400" />
                <div className="text-left">
                  <div className="text-sm font-semibold text-white max-w-[150px] truncate">{file?.name || 'resume.pdf'}</div>
                  <div className="text-xs text-slate-500">{(file?.size ? (file.size / (1024 * 1024)).toFixed(2) : '1.2')} MB</div>
                </div>
              </div>
            </>
          ) : file ? (
             <>
               <div className="w-24 h-24 rounded-full bg-emerald-500/10 flex items-center justify-center mb-6">
                <FileText className="w-12 h-12 text-emerald-400" />
              </div>
              <h3 className="text-2xl font-bold text-white mb-2">Ready to Analyze</h3>
              <p className="text-slate-400 mb-6">Click analyze to generate your report.</p>
              
              <div className="flex items-center gap-3 px-4 py-3 rounded-xl bg-slate-800 border border-white/5 mb-4">
                <FileText className="w-6 h-6 text-indigo-400" />
                <div className="text-left">
                  <div className="text-sm font-semibold text-white max-w-[150px] truncate" title={file.name}>{file.name}</div>
                  <div className="text-xs text-slate-500">{(file.size / (1024 * 1024)).toFixed(2)} MB</div>
                </div>
              </div>

              {!isAnalyzing && (
                <div className="flex gap-3">
                  <button onClick={(e) => { e.stopPropagation(); fileInputRef.current?.click(); }} className="px-4 py-2 rounded-lg bg-white/5 text-slate-300 text-sm font-semibold hover:bg-white/10 hover:text-white transition-colors">
                    Replace
                  </button>
                  <button onClick={(e) => { e.stopPropagation(); onRemoveFile(); }} className="px-4 py-2 rounded-lg bg-red-500/10 text-red-400 text-sm font-semibold hover:bg-red-500/20 transition-colors">
                    Remove
                  </button>
                </div>
              )}
            </>
          ) : (
            <>
              <div className="w-24 h-24 rounded-full bg-indigo-500/10 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                <UploadCloud className="w-12 h-12 text-indigo-400" />
              </div>
              <h3 className="text-2xl font-bold text-white mb-2">Drag & Drop Your Resume</h3>
              <p className="text-slate-400 mb-8">or browse your computer</p>
              
              <div className="flex flex-col gap-3 w-full max-w-[240px]">
                <button className="w-full py-3 rounded-xl bg-indigo-500/20 text-indigo-300 font-semibold border border-indigo-500/20 group-hover:bg-indigo-500 group-hover:text-white transition-all pointer-events-none">
                  Browse Files
                </button>
              </div>

              {error && (
                <div className="mt-4 flex items-center gap-2 text-red-400 text-sm font-medium bg-red-500/10 px-4 py-2 rounded-lg border border-red-500/20">
                  <AlertCircle className="w-4 h-4 flex-shrink-0" />
                  <span>{error}</span>
                </div>
              )}

              <div className="mt-8 pt-6 border-t border-white/10 w-full">
                <div className="text-sm font-medium text-slate-400 flex flex-col gap-1">
                  <span>Supported formats: PDF • DOC • DOCX</span>
                  <span>Maximum Size: 5 MB</span>
                </div>
              </div>
            </>
          )}
        </div>
      </div>

    </div>
  );
}

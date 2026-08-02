import React from 'react';
import { ZoomIn, ZoomOut, Download, RefreshCw, FileText } from 'lucide-react';

interface RAPreviewProps {
  file: File | null;
  onReplace: () => void;
}

export default function RAPreview({ file, onReplace }: RAPreviewProps) {
  return (
    <div className="h-full bg-slate-900 border border-white/5 rounded-[32px] overflow-hidden flex flex-col">
      {/* Toolbar */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between p-4 border-b border-white/5 bg-slate-950 gap-4">
        <div className="flex items-center gap-2">
          <FileText className="w-5 h-5 text-indigo-400" />
          <div className="text-sm font-semibold text-slate-300 truncate max-w-full">
            {file ? file.name : 'johndoe_resume.pdf'}
          </div>
        </div>
        
        <div className="flex flex-wrap items-center gap-2 mt-2 sm:mt-0">
          <div className="flex items-center bg-slate-800 rounded-lg border border-white/5">
            <button className="p-2 hover:text-white text-slate-400 transition-colors" title="Zoom Out">
              <ZoomOut className="w-4 h-4" />
            </button>
            <span className="text-xs font-medium text-slate-300 px-2">100%</span>
            <button className="p-2 hover:text-white text-slate-400 transition-colors" title="Zoom In">
              <ZoomIn className="w-4 h-4" />
            </button>
          </div>
          
          <button className="p-2 rounded-lg bg-slate-800 border border-white/5 hover:text-white text-slate-400 transition-colors" title="Download Original">
            <Download className="w-4 h-4" />
          </button>
          <button 
            onClick={onReplace}
            className="flex items-center gap-2 px-3 py-2 rounded-lg bg-indigo-500/10 border border-indigo-500/20 text-indigo-400 hover:bg-indigo-500/20 transition-colors" 
            title="Replace Resume"
          >
            <RefreshCw className="w-4 h-4" />
            <span className="text-sm font-medium">Replace</span>
          </button>
        </div>
      </div>

      {/* Embedded Viewer (Placeholder) */}
      <div className="flex-1 bg-slate-800/50 p-4 sm:p-8 flex items-center justify-center overflow-auto min-h-[500px]">
        {/* Placeholder for the actual PDF rendering */}
        <div className="w-[800px] min-w-[600px] sm:min-w-[800px] aspect-[1/1.414] bg-white rounded-lg shadow-2xl flex flex-col p-8 sm:p-12 pointer-events-none shrink-0 transform origin-top lg:scale-100 md:scale-90 sm:scale-75 scale-50">
          
          {/* Skeleton of a Resume */}
          <div className="text-center mb-8 border-b-2 border-slate-300 pb-6">
            <div className="h-8 bg-slate-300 w-1/3 mx-auto rounded mb-4" />
            <div className="h-4 bg-slate-200 w-1/2 mx-auto rounded" />
          </div>

          <div className="space-y-8">
            <div>
              <div className="h-5 bg-slate-300 w-1/4 rounded mb-4" />
              <div className="space-y-2">
                <div className="h-3 bg-slate-200 w-full rounded" />
                <div className="h-3 bg-slate-200 w-full rounded" />
                <div className="h-3 bg-slate-200 w-5/6 rounded" />
              </div>
            </div>

            <div>
              <div className="h-5 bg-slate-300 w-1/4 rounded mb-4" />
              <div className="space-y-4">
                <div>
                  <div className="flex justify-between mb-2">
                    <div className="h-4 bg-slate-300 w-1/3 rounded" />
                    <div className="h-4 bg-slate-200 w-1/6 rounded" />
                  </div>
                  <div className="space-y-2 pl-4">
                    <div className="h-3 bg-slate-200 w-full rounded" />
                    <div className="h-3 bg-slate-200 w-11/12 rounded" />
                  </div>
                </div>
                 <div>
                  <div className="flex justify-between mb-2">
                    <div className="h-4 bg-slate-300 w-1/4 rounded" />
                    <div className="h-4 bg-slate-200 w-1/6 rounded" />
                  </div>
                  <div className="space-y-2 pl-4">
                    <div className="h-3 bg-slate-200 w-full rounded" />
                    <div className="h-3 bg-slate-200 w-10/12 rounded" />
                  </div>
                </div>
              </div>
            </div>

            <div>
              <div className="h-5 bg-slate-300 w-1/4 rounded mb-4" />
              <div className="flex flex-wrap gap-2">
                {[1,2,3,4,5,6,7].map(i => (
                  <div key={i} className="h-6 w-16 bg-slate-200 rounded-full" />
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

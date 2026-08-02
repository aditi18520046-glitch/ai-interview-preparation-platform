import React, { useState } from 'react';
import { Filter, ChevronDown, Check } from 'lucide-react';

const FILTER_CATEGORIES = [
  {
    name: 'Company Type',
    options: ['Product Based', 'Service Based', 'Startup', 'Unicorn', 'MNC']
  },
  {
    name: 'Industry',
    options: ['Software', 'AI', 'Cloud', 'FinTech', 'E-Commerce', 'Healthcare', 'Telecom', 'Consulting', 'Automotive', 'Gaming']
  },
  {
    name: 'Experience',
    options: ['Internship', 'Fresher', '1–2 Years', '3–5 Years', 'Experienced']
  },
  {
    name: 'Location',
    options: ['India', 'Global']
  },
  {
    name: 'Hiring Status',
    options: ['Actively Hiring', 'Frequently Hiring', 'Occasionally Hiring']
  }
];

export default function CRFilters() {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedFilters, setSelectedFilters] = useState<Record<string, string[]>>({});

  const toggleFilter = (category: string, option: string) => {
    setSelectedFilters(prev => {
      const current = prev[category] || [];
      const updated = current.includes(option)
        ? current.filter(item => item !== option)
        : [...current, option];
      
      return { ...prev, [category]: updated };
    });
  };

  return (
    <div className="bg-slate-900/50 border border-white/5 rounded-2xl overflow-hidden">
      {/* Mobile Toggle */}
      <button 
        className="w-full lg:hidden flex items-center justify-between p-4 bg-slate-900"
        onClick={() => setIsOpen(!isOpen)}
      >
        <div className="flex items-center gap-2 font-semibold text-white">
          <Filter className="w-5 h-5" /> Filters
        </div>
        <ChevronDown className={`w-5 h-5 transition-transform ${isOpen ? 'rotate-180' : ''}`} />
      </button>

      {/* Filter Content */}
      <div className={`p-5 space-y-6 lg:block ${isOpen ? 'block' : 'hidden'}`}>
        <div className="hidden lg:flex items-center gap-2 font-semibold text-white mb-6">
          <Filter className="w-5 h-5 text-indigo-400" /> Filters
        </div>
        
        {FILTER_CATEGORIES.map((category) => (
          <div key={category.name} className="space-y-3">
            <h3 className="text-sm font-medium text-slate-300">{category.name}</h3>
            <div className="space-y-2">
              {category.options.map((option) => {
                const isSelected = (selectedFilters[category.name] || []).includes(option);
                return (
                  <label key={option} className="flex items-center gap-3 group cursor-pointer">
                    <div className={`w-4 h-4 rounded-[4px] border flex items-center justify-center transition-colors ${
                      isSelected 
                        ? 'bg-indigo-500 border-indigo-500 text-white' 
                        : 'border-slate-600 bg-slate-800 group-hover:border-slate-500'
                    }`}>
                      {isSelected && <Check className="w-3 h-3" />}
                    </div>
                    <span className={`text-sm ${isSelected ? 'text-slate-200' : 'text-slate-400 group-hover:text-slate-300'}`}>
                      {option}
                    </span>
                  </label>
                );
              })}
            </div>
          </div>
        ))}

        <button 
          onClick={() => setSelectedFilters({})}
          className="w-full py-2 text-sm text-slate-400 hover:text-white transition-colors"
        >
          Clear all filters
        </button>
      </div>
    </div>
  );
}

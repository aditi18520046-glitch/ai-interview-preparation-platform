import React from 'react';
import RAScores from './RAScores';
import RACompanyMatches from './RACompanyMatches';
import RARoleMatches from './RARoleMatches';
import RAStrengthsWeaknesses from './RAStrengthsWeaknesses';
import RAImprovements from './RAImprovements';
import RAMissingSkills from './RAMissingSkills';
import RASkillsFound from './RASkillsFound';
import RAPreview from './RAPreview';

interface RAResultsProps {
  file: File | null;
  onReplace: () => void;
}

export default function RAResults({ file, onReplace }: RAResultsProps) {
  return (
    <div className="space-y-16 animate-in fade-in slide-in-from-bottom-8 duration-700">
      
      {/* 1. Overall Scores */}
      <section>
        <RAScores />
      </section>

      {/* 2. Strengths & Weaknesses */}
      <section>
        <RAStrengthsWeaknesses />
      </section>

      {/* 3. Matches */}
      <section className="grid lg:grid-cols-2 gap-8">
        <div>
          <RACompanyMatches />
        </div>
        <div>
          <RARoleMatches />
        </div>
      </section>

      {/* 4. Skills */}
      <section className="grid lg:grid-cols-2 gap-8">
        <div>
          <RASkillsFound />
        </div>
        <div>
          <RAMissingSkills />
        </div>
      </section>

      {/* 5. AI Suggestions */}
      <section>
        <RAImprovements />
      </section>

      {/* 6. Preview */}
      <section>
        <RAPreview file={file} onReplace={onReplace} />
      </section>

    </div>
  );
}

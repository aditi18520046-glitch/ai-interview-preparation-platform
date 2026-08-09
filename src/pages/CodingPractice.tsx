import React, { useState, useEffect } from 'react';
import { useCodingStore } from '../store/codingStore';
import DashboardLayout from '../components/layout/DashboardLayout';
import CodingWorkspace from '../components/coding/CodingWorkspace';

import CodingHero from '../components/coding_practice/CodingHero';
import CodingCategories from '../components/coding_practice/CodingCategories';
import CodingLearningPaths from '../components/coding_practice/CodingLearningPaths';
import CodingDailyChallenge from '../components/coding_practice/CodingDailyChallenge';
import CodingProblemTable from '../components/coding_practice/CodingProblemTable';
import CodingRecommendedProblems from '../components/coding_practice/CodingRecommendedProblems';

export default function CodingPractice() {
  const { fetchHistory } = useCodingStore();
  useEffect(() => {
    fetchHistory();
  }, [fetchHistory]);

  const [activeProblem, setActiveProblem] = useState<string | null>(null);

  if (activeProblem) {
    return (
      <DashboardLayout>
        <CodingWorkspace onBack={() => setActiveProblem(null)} />
      </DashboardLayout>
    );
  }

  return (
    <DashboardLayout>
      <div className="max-w-[1400px] mx-auto w-full px-4 sm:px-6 lg:px-8 py-8 space-y-24">
        
        {/* 1. Hero Section */}
        <section>
          <CodingHero onStart={() => setActiveProblem('two-sum')} />
        </section>

        {/* 2. Coding Categories */}
        <section>
          <CodingCategories />
        </section>

        {/* 3. Featured Learning Paths */}
        <section>
          <CodingLearningPaths />
        </section>

        {/* 4. Daily Coding Challenge */}
        <section>
          <CodingDailyChallenge onSolve={() => setActiveProblem('daily')} />
        </section>

        {/* 5. Coding Problems */}
        <section>
          <CodingProblemTable onSolve={(id) => setActiveProblem(id)} />
        </section>

        {/* 6. Recommended Next Problems */}
        <section>
          <CodingRecommendedProblems onSolve={(id) => setActiveProblem(id)} />
        </section>

      </div>
    </DashboardLayout>
  );
}

import React from 'react';
import Navbar from '../components/Navbar';
import Hero from '../components/Hero';
import DashboardPreview from '../components/DashboardPreview';
import TrustedBy from '../components/TrustedBy';
import Features from '../components/Features';
import Stats from '../components/Stats';
import HowItWorks from '../components/HowItWorks';
import Footer from '../components/Footer';

export default function Home() {
  return (
    <div className="min-h-[100dvh] bg-slate-950 text-slate-50 font-sans selection:bg-indigo-500/30 overflow-x-hidden">
      <Navbar />
      <main>
        <Hero />
        <DashboardPreview />
        <TrustedBy />
        <Features />
        <Stats />
        <HowItWorks />
      </main>
      <Footer />
    </div>
  );
}

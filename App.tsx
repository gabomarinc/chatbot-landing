import React, { useEffect } from 'react';
import Header from './components/Header';
import Hero from './components/Hero';
import Features from './components/Features';
import EmotionalValue from './components/EmotionalValue';
import Integrations from './components/Integrations';
import Pricing from './components/Pricing';
import Footer from './components/Footer';
import CallToAction from './components/CallToAction';
import MobileNavBar from './components/MobileNavBar';

const App: React.FC = () => {
  // Smooth scroll implementation
  useEffect(() => {
    document.documentElement.style.scrollBehavior = 'smooth';
    return () => {
      document.documentElement.style.scrollBehavior = 'auto';
    };
  }, []);

  return (
    // pb-24 added for mobile bottom nav spacing
    <div className="min-h-screen bg-konsul-950 text-white selection:bg-konsul-500 selection:text-white overflow-x-hidden pb-28 md:pb-0">
      <Header />
      <main>
        <Hero />
        <EmotionalValue />
        <Features />
        <Integrations />
        <Pricing />
        
        {/* Continuous Background Wrapper for CTA and Footer */}
        <div className="relative w-full">
          {/* Background Gradients extending behind both components */}
          <div className="absolute inset-0 bg-gradient-to-b from-konsul-950 via-[#27bea5]/10 to-[#27bea5]/30 -z-10" />
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-[#27bea5]/20 via-konsul-950/0 to-konsul-950/0 -z-10" />
          
          <CallToAction />
          <Footer />
        </div>
      </main>
      <MobileNavBar />
    </div>
  );
};

export default App;
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
        <div className="relative w-full overflow-hidden bg-[#1c2938]">
          
          {/* Background Image with Blending */}
          <div className="absolute inset-0 w-full h-full pointer-events-none">
             {/* Image Layer */}
             <img 
               src="https://konsul.digital/wp-content/uploads/2025/12/banner-footer-web-2-scaled.avif" 
               alt="" 
               className="absolute inset-0 w-full h-full object-cover opacity-40 mix-blend-screen"
             />
             
             {/* Gradient Overlays for "Diluted" blending effect */}
             {/* Top fade: Blends the image start with the previous dark section */}
             <div className="absolute top-0 left-0 right-0 h-64 bg-gradient-to-b from-[#1c2938] to-transparent" />
             
             {/* Bottom fade: Ensures footer bottom looks clean */}
             <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-[#0B1219] to-transparent" />
             
             {/* Overall tint to ensure text contrast */}
             <div className="absolute inset-0 bg-[#1c2938]/30" />
          </div>
          
          <div className="relative z-10">
            <CallToAction />
            <Footer />
          </div>
        </div>
      </main>
      <MobileNavBar />
    </div>
  );
};

export default App;
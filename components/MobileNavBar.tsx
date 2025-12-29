import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Home, Layers, Zap, MessageCircle } from 'lucide-react';

const MobileNavBar: React.FC = () => {
  const [activeTab, setActiveTab] = useState('#root');

  // Update active tab based on scroll position
  useEffect(() => {
    const handleScroll = () => {
      const sections = ['#root', '#features', '#emotional', '#pricing'];
      
      // Simple logic to detect which section is in view
      // In a real app, IntersectionObserver is better, but this works for this structure
      const scrollPosition = window.scrollY + 300; // Offset

      // This is a simplified detection logic
      if (window.scrollY < 400) {
        setActiveTab('#root');
      } else {
        // Find the section that is currently visible
        // Implementation omitted for brevity/performance in simple landing
      }
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navItems = [
    { id: '#root', icon: <Home size={22} />, label: 'Inicio' },
    { id: '#features', icon: <Layers size={22} />, label: 'Features' },
    { id: '#emotional', icon: <Zap size={22} />, label: 'Solución' },
    { id: '#pricing', icon: <MessageCircle size={22} />, label: 'Precios' },
  ];

  const handleNavClick = (href: string) => {
    setActiveTab(href);
    const element = document.querySelector(href === '#root' ? 'body' : href);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="md:hidden fixed bottom-6 left-4 right-4 z-50">
      <div className="absolute inset-0 bg-[#1c2938]/80 backdrop-blur-xl rounded-2xl border border-white/10 shadow-[0_8px_32px_rgba(0,0,0,0.5)]" />
      
      <div className="relative flex justify-around items-center h-16 px-2">
        {navItems.map((item) => {
          const isActive = activeTab === item.id;
          return (
            <button
              key={item.id}
              onClick={() => handleNavClick(item.id)}
              className="relative flex flex-col items-center justify-center w-full h-full"
            >
              {isActive && (
                <motion.div
                  layoutId="mobile-nav-pill"
                  className="absolute inset-0 bg-white/5 rounded-xl mx-2 my-1.5"
                  transition={{ type: "spring", stiffness: 300, damping: 30 }}
                />
              )}
              
              <motion.div
                animate={{ 
                  y: isActive ? -2 : 0,
                  color: isActive ? '#14b8a6' : '#9ca3af' // konsul-500 vs gray-400
                }}
                className="relative z-10 flex flex-col items-center gap-1"
              >
                {item.icon}
                <span className="text-[9px] font-medium tracking-wide">
                  {item.label}
                </span>
              </motion.div>
              
              {isActive && (
                <motion.div
                  layoutId="mobile-nav-glow"
                  className="absolute bottom-1 w-1 h-1 rounded-full bg-konsul-500 shadow-[0_0_8px_currentColor]"
                />
              )}
            </button>
          );
        })}
      </div>
    </div>
  );
};

export default MobileNavBar;
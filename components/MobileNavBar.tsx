import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Home, Layers, Zap, MessageCircle, Bot } from 'lucide-react';

const MobileNavBar: React.FC = () => {
  const [activeTab, setActiveTab] = useState('#root');

  // Update active tab based on scroll position using IntersectionObserver
  useEffect(() => {
    const sections = ['root', 'chatbot-demo', 'features', 'emotional', 'pricing'];
    const observers: IntersectionObserver[] = [];

    const observerOptions = {
      root: null,
      rootMargin: '-40% 0px -40% 0px', // Center of viewport
      threshold: 0
    };

    const handleIntersect = (entries: IntersectionObserverEntry[]) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          setActiveTab(`#${entry.target.id === 'root' ? 'root' : entry.target.id}`);
        }
      });
    };

    const observer = new IntersectionObserver(handleIntersect, observerOptions);

    sections.forEach(id => {
      const el = document.getElementById(id) || (id === 'root' ? document.body : null);
      if (el) observer.observe(el);
    });

    return () => observer.disconnect();
  }, []);

  const navItems = [
    { id: '#root', icon: <Home size={22} />, label: 'Inicio' },
    { id: '#chatbot-demo', icon: <Bot size={22} />, label: 'Chatbot IA' },
    { id: '#features', icon: <Layers size={22} />, label: 'Producto' },
    { id: '#emotional', icon: <Zap size={22} />, label: 'Soluciones' },
  ];

  const handleNavClick = (href: string) => {
    const targetId = href.replace('#', '');
    const element = document.getElementById(targetId === 'root' ? 'root' : targetId) || (targetId === 'root' ? document.body : null);

    if (element) {
      // Offset calculation for fixed header
      const headerOffset = 100;
      const elementPosition = element.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

      window.scrollTo({
        top: targetId === 'root' ? 0 : offsetPosition,
        behavior: 'smooth'
      });

      // Manually set active tab to provide instant feedback
      setActiveTab(href);
    }
  };

  return (
    <div className="md:hidden fixed bottom-6 left-4 right-4 z-50">
      <div className="absolute inset-0 bg-black/40 backdrop-blur-xl rounded-2xl border border-white/10 shadow-[0_8px_32px_rgba(0,0,0,0.5)]" />

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
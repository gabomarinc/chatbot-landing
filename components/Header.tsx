import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import Button from './ui/Button';

const Header: React.FC = () => {
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { name: 'Chatbot IA', href: '#chatbot-demo' },
    { name: 'Producto', href: '#features' },
    { name: 'Soluciones', href: '#emotional' },
    { name: 'Precios', href: '#pricing' },
    { name: 'Empresa', href: '#footer' },
  ];

  const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault();
    const element = document.querySelector(href);
    if (element) {
      // Offset calculation to account for the fixed floating header
      // The header is roughly 60-80px tall including padding. 
      // We use 110px to give it breathing room so the section title is clearly visible below the header.
      const headerOffset = 110;
      const elementPosition = element.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.scrollY - headerOffset;

      window.scrollTo({
        top: offsetPosition,
        behavior: "smooth"
      });
    }
  };

  return (
    // Increased z-index significantly to ensure it floats above everything (z-[999])
    <header className="fixed top-0 left-0 right-0 z-[999] flex justify-center items-start pt-4 px-4 md:pt-6 pointer-events-none">
      {/* 
          pointer-events-none on the container allows clicks to pass through the empty space around the floating bar.
          pointer-events-auto on the bar itself re-enables clicks.
       */}
      <motion.div
        initial={{ y: -100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.6, type: "spring", damping: 20 }}
        className={`
          pointer-events-auto
          relative flex items-center justify-between 
          w-full max-w-6xl 
          mx-auto 
          rounded-full 
          border border-white/10 
          backdrop-blur-xl
          shadow-[0_8px_32px_rgba(0,0,0,0.4)]
          transition-all duration-300
          bg-black/40
          py-3 px-5 md:py-4 md:px-8
        `}
      >
        {/* Logo Area - z-20 to ensure clickability over absolute nav if overlapping */}
        <div className="flex items-center gap-8 shrink-0 z-20 relative">
          <a
            href="#hero"
            onClick={(e) => handleNavClick(e, '#hero')}
            className="flex items-center gap-2 group cursor-pointer block"
          >
            <img
              src="https://konsul.digital/wp-content/uploads/2025/07/Logo-en-BW-e1751712792454.png"
              alt="Konsul Logo"
              className="h-6 md:h-8 w-auto object-contain"
            />
          </a>
        </div>

        {/* Desktop Nav - Centered Absolute - z-10 */}
        <nav className="hidden md:flex items-center gap-1 absolute left-1/2 -translate-x-1/2 z-10">
          {navLinks.map((link) => (
            <a
              key={link.name}
              href={link.href}
              onClick={(e) => handleNavClick(e, link.href)}
              className="px-4 py-2 text-sm font-medium text-gray-200 hover:text-white hover:bg-white/10 rounded-full transition-all cursor-pointer select-none"
            >
              {link.name}
            </a>
          ))}
        </nav>

        {/* Actions - z-20 */}
        <div className="flex items-center gap-4 shrink-0 z-20 relative">
          <a href="https://chatbot.konsul.digital/" className="hidden md:block text-sm font-medium text-white hover:text-[#27bea5] transition-colors">
            Login
          </a>
          <a href="https://calendly.com/wearekonsul/konsul-ecosistema-ia" target="_blank">
            <Button size="sm" className="bg-[#27bea5] text-white hover:bg-[#1fa992] border-none shadow-none rounded-full px-5 md:px-6">
              <span className="hidden md:inline">Agendar Demo</span>
              <span className="md:hidden">Demo</span>
            </Button>
          </a>
        </div>

      </motion.div>
    </header>
  );
};

export default Header;

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
    { name: 'Producto', href: '#features' },
    { name: 'Soluciones', href: '#emotional' },
    { name: 'Precios', href: '#pricing' },
    { name: 'Empresa', href: '#footer' },
  ];

  return (
    <header className="fixed top-0 left-0 right-0 z-50 flex justify-center items-start pt-4 px-4 md:pt-6 pointer-events-none">
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
          shadow-[0_8px_32px_rgba(0,0,0,0.2)]
          transition-all duration-300
          ${isScrolled 
            ? 'bg-[#1c2938]/90 py-2.5 px-4 md:py-3 md:px-6' 
            : 'bg-[#1c2938]/70 py-3 px-5 md:py-4 md:px-8'
          }
        `}
      >
        {/* Logo Area */}
        <div className="flex items-center gap-8 shrink-0">
            <a href="#" onClick={() => window.scrollTo(0,0)} className="flex items-center gap-2 group">
            <img 
                src="https://konsul.digital/wp-content/uploads/2025/07/Logo-en-BW-e1751712792454.png" 
                alt="Konsul Logo" 
                className="h-6 md:h-8 w-auto object-contain" 
            />
            </a>
        </div>

        {/* Desktop Nav - Centered Absolute */}
        {/* Using absolute centering ensures it stays perfectly centered regardless of logo/actions width difference */}
        <nav className="hidden md:flex items-center gap-1 absolute left-1/2 -translate-x-1/2">
          {navLinks.map((link) => (
            <a
              key={link.name}
              href={link.href}
              className="px-4 py-2 text-sm font-medium text-gray-300 hover:text-white hover:bg-white/5 rounded-full transition-all"
            >
              {link.name}
            </a>
          ))}
        </nav>

        {/* Actions */}
        <div className="flex items-center gap-4 shrink-0">
          <a href="#" className="hidden md:block text-sm font-medium text-white hover:text-[#27bea5] transition-colors">
            Login
          </a>
          <Button size="sm" className="bg-[#27bea5] text-white hover:bg-[#1fa992] border-none shadow-none rounded-full px-5 md:px-6">
            <span className="hidden md:inline">Solicitar Demo</span>
            <span className="md:hidden">Demo</span>
          </Button>
        </div>

      </motion.div>
    </header>
  );
};

export default Header;
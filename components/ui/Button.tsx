import React from 'react';
import { motion } from 'framer-motion';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'outline' | 'ghost';
  size?: 'sm' | 'md' | 'lg';
  children: React.ReactNode;
  icon?: React.ReactNode;
}

const Button: React.FC<ButtonProps> = ({ 
  variant = 'primary', 
  size = 'md', 
  children, 
  icon,
  className = '',
  ...props 
}) => {
  const baseStyles = "inline-flex items-center justify-center rounded-full font-medium transition-all duration-300 focus:outline-none disabled:opacity-50 disabled:cursor-not-allowed";
  
  const variants = {
    // Updated primary to use #27bea5 instead of white
    primary: "bg-[#27bea5] text-white hover:bg-[#1fa992] border border-transparent shadow-[0_0_20px_rgba(39,190,165,0.2)] hover:shadow-[0_0_25px_rgba(39,190,165,0.4)]",
    // Updated secondary to match the new brand color #27bea5
    secondary: "bg-[#27bea5] text-white hover:bg-[#1fa992] shadow-lg shadow-[#27bea5]/20",
    // Updated outline to use #27bea5 for border
    outline: "bg-transparent border border-[#27bea5] text-white hover:bg-[#27bea5]/10 hover:border-[#27bea5]",
    ghost: "bg-transparent text-gray-400 hover:text-white hover:bg-white/5",
  };

  const sizes = {
    sm: "text-xs px-4 py-2 gap-1.5",
    md: "text-sm px-6 py-3 gap-2",
    lg: "text-base px-8 py-4 gap-2.5",
  };

  return (
    <motion.button
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
      className={`${baseStyles} ${variants[variant]} ${sizes[size]} ${className}`}
      {...props}
    >
      {children}
      {icon && <span className="flex-shrink-0">{icon}</span>}
    </motion.button>
  );
};

export default Button;
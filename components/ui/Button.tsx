'use client';

import { ReactNode } from 'react';
import { motion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';

interface ButtonProps {
  children: ReactNode;
  variant?: 'primary' | 'secondary' | 'ghost';
  size?: 'sm' | 'md' | 'lg';
  icon?: boolean;
  onClick?: () => void;
  href?: string;
  className?: string;
}

export default function Button({
  children,
  variant = 'primary',
  size = 'md',
  icon = false,
  onClick,
  href,
  className = '',
}: ButtonProps) {
  const baseStyles = 'inline-flex items-center justify-center gap-2 font-semibold rounded-md transition-all duration-200 active:scale-[0.98]';

  const variantStyles = {
    primary: 'bg-white text-black hover:bg-gray-100 shadow-[0_1px_2px_rgba(0,0,0,0.1)]',
    secondary: 'bg-white/[0.03] text-white/90 hover:bg-white/[0.08] border border-white/[0.05] backdrop-blur-sm',
    ghost: 'text-white/40 hover:text-white transition-colors',
  };

  const sizeStyles = {
    sm: 'px-3 h-8 text-[11px] tracking-wider uppercase',
    md: 'px-5 h-11 text-sm tracking-tight',
    lg: 'px-8 h-14 text-sm tracking-tight',
  };

  const classes = `${baseStyles} ${variantStyles[variant]} ${sizeStyles[size]} ${className}`;

  const content = (
    <>
      {children}
      {icon && <ArrowRight className="w-4 h-4" style={{ width: '1rem', height: '1rem' }} />}
    </>
  );

  if (href) {
    return (
      <motion.a
        href={href}
        className={classes}
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
      >
        {content}
      </motion.a>
    );
  }

  return (
    <motion.button
      onClick={onClick}
      className={classes}
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
    >
      {content}
    </motion.button>
  );
}

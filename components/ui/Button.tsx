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
  type?: 'button' | 'submit' | 'reset';
  disabled?: boolean;
  isLoading?: boolean;
}

export default function Button({
  children,
  variant = 'primary',
  size = 'md',
  icon = false,
  onClick,
  href,
  className = '',
  type = 'button',
  disabled = false,
  isLoading = false,
}: ButtonProps) {
  const baseStyles = 'inline-flex items-center justify-center gap-2 font-semibold rounded-md transition-all duration-200 active:scale-[0.98] disabled:opacity-50 disabled:cursor-not-allowed disabled:active:scale-100';

  const variantStyles = {
    primary: 'bg-white text-black hover:bg-gray-100 shadow-[0_1px_2px_rgba(0,0,0,0.1)]',
    secondary: 'bg-white/[0.03] text-white/90 hover:bg-white/[0.08] border border-white/[0.05] backdrop-blur-sm',
    ghost: 'text-white/80 hover:text-white transition-colors',
  };

  const sizeStyles = {
    sm: 'px-3 h-8 text-[11px] tracking-wider uppercase',
    md: 'px-5 h-11 text-sm tracking-tight',
    lg: 'px-8 h-14 text-sm tracking-tight',
  };

  const classes = `${baseStyles} ${variantStyles[variant]} ${sizeStyles[size]} ${className}`;

  const content = (
    <>
      {isLoading ? (
        <div className="w-5 h-5 border-2 border-current border-t-transparent rounded-full animate-spin" />
      ) : (
        <>
          {children}
          {icon && <ArrowRight className="w-4 h-4" style={{ width: '1rem', height: '1rem' }} />}
        </>
      )}
    </>
  );

  if (href) {
    return (
      <motion.a
        href={href}
        className={classes}
        whileHover={!disabled ? { scale: 1.02 } : {}}
        whileTap={!disabled ? { scale: 0.98 } : {}}
      >
        {content}
      </motion.a>
    );
  }

  return (
    <motion.button
      type={type}
      onClick={onClick}
      disabled={disabled || isLoading}
      className={classes}
      whileHover={!(disabled || isLoading) ? { scale: 1.02 } : {}}
      whileTap={!(disabled || isLoading) ? { scale: 0.98 } : {}}
    >
      {content}
    </motion.button>
  );
}

